'use client';

import { Event, Formula, FORMULA_FEATURES } from '@/lib/admin/types';
import { CheckCircle2, Check } from 'lucide-react';

interface Props {
  event: Event;
  update: (u: Partial<Event>) => void;
  markComplete: () => void;
}

const FORMULAS: Formula[] = ['start', 'touch', 'prestige'];
const FORMULA_PRICE: Record<Formula, string> = {
  start: '490 MAD',
  touch: '790 MAD',
  prestige: '1 290 MAD',
};
const FORMULA_DESC: Record<Formula, string> = {
  start: 'L\'essentiel pour bien accueillir vos invités.',
  touch: 'L\'expérience complète pour un événement mémorable.',
  prestige: 'Le summum du sur-mesure pour votre grand jour.',
};

export default function StepFormula({ event, update, markComplete }: Props) {
  const isDone = event.builderSteps.find(s => s.key === 'formula')?.completed;

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <p className="text-[13px] text-[#9B7A56] mb-6">
        Choisissez la formule adaptée à votre événement. Vous pouvez la modifier à tout moment.
      </p>

      <div className="space-y-4">
        {FORMULAS.map(f => {
          const info = FORMULA_FEATURES[f];
          const isSelected = event.formula === f;
          return (
            <button
              key={f}
              onClick={() => update({ formula: f })}
              className="w-full text-left rounded-2xl border-2 p-5 transition-all"
              style={isSelected
                ? { borderColor: '#B85C28', background: 'rgba(184,92,40,0.04)' }
                : { borderColor: 'rgba(26,15,8,0.1)', background: 'white' }
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={isSelected
                        ? { borderColor: '#B85C28', background: '#B85C28' }
                        : { borderColor: 'rgba(26,15,8,0.2)' }
                      }
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[14px] font-semibold text-[#1A0F08]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {info.name}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#9B7A56] mt-1 ml-6">{FORMULA_DESC[f]}</p>
                </div>
                <span className="text-[13px] font-semibold text-[#B85C28] flex-shrink-0 ml-4">
                  {FORMULA_PRICE[f]}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5 ml-6">
                {info.features.map(feat => (
                  <li key={feat} className="flex items-center gap-1.5 text-[11px] text-[#5A3C1E]">
                    <Check size={10} className="text-[#B85C28] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
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
