'use client';

import { useState, useRef, useCallback } from 'react';
import { Event, Guest } from '@/lib/admin/types';
import { generateId, createDefaultGuest } from '@/lib/admin/utils';
import { CheckCircle2, UserPlus, Trash2, Upload, ChevronDown, ChevronUp, X, Check, AlertCircle } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

// ─── Column mapping ──────────────────────────────────────────────────────────
const GUEST_FIELDS: { key: keyof Guest; label: string; aliases: string[] }[] = [
  { key: 'firstName', label: 'Prénom', aliases: ['prénom', 'prenom', 'firstname', 'first name', 'first_name'] },
  { key: 'lastName', label: 'Nom', aliases: ['nom', 'lastname', 'last name', 'last_name', 'famille'] },
  { key: 'phone', label: 'Téléphone', aliases: ['téléphone', 'telephone', 'tel', 'phone', 'mobile'] },
  { key: 'email', label: 'Email', aliases: ['email', 'e-mail', 'mail', 'courriel'] },
  { key: 'tableId', label: 'Table', aliases: ['table', 'table n°', 'table number', 'numéro de table'] },
  { key: 'seat', label: 'Place/Siège', aliases: ['place', 'siège', 'siege', 'seat', 'place n°'] },
  { key: 'menu', label: 'Menu', aliases: ['menu', 'repas', 'régime', 'regime', 'choix menu'] },
  { key: 'notes', label: 'Notes', aliases: ['notes', 'remarques', 'commentaire', 'info', 'allergie'] },
];

function detectField(header: string): keyof Guest | null {
  const h = header.toLowerCase().trim();
  for (const field of GUEST_FIELDS) {
    if (field.aliases.some(alias => h.includes(alias) || alias.includes(h))) return field.key;
  }
  return null;
}

type RawRow = Record<string, string>;
type ColMapping = Record<string, keyof Guest | '__ignore__'>;

interface ImportState {
  step: 'idle' | 'mapping' | 'preview' | 'done';
  headers: string[];
  rows: RawRow[];
  mapping: ColMapping;
  error: string | null;
}

export default function StepGuests({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'guests')?.completed;
  const [editing, setEditing] = useState<string | null>(null);
  const [importState, setImportState] = useState<ImportState>({
    step: 'idle', headers: [], rows: [], mapping: {}, error: null,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  // ── File processing ──────────────────────────────────────────────────────
  async function handleFile(file: File) {
    setImportState(prev => ({ ...prev, error: null }));
    try {
      let rows: RawRow[] = [];
      if (file.name.endsWith('.csv')) {
        rows = await parseCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        rows = await parseXLSX(file);
      } else {
        setImportState(prev => ({ ...prev, error: 'Format non supporté. Utilisez .csv ou .xlsx' }));
        return;
      }

      if (rows.length === 0) {
        setImportState(prev => ({ ...prev, error: 'Le fichier est vide.' }));
        return;
      }

      const headers = Object.keys(rows[0]);
      const mapping: ColMapping = {};
      headers.forEach(h => {
        mapping[h] = detectField(h) ?? '__ignore__';
      });

      setImportState({ step: 'mapping', headers, rows, mapping, error: null });
    } catch (e) {
      setImportState(prev => ({ ...prev, error: 'Erreur lors de la lecture du fichier.' }));
    }
  }

  async function parseCSV(file: File): Promise<RawRow[]> {
    const text = await file.text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    return lines.slice(1).filter(Boolean).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const row: RawRow = {};
      headers.forEach((h, i) => { row[h] = values[i] || ''; });
      return row;
    });
  }

  async function parseXLSX(file: File): Promise<RawRow[]> {
    const XLSX = await import('xlsx');
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<RawRow>(ws, { defval: '', raw: false });
    return data.map(row => {
      const clean: RawRow = {};
      Object.entries(row).forEach(([k, v]) => { clean[k] = String(v); });
      return clean;
    });
  }

  function applyImport() {
    const { rows, mapping } = importState;
    const newGuests: Guest[] = rows.map(row => {
      const g: Guest = { ...createDefaultGuest() };
      Object.entries(mapping).forEach(([col, field]) => {
        if (field !== '__ignore__') (g as unknown as Record<string, string>)[field] = row[col] || '';
      });
      return g;
    });
    update({ guests: [...event.guests, ...newGuests] });
    setImportState({ step: 'done', headers: [], rows: [], mapping: {}, error: null });
  }

  function cancelImport() {
    setImportState({ step: 'idle', headers: [], rows: [], mapping: {}, error: null });
  }

  // ── CRUD ─────────────────────────────────────────────────────────────────
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

  // ── Drag & drop ──────────────────────────────────────────────────────────
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-8 py-8">

      {/* Stats bar */}
      <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Invités</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>{event.guests.length}</p>
        </div>
        <div className="w-px h-8 bg-[rgba(26,15,8,0.08)]" />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56]">Placés</p>
          <p className="text-[22px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {event.guests.filter(g => g.tableId).length}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium border transition-colors hover:bg-[rgba(26,15,8,0.03)]"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
          >
            <Upload size={13} />
            Importer Excel / CSV
          </button>
          <button
            onClick={addGuest}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-white"
            style={{ background: '#B85C28' }}
          >
            <UserPlus size={13} />
            Ajouter
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {/* Import wizard */}
      {importState.step === 'mapping' && (
        <ImportMappingPanel
          importState={importState}
          setMapping={(mapping) => setImportState(prev => ({ ...prev, mapping }))}
          onConfirm={() => setImportState(prev => ({ ...prev, step: 'preview' }))}
          onCancel={cancelImport}
        />
      )}

      {importState.step === 'preview' && (
        <ImportPreviewPanel
          importState={importState}
          onConfirm={applyImport}
          onBack={() => setImportState(prev => ({ ...prev, step: 'mapping' }))}
          onCancel={cancelImport}
        />
      )}

      {importState.step === 'done' && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-4 text-[12px] font-medium" style={{ background: 'rgba(90,122,90,0.1)', color: '#5A7A5A' }}>
          <Check size={14} />
          Import réussi — invités ajoutés à la liste.
          <button onClick={() => setImportState(prev => ({ ...prev, step: 'idle' }))} className="ml-auto">
            <X size={13} />
          </button>
        </div>
      )}

      {importState.error && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-4 text-[12px]" style={{ background: 'rgba(200,50,50,0.08)', color: '#c03030' }}>
          <AlertCircle size={14} />
          {importState.error}
          <button onClick={() => setImportState(prev => ({ ...prev, error: null }))} className="ml-auto">
            <X size={13} />
          </button>
        </div>
      )}

      {/* Drop zone when empty */}
      {event.guests.length === 0 && importState.step === 'idle' ? (
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center cursor-pointer"
          style={{ borderColor: 'rgba(26,15,8,0.12)' }}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={28} className="text-[#E8C49A] mb-3" />
          <p className="text-[13px] font-medium text-[#1A0F08] mb-1">Glissez votre fichier ici</p>
          <p className="text-[11px] text-[#9B7A56] mb-4">Excel (.xlsx) ou CSV — ou cliquez pour parcourir</p>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(26,15,8,0.06)] text-[#5A3C1E]">.xlsx</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(26,15,8,0.06)] text-[#5A3C1E]">.xls</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(26,15,8,0.06)] text-[#5A3C1E]">.csv</span>
          </div>
        </div>
      ) : importState.step === 'idle' && (
        <GuestList
          guests={event.guests}
          editing={editing}
          setEditing={setEditing}
          updateGuest={updateGuest}
          removeGuest={removeGuest}
        />
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

// ── Import mapping panel ─────────────────────────────────────────────────────
function ImportMappingPanel({
  importState, setMapping, onConfirm, onCancel,
}: {
  importState: ImportState;
  setMapping: (m: ColMapping) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { headers, rows, mapping } = importState;
  const preview = rows.slice(0, 2);

  function updateCol(col: string, value: string) {
    setMapping({ ...mapping, [col]: value as keyof Guest | '__ignore__' });
  }

  const hasRequiredField = Object.values(mapping).some(v => v === 'firstName' || v === 'lastName');

  return (
    <div className="rounded-2xl border bg-white mb-6 overflow-hidden" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
        <div>
          <p className="text-[13px] font-semibold text-[#1A0F08]">Correspondance des colonnes</p>
          <p className="text-[11px] text-[#9B7A56] mt-0.5">{rows.length} ligne(s) détectée(s)</p>
        </div>
        <button onClick={onCancel} className="text-[#9B7A56] hover:text-[#1A0F08]"><X size={16} /></button>
      </div>

      <div className="p-5 space-y-3">
        {headers.map(col => (
          <div key={col} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-lg px-3 py-2 bg-[rgba(26,15,8,0.04)]">
              <p className="text-[11px] font-medium text-[#1A0F08] truncate">{col}</p>
              <p className="text-[10px] text-[#9B7A56] truncate">
                {preview.map(r => r[col]).filter(Boolean).join(' / ') || '—'}
              </p>
            </div>
            <span className="text-[#9B7A56] text-xs">→</span>
            <select
              value={mapping[col] || '__ignore__'}
              onChange={e => updateCol(col, e.target.value)}
              className="px-3 py-2 text-[12px] rounded-lg border bg-white focus:outline-none"
              style={{ borderColor: mapping[col] && mapping[col] !== '__ignore__' ? '#B85C28' : 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
            >
              <option value="__ignore__">— Ignorer —</option>
              {GUEST_FIELDS.map(f => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex gap-3 px-5 pb-5">
        <button
          onClick={onConfirm}
          disabled={!hasRequiredField}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-medium text-white disabled:opacity-40"
          style={{ background: '#B85C28' }}
        >
          Aperçu des données →
        </button>
        <button onClick={onCancel} className="text-[12px] text-[#9B7A56] hover:text-[#1A0F08]">Annuler</button>
      </div>
    </div>
  );
}

// ── Import preview panel ─────────────────────────────────────────────────────
function ImportPreviewPanel({
  importState, onConfirm, onBack, onCancel,
}: {
  importState: ImportState;
  onConfirm: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const { rows, mapping } = importState;
  const mappedFields = GUEST_FIELDS.filter(f => Object.values(mapping).includes(f.key));
  const preview = rows.slice(0, 8);

  return (
    <div className="rounded-2xl border bg-white mb-6 overflow-hidden" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
        <div>
          <p className="text-[13px] font-semibold text-[#1A0F08]">Aperçu — {rows.length} invités</p>
          <p className="text-[11px] text-[#9B7A56] mt-0.5">Vérifiez les données avant l&apos;import</p>
        </div>
        <button onClick={onCancel} className="text-[#9B7A56] hover:text-[#1A0F08]"><X size={16} /></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b" style={{ borderColor: 'rgba(26,15,8,0.06)' }}>
              {mappedFields.map(f => (
                <th key={f.key} className="text-left px-4 py-2 font-medium text-[#9B7A56] uppercase tracking-wide">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'rgba(26,15,8,0.04)' }}>
            {preview.map((row, i) => (
              <tr key={i}>
                {mappedFields.map(f => {
                  const col = Object.entries(mapping).find(([, v]) => v === f.key)?.[0];
                  return (
                    <td key={f.key} className="px-4 py-2 text-[#1A0F08]">
                      {col ? (row[col] || '—') : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 8 && (
          <p className="text-[10px] text-[#9B7A56] px-4 py-2">… et {rows.length - 8} autre(s)</p>
        )}
      </div>

      <div className="flex gap-3 px-5 py-4 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
        <button
          onClick={onConfirm}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-medium text-white"
          style={{ background: '#B85C28' }}
        >
          <Check size={13} />
          Importer {rows.length} invités
        </button>
        <button onClick={onBack} className="text-[12px] text-[#9B7A56] hover:text-[#1A0F08]">← Modifier</button>
        <button onClick={onCancel} className="text-[12px] text-[#9B7A56] hover:text-[#1A0F08] ml-auto">Annuler</button>
      </div>
    </div>
  );
}

// ── Guest list ───────────────────────────────────────────────────────────────
function GuestList({ guests, editing, setEditing, updateGuest, removeGuest }: {
  guests: Guest[];
  editing: string | null;
  setEditing: (id: string | null) => void;
  updateGuest: (id: string, patch: Partial<Guest>) => void;
  removeGuest: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {guests.map(guest => (
        <div
          key={guest.id}
          className="rounded-xl border bg-white overflow-hidden transition-all"
          style={{ borderColor: editing === guest.id ? '#B85C28' : 'rgba(26,15,8,0.08)' }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[rgba(26,15,8,0.01)]"
            onClick={() => setEditing(editing === guest.id ? null : guest.id)}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: '#B85C28' }}>
              {(guest.firstName.charAt(0) || guest.lastName.charAt(0) || '?').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#1A0F08] truncate">
                {[guest.firstName, guest.lastName].filter(Boolean).join(' ') || <span className="text-[#9B7A56] italic">Sans nom</span>}
              </p>
              <p className="text-[11px] text-[#9B7A56] truncate">
                {[guest.tableId && `Table ${guest.tableId}`, guest.menu].filter(Boolean).join(' · ') || guest.phone || guest.email || ''}
              </p>
            </div>
            {editing === guest.id ? <ChevronUp size={13} className="text-[#9B7A56]" /> : <ChevronDown size={13} className="text-[#9B7A56]" />}
            <button
              onClick={e => { e.stopPropagation(); removeGuest(guest.id); }}
              className="p-1.5 rounded-lg hover:bg-red-50 text-[#9B7A56] hover:text-red-500 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>

          {editing === guest.id && (
            <div className="px-4 pb-4 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
              {GUEST_FIELDS.map(({ key, label, aliases }) => (
                <div key={key} className="mt-3">
                  <label className="block text-[10px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1.5">{label}</label>
                  <input
                    value={(guest as unknown as Record<string, string>)[key] || ''}
                    onChange={e => updateGuest(guest.id, { [key]: e.target.value })}
                    placeholder={aliases[0]}
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
  );
}
