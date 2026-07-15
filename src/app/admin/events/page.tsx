'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { formatDateShort, getDaysUntil, getCompletionPercent, STATUS_COLOR, EVENT_TYPE_COLOR } from '@/lib/admin/utils';
import { EVENT_TYPE_LABELS } from '@/lib/admin/types';
import { useRouter } from 'next/navigation';
import {
  PlusCircle, Search, Copy, Trash2, Eye, Edit3,
  QrCode, SortDesc, CalendarDays, Sparkles,
} from 'lucide-react';

export default function EventsPage() {
  const { events, createEvent, deleteEvent, duplicateEvent } = useAdmin();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  function handleCreate() {
    const ev = createEvent();
    router.push(`/admin/events/${ev.id}`);
  }

  function handleDuplicate(id: string) {
    const copy = duplicateEvent(id);
    router.push(`/admin/events/${copy.id}`);
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`Supprimer "${name || 'cet événement'}" ?`)) deleteEvent(id);
  }

  const filtered = events
    .filter(e => {
      const q = search.toLowerCase();
      if (q && !e.name.toLowerCase().includes(q) && !e.venue.toLowerCase().includes(q)) return false;
      if (filterStatus !== 'all' && e.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="min-h-full p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#9B7A56] mb-1">Gestion</p>
          <h1 className="text-2xl font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mes événements
          </h1>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-white"
          style={{ background: '#B85C28', boxShadow: '0 2px 12px rgba(184,92,40,0.25)' }}
        >
          <PlusCircle size={15} />
          Nouvel événement
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B7A56]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un événement..."
            className="w-full pl-9 pr-4 py-2.5 text-[13px] rounded-xl bg-white border focus:outline-none focus:border-[#B85C28] transition-colors"
            style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08' }}
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'draft', label: 'Brouillons' },
            { value: 'published', label: 'Publiés' },
            { value: 'past', label: 'Terminés' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className="px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all"
              style={filterStatus === f.value
                ? { background: '#1A0F08', color: 'white' }
                : { background: 'white', color: '#9B7A56', border: '1px solid rgba(26,15,8,0.08)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div
          className="bg-white rounded-2xl flex flex-col items-center justify-center py-20 text-center"
          style={{ border: '1px solid rgba(26,15,8,0.06)' }}
        >
          <Sparkles size={32} className="text-[#E8C49A] mb-4" />
          <p className="text-[14px] font-medium text-[#1A0F08] mb-2">
            {events.length === 0 ? 'Aucun événement' : 'Aucun résultat'}
          </p>
          <p className="text-[13px] text-[#9B7A56] mb-6">
            {events.length === 0
              ? 'Créez votre premier événement pour commencer.'
              : 'Modifiez vos filtres de recherche.'}
          </p>
          {events.length === 0 && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-white"
              style={{ background: '#B85C28' }}
            >
              <PlusCircle size={14} />
              Créer un événement
            </button>
          )}
        </div>
      ) : (
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(26,15,8,0.06)', boxShadow: '0 1px 12px rgba(26,15,8,0.04)' }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b text-[11px] font-medium tracking-wide uppercase text-[#9B7A56]"
            style={{ borderColor: 'rgba(26,15,8,0.06)' }}
          >
            <span>Type</span>
            <span>Nom</span>
            <span className="hidden sm:block">Date</span>
            <span className="hidden sm:block">Invités</span>
            <span className="hidden sm:block">Statut</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          <div className="divide-y" style={{ borderColor: 'rgba(26,15,8,0.04)' }}>
            {filtered.map(event => {
              const s = STATUS_COLOR[event.status] || STATUS_COLOR.draft;
              const completion = getCompletionPercent(event);
              return (
                <div
                  key={event.id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-3.5 hover:bg-[rgba(26,15,8,0.01)] transition-colors"
                >
                  {/* Type dot */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ background: EVENT_TYPE_COLOR[event.type] }}
                  >
                    {event.name.charAt(0).toUpperCase() || '?'}
                  </div>

                  {/* Name + type */}
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#1A0F08] truncate">
                      {event.name || <span className="text-[#9B7A56] italic">Sans titre</span>}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-[#9B7A56]">{EVENT_TYPE_LABELS[event.type]}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-1 rounded-full bg-[rgba(26,15,8,0.08)]">
                          <div className="h-full rounded-full bg-[#B85C28]" style={{ width: `${completion}%` }} />
                        </div>
                        <span className="text-[10px] text-[#9B7A56]">{completion}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="hidden sm:block text-right">
                    <p className="text-[12px] text-[#5A3C1E]">{formatDateShort(event.date)}</p>
                    {getDaysUntil(event.date) !== null && getDaysUntil(event.date)! >= 0 && (
                      <p className="text-[10px] text-[#B85C28]">J-{getDaysUntil(event.date)}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <span className="hidden sm:block text-[12px] text-[#9B7A56] text-center">
                    {event.guests.length || event.guestCount || '—'}
                  </span>

                  {/* Status */}
                  <span
                    className="hidden sm:block text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ background: s.bg, color: s.text }}
                  >
                    {s.label}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push(`/admin/events/${event.id}`)}
                      className="p-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)] transition-colors text-[#9B7A56] hover:text-[#1A0F08]"
                      title="Modifier"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/events/${event.id}/preview`)}
                      className="p-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)] transition-colors text-[#9B7A56] hover:text-[#1A0F08]"
                      title="Prévisualiser"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => handleDuplicate(event.id)}
                      className="p-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)] transition-colors text-[#9B7A56] hover:text-[#1A0F08]"
                      title="Dupliquer"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/events/${event.id}?step=qrcode`)}
                      className="p-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)] transition-colors text-[#9B7A56] hover:text-[#1A0F08]"
                      title="QR Code"
                    >
                      <QrCode size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.name)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-[#9B7A56] hover:text-red-500"
                      title="Supprimer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Count */}
      {filtered.length > 0 && (
        <p className="text-[11px] text-[#9B7A56] mt-4 flex items-center gap-1">
          <SortDesc size={11} />
          {filtered.length} événement{filtered.length > 1 ? 's' : ''} · trié par date de modification
        </p>
      )}
    </div>
  );
}
