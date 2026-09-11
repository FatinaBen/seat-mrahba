import type { Event, Guest, Table, BuilderStepKey, EventType, EventStatus } from './types';
import { BUILDER_STEPS_DEFAULT } from './types';

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function createDefaultEvent(overrides: Partial<Event> = {}): Event {
  const id = generateId();
  return {
    id,
    name: '',
    type: 'mariage',
    date: '',
    time: '',
    venue: '',
    address: '',
    organizers: '',
    welcomeMessage: '',
    guestCount: 0,
    status: 'draft',
    guests: [],
    tables: [],
    theme: {
      preset: 'terracotta',
      primaryColor: '#B85C28',
      secondaryColor: '#8A7235',
      buttonColor: '#B85C28',
      typography: 'playfair',
      borderRadius: 'lg',
      heroImage: '',
      logo: '',
      pattern: 'none',
    },
    sections: {
      seatingPlan: true,
      menu: false,
      programme: false,
      gallery: false,
    },
    menu: [],
    menuImage: '',
    programme: [],
    programmeImage: '',
    seatingImage: '',
    gallery: [],
    builderSteps: BUILDER_STEPS_DEFAULT.map(s => ({ ...s })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createDefaultGuest(): Guest {
  return { id: generateId(), firstName: '', lastName: '', phone: '', email: '', tableId: '', seat: '', menu: '', notes: '' };
}

export function createDefaultTable(number: number): Table {
  return { id: generateId(), name: `Table ${number}`, number, type: 'round', capacity: 8, guestIds: [] };
}

// Réconcilie les numéros de table bruts venant d'un import Excel (ex: "7", "Table 7")
// avec les vraies Tables de l'événement : crée les tables manquantes et réécrit
// guest.tableId pour pointer vers le vrai Table.id, afin que la recherche invité
// et le plan de table fonctionnent immédiatement après l'import — sans placement manuel.
export function linkGuestsToTables(existingTables: Table[], importedGuests: Guest[]): { tables: Table[]; guests: Guest[] } {
  const tables = [...existingTables];
  const newlyCreated = new Set<string>();
  const findByNumber = (num: number) => tables.find(t => t.number === num);

  const guests = importedGuests.map(g => {
    const raw = (g.tableId || '').trim();
    if (!raw) return g;
    const match = raw.match(/\d+/); // "7", "Table 7", "N°7"… → 7
    if (!match) return g; // valeur non numérique : laissée telle quelle, à corriger manuellement
    const num = parseInt(match[0], 10);
    let table = findByNumber(num);
    if (!table) {
      table = createDefaultTable(num);
      tables.push(table);
      newlyCreated.add(table.id);
    }
    return { ...g, tableId: table.id };
  });

  // Ajuste la capacité des tables tout juste créées au nombre réel d'invités qui
  // y sont placés (jamais les tables déjà existantes) — évite un affichage du
  // type "10/8" trompeur quand le fichier importé a des tables de plus de 8
  // personnes (la capacité par défaut d'une nouvelle table).
  if (newlyCreated.size > 0) {
    const countByTable = new Map<string, number>();
    guests.forEach(g => {
      if (g.tableId && newlyCreated.has(g.tableId)) {
        countByTable.set(g.tableId, (countByTable.get(g.tableId) || 0) + 1);
      }
    });
    tables.forEach(t => {
      if (newlyCreated.has(t.id)) {
        const count = countByTable.get(t.id) || 0;
        if (count > t.capacity) t.capacity = count;
      }
    });
  }

  tables.sort((a, b) => a.number - b.number);
  return { tables, guests };
}

// ─── Import "groupé par table" ────────────────────────────────────────────────
// Format très courant en pratique : au lieu d'un tableau plat (une ligne par
// invité avec une colonne Table), le fichier a une ligne "Table N" par section,
// suivie d'un sous-en-tête (N° / Nom complet) puis des invités de cette table,
// séparés par une ligne vide avant la table suivante. Détecté automatiquement
// à partir des lignes brutes de la feuille (tableau de tableaux).
export interface GroupedGuest {
  firstName: string;
  lastName: string;
  tableNumber: number;
}

type RawCell = string | number | null | undefined;

export function parseGroupedByTableRows(rows: RawCell[][]): GroupedGuest[] | null {
  const guests: GroupedGuest[] = [];
  let currentTable: number | null = null;
  let sawTableHeader = false;

  for (const row of rows) {
    const c0 = row[0];
    const c1 = row[1];
    const c0Str = typeof c0 === 'string' ? c0.trim() : '';

    // "Table N" — nouvelle section
    const tableMatch = c0Str.match(/^table\s*n?°?\.?\s*(\d+)/i);
    if (tableMatch) {
      currentTable = parseInt(tableMatch[1], 10);
      sawTableHeader = true;
      continue;
    }

    // Sous-en-tête "N°" (avec ou sans "Nom complet" à côté) — ignoré
    if (/^n°?$/i.test(c0Str)) continue;

    // Ligne vide séparatrice
    const c1Empty = c1 === null || c1 === undefined || c1 === '';
    if (!c0Str && c1Empty) continue;

    // Ligne de données : N° de siège (numérique) + nom complet
    if (currentTable !== null && typeof c1 === 'string' && c1.trim()) {
      const fullName = c1.trim();
      const parts = fullName.split(/\s+/);
      guests.push({
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' '),
        tableNumber: currentTable,
      });
    }
  }

  return sawTableHeader && guests.length > 0 ? guests : null;
}

export function markStepComplete(event: Event, key: BuilderStepKey): Event {
  return {
    ...event,
    builderSteps: event.builderSteps.map(s => s.key === key ? { ...s, completed: true } : s),
    updatedAt: new Date().toISOString(),
  };
}

export function getEventStatus(event: Event): EventStatus {
  if (!event.date) return 'draft';
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (eventDate < today) return 'past';
  if (event.status === 'published') return 'published';
  return 'draft';
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function getDaysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function parseCSV(text: string): Partial<Guest>[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const guest: Partial<Guest> = { id: generateId() };
    headers.forEach((h, i) => {
      const v = values[i] || '';
      if (h.includes('nom') || h === 'lastname') guest.lastName = v;
      if (h.includes('prénom') || h === 'firstname') guest.firstName = v;
      if (h.includes('téléphone') || h === 'phone') guest.phone = v;
      if (h === 'email') guest.email = v;
      if (h.includes('table')) guest.tableId = v;
      if (h.includes('place') || h === 'seat') guest.seat = v;
      if (h.includes('menu')) guest.menu = v;
      if (h.includes('remarque') || h === 'notes') guest.notes = v;
    });
    return guest;
  });
}

export function getCompletionPercent(event: Event): number {
  const completed = event.builderSteps.filter(s => s.completed).length;
  return Math.round((completed / event.builderSteps.length) * 100);
}

export const EVENT_TYPE_COLOR: Record<EventType, string> = {
  mariage: '#B85C28', fiancailles: '#8A7235', 'baby-shower': '#CF9068',
  anniversaire: '#9B7A56', corporate: '#5A7A9B', gala: '#6B4C7A', autre: '#888',
};

export const STATUS_COLOR: Record<string, { bg: string; text: string; label: string }> = {
  draft:     { bg: 'rgba(155,122,86,0.1)',  text: '#9B7A56', label: 'Brouillon' },
  published: { bg: 'rgba(90,122,90,0.1)',   text: '#5A7A5A', label: 'Publié' },
  past:      { bg: 'rgba(26,15,8,0.06)',    text: '#9B7A56', label: 'Terminé' },
};
