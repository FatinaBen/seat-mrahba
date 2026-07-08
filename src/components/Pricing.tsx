'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Essentiel',
    price: '149€',
    priceSub: 'à partir de',
    description: 'Parfait pour une expérience simple et élégante',
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
    description: "L'expérience complète pour un événement inoubliable",
    badge: 'Plus populaire',
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
    description: 'Une expérience entièrement sur mesure, sans compromis',
    features: [
      'Tout Premium inclus',
      'Design entièrement personnalisé',
      'Animations & effets visuels',
      'Intégration musique de fond',
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
    <section id="offres" className="py-24 md:py-32 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> Nos offres <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Choisissez votre formule
          </h2>
          <p className="text-[17px] text-[#6B4C2A] max-w-xl mx-auto leading-relaxed">
            Des formules pensées pour chaque événement, chaque budget, chaque vision.
          </p>
        </motion.div>

        {/* Cards grid – items-stretch ensures equal height */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.14 }}
              whileHover={{ y: plan.highlighted ? 0 : -6 }}
              className={`relative rounded-3xl flex flex-col ${
                plan.highlighted
                  ? 'shadow-2xl'
                  : 'bg-white shadow-md border border-[#ECC49D]/30 hover:shadow-xl transition-shadow'
              }`}
              style={plan.highlighted ? {
                background: 'linear-gradient(145deg, #C16D2D, #A85A22)',
              } : {}}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-[#8B763A] text-white text-[11px] font-bold px-4 py-1 rounded-full tracking-widest uppercase shadow-md whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 lg:p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold mb-1.5 ${plan.highlighted ? 'text-white' : 'text-[#2C1A0E]'}`}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-white/75' : 'text-[#6B4C2A]'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className={`mb-6 pb-6 border-b ${plan.highlighted ? 'border-white/20' : 'border-[#ECC49D]/40'}`}>
                  <p className={`text-[11px] uppercase tracking-wider mb-1 ${plan.highlighted ? 'text-white/60' : 'text-[#8B763A]'}`}>
                    {plan.priceSub}
                  </p>
                  <p
                    className={`text-4xl font-bold leading-none ${plan.highlighted ? 'text-white' : 'text-[#C16D2D]'}`}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {plan.price}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-4 h-4 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center ${
                        plan.highlighted ? 'bg-white/20' : 'bg-[#8B763A]/12'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-[#8B763A]'}`} strokeWidth={2.5} />
                      </div>
                      <span className={`text-[14px] leading-snug ${plan.highlighted ? 'text-white/90' : 'text-[#6B4C2A]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`mt-auto block text-center py-4 px-6 rounded-full text-[14.5px] font-semibold transition-all active:scale-[0.97] ${
                    plan.highlighted
                      ? 'bg-white text-[#C16D2D] hover:bg-[#FBF6F0] shadow-lg'
                      : 'bg-[#C16D2D] text-white hover:bg-[#BC5A2F] shadow-md hover:shadow-lg'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-[#8B763A] mt-10"
        >
          ✦ Devis gratuit & sans engagement · Réponse sous 24h
        </motion.p>
      </div>
    </section>
  );
}
