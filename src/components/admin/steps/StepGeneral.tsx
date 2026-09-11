'use client';

import { Event, EventType, EVENT_TYPE_LABELS, CTA_TEXT_DEFAULTS } from '@/lib/admin/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

// Sert à choisir le texte par défaut du repère de scroll ("Rejoignez la
// célébration", etc.) — voir CTA_TEXT_DEFAULTS. N'apparaît nulle part
// littéralement sur le site (contrairement au nom, purement interne).
const EVENT_TYPES: EventType[] = [
  'mariage', 'fiancailles', 'baby-shower', 'anniversaire', 'corporate', 'gala', 'autre',
];

export default function StepGeneral({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'general')?.completed;

  function field(label: string, content: React.ReactNode) {
    return (
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">{label}</label>
        {content}
      </div>
    );
  }

  const inp = "w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors";
  const s = { borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' };
  const focus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = '#B85C28');
  const blur  = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'rgba(26,15,8,0.12)');

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-5">

      <p className="text-[12px] text-[#9B7A56] -mt-1 mb-1">
        Sert uniquement à identifier et trier l&apos;événement dans ton dashboard — rien de tout ça n&apos;apparaît
        sur le site invité (le visuel Canva de la page d&apos;accueil s&apos;en charge).
      </p>

      {field('Nom de l\'événement *',
        <input value={event.name} onChange={e => update({ name: e.target.value })}
          placeholder="Ex: Mariage Amine & Nadia" className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Date *',
        <input type="date" value={event.date} onChange={e => update({ date: e.target.value })}
          className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Type d\'événement',
        <div className="grid grid-cols-4 gap-2">
          {EVENT_TYPES.map(t => (
            <button key={t} onClick={() => update({ type: t })}
              className="py-2 px-2 rounded-xl text-[11px] font-medium transition-all border"
              style={event.type === t
                ? { background: '#B85C28', color: 'white', borderColor: '#B85C28' }
                : { background: 'white', color: '#5A3C1E', borderColor: 'rgba(26,15,8,0.1)' }
              }>
              {EVENT_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      )}
      <p className="text-[11px] text-[#9B7A56] -mt-3">
        Choisit le texte par défaut du repère de défilement sur le site invité (ex: « Rejoignez la célébration »
        pour un mariage). Réglable ci-dessous.
      </p>

      {field('Texte du repère de défilement (optionnel)',
        <input value={event.ctaText} onChange={e => update({ ctaText: e.target.value })}
          placeholder={CTA_TEXT_DEFAULTS[event.type]} className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}
      <p className="text-[11px] text-[#9B7A56] -mt-3">
        Vu par les invités sous le titre de l&apos;écran d&apos;accueil (si aucun visuel Canva n&apos;est importé). Laisse vide
        pour utiliser le texte par défaut du type d&apos;événement.
      </p>

      <div className="pt-4 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
        <button onClick={markComplete}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all"
          style={isDone
            ? { background: 'rgba(90,122,90,0.1)', color: '#5A7A5A' }
            : { background: '#B85C28', color: 'white', boxShadow: '0 2px 12px rgba(184,92,40,0.25)' }
          }>
          <CheckCircle2 size={14} />
          {isDone ? 'Étape complétée ✓' : 'Marquer comme complété'}
        </button>
      </div>
    </div>
  );
}
