'use client';

import { motion, type Variants, type Easing } from 'framer-motion';

const easeInOut: Easing = 'easeInOut';
const easeOut: Easing = 'easeOut';

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[68px] md:pt-[80px]"
      style={{ background: `${GRAIN}, #F8F4EF` }}
    >
      {/* Soft ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #E8C49A 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #B85C28 0%, transparent 65%)' }} />

      {/* Thin decorative line — top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8C49A 40%, #E8C49A 60%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Copy */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-8">

            {/* Label */}
            <motion.div variants={item}>
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235]">
                Service premium · Maroc
              </p>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-[2.8rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] leading-[1.08] text-[#1A0F08]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
            >
              Le QR code qui{' '}
              <em className="not-italic italic text-[#8A7235]">accueille</em>{' '}
              vos invités avec élégance.
            </motion.h1>

            {/* Thin divider */}
            <motion.div variants={item} className="flex items-center gap-4 w-fit">
              <div className="h-px w-10 bg-[#E8C49A]" />
              <span className="text-[#CF9068] text-xs">✦</span>
              <div className="h-px w-10 bg-[#E8C49A]" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-[16px] leading-[1.8] max-w-[460px] text-[#9B7A56]"
            >
              Une page digitale sur mesure pour chaque événement. Plan de table, programme, menu, galerie — tout en un seul scan.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="px-7 py-3.5 rounded-full text-[14px] font-medium text-white transition-all duration-200 active:scale-[0.97]"
                style={{ background: '#B85C28', boxShadow: '0 4px 20px rgba(184,92,40,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#A0501F')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#B85C28')}
              >
                Demander un devis gratuit
              </button>
              <button
                onClick={() => scrollTo('#demo')}
                className="px-7 py-3.5 rounded-full text-[14px] font-medium border text-[#B85C28] hover:bg-[#B85C28] hover:text-white active:scale-[0.97] transition-all duration-200"
                style={{ borderColor: '#B85C28' }}
              >
                Voir la démo →
              </button>
            </motion.div>

            {/* Trust signals — honest, no fake numbers */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-6 pt-2">
              {[
                { icon: '✦', text: 'Devis gratuit & sans engagement' },
                { icon: '✦', text: 'Réponse sous 24h' },
                { icon: '✦', text: 'Livraison en 48h' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[#CF9068] text-[10px]">{s.icon}</span>
                  <span className="text-[13px] text-[#9B7A56]">{s.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Soft glow behind phone */}
              <div
                className="absolute inset-0 rounded-[3rem] blur-3xl opacity-20 scale-[0.9] pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #E8C49A, #B85C28)' }}
              />

              {/* Phone frame */}
              <div
                className="relative w-[248px] sm:w-[264px] h-[504px] sm:h-[528px] rounded-[2.8rem] p-[7px]"
                style={{
                  background: 'linear-gradient(160deg, #1e1e1e, #2a2a2a)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[88px] h-[22px] bg-[#111] rounded-full z-10" />
                <div className="absolute -left-[3px] top-[90px] w-[3px] h-7 bg-[#2a2a2a] rounded-l-full" />
                <div className="absolute -left-[3px] top-[130px] w-[3px] h-10 bg-[#2a2a2a] rounded-l-full" />
                <div className="absolute -right-[3px] top-[108px] w-[3px] h-12 bg-[#2a2a2a] rounded-r-full" />

                {/* Screen content */}
                <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-[#F8F4EF]">
                  <div className="h-9 px-5 flex items-end justify-between pb-1.5 bg-[#F8F4EF]">
                    <span className="text-[9px] font-semibold text-[#1A0F08]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-[2px] items-end">
                        {[3, 5, 7, 9].map((h, i) => (
                          <div key={i} className="w-[2px] rounded-sm bg-[#1A0F08]" style={{ height: h }} />
                        ))}
                      </div>
                      <div className="w-4 h-[10px] rounded-sm border border-[#1A0F08] relative ml-0.5">
                        <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[55%] rounded-sm bg-[#1A0F08]" />
                      </div>
                    </div>
                  </div>

                  <div className="mx-3 rounded-xl px-4 py-3.5 mb-3 text-center"
                    style={{ background: 'linear-gradient(135deg, #B85C28, #9A4E1E)' }}>
                    <div className="text-[8px] text-white/60 mb-0.5 tracking-widest uppercase">Mariage</div>
                    <div className="text-[15px] font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      Sarah & Yassine
                    </div>
                    <div className="text-[9px] text-white/70 mt-1">15 Juin 2025 · Marrakech</div>
                    <div className="mt-2 flex justify-center items-center gap-2">
                      <div className="h-px w-7 bg-white/25" />
                      <span className="text-white/40 text-[8px]">✦</span>
                      <div className="h-px w-7 bg-white/25" />
                    </div>
                  </div>

                  <div className="px-3 grid grid-cols-4 gap-2 mb-3">
                    {[
                      { icon: '📋', label: 'Programme' },
                      { icon: '🪑', label: 'Ma table' },
                      { icon: '🍽️', label: 'Menu' },
                      { icon: '📸', label: 'Galerie' },
                    ].map((it) => (
                      <div key={it.label} className="flex flex-col items-center gap-1">
                        <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-base shadow-sm bg-white border border-[#E8C49A]/50">
                          {it.icon}
                        </div>
                        <span className="text-[8px] text-[#5A3C1E] font-medium text-center leading-tight">{it.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mx-3 rounded-xl p-3 mb-2 bg-white border border-[#E8C49A]/40">
                    <div className="text-[9px] font-semibold text-[#8A7235] mb-1.5 uppercase tracking-wider">Votre table</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: '#B85C28' }}>7</div>
                      <div>
                        <div className="text-[10px] font-semibold text-[#1A0F08]">Table des Amis</div>
                        <div className="text-[8px] text-[#9B7A56]">Salle principale · Place A3</div>
                      </div>
                    </div>
                  </div>

                  <div className="mx-3 rounded-xl p-3" style={{ background: '#F0E8DC' }}>
                    <div className="text-[9px] font-semibold text-[#8A7235] mb-1 uppercase tracking-wider">Prochain moment</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">💍</span>
                      <div>
                        <div className="text-[10px] font-semibold text-[#1A0F08]">Cérémonie</div>
                        <div className="text-[8px] text-[#9B7A56]">16h00 · Palais Bahia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — hidden on small mobile */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: easeInOut }}
                className="absolute -right-4 sm:-right-10 top-16 bg-white rounded-2xl shadow-xl p-3 border border-[#E8C49A]/30 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#8A7235]/10 flex items-center justify-center text-sm">✦</div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#1A0F08] whitespace-nowrap">1 scan</div>
                    <div className="text-[9px] text-[#9B7A56]">Tout en accès</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F8F4EF)' }} />
    </section>
  );
}
