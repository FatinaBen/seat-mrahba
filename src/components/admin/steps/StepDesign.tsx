'use client';

import { Event, Theme, ThemePreset, Typography, BorderRadius, THEME_PRESETS } from '@/lib/admin/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const PRESETS: { key: ThemePreset; label: string; emoji: string }[] = [
  { key: 'terracotta', label: 'Terracotta', emoji: '🏺' },
  { key: 'minimal', label: 'Minimal', emoji: '⬜' },
  { key: 'maroc-chic', label: 'Maroc Chic', emoji: '🌙' },
  { key: 'olive', label: 'Olive', emoji: '🫒' },
  { key: 'black-luxury', label: 'Black Luxury', emoji: '🖤' },
  { key: 'corporate', label: 'Corporate', emoji: '💼' },
];

const FONTS: { value: Typography; label: string }[] = [
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'inter', label: 'Inter' },
  { value: 'cormorant', label: 'Cormorant Garamond' },
];

const RADII: { value: BorderRadius; label: string }[] = [
  { value: 'none', label: 'Carré' },
  { value: 'sm', label: 'Léger' },
  { value: 'md', label: 'Moyen' },
  { value: 'lg', label: 'Arrondi' },
  { value: 'full', label: 'Pilule' },
];

function updateTheme(event: Event, update: (u: Partial<Event>) => void, patch: Partial<Theme>) {
  update({ theme: { ...event.theme, ...patch } });
}

export default function StepDesign({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'design')?.completed;

  function applyPreset(key: ThemePreset) {
    const preset = THEME_PRESETS[key];
    update({ theme: { ...event.theme, ...preset } });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8 space-y-8">

      {/* Presets */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">
          Thème prédéfini
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.key}
              onClick={() => applyPreset(p.key)}
              className="flex items-center gap-2 p-3 rounded-xl border transition-all text-left"
              style={event.theme.preset === p.key
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.05)' }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white' }
              }
            >
              <span className="text-lg">{p.emoji}</span>
              <div>
                <p className="text-[11px] font-medium text-[#1A0F08]">{p.label}</p>
                <div className="flex gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: THEME_PRESETS[p.key].primaryColor }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: THEME_PRESETS[p.key].secondaryColor }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">
          Couleurs personnalisées
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Couleur principale', key: 'primaryColor' },
            { label: 'Couleur secondaire', key: 'secondaryColor' },
            { label: 'Couleur boutons', key: 'buttonColor' },
          ].map(({ label, key }) => (
            <div key={key}>
              <p className="text-[10px] text-[#9B7A56] mb-1.5">{label}</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={(event.theme as unknown as Record<string, string>)[key]}
                  onChange={e => updateTheme(event, update, { [key]: e.target.value } as unknown as Partial<Theme>)}
                  className="w-8 h-8 rounded-lg border cursor-pointer"
                  style={{ borderColor: 'rgba(26,15,8,0.1)' }}
                />
                <span className="text-[11px] text-[#5A3C1E] font-mono">
                  {(event.theme as unknown as Record<string, string>)[key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">
          Typographie
        </label>
        <div className="flex flex-wrap gap-2">
          {FONTS.map(f => (
            <button
              key={f.value}
              onClick={() => updateTheme(event, update, { typography: f.value })}
              className="px-4 py-2 rounded-lg border text-[12px] transition-all"
              style={event.theme.typography === f.value
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.06)', color: '#B85C28', fontWeight: 500 }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white', color: '#5A3C1E' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border radius */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">
          Arrondis des cartes
        </label>
        <div className="flex flex-wrap gap-2">
          {RADII.map(r => (
            <button
              key={r.value}
              onClick={() => updateTheme(event, update, { borderRadius: r.value })}
              className="px-4 py-2 rounded-lg border text-[12px] transition-all"
              style={event.theme.borderRadius === r.value
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.06)', color: '#B85C28', fontWeight: 500 }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white', color: '#5A3C1E' }
              }
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
