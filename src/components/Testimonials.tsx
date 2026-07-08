'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Seat & Mrahba a transformé notre mariage. Nos invités ont été bluffés par le QR code — ils ont trouvé toutes les informations en quelques secondes. C'était raffiné, moderne et tellement nous.",
    name: 'Nadia B.',
    event: 'Mariage',
    city: 'Casablanca',
    initials: 'NB',
    color: '#C16D2D',
  },
  {
    quote: "Pour nos fiançailles à Marrakech, nous voulions quelque chose d'unique. Seat & Mrahba nous a livré une page magnifique en 48h. Nos familles ont adoré. Le plan de table digital a évité tellement de questions !",
    name: 'Leila & Karim M.',
    event: 'Fiançailles',
    city: 'Marrakech',
    initials: 'LK',
    color: '#8B763A',
  },
  {
    quote: "J'ai organisé l'EVJF de ma meilleure amie avec Seat & Mrahba. Le QR code sur les invitations a fait l'effet d'une bombe. Service impeccable, délai tenu, résultat bluffant !",
    name: 'Sophie R.',
    event: 'EVJF',
    city: 'Paris',
    initials: 'SR',
    color: '#BC5A2F',
  },
  {
    quote: "Un baby shower comme dans les magazines. Chaque invitée avait le programme sur son téléphone, la liste des cadeaux, les infos pratiques... C'était parfait et tellement pratique.",
    name: 'Fatima O.',
    event: 'Baby Shower',
    city: 'Rabat',
    initials: 'FO',
    color: '#D59667',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="temoignages" className="py-24 md:py-32 bg-[#FBF6F0]">
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
            <span>✦</span> Témoignages <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ils nous font confiance
          </h2>
          <p className="text-[17px] text-[#6B4C2A] max-w-xl mx-auto leading-relaxed">
            Des centaines d&apos;événements, des milliers d&apos;invités comblés.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white rounded-3xl p-7 lg:p-8 shadow-md border border-[#ECC49D]/25 flex flex-col gap-5 hover:shadow-lg transition-shadow"
            >
              {/* Top row: stars + quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-[14px] h-[14px] fill-[#D59667] text-[#D59667]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#ECC49D]" />
              </div>

              {/* Quote */}
              <p className="text-[#2C1A0E] leading-[1.75] text-[15px] flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#ECC49D]/30">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#2C1A0E] text-[14px] leading-tight">{t.name}</p>
                  <p className="text-[#8B763A] text-xs mt-0.5">{t.event} · {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #2C1A0E, #3D2510)' }}
        >
          <div className="px-8 py-10 md:py-12 grid grid-cols-3 gap-4 md:gap-8 text-center">
            {[
              { value: '500+', label: 'Événements créés' },
              { value: '98%', label: 'Clients satisfaits' },
              { value: '10k+', label: 'Invités touchés' },
            ].map((stat, i) => (
              <div key={i} className={i > 0 ? 'border-l border-white/10 pl-4 md:pl-8' : ''}>
                <p
                  className="text-3xl md:text-4xl font-bold text-[#ECC49D] mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-[#C5B691] text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Post-testimonial CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#C16D2D] text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-[#BC5A2F] active:scale-[0.97] transition-all shadow-lg hover:shadow-xl"
          >
            Rejoignez-les — Demander un devis →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
