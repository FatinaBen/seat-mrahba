'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Essentiel',
    price: '149€',
    priceSub: 'à partir de',
    description: 'Une expérience simple et élégante',
    features: [
      'QR code personnalisé',
      'Plan de table interactif',
      'Page web dédiée',
      'Accès illimité le jour J',
      'Support par email',
    ],
    cta: 'Demander un devis',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '249€',
    priceSub: 'à partir de',
    description: "L'expérience complète",
    badge: 'Le plus choisi',
    features: [
      'Tout Essentiel inclus',
      'Programme de la journée',
      'Menu personnalisé',
      'Informations pratiques',
      'Galerie photos',
      'Carte & localisation',
      'Support prioritaire',
    ],
    cta: 'Demander un devis',
    highlighted: true,
  },
  {
    name: 'Signature',
    price: 'Sur devis',
    priceSub: 'formule',
    description: 'Entièrement sur mesure',
    features: [
      'Tout Premium inclus',
      'Design entièrement personnalisé',
      'Animations & effets visuels',
      'Messages par table',
      'QR codes multiples',
      'Modifications illimitées',
      'Accompagnement dédié',
    ],
    cta: 'Nous contacter',
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="offres" className="py-28 md:py-36" style={{ background: '#F8F4EF' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

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
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-bold text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Choisissez votre formule
          </h2>
          <p className="text-base text-[#9B7A56] max-w-sm mx-auto leading-relaxed">
            Des formules pensées pour chaque événement et chaque vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl flex flex-col ${
                plan.highlighted
                  ? 'shadow-2xl'
                  : 'bg-white shadow-sm hover:shadow-md transition-shadow'
              }`}
              style={plan.highlighted
                ? { background: 'linear-gradient(150deg, #B85C28, #9A4E1E)' }
                : { border: '1px solid rgba(232,196,154,0.2)' }
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
                    className={`text-xl font-semibold mb-1.5 ${plan.highlighted ? 'text-white' : 'text-[#1A0F08]'}`}
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-[13px] ${plan.highlighted ? 'text-white/65' : 'text-[#9B7A56]'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className={`mb-6 pb-6 border-b ${plan.highlighted ? 'border-white/15' : 'border-[#E8C49A]/40'}`}>
                  <p className={`text-[10px] uppercase tracking-wider mb-1 ${plan.highlighted ? 'text-white/50' : 'text-[#8A7235]'}`}>
                    {plan.priceSub}
                  </p>
                  <p
                    className={`text-3xl font-bold leading-none ${plan.highlighted ? 'text-white' : 'text-[#B85C28]'}`}
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {plan.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-4 h-4 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center ${
                        plan.highlighted ? 'bg-white/15' : 'bg-[#8A7235]/10'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-[#8A7235]'}`} strokeWidth={2.5} />
                      </div>
                      <span className={`text-[13.5px] leading-snug ${plan.highlighted ? 'text-white/85' : 'text-[#5A3C1E]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto block text-center py-3.5 px-6 rounded-full text-[13.5px] font-medium transition-all active:scale-[0.97] ${
                    plan.highlighted
                      ? 'bg-white text-[#B85C28] hover:bg-[#F8F4EF]'
                      : 'text-white hover:opacity-90'
                  }`}
                  style={!plan.highlighted ? { background: '#B85C28' } : {}}
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-[12px] text-[#9B7A56] mt-10"
        >
          ✦ Devis gratuit & sans engagement · Réponse sous 24h
        </motion.p>

      </div>
    </section>
  );
}
