'use client';

import { useRef } from 'react';
import { Event, Theme, ThemePreset, Typography, BorderRadius, THEME_PRESETS } from '@/lib/admin/types';
import { CheckCircle2, Upload, X } from 'lucide-react';

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

const FONTS: { value: Typography; label: string; preview: string }[] = [
  { value: 'playfair',  label: 'Playfair Display',   preview: 'Mariage' },
  { value: 'cormorant', label: 'Cormorant Garamond',  preview: 'Mariage' },
  { value: 'inter',     label: 'Inter',               preview: 'Mariage' },
];

const RADII: { value: BorderRadius; label: string }[] = [
  { value: 'none', label: 'Carré' },
  { value: 'sm',   label: 'Léger' },
  { value: 'md',   label: 'Moyen' },
  { value: 'lg',   label: 'Arrondi' },
  { value: 'full', label: 'Pilule' },
];

const FONT_PREVIEW: Record<string, string> = {
  playfair: '"Playfair Display", serif',
  cormorant: '"Cormorant Garamond", serif',
  inter: 'Inter, sans-serif',
};

function updateTheme(event: Event, update: (u: Partial<Event>) => void, patch: Partial<Theme>) {
  update({ theme: { ...event.theme, ...patch } });
}

export default function StepDesign({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'design')?.completed;
  const coverRef = useRef<HTMLInputElement>(null);
  const logoRef  = useRef<HTMLInputElement>(null);

  function applyPreset(key: ThemePreset) {
    update({ theme: { ...event.theme, ...THEME_PRESETS[key] } });
  }

  function readImage(file: File, onDone: (dataUrl: string) => void) {
    const reader = new FileReader();
    reader.onload = e => onDone(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleCover(files: FileList | null) {
    if (!files?.[0]) return;
    readImage(files[0], url => updateTheme(event, update, { heroImage: url }));
  }

  function handleLogo(files: FileList | null) {
    if (!files?.[0]) return;
    readImage(files[0], url => updateTheme(event, update, { logo: url }));
  }

  const label = 'block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3';

  return (
    <div className="max-w-2xl mx-auto px-8 py-8 space-y-10">

      {/* ── Image de couverture ── */}
      <div>
        <p className={label}>Image de couverture</p>
        <p className="text-[11px] text-[#9B7A56] mb-3 -mt-2">
          Cette image sera affichée en plein écran sur le site invité.
        </p>
        {event.theme.heroImage ? (
          <div className="relative rounded-2xl overflow-hidden" style={{ height: 160 }}>
            <img src={event.theme.heroImage} alt="cover" className="w-full h-full object-cover" />
            <button
              onClick={() => updateTheme(event, update, { heroImage: '' })}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
              <X size={12} className="text-white" />
            </button>
            <button
              onClick={() => coverRef.current?.click()}
              className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
              Changer
            </button>
          </div>
        ) : (
          <button
            onClick={() => coverRef.current?.click()}
            className="w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#B85C28]"
            style={{ borderColor: 'rgba(26,15,8,0.12)', background: 'white' }}>
            <Upload size={20} className="text-[#C4A882]" />
            <p className="text-[12px] text-[#9B7A56]">Importer une image de couverture</p>
            <p className="text-[10px] text-[#C4A882]">JPG, PNG, WebP — recommandé 1200×800 px</p>
          </button>
        )}
        <input ref={coverRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleCover(e.target.files)} />
      </div>

      {/* ── Logo ── */}
      <div>
        <p className={label}>Logo</p>
        <p className="text-[11px] text-[#9B7A56] mb-3 -mt-2">
          Affiché en haut du Hero si aucune photo n&apos;est définie.
        </p>
        <div className="flex items-center gap-4">
          {event.theme.logo ? (
            <div className="relative">
              <img src={event.theme.logo} alt="logo"
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
            {event.theme.logo ? 'Changer le logo' : 'Importer un logo'}
          </button>
        </div>
        <input ref={logoRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleLogo(e.target.files)} />
      </div>

      {/* ── Thèmes ── */}
      <div>
        <p className={label}>Thème de couleurs</p>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.key}
              onClick={() => applyPreset(p.key)}
              className="p-3 rounded-xl border text-left transition-all"
              style={event.theme.preset === p.key
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.05)' }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white' }
              }
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
      </div>

      {/* ── Couleurs personnalisées ── */}
      <div>
        <p className={label}>Couleurs personnalisées</p>
        <div className="grid grid-cols-3 gap-4">
          {([
            { label: 'Principale', key: 'primaryColor' },
            { label: 'Secondaire', key: 'secondaryColor' },
            { label: 'Boutons',    key: 'buttonColor' },
          ] as const).map(({ label: l, key }) => (
            <div key={key}>
              <p className="text-[10px] text-[#9B7A56] mb-1.5">{l}</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={(event.theme as unknown as Record<string, string>)[key] || '#B85C28'}
                  onChange={e => updateTheme(event, update, { [key]: e.target.value } as unknown as Partial<Theme>)}
                  className="w-8 h-8 rounded-lg border cursor-pointer"
                  style={{ borderColor: 'rgba(26,15,8,0.1)' }}
                />
                <span className="text-[10px] text-[#5A3C1E] font-mono">
                  {(event.theme as unknown as Record<string, string>)[key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Typographie ── */}
      <div>
        <p className={label}>Typographie</p>
        <div className="grid grid-cols-3 gap-2">
          {FONTS.map(f => (
            <button
              key={f.value}
              onClick={() => updateTheme(event, update, { typography: f.value })}
              className="p-3 rounded-xl border text-left transition-all"
              style={event.theme.typography === f.value
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.05)' }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white' }
              }
            >
              <p className="text-xl mb-1" style={{ fontFamily: FONT_PREVIEW[f.value] }}>{f.preview}</p>
              <p className="text-[10px] text-[#9B7A56]">{f.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Arrondis ── */}
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
                ...(event.theme.borderRadius === r.value
                  ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.06)', color: '#B85C28', fontWeight: 500 }
                  : { borderColor: 'rgba(26,15,8,0.1)', background: 'white', color: '#5A3C1E' }),
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
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
  );
}
