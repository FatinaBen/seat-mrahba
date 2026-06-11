'use client';

import { useRef } from 'react';
import { motion, type Variants, type Easing } from 'framer-motion';

const easeInOut: Easing = 'easeInOut';

const floatAnim = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut },
  },
};

const floatAnim2 = {
  animate: {
    y: [0, 10, 0],
    transition: { duration: 5, repeat: Infinity, ease: easeInOut, delay: 1 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Moroccan zellige-like SVG pattern as data URI
const moroccanPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23C16D2D' fill-opacity='0.04'%3E%3Cpath d='M20 20l-4-4 4-4 4 4zm0-8l-4 4-4-4 4-4zm0 16l-4-4 4-4 4 4zm8-8l-4-4 4-4 4 4zm-16 0l-4-4 4-4 4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, #FBF6F0 0%, #F5EAD8 50%, #F0E4D0 100%)',
        backgroundImage: moroccanPattern,
      }}
    >
      {/* Decorative floating elements */}
      <motion.div
        animate={floatAnim.animate}
        className="absolute top-24 right-12 opacity-20 hidden lg:block"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 5L47 28L70 35L47 42L40 65L33 42L10 35L33 28Z" fill="#C16D2D" />
          <path d="M40 18L44 32L58 36L44 40L40 54L36 40L22 36L36 32Z" fill="#8B763A" opacity="0.5" />
        </svg>
      </motion.div>

      <motion.div
        animate={floatAnim2.animate}
        className="absolute bottom-32 left-8 opacity-15 hidden lg:block"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 4L35.5 22L54 28L35.5 34L30 52L24.5 34L6 28L24.5 22Z" fill="#8B763A" />
        </svg>
      </motion.div>

      <motion.div
        animate={floatAnim.animate}
        className="absolute top-1/2 left-4 opacity-10 hidden xl:block"
        style={{ animationDelay: '2s' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="14" y="2" width="12" height="12" rx="2" transform="rotate(45 20 8)" fill="#C16D2D" />
        </svg>
      </motion.div>

      {/* Decorative large circle top-right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ECC49D, transparent)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #C16D2D, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border border-[#8B763A]/40 text-[#8B763A] bg-[#8B763A]/8">
                <span>✦</span>
                <span>Service Premium</span>
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: '#2C1A0E' }}
            >
              Le QR code qui accueille vos invités avec{' '}
              <span style={{ color: '#8B763A' }}>élégance.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: '#6B4C2A' }}
            >
              Offrez à vos invités une expérience digitale raffinée. Plan de table, programme, menu... tout en un scan.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button
                onClick={() => handleScroll('#contact')}
                className="px-7 py-3.5 rounded-full text-base font-semibold text-white bg-[#C16D2D] hover:bg-[#BC5A2F] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
              >
                Demander un devis
              </button>
              <button
                onClick={() => handleScroll('#demo')}
                className="px-7 py-3.5 rounded-full text-base font-semibold border-2 border-[#C16D2D] text-[#C16D2D] hover:bg-[#C16D2D] hover:text-white transition-all duration-200"
              >
                Voir la démo
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {[
                { value: '500+', label: 'événements' },
                { value: '98%', label: 'satisfaction' },
                { value: '🇲🇦', label: 'Made in Morocco' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[#C5B691]">·</span>}
                  <span className="text-sm font-semibold" style={{ color: '#2C1A0E' }}>
                    {item.value}
                  </span>
                  <span className="text-sm" style={{ color: '#6B4C2A' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' as Easing, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div
                className="absolute inset-0 rounded-[3rem] blur-3xl opacity-30 scale-90"
                style={{ background: 'linear-gradient(135deg, #ECC49D, #C16D2D)' }}
              />

              {/* Phone frame */}
              <div
                className="relative w-64 h-[520px] rounded-[3rem] p-2 shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111] rounded-full z-10" />

                {/* Side buttons */}
                <div className="absolute -left-0.5 top-24 w-1 h-8 bg-[#333] rounded-l-full" />
                <div className="absolute -left-0.5 top-36 w-1 h-12 bg-[#333] rounded-l-full" />
                <div className="absolute -right-0.5 top-28 w-1 h-14 bg-[#333] rounded-r-full" />

                {/* Screen */}
                <div
                  className="w-full h-full rounded-[2.5rem] overflow-hidden"
                  style={{ background: '#FBF6F0' }}
                >
                  {/* Status bar */}
                  <div className="h-8 px-5 flex items-end justify-between pb-1" style={{ background: '#FBF6F0' }}>
                    <span className="text-[9px] font-semibold text-[#2C1A0E]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5 items-end">
                        {[3, 5, 7, 9].map((h, i) => (
                          <div key={i} className="w-0.5 rounded-sm bg-[#2C1A0E]" style={{ height: h }} />
                        ))}
                      </div>
                      <div className="w-4 h-2.5 rounded-sm border border-[#2C1A0E] relative">
                        <div className="absolute left-0.5 top-0.5 bottom-0.5 w-2/3 rounded-sm bg-[#2C1A0E]" />
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="px-4 pb-4 overflow-hidden">
                    {/* Header banner */}
                    <div
                      className="rounded-2xl p-4 mb-3 text-center"
                      style={{ background: 'linear-gradient(135deg, #C16D2D, #BC5A2F)' }}
                    >
                      <div className="text-[8px] text-white/70 mb-0.5 tracking-widest uppercase">Mariage</div>
                      <div className="font-['Playfair_Display'] text-base font-bold text-white leading-tight">
                        Sarah & Yassine
                      </div>
                      <div className="text-[9px] text-white/80 mt-1">15 Juin 2025 · Marrakech</div>
                      <div className="mt-2 flex justify-center">
                        <div className="w-8 h-px bg-white/40" />
                        <span className="mx-2 text-white/60 text-[8px]">✦</span>
                        <div className="w-8 h-px bg-white/40" />
                      </div>
                    </div>

                    {/* Quick access icons */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { icon: '📋', label: 'Programme' },
                        { icon: '🪑', label: 'Table' },
                        { icon: '🍽️', label: 'Menu' },
                        { icon: '📸', label: 'Galerie' },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-1">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm"
                            style={{ background: '#FFF5EC', border: '1px solid #ECC49D' }}
                          >
                            {item.icon}
                          </div>
                          <span className="text-[8px] text-[#6B4C2A] font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Info card */}
                    <div
                      className="rounded-xl p-3 mb-2"
                      style={{ background: '#FFF5EC', border: '1px solid #ECC49D' }}
                    >
                      <div className="text-[9px] font-semibold text-[#8B763A] mb-1.5 uppercase tracking-wider">Votre table</div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: '#C16D2D' }}
                        >
                          7
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-[#2C1A0E]">Table des Amis</div>
                          <div className="text-[8px] text-[#6B4C2A]">Salle principale · Place A3</div>
                        </div>
                      </div>
                    </div>

                    {/* Next event */}
                    <div className="rounded-xl p-3" style={{ background: '#F5EAD8' }}>
                      <div className="text-[9px] font-semibold text-[#8B763A] mb-1 uppercase tracking-wider">Prochain moment</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">💍</div>
                        <div>
                          <div className="text-[10px] font-semibold text-[#2C1A0E]">Cérémonie</div>
                          <div className="text-[8px] text-[#6B4C2A]">16h00 · Palais Bahia</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
                className="absolute -right-8 top-16 bg-white rounded-2xl shadow-xl p-3 border border-[#ECC49D]/40"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#8B763A]/10 flex items-center justify-center text-base">✦</div>
                  <div>
                    <div className="text-[10px] font-bold text-[#2C1A0E]">1 scan</div>
                    <div className="text-[9px] text-[#6B4C2A]">Tout en accès</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: easeInOut, delay: 0.5 }}
                className="absolute -left-10 bottom-24 bg-white rounded-2xl shadow-xl p-3 border border-[#ECC49D]/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <div>
                    <div className="text-[10px] font-bold text-[#2C1A0E]">98% satisfaction</div>
                    <div className="text-[9px] text-[#6B4C2A]">des invités</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#FBF6F0" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
