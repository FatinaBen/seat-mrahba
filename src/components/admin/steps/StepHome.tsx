'use client';

import { useRef } from 'react';
import { Event, Theme } from '@/lib/admin/types';
import { CheckCircle2, Upload, X, ImageIcon } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

function updateTheme(event: Event, update: (u: Partial<Event>) => void, patch: Partial<Theme>) {
  update({ theme: { ...event.theme, ...patch } });
}

export default function StepHome({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'home')?.completed;
  const fileRef = useRef<HTMLInputElement>(null);
  const image = event.theme.heroImage;

  function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = e => updateTheme(event, update, { heroImage: e.target?.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Page d&apos;accueil</p>
      <p className="text-[12px] text-[#9B7A56] mb-6">
        Importez le design Canva créé pour l&apos;écran d&apos;accueil du site invité (format vertical 1080 × 1920 px).
        L&apos;image est affichée telle quelle, sans recadrage ni déformation.
      </p>

      <div className="mb-8">
        <label className="block text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-2">
          Titre affiché aux invités
        </label>
        <input
          value={event.displayTitle}
          onChange={e => update({ displayTitle: e.target.value })}
          placeholder="Ex: Mariage de Lina & Kamil"
          className="w-full px-4 py-3 text-[13px] rounded-xl border bg-white focus:outline-none transition-colors"
          style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#1A0F08' }}
        />
        <p className="text-[11px] text-[#9B7A56] mt-2">
          C&apos;est le seul titre que voient les invités — distinct du « Nom de l&apos;événement » (interne, étape
          Informations). Utilisé uniquement si aucun visuel n&apos;est importé ci-dessous (le visuel Canva contient déjà
          son propre titre).
        </p>
      </div>

      <div className="flex gap-8 items-start flex-wrap">
        {/* Import / preview */}
        <div className="flex-1 min-w-[260px]">
          {image ? (
            <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
              <img src={image} alt="Page d'accueil" className="w-full object-contain" style={{ maxHeight: 320, background: '#F4F1ED' }} />
              <button
                onClick={() => updateTheme(event, update, { heroImage: '' })}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                <X size={12} className="text-white" />
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
                Remplacer le visuel
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full h-72 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#B85C28]"
              style={{ borderColor: 'rgba(26,15,8,0.12)', background: 'white' }}>
              <Upload size={22} className="text-[#C4A882]" />
              <p className="text-[12px] font-medium text-[#1A0F08]">Importer le visuel</p>
              <p className="text-[10px] text-[#C4A882]">PNG ou JPG — format vertical recommandé 1080×1920 px</p>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden"
            onChange={e => handleFile(e.target.files)} />

          {!image && (
            <p className="text-[11px] text-[#9B7A56] mt-3">
              Sans visuel importé, le site invité affiche un fond dégradé élégant avec le nom de l&apos;événement.
            </p>
          )}
        </div>

        {/* Aperçu mobile */}
        <div className="flex-shrink-0">
          <p className="text-[10px] uppercase tracking-wide text-[#9B7A56] mb-2 text-center">Aperçu mobile</p>
          <div className="relative rounded-[28px] border-[6px] border-[#1A0F08] overflow-hidden shadow-lg" style={{ width: 140, height: 280, background: '#1A0F08' }}>
            {image ? (
              <img src={image} alt="" className="w-full h-full object-contain" style={{ background: '#1A0F08' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={20} className="text-white/20" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-8 border-t" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
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
