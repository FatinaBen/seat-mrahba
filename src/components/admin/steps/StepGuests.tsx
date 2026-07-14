'use client';

import { useState } from 'react';
import { Event, Guest } from '@/lib/admin/types';
import { generateId, createDefaultGuest } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2, UserPlus, Upload } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

export default function StepGuests({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'guests')?.completed;
  const [editing, setEditing] = useState<string | null>(null);

  function addGuest() {
    const g = createDefaultGuest();
    update({ guests: [...event.guests, g] });
    setEditing(g.id);
  }

  function removeGuest(id: string) {
    update({ guests: event.guests.filter(g => g.id !== id) });
    if (editing === id) setEditing(null);
  }

  function updateGuest(id: string, patch: Partial<Guest>) {
    update({ guests: event.guests.map(g => g.id === id ? { ...g, ...patch } : g) });
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      {/* Stats bar */}
      <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Invités ajoutés</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {event.guests.length}
          </p>
        </div>
        <div className="w-px h-8 bg-[rgba(26,15,8,0.08)]" />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Estimé total</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {event.guestCount || '—'}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={addGuest}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-white"
            style={{ background: '#B85C28' }}
          >
            <UserPlus size={13} />
            Ajouter un invité
          </button>
        </div>
      </div>

      {/* Guest list */}
      {event.guests.length === 0 ? (
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
          style={{ borderColor: 'rgba(26,15,8,0.1)' }}
        >
          <UserPlus size={28} className="text-[#E8C49A] mb-3" />
          <p className="text-[13px] text-[#9B7A56] mb-4">Aucun invité pour l&apos;instant</p>
          <button
            onClick={addGuest}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-[#B85C28] border border-[#B85C28]/30 hover:bg-[#B85C28]/5 transition-colors"
          >
            <Plus size={13} />
            Ajouter le premier invité
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {event.guests.map(guest => (
            <div
              key={guest.id}
              className="rounded-xl border bg-white overflow-hidden transition-all"
              style={{ borderColor: editing === guest.id ? '#B85C28' : 'rgba(26,15,8,0.08)' }}
            >
              {/* Row header */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[rgba(26,15,8,0.01)]"
                onClick={() => setEditing(editing === guest.id ? null : guest.id)}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: '#B85C28' }}
                >
                  {(guest.firstName.charAt(0) || guest.lastName.charAt(0) || '?').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#1A0F08] truncate">
                    {[guest.firstName, guest.lastName].filter(Boolean).join(' ') || <span className="text-[#9B7A56] italic">Invité sans nom</span>}
                  </p>
                  {guest.phone && <p className="text-[11px] text-[#9B7A56] truncate">{guest.phone}</p>}
                </div>
                {guest.tableId && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(26,15,8,0.06)] text-[#5A3C1E]">
                    Table {guest.tableId}
                  </span>
                )}
                <button
                  onClick={e => { e.stopPropagation(); removeGuest(guest.id); }}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-[#9B7A56] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Expanded edit */}
              {editing === guest.id && (
                <div className="px-4 pb-4 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
                  {[
                    { label: 'Prénom', key: 'firstName', placeholder: 'Amine' },
                    { label: 'Nom', key: 'lastName', placeholder: 'Benali' },
                    { label: 'Téléphone', key: 'phone', placeholder: '+212 6XX XXX XXX' },
                    { label: 'Email', key: 'email', placeholder: 'amine@email.com' },
                    { label: 'Table', key: 'tableId', placeholder: '1' },
                    { label: 'Siège', key: 'seat', placeholder: 'A' },
                    { label: 'Menu', key: 'menu', placeholder: 'Classique / Végétarien...' },
                    { label: 'Notes', key: 'notes', placeholder: 'Allergie, régime...' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key} className="mt-3">
                      <label className="block text-[10px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1.5">
                        {label}
                      </label>
                      <input
                        value={(guest as unknown as Record<string, string>)[key] || ''}
                        onChange={e => updateGuest(guest.id, { [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none"
                        style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="pt-6 border-t mt-6" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
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
