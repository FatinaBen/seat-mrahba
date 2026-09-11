'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Event, Theme, ThemePreset, Typography, BorderRadius, LogoPlacement, OverlayTone,
  THEME_PRESETS, FONT_OPTIONS,
} from '@/lib/admin/types';
import { generateId } from '@/lib/admin/utils';
import {
  CheckCircle2, Upload, X, RotateCcw, Save, Trash2, LayoutTemplate, Image as ImageIcon, Sparkles,
} from 'lucide-react';
import PhonePreview from '../PhonePreview';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const PRESETS: { key: ThemePreset; label: string; description: string }[] = [
  { key: 'terracotta',   label: 'Terracotta',    description: 'Chaud & élégant' },
  { key: 'minimal',      label: 'Minimal',       description: 'Épuré & moderne' },
  { key: 'maroc-chic',   label: 'Maroc Chic',    description: 'Oriental & raffiné' },
  { key: 'olive',        label: 'Olive',         description: 'Nature & sobre' },
  { key: 'black-luxury', label: 'Black Luxury',  description: 'Prestige & nuit' },
  { key: 'corporate',    label: 'Corporate',     description: 'Pro & structuré' },
];

const RADII: { value: BorderRadius; label: string }[] = [
  { value: 'none', label: 'Carré' },
  { value: 'sm',   label: 'Léger' },
  { value: 'md',   label: 'Moyen' },
  { value: 'lg',   label: 'Arrondi' },
  { value: 'full', label: 'Pilule' },
];

const LOGO_PLACEMENTS: { value: LogoPlacement; label: string; description: string }[] = [
  { value: 'header', label: 'Header', description: 'Petite barre en haut de chaque page' },
  { value: 'hero', label: 'Écran d’accueil', description: 'Au-dessus du titre (sans visuel Canva)' },
  { value: 'watermark', label: 'Filigrane', description: 'En fond, sur tout le site' },
];

const OVERLAY_TONES: { value: OverlayTone; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'dark', label: 'Sombre' },
  { value: 'light', label: 'Clair' },
];

const FONT_GROUPS = Array.from(new Set(FONT_OPTIONS.map(f => f.group)));

// ─── Presets personnalisés (bonus) — enregistrés par la cliente, réutilisables
// d'un événement à l'autre. Stockage local séparé, propre et autonome.
const CUSTOM_PRESETS_KEY = 'seat-mrahba-custom-theme-presets';
type CustomPresetFields = Pick<Theme,
  'primaryColor' | 'secondaryColor' | 'buttonColor' | 'buttonTextColor' | 'textColor' | 'typography' | 'bodyFont' | 'borderRadius'
>;
interface CustomPreset { id: string; name: string; theme: CustomPresetFields; }

function loadCustomPresets(): CustomPreset[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PRESETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function persistCustomPresets(list: CustomPreset[]) {
  try { localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(list)); } catch { /* plein */ }
}

function updateTheme(event: Event, update: (u: Partial<Event>) => void, patch: Partial<Theme>) {
  update({ theme: { ...event.theme, ...patch } });
}

export default function StepDesign({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'design')?.completed;
  const logoRef = useRef<HTMLInputElement>(null);
  const bgImageRef = useRef<HTMLInputElement>(null);
  // Chargé après le montage (pas en lazy initializer) pour ne pas désynchroniser
  // le rendu serveur/client au premier hydratation — même convention que le
  // reste du dashboard (AdminProvider, galerie invité…).
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  useEffect(() => { setCustomPresets(loadCustomPresets()); }, []);

  const theme = event.theme;

  // Un thème ne fait QUE préremplir les champs personnalisés ci-dessous — une
  // fois posées, ces valeurs sont la personnalisation du client : elles ne sont
  // plus jamais réécrites automatiquement (ex: par un second clic ailleurs).
  function applyPreset(key: ThemePreset) {
    updateTheme(event, update, THEME_PRESETS[key]);
  }

  function resetToTheme() {
    applyPreset(theme.preset);
  }

  function applyCustomPreset(cp: CustomPreset) {
    updateTheme(event, update, cp.theme);
  }

  function saveCurrentAsPreset() {
    const name = typeof window !== 'undefined' ? window.prompt('Nom du preset (ex: "Mon style mariage") ?') : null;
    if (!name || !name.trim()) return;
    const cp: CustomPreset = {
      id: generateId(),
      name: name.trim(),
      theme: {
        primaryColor: theme.primaryColor, secondaryColor: theme.secondaryColor,
        buttonColor: theme.buttonColor, buttonTextColor: theme.buttonTextColor,
        textColor: theme.textColor, typography: theme.typography, bodyFont: theme.bodyFont,
        borderRadius: theme.borderRadius,
      },
    };
    const updated = [...customPresets, cp];
    setCustomPresets(updated);
    persistCustomPresets(updated);
  }

  function deleteCustomPreset(id: string) {
    const updated = customPresets.filter(p => p.id !== id);
    setCustomPresets(updated);
    persistCustomPresets(updated);
  }

  function readImage(file: File, onDone: (dataUrl: string) => void) {
    const reader = new FileReader();
    reader.onload = e => onDone(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleLogo(files: FileList | null) {
    if (!files?.[0]) return;
    readImage(files[0], url => updateTheme(event, update, { logo: url }));
  }

  function handleBgImage(files: FileList | null) {
    if (!files?.[0]) return;
    readImage(files[0], url => updateTheme(event, update, { backgroundType: 'image', backgroundImage: url }));
  }

  const label = 'block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3';
  const swatchStyle = (active: boolean) => active
    ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.05)' }
    : { borderColor: 'rgba(26,15,8,0.1)', background: 'white' };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* ── Colonne réglages ── */}
        <div className="flex-1 min-w-0 w-full space-y-10">

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[12px] text-[#9B7A56]">
              Choisis un thème pour préremplir les couleurs, puis ajuste librement — tes réglages ne sont
              jamais perdus, même si tu changes de thème plus tard.
            </p>
            <button
              onClick={resetToTheme}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium border transition-colors hover:bg-[rgba(26,15,8,0.03)] flex-shrink-0"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
            >
              <RotateCcw size={12} />
              Réinitialiser au thème
            </button>
          </div>

          {/* ── a) Logo ── */}
          <div>
            <p className={label}>Logo</p>
            <div className="flex items-center gap-4 mb-4">
              {theme.logo ? (
                <div className="relative">
                  <img src={theme.logo} alt="logo"
                    className="w-16 h-16 rounded-full object-cover border-2"
                    style={{ borderColor: 'rgba(26,15,8,0.1)' }} />
                  <button
                    onClick={() => updateTheme(event, update, { logo: '' })}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                    <X size={9} className="text-white" />
                  </button>
                </div>
              ) : null}
              <button
                onClick={() => logoRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] transition-colors hover:bg-[rgba(26,15,8,0.03)]"
                style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}>
                <Upload size={13} />
                {theme.logo ? 'Changer le logo' : 'Importer un logo'}
              </button>
            </div>
            <input ref={logoRef} type="file" accept="image/*" className="hidden"
              onChange={e => handleLogo(e.target.files)} />

            {theme.logo && (
              <>
                <p className="text-[10px] text-[#9B7A56] mb-2">Où l&apos;afficher</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  {LOGO_PLACEMENTS.map(p => (
                    <button key={p.value}
                      onClick={() => updateTheme(event, update, { logoPlacement: p.value })}
                      className="p-3 rounded-xl border text-left transition-all"
                      style={swatchStyle(theme.logoPlacement === p.value)}>
                      <p className="text-[11px] font-semibold text-[#1A0F08]">{p.label}</p>
                      <p className="text-[10px] text-[#9B7A56] mt-0.5">{p.description}</p>
                    </button>
                  ))}
                </div>

                {theme.logoPlacement === 'watermark' && (
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl" style={{ background: 'rgba(26,15,8,0.02)' }}>
                    <div>
                      <p className="text-[10px] text-[#9B7A56] mb-2">Opacité — {theme.logoWatermarkOpacity}%</p>
                      <input type="range" min={2} max={40} value={theme.logoWatermarkOpacity}
                        onChange={e => updateTheme(event, update, { logoWatermarkOpacity: parseInt(e.target.value) })}
                        className="w-full accent-[#B85C28]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9B7A56] mb-2">Taille — {theme.logoWatermarkSize}%</p>
                      <input type="range" min={20} max={100} value={theme.logoWatermarkSize}
                        onChange={e => updateTheme(event, update, { logoWatermarkSize: parseInt(e.target.value) })}
                        className="w-full accent-[#B85C28]" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── b) Fond du site ── */}
          <div>
            <p className={label}>Fond du site</p>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => updateTheme(event, update, { backgroundType: 'color' })}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[12px] font-medium transition-all"
                style={swatchStyle(theme.backgroundType === 'color')}>
                <LayoutTemplate size={13} /> Couleur unie
              </button>
              <button
                onClick={() => updateTheme(event, update, { backgroundType: 'image' })}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[12px] font-medium transition-all"
                style={swatchStyle(theme.backgroundType === 'image')}>
                <ImageIcon size={13} /> Image
              </button>
            </div>

            {theme.backgroundType === 'color' ? (
              <div className="flex items-center gap-2">
                <input type="color" value={theme.backgroundColor}
                  onChange={e => updateTheme(event, update, { backgroundColor: e.target.value })}
                  className="w-8 h-8 rounded-lg border cursor-pointer" style={{ borderColor: 'rgba(26,15,8,0.1)' }} />
                <span className="text-[10px] text-[#5A3C1E] font-mono">{theme.backgroundColor}</span>
              </div>
            ) : (
              <div className="space-y-4">
                {theme.backgroundImage ? (
                  <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(26,15,8,0.1)', height: 120 }}>
                    <img src={theme.backgroundImage} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => updateTheme(event, update, { backgroundImage: '' })}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                      <X size={12} className="text-white" />
                    </button>
                    <button
                      onClick={() => bgImageRef.current?.click()}
                      className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
                      Remplacer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => bgImageRef.current?.click()}
                    className="w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-colors hover:border-[#B85C28]"
                    style={{ borderColor: 'rgba(26,15,8,0.12)', background: 'white' }}>
                    <Upload size={16} className="text-[#C4A882]" />
                    <p className="text-[11px] text-[#9B7A56]">Importer une image de fond</p>
                  </button>
                )}
                <input ref={bgImageRef} type="file" accept="image/*" className="hidden"
                  onChange={e => handleBgImage(e.target.files)} />

                <div>
                  <p className="text-[10px] text-[#9B7A56] mb-2">Overlay (lisibilité du texte)</p>
                  <div className="flex gap-2 mb-3">
                    {OVERLAY_TONES.map(o => (
                      <button key={o.value}
                        onClick={() => updateTheme(event, update, { backgroundOverlay: o.value })}
                        className="flex-1 py-2 rounded-lg border text-[11px] font-medium transition-all"
                        style={swatchStyle(theme.backgroundOverlay === o.value)}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {theme.backgroundOverlay !== 'none' && (
                    <>
                      <p className="text-[10px] text-[#9B7A56] mb-2">Intensité — {theme.backgroundOverlayOpacity}%</p>
                      <input type="range" min={0} max={90} value={theme.backgroundOverlayOpacity}
                        onChange={e => updateTheme(event, update, { backgroundOverlayOpacity: parseInt(e.target.value) })}
                        className="w-full accent-[#B85C28]" />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── c) Thème de couleurs ── */}
          <div>
            <p className={label}>Thème de couleurs</p>
            <p className="text-[11px] text-[#9B7A56] mb-3 -mt-2">Préremplit les couleurs personnalisées ci-dessous.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.key}
                  onClick={() => applyPreset(p.key)}
                  className="p-3 rounded-xl border text-left transition-all"
                  style={swatchStyle(theme.preset === p.key)}
                >
                  <div className="flex gap-1 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ background: THEME_PRESETS[p.key].primaryColor }} />
                    <div className="w-4 h-4 rounded-full" style={{ background: THEME_PRESETS[p.key].secondaryColor }} />
                    <div className="w-4 h-4 rounded-full" style={{ background: THEME_PRESETS[p.key].buttonColor }} />
                  </div>
                  <p className="text-[11px] font-semibold text-[#1A0F08]">{p.label}</p>
                  <p className="text-[10px] text-[#9B7A56]">{p.description}</p>
                </button>
              ))}
            </div>

            {customPresets.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] text-[#9B7A56] mb-2">Tes presets enregistrés</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {customPresets.map(cp => (
                    <div key={cp.id} className="relative group">
                      <button
                        onClick={() => applyCustomPreset(cp)}
                        className="w-full p-3 rounded-xl border text-left transition-all"
                        style={{ borderColor: 'rgba(26,15,8,0.1)', background: 'white' }}
                      >
                        <div className="flex gap-1 mb-2">
                          <div className="w-4 h-4 rounded-full" style={{ background: cp.theme.primaryColor }} />
                          <div className="w-4 h-4 rounded-full" style={{ background: cp.theme.secondaryColor }} />
                          <div className="w-4 h-4 rounded-full" style={{ background: cp.theme.buttonColor }} />
                        </div>
                        <p className="text-[11px] font-semibold text-[#1A0F08] truncate pr-4">{cp.name}</p>
                      </button>
                      <button
                        onClick={() => deleteCustomPreset(cp.id)}
                        className="absolute top-2 right-2 p-1 rounded hover:bg-red-50 text-[#9B7A56] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── d) Couleurs personnalisées ── */}
          <div>
            <p className={label}>Couleurs personnalisées</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {([
                { label: 'Principale', key: 'primaryColor' },
                { label: 'Secondaire', key: 'secondaryColor' },
                { label: 'Boutons',    key: 'buttonColor' },
                { label: 'Texte des boutons', key: 'buttonTextColor' },
                { label: 'Titres / Texte courant', key: 'textColor' },
              ] as const).map(({ label: l, key }) => (
                <div key={key}>
                  <p className="text-[10px] text-[#9B7A56] mb-1.5">{l}</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme[key] || '#B85C28'}
                      onChange={e => updateTheme(event, update, { [key]: e.target.value } as unknown as Partial<Theme>)}
                      className="w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0"
                      style={{ borderColor: 'rgba(26,15,8,0.1)' }}
                    />
                    <span className="text-[10px] text-[#5A3C1E] font-mono truncate">{theme[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── e) Typographie ── */}
          <div>
            <p className={label}>Typographie</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {([
                { label: 'Police des titres', key: 'typography' as const },
                { label: 'Police du texte courant', key: 'bodyFont' as const },
              ]).map(({ label: l, key }) => (
                <div key={key}>
                  <p className="text-[10px] text-[#9B7A56] mb-2">{l}</p>
                  <select
                    value={theme[key]}
                    onChange={e => updateTheme(event, update, { [key]: e.target.value as Typography } as unknown as Partial<Theme>)}
                    className="w-full px-3 py-2.5 text-[13px] rounded-xl border bg-white focus:outline-none mb-2"
                    style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
                  >
                    {FONT_GROUPS.map(group => (
                      <optgroup key={group} label={group}>
                        {FONT_OPTIONS.filter(f => f.group === group).map(f => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p className="text-lg px-1" style={{ fontFamily: FONT_OPTIONS.find(f => f.value === theme[key])?.css }}>
                    Mariage de Lina & Kamil
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── f) Arrondis ── */}
          <div>
            <p className={label}>Arrondis</p>
            <div className="flex flex-wrap gap-2">
              {RADII.map(r => (
                <button
                  key={r.value}
                  onClick={() => updateTheme(event, update, { borderRadius: r.value })}
                  className="px-4 py-2 border text-[12px] transition-all"
                  style={{
                    borderRadius: r.value === 'none' ? 4 : r.value === 'sm' ? 8 : r.value === 'md' ? 12 : r.value === 'lg' ? 18 : 999,
                    ...(theme.borderRadius === r.value
                      ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.06)', color: '#B85C28', fontWeight: 500 }
                      : { borderColor: 'rgba(26,15,8,0.1)', background: 'white', color: '#5A3C1E' }),
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── g) Bonus : enregistrer le thème actuel ── */}
          <div className="pt-6 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
            <button
              onClick={saveCurrentAsPreset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] font-medium transition-colors hover:bg-[rgba(26,15,8,0.03)]"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
            >
              <Save size={13} />
              Enregistrer le thème actuel comme preset
            </button>
            <p className="text-[11px] text-[#9B7A56] mt-2 flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#C4A882]" />
              Réutilisable pour tes prochains événements — apparaît ci-dessus, à côté des thèmes.
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
            <button
              onClick={markComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={isDone
                ? { background: 'rgba(90,122,90,0.1)', color: '#5A7A5A' }
                : { background: '#B85C28', color: 'white', boxShadow: '0 2px 12px rgba(184,92,40,0.25)' }
              }
            >
              <CheckCircle2 size={14} />
              {isDone ? 'Étape complétée ✓' : 'Marquer comme complété'}
            </button>
          </div>
        </div>

        {/* ── Colonne aperçu en direct ── */}
        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:sticky lg:top-6">
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56] mb-3">Aperçu en direct</p>
          <PhonePreview event={event} />
        </div>
      </div>
    </div>
  );
}
