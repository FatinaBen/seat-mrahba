'use client';

import { Event, THEME_PRESETS } from '@/lib/admin/types';
import { MapPin, Clock, Users, Calendar } from 'lucide-react';

interface Props {
  event: Event;
}

const FONT_MAP: Record<string, string> = {
  playfair: 'Playfair Display, serif',
  inter: 'Inter, sans-serif',
  cormorant: 'Cormorant Garamond, serif',
};

const RADIUS_MAP: Record<string, string> = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '16px',
  full: '9999px',
};

export default function PhonePreview({ event }: Props) {
  const theme = event.theme;
  const primary = theme.primaryColor || '#B85C28';
  const fontFamily = FONT_MAP[theme.typography] || FONT_MAP.playfair;
  const borderRadius = RADIUS_MAP[theme.borderRadius] || '16px';

  const guestCount = event.guests.length || event.guestCount || 0;

  return (
    <div className="relative" style={{ width: 320 }}>
      {/* Phone shell */}
      <div
        className="relative rounded-[44px] border-[8px] border-[#1A0F08] shadow-2xl overflow-hidden"
        style={{ height: 680, background: '#fff' }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-10"
          style={{ background: '#1A0F08' }}
        />

        {/* Screen content */}
        <div className="h-full overflow-y-auto" style={{ fontFamily }}>
          {/* Hero */}
          <div
            className="relative flex items-end pb-8 px-6 pt-12"
            style={{
              minHeight: 220,
              background: theme.heroImage
                ? `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%), url(${theme.heroImage}) center/cover`
                : `linear-gradient(135deg, ${primary}dd 0%, ${primary}88 100%)`,
            }}
          >
            {/* Logo / initials */}
            <div>
              <div
                className="text-[22px] font-bold text-white mb-1"
                style={{ fontFamily, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              >
                {event.name || 'Votre événement'}
              </div>
              {event.organizers && (
                <p className="text-white/80 text-[12px]">{event.organizers}</p>
              )}
            </div>
          </div>

          {/* Info cards */}
          <div className="px-4 -mt-4 space-y-2.5 pb-6">

            {/* Date + venue */}
            <div className="bg-white shadow-sm p-4" style={{ borderRadius }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${primary}15` }}>
                  <Calendar size={13} style={{ color: primary }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Date</p>
                  <p className="text-[12px] font-medium text-gray-800">
                    {event.date
                      ? new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                      : '—'}
                    {event.time && ` à ${event.time}`}
                  </p>
                </div>
              </div>
              {event.venue && (
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${primary}15` }}>
                    <MapPin size={13} style={{ color: primary }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Lieu</p>
                    <p className="text-[12px] font-medium text-gray-800">{event.venue}</p>
                    {event.address && <p className="text-[10px] text-gray-400">{event.address}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Guest count */}
            {guestCount > 0 && (
              <div className="bg-white shadow-sm p-4 flex items-center gap-3" style={{ borderRadius }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${primary}15` }}>
                  <Users size={13} style={{ color: primary }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Invités</p>
                  <p className="text-[12px] font-medium text-gray-800">{guestCount} invités</p>
                </div>
              </div>
            )}

            {/* Programme preview */}
            {event.sections.programme && event.programme.length > 0 && (
              <div className="bg-white shadow-sm p-4" style={{ borderRadius }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: primary }}>
                  Programme
                </p>
                <div className="space-y-2">
                  {event.programme.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-start gap-2">
                      <span className="text-[10px] text-gray-400 w-10 flex-shrink-0 pt-0.5">{item.time}</span>
                      <span className="text-[11px] text-gray-700">{item.title}</span>
                    </div>
                  ))}
                  {event.programme.length > 3 && (
                    <p className="text-[10px] text-gray-400">+{event.programme.length - 3} autre(s)…</p>
                  )}
                </div>
              </div>
            )}

            {/* Menu preview */}
            {event.sections.menu && event.menu.length > 0 && (
              <div className="bg-white shadow-sm p-4" style={{ borderRadius }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: primary }}>
                  Menu
                </p>
                {event.menu.slice(0, 2).map(section => (
                  <div key={section.id} className="mb-1.5">
                    <p className="text-[10px] font-medium text-gray-500">{section.label}</p>
                    {section.items.slice(0, 2).map(item => (
                      <p key={item.id} className="text-[11px] text-gray-700 ml-2">· {item.name}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <button
              className="w-full py-3 text-[13px] font-medium text-white text-center"
              style={{ background: theme.buttonColor || primary, borderRadius }}
            >
              Mon plan de table
            </button>

            {/* Footer */}
            <p className="text-center text-[9px] text-gray-300 pt-2">
              Propulsé par Seat & Mrahba
            </p>
          </div>
        </div>
      </div>

      {/* Phone label */}
      <p className="text-center text-[11px] text-[#9B7A56] mt-4">
        Aperçu de la page invité
      </p>
    </div>
  );
}
