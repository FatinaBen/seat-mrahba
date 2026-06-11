'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

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
    quote: "J'ai organisé l'EVJF de ma meilleure amie avec Seat & Mrahba. Le QR code sur les invitations a fait l'effet d'une bombe — elles étaient toutes sur la page dès réception. Service impeccable !",
    name: 'Sophie R.',
    event: 'EVJF',
    city: 'Paris',
    initials: 'SR',
    color: '#BC5A2F',
  },
  {
    quote: "Un baby shower comme dans les magazines. Chaque invitée avait le programme sur son téléphone, la liste des cadeaux, les infos sur le lieu... C'était parfait et tellement pratique.",
    name: 'Fatima O.',
    event: 'Baby Shower',
    city: 'Rabat',
    initials: 'FO',
    color: '#D59667',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="temoignages" className="py-24 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Témoignages
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ils nous font confiance
          </h2>
          <p className="text-lg text-[#6B4C2A] max-w-2xl mx-auto">
            Des centaines d&apos;événements, des milliers d&apos;invités comblés. Voici quelques mots de nos clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-md border border-[#ECC49D]/20 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#D59667] text-[#D59667]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#2C1A0E] leading-relaxed italic text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#2C1A0E] text-sm">{t.name}</p>
                  <p className="text-[#8B763A] text-xs">
                    {t.event} · {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center bg-[#2C1A0E] rounded-3xl p-10"
        >
          {[
            { value: '500+', label: 'Événements créés' },
            { value: '98%', label: 'Clients satisfaits' },
            { value: '10k+', label: 'Invités touchés' },
          ].map((stat, i) => (
            <div key={i}>
              <p
                className="text-4xl font-bold text-[#D59667] mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {stat.value}
              </p>
              <p className="text-[#C5B691] text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
