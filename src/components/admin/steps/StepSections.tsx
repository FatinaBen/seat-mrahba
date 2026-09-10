'use client';

import { Event, Sections } from '@/lib/admin/types';
import { CheckCircle2, ToggleLeft, ToggleRight, Camera } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

function Toggle({ active, onChange, icon, label, desc }: {
  active: boolean; onChange: () => void;
  icon: React.ReactNode; label: string; desc: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer select-none transition-all"
      style={{
        borderColor: active ? 'rgba(184,92,40,0.3)' : 'rgba(26,15,8,0.08)',
        background: active ? 'rgba(184,92,40,0.03)' : 'white',
      }}
      onClick={onChange}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: active ? 'rgba(184,92,40,0.1)' : 'rgba(26,15,8,0.05)' }}>
        <span style={{ color: active ? '#B85C28' : 'rgba(26,15,8,0.3)' }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#1A0F08]">{label}</p>
        <p className="text-[11px] text-[#9B7A56] mt-0.5">{desc}</p>
      </div>
      {active
        ? <ToggleRight size={22} className="flex-shrink-0 text-[#B85C28]" />
        : <ToggleLeft  size={22} className="flex-shrink-0 text-[rgba(26,15,8,0.2)]" />
      }
    </div>
  );
}

// Étape bonus (non prioritaire dans le nouveau parcours) : galerie photo collaborative.
// Fonctionnalité existante conservée telle quelle, non concernée par la restructuration demandée.
export default function StepSections({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'gallery')?.completed;

  function sec(patch: Partial<Sections>) {
    update({ sections: { ...event.sections, ...patch } });
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">

      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Galerie</p>
      <p className="text-[12px] text-[#9B7A56] mb-5">Section bonus, optionnelle, non incluse dans le parcours principal.</p>

      <Toggle
        active={event.sections.gallery}
        onChange={() => sec({ gallery: !event.sections.gallery })}
        icon={<Camera size={16} />}
        label="Galerie collaborative"
        desc="Upload de photos par les invités le jour J"
      />

      {event.sections.gallery && (
        <div className="ml-4 pl-4 mt-3 border-l" style={{ borderColor: 'rgba(184,92,40,0.2)' }}>
          <p className="text-[11px] text-[#9B7A56]">
            Les invités pourront uploader leurs photos directement depuis le site. Toutes les photos seront visibles par tous.
          </p>
        </div>
      )}

      <div className="pt-6 mt-6 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
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
