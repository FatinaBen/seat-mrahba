'use client';

import { useAdmin } from '@/lib/admin/store';
import { formatDateShort, getDaysUntil, getCompletionPercent, STATUS_COLOR, EVENT_TYPE_COLOR } from '@/lib/admin/utils';
import { EVENT_TYPE_LABELS } from '@/lib/admin/types';
import { useRouter } from 'next/navigation';
import { CalendarDays, Users, CheckCircle2, Clock, PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const { events, createEvent } = useAdmin();
  const router = useRouter();

  const upcoming = events.filter(e => {
    const d = getDaysUntil(e.date);
    return d !== null && d >= 0;
  });
  const past = events.filter(e => {
    const d = getDaysUntil(e.date);
    return d !== null && d < 0;
  });
  const published = events.filter(e => e.status === 'published');
  const recent = [...events].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  function handleCreate() {
    const ev = createEvent();
    router.push(`/admin/events/${ev.id}`);
  }

  const stats = [
    { label: 'Événements', value: events.length, icon: CalendarDays, color: '#B85C28' },
    { label: 'À venir', value: upcoming.length, icon: Clock, color: '#8A7235' },
    { label: 'Publiés', value: published.length, icon: CheckCircle2, color: '#5A7A5A' },
    { label: 'Terminés', value: past.length, icon: Users, color: '#9B7A56' },
  ];

  const nextEvent = upcoming.sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="min-h-full p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#9B7A56] mb-1">Dashboard</p>
          <h1 className="text-2xl font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bonjour 👋
          </h1>
          <p className="text-[13px] text-[#9B7A56] mt-1">
            {events.length === 0
              ? 'Créez votre premier événement pour commencer.'
              : `${events.length} événement${events.length > 1 ? 's' : ''} dans votre espace.`}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all active:scale-[0.97]"
          style={{ background: '#B85C28', boxShadow: '0 2px 12px rgba(184,92,40,0.25)' }}
        >
          <PlusCircle size={15} />
          Nouvel événement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5"
              style={{ border: '1px solid rgba(26,15,8,0.06)', boxShadow: '0 1px 12px rgba(26,15,8,0.04)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56]">{stat.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}10` }}>
                  <Icon size={14} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent events */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(26,15,8,0.06)', boxShadow: '0 1px 12px rgba(26,15,8,0.04)' }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(26,15,8,0.06)' }}>
            <h2 className="text-[13px] font-semibold text-[#1A0F08]">Derniers événements</h2>
            <button
              onClick={() => router.push('/admin/events')}
              className="text-[11px] font-medium text-[#B85C28] hover:underline flex items-center gap-1"
            >
              Tout voir <ArrowRight size={11} />
            </button>
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Sparkles size={28} className="text-[#E8C49A] mb-3" />
              <p className="text-[13px] text-[#9B7A56] mb-4">Aucun événement pour l&apos;instant</p>
              <button
                onClick={handleCreate}
                className="text-[12px] font-medium text-[#B85C28] border border-[#B85C28]/30 px-4 py-2 rounded-lg hover:bg-[#B85C28]/5 transition-colors"
              >
                Créer mon premier événement
              </button>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'rgba(26,15,8,0.05)' }}>
              {recent.map((event) => {
                const days = getDaysUntil(event.date);
                const s = STATUS_COLOR[event.status] || STATUS_COLOR.draft;
                const completion = getCompletionPercent(event);
                return (
                  <button
                    key={event.id}
                    onClick={() => router.push(`/admin/events/${event.id}`)}
                    className="w-full flex items-center gap-4 px-6 py-3.5 text-left hover:bg-[rgba(26,15,8,0.02)] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ background: EVENT_TYPE_COLOR[event.type] }}
                    >
                      {event.name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1A0F08] truncate">
                        {event.name || 'Sans titre'}
                      </p>
                      <p className="text-[11px] text-[#9B7A56]">
                        {EVENT_TYPE_LABELS[event.type]} · {formatDateShort(event.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Progress bar */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        <div className="w-16 h-1 rounded-full bg-[rgba(26,15,8,0.08)]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${completion}%`, background: '#B85C28' }}
                          />
                        </div>
                        <span className="text-[10px] text-[#9B7A56]">{completion}%</span>
                      </div>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: s.bg, color: s.text }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Next event */}
          {nextEvent ? (
            <div
              className="bg-white rounded-2xl p-5"
              style={{ border: '1px solid rgba(26,15,8,0.06)', boxShadow: '0 1px 12px rgba(26,15,8,0.04)' }}
            >
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#9B7A56] mb-3">Prochain événement</p>
              <h3 className="text-[15px] font-semibold text-[#1A0F08] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {nextEvent.name || 'Sans titre'}
              </h3>
              <p className="text-[12px] text-[#9B7A56] mb-4">{formatDateShort(nextEvent.date)}</p>
              {getDaysUntil(nextEvent.date) !== null && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(184,92,40,0.07)' }}
                >
                  <Clock size={13} className="text-[#B85C28]" />
                  <span className="text-[12px] font-medium text-[#B85C28]">
                    Dans {getDaysUntil(nextEvent.date)} jour{getDaysUntil(nextEvent.date) !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <button
                onClick={() => router.push(`/admin/events/${nextEvent.id}`)}
                className="mt-3 w-full text-[12px] font-medium text-[#B85C28] border border-[#B85C28]/25 py-2 rounded-lg hover:bg-[#B85C28]/5 transition-colors"
              >
                Modifier →
              </button>
            </div>
          ) : (
            <div
              className="bg-white rounded-2xl p-5 text-center"
              style={{ border: '1px solid rgba(26,15,8,0.06)' }}
            >
              <CalendarDays size={24} className="mx-auto text-[#E8C49A] mb-3" />
              <p className="text-[12px] text-[#9B7A56]">Aucun événement à venir</p>
            </div>
          )}

          {/* Quick actions */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: '1px solid rgba(26,15,8,0.06)', boxShadow: '0 1px 12px rgba(26,15,8,0.04)' }}
          >
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#9B7A56] mb-4">Actions rapides</p>
            <div className="space-y-2">
              {[
                { label: 'Créer un événement', action: handleCreate, icon: PlusCircle },
                { label: 'Voir tous les événements', action: () => router.push('/admin/events'), icon: CalendarDays },
              ].map(({ label, action, icon: Icon }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-2.5 text-[12px] text-[#5A3C1E] px-3 py-2.5 rounded-lg hover:bg-[rgba(26,15,8,0.03)] transition-colors text-left"
                >
                  <Icon size={13} className="text-[#9B7A56]" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
