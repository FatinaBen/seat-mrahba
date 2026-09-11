'use client';

import { Event } from '@/lib/admin/types';

interface Props {
  event: Event;
}

// Aperçu "Voir le site" : au lieu de maintenir un second rendu (mockup) qui finit
// toujours par diverger du vrai site, on affiche directement la vraie page invité
// dans un cadre téléphone. `?preview=1` permet de la voir même avant publication —
// c'est le même rendu, au pixel près, que verra l'invité qui scanne le QR code.
export default function PhonePreview({ event }: Props) {
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/event/${event.id}?preview=1`
    : `/event/${event.id}?preview=1`;

  return (
    <div className="relative w-full" style={{ maxWidth: 320 }}>
      {/* Phone shell */}
      <div
        className="relative rounded-[44px] border-[8px] border-[#1A0F08] shadow-2xl overflow-hidden w-full"
        style={{ height: 'min(680px, 78vh)', background: '#fff' }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-10"
          style={{ background: '#1A0F08' }}
        />
        <iframe
          key={event.id}
          src={url}
          title="Aperçu du site invité"
          className="w-full h-full border-0"
        />
      </div>

      {/* Phone label */}
      <p className="text-center text-[11px] text-[#9B7A56] mt-4">
        Aperçu réel de la page invité — interactif
      </p>
    </div>
  );
}
