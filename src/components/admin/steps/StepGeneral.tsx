'use client';

import { Event } from '@/lib/admin/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

// Étape volontairement minimale : le contenu affiché à l'invité (mariés, lieu,
// message d'accueil…) vient désormais du visuel Canva importé à l'étape
// "Page d'accueil", pas d'un formulaire. Nom + Date ne servent qu'à toi,
// pour identifier et trier tes événements dans le dashboard.
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
