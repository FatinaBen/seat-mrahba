'use client';

import { useRef } from 'react';
import { Event, Sections, ProgrammeItem } from '@/lib/admin/types';
import { generateId } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2, ToggleLeft, ToggleRight, Upload, X, ImageIcon, Users, FileText, UtensilsCrossed, Camera } from 'lucide-react';

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

const inp = "w-full px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none";
const inpS = { borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' };

export default function StepSections({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'sections')?.completed;
  const menuImgRef = useRef<HTMLInputElement>(null);

  function sec(patch: Partial<Sections>) {
    update({ sections: { ...event.sections, ...patch } });
  }

  function addP() {
    update({ programme: [...event.programme, { id: generateId(), time: '', title: '', description: '' }] });
  }
  function updP(id: string, p: Partial<ProgrammeItem>) {
    update({ programme: event.programme.map(x => x.id === id ? { ...x, ...p } : x) });
  }
  function delP(id: string) { update({ programme: event.programme.filter(x => x.id !== id) }); }

  function handleMenuImage(files: FileList | null) {
    if (!files?.[0]) return;
    const reader = new FileReader();
    reader.onload = e => update({ menuImage: e.target?.result as string });
    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">

      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Sections du site invité</p>
      <p className="text-[12px] text-[#9B7A56] mb-5">Activez ce qui apparaîtra sur le site invité.</p>

      <div className="space-y-3">

        {/* Plan de table */}
        <Toggle
          active={event.sections.seatingPlan}
          onChange={() => sec({ seatingPlan: !event.sections.seatingPlan })}
          icon={<Users size={16} />}
          label="Plan de table"
          desc="Import Excel → généré automatiquement"
        />

        {/* Programme */}
        <Toggle
          active={event.sections.programme}
          onChange={() => sec({ programme: !event.sections.programme })}
          icon={<FileText size={16} />}
          label="Programme"
          desc="Éditeur de texte — horaires & titres"
        />

        {event.sections.programme && (
          <div className="ml-4 pl-4 border-l space-y-3" style={{ borderColor: 'rgba(184,92,40,0.2)' }}>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-[#1A0F08]">Contenu du programme</p>
              <button onClick={addP} className="flex items-center gap-1 text-[11px] text-[#B85C28] font-medium hover:underline">
                <Plus size={11} /> Ajouter
              </button>
            </div>
            {event.programme.length === 0 ? (
              <button onClick={addP}
                className="w-full py-3 rounded-xl border-2 border-dashed text-[12px] text-[#9B7A56] hover:border-[#B85C28] hover:text-[#B85C28] transition-colors"
                style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
                + Ajouter une entrée
              </button>
            ) : (
              <div className="space-y-2">
                {event.programme.map(item => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <input value={item.time} onChange={e => updP(item.id, { time: e.target.value })}
                      placeholder="18:00" className="w-20 px-2 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] text-center focus:outline-none" style={inpS} />
                    <input value={item.title} onChange={e => updP(item.id, { title: e.target.value })}
                      placeholder="Cocktail, Cérémonie…" className={`flex-1 ${inp}`} style={inpS} />
                    <button onClick={() => delP(item.id)} className="p-2 text-[#9B7A56] hover:text-red-400">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Menu */}
        <Toggle
          active={event.sections.menu}
          onChange={() => sec({ menu: !event.sections.menu })}
          icon={<UtensilsCrossed size={16} />}
          label="Menu"
          desc="Import d'un visuel Canva (PNG, JPG)"
        />

        {event.sections.menu && (
          <div className="ml-4 pl-4 border-l space-y-3" style={{ borderColor: 'rgba(184,92,40,0.2)' }}>
            <p className="text-[11px] text-[#9B7A56]">
              Importez votre menu créé sur Canva. Il sera affiché en pleine largeur, sans modification.
            </p>
            {event.menuImage ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={event.menuImage} alt="Menu" className="w-full object-contain rounded-xl border"
                  style={{ borderColor: 'rgba(26,15,8,0.08)', maxHeight: 280 }} />
                <button
                  onClick={() => update({ menuImage: '' })}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                  <X size={12} className="text-white" />
                </button>
                <button
                  onClick={() => menuImgRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
                  Changer
                </button>
              </div>
            ) : (
              <button
                onClick={() => menuImgRef.current?.click()}
                className="w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#B85C28]"
                style={{ borderColor: 'rgba(26,15,8,0.12)', background: '#FDFCF9' }}>
                <ImageIcon size={18} className="text-[#C4A882]" />
                <p className="text-[12px] text-[#9B7A56]">Importer le visuel du menu</p>
              </button>
            )}
            <input ref={menuImgRef} type="file" accept="image/*" className="hidden"
              onChange={e => handleMenuImage(e.target.files)} />
          </div>
        )}

        {/* Galerie */}
        <Toggle
          active={event.sections.gallery}
          onChange={() => sec({ gallery: !event.sections.gallery })}
          icon={<Camera size={16} />}
          label="Galerie collaborative"
          desc="Upload de photos par les invités le jour J"
        />

        {event.sections.gallery && (
          <div className="ml-4 pl-4 border-l" style={{ borderColor: 'rgba(184,92,40,0.2)' }}>
            <p className="text-[11px] text-[#9B7A56]">
              Les invités pourront uploader leurs photos directement depuis le site. Toutes les photos seront visibles par tous.
            </p>
          </div>
        )}
      </div>

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
