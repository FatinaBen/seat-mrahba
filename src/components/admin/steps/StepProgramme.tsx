'use client';

import { useRef, useState } from 'react';
import { Event, ProgrammeItem } from '@/lib/admin/types';
import { generateId } from '@/lib/admin/utils';
import { CheckCircle2, Upload, X, ImageIcon, ToggleLeft, ToggleRight, Plus, Trash2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const inp = "flex-1 px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none";
const inpS = { borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' };

export default function StepProgramme({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'programme')?.completed;
  const fileRef = useRef<HTMLInputElement>(null);
  const active = event.sections.programme;
  const [showText, setShowText] = useState(event.programme.length > 0 && !event.programmeImage);

  function toggle() {
    update({ sections: { ...event.sections, programme: !active } });
  }

  function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = e => update({ programmeImage: e.target?.result as string });
    reader.readAsDataURL(file);
  }

  function addP() {
    update({ programme: [...event.programme, { id: generateId(), time: '', title: '', description: '' }] });
  }
  function updP(id: string, p: Partial<ProgrammeItem>) {
    update({ programme: event.programme.map(x => x.id === id ? { ...x, ...p } : x) });
  }
  function delP(id: string) { update({ programme: event.programme.filter(x => x.id !== id) }); }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Programme</p>
      <p className="text-[12px] text-[#9B7A56] mb-5">
        Section optionnelle. Si elle n&apos;est pas activée, aucune section Programme n&apos;apparaît sur le site invité.
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
          <p className="text-[13px] font-medium text-[#1A0F08]">Activer le programme</p>
          <p className="text-[11px] text-[#9B7A56] mt-0.5">Import d&apos;un visuel Canva (PNG, JPG)</p>
        </div>
        {active
          ? <ToggleRight size={22} className="flex-shrink-0 text-[#B85C28]" />
          : <ToggleLeft size={22} className="flex-shrink-0 text-[rgba(26,15,8,0.2)]" />
        }
      </div>

      {active && (
        <>
          <div className="flex gap-8 items-start flex-wrap mb-6">
            {/* Import / preview */}
            <div className="flex-1 min-w-[260px]">
              <p className="text-[11px] text-[#9B7A56] mb-3">
                Importez votre programme créé sur Canva (format vertical 1080×1920 px conseillé). Il sera affiché tel quel, sans modification.
              </p>
              {event.programmeImage ? (
                <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
                  <img src={event.programmeImage} alt="Programme" className="w-full object-contain" style={{ maxHeight: 320, background: '#F4F1ED' }} />
                  <button
                    onClick={() => update({ programmeImage: '' })}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                    <X size={12} className="text-white" />
                  </button>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
                    Remplacer le visuel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#B85C28]"
                  style={{ borderColor: 'rgba(26,15,8,0.12)', background: 'white' }}>
                  <Upload size={20} className="text-[#C4A882]" />
                  <p className="text-[12px] font-medium text-[#1A0F08]">Importer le visuel</p>
                  <p className="text-[10px] text-[#C4A882]">PNG ou JPG</p>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden"
                onChange={e => handleFile(e.target.files)} />
            </div>

            {/* Aperçu mobile */}
            <div className="flex-shrink-0">
              <p className="text-[10px] uppercase tracking-wide text-[#9B7A56] mb-2 text-center">Aperçu mobile</p>
              <div className="relative rounded-[28px] border-[6px] border-[#1A0F08] overflow-hidden shadow-lg" style={{ width: 140, height: 280, background: '#fff' }}>
                {event.programmeImage ? (
                  <img src={event.programmeImage} alt="" className="w-full h-full object-contain" style={{ background: '#fff' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={20} className="text-[rgba(26,15,8,0.15)]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Option de secours : saisie texte, sans visuel Canva */}
          {!event.programmeImage && (
            <div className="pt-2">
              <button
                onClick={() => setShowText(v => !v)}
                className="text-[11px] font-medium text-[#B85C28] hover:underline mb-3"
              >
                {showText ? 'Masquer la saisie texte' : 'Pas de visuel Canva ? Saisir le programme en texte →'}
              </button>

              {showText && (
                <div className="ml-4 pl-4 border-l space-y-3" style={{ borderColor: 'rgba(184,92,40,0.2)' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-[#1A0F08]">Déroulé de la journée</p>
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
                            placeholder="Cocktail, Cérémonie…" className={inp} style={inpS} />
                          <button onClick={() => delP(item.id)} className="p-2 text-[#9B7A56] hover:text-red-400">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
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
