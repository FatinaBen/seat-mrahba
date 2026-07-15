'use client';

import { use, useEffect, useState } from 'react';
import { Event } from '@/lib/admin/types';
import { MapPin, Clock, Users, Calendar, Wifi, Car, Phone, Mail } from 'lucide-react';

const STORAGE_KEY = 'seat-mrahba-admin-events';

const FONT_MAP: Record<string, string> = {
  playfair: 'Playfair Display, serif',
  inter: 'Inter, sans-serif',
  cormorant: 'Cormorant Garamond, serif',
};

const RADIUS_MAP: Record<string, string> = {
  none: '0px', sm: '8px', md: '12px', lg: '18px', full: '9999px',
};

export default function GuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const events: Event[] = JSON.parse(stored);
        const found = events.find(e => e.id === id);
        if (found) setEvent(found);
        else setNotFound(true);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) return <NotFound />;
  if (!event) return <Loading />;
  if (event.status !== 'published') return <NotPublished />;

  return <GuestSite event={event} />;
}

function GuestSite({ event }: { event: Event }) {
  const primary = event.theme.primaryColor || '#B85C28';
  const secondary = event.theme.secondaryColor || '#8A7235';
  const button = event.theme.buttonColor || primary;
  const fontFamily = FONT_MAP[event.theme.typography] || FONT_MAP.playfair;
  const radius = RADIUS_MAP[event.theme.borderRadius] || '18px';

  const guestCount = event.guests.length || event.guestCount || 0;

  function formatDate(d: string) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div style={{ fontFamily, background: '#F8F6F3', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="relative flex flex-col justify-end pb-10 px-5 pt-16"
        style={{
          minHeight: 320,
          background: event.theme.heroImage
            ? `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%), url(${event.theme.heroImage}) center/cover`
            : `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        }}
      >
        {event.theme.logo && (
          <img src={event.theme.logo} alt="logo" className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-white/40" />
        )}
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          {event.name || 'Votre événement'}
        </h1>
        {event.organizers && (
          <p className="text-white/80 text-sm">{event.organizers}</p>
        )}
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-5 pb-12 space-y-4">

        {/* Date + lieu */}
        <div className="bg-white shadow-sm p-5 space-y-4" style={{ borderRadius: radius }}>
          {event.date && (
            <Row icon={<Calendar size={16} style={{ color: primary }} />} label="Date">
              <p className="text-sm font-medium text-gray-800 capitalize">{formatDate(event.date)}{event.time ? ` à ${event.time}` : ''}</p>
            </Row>
          )}
          {event.venue && (
            <Row icon={<MapPin size={16} style={{ color: primary }} />} label="Lieu">
              <p className="text-sm font-medium text-gray-800">{event.venue}</p>
              {event.address && <p className="text-xs text-gray-400 mt-0.5">{event.address}</p>}
              {event.sections.mapsUrl && (
                <a
                  href={event.sections.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium mt-1 inline-block"
                  style={{ color: primary }}
                >
                  Ouvrir dans Google Maps →
                </a>
              )}
            </Row>
          )}
          {guestCount > 0 && (
            <Row icon={<Users size={16} style={{ color: primary }} />} label="Invités">
              <p className="text-sm text-gray-700">{guestCount} invités</p>
            </Row>
          )}
        </div>

        {/* Programme */}
        {event.sections.programme && event.programme.length > 0 && (
          <Section title="Programme" primary={primary} radius={radius}>
            <div className="divide-y divide-gray-100">
              {event.programme.map(item => (
                <div key={item.id} className="flex gap-4 py-3">
                  <span className="text-sm font-semibold w-14 flex-shrink-0" style={{ color: primary }}>{item.time}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Menu */}
        {event.sections.menu && event.menu.length > 0 && (
          <Section title="Menu" primary={primary} radius={radius}>
            <div className="space-y-4">
              {event.menu.map(section => (
                <div key={section.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: primary }}>{section.label}</p>
                  <ul className="space-y-1">
                    {section.items.map(item => (
                      <li key={item.id} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: primary }} />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Plan de table */}
        {event.sections.seatingPlan && event.tables.length > 0 && (
          <Section title="Plan de table" primary={primary} radius={radius}>
            <div className="space-y-3">
              {event.tables.map(table => {
                const seated = event.guests.filter(g => g.tableId === table.id);
                return (
                  <div key={table.id} className="rounded-xl p-3" style={{ background: `${primary}08` }}>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{table.name}</p>
                    {seated.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {seated.map(g => (
                          <span key={g.id} className="text-xs px-2 py-0.5 rounded-full bg-white text-gray-600">
                            {[g.firstName, g.lastName].filter(Boolean).join(' ') || 'Invité'}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">{table.capacity} places</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Galerie */}
        {event.sections.gallery && event.gallery.length > 0 && (
          <Section title="Galerie" primary={primary} radius={radius}>
            <div className="grid grid-cols-3 gap-2">
              {event.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Infos pratiques */}
        {(event.sections.dressCode || event.sections.parking || event.sections.wifi) && (
          <Section title="Informations pratiques" primary={primary} radius={radius}>
            <div className="space-y-3">
              {event.sections.dressCode && (
                <div className="flex gap-3">
                  <span className="text-lg">👗</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dress code</p>
                    <p className="text-sm text-gray-800">{event.sections.dressCode}</p>
                  </div>
                </div>
              )}
              {event.sections.parking && (
                <div className="flex gap-3">
                  <Car size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Parking & accès</p>
                    <p className="text-sm text-gray-800">{event.sections.parking}</p>
                  </div>
                </div>
              )}
              {event.sections.wifi && (
                <div className="flex gap-3">
                  <Wifi size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WiFi</p>
                    <p className="text-sm text-gray-800 font-mono">{event.sections.wifi}</p>
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Contact */}
        {event.sections.contact && (event.phone || event.email) && (
          <Section title="Contact" primary={primary} radius={radius}>
            <div className="space-y-2">
              {event.phone && (
                <a href={`tel:${event.phone}`} className="flex items-center gap-3 text-sm text-gray-700 hover:underline">
                  <Phone size={14} style={{ color: primary }} />
                  {event.phone}
                </a>
              )}
              {event.email && (
                <a href={`mailto:${event.email}`} className="flex items-center gap-3 text-sm text-gray-700 hover:underline">
                  <Mail size={14} style={{ color: primary }} />
                  {event.email}
                </a>
              )}
            </div>
          </Section>
        )}

        {/* CTA plan de table */}
        {event.sections.seatingPlan && event.guests.length > 0 && (
          <button
            className="w-full py-4 text-base font-semibold text-white text-center shadow-lg"
            style={{ background: button, borderRadius: radius, boxShadow: `0 4px 20px ${button}40` }}
          >
            Mon plan de table
          </button>
        )}

        <p className="text-center text-xs text-gray-300 pt-4">
          Propulsé par <span className="font-medium text-gray-400">Seat & Mrahba</span>
        </p>
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}

function Section({ title, primary, radius, children }: { title: string; primary: string; radius: string; children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-sm p-5" style={{ borderRadius: radius }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: primary }}>{title}</p>
      {children}
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3]">
      <p className="text-sm text-gray-400">Chargement…</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F3] px-6 text-center">
      <p className="text-4xl mb-4">🔍</p>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Événement introuvable</h1>
      <p className="text-sm text-gray-500">Vérifiez le lien ou contactez l&apos;organisateur.</p>
    </div>
  );
}

function NotPublished() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F3] px-6 text-center">
      <p className="text-4xl mb-4">🔒</p>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Page non disponible</h1>
      <p className="text-sm text-gray-500">Cet événement n&apos;est pas encore publié.</p>
    </div>
  );
}
