'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const values = [
  {
    label: 'Élégance',
    description: 'Chaque page est conçue avec soin, en parfaite harmonie avec l\'esthétique de votre événement.',
  },
  {
    label: 'Simplicité',
    description: 'Un scan suffit. Pas d\'application, pas de compte. Un accès immédiat pour chaque invité.',
  },
  {
    label: 'Sur mesure',
    description: 'Couleurs, typographies, contenus, messages — tout est adapté à votre vision et votre identité.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="pourquoi"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ background: '#1A0F08' }}
    >
      {/* Ambient texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #E8C49A 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Central quote */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#CF9068] mb-10">
            Notre différence
          </p>

          <blockquote
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Les grands moments méritent une{' '}
            <em className="text-[#E8C49A] not-italic italic">attention</em>{' '}
            aux détails.
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#E8C49A]/30" />
            <span className="text-[#CF9068] text-xs">✦</span>
            <div className="h-px w-12 bg-[#E8C49A]/30" />
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.14 }}
              className="text-center px-4"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#E8C49A]/30" />
                <span className="text-[#CF9068] text-[10px]">✦</span>
                <div className="h-px w-6 bg-[#E8C49A]/30" />
              </div>
              <h3
                className="text-xl font-semibold text-[#E8C49A] mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {v.label}
              </h3>
              <p className="text-[14px] text-white/50 leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full text-[13px] font-medium text-[#1A0F08] bg-[#E8C49A] hover:bg-white active:scale-[0.97] transition-all"
          >
            Sublimez votre événement →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
