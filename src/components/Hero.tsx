'use client';

import { motion, type Variants, type Easing } from 'framer-motion';

const easeInOut: Easing = 'easeInOut';
const easeOut: Easing = 'easeOut';

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

/* Inline SVG QR-code pattern — decorative only, not scannable */
const QR_CELLS = (() => {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1],
    [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0],
    [1,1,0,1,0,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1],
    [0,0,1,0,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0],
    [1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,0,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,0,1,0,1,0],
    [1,0,1,1,1,0,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1,1,0],
    [1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,0,1],
  ];
  return pattern;
})();

function QrCode() {
  const size = 21;
  const cell = 8;
  return (
    <svg
      width={size * cell}
      height={size * cell}
      viewBox={`0 0 ${size * cell} ${size * cell}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {QR_CELLS.map((row, r) =>
        row.map((val, c) =>
          val ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#1A0F08"
            />
          ) : null
        )
      )}
    </svg>
  );
}

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

            {/* Trust signals */}
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

          {/* Right: QR code visual */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Soft glow behind card */}
              <div
                className="absolute inset-0 rounded-[2rem] blur-3xl opacity-20 scale-[0.85] pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #E8C49A, #B85C28)' }}
              />

              {/* QR card — support plexiglas / papier haut de gamme */}
              <div
                className="relative w-[300px] sm:w-[320px] rounded-[1.6rem] overflow-hidden"
                style={{
                  background: 'white',
                  boxShadow: '0 32px 72px rgba(26,15,8,0.14), 0 2px 8px rgba(26,15,8,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                  border: '1px solid rgba(232,196,154,0.25)',
                }}
              >
                {/* Card header */}
                <div
                  className="px-8 pt-8 pb-6 text-center"
                  style={{ background: 'linear-gradient(160deg, #F8F4EF, #F0E8DC)' }}
                >
                  <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#8A7235] mb-3">
                    Seat & Mrahba
                  </p>
                  <p
                    className="text-[1.5rem] leading-tight text-[#1A0F08] mb-1"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}
                  >
                    Sarah & Yassine
                  </p>
                  <p className="text-[12px] text-[#9B7A56]">15 Juin 2025 · Marrakech</p>

                  {/* Thin divider */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="h-px w-8 bg-[#E8C49A]" />
                    <span className="text-[#CF9068] text-[10px]">✦</span>
                    <div className="h-px w-8 bg-[#E8C49A]" />
                  </div>
                </div>

                {/* QR code area */}
                <div className="px-8 py-6 flex flex-col items-center bg-white">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: '#FDFCFB',
                      border: '1px solid rgba(232,196,154,0.3)',
                      boxShadow: '0 2px 12px rgba(26,15,8,0.05)',
                    }}
                  >
                    <QrCode />
                  </div>
                  <p className="text-[11px] text-[#9B7A56] mt-4 tracking-wide text-center">
                    Scanner pour accéder à votre espace
                  </p>
                </div>

                {/* Card footer */}
                <div
                  className="px-8 pb-7 pt-0 text-center"
                  style={{ background: 'white' }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(138,114,53,0.08)', border: '1px solid rgba(138,114,53,0.15)' }}
                  >
                    <span className="text-[#8A7235] text-[10px]">✦</span>
                    <span className="text-[11px] text-[#8A7235] font-medium tracking-wide">
                      Plan de table · Menu · Galerie
                    </span>
                    <span className="text-[#8A7235] text-[10px]">✦</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: easeInOut }}
                className="absolute -right-4 sm:-right-10 top-10 bg-white rounded-2xl shadow-xl p-3 border border-[#E8C49A]/30 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#B85C28]/10 flex items-center justify-center">
                    <span className="text-[#B85C28] text-sm font-medium" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>1</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#1A0F08] whitespace-nowrap">1 scan</div>
                    <div className="text-[9px] text-[#9B7A56]">Toutes les infos</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-left material badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: easeInOut, delay: 1 }}
                className="absolute -left-4 sm:-left-8 bottom-16 bg-[#1A0F08] rounded-2xl shadow-xl p-3 hidden sm:block"
                style={{ border: '1px solid rgba(232,196,154,0.15)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#E8C49A]/10 flex items-center justify-center">
                    <span className="text-[#E8C49A] text-xs">◈</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-[#E8C49A] whitespace-nowrap">Support plexiglas</div>
                    <div className="text-[9px] text-[#9B7A56]">Gravé sur mesure</div>
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
