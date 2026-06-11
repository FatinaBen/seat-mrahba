'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Zap, Settings, MousePointer, Users } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Élégance sans compromis',
    description: 'Chaque page est conçue avec soin, en harmonie avec l\'esthétique de votre événement. Un rendu premium qui impressionne dès le premier regard.',
    color: '#8B763A',
  },
  {
    icon: Zap,
    title: 'Modernité & innovation',
    description: 'Nous utilisons les dernières technologies web pour offrir une expérience rapide, fluide et visuellement captivante sur tous les appareils.',
    color: '#C16D2D',
  },
  {
    icon: Settings,
    title: 'Personnalisation totale',
    description: 'Couleurs, typographies, contenus, messages... Tout est adapté à votre vision. Votre page, votre identité.',
    color: '#BC5A2F',
  },
  {
    icon: MousePointer,
    title: 'Simplicité pour vos invités',
    description: 'Un simple scan suffit. Pas d\'application à installer, pas de compte à créer. L\'accès est immédiat, intuitif et universel.',
    color: '#8B763A',
  },
  {
    icon: Users,
    title: 'Expérience invité sublimée',
    description: 'Vos invités méritent le meilleur. Avec Seat & Mrahba, ils se sentent attendus, guidés et choyés — avant même d\'entrer dans la salle.',
    color: '#C16D2D',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="pourquoi" className="py-24 bg-[#2C1A0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#D59667] mb-4">
            ✦ Notre différence
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pourquoi choisir Seat & Mrahba ?
          </h2>
          <p className="text-lg text-[#C5B691] max-w-2xl mx-auto">
            Parce que les grands moments méritent une attention aux détails que vous ne trouverez nulle part ailleurs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#D59667]/30 transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: `${reason.color}30` }}
                >
                  <Icon className="w-7 h-7" style={{ color: reason.color }} />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {reason.title}
                </h3>
                <p className="text-[#C5B691] text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}

          {/* Decorative last card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-[#C16D2D] to-[#8B763A] rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-white/80 text-4xl mb-4">✦</p>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Prêt à sublimer votre événement ?
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Rejoignez les centaines de couples et familles qui ont fait confiance à Seat & Mrahba.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-6 block text-center bg-white text-[#C16D2D] py-3 px-6 rounded-full font-medium hover:bg-[#FBF6F0] transition-colors"
            >
              Commencer →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
