'use client';

import { Event, Sections, ProgrammeItem, MenuSection, MenuItem } from '@/lib/admin/types';
import { generateId } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="transition-colors">
      {active
        ? <ToggleRight size={22} className="text-[#B85C28]" />
        : <ToggleLeft size={22} className="text-[rgba(26,15,8,0.25)]" />
      }
    </button>
  );
}

export default function StepSections({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'sections')?.completed;

  function updateSection(patch: Partial<Sections>) {
    update({ sections: { ...event.sections, ...patch } });
  }

  // Programme
  function addProgrammeItem() {
    const item: ProgrammeItem = { id: generateId(), time: '', title: '', description: '' };
    update({ programme: [...event.programme, item] });
  }

  function updateProgramme(id: string, patch: Partial<ProgrammeItem>) {
    update({ programme: event.programme.map(p => p.id === id ? { ...p, ...patch } : p) });
  }

  function removeProgramme(id: string) {
    update({ programme: event.programme.filter(p => p.id !== id) });
  }

  // Menu
  function addMenuSection() {
    const s: MenuSection = { id: generateId(), label: 'Entrées', items: [] };
    update({ menu: [...event.menu, s] });
  }

  function addMenuItem(sectionId: string) {
    const item: MenuItem = { id: generateId(), name: '' };
    update({ menu: event.menu.map(s => s.id === sectionId ? { ...s, items: [...s.items, item] } : s) });
  }

  function updateMenuSection(id: string, label: string) {
    update({ menu: event.menu.map(s => s.id === id ? { ...s, label } : s) });
  }

  function updateMenuItem(sectionId: string, itemId: string, name: string) {
    update({
      menu: event.menu.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, name } : i) }
          : s
      ),
    });
  }

  function removeMenuSection(id: string) {
    update({ menu: event.menu.filter(s => s.id !== id) });
  }

  function removeMenuItem(sectionId: string, itemId: string) {
    update({ menu: event.menu.map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s) });
  }

  const inputClass = "w-full px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none";
  const inputStyle = { borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' };

  return (
    <div className="max-w-2xl mx-auto px-8 py-8 space-y-8">

      {/* Toggle sections */}
      <div>
        <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-4">Sections visibles</p>
        <div className="space-y-2">
          {[
            { key: 'seatingPlan' as const, label: 'Plan de table' },
            { key: 'menu' as const, label: 'Menu' },
            { key: 'programme' as const, label: 'Programme' },
            { key: 'gallery' as const, label: 'Galerie photos' },
            { key: 'contact' as const, label: 'Contacts & informations' },
            { key: 'socialMedia' as const, label: 'Réseaux sociaux' },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border"
              style={{ borderColor: 'rgba(26,15,8,0.08)' }}
            >
              <span className="text-[13px] text-[#1A0F08]">{label}</span>
              <Toggle
                active={!!event.sections[key]}
                onChange={() => updateSection({ [key]: !event.sections[key] })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Dress code
          </label>
          <input
            value={event.sections.dressCode}
            onChange={e => updateSection({ dressCode: e.target.value })}
            placeholder="Ex: Tenue de soirée, couleurs claires..."
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            Parking / Accès
          </label>
          <textarea
            value={event.sections.parking}
            onChange={e => updateSection({ parking: e.target.value })}
            placeholder="Informations parking, navette, transport..."
            rows={2}
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
            WiFi / Mot de passe
          </label>
          <input
            value={event.sections.wifi}
            onChange={e => updateSection({ wifi: e.target.value })}
            placeholder="Réseau: SalleFetes — Mdp: mariage2024"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Programme */}
      {event.sections.programme && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56]">Programme de la journée</p>
            <button
              onClick={addProgrammeItem}
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#B85C28] hover:underline"
            >
              <Plus size={11} />
              Ajouter
            </button>
          </div>
          <div className="space-y-2">
            {event.programme.map(item => (
              <div key={item.id} className="flex gap-2 items-start">
                <input
                  value={item.time}
                  onChange={e => updateProgramme(item.id, { time: e.target.value })}
                  placeholder="18:00"
                  className="w-20 px-2 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] text-center focus:outline-none"
                  style={inputStyle}
                />
                <input
                  value={item.title}
                  onChange={e => updateProgramme(item.id, { title: e.target.value })}
                  placeholder="Titre (ex: Cocktail)"
                  className={`flex-1 ${inputClass}`}
                  style={inputStyle}
                />
                <button onClick={() => removeProgramme(item.id)} className="p-2 text-[#9B7A56] hover:text-red-500">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu */}
      {event.sections.menu && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56]">Menu</p>
            <button
              onClick={addMenuSection}
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#B85C28] hover:underline"
            >
              <Plus size={11} />
              Section
            </button>
          </div>
          <div className="space-y-4">
            {event.menu.map(section => (
              <div key={section.id} className="rounded-xl border bg-white p-4" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    value={section.label}
                    onChange={e => updateMenuSection(section.id, e.target.value)}
                    placeholder="Entrées"
                    className="flex-1 px-3 py-1.5 text-[12px] font-medium rounded-lg border bg-[#FDFCF9] focus:outline-none"
                    style={inputStyle}
                  />
                  <button onClick={() => removeMenuSection(section.id)} className="p-1.5 text-[#9B7A56] hover:text-red-500">
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {section.items.map(item => (
                    <div key={item.id} className="flex gap-2">
                      <input
                        value={item.name}
                        onChange={e => updateMenuItem(section.id, item.id, e.target.value)}
                        placeholder="Plat..."
                        className={`flex-1 ${inputClass}`}
                        style={inputStyle}
                      />
                      <button onClick={() => removeMenuItem(section.id, item.id)} className="p-2 text-[#9B7A56] hover:text-red-500">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addMenuItem(section.id)}
                  className="mt-2 flex items-center gap-1 text-[11px] text-[#9B7A56] hover:text-[#B85C28] transition-colors"
                >
                  <Plus size={11} />
                  Ajouter un plat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
