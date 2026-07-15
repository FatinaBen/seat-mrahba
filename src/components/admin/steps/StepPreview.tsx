'use client';

import { Event } from '@/lib/admin/types';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import PhonePreview from '../PhonePreview';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

export default function StepPreview({ event, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'preview')?.completed;
  const eventUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/event/${event.id}`
    : `/event/${event.id}`;

  return (
    <div className="flex gap-8 px-8 py-8 max-w-4xl mx-auto">

      {/* Left — info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Aperçu</p>
        <h3 className="text-[17px] font-semibold text-[#1A0F08] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Voici ce que verront les invités
        </h3>

        <div className="space-y-3 mb-6">
          <InfoRow label="Recherche par prénom" desc="L'invité tape son prénom et trouve immédiatement sa table." />
          {event.sections.programme && <InfoRow label="Programme" desc="Le déroulé de la journée s'affiche chronologiquement." />}
          {event.sections.menu && <InfoRow label="Menu" desc="Les plats sont listés par section." />}
          {event.sections.gallery && <InfoRow label="Galerie collaborative" desc="Les invités peuvent uploader leurs photos le jour J." />}
          {!event.sections.programme && !event.sections.menu && !event.sections.gallery && (
            <p className="text-[12px] text-[#9B7A56] italic">Activez des sections dans l&apos;étape précédente pour enrichir le site invité.</p>
          )}
        </div>

        <a href={eventUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] font-medium transition-colors hover:bg-[rgba(26,15,8,0.03)]"
          style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}>
          <ExternalLink size={13} />
          Ouvrir la page invité
        </a>

        <div className="pt-6 mt-6 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
          <button onClick={markComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all"
            style={isDone
              ? { background: 'rgba(90,122,90,0.1)', color: '#5A7A5A' }
              : { background: '#B85C28', color: 'white', boxShadow: '0 2px 12px rgba(184,92,40,0.25)' }
            }>
            <CheckCircle2 size={14} />
            {isDone ? 'Aperçu validé ✓' : 'Valider l\'aperçu'}
          </button>
        </div>
      </div>

      {/* Right — phone */}
      <div className="flex-shrink-0">
        <PhonePreview event={event} />
      </div>
    </div>
  );
}

function InfoRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#B85C28' }} />
      <div>
        <p className="text-[12px] font-semibold text-[#1A0F08]">{label}</p>
        <p className="text-[11px] text-[#9B7A56] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
