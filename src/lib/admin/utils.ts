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
    phone: '',
    email: '',
    organizers: '',
    guestCount: 0,
    formula: 'touch',
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
    },
    sections: {
      seatingPlan: true,
      menu: true,
      programme: true,
      gallery: false,
      dressCode: '',
      parking: '',
      mapsUrl: '',
      contact: false,
      wifi: '',
      socialMedia: false,
    },
    menu: [],
    programme: [],
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
