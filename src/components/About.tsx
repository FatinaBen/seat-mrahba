'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Smartphone, Heart, Star } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Une page unique par événement',
    description:
      'Chaque mariage, fiançailles ou fête reçoit sa propre page digitale sur mesure, à votre image et à vos couleurs.',
  },
  {
    icon: Heart,
    title: 'Toutes les infos en un scan',
    description:
      'Plan de table, programme de la soirée, menu, galerie photos, infos pratiques — accessibles instantanément sans application.',
  },
  {
    icon: Star,
    title: 'Expérience personnalisée',
    description:
      'Chaque invité vit une expérience unique : son nom, sa table, ses informations spécifiques. Un luxe digital pour tous.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#FBF6F0]"
      style={{ background: '#FBF6F0' }}
    >
      {/* Decorative arch / geometric element */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="400" cy="0" r="300" stroke="#8B763A" strokeWidth="60" fill="none" />
          <circle cx="400" cy="0" r="200" stroke="#C16D2D" strokeWidth="30" fill="none" />
          <circle cx="400" cy="0" r="100" stroke="#8B763A" strokeWidth="20" fill="none" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <circle cx="0" cy="300" r="250" stroke="#C16D2D" strokeWidth="50" fill="none" />
          <circle cx="0" cy="300" r="150" stroke="#8B763A" strokeWidth="30" fill="none" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section label + Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> À propos <span>✦</span>
          </span>

          <h2
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto"
            style={{ color: '#2C1A0E' }}
          >
            L'hospitalité marocaine, réinventée à l'ère digitale
          </h2>

          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#6B4C2A' }}>
            Le QR code n'est plus une simple redirection. Avec Seat & Mrahba, il devient la porte d'entrée vers
            une expérience digitale premium — aussi chaleureuse et raffinée que l'hospitalité marocaine dont
            nous sommes si fiers.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to right, transparent, #ECC49D)' }} />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L19 12L29 16L19 20L16 30L13 20L3 16L13 12Z" fill="#8B763A" opacity="0.4" />
            <circle cx="16" cy="16" r="4" fill="#C16D2D" opacity="0.6" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(to left, transparent, #ECC49D)' }} />
        </motion.div>

        {/* Feature cards */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-default"
                style={{
                  background: 'linear-gradient(145deg, #FFFFFF, #FFF8F0)',
                  border: '1px solid #ECC49D',
                  boxShadow: '0 4px 24px rgba(193, 109, 45, 0.08)',
                }}
              >
                {/* Corner ornament */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z" fill="#8B763A" />
                  </svg>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #C16D2D, #BC5A2F)' }}
                >
                  <Icon size={26} color="white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3
                  className="font-['Playfair_Display'] text-xl font-bold mb-3"
                  style={{ color: '#2C1A0E' }}
                >
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#6B4C2A' }}>
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to right, #C16D2D, #8B763A)' }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-10 px-10 py-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #2C1A0E, #3D2510)',
              boxShadow: '0 20px 60px rgba(44, 26, 14, 0.2)',
            }}
          >
            {[
              { num: '500+', label: 'Événements créés' },
              { num: '98%', label: 'Invités satisfaits' },
              { num: '48h', label: 'Délai de livraison' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="font-['Playfair_Display'] text-3xl font-bold"
                  style={{ color: '#ECC49D' }}
                >
                  {stat.num}
                </span>
                <span className="text-sm mt-1 text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
