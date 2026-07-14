'use client';

import { useEffect, useRef, useState } from 'react';
import { Event } from '@/lib/admin/types';
import { CheckCircle2, Download, Copy, ExternalLink } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

export default function StepQRCode({ event, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'qrcode')?.completed;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const eventUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/event/${event.id}`
    : `https://seat-mrahba.com/event/${event.id}`;

  useEffect(() => {
    let cancelled = false;
    import('qrcode').then(QRCode => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, eventUrl, {
        width: 280,
        margin: 2,
        color: { dark: '#1A0F08', light: '#FFFFFF' },
      });
    });
    return () => { cancelled = true; };
  }, [eventUrl]);

  function downloadQR() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qr-${event.name || event.id}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  function copyUrl() {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <p className="text-[13px] text-[#9B7A56] mb-8">
        Voici le QR code de votre événement. Imprimez-le ou partagez-le avec vos invités.
      </p>

      {/* QR + actions */}
      <div className="flex gap-8 items-start">
        <div
          className="flex-shrink-0 p-4 rounded-2xl bg-white border"
          style={{ borderColor: 'rgba(26,15,8,0.1)' }}
        >
          <canvas ref={canvasRef} className="block" />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-[10px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">URL de l&apos;événement</p>
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white"
              style={{ borderColor: 'rgba(26,15,8,0.1)' }}
            >
              <span className="flex-1 text-[11px] text-[#5A3C1E] truncate font-mono">{eventUrl}</span>
              <button onClick={copyUrl} className="flex-shrink-0 text-[#9B7A56] hover:text-[#B85C28] transition-colors">
                <Copy size={13} />
              </button>
            </div>
            {copied && <p className="text-[10px] text-[#5A7A5A] mt-1">Copié !</p>}
          </div>

          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white w-full justify-center"
            style={{ background: '#B85C28' }}
          >
            <Download size={13} />
            Télécharger le QR Code (PNG)
          </button>

          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium border w-full justify-center transition-colors hover:bg-[rgba(26,15,8,0.03)]"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
          >
            <ExternalLink size={13} />
            Ouvrir la page invité
          </a>
        </div>
      </div>

      {/* Tips */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{ background: 'rgba(184,92,40,0.06)', border: '1px solid rgba(184,92,40,0.12)' }}
      >
        <p className="text-[11px] font-semibold text-[#B85C28] mb-2">Conseils d&apos;utilisation</p>
        <ul className="space-y-1 text-[11px] text-[#5A3C1E]">
          <li>• Imprimez le QR code en grand format (minimum 10×10 cm)</li>
          <li>• Placez-le à l&apos;entrée de la salle, bien éclairé</li>
          <li>• Testez-le depuis plusieurs smartphones avant le jour J</li>
          <li>• Publiez votre événement avant de l&apos;imprimer</li>
        </ul>
      </div>

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
