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

const inputClass = "w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors";
const inputStyle = { borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' };

export default function StepGeneral({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'general')?.completed;

  return (
    <div className="max-w-xl mx-auto px-8 py-8 space-y-5">

      {/* Nom */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Nom de l&apos;événement *
        </label>
        <input
          value={event.name}
          onChange={e => update({ name: e.target.value })}
          placeholder="Ex: Mariage Amine & Nadia"
          className={inputClass}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#B85C28')}
          onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Type *
        </label>
        <div className="grid grid-cols-4 gap-2">
          {EVENT_TYPES.map(t => (
            <button
              key={t}
              onClick={() => update({ type: t })}
              className="py-2 px-3 rounded-xl text-[12px] font-medium transition-all border"
              style={event.type === t
                ? { background: '#B85C28', color: 'white', borderColor: '#B85C28' }
                : { background: 'white', color: '#5A3C1E', borderColor: 'rgba(26,15,8,0.1)' }
              }
            >
              {EVENT_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Date + Heure */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Date *
          </label>
          <input
            type="date"
            value={event.date}
            onChange={e => update({ date: e.target.value })}
            className={inputClass}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Heure
          </label>
          <input
            type="time"
            value={event.time}
            onChange={e => update({ time: e.target.value })}
            className={inputClass}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>
      </div>

      {/* Lieu */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Lieu / Salle
        </label>
        <input
          value={event.venue}
          onChange={e => update({ venue: e.target.value })}
          placeholder="Ex: Palais Dar Zitoun, Casablanca"
          className={inputClass}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#B85C28')}
          onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
        />
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Adresse
        </label>
        <textarea
          value={event.address}
          onChange={e => update({ address: e.target.value })}
          placeholder="Adresse complète affichée sur la page invité"
          rows={2}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#B85C28')}
          onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
        />
      </div>

      {/* Noms affichés */}
      <div>
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Noms affichés (mariés, fêtés…)
        </label>
        <input
          value={event.organizers}
          onChange={e => update({ organizers: e.target.value })}
          placeholder="Ex: Amine & Nadia"
          className={inputClass}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#B85C28')}
          onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
        />
      </div>

      {/* Mark complete */}
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
