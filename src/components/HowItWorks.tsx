'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Palette, QrCode } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Send,
    title: 'Partagez vos informations',
    description:
      'Transmettez-nous les détails de votre événement : noms, date, lieu, programme, plan de table, menu et tous les messages personnalisés.',
    color: '#C16D2D',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Nous créons votre espace',
    description:
      'Notre équipe conçoit une page web personnalisée et élégante, aux couleurs de votre événement. Validez et ajustez selon vos envies.',
    color: '#8B763A',
  },
  {
    number: '03',
    icon: QrCode,
    title: 'Vos invités scannent',
    description:
      "Placez votre QR code sur les faire-parts, les tables ou à l'entrée. En un scan, vos invités accèdent à toutes les informations.",
    color: '#BC5A2F',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="comment-ca-marche" className="py-24 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Processus
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg text-[#6B4C2A] max-w-2xl mx-auto">
            Simple, élégant, efficace. En trois étapes, votre expérience digitale est prête.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-16 left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-[#C16D2D] via-[#ECC49D] to-[#BC5A2F] z-0" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-8 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-white mb-1" />
                    <span className="text-white/80 text-xs font-light tracking-widest">
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#2C1A0E] mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6B4C2A] leading-relaxed text-sm max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-block bg-[#C16D2D] text-white px-8 py-4 rounded-full font-medium hover:bg-[#BC5A2F] transition-colors shadow-lg"
          >
            Commencer maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
