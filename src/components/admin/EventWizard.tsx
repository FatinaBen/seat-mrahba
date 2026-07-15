'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdmin } from '@/lib/admin/store';
import { Event, BuilderStepKey, BUILDER_STEPS_DEFAULT } from '@/lib/admin/types';
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight, ArrowLeft,
  Info, Users, LayoutGrid, Palette, List, Eye, Rocket,
} from 'lucide-react';

import StepGeneral from './steps/StepGeneral';
import StepGuests from './steps/StepGuests';
import StepSeating from './steps/StepSeating';
import StepDesign from './steps/StepDesign';
import StepSections from './steps/StepSections';
import StepPreview from './steps/StepPreview';
import StepPublish from './steps/StepPublish';

const STEP_ICONS: Record<BuilderStepKey, React.ElementType> = {
  general: Info,
  guests: Users,
  seating: LayoutGrid,
  design: Palette,
  sections: List,
  preview: Eye,
  publish: Rocket,
};

const STEPS: BuilderStepKey[] = [
  'general', 'guests', 'seating', 'design', 'sections', 'preview', 'publish',
];

interface Props { event: Event }

export default function EventWizard({ event }: Props) {
  const { updateEvent, completeStep, publishEvent } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step') as BuilderStepKey | null;
  const initialIndex = stepParam ? STEPS.indexOf(stepParam) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const currentKey = STEPS[currentIndex];
  const currentStep = BUILDER_STEPS_DEFAULT[currentIndex];

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
      case 'guests':   return <StepGuests {...props} />;
      case 'seating':  return <StepSeating {...props} />;
      case 'design':   return <StepDesign {...props} />;
      case 'sections': return <StepSections {...props} />;
      case 'preview':  return <StepPreview {...props} />;
      case 'publish':  return <StepPublish {...props} publishEvent={() => publishEvent(event.id)} />;
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar checklist */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r" style={{ background: '#FDFCF9', borderColor: 'rgba(26,15,8,0.07)' }}>

        {/* Back + title */}
        <div className="px-4 pt-4 pb-4 border-b" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
          <button onClick={() => router.push('/admin/events')}
            className="flex items-center gap-1.5 text-[11px] text-[#9B7A56] hover:text-[#1A0F08] transition-colors mb-3">
            <ArrowLeft size={11} />
            Tous les événements
          </button>
          <p className="text-[12px] font-semibold text-[#1A0F08] truncate">{event.name || 'Sans titre'}</p>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1 rounded-full bg-[rgba(26,15,8,0.08)]">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: '#B85C28' }} />
            </div>
            <span className="text-[10px] text-[#9B7A56]">{completedCount}/{STEPS.length}</span>
          </div>
        </div>

        {/* Steps */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {BUILDER_STEPS_DEFAULT.map((step, i) => {
            const isActive = step.key === currentKey;
            const isDone = event.builderSteps.find(s => s.key === step.key)?.completed ?? false;
            const Icon = STEP_ICONS[step.key];
            return (
              <button key={step.key} onClick={() => goTo(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all mb-0.5 ${
                  isActive ? 'text-[#B85C28]' : 'text-[#5A3C1E] hover:bg-[rgba(26,15,8,0.04)]'
                }`}
                style={isActive ? { background: 'rgba(184,92,40,0.08)' } : {}}>

                <span className="flex-shrink-0 text-[10px] font-mono w-4 text-center opacity-40">{i + 1}</span>

                {isDone
                  ? <CheckCircle2 size={13} className="flex-shrink-0 text-[#5A7A5A]" />
                  : <Circle size={13} className={`flex-shrink-0 ${isActive ? 'text-[#B85C28]' : 'text-[rgba(26,15,8,0.2)]'}`} />
                }
                <span className="text-[12px] font-medium truncate">{step.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-white flex-shrink-0" style={{ borderColor: 'rgba(26,15,8,0.06)' }}>
          <div>
            <p className="text-[10px] text-[#9B7A56] uppercase tracking-widest">{currentIndex + 1} / {STEPS.length}</p>
            <h2 className="text-[14px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {currentStep?.label}
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={goPrev} disabled={currentIndex === 0}
              className="p-1.5 rounded-lg border disabled:opacity-30 hover:bg-[rgba(26,15,8,0.04)] transition-colors"
              style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
              <ChevronLeft size={13} className="text-[#5A3C1E]" />
            </button>
            <button onClick={goNext} disabled={currentIndex === STEPS.length - 1}
              className="px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all"
              style={currentIndex < STEPS.length - 1
                ? { background: '#B85C28', color: 'white' }
                : { border: '1px solid rgba(26,15,8,0.1)', color: '#9B7A56', opacity: 0.4, cursor: 'default' }
              }>
              Suivant →
            </button>
          </div>
        </div>

        {/* Step body */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#F8F5F2' }}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
