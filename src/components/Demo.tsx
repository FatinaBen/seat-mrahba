'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

type TabId = 'accueil' | 'table' | 'menu' | 'galerie';

const tabs: { id: TabId; label: string }[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'table', label: 'Ma table' },
  { id: 'menu', label: 'Menu' },
  { id: 'galerie', label: 'Galerie' },
];

const descriptions: Record<TabId, string> = {
  accueil: "L'écran de bienvenue personnalisé",
  table: 'Retrouvez votre place en un instant',
  menu: 'Les saveurs de votre soirée',
  galerie: 'Partagez vos plus beaux moments',
};

function AccueilScreen() {
  return (
    <div className="flex flex-col items-center text-center px-4 pt-4 pb-2 h-full">
      <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-2">
        Seat & Mrahba
      </p>
      <p className="text-[18px] leading-tight text-[#1A0F08] mb-1"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>
        Mariage de<br />Sarah & Yassine
      </p>
      <p className="text-[10px] text-[#9B7A56] mb-4">15 Juin 2025 · Marrakech</p>

      <div className="flex items-center gap-2 mb-5">
        <div className="h-px w-8 bg-[#E8C49A]" />
        <span className="text-[#CF9068] text-[9px]">✦</span>
        <div className="h-px w-8 bg-[#E8C49A]" />
      </div>

      <p className="text-[11px] text-[#9B7A56] leading-relaxed max-w-[200px] mb-5">
        Bienvenue. Nous sommes ravis de vous accueillir en cette journée exceptionnelle.
      </p>

      <div className="w-full rounded-xl p-3 text-left"
        style={{ background: 'linear-gradient(135deg, #F8F4EF, #F0E8DC)', border: '1px solid rgba(232,196,154,0.4)' }}>
        <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#8A7235] mb-2">Ce soir</p>
        {[
          { time: '19h00', label: 'Cocktail dînatoire' },
          { time: '20h30', label: 'Dîner de gala' },
          { time: '23h00', label: 'Soirée & célébration' },
        ].map((e, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <span className="text-[9px] font-medium text-[#B85C28] min-w-[36px]">{e.time}</span>
            <span className="text-[10px] text-[#5A3C1E]">{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableScreen() {
  const [searched, setSearched] = useState(false);

  return (
    <div className="px-3 py-4 h-full flex flex-col">
      {!searched ? (
        <>
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#8A7235] mb-3 text-center">
            Trouver ma table
          </p>
          <div className="rounded-xl p-3 mb-3"
            style={{ background: '#F8F4EF', border: '1px solid rgba(232,196,154,0.4)' }}>
            <p className="text-[9px] text-[#9B7A56] mb-2">Renseignez votre nom et prénom</p>
            <div className="rounded-lg px-3 py-2 mb-2 bg-white"
              style={{ border: '1px solid rgba(232,196,154,0.6)' }}>
              <span className="text-[11px] text-[#9B7A56]">Votre nom complet</span>
            </div>
            <button
              onClick={() => setSearched(true)}
              className="w-full py-2 rounded-lg text-[11px] font-medium text-white transition-all"
              style={{ background: '#B85C28' }}
            >
              Rechercher
            </button>
          </div>

          {/* Illustrative room layout */}
          <p className="text-[9px] text-[#9B7A56] mb-2 text-center">Plan de la salle</p>
          <div className="flex-1 rounded-xl p-3 relative"
            style={{ background: '#F8F4EF', border: '1px solid rgba(232,196,154,0.3)' }}>
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="aspect-square rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ background: 'rgba(232,196,154,0.25)', color: '#8A7235', border: '1px solid rgba(232,196,154,0.4)' }}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#8A7235] mb-3 text-center">
            Votre place
          </p>

          <div className="rounded-xl p-4 mb-3 text-center"
            style={{ background: 'linear-gradient(135deg, #B85C28, #9A4E1E)', boxShadow: '0 8px 24px rgba(184,92,40,0.25)' }}>
            <p className="text-[9px] text-white/60 mb-1">Vous êtes installé à la</p>
            <p className="text-[22px] text-white font-medium leading-none mb-1"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Table n°<span className="text-[#E8C49A]">9</span>
            </p>
            <p className="text-[10px] text-white/70">Côté gauche de la salle</p>
          </div>

          {/* Room layout with highlighted table */}
          <p className="text-[9px] text-[#9B7A56] mb-2 text-center">Plan de la salle</p>
          <div className="rounded-xl p-3"
            style={{ background: '#F8F4EF', border: '1px solid rgba(232,196,154,0.3)' }}>
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="aspect-square rounded-full flex items-center justify-center text-[9px] font-medium transition-all"
                  style={i === 8
                    ? { background: '#B85C28', color: 'white', border: '2px solid #B85C28', boxShadow: '0 2px 8px rgba(184,92,40,0.4)' }
                    : { background: 'rgba(232,196,154,0.2)', color: '#8A7235', border: '1px solid rgba(232,196,154,0.35)' }
                  }>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSearched(false)}
            className="mt-3 w-full text-center text-[10px] text-[#9B7A56]"
          >
            ← Nouvelle recherche
          </button>
        </motion.div>
      )}
    </div>
  );
}

function MenuScreen() {
  return (
    <div className="px-4 py-4">
      <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-4 text-center">
        Menu du soir
      </p>

      {[
        {
          label: 'Entrée',
          color: '#8A7235',
          items: ['Burrata crémeuse & tomates confites', 'Huile d\'olive et basilic frais'],
        },
        {
          label: 'Plat',
          color: '#B85C28',
          items: ['Filet de bœuf en croûte', 'Gratin dauphinois & légumes de saison'],
        },
        {
          label: 'Dessert',
          color: '#CF9068',
          items: ['Pièce montée artisanale', 'Macarons & café'],
        },
      ].map((section, i) => (
        <div key={i} className="mb-4 last:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1" style={{ background: `${section.color}40` }} />
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: section.color }}>
              {section.label}
            </p>
            <div className="h-px flex-1" style={{ background: `${section.color}40` }} />
          </div>
          {section.items.map((item, j) => (
            <p key={j} className="text-[11px] text-[#5A3C1E] text-center leading-relaxed mb-0.5">
              {item}
            </p>
          ))}
        </div>
      ))}

      <div className="flex items-center justify-center gap-2 mt-5">
        <div className="h-px w-8 bg-[#E8C49A]" />
        <span className="text-[#CF9068] text-[9px]">✦</span>
        <div className="h-px w-8 bg-[#E8C49A]" />
      </div>
    </div>
  );
}

function GalerieScreen() {
  const placeholders = [
    '#D4B896', '#B85C28', '#E8C49A', '#8A7235',
    '#CF9068', '#9B7A56', '#E8C49A', '#B85C28',
    '#8A7235', '#CF9068', '#D4B896', '#9B7A56',
  ];
  return (
    <div className="px-3 py-4">
      <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-1 text-center">
        Galerie
      </p>
      <p className="text-[10px] text-[#9B7A56] text-center mb-3 leading-relaxed">
        Partagez les plus beaux moments<br />de cette soirée
      </p>

      <div className="rounded-xl p-3 mb-3 text-center"
        style={{ background: 'linear-gradient(135deg, #F8F4EF, #F0E8DC)', border: '1px solid rgba(232,196,154,0.4)' }}>
        <span className="text-[10px] text-[#B85C28] font-medium">+ Ajouter une photo</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {placeholders.map((color, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg"
            style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<TabId>('accueil');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="demo" className="py-28 md:py-36 relative" style={{ background: '#F8F4EF' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8C49A 40%, #E8C49A 60%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8C49A 40%, #E8C49A 60%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Démonstration
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Vivez l&apos;expérience en direct
          </h2>
          <p className="text-base text-[#9B7A56] max-w-md mx-auto leading-relaxed">
            Découvrez le parcours tel que le vivront vos invités — du scan à leur table, en quelques secondes.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16 justify-center">

          {/* Left: tab selector */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xs w-full"
          >
            <div className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full text-left p-4 rounded-2xl transition-all duration-200"
                  style={activeTab === tab.id
                    ? { background: '#B85C28', boxShadow: '0 8px 24px rgba(184,92,40,0.2)' }
                    : { background: 'white', border: '1px solid rgba(232,196,154,0.3)' }
                  }
                >
                  <p className="font-medium text-[14px] mb-0.5"
                    style={{ color: activeTab === tab.id ? 'white' : '#1A0F08' }}>
                    {tab.label}
                  </p>
                  <p className="text-[12px]"
                    style={{ color: activeTab === tab.id ? 'rgba(255,255,255,0.65)' : '#9B7A56' }}>
                    {descriptions[tab.id]}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup — cream palette, no black frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-15 scale-90 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #E8C49A, #B85C28)' }} />

              {/* Phone frame — light, no black */}
              <div
                className="relative w-[260px] sm:w-[280px] rounded-[3rem] p-[6px]"
                style={{
                  background: 'linear-gradient(160deg, #EDE0CF, #D4C4AF)',
                  boxShadow: '0 40px 80px rgba(26,15,8,0.18), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {/* Notch */}
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[20px] rounded-full z-10"
                  style={{ background: '#D4C4AF' }} />
                {/* Side buttons */}
                <div className="absolute -left-[3px] top-[90px] w-[3px] h-6 rounded-l-full" style={{ background: '#C8B69A' }} />
                <div className="absolute -left-[3px] top-[124px] w-[3px] h-9 rounded-l-full" style={{ background: '#C8B69A' }} />
                <div className="absolute -right-[3px] top-[108px] w-[3px] h-11 rounded-r-full" style={{ background: '#C8B69A' }} />

                {/* Screen */}
                <div className="w-full rounded-[2.6rem] overflow-hidden" style={{ background: '#FDFAF7' }}>

                  {/* Status bar */}
                  <div className="h-8 px-5 flex items-end justify-between pb-1.5" style={{ background: '#FDFAF7' }}>
                    <span className="text-[9px] font-semibold text-[#1A0F08]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-[2px] items-end">
                        {[3,5,7,9].map((h, i) => (
                          <div key={i} className="w-[2px] rounded-sm bg-[#1A0F08]" style={{ height: h }} />
                        ))}
                      </div>
                      <div className="w-4 h-[10px] rounded-sm border border-[#1A0F08] relative ml-0.5">
                        <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[55%] rounded-sm bg-[#1A0F08]" />
                      </div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="px-5 pt-3 pb-4 text-center"
                    style={{ background: 'linear-gradient(160deg, #F8F4EF, #EDE5D8)' }}>
                    <p className="text-[8px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-1">
                      Seat & Mrahba
                    </p>
                    <p className="text-[15px] text-[#1A0F08] leading-tight"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>
                      Sarah & Yassine
                    </p>
                    <p className="text-[9px] text-[#9B7A56] mt-0.5">15 Juin 2025 · Marrakech</p>
                  </div>

                  {/* Tab bar */}
                  <div className="flex border-b" style={{ borderColor: 'rgba(232,196,154,0.4)', background: 'white' }}>
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex-1 py-2 text-[9px] font-medium transition-all"
                        style={activeTab === tab.id
                          ? { color: '#B85C28', borderBottom: '2px solid #B85C28' }
                          : { color: '#9B7A56' }
                        }
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto" style={{ height: 380, background: 'white' }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                      >
                        {activeTab === 'accueil' && <AccueilScreen />}
                        {activeTab === 'table' && <TableScreen />}
                        {activeTab === 'menu' && <MenuScreen />}
                        {activeTab === 'galerie' && <GalerieScreen />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Home bar */}
                  <div className="flex justify-center py-2" style={{ background: 'white' }}>
                    <div className="w-20 h-1 rounded-full" style={{ background: 'rgba(26,15,8,0.15)' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
