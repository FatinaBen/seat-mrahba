// ─── Core Enums ─────────────────────────────────────────────────────────────
export type EventType =
  | 'mariage' | 'fiancailles' | 'baby-shower'
  | 'anniversaire' | 'corporate' | 'gala' | 'autre';

export type EventStatus = 'draft' | 'published' | 'past';
export type TableType = 'round' | 'rectangle' | 'imperial';
export type ThemePreset =
  | 'terracotta' | 'minimal' | 'maroc-chic'
  | 'olive' | 'black-luxury' | 'corporate';
// Groupées par style : élégante/serif, moderne/sans-serif, manuscrite/calligraphique.
export type Typography = 'playfair' | 'cormorant' | 'bodoni' | 'inter' | 'montserrat' | 'greatvibes';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type LogoPlacement = 'header' | 'hero' | 'watermark';
export type BackgroundType = 'color' | 'image';
export type OverlayTone = 'none' | 'dark' | 'light';

// ─── Builder Steps (étapes back-office) ───────────────────────────────────────
// 1-8 : parcours principal demandé. 9-10 : fonctionnalités existantes conservées
// mais non prioritaires dans le nouveau parcours (galerie, personnalisation avancée).
export type BuilderStepKey =
  | 'general' | 'home' | 'guests' | 'seating'
  | 'menu' | 'programme' | 'qrcode'
  | 'gallery' | 'design' | 'preview';

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
// Un thème (preset) ne sert qu'à préremplir ces champs en un clic — une fois
// posées ici, les valeurs sont la personnalisation persistante du client et ne
// sont plus jamais réécrites automatiquement (voir StepDesign.tsx).
export interface Theme {
  preset: ThemePreset;
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  buttonTextColor: string;   // texte des boutons
  textColor: string;         // titres / texte courant
  typography: Typography;    // police des titres
  bodyFont: Typography;      // police du texte courant
  borderRadius: BorderRadius;
  heroImage: string;         // visuel Canva de la page d'accueil (étape "Page d'accueil")
  logo: string;
  logoPlacement: LogoPlacement;
  logoWatermarkOpacity: number; // 0-100, filigrane uniquement
  logoWatermarkSize: number;    // 0-100 (% de la largeur), filigrane uniquement
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOverlay: OverlayTone;
  backgroundOverlayOpacity: number; // 0-100
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
  welcomeMessage: string; // message d'accueil affiché sur le site invité
  displayTitle: string; // titre public (étape "Page d'accueil") — jamais le nom interne
  ctaText: string; // texte du repère de scroll, vide = valeur par défaut selon `type`
  guestCount: number;
  status: EventStatus;
  guests: Guest[];
  tables: Table[];
  theme: Theme;
  sections: Sections;
  menu: MenuSection[];
  menuImage: string; // visuel Canva importé
  programme: ProgrammeItem[];
  programmeImage: string; // visuel Canva importé (prioritaire sur `programme`)
  seatingImage: string; // visuel Canva optionnel du plan de table (en plus du plan généré)
  gallery: string[]; // photos uploadées par les invités
  builderSteps: BuilderStep[];
  createdAt: string;
  updatedAt: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────
export const BUILDER_STEPS_DEFAULT: BuilderStep[] = [
  { key: 'general',   label: 'Informations',    completed: false },
  { key: 'home',      label: 'Page d’accueil', completed: false },
  { key: 'guests',    label: 'Invités',         completed: false },
  { key: 'seating',   label: 'Plan de table',   completed: false },
  { key: 'menu',      label: 'Menu',            completed: false },
  { key: 'programme', label: 'Programme',       completed: false },
  { key: 'qrcode',    label: 'QR Code',         completed: false },
  { key: 'gallery',   label: 'Galerie',         completed: false },
  { key: 'design',    label: 'Personnalisation', completed: false },
  { key: 'preview',   label: 'Aperçu du site',  completed: false },
];

// Un thème = un point de départ. Il ne préremplit QUE les champs listés ici
// (section "Couleurs personnalisées" + police des titres + arrondis) — jamais
// le fond, le logo ou la police du texte courant, qui restent des choix propres
// au client. Voir StepDesign.tsx pour la logique de préremplissage/reset.
type ThemePresetFields = Pick<Theme,
  'preset' | 'primaryColor' | 'secondaryColor' | 'buttonColor' | 'buttonTextColor' |
  'textColor' | 'typography' | 'borderRadius'
>;

export const THEME_PRESETS: Record<ThemePreset, ThemePresetFields> = {
  terracotta: {
    preset: 'terracotta', primaryColor: '#B85C28', secondaryColor: '#8A7235',
    buttonColor: '#B85C28', buttonTextColor: '#FFFFFF', textColor: '#1A0F08',
    typography: 'playfair', borderRadius: 'lg',
  },
  minimal: {
    preset: 'minimal', primaryColor: '#1A1A1A', secondaryColor: '#666666',
    buttonColor: '#1A1A1A', buttonTextColor: '#FFFFFF', textColor: '#1A1A1A',
    typography: 'inter', borderRadius: 'sm',
  },
  'maroc-chic': {
    preset: 'maroc-chic', primaryColor: '#8A4F1C', secondaryColor: '#C4963A',
    buttonColor: '#8A4F1C', buttonTextColor: '#FFFFFF', textColor: '#1A0F08',
    typography: 'cormorant', borderRadius: 'full',
  },
  olive: {
    preset: 'olive', primaryColor: '#5C6E3A', secondaryColor: '#8A7235',
    buttonColor: '#5C6E3A', buttonTextColor: '#FFFFFF', textColor: '#1A0F08',
    typography: 'playfair', borderRadius: 'md',
  },
  'black-luxury': {
    preset: 'black-luxury', primaryColor: '#0A0A0A', secondaryColor: '#C4963A',
    buttonColor: '#C4963A', buttonTextColor: '#0A0A0A', textColor: '#0A0A0A',
    typography: 'cormorant', borderRadius: 'none',
  },
  corporate: {
    preset: 'corporate', primaryColor: '#1E3A5F', secondaryColor: '#4A7FB5',
    buttonColor: '#1E3A5F', buttonTextColor: '#FFFFFF', textColor: '#1A1A1A',
    typography: 'inter', borderRadius: 'md',
  },
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  mariage: 'Mariage', fiancailles: 'Fiançailles', 'baby-shower': 'Baby Shower',
  anniversaire: 'Anniversaire', corporate: 'Corporate', gala: 'Gala', autre: 'Autre',
};

// Polices disponibles, groupées par style — source unique utilisée par le
// sélecteur du dashboard (StepDesign) et par le rendu du site invité.
export interface FontOption {
  value: Typography;
  label: string;
  group: 'Élégante' | 'Moderne' | 'Manuscrite';
  css: string;        // valeur font-family CSS
  googleFont: string; // paramètre "family" pour l'URL Google Fonts
}

export const FONT_OPTIONS: FontOption[] = [
  { value: 'playfair', label: 'Playfair Display', group: 'Élégante', css: '"Playfair Display", Georgia, serif', googleFont: 'Playfair+Display:ital,wght@0,400;0,500;1,400' },
  { value: 'cormorant', label: 'Cormorant Garamond', group: 'Élégante', css: '"Cormorant Garamond", Georgia, serif', googleFont: 'Cormorant+Garamond:wght@400;500;600' },
  { value: 'bodoni', label: 'Bodoni Moda', group: 'Élégante', css: '"Bodoni Moda", Georgia, serif', googleFont: 'Bodoni+Moda:wght@400;500;600' },
  { value: 'inter', label: 'Inter', group: 'Moderne', css: 'Inter, system-ui, sans-serif', googleFont: 'Inter:wght@300;400;500;600' },
  { value: 'montserrat', label: 'Montserrat', group: 'Moderne', css: 'Montserrat, system-ui, sans-serif', googleFont: 'Montserrat:wght@300;400;500;600' },
  { value: 'greatvibes', label: 'Great Vibes', group: 'Manuscrite', css: '"Great Vibes", cursive', googleFont: 'Great+Vibes' },
];

export const FONT_GOOGLE_IMPORT_URL =
  'https://fonts.googleapis.com/css2?' +
  FONT_OPTIONS.map(f => `family=${f.googleFont}`).join('&') +
  '&display=swap';

// Texte du repère de scroll sous le titre, vu par l'invité (pas l'organisateur) —
// point de vue "invité" par défaut, personnalisable via `event.ctaText`.
export const CTA_TEXT_DEFAULTS: Record<EventType, string> = {
  mariage: 'Rejoignez la célébration',
  fiancailles: 'Rejoignez la célébration',
  'baby-shower': 'Découvrez la fête',
  anniversaire: 'Découvrez la fête',
  corporate: "Découvrez l'événement",
  gala: "Découvrez l'événement",
  autre: "Découvrez l'événement",
};
