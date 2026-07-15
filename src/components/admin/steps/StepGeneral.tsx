'use client';

import { Event, EventType, EVENT_TYPE_LABELS } from '@/lib/admin/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const EVENT_TYPES: EventType[] = [
  'mariage', 'fiancailles', 'baby-shower', 'anniversaire', 'corporate', 'gala', 'autre',
];

export default function StepGeneral({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'general')?.completed;
  const autoCount = event.guests.length;

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
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = '#B85C28');
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'rgba(26,15,8,0.12)');

  return (
    <div className="max-w-xl mx-auto px-8 py-8 space-y-5">

      {field('Nom de l\'événement *',
        <input value={event.name} onChange={e => update({ name: e.target.value })}
          placeholder="Ex: Mariage Amine & Nadia" className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Type d\'événement *',
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

      <div className="grid grid-cols-2 gap-4">
        {field('Date *',
          <input type="date" value={event.date} onChange={e => update({ date: e.target.value })}
            className={inp} style={s} onFocus={focus} onBlur={blur} />
        )}
        {field('Heure',
          <input type="time" value={event.time} onChange={e => update({ time: e.target.value })}
            className={inp} style={s} onFocus={focus} onBlur={blur} />
        )}
      </div>

      {field('Lieu / Salle',
        <input value={event.venue} onChange={e => update({ venue: e.target.value })}
          placeholder="Ex: Palais Dar Zitoun, Casablanca" className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Adresse',
        <textarea value={event.address} onChange={e => update({ address: e.target.value })}
          placeholder="Adresse affichée sur la page invité" rows={2}
          className={`${inp} resize-none`} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Prénom & nom affichés (mariés, fêtés…)',
        <input value={event.organizers} onChange={e => update({ organizers: e.target.value })}
          placeholder="Ex: Amine & Nadia" className={inp} style={s} onFocus={focus} onBlur={blur} />
      )}

      {field('Nombre d\'invités',
        <div className="flex items-center gap-3">
          <input type="number" min={0}
            value={autoCount > 0 ? autoCount : (event.guestCount || '')}
            onChange={e => update({ guestCount: parseInt(e.target.value) || 0 })}
            placeholder="200"
            readOnly={autoCount > 0}
            className={`${inp} w-32`}
            style={{ ...s, background: autoCount > 0 ? 'rgba(26,15,8,0.03)' : 'white' }}
          />
          {autoCount > 0 && (
            <span className="text-[11px] text-[#5A7A5A]">
              ✓ {autoCount} invités importés
            </span>
          )}
        </div>
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
