// ─── Core Enums ─────────────────────────────────────────────────────────────
export type EventType =
  | 'mariage' | 'fiancailles' | 'baby-shower'
  | 'anniversaire' | 'corporate' | 'gala' | 'autre';

export type EventStatus = 'draft' | 'published' | 'past';
export type TableType = 'round' | 'rectangle' | 'imperial';
export type ThemePreset =
  | 'terracotta' | 'minimal' | 'maroc-chic'
  | 'olive' | 'black-luxury' | 'corporate';
export type Typography = 'playfair' | 'inter' | 'cormorant';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

// ─── Builder Steps (7 étapes back-office) ────────────────────────────────────
export type BuilderStepKey =
  | 'general' | 'guests' | 'seating'
  | 'design' | 'sections' | 'preview' | 'publish';

export interface BuilderStep {
  key: BuilderStepKey;
  label: string;
  completed: boolean;
}

// ─── Guest ───────────────────────────────────────────────────────────────────
export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  tableId: string;
  seat: string;
  menu: string;
  notes: string;
}

// ─── Table ───────────────────────────────────────────────────────────────────
export interface Table {
  id: string;
  name: string;
  number: number;
  type: TableType;
  capacity: number;
  guestIds: string[];
}

// ─── Theme ───────────────────────────────────────────────────────────────────
export interface Theme {
  preset: ThemePreset;
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  typography: Typography;
  borderRadius: BorderRadius;
  heroImage: string;
  logo: string;
  pattern: string; // 'none' | 'zellige' | 'dots' | 'lines' | 'arabesque'
}

// ─── Menu ────────────────────────────────────────────────────────────────────
export interface MenuItem {
  id: string;
  name: string;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

// ─── Programme ───────────────────────────────────────────────────────────────
export interface ProgrammeItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

// ─── Sections (ce qui est affiché sur le site invité) ────────────────────────
export interface Sections {
  seatingPlan: boolean;
  menu: boolean;
  programme: boolean;
  gallery: boolean;
}

// ─── Event ───────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: string;
  time: string;
  venue: string;
  address: string;
  organizers: string;
  guestCount: number;
  status: EventStatus;
  guests: Guest[];
  tables: Table[];
  theme: Theme;
  sections: Sections;
  menu: MenuSection[];
  programme: ProgrammeItem[];
  gallery: string[]; // photos uploadées par les invités
  builderSteps: BuilderStep[];
  createdAt: string;
  updatedAt: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────
export const BUILDER_STEPS_DEFAULT: BuilderStep[] = [
  { key: 'general',  label: 'Informations',   completed: false },
  { key: 'guests',   label: 'Invités',        completed: false },
  { key: 'seating',  label: 'Plan de table',  completed: false },
  { key: 'design',   label: 'Design',         completed: false },
  { key: 'sections', label: 'Contenu',        completed: false },
  { key: 'preview',  label: 'Aperçu',         completed: false },
  { key: 'publish',  label: 'Publier',        completed: false },
];

export const THEME_PRESETS: Record<ThemePreset, Omit<Theme, 'heroImage' | 'logo' | 'pattern'>> = {
  terracotta: {
    preset: 'terracotta', primaryColor: '#B85C28', secondaryColor: '#8A7235',
    buttonColor: '#B85C28', typography: 'playfair', borderRadius: 'lg',
  },
  minimal: {
    preset: 'minimal', primaryColor: '#1A1A1A', secondaryColor: '#666666',
    buttonColor: '#1A1A1A', typography: 'inter', borderRadius: 'sm',
  },
  'maroc-chic': {
    preset: 'maroc-chic', primaryColor: '#8A4F1C', secondaryColor: '#C4963A',
    buttonColor: '#8A4F1C', typography: 'cormorant', borderRadius: 'full',
  },
  olive: {
    preset: 'olive', primaryColor: '#5C6E3A', secondaryColor: '#8A7235',
    buttonColor: '#5C6E3A', typography: 'playfair', borderRadius: 'md',
  },
  'black-luxury': {
    preset: 'black-luxury', primaryColor: '#0A0A0A', secondaryColor: '#C4963A',
    buttonColor: '#C4963A', typography: 'cormorant', borderRadius: 'none',
  },
  corporate: {
    preset: 'corporate', primaryColor: '#1E3A5F', secondaryColor: '#4A7FB5',
    buttonColor: '#1E3A5F', typography: 'inter', borderRadius: 'md',
  },
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  mariage: 'Mariage', fiancailles: 'Fiançailles', 'baby-shower': 'Baby Shower',
  anniversaire: 'Anniversaire', corporate: 'Corporate', gala: 'Gala', autre: 'Autre',
};
