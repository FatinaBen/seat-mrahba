'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  {
    emoji: '💍',
    title: 'Mariages',
    description: "Le jour le plus important mérite une expérience digitale à la hauteur. Plan de table, programme, galerie — tout en un QR code.",
    color: '#C16D2D',
  },
  {
    emoji: '💫',
    title: 'Fiançailles',
    description: "Annoncez et célébrez le début de votre histoire avec une page élégante qui réunit tous vos proches.",
    color: '#8B763A',
  },
  {
    emoji: '🥂',
    title: 'EVJF',
    description: "Une soirée mémorable organisée avec style. Programme, activités, photos — vos amies auront tout sous la main.",
    color: '#BC5A2F',
  },
  {
    emoji: '🍼',
    title: 'Baby Shower',
    description: "Célébrez l'arrivée de bébé avec une page chaleureuse et personnalisée pour vos proches.",
    color: '#D59667',
  },
  {
    emoji: '🎂',
    title: 'Anniversaires',
    description: "Chaque anniversaire mérite d'être unique. Offrez à vos invités une expérience numérique sur mesure.",
    color: '#C16D2D',
  },
  {
    emoji: '🏢',
    title: 'Événements d\'entreprise',
    description: "Séminaires, galas, lancements — une solution digitale professionnelle pour vos événements corporate.",
    color: '#8B763A',
  },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="evenements" className="py-24 bg-[#F7EEE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Événements
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pour chaque célébration
          </h2>
          <p className="text-lg text-[#6B4C2A] max-w-2xl mx-auto">
            Seat & Mrahba accompagne tous vos événements avec la même élégance et attention au détail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-md border border-[#ECC49D]/20 hover:shadow-xl transition-all group cursor-default"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all group-hover:scale-110"
                style={{ background: `${event.color}18` }}
              >
                {event.emoji}
              </div>
              <h3
                className="text-xl font-bold text-[#2C1A0E] mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {event.title}
              </h3>
              <p className="text-[#6B4C2A] text-sm leading-relaxed">{event.description}</p>
              <div
                className="mt-6 text-xs font-medium tracking-widest uppercase"
                style={{ color: event.color }}
              >
                En savoir plus →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
