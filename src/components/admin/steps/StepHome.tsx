'use client';

import { Event, Theme } from '@/lib/admin/types';
import { CheckCircle2, ImageIcon } from 'lucide-react';
import ImageUploadCropper from '../ImageUploadCropper';

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
  const image = event.theme.heroImage;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-1">Page d&apos;accueil</p>
      <p className="text-[12px] text-[#9B7A56] mb-6">
        Importez le design Canva créé pour l&apos;écran d&apos;accueil du site invité. Vous choisissez ensuite le cadrage au
        format vertical mobile, pour un rendu plein écran sans bande noire.
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
        {/* Import / recadrage / preview */}
        <div className="flex-1 min-w-[260px]">
          <ImageUploadCropper
            image={image}
            sourceImage={event.theme.heroImageSource}
            onChange={({ image, source }) => updateTheme(event, update, { heroImage: image, heroImageSource: source })}
            onRemove={() => updateTheme(event, update, { heroImage: '', heroImageSource: '' })}
            hint="PNG ou JPG — vous choisissez le cadrage au format vertical à la validation."
            alt="Page d'accueil"
            emptyHeight={288}
          />
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
              <img src={image} alt="" className="w-full h-full object-cover" style={{ background: '#1A0F08' }} />
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
