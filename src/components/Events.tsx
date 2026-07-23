'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  {
    emoji: '💍',
    title: 'Mariages',
    description: "Le jour le plus important mérite une expérience digitale à la hauteur. Plan de table, programme, galerie — en un seul scan.",
  },
  {
    emoji: '💫',
    title: 'Fiançailles',
    description: "Célébrez le début de votre histoire avec une page élégante qui rassemble tous vos proches.",
  },
  {
    emoji: '🥂',
    title: 'EVJF',
    description: "Programme, activités, photos — une soirée mémorable organisée avec style et facilité.",
  },
  {
    emoji: '🍼',
    title: 'Baby Shower',
    description: "Célébrez l'arrivée de bébé avec une page chaleureuse et personnalisée pour chaque invité.",
  },
  {
    emoji: '🎂',
    title: 'Anniversaires',
    description: "Offrez à vos convives une expérience numérique sur mesure pour un anniversaire inoubliable.",
  },
  {
    emoji: '🏢',
    title: 'Événements d’entreprise',
    description: "Séminaires, galas, lancements — une solution digitale professionnelle pour vos événements corporate.",
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="evenements" className="py-28 md:py-36" style={{ background: '#F8F4EF' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Événements
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-bold text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
          >
            Pour chaque célébration
          </h2>
          <p className="text-base text-[#9B7A56] max-w-sm mx-auto leading-relaxed">
            Seat & Mrahba accompagne tous vos événements avec la même élégance et attention au détail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-7 cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(232,196,154,0.2)',
                boxShadow: '0 2px 20px rgba(184,92,40,0.05)',
              }}
            >
              <div className="text-3xl mb-5">{event.emoji}</div>
              <h3
                className="text-[17px] font-semibold text-[#1A0F08] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
              >
                {event.title}
              </h3>
              <p className="text-[13.5px] text-[#9B7A56] leading-relaxed">{event.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
