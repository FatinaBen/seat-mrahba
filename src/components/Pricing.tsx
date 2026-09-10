'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Palette, UtensilsCrossed, CalendarDays, Layers, Printer, Sparkles } from 'lucide-react';

const included = [
  'Mini-site personnalisé pour votre événement',
  "Page d'accueil personnalisée",
  'Plan de table digital',
  "QR code de l'événement",
  'Support QR imprimé standard',
  'Mise en ligne du site',
  'Accompagnement Seat & Mrahba',
];

const extras = [
  {
    icon: Palette,
    title: 'Personnalisation graphique avancée',
    desc: "Un design plus poussé de l'univers visuel de votre événement — page d'accueil et éléments graphiques sur mesure.",
  },
  {
    icon: UtensilsCrossed,
    title: 'Menu digital',
    desc: 'Création et intégration d’un menu personnalisé dans votre mini-site.',
  },
  {
    icon: CalendarDays,
    title: 'Programme de la soirée',
    desc: 'Création et intégration du programme de votre événement.',
  },
  {
    icon: Layers,
    title: 'Menu & Programme',
    desc: 'La possibilité de combiner les deux, pour une expérience complète.',
  },
  {
    icon: Printer,
    title: 'Personnalisation des supports QR',
    desc: "Le support imprimé à l'image de votre mariage : design sur mesure et impression selon vos besoins.",
  },
  {
    icon: Sparkles,
    title: 'Demande personnalisée',
    desc: 'Une envie particulière ? Parlons-en.',
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
              Simple, élégante, complète
            </h2>
            <p className="text-base text-[#9B7A56] max-w-md mx-auto leading-relaxed">
              Une formule à 690 DH pour tout l&apos;essentiel de votre plan de table digital.
              Vous ajoutez ensuite uniquement ce qui vous ressemble, avec Mrahba+.
            </p>
          </motion.div>

          {/* Formule Mrahba — offre unique */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl max-w-xl mx-auto"
            style={{ background: 'linear-gradient(150deg, #B85C28, #9A4E1E)', boxShadow: '0 20px 60px rgba(184,92,40,0.3)' }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8A7235] text-white text-[10px] font-medium px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
              L&apos;offre complète
            </div>

            <div className="p-8 sm:p-10 flex flex-col">
              <h3
                className="mb-1"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '1.6rem', color: 'white' }}
              >
                Formule Mrahba
              </h3>

              <div className="mb-7 pb-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <p
                  className="text-4xl sm:text-5xl leading-none mt-3 mb-3"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, color: 'white' }}
                >
                  690 DH
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Tout ce qu&apos;il faut pour offrir à vos invités une expérience simple, élégante et personnalisée.
                </p>
                <p className="text-[11.5px] mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Prix unique, quel que soit le nombre d&apos;invités.
                </p>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
                {included.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center py-3.5 px-6 rounded-full text-[13.5px] font-medium transition-all active:scale-[0.97]"
                style={{ background: 'white', color: '#B85C28' }}
              >
                Demander un devis
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-[12px] text-[#9B7A56] mt-10 mb-24"
          >
            ✦ Devis gratuit & sans engagement · Réponse sous 24h
          </motion.p>

          {/* Mrahba+ — prestations à ajouter selon les envies */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-7 sm:p-10"
            style={{ background: '#FBF5EC', border: '1px solid rgba(232,196,154,0.4)' }}
          >
            <div className="text-center mb-10">
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#B85C28] mb-4">
                Mrahba+
              </p>
              <h3
                className="text-[1.7rem] sm:text-3xl text-[#1A0F08] mb-4 leading-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
              >
                Personnalisez votre expérience
              </h3>
              <p className="text-[14.5px] text-[#9B7A56] max-w-lg mx-auto leading-relaxed">
                La Formule Mrahba est votre base, complète et prête à l&apos;emploi. Vous pouvez ensuite
                la faire évoluer, selon vos envies, avec les prestations suivantes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-9">
              {extras.map((extra, i) => {
                const Icon = extra.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ background: 'white', border: '1px solid rgba(232,196,154,0.35)' }}
                  >
                    <div className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(138,114,53,0.1)' }}>
                      <Icon className="w-4 h-4 text-[#8A7235]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#1A0F08] mb-1">{extra.title}</p>
                      <p className="text-[13px] leading-snug text-[#9B7A56]">{extra.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-[13px] text-[#8A7235] mb-5">
                Tarif sur devis, selon vos envies et les besoins de votre événement.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3.5 rounded-full text-[13.5px] font-medium text-white bg-[#B85C28] hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Demander un devis
              </a>
            </div>
          </motion.div>
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
