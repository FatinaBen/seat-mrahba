'use client';

import { use, useEffect, useState, useRef, useCallback } from 'react';
import { Event, Guest, Table, FONT_OPTIONS, FONT_GOOGLE_IMPORT_URL, CTA_TEXT_DEFAULTS } from '@/lib/admin/types';
import { Search, Camera, X, Upload, ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'seat-mrahba-admin-events';
const PHOTOS_KEY = (id: string) => `seat-mrahba-photos-${id}`;

// Source unique des polices (types.ts) : évite que dashboard et site invité divergent.
const FONT_MAP: Record<string, string> = Object.fromEntries(FONT_OPTIONS.map(f => [f.value, f.css]));
const DEFAULT_TITLE_FONT = FONT_MAP.playfair;
const DEFAULT_BODY_FONT = FONT_MAP.inter;

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`;

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
  try { localStorage.setItem(PHOTOS_KEY(id), JSON.stringify(photos)); }
  catch { /* storage full */ }
}

// Titre vu par l'invité : uniquement `displayTitle` (étape "Page d'accueil"),
// jamais `event.name` — ce champ est réservé au dashboard organisateur.
function heroTitle(event: Event): string {
  return event.displayTitle || 'Bienvenue';
}

function ctaText(event: Event): string {
  return event.ctaText || CTA_TEXT_DEFAULTS[event.type] || CTA_TEXT_DEFAULTS.autre;
}

function darken(hex: string, amount: number): string {
  try {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (n >> 16) - amount);
    const g = Math.max(0, ((n >> 8) & 0xff) - amount);
    const b = Math.max(0, (n & 0xff) - amount);
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  } catch { return hex; }
}

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    mariage: 'Cérémonie de mariage', fiancailles: 'Fiançailles',
    'baby-shower': 'Baby Shower', anniversaire: 'Anniversaire',
    corporate: 'Événement', gala: 'Gala', autre: 'Événement',
  };
  return map[type] || 'Événement';
}

// Bundle des réglages de style calculés une fois, transmis à chaque section
// (évite de recalculer/dupliquer la résolution police/couleur partout).
interface SiteStyle {
  primary: string;
  titleFont: string;
  bodyFont: string;
  textColor: string;
  buttonTextColor: string;
}

function buildSiteStyle(event: Event): SiteStyle {
  const theme = event.theme;
  return {
    primary: theme.primaryColor || '#B85C28',
    titleFont: FONT_MAP[theme.typography] || DEFAULT_TITLE_FONT,
    bodyFont: FONT_MAP[theme.bodyFont] || DEFAULT_BODY_FONT,
    textColor: theme.textColor || '#1A0F08',
    buttonTextColor: theme.buttonTextColor || '#FFFFFF',
  };
}

// Fond du site (étape Personnalisation) : couleur unie, ou image avec overlay
// sombre/clair réglable pour garder le texte lisible par-dessus.
function siteBackgroundStyle(theme: Event['theme']): React.CSSProperties {
  if (theme.backgroundType === 'image' && theme.backgroundImage) {
    const alpha = Math.max(0, Math.min(100, theme.backgroundOverlayOpacity ?? 0)) / 100;
    const overlayColor = theme.backgroundOverlay === 'light' ? '255,255,255' : '0,0,0';
    const overlay = theme.backgroundOverlay === 'none'
      ? ''
      : `linear-gradient(rgba(${overlayColor},${alpha}), rgba(${overlayColor},${alpha})), `;
    return {
      backgroundImage: `${overlay}url(${theme.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }
  return { background: theme.backgroundColor || '#FAFAF8' };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GuestPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ preview?: string }> }) {
  const { id } = use(params);
  const { preview } = use(searchParams);
  const isPreview = preview === '1'; // depuis le dashboard : voir le site avant publication
  const [event, setEvent] = useState<Event | null | 'not-found' | 'not-published'>(null);

  useEffect(() => {
    const e = loadEvent(id);
    if (!e) setEvent('not-found');
    else if (e.status !== 'published' && !isPreview) setEvent('not-published');
    else setEvent(e);
  }, [id, isPreview]);

  useEffect(() => {
    // Onglet navigateur : jamais le nom interne, seulement le titre public.
    if (event && typeof event === 'object') {
      document.title = `${heroTitle(event)} — Seat & Mrahba`;
    }
  }, [event]);

  if (event === null) return (
    <Screen><p className="text-sm text-white/50">Chargement…</p></Screen>
  );
  if (event === 'not-found') return (
    <Screen>
      <p className="text-4xl mb-4">🔍</p>
      <p className="text-xl font-semibold text-white mb-2">Page introuvable</p>
      <p className="text-sm text-white/40">Vérifiez le lien ou scannez à nouveau le QR code.</p>
    </Screen>
  );
  if (event === 'not-published') return (
    <Screen>
      <p className="text-4xl mb-4">🔒</p>
      <p className="text-xl font-semibold text-white mb-2">Bientôt disponible</p>
      <p className="text-sm text-white/40">Cette page n&apos;est pas encore disponible.</p>
    </Screen>
  );

  return <GuestSite event={event} />;
}

// ─── Site invité ───────────────────────────────────────────────────────────────
function GuestSite({ event }: { event: Event }) {
  const st = buildSiteStyle(event);
  const theme = event.theme;
  const showWatermark = theme.logoPlacement === 'watermark' && !!theme.logo;
  const showHeaderLogo = theme.logoPlacement === 'header' && !!theme.logo;

  return (
    <div style={{ fontFamily: st.bodyFont, color: st.textColor, ...siteBackgroundStyle(theme) }}>
      {/* Polices Google : balise <link> (hissée dans <head> par React 19) plutôt qu'un
          @import dans un <style> injecté au runtime — plus fiable pour le chargement réel. */}
      <link rel="stylesheet" href={FONT_GOOGLE_IMPORT_URL} precedence="default" />
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .anim-tag   { animation: fadeIn  0.8s ease both; animation-delay:0.3s; opacity:0; }
        .anim-title { animation: fadeUp  1s   ease both; animation-delay:0.6s; opacity:0; }
        .anim-sub   { animation: fadeUp  1s   ease both; animation-delay:0.9s; opacity:0; }
        .anim-scroll{ animation: fadeIn  1s   ease both; animation-delay:1.4s; opacity:0; }
        .bounce     { animation: bounce  2s   ease-in-out infinite; }
      `}</style>

      {/* Filigrane : logo fixe en fond, derrière tout le contenu */}
      {showWatermark && (
        <div
          className="pointer-events-none"
          style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <img
            src={theme.logo}
            alt=""
            style={{
              width: `${theme.logoWatermarkSize || 60}%`,
              maxWidth: '90vw',
              objectFit: 'contain',
              opacity: (theme.logoWatermarkOpacity ?? 8) / 100,
            }}
          />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {showHeaderLogo && (
          <div className="flex justify-center py-4">
            <img src={theme.logo} alt="logo" className="h-10 w-auto object-contain" />
          </div>
        )}

        <Hero event={event} st={st} />

        {event.sections.seatingPlan && event.guests.length > 0 && (
          <SeatingSection event={event} st={st} />
        )}

        {event.sections.programme && (event.programmeImage || event.programme.length > 0) && (
          <ProgrammeSection event={event} st={st} />
        )}

        {event.sections.menu && (event.menuImage || event.menu.length > 0) && (
          <MenuSection event={event} st={st} />
        )}

        {event.sections.gallery && (
          <GallerySection eventId={event.id} st={st} />
        )}

        <Footer st={st} />
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
// Avec visuel Canva importé (page d'accueil) : l'image est affichée en entier,
// sans recadrage ni déformation (object-fit: contain) — c'est un design fini,
// on ne superpose pas de texte généré par-dessus.
// Sans visuel : écran d'accueil généré (dégradé + grain), avec titre + CTA
// personnalisables (étapes "Page d'accueil" et "Informations").
function Hero({ event, st }: { event: Event; st: SiteStyle }) {
  const hasCover = !!event.theme.heroImage;
  const showLogoInHero = event.theme.logoPlacement === 'hero' && !!event.theme.logo;

  if (hasCover) {
    return (
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100svh', background: '#1A0F08' }}
      >
        <img
          src={event.theme.heroImage}
          alt={heroTitle(event)}
          className="w-full h-full"
          style={{ objectFit: 'contain', maxHeight: '100svh' }}
        />
        <div className="anim-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="bounce"><ChevronDown size={18} className="text-white/50" /></div>
        </div>
      </section>
    );
  }

  const darkened = darken(st.primary, 30);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-8"
      style={{ minHeight: '100svh', background: `${GRAIN}, linear-gradient(160deg, ${st.primary}ee 0%, ${darkened}cc 55%, #1A0F08 100%)` }}
    >
      {showLogoInHero ? (
        <div className="anim-tag mb-6">
          <img src={event.theme.logo} alt="logo"
            className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-lg mx-auto" />
        </div>
      ) : (
        <p className="anim-tag text-white/45 text-[10px] uppercase tracking-[0.32em] mb-6">
          {typeLabel(event.type)}
        </p>
      )}

      <h1
        className="anim-title leading-tight"
        style={{
          fontFamily: st.titleFont,
          color: 'white', // sur le dégradé sombre du Hero, toujours blanc — indépendant de la couleur "titres" du thème
          fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          textShadow: '0 2px 24px rgba(0,0,0,0.35)',
          maxWidth: 560,
        }}
      >
        {heroTitle(event)}
      </h1>

      {event.welcomeMessage && (
        <p className="anim-sub text-white/70 text-sm mt-5 max-w-sm leading-relaxed">{event.welcomeMessage}</p>
      )}

      <div className="anim-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-white/35 text-[9px] uppercase tracking-[0.28em]">{ctaText(event)}</p>
        <div className="bounce"><ChevronDown size={18} className="text-white/35" /></div>
      </div>
    </section>
  );
}

// ─── Plan de table ─────────────────────────────────────────────────────────────
function SeatingSection({ event, st }: { event: Event; st: SiteStyle }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ guest: Guest; table: Table | undefined } | 'not-found' | null>(null);

  function search() {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const guest = event.guests.find(g =>
      g.firstName.toLowerCase().includes(q) || g.lastName.toLowerCase().includes(q)
    );
    if (!guest) { setResult('not-found'); return; }
    setResult({ guest, table: event.tables.find(t => t.id === guest.tableId) });
  }

  return (
    <section className="px-6 flex flex-col items-center" style={{ minHeight: '90vh', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div className="w-full" style={{ maxWidth: 360 }}>

        <p className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center" style={{ color: st.primary }}>
          Plan de table
        </p>
        <h2 className="text-2xl font-semibold text-center mb-2" style={{ fontFamily: st.titleFont, color: st.textColor }}>
          Votre place
        </h2>
        <p className="text-sm text-center mb-10" style={{ color: '#9B7A56' }}>
          Saisissez votre prénom pour trouver votre table.
        </p>

        <div className="relative mb-3">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#C4A882' }} />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Votre prénom…"
            className="w-full pl-11 pr-4 py-4 text-sm rounded-2xl border bg-white focus:outline-none"
            style={{ borderColor: 'rgba(26,15,8,0.1)', color: '#1A0F08', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          />
        </div>
        <button
          onClick={search}
          className="w-full py-4 rounded-2xl text-sm font-medium transition-opacity active:opacity-80"
          style={{ background: st.primary, color: st.buttonTextColor }}>
          Rechercher
        </button>

        {result === 'not-found' && (
          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: '#9B7A56' }}>Aucun résultat pour « {query} ».</p>
            <p className="text-xs mt-1" style={{ color: '#C4A882' }}>Vérifiez l&apos;orthographe ou contactez l&apos;organisateur.</p>
          </div>
        )}

        {result && result !== 'not-found' && (
          <div className="mt-8 text-center py-10 px-6 rounded-3xl"
            style={{ background: `${st.primary}08`, border: `1px solid ${st.primary}18`, animation: 'fadeUp 0.5s ease both' }}>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#9B7A56' }}>Bonjour</p>
            <p className="text-2xl font-semibold mb-6"
              style={{ color: st.primary, fontFamily: st.titleFont }}>
              {[result.guest.firstName, result.guest.lastName].filter(Boolean).join(' ')}
            </p>
            {result.table ? (
              <>
                <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#9B7A56' }}>Vous êtes à la</p>
                <p className="text-4xl font-bold" style={{ fontFamily: st.titleFont, color: st.textColor }}>
                  {result.table.name}
                </p>
                {result.guest.seat && (
                  <p className="text-xs mt-2" style={{ color: '#9B7A56' }}>Place {result.guest.seat}</p>
                )}
              </>
            ) : (
              <p className="text-sm" style={{ color: '#9B7A56' }}>Place non encore attribuée.</p>
            )}
            {result.guest.menu && (
              <p className="text-xs mt-5 inline-block px-4 py-2 rounded-full"
                style={{ background: `${st.primary}12`, color: st.primary }}>
                {result.guest.menu}
              </p>
            )}
          </div>
        )}

        {event.seatingImage && (
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-widest mb-3 text-center" style={{ color: '#9B7A56' }}>
              Plan de salle
            </p>
            <img
              src={event.seatingImage}
              alt="Plan de table"
              style={{ width: '100%', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', display: 'block', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Programme ─────────────────────────────────────────────────────────────────
function ProgrammeSection({ event, st }: { event: Event; st: SiteStyle }) {
  return (
    <section className="px-6" style={{ background: `${GRAIN}, rgba(244,241,237,0.72)`, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 360, margin: '0 auto' }}>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center" style={{ color: st.primary }}>
          Programme
        </p>
        <h2 className="text-2xl font-semibold text-center mb-12"
          style={{ fontFamily: st.titleFont, color: st.textColor }}>
          Le déroulé de la journée
        </h2>

        {event.programmeImage ? (
          <img
            src={event.programmeImage}
            alt="Programme"
            style={{ width: '100%', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', display: 'block' }}
          />
        ) : (
          <div className="relative">
            <div className="absolute top-2 bottom-2"
              style={{ left: 52, width: 1, background: `${st.primary}20` }} />
            <div className="space-y-8">
              {event.programme.map(item => (
                <div key={item.id} className="flex gap-5 items-start">
                  <span className="text-xs font-medium flex-shrink-0 pt-0.5"
                    style={{ width: 40, textAlign: 'right', color: st.primary }}>
                    {item.time}
                  </span>
                  <div className="flex-shrink-0 w-3 h-3 rounded-full mt-0.5 z-10"
                    style={{ background: st.primary, boxShadow: `0 0 0 3px ${st.primary}20` }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: st.textColor }}>{item.title}</p>
                    {item.description && (
                      <p className="text-xs mt-0.5" style={{ color: '#9B7A56' }}>{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Menu ──────────────────────────────────────────────────────────────────────
function MenuSection({ event, st }: { event: Event; st: SiteStyle }) {
  return (
    <section style={{ padding: '6rem 1.25rem' }}>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center" style={{ color: st.primary }}>
          Menu
        </p>
        <h2 className="text-2xl font-semibold text-center mb-10"
          style={{ fontFamily: st.titleFont, color: st.textColor }}>
          Au programme ce soir
        </h2>

        {event.menuImage ? (
          <img
            src={event.menuImage}
            alt="Menu"
            style={{ width: '100%', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', display: 'block' }}
          />
        ) : (
          <div className="space-y-6">
            {event.menu.map(s => (
              <div key={s.id}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: st.primary }}>{s.label}</p>
                <ul className="space-y-2">
                  {s.items.map(item => (
                    <li key={item.id} className="flex gap-3 items-start text-sm" style={{ color: '#5A3C1E' }}>
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: st.primary }} />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Galerie ───────────────────────────────────────────────────────────────────
function GallerySection({ eventId, st }: { eventId: string; st: SiteStyle }) {
  const primary = st.primary;
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPhotos(loadPhotos(eventId)); }, [eventId]);

  const handleFiles = useCallback(async (files: FileList | null) => {
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
    setPhotos(prev => {
      const updated = [...prev, ...newPhotos];
      savePhotos(eventId, updated);
      return updated;
    });
    setUploading(false);
  }, [eventId]);

  function removePhoto(i: number) {
    setPhotos(prev => {
      const updated = prev.filter((_, idx) => idx !== i);
      savePhotos(eventId, updated);
      return updated;
    });
  }

  return (
    <section style={{ background: `${GRAIN}, rgba(244,241,237,0.72)`, padding: '6rem 1.25rem' }}>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center" style={{ color: primary }}>
          Galerie
        </p>
        <h2 className="text-2xl font-semibold text-center mb-2"
          style={{ fontFamily: st.titleFont, color: st.textColor }}>
          Revivez les plus beaux moments
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: '#9B7A56' }}>
          Partagez vos photos — visibles par tous les invités.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-opacity active:opacity-80"
            style={{ background: primary, color: st.buttonTextColor }}>
            <Camera size={14} />
            {uploading ? 'Envoi…' : 'Ajouter mes photos'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => handleFiles(e.target.files)} />
        </div>

        {photos.length === 0 ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 transition-colors"
            style={{ borderColor: `${primary}25` }}>
            <Upload size={28} className="mb-3" style={{ color: `${primary}40` }} />
            <p className="text-sm" style={{ color: '#9B7A56' }}>Soyez le premier à partager une photo</p>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden">
                <img src={p} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <X size={11} className="text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: `${primary}25` }}>
              <Upload size={20} style={{ color: `${primary}50` }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ st }: { st: SiteStyle }) {
  const primary = st.primary;
  return (
    <footer className="text-center" style={{ background: 'rgba(244,241,237,0.72)', padding: '5rem 1.5rem 4rem' }}>
      <div className="w-10 h-px mx-auto mb-8" style={{ background: `${primary}30` }} />
      <p className="text-xs mb-1" style={{ color: '#9B7A56' }}>
        Créé avec <span style={{ color: primary }}>♥</span> par{' '}
        <span className="font-medium" style={{ color: '#5A3C1E' }}>Seat & Mrahba</span>
      </p>
      <p className="text-xs mb-5" style={{ color: '#C4A882' }}>
        QR codes & mini-sites premium pour tous vos événements
      </p>
      <div className="flex items-center justify-center gap-4 text-xs" style={{ color: primary }}>
        <span>www.seatmrahba.com</span>
        <span style={{ color: '#D4C5B0' }}>·</span>
        <span>@seat.mrahba</span>
      </div>
    </footer>
  );
}

// ─── Écran d'erreur ────────────────────────────────────────────────────────────
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#1A0F08' }}>
      {children}
    </div>
  );
}
