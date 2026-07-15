'use client';

import { Event } from '@/lib/admin/types';
import { CheckCircle2, Rocket, AlertCircle, Eye } from 'lucide-react';
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

  const completedSteps = event.builderSteps.filter(s => s.completed).length;
  const totalSteps = event.builderSteps.length;
  const readyToPublish = completedSteps >= 2 && !!event.name && !!event.date;

  const missingItems = [
    !event.name && 'Nom de l\'événement',
    !event.date && 'Date',
    !event.venue && 'Lieu',
  ].filter(Boolean);

  function handlePublish() {
    publishEvent();
    markComplete();
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">

      {/* Status */}
      <div
        className="rounded-2xl p-6 mb-6 text-center"
        style={isPublished
          ? { background: 'rgba(90,122,90,0.08)', border: '1px solid rgba(90,122,90,0.2)' }
          : { background: 'white', border: '1px solid rgba(26,15,8,0.08)' }
        }
      >
        {isPublished ? (
          <>
            <CheckCircle2 size={36} className="mx-auto text-[#5A7A5A] mb-3" />
            <p className="text-[15px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Événement publié !
            </p>
            <p className="text-[13px] text-[#9B7A56] mt-1">
              Votre page est accessible à vos invités via le QR code.
            </p>
          </>
        ) : (
          <>
            <Rocket size={36} className="mx-auto text-[#E8C49A] mb-3" />
            <p className="text-[15px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Prêt à publier ?
            </p>
            <p className="text-[13px] text-[#9B7A56] mt-1">
              {completedSteps}/{totalSteps} étapes complétées
            </p>
          </>
        )}
      </div>

      {/* Checklist summary */}
      <div className="mb-6">
        <p className="text-[11px] font-medium tracking-wide uppercase text-[#9B7A56] mb-3">Récapitulatif</p>
        <div className="space-y-2">
          {event.builderSteps.map(step => (
            <div
              key={step.key}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border"
              style={{ borderColor: 'rgba(26,15,8,0.07)' }}
            >
              {step.completed
                ? <CheckCircle2 size={14} className="text-[#5A7A5A] flex-shrink-0" />
                : <AlertCircle size={14} className="text-[#E8C49A] flex-shrink-0" />
              }
              <span className="text-[12px] text-[#1A0F08]">{step.label}</span>
              <span
                className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={step.completed
                  ? { background: 'rgba(90,122,90,0.1)', color: '#5A7A5A' }
                  : { background: 'rgba(26,15,8,0.05)', color: '#9B7A56' }
                }
              >
                {step.completed ? 'Complété' : 'À faire'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing items warning */}
      {missingItems.length > 0 && (
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: 'rgba(184,92,40,0.06)', border: '1px solid rgba(184,92,40,0.15)' }}
        >
          <p className="text-[11px] font-semibold text-[#B85C28] mb-1.5">Informations manquantes</p>
          <ul className="space-y-0.5">
            {missingItems.map(item => (
              <li key={item as string} className="text-[11px] text-[#5A3C1E]">• {item as string}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/admin/events/${event.id}/preview`)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium border transition-colors hover:bg-[rgba(26,15,8,0.03)]"
          style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
        >
          <Eye size={14} />
          Prévisualiser
        </button>

        <button
          onClick={handlePublish}
          disabled={!readyToPublish && !isPublished}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all disabled:opacity-40"
          style={{ background: '#B85C28', boxShadow: readyToPublish ? '0 2px 12px rgba(184,92,40,0.25)' : undefined }}
        >
          <Rocket size={14} />
          {isPublished ? 'Republier' : 'Publier maintenant'}
        </button>
      </div>
    </div>
  );
}
