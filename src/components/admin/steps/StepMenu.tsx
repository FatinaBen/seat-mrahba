'use client';

import { Event } from '@/lib/admin/types';
import { CheckCircle2, ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';
import ImageUploadCropper from '../ImageUploadCropper';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

export default function StepMenu({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'menu')?.completed;
  const active = event.sections.menu;

  function toggle() {
    update({ sections: { ...event.sections, menu: !active } });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Menu</p>
      <p className="text-[12px] text-[#9B7A56] mb-5">
        Section optionnelle. Si elle n&apos;est pas activée, aucune section Menu n&apos;apparaît sur le site invité.
      </p>

      <div
        className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer select-none transition-all mb-6"
        style={{
          borderColor: active ? 'rgba(184,92,40,0.3)' : 'rgba(26,15,8,0.08)',
          background: active ? 'rgba(184,92,40,0.03)' : 'white',
        }}
        onClick={toggle}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#1A0F08]">Activer le menu</p>
          <p className="text-[11px] text-[#9B7A56] mt-0.5">Import d&apos;un visuel Canva (PNG, JPG)</p>
        </div>
        {active
          ? <ToggleRight size={22} className="flex-shrink-0 text-[#B85C28]" />
          : <ToggleLeft size={22} className="flex-shrink-0 text-[rgba(26,15,8,0.2)]" />
        }
      </div>

      {active && (
        <div className="flex gap-8 items-start flex-wrap">
          {/* Import / recadrage / preview */}
          <div className="flex-1 min-w-[260px]">
            <ImageUploadCropper
              image={event.menuImage}
              sourceImage={event.menuImageSource}
              onChange={({ image, source }) => update({ menuImage: image, menuImageSource: source })}
              onRemove={() => update({ menuImage: '', menuImageSource: '' })}
              hint="Importez votre menu créé sur Canva. Il est recadré au format vertical à la validation, pour remplir tout l'écran sans bande noire."
              alt="Menu"
              emptyHeight={224}
            />
          </div>

          {/* Aperçu mobile */}
          <div className="flex-shrink-0">
            <p className="text-[10px] uppercase tracking-wide text-[#9B7A56] mb-2 text-center">Aperçu mobile</p>
            <div className="relative rounded-[28px] border-[6px] border-[#1A0F08] overflow-hidden shadow-lg" style={{ width: 140, height: 280, background: '#fff' }}>
              {event.menuImage ? (
                <img src={event.menuImage} alt="" className="w-full h-full object-cover" style={{ background: '#fff' }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={20} className="text-[rgba(26,15,8,0.15)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 mt-8 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
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
