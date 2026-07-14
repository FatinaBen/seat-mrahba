'use client';

import { Event } from '@/lib/admin/types';
import { CheckCircle2, ImageIcon, Trash2, Link } from 'lucide-react';
import { useState } from 'react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

export default function StepGallery({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'gallery')?.completed;
  const [url, setUrl] = useState('');

  function addUrl() {
    const trimmed = url.trim();
    if (!trimmed) return;
    update({ gallery: [...event.gallery, trimmed] });
    setUrl('');
  }

  function removeImage(index: number) {
    update({ gallery: event.gallery.filter((_, i) => i !== index) });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <p className="text-[13px] text-[#9B7A56] mb-6">
        Ajoutez des photos de votre événement. Saisissez une URL d&apos;image (Unsplash, Drive, etc.)
      </p>

      {/* Add by URL */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B7A56]" />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addUrl()}
            placeholder="https://images.unsplash.com/..."
            className="w-full pl-9 pr-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
          />
        </div>
        <button
          onClick={addUrl}
          className="px-4 py-3 rounded-xl text-[13px] font-medium text-white"
          style={{ background: '#B85C28' }}
        >
          Ajouter
        </button>
      </div>

      {/* Hero image */}
      <div className="mb-6">
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Image de couverture (hero)
        </label>
        <input
          value={event.theme.heroImage}
          onChange={e => update({ theme: { ...event.theme, heroImage: e.target.value } })}
          placeholder="https://..."
          className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none"
          style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
        />
        {event.theme.heroImage && (
          <div className="mt-2 h-32 rounded-xl overflow-hidden">
            <img src={event.theme.heroImage} alt="Hero" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Gallery grid */}
      {event.gallery.length === 0 ? (
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
          style={{ borderColor: 'rgba(26,15,8,0.1)' }}
        >
          <ImageIcon size={28} className="text-[#E8C49A] mb-3" />
          <p className="text-[13px] text-[#9B7A56]">Aucune photo ajoutée</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {event.gallery.map((img, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
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
