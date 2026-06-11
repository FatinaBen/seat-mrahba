'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Essentiel',
    price: 'À partir de 149€',
    description: 'Parfait pour une expérience simple et élégante',
    features: [
      'QR code personnalisé',
      'Plan de table interactif',
      'Page web dédiée à votre événement',
      'Accès illimité le jour J',
      'Support par email',
    ],
    cta: 'Demander un devis',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'À partir de 249€',
    description: "L'expérience complète pour un événement inoubliable",
    badge: 'Plus populaire',
    features: [
      'Tout ce qui est inclus dans Essentiel',
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
    description: 'Une expérience entièrement sur mesure, sans compromis',
    features: [
      'Tout ce qui est inclus dans Premium',
      'Design entièrement personnalisé',
      'Animations & effets spéciaux',
      'Intégration musique de fond',
      'Messages personnalisés par table',
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
  const isInView = useInView(ref, { once: true });

  return (
    <section id="offres" className="py-24 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Nos offres
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Choisissez votre formule
          </h2>
          <p className="text-lg text-[#6B4C2A] max-w-2xl mx-auto">
            Des formules pensées pour chaque événement, chaque budget, chaque vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#C16D2D] to-[#BC5A2F] text-white shadow-2xl'
                  : 'bg-white shadow-lg border border-[#ECC49D]/30'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B763A] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#2C1A0E]'}`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white/80' : 'text-[#6B4C2A]'}`}>
                  {plan.description}
                </p>
                <p
                  className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#C16D2D]'}`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {plan.price}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-white' : 'text-[#8B763A]'
                      }`}
                    />
                    <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-[#6B4C2A]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 px-6 rounded-full font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-white text-[#C16D2D] hover:bg-[#FBF6F0]'
                    : 'bg-[#C16D2D] text-white hover:bg-[#BC5A2F]'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
