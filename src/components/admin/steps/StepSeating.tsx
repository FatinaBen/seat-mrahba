'use client';

import { useState } from 'react';
import { Event, Table, TableType } from '@/lib/admin/types';
import { createDefaultTable } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const TABLE_TYPES: { value: TableType; label: string }[] = [
  { value: 'round', label: 'Ronde' },
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'imperial', label: 'Impériale' },
];

export default function StepSeating({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'seating')?.completed;

  function addTable() {
    const t = createDefaultTable(event.tables.length + 1);
    update({ tables: [...event.tables, t] });
  }

  function removeTable(id: string) {
    update({ tables: event.tables.filter(t => t.id !== id) });
  }

  function updateTable(id: string, patch: Partial<Table>) {
    update({ tables: event.tables.map(t => t.id === id ? { ...t, ...patch } : t) });
  }

  const totalSeats = event.tables.reduce((s, t) => s + t.capacity, 0);
  const assignedGuests = event.guests.filter(g => g.tableId).length;

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      {/* Stats */}
      <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Tables</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>{event.tables.length}</p>
        </div>
        <div className="w-px h-8 bg-[rgba(26,15,8,0.08)]" />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Places totales</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>{totalSeats}</p>
        </div>
        <div className="w-px h-8 bg-[rgba(26,15,8,0.08)]" />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Invités placés</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>{assignedGuests}</p>
        </div>
        <button
          onClick={addTable}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-white"
          style={{ background: '#B85C28' }}
        >
          <Plus size={13} />
          Ajouter une table
        </button>
      </div>

      {event.tables.length === 0 ? (
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
          style={{ borderColor: 'rgba(26,15,8,0.1)' }}
        >
          <p className="text-[13px] text-[#9B7A56] mb-4">Aucune table configurée</p>
          <button
            onClick={addTable}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-[#B85C28] border border-[#B85C28]/30 hover:bg-[#B85C28]/5 transition-colors"
          >
            <Plus size={13} />
            Ajouter la première table
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {event.tables.map(table => (
            <div
              key={table.id}
              className="rounded-xl border bg-white p-4"
              style={{ borderColor: 'rgba(26,15,8,0.08)' }}
            >
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center">
                <input
                  value={table.name}
                  onChange={e => updateTable(table.id, { name: e.target.value })}
                  placeholder="Nom de la table"
                  className="px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none"
                  style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
                />
                <select
                  value={table.type}
                  onChange={e => updateTable(table.id, { type: e.target.value as TableType })}
                  className="px-3 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] focus:outline-none"
                  style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
                >
                  {TABLE_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#9B7A56]">Places:</span>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={table.capacity}
                    onChange={e => updateTable(table.id, { capacity: parseInt(e.target.value) || 1 })}
                    className="w-14 px-2 py-2 text-[12px] rounded-lg border bg-[#FDFCF9] text-center focus:outline-none"
                    style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
                  />
                </div>
                <span className="text-[11px] text-[#9B7A56] whitespace-nowrap">
                  {event.guests.filter(g => g.tableId === table.id).length} invités
                </span>
                <button
                  onClick={() => removeTable(table.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-[#9B7A56] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
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
