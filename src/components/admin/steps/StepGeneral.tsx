'use client';

import { Event, EventType, EVENT_TYPE_LABELS } from '@/lib/admin/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const EVENT_TYPES: EventType[] = ['mariage', 'fiancailles', 'baby-shower', 'anniversaire', 'corporate', 'gala', 'autre'];

export default function StepGeneral({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'general')?.completed;

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <div className="space-y-6">

        {/* Event name */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Nom de l&apos;événement *
          </label>
          <input
            value={event.name}
            onChange={e => update({ name: e.target.value })}
            placeholder="Ex: Mariage Amine & Nadia"
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Type d&apos;événement *
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {EVENT_TYPES.map(t => (
              <button
                key={t}
                onClick={() => update({ type: t })}
                className="py-2.5 px-3 rounded-xl text-[12px] font-medium transition-all border"
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

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
              Date *
            </label>
            <input
              type="date"
              value={event.date}
              onChange={e => update({ date: e.target.value })}
              className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
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
              className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
              onFocus={e => (e.target.style.borderColor = '#B85C28')}
              onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
            />
          </div>
        </div>

        {/* Venue */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Lieu / Salle
          </label>
          <input
            value={event.venue}
            onChange={e => update({ venue: e.target.value })}
            placeholder="Ex: Palais des congrès, Casablanca"
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Adresse complète
          </label>
          <textarea
            value={event.address}
            onChange={e => update({ address: e.target.value })}
            placeholder="Adresse, ville, code postal..."
            rows={2}
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors resize-none"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>

        {/* Google Maps URL */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Lien Google Maps
          </label>
          <input
            value={event.sections.mapsUrl}
            onChange={e => update({ sections: { ...event.sections, mapsUrl: e.target.value } })}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
              Téléphone organisateur
            </label>
            <input
              value={event.phone}
              onChange={e => update({ phone: e.target.value })}
              placeholder="+212 6XX XXX XXX"
              className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
              onFocus={e => (e.target.style.borderColor = '#B85C28')}
              onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
              Email
            </label>
            <input
              type="email"
              value={event.email}
              onChange={e => update({ email: e.target.value })}
              placeholder="organisateur@email.com"
              className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
              onFocus={e => (e.target.style.borderColor = '#B85C28')}
              onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
            />
          </div>
        </div>

        {/* Organizers */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Noms des mariés / organisateurs
          </label>
          <input
            value={event.organizers}
            onChange={e => update({ organizers: e.target.value })}
            placeholder="Ex: Amine & Nadia"
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
            onFocus={e => (e.target.style.borderColor = '#B85C28')}
            onBlur={e => (e.target.style.borderColor = 'rgba(26,15,8,0.12)')}
          />
        </div>

        {/* Guest count */}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Nombre d&apos;invités estimé
          </label>
          <input
            type="number"
            min={0}
            value={event.guestCount || ''}
            onChange={e => update({ guestCount: parseInt(e.target.value) || 0 })}
            placeholder="200"
            className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
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
    </div>
  );
}
