'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Smartphone, Heart, Star } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Une page unique par événement',
    description: 'Chaque mariage, fiançailles ou fête reçoit sa propre page web sur mesure — à votre image, à vos couleurs.',
  },
  {
    icon: Heart,
    title: 'Tout en un seul scan',
    description: 'Plan de table, programme, menu, galerie, infos pratiques — accessibles instantanément sans aucune application.',
  },
  {
    icon: Star,
    title: 'Expérience personnalisée',
    description: 'Chaque invité accède à ses informations spécifiques. Un accueil digital chaleureux et raffiné, pour tous.',
  },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const fade: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="py-28 md:py-36 overflow-hidden"
      style={{ background: '#F8F4EF' }}
    >
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
            À propos
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl text-[#1A0F08] mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            L&apos;hospitalité marocaine,<br className="hidden sm:block" />
            réinventée à l&apos;ère digitale
          </h2>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#E8C49A]" />
            <span className="text-[#CF9068] text-xs">✦</span>
            <div className="h-px w-12 bg-[#E8C49A]" />
          </div>

          <p className="text-base text-[#9B7A56] max-w-lg mx-auto leading-relaxed">
            Le QR code n&apos;est plus une simple redirection. Avec Seat & Mrahba, il devient la porte d&apos;entrée vers une expérience digitale aussi chaleureuse et raffinée que l&apos;hospitalité marocaine.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          ref={cardsRef}
          variants={container}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={fade}
                className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  border: '1px solid rgba(232,196,154,0.2)',
                  boxShadow: '0 2px 24px rgba(184,92,40,0.06)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ background: 'rgba(184,92,40,0.08)' }}
                >
                  <Icon size={22} color="#B85C28" strokeWidth={1.5} />
                </div>

                <h3
                  className="text-lg font-semibold text-[#1A0F08] mb-3"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#9B7A56]">
                  {feature.description}
                </p>

                {/* Hover underline */}
                <div
                  className="mt-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to right, #B85C28, #8A7235)' }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Brand promise — replaces fake stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <blockquote
            className="text-xl sm:text-2xl font-medium italic text-[#8A7235] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            &ldquo;Chaque invité mérite d&apos;être accueilli avec attention, même avant d&apos;entrer dans la salle.&rdquo;
          </blockquote>
          <p className="mt-4 text-[12px] tracking-[0.2em] uppercase text-[#CF9068]">
            — La philosophie Seat & Mrahba
          </p>
        </motion.div>

      </div>
    </section>
  );
}
