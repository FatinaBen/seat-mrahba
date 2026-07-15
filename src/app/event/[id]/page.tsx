'use client';

import { use, useEffect, useState, useRef } from 'react';
import { Event, Guest, Table } from '@/lib/admin/types';
import { Search, Upload, Camera, X, ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'seat-mrahba-admin-events';
const PHOTOS_KEY = (id: string) => `seat-mrahba-photos-${id}`;

const FONT_MAP: Record<string, string> = {
  playfair: '"Playfair Display", serif',
  inter: 'Inter, sans-serif',
  cormorant: '"Cormorant Garamond", serif',
};

const RADIUS_MAP: Record<string, string> = {
  none: '0px', sm: '8px', md: '12px', lg: '18px', full: '9999px',
};

// ─── Chargement événement ────────────────────────────────────────────────────
function loadEvent(id: string): Event | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const events: Event[] = JSON.parse(stored);
    return events.find(e => e.id === id) ?? null;
  } catch { return null; }
}

function loadPhotos(id: string): string[] {
  try {
    const stored = localStorage.getItem(PHOTOS_KEY(id));
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function savePhotos(id: string, photos: string[]) {
  try {
    localStorage.setItem(PHOTOS_KEY(id), JSON.stringify(photos));
  } catch { /* storage full */ }
}

// ─── Page principale ─────────────────────────────────────────────────────────
export default function GuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null | 'not-found' | 'not-published'>(null);

  useEffect(() => {
    const e = loadEvent(id);
    if (!e) setEvent('not-found');
    else if (e.status !== 'published') setEvent('not-published');
    else setEvent(e);
  }, [id]);

  if (event === null) return <Screen><p className="text-sm text-gray-400">Chargement…</p></Screen>;
  if (event === 'not-found') return (
    <Screen>
      <p className="text-4xl mb-3">🔍</p>
      <p className="text-lg font-semibold text-gray-800 mb-1">Page introuvable</p>
      <p className="text-sm text-gray-500">Vérifiez le lien ou scannez à nouveau le QR code.</p>
    </Screen>
  );
  if (event === 'not-published') return (
    <Screen>
      <p className="text-4xl mb-3">🔒</p>
      <p className="text-lg font-semibold text-gray-800 mb-1">Événement non publié</p>
      <p className="text-sm text-gray-500">Cette page n&apos;est pas encore disponible.</p>
    </Screen>
  );

  return <GuestSite event={event} />;
}

// ─── Site invité ─────────────────────────────────────────────────────────────
function GuestSite({ event }: { event: Event }) {
  const primary = event.theme.primaryColor || '#B85C28';
  const button = event.theme.buttonColor || primary;
  const font = FONT_MAP[event.theme.typography] || FONT_MAP.playfair;
  const radius = RADIUS_MAP[event.theme.borderRadius] || '18px';

  function fmtDate(d: string) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  return (
    <div style={{ fontFamily: font, background: '#F7F4F0', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div
        className="relative flex flex-col justify-end px-6 pb-10 pt-16"
        style={{
          minHeight: 280,
          background: event.theme.heroImage
            ? `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.55)), url(${event.theme.heroImage}) center/cover`
            : `linear-gradient(135deg, ${primary} 0%, ${event.theme.secondaryColor || primary} 100%)`,
        }}
      >
        {event.theme.logo && (
          <img src={event.theme.logo} alt="logo"
            className="w-14 h-14 rounded-full object-cover border-2 border-white/40 mb-3" />
        )}
        <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Bienvenue à</p>
        <h1 className="text-3xl font-bold text-white leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          {event.name}
        </h1>
        {event.organizers && <p className="text-white/80 text-sm mt-1">{event.organizers}</p>}
        {event.date && (
          <p className="text-white/60 text-xs mt-2 capitalize">{fmtDate(event.date)}{event.time ? ` · ${event.time}` : ''}</p>
        )}
        {event.venue && <p className="text-white/60 text-xs">{event.venue}</p>}
      </div>

      {/* ── Contenu ── */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 pb-16">

        {/* Plan de table — recherche */}
        {event.sections.seatingPlan && event.guests.length > 0 && (
          <TableSearch event={event} primary={primary} button={button} radius={radius} />
        )}

        {/* Programme */}
        {event.sections.programme && event.programme.length > 0 && (
          <Section title="Programme" primary={primary} radius={radius}>
            <div className="divide-y divide-gray-100">
              {event.programme.map(item => (
                <div key={item.id} className="flex gap-4 py-3">
                  <span className="text-sm font-bold w-14 flex-shrink-0" style={{ color: primary }}>{item.time}</span>
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
              {event.menu.map(s => (
                <div key={s.id}>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: primary }}>{s.label}</p>
                  <ul className="space-y-1">
                    {s.items.map(item => (
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

        {/* Galerie collaborative */}
        {event.sections.gallery && (
          <GallerySection eventId={event.id} primary={primary} radius={radius} />
        )}

      </div>

      <p className="text-center text-xs text-gray-300 pb-8">
        Propulsé par <span className="text-gray-400 font-medium">Seat & Mrahba</span>
      </p>
    </div>
  );
}

// ─── Recherche par prénom ─────────────────────────────────────────────────────
function TableSearch({ event, primary, button, radius }: {
  event: Event; primary: string; button: string; radius: string;
}) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ guest: Guest; table: Table | undefined } | 'not-found' | null>(null);

  function search() {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const guest = event.guests.find(g =>
      g.firstName.toLowerCase().includes(q) || g.lastName.toLowerCase().includes(q)
    );
    if (!guest) { setResult('not-found'); return; }
    const table = event.tables.find(t => t.id === guest.tableId);
    setResult({ guest, table });
  }

  return (
    <div className="bg-white shadow-sm p-5" style={{ borderRadius: radius }}>
      <p className="text-[11px] font-bold uppercase tracking-wide mb-4" style={{ color: primary }}>
        Mon plan de table
      </p>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Entrez votre prénom…"
            className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border focus:outline-none transition-colors"
            style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#1a0f08' }}
            onFocus={e => (e.target.style.borderColor = primary)}
            onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
          />
        </div>
        <button
          onClick={search}
          className="px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-opacity active:opacity-80"
          style={{ background: button }}>
          Chercher
        </button>
      </div>

      {/* Résultat */}
      {result === 'not-found' && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">Aucun invité trouvé pour « {query} ».</p>
          <p className="text-xs text-gray-400 mt-1">Vérifiez l&apos;orthographe ou contactez l&apos;organisateur.</p>
        </div>
      )}
      {result && result !== 'not-found' && (
        <div className="rounded-xl p-4 text-center" style={{ background: `${primary}0D` }}>
          <p className="text-xs text-gray-500 mb-1">Bonjour</p>
          <p className="text-lg font-bold mb-3" style={{ color: primary, fontFamily: 'Playfair Display, serif' }}>
            {[result.guest.firstName, result.guest.lastName].filter(Boolean).join(' ')}
          </p>
          {result.table ? (
            <>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Vous êtes à</p>
              <p className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                {result.table.name}
              </p>
              {result.guest.seat && (
                <p className="text-sm text-gray-500 mt-1">Place {result.guest.seat}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">Place non encore attribuée.</p>
          )}
          {result.guest.menu && (
            <p className="text-xs mt-3 px-3 py-1.5 rounded-full inline-block" style={{ background: `${primary}15`, color: primary }}>
              Menu : {result.guest.menu}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Galerie collaborative ────────────────────────────────────────────────────
function GallerySection({ eventId, primary, radius }: { eventId: string; primary: string; radius: string }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhotos(loadPhotos(eventId));
  }, [eventId]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newPhotos: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const dataUrl = await new Promise<string>(res => {
        const reader = new FileReader();
        reader.onload = e => res(e.target?.result as string);
        reader.readAsDataURL(file);
      });
      newPhotos.push(dataUrl);
    }
    const updated = [...photos, ...newPhotos];
    setPhotos(updated);
    savePhotos(eventId, updated);
    setUploading(false);
  }

  function removePhoto(i: number) {
    const updated = photos.filter((_, idx) => idx !== i);
    setPhotos(updated);
    savePhotos(eventId, updated);
  }

  return (
    <div className="bg-white shadow-sm p-5" style={{ borderRadius: radius }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: primary }}>
          Galerie photos
        </p>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-opacity active:opacity-80"
          style={{ background: primary }}>
          <Camera size={12} />
          {uploading ? 'Envoi…' : 'Ajouter mes photos'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => handleFiles(e.target.files)} />
      </div>

      <p className="text-xs text-gray-400 mb-4">
        Partagez vos photos de l&apos;événement. Elles sont visibles par tous les invités.
      </p>

      {photos.length === 0 ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 transition-colors"
          style={{ borderColor: `${primary}30` }}>
          <Upload size={24} className="mb-2" style={{ color: `${primary}60` }} />
          <p className="text-sm text-gray-400">Soyez le premier à partager une photo</p>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
              <img src={p} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center transition-colors"
            style={{ borderColor: `${primary}30` }}>
            <Upload size={18} style={{ color: `${primary}60` }} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, primary, radius, children }: {
  title: string; primary: string; radius: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-sm p-5" style={{ borderRadius: radius }}>
      <p className="text-[11px] font-bold uppercase tracking-wide mb-4" style={{ color: primary }}>{title}</p>
      {children}
    </div>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F0] px-6 text-center">
      {children}
    </div>
  );
}
