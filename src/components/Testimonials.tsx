'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Palette, HeadphonesIcon } from 'lucide-react';

const engagements = [
  {
    icon: Clock,
    title: 'Livraison en 48h',
    description: 'Une fois vos informations reçues, votre page est conçue et livrée en 48 heures ouvrées. Service express disponible sur demande.',
  },
  {
    icon: Palette,
    title: 'Personnalisation totale',
    description: 'Couleurs, typographies, contenus, messages personnalisés par table — votre page reflète l\'identité unique de votre événement.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Accompagnement dédié',
    description: 'De la prise en charge à votre grand jour, notre équipe reste disponible. Modifications, ajustements, urgences — nous sommes là.',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="engagements" className="py-28 md:py-36" style={{ background: '#FFFFFF' }}>
      {/* Top rule */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Nos engagements
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Ce que nous vous promettons
          </h2>
          <p className="text-base text-[#9B7A56] max-w-md mx-auto leading-relaxed">
            Trois engagements concrets, sans compromis, pour chaque événement que nous accompagnons.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {engagements.map((e, i) => {
            const Icon = e.icon;
            const nums = ['01', '02', '03'];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                className="group relative p-8 rounded-2xl transition-all duration-300"
                style={{
                  border: '1px solid rgba(232,196,154,0.2)',
                  boxShadow: '0 2px 24px rgba(184,92,40,0.05)',
                  background: i === 1 ? '#FAFAF8' : 'white',
                }}
              >
                <span className="absolute top-6 right-7 font-mono"
                  style={{ fontSize: 11, color: 'rgba(138,114,53,0.3)', letterSpacing: '0.05em' }}>
                  {nums[i]}
                </span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ background: i === 1 ? 'rgba(184,92,40,0.1)' : 'rgba(138,114,53,0.08)' }}
                >
                  <Icon size={19} color={i === 1 ? '#B85C28' : '#8A7235'} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-[#1A0F08] mb-3"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '1.05rem' }}
                >
                  {e.title}
                </h3>
                <p className="text-[13.5px] text-[#9B7A56] leading-relaxed">
                  {e.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full text-[13px] font-medium text-white transition-all active:scale-[0.97]"
            style={{ background: '#B85C28', boxShadow: '0 4px 20px rgba(184,92,40,0.25)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#A0501F')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#B85C28')}
          >
            Demander un devis gratuit →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
