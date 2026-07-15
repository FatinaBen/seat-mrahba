'use client';

import { useEffect, useRef, useState } from 'react';
import { Event } from '@/lib/admin/types';
import { CheckCircle2, Rocket, Copy, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
  publishEvent: () => void;
}

export default function StepPublish({ event, markComplete, publishEvent }: Props) {
  const router = useRouter();
  const isDone = event.builderSteps.find(s => s.key === 'publish')?.completed;
  const isPublished = event.status === 'published';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const eventUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/event/${event.id}`
    : `/event/${event.id}`;

  const readyToPublish = !!event.name && !!event.date;
  const completedSteps = event.builderSteps.filter(s => s.completed).length;
  const total = event.builderSteps.length;

  useEffect(() => {
    if (!isPublished) return;
    let cancelled = false;
    import('qrcode').then(QRCode => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, eventUrl, {
        width: 220, margin: 2,
        color: { dark: '#1A0F08', light: '#FFFFFF' },
      });
    });
    return () => { cancelled = true; };
  }, [isPublished, eventUrl]);

  function handlePublish() {
    publishEvent();
    markComplete();
  }

  function copyUrl() {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadQR() {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.download = `qr-${event.name || event.id}.png`;
    a.href = canvasRef.current.toDataURL();
    a.click();
  }

  const missing = [
    !event.name && 'Nom de l\'événement',
    !event.date && 'Date de l\'événement',
    event.guests.length === 0 && 'Invités (aucun importé)',
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">

      {/* État */}
      {isPublished ? (
        <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: 'rgba(90,122,90,0.08)', border: '1px solid rgba(90,122,90,0.2)' }}>
          <CheckCircle2 size={40} className="mx-auto text-[#5A7A5A] mb-3" />
          <p className="text-[16px] font-semibold text-[#1A0F08] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            Événement publié !
          </p>
          <p className="text-[12px] text-[#9B7A56]">Le site invité est en ligne. Partagez le QR code.</p>
        </div>
      ) : (
        <div className="rounded-2xl p-6 mb-6 text-center bg-white border" style={{ borderColor: 'rgba(26,15,8,0.08)' }}>
          <Rocket size={36} className="mx-auto text-[#E8C49A] mb-3" />
          <p className="text-[16px] font-semibold text-[#1A0F08] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            Prêt à publier ?
          </p>
          <p className="text-[12px] text-[#9B7A56]">{completedSteps}/{total} étapes complétées</p>
        </div>
      )}

      {/* Infos manquantes */}
      {missing.length > 0 && (
        <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(200,100,0,0.06)', border: '1px solid rgba(200,100,0,0.15)' }}>
          <p className="text-[11px] font-semibold text-[#B85C28] mb-1.5">À compléter avant de publier</p>
          {missing.map(m => (
            <p key={m} className="text-[11px] text-[#5A3C1E] flex items-center gap-1.5">
              <AlertCircle size={11} className="text-[#B85C28]" /> {m}
            </p>
          ))}
        </div>
      )}

      {/* URL */}
      <div className="mb-5">
        <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">URL du site invité</p>
        <div className="flex items-center gap-2 px-3 py-3 rounded-xl border bg-white" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
          <span className="flex-1 text-[12px] text-[#5A3C1E] truncate font-mono">{eventUrl}</span>
          <button onClick={copyUrl} className="text-[#9B7A56] hover:text-[#B85C28] transition-colors flex-shrink-0">
            <Copy size={14} />
          </button>
        </div>
        {copied && <p className="text-[10px] text-[#5A7A5A] mt-1">Copié !</p>}
      </div>

      {/* QR Code (visible après publication) */}
      {isPublished && (
        <div className="mb-6">
          <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">QR Code</p>
          <div className="flex items-start gap-5">
            <div className="p-3 rounded-2xl bg-white border" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
              <canvas ref={canvasRef} className="block" />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button onClick={downloadQR}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white"
                style={{ background: '#B85C28' }}>
                <Download size={13} />
                Télécharger (PNG)
              </button>
              <p className="text-[10px] text-[#9B7A56] max-w-[180px]">
                Imprimez ce QR code et placez-le à l&apos;entrée. Les invités scannent et accèdent directement à leur table.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton publier */}
      <button
        onClick={handlePublish}
        disabled={!readyToPublish}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-medium text-white transition-all disabled:opacity-40"
        style={{ background: '#B85C28', boxShadow: readyToPublish ? '0 2px 16px rgba(184,92,40,0.3)' : undefined }}>
        <Rocket size={15} />
        {isPublished ? 'Republier l\'événement' : 'Publier maintenant'}
      </button>
    </div>
  );
}
