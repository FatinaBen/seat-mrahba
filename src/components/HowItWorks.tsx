'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Palette, QrCode } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Send,
    title: 'Partagez vos informations',
    description: 'Transmettez-nous les détails de votre événement : noms, date, lieu, programme, plan de table, menu et messages personnalisés.',
    color: '#C16D2D',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Nous créons votre espace',
    description: "Notre équipe conçoit votre page web personnalisée en 48h. Vous validez et ajustez jusqu'à ce que ce soit parfait.",
    color: '#8B763A',
  },
  {
    number: '03',
    icon: QrCode,
    title: 'Vos invités scannent',
    description: "Placez votre QR code sur les faire-parts ou les tables. En un scan, vos invités accèdent à toutes les informations.",
    color: '#BC5A2F',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="comment-ca-marche" className="py-24 md:py-32 bg-[#FBF6F0] relative overflow-hidden">
      {/* Subtle background ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#ECC49D] to-transparent opacity-60" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> Processus <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Comment ça fonctionne ?
          </h2>
          <p className="text-[17px] text-[#6B4C2A] max-w-xl mx-auto leading-relaxed">
            Simple, élégant, efficace. En trois étapes, votre expérience digitale est prête.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Horizontal connector – desktop only, positioned at circle centers */}
          <div className="hidden md:block absolute top-[64px] left-[calc(16.666%+56px)] right-[calc(16.666%+56px)] h-px z-0"
            style={{ background: 'linear-gradient(to right, #C16D2D, #ECC49D, #BC5A2F)' }} />

          <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.18 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div
                    className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-8 shadow-xl relative"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                  >
                    {/* White ring accent */}
                    <div className="absolute inset-[3px] rounded-full border border-white/20" />
                    <Icon className="w-9 h-9 text-white mb-1" strokeWidth={1.5} />
                    <span className="text-white/70 text-xs font-medium tracking-[0.15em]">{step.number}</span>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#2C1A0E] mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6B4C2A] leading-relaxed text-[15px] max-w-[280px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#C16D2D] text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-[#BC5A2F] active:scale-[0.97] transition-all shadow-lg hover:shadow-xl"
          >
            Commencer maintenant →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
