'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Partagez vos informations',
    description: 'Transmettez-nous les détails de votre événement : noms, date, lieu, programme, plan de table, menu et messages personnalisés.',
  },
  {
    number: '02',
    title: 'Nous créons votre espace',
    description: "Notre équipe conçoit votre page web personnalisée en 48h. Vous validez et ajustez jusqu'à ce que ce soit parfait.",
  },
  {
    number: '03',
    title: 'Vos invités scannent',
    description: "Un seul QR code à l'entrée de votre événement. Un scan suffit pour que vos invités retrouvent toutes les informations importantes.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="comment-ca-marche"
      className="py-28 md:py-36 relative"
      style={{ background: '#FFFFFF' }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8C49A 40%, #E8C49A 60%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8C49A 40%, #E8C49A 60%, transparent)' }} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Processus
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-bold text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Comment ça fonctionne ?
          </h2>
          <p className="text-base text-[#9B7A56] max-w-sm mx-auto leading-relaxed">
            Simple, élégant, efficace. Trois étapes, et votre expérience digitale est prête.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">

          {/* Connector line — desktop */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.666%+40px)] right-[calc(16.666%+40px)] h-px z-0"
            style={{ background: 'linear-gradient(to right, #E8C49A, #CF9068, #E8C49A)' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.16 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              {/* Number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-8 bg-white"
                style={{
                  border: '1px solid #E8C49A',
                  boxShadow: '0 2px 20px rgba(184,92,40,0.1)',
                }}
              >
                <span
                  className="text-xl font-bold text-[#B85C28]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-lg font-semibold text-[#1A0F08] mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {step.title}
              </h3>
              <p className="text-[14px] text-[#9B7A56] leading-relaxed max-w-[260px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-block text-[13px] font-medium text-[#B85C28] border border-[#B85C28] px-8 py-3 rounded-full hover:bg-[#B85C28] hover:text-white active:scale-[0.97] transition-all"
          >
            Commencer maintenant →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
