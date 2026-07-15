'use client';

import { useState } from 'react';
import { Event, Table, TableType, Guest } from '@/lib/admin/types';
import { createDefaultTable } from '@/lib/admin/utils';
import { CheckCircle2, Plus, Trash2, Wand2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dragGuest, setDragGuest] = useState<string | null>(null);

  function addTable() {
    const t = createDefaultTable(event.tables.length + 1);
    update({ tables: [...event.tables, t] });
  }

  function removeTable(id: string) {
    // Unassign guests from this table
    const updatedGuests = event.guests.map(g => g.tableId === id ? { ...g, tableId: '' } : g);
    update({ tables: event.tables.filter(t => t.id !== id), guests: updatedGuests });
  }

  function updateTable(id: string, patch: Partial<Table>) {
    update({ tables: event.tables.map(t => t.id === id ? { ...t, ...patch } : t) });
  }

  function autoAssign() {
    // Distribute unassigned guests across tables respecting capacity
    const unassigned = event.guests.filter(g => !g.tableId);
    if (unassigned.length === 0 || event.tables.length === 0) return;

    const tableSeatCounts: Record<string, number> = {};
    event.tables.forEach(t => {
      tableSeatCounts[t.id] = event.guests.filter(g => g.tableId === t.id).length;
    });

    const updatedGuests = [...event.guests];
    for (const guest of unassigned) {
      const availableTable = event.tables.find(t => tableSeatCounts[t.id] < t.capacity);
      if (!availableTable) break;
      const idx = updatedGuests.findIndex(g => g.id === guest.id);
      updatedGuests[idx] = { ...guest, tableId: availableTable.id };
      tableSeatCounts[availableTable.id]++;
    }
    update({ guests: updatedGuests });
  }

  function autoGenerateTables() {
    // Create enough tables for all guests (default 10 per table)
    const needed = Math.ceil(event.guests.length / 10);
    const currentCount = event.tables.length;
    if (needed <= currentCount) { autoAssign(); return; }
    const newTables: Table[] = [];
    for (let i = currentCount; i < needed; i++) {
      newTables.push(createDefaultTable(i + 1));
    }
    const allTables = [...event.tables, ...newTables];
    // Assign guests
    const tableSeatCounts: Record<string, number> = {};
    allTables.forEach(t => { tableSeatCounts[t.id] = 0; });
    const updatedGuests = event.guests.map(g => {
      const table = allTables.find(t => tableSeatCounts[t.id] < t.capacity);
      if (table) { tableSeatCounts[table.id]++; return { ...g, tableId: table.id }; }
      return g;
    });
    update({ tables: allTables, guests: updatedGuests });
  }

  function moveGuest(guestId: string, toTableId: string) {
    update({ guests: event.guests.map(g => g.id === guestId ? { ...g, tableId: toTableId } : g) });
    setDragGuest(null);
  }

  function unassignGuest(guestId: string) {
    update({ guests: event.guests.map(g => g.id === guestId ? { ...g, tableId: '' } : g) });
  }

  const unassigned = event.guests.filter(g => !g.tableId);
  const totalSeats = event.tables.reduce((s, t) => s + t.capacity, 0);

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">

      {/* Stats + actions */}
      <div className="flex items-center gap-5 mb-6 p-4 rounded-xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
        <Stat label="Tables" value={event.tables.length} />
        <Sep />
        <Stat label="Places totales" value={totalSeats} />
        <Sep />
        <Stat label="Placés" value={event.guests.filter(g => g.tableId).length} />
        <Sep />
        <Stat label="Non placés" value={unassigned.length} highlight={unassigned.length > 0} />

        <div className="ml-auto flex gap-2 flex-wrap justify-end">
          {event.guests.length > 0 && (
            <button
              onClick={autoGenerateTables}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium border transition-colors hover:bg-[rgba(26,15,8,0.03)]"
              style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
              title="Créer les tables et répartir automatiquement les invités"
            >
              <Wand2 size={12} />
              Répartition auto
            </button>
          )}
          <button
            onClick={addTable}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium text-white"
            style={{ background: '#B85C28' }}
          >
            <Plus size={12} />
            Ajouter une table
          </button>
        </div>
      </div>

      {/* Unassigned guests pool */}
      {unassigned.length > 0 && (
        <div className="mb-5 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
          <p className="text-[11px] font-medium text-[#9B7A56] uppercase tracking-wide mb-2">
            Invités non placés ({unassigned.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {unassigned.map(g => (
              <div
                key={g.id}
                draggable
                onDragStart={() => setDragGuest(g.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border text-[11px] text-[#1A0F08] cursor-grab select-none"
                style={{ borderColor: 'rgba(26,15,8,0.1)' }}
              >
                <GripVertical size={10} className="text-[#9B7A56]" />
                {[g.firstName, g.lastName].filter(Boolean).join(' ') || 'Invité'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tables */}
      {event.tables.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
          <p className="text-[13px] text-[#9B7A56] mb-4">Aucune table configurée</p>
          <div className="flex gap-2">
            {event.guests.length > 0 && (
              <button
                onClick={autoGenerateTables}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium border hover:bg-[rgba(26,15,8,0.02)]"
                style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
              >
                <Wand2 size={13} />
                Générer depuis les invités
              </button>
            )}
            <button
              onClick={addTable}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-[#B85C28] border border-[#B85C28]/30 hover:bg-[#B85C28]/5 transition-colors"
            >
              <Plus size={13} />
              Créer une table
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {event.tables.map(table => {
            const seated = event.guests.filter(g => g.tableId === table.id);
            const isExpanded = expanded === table.id;
            const isFull = seated.length >= table.capacity;

            return (
              <div
                key={table.id}
                className="rounded-xl border bg-white overflow-hidden"
                style={{ borderColor: isFull ? 'rgba(90,122,90,0.3)' : 'rgba(26,15,8,0.08)' }}
                onDragOver={e => e.preventDefault()}
                onDrop={() => dragGuest && moveGuest(dragGuest, table.id)}
              >
                {/* Table header */}
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{ background: isFull ? '#5A7A5A' : '#B85C28' }}
                  >
                    {table.number}
                  </div>
                  <input
                    value={table.name}
                    onChange={e => updateTable(table.id, { name: e.target.value })}
                    className="flex-1 px-2 py-1 text-[13px] font-medium bg-transparent border-b focus:outline-none focus:border-[#B85C28] transition-colors"
                    style={{ borderColor: 'transparent', color: '#1A0F08' }}
                    onFocus={e => (e.target.style.borderColor = '#B85C28')}
                    onBlur={e => (e.target.style.borderColor = 'transparent')}
                  />
                  <select
                    value={table.type}
                    onChange={e => updateTable(table.id, { type: e.target.value as TableType })}
                    className="text-[11px] px-2 py-1 rounded-lg border focus:outline-none bg-white"
                    style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#5A3C1E' }}
                  >
                    {TABLE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <div className="flex items-center gap-1 text-[11px] text-[#9B7A56]">
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={table.capacity}
                      onChange={e => updateTable(table.id, { capacity: parseInt(e.target.value) || 1 })}
                      className="w-10 text-center px-1 py-1 rounded border focus:outline-none text-[#1A0F08]"
                      style={{ borderColor: 'rgba(26,15,8,0.1)' }}
                    />
                    <span>places</span>
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: isFull ? '#5A7A5A' : '#9B7A56' }}>
                    {seated.length}/{table.capacity}
                  </span>
                  <button onClick={() => setExpanded(isExpanded ? null : table.id)} className="text-[#9B7A56]">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <button onClick={() => removeTable(table.id)} className="p-1 rounded hover:bg-red-50 text-[#9B7A56] hover:text-red-400">
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Seated guests */}
                {isExpanded && (
                  <div className="border-t px-4 py-3" style={{ borderColor: 'rgba(26,15,8,0.06)' }}>
                    {seated.length === 0 ? (
                      <p className="text-[11px] text-[#9B7A56] italic">Glissez des invités ici</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {seated.map(g => (
                          <div
                            key={g.id}
                            draggable
                            onDragStart={() => setDragGuest(g.id)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-[#1A0F08] cursor-grab select-none group"
                            style={{ background: 'rgba(184,92,40,0.08)' }}
                          >
                            <GripVertical size={10} className="text-[#9B7A56]" />
                            {[g.firstName, g.lastName].filter(Boolean).join(' ') || 'Invité'}
                            <button
                              onClick={() => unassignGuest(g.id)}
                              className="ml-1 opacity-0 group-hover:opacity-100 text-[#9B7A56] hover:text-red-400"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">{label}</p>
      <p className="text-[20px] font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: highlight ? '#B85C28' : '#1A0F08' }}>
        {value}
      </p>
    </div>
  );
}

function Sep() {
  return <div className="w-px h-8 bg-[rgba(26,15,8,0.08)]" />;
}
