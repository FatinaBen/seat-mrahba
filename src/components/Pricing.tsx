'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
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
    name: 'Premium',
    price: '249€',
    priceSub: 'à partir de',
    description: 'Design entièrement personnalisé, expérience immersive',
    badge: 'Le plus choisi',
    features: [
      "Tout ce qu'il y a dans l'Essentielle",
      'Menu personnalisé',
      'Programme personnalisé (optionnel)',
      'Galerie photo partagée',
    ],
    cta: 'Demander un devis',
    highlighted: true,
  },
];

const supports = [
  {
    name: 'Miroir gravé',
    desc: 'Élégant & raffiné',
    detail: 'Encadrement doré, gravure vinyle',
    img: '/supports/miroir.jpg',
  },
  {
    name: 'Chevalet papier',
    desc: 'Intemporel & romantique',
    detail: 'Impression haute qualité sur chevalet bois',
    img: '/supports/chevalet.jpg',
  },
  {
    name: 'Totem tissu',
    desc: 'Grand format & impactant',
    detail: 'Impression textile, structure légère',
    img: '/supports/banner.jpg',
  },
  {
    name: 'Panneau acrylique',
    desc: 'Moderne & luxueux',
    detail: 'Acrylique blanc, finition premium',
    img: '/supports/engagement.jpg',
  },
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

function SupportCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % supports.length), 4000);
    return () => clearInterval(id);
  }, []);

  const s = supports[current];

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      {/* Main photo card */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: 420 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Photo */}
            <img
              src={s.img}
              alt={s.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for legibility */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,5,2,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white text-[19px] leading-tight mb-1"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>
                {s.name}
              </p>
              <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={() => setCurrent((c) => (c - 1 + supports.length) % supports.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <span className="text-white text-sm">‹</span>
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % supports.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <span className="text-white text-sm">›</span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {supports.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? '#E8C49A' : 'rgba(232,196,154,0.25)',
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-4 justify-center">
        {supports.map((s2, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
            style={{
              width: 64, height: 52,
              outline: i === current ? '2px solid #E8C49A' : '2px solid transparent',
              outlineOffset: 2,
              opacity: i === current ? 1 : 0.55,
            }}
          >
            <img src={s2.img} alt={s2.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

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

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <motion.div
              ref={refSupports}
              initial={{ opacity: 0, y: 28 }}
              animate={isSupportsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#CF9068] mb-6">
                Option transversale
              </p>
              <h2
                className="text-[2.2rem] sm:text-4xl text-white mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em', color: 'white' }}
              >
                Supports QR Code{' '}
                <em className="not-italic italic" style={{ color: '#E8C49A' }}>personnalisés</em>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Disponible avec les deux formules. Le support physique de votre QR code, gravé sur mesure dans le matériau de votre choix.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  { name: 'Miroir gravé', desc: 'Encadrement doré, gravure vinyle — élégant & raffiné' },
                  { name: 'Chevalet papier', desc: 'Impression haute qualité sur chevalet bois' },
                  { name: 'Totem tissu', desc: 'Grand format, structure légère — fort impact visuel' },
                  { name: 'Panneau acrylique', desc: 'Finition premium, blanc ou transparent' },
                  { name: 'Sur mesure', desc: 'Tout autre support selon vos souhaits, sur devis' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isSupportsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#E8C49A] text-[10px] mt-1">✦</span>
                    <div>
                      <span className="text-white text-[14px] font-medium">{item.name}</span>
                      <span className="text-[13px] ml-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isSupportsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-[12px] mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Tarif sur devis · facturé séparément
                </p>
                <a
                  href="#contact"
                  className="inline-block px-8 py-3.5 rounded-full text-[13px] font-medium text-[#1A0F08] bg-[#E8C49A] hover:bg-white active:scale-[0.97] transition-all"
                >
                  Demander un devis pour le support →
                </a>
              </motion.div>
            </motion.div>

            {/* Right: carousel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={isSupportsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <SupportCarousel />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
