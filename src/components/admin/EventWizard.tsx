'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdmin } from '@/lib/admin/store';
import { Event, BuilderStepKey, BUILDER_STEPS_DEFAULT } from '@/lib/admin/types';
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight, Eye, EyeOff, ArrowLeft,
  Info, Sparkles, Users, LayoutGrid, Palette, List, ImageIcon, QrCode, Rocket,
} from 'lucide-react';

import StepGeneral from './steps/StepGeneral';
import StepFormula from './steps/StepFormula';
import StepGuests from './steps/StepGuests';
import StepSeating from './steps/StepSeating';
import StepDesign from './steps/StepDesign';
import StepSections from './steps/StepSections';
import StepGallery from './steps/StepGallery';
import StepQRCode from './steps/StepQRCode';
import StepPublish from './steps/StepPublish';
import PhonePreview from './PhonePreview';

const STEP_ICONS: Record<BuilderStepKey, React.ElementType> = {
  general: Info, formula: Sparkles, guests: Users, seating: LayoutGrid,
  design: Palette, sections: List, gallery: ImageIcon, qrcode: QrCode, publish: Rocket,
};

const STEPS: BuilderStepKey[] = [
  'general', 'formula', 'guests', 'seating', 'design', 'sections', 'gallery', 'qrcode', 'publish',
];

interface Props { event: Event }

export default function EventWizard({ event }: Props) {
  const { updateEvent, completeStep, publishEvent } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step') as BuilderStepKey | null;
  const initialIndex = stepParam ? STEPS.indexOf(stepParam) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [showPreview, setShowPreview] = useState(false);

  const currentKey = STEPS[currentIndex];

  const update = useCallback((updates: Partial<Event>) => {
    updateEvent(event.id, updates);
  }, [event.id, updateEvent]);

  function markComplete() { completeStep(event.id, currentKey); }

  function goTo(index: number) {
    setCurrentIndex(index);
    router.replace(`/admin/events/${event.id}?step=${STEPS[index]}`, { scroll: false });
  }

  function goNext() { if (currentIndex < STEPS.length - 1) goTo(currentIndex + 1); }
  function goPrev() { if (currentIndex > 0) goTo(currentIndex - 1); }

  const completedCount = event.builderSteps.filter(s => s.completed).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  function renderStep() {
    const props = { event, update, markComplete };
    switch (currentKey) {
      case 'general':  return <StepGeneral {...props} />;
      case 'formula':  return <StepFormula {...props} />;
      case 'guests':   return <StepGuests {...props} />;
      case 'seating':  return <StepSeating {...props} />;
      case 'design':   return <StepDesign {...props} />;
      case 'sections': return <StepSections {...props} />;
      case 'gallery':  return <StepGallery {...props} />;
      case 'qrcode':   return <StepQRCode {...props} />;
      case 'publish':  return <StepPublish {...props} publishEvent={() => publishEvent(event.id)} />;
    }
  }

  return (
    <div className="flex h-full">
      {/* Left — Checklist sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col border-r overflow-y-auto"
        style={{ background: '#FDFCF9', borderColor: 'rgba(26,15,8,0.07)' }}
      >
        <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
          <button
            onClick={() => router.push('/admin/events')}
            className="flex items-center gap-1.5 text-[11px] text-[#9B7A56] hover:text-[#1A0F08] transition-colors mb-3"
          >
            <ArrowLeft size={11} />
            Tous les événements
          </button>
          <p className="text-[12px] font-semibold text-[#1A0F08] truncate">{event.name || 'Sans titre'}</p>
          <p className="text-[10px] text-[#9B7A56] mt-0.5">{completedCount}/{STEPS.length} étapes</p>
          <div className="mt-2.5 h-1 rounded-full bg-[rgba(26,15,8,0.08)]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: '#B85C28' }}
            />
          </div>
        </div>

        <nav className="flex-1 py-3 px-2">
          {BUILDER_STEPS_DEFAULT.map((step, i) => {
            const isActive = step.key === currentKey;
            const isDone = event.builderSteps.find(s => s.key === step.key)?.completed ?? false;
            const Icon = STEP_ICONS[step.key];
            return (
              <button
                key={step.key}
                onClick={() => goTo(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all mb-0.5 ${
                  isActive ? 'text-[#B85C28]' : 'text-[#5A3C1E] hover:bg-[rgba(26,15,8,0.04)]'
                }`}
                style={isActive ? { background: 'rgba(184,92,40,0.08)' } : {}}
              >
                {isDone
                  ? <CheckCircle2 size={14} className="flex-shrink-0 text-[#5A7A5A]" />
                  : <Circle size={14} className={`flex-shrink-0 ${isActive ? 'text-[#B85C28]' : 'text-[#9B7A56]'}`} />
                }
                <span className="text-[12px] font-medium">{step.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Center — Step content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Step header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white" style={{ borderColor: 'rgba(26,15,8,0.06)' }}>
          <div>
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#9B7A56]">
              Étape {currentIndex + 1} / {STEPS.length}
            </p>
            <h2 className="text-[15px] font-semibold text-[#1A0F08] mt-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
              {BUILDER_STEPS_DEFAULT[currentIndex].label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Toggle live preview */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-medium transition-all"
              style={showPreview
                ? { borderColor: '#B85C28', color: '#B85C28', background: 'rgba(184,92,40,0.06)' }
                : { borderColor: 'rgba(26,15,8,0.1)', color: '#5A3C1E' }
              }
            >
              {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
              Aperçu live
            </button>
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg border transition-colors disabled:opacity-30 hover:bg-[rgba(26,15,8,0.04)]"
              style={{ borderColor: 'rgba(26,15,8,0.1)' }}
            >
              <ChevronLeft size={14} className="text-[#5A3C1E]" />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === STEPS.length - 1}
              className="p-2 rounded-lg border transition-colors disabled:opacity-30 hover:bg-[rgba(26,15,8,0.04)]"
              style={{ borderColor: 'rgba(26,15,8,0.1)' }}
            >
              <ChevronRight size={14} className="text-[#5A3C1E]" />
            </button>
          </div>
        </div>

        {/* Step body */}
        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>
      </div>

      {/* Right — Live preview panel */}
      {showPreview && (
        <aside
          className="w-[360px] flex-shrink-0 border-l overflow-y-auto flex flex-col items-center py-8 px-4"
          style={{ background: '#F0EDE9', borderColor: 'rgba(26,15,8,0.07)' }}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#9B7A56] mb-6">
            Aperçu temps réel
          </p>
          <PhonePreview event={event} />
        </aside>
      )}
    </div>
  );
}
