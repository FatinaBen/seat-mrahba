'use client';

import { motion, type Variants, type Easing } from 'framer-motion';

const easeInOut: Easing = 'easeInOut';
const easeOut: Easing = 'easeOut';

const floatA = { animate: { y: [0, -14, 0], transition: { duration: 4, repeat: Infinity, ease: easeInOut } } };
const floatB = { animate: { y: [0, 10, 0], transition: { duration: 5.5, repeat: Infinity, ease: easeInOut, delay: 1.2 } } };

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const item: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } };

/* Zellige pattern – very subtle, placed over the gradient via a pseudo-layer */
const patternUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23C16D2D' fill-opacity='0.035'%3E%3Cpath d='M24 24l-5-5 5-5 5 5zm0-10l-5 5-5-5 5-5zm0 20l-5-5 5-5 5 5zm10-10l-5-5 5-5 5 5zm-20 0l-5-5 5-5 5 5z'/%3E%3C/g%3E%3C/svg%3E`;

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[68px] md:pt-[80px]"
    >
      {/* Layered background: gradient base + zellige pattern on top */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(145deg, #FBF6F0 0%, #F5EAD8 55%, #EFE2CC 100%)' }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-100"
        style={{ backgroundImage: `url("${patternUri}")` }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ECC49D 0%, transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C16D2D 0%, transparent 70%)' }} />

      {/* Floating ornaments – hidden on mobile to prevent overflow */}
      <motion.div animate={floatA.animate} className="absolute top-28 right-16 opacity-[0.18] hidden lg:block pointer-events-none">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M36 4L42 26L64 32L42 38L36 60L30 38L8 32L30 26Z" fill="#C16D2D" />
          <path d="M36 16L40 29L53 33L40 37L36 50L32 37L19 33L32 29Z" fill="#8B763A" opacity="0.5" />
        </svg>
      </motion.div>
      <motion.div animate={floatB.animate} className="absolute bottom-36 left-10 opacity-[0.14] hidden lg:block pointer-events-none">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d="M26 3L31 19L47 25L31 31L26 47L21 31L5 25L21 19Z" fill="#8B763A" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#8B763A]/35 text-[#8B763A] bg-[#8B763A]/[0.07] tracking-wider uppercase">
                ✦ Service Premium · Made in Morocco 🇲🇦
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.12] tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2C1A0E' }}
            >
              Le QR code qui{' '}
              <span className="italic" style={{ color: '#8B763A' }}>accueille</span>{' '}
              vos invités avec élégance.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-[17px] leading-[1.75] max-w-[520px]"
              style={{ color: '#6B4C2A' }}
            >
              Offrez à vos invités une expérience digitale raffinée. Plan de table, programme, menu, galerie — tout en un seul scan.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="px-7 py-4 rounded-full text-[15px] font-semibold text-white bg-[#C16D2D] hover:bg-[#BC5A2F] active:scale-[0.97] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Demander un devis gratuit
              </button>
              <button
                onClick={() => scrollTo('#demo')}
                className="px-7 py-4 rounded-full text-[15px] font-semibold border-[1.5px] border-[#C16D2D] text-[#C16D2D] hover:bg-[#C16D2D] hover:text-white active:scale-[0.97] transition-all duration-200"
              >
                Voir la démo →
              </button>
            </motion.div>

            {/* Social proof bar */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-5 pt-1">
              {[
                { value: '500+', label: 'événements créés' },
                { value: '98%', label: 'clients satisfaits' },
                { value: '48h', label: 'délai de livraison' },
              ].map((s, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  {i > 0 && <span className="text-[#C5B691] text-sm mr-3">·</span>}
                  <span className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#C16D2D' }}>{s.value}</span>
                  <span className="text-sm" style={{ color: '#6B4C2A' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-[3rem] blur-3xl opacity-25 scale-[0.88] pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #ECC49D, #C16D2D)' }}
              />

              {/* Phone frame */}
              <div
                className="relative w-[248px] sm:w-[264px] h-[504px] sm:h-[528px] rounded-[2.8rem] p-[7px]"
                style={{
                  background: 'linear-gradient(160deg, #1e1e1e, #2c2c2c)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Pill notch */}
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[88px] h-[22px] bg-[#111] rounded-full z-10" />
                {/* Side buttons */}
                <div className="absolute -left-[3px] top-[90px] w-[3px] h-7 bg-[#2e2e2e] rounded-l-full" />
                <div className="absolute -left-[3px] top-[130px] w-[3px] h-10 bg-[#2e2e2e] rounded-l-full" />
                <div className="absolute -right-[3px] top-[108px] w-[3px] h-12 bg-[#2e2e2e] rounded-r-full" />

                {/* Screen */}
                <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-[#FBF6F0]">
                  {/* Status bar */}
                  <div className="h-9 px-5 flex items-end justify-between pb-1.5 bg-[#FBF6F0]">
                    <span className="text-[9px] font-semibold text-[#2C1A0E]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-[2px] items-end">
                        {[3, 5, 7, 9].map((h, i) => (
                          <div key={i} className="w-[2px] rounded-sm bg-[#2C1A0E]" style={{ height: h }} />
                        ))}
                      </div>
                      <div className="w-4 h-[10px] rounded-sm border border-[#2C1A0E] relative ml-0.5">
                        <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[55%] rounded-sm bg-[#2C1A0E]" />
                      </div>
                    </div>
                  </div>

                  {/* Header banner */}
                  <div className="mx-3 rounded-xl px-4 py-3.5 mb-3 text-center"
                    style={{ background: 'linear-gradient(135deg, #C16D2D, #BC5A2F)' }}>
                    <div className="text-[8px] text-white/70 mb-0.5 tracking-widest uppercase">Mariage</div>
                    <div className="text-[15px] font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Sarah & Yassine
                    </div>
                    <div className="text-[9px] text-white/80 mt-1">15 Juin 2025 · Marrakech</div>
                    <div className="mt-2 flex justify-center items-center gap-2">
                      <div className="h-px w-7 bg-white/30" />
                      <span className="text-white/50 text-[8px]">✦</span>
                      <div className="h-px w-7 bg-white/30" />
                    </div>
                  </div>

                  {/* Quick icons */}
                  <div className="px-3 grid grid-cols-4 gap-2 mb-3">
                    {[
                      { icon: '📋', label: 'Programme' },
                      { icon: '🪑', label: 'Ma table' },
                      { icon: '🍽️', label: 'Menu' },
                      { icon: '📸', label: 'Galerie' },
                    ].map((it) => (
                      <div key={it.label} className="flex flex-col items-center gap-1">
                        <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-base shadow-sm"
                          style={{ background: '#FFF5EC', border: '1px solid #ECC49D' }}>
                          {it.icon}
                        </div>
                        <span className="text-[8px] text-[#6B4C2A] font-medium text-center leading-tight">{it.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Table card */}
                  <div className="mx-3 rounded-xl p-3 mb-2" style={{ background: '#FFF5EC', border: '1px solid #ECC49D' }}>
                    <div className="text-[9px] font-semibold text-[#8B763A] mb-1.5 uppercase tracking-wider">Votre table</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: '#C16D2D' }}>7</div>
                      <div>
                        <div className="text-[10px] font-semibold text-[#2C1A0E]">Table des Amis</div>
                        <div className="text-[8px] text-[#6B4C2A]">Salle principale · Place A3</div>
                      </div>
                    </div>
                  </div>

                  {/* Next moment */}
                  <div className="mx-3 rounded-xl p-3" style={{ background: '#F5EAD8' }}>
                    <div className="text-[9px] font-semibold text-[#8B763A] mb-1 uppercase tracking-wider">Prochain moment</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">💍</span>
                      <div>
                        <div className="text-[10px] font-semibold text-[#2C1A0E]">Cérémonie</div>
                        <div className="text-[8px] text-[#6B4C2A]">16h00 · Palais Bahia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge right – hidden on small mobile to prevent overflow */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: easeInOut }}
                className="absolute -right-6 sm:-right-10 top-14 bg-white rounded-2xl shadow-xl p-3 border border-[#ECC49D]/40 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#8B763A]/10 flex items-center justify-center text-sm">✦</div>
                  <div>
                    <div className="text-[10px] font-bold text-[#2C1A0E] whitespace-nowrap">1 scan</div>
                    <div className="text-[9px] text-[#6B4C2A]">Tout en accès</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge left – hidden on small mobile */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: easeInOut, delay: 0.6 }}
                className="absolute -left-6 sm:-left-12 bottom-24 bg-white rounded-2xl shadow-xl p-3 border border-[#ECC49D]/40 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">⭐</span>
                  <div>
                    <div className="text-[10px] font-bold text-[#2C1A0E] whitespace-nowrap">98% satisfaits</div>
                    <div className="text-[9px] text-[#6B4C2A]">des invités</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
          <path d="M0 56V32C360 0 720 56 1080 24C1260 8 1380 40 1440 32V56H0Z" fill="#FBF6F0" opacity="0.55" />
        </svg>
      </div>
    </section>
  );
}
