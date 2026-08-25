'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    key: 'essentiel',
    name: 'Essentielle',
    price: '149€',
    priceSub: 'à partir de',
    description: 'Une expérience simple et élégante',
    features: [
      'QR code personnalisé',
      'Page web personnalisée',
      'Plan de table interactif',
    ],
    cta: 'Demander un devis',
    highlighted: false,
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '249€',
    priceSub: 'à partir de',
    description: 'Design entièrement personnalisé, expérience immersive',
    badge: 'Le plus choisi',
    features: [
      'Tout ce qu\'il y a dans l\'Essentielle',
      'Menu personnalisé',
      'Programme personnalisé (optionnel)',
      'Galerie photo partagée',
    ],
    cta: 'Demander un devis',
    highlighted: true,
  },
];

const supports = [
  { name: 'Plexiglas', desc: 'Élégant & moderne' },
  { name: 'Bois', desc: 'Chaleureux & naturel' },
  { name: 'Acrylique', desc: 'Raffiné & léger' },
  { name: 'Métal', desc: 'Luxueux & durable' },
  { name: 'Sur mesure', desc: 'Selon vos souhaits' },
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

export default function Pricing() {
  const ref = useRef(null);
  const refSupports = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isSupportsInView = useInView(refSupports, { once: true, margin: '-80px' });

  return (
    <>
      {/* Formules */}
      <section id="offres" className="py-28 md:py-36" style={{ background: `${GRAIN}, #F8F4EF` }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
              Nos offres
            </p>
            <h2
              className="text-[2.2rem] sm:text-4xl md:text-5xl text-[#1A0F08] mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
            >
              Choisissez votre formule
            </h2>
            <p className="text-base text-[#9B7A56] max-w-sm mx-auto leading-relaxed">
              Deux formules pensées pour chaque événement et chaque vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                className="relative rounded-2xl flex flex-col"
                style={plan.highlighted
                  ? { background: 'linear-gradient(150deg, #B85C28, #9A4E1E)', boxShadow: '0 20px 60px rgba(184,92,40,0.3)' }
                  : { background: 'white', border: '1px solid rgba(232,196,154,0.25)', boxShadow: '0 2px 16px rgba(184,92,40,0.06)' }
                }
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8A7235] text-white text-[10px] font-medium px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3
                      className="mb-1.5"
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontWeight: 400,
                        fontSize: '1.3rem',
                        color: plan.highlighted ? 'white' : '#1A0F08',
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-[13px]" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.65)' : '#9B7A56' }}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${plan.highlighted ? 'rgba(255,255,255,0.15)' : 'rgba(232,196,154,0.4)'}` }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.5)' : '#8A7235' }}>
                      {plan.priceSub}
                    </p>
                    <p
                      className="text-3xl leading-none"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, color: plan.highlighted ? 'white' : '#B85C28' }}
                    >
                      {plan.price}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-4 h-4 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center"
                          style={{ background: plan.highlighted ? 'rgba(255,255,255,0.15)' : 'rgba(138,114,53,0.1)' }}>
                          <Check className="w-2.5 h-2.5" style={{ color: plan.highlighted ? 'white' : '#8A7235' }} strokeWidth={2.5} />
                        </div>
                        <span className="text-[13.5px] leading-snug" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.85)' : '#5A3C1E' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-auto block text-center py-3.5 px-6 rounded-full text-[13.5px] font-medium transition-all active:scale-[0.97]"
                    style={plan.highlighted
                      ? { background: 'white', color: '#B85C28' }
                      : { background: '#B85C28', color: 'white' }
                    }
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-[12px] text-[#9B7A56] mt-10"
          >
            ✦ Devis gratuit & sans engagement · Réponse sous 24h
          </motion.p>
        </div>
      </section>

      {/* Supports QR Code */}
      <section
        id="supports"
        className="py-28 md:py-36 relative overflow-hidden"
        style={{ background: '#1A0F08' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #E8C49A 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            ref={refSupports}
            initial={{ opacity: 0, y: 28 }}
            animate={isSupportsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#CF9068] mb-6">
              Option transversale
            </p>
            <h2
              className="text-[2.2rem] sm:text-4xl md:text-5xl text-white mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
            >
              Supports QR Code{' '}
              <em className="not-italic italic text-[#E8C49A]">personnalisés</em>
            </h2>
            <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Disponible avec les deux formules. Le support physique de votre QR code, gravé sur mesure dans le matériau de votre choix. Tarif sur devis.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {supports.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isSupportsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl p-5 text-center"
                style={{ background: 'rgba(232,196,154,0.06)', border: '1px solid rgba(232,196,154,0.12)' }}
              >
                <p
                  className="text-base mb-1.5"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, color: '#E8C49A' }}
                >
                  {s.name}
                </p>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isSupportsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-center"
          >
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 rounded-full text-[13px] font-medium text-[#1A0F08] bg-[#E8C49A] hover:bg-white active:scale-[0.97] transition-all"
            >
              Demander un devis pour le support →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
