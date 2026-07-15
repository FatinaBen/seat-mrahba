'use client';

import { Event, Sections, ProgrammeItem, MenuSection, MenuItem } from '@/lib/admin/types';
import { generateId } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2, ToggleLeft, ToggleRight, ChevronDown } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

function Toggle({ active, onChange, label }: { active: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white border cursor-pointer select-none"
      style={{ borderColor: active ? 'rgba(184,92,40,0.3)' : 'rgba(26,15,8,0.08)' }}
      onClick={onChange}>
      <span className="text-[13px] font-medium text-[#1A0F08]">{label}</span>
      {active
        ? <ToggleRight size={24} className="text-[#B85C28]" />
        : <ToggleLeft size={24} className="text-[rgba(26,15,8,0.2)]" />
      }
    </div>
  );
}

const inp = "w-full px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none";
const inpS = { borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' };

export default function StepSections({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'sections')?.completed;

  function sec(patch: Partial<Sections>) {
    update({ sections: { ...event.sections, ...patch } });
  }

  // Programme
  function addP() {
    update({ programme: [...event.programme, { id: generateId(), time: '', title: '', description: '' }] });
  }
  function updP(id: string, p: Partial<ProgrammeItem>) {
    update({ programme: event.programme.map(x => x.id === id ? { ...x, ...p } : x) });
  }
  function delP(id: string) { update({ programme: event.programme.filter(x => x.id !== id) }); }

  // Menu
  function addSection() {
    update({ menu: [...event.menu, { id: generateId(), label: 'Entrées', items: [] }] });
  }
  function addItem(sid: string) {
    update({ menu: event.menu.map(s => s.id === sid ? { ...s, items: [...s.items, { id: generateId(), name: '' }] } : s) });
  }
  function updSection(id: string, label: string) {
    update({ menu: event.menu.map(s => s.id === id ? { ...s, label } : s) });
  }
  function updItem(sid: string, iid: string, name: string) {
    update({ menu: event.menu.map(s => s.id === sid ? { ...s, items: s.items.map(i => i.id === iid ? { ...i, name } : i) } : s) });
  }
  function delSection(id: string) { update({ menu: event.menu.filter(s => s.id !== id) }); }
  function delItem(sid: string, iid: string) {
    update({ menu: event.menu.map(s => s.id === sid ? { ...s, items: s.items.filter(i => i.id !== iid) } : s) });
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8 space-y-6">

      <div>
        <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Sections affichées</p>
        <p className="text-[12px] text-[#9B7A56] mb-4">Choisissez ce qui apparaîtra sur le site invité.</p>

        <div className="space-y-2">
          <Toggle active={event.sections.seatingPlan} onChange={() => sec({ seatingPlan: !event.sections.seatingPlan })} label="Plan de table" />
          <Toggle active={event.sections.menu} onChange={() => sec({ menu: !event.sections.menu })} label="Menu" />
          <Toggle active={event.sections.programme} onChange={() => sec({ programme: !event.sections.programme })} label="Programme" />
          <Toggle active={event.sections.gallery} onChange={() => sec({ gallery: !event.sections.gallery })} label="Galerie photos (partagée par les invités)" />
        </div>
      </div>

      {/* Contenu Programme */}
      {event.sections.programme && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
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

      {/* Contenu Menu */}
      {event.sections.menu && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-semibold text-[#1A0F08]">Contenu du menu</p>
            <button onClick={addSection} className="flex items-center gap-1 text-[11px] text-[#B85C28] font-medium hover:underline">
              <Plus size={11} /> Section
            </button>
          </div>
          {event.menu.length === 0 ? (
            <button onClick={addSection}
              className="w-full py-3 rounded-xl border-2 border-dashed text-[12px] text-[#9B7A56] hover:border-[#B85C28] hover:text-[#B85C28] transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
              + Ajouter une section (Entrées, Plats…)
            </button>
          ) : (
            <div className="space-y-3">
              {event.menu.map(section => (
                <div key={section.id} className="rounded-xl border bg-white p-4" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
                  <div className="flex gap-2 mb-3">
                    <input value={section.label} onChange={e => updSection(section.id, e.target.value)}
                      placeholder="Entrées" className={`flex-1 ${inp} font-medium`} style={inpS} />
                    <button onClick={() => delSection(section.id)} className="p-1.5 text-[#9B7A56] hover:text-red-400">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {section.items.map(item => (
                      <div key={item.id} className="flex gap-2">
                        <input value={item.name} onChange={e => updItem(section.id, item.id, e.target.value)}
                          placeholder="Plat…" className={`flex-1 ${inp}`} style={inpS} />
                        <button onClick={() => delItem(section.id, item.id)} className="p-2 text-[#9B7A56] hover:text-red-400">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addItem(section.id)} className="mt-2 flex items-center gap-1 text-[11px] text-[#9B7A56] hover:text-[#B85C28] transition-colors">
                    <Plus size={11} /> Ajouter un plat
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info galerie */}
      {event.sections.gallery && (
        <div className="rounded-xl p-4 text-[12px] text-[#5A3C1E]"
          style={{ background: 'rgba(184,92,40,0.06)', border: '1px solid rgba(184,92,40,0.15)' }}>
          <p className="font-semibold text-[#B85C28] mb-1">Galerie collaborative</p>
          <p>Les invités pourront uploader leurs photos depuis le site invité le jour de l&apos;événement. Toutes les photos seront visibles par tous.</p>
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
