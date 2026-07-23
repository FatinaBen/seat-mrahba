'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calendar, Users, UtensilsCrossed, Image, MapPin } from 'lucide-react';

const tabs = [
  { id: 'programme', label: 'Programme', icon: Calendar },
  { id: 'tables', label: 'Tables', icon: Users },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
  { id: 'galerie', label: 'Galerie', icon: Image },
  { id: 'infos', label: 'Infos', icon: MapPin },
];

const programme = [
  { time: '15h00', title: 'Accueil des invités', desc: 'Salon de thé & amuse-bouches' },
  { time: '16h00', title: 'Cérémonie', desc: 'Jardin principal du Riad' },
  { time: '17h30', title: 'Cocktail', desc: 'Terrasse avec vue sur la médina' },
  { time: '20h00', title: 'Dîner de gala', desc: 'Grande salle décorée' },
  { time: '22h30', title: 'Soirée dansante', desc: 'DJ & musique live' },
  { time: '01h00', title: 'Desserts & thé', desc: 'Salon cosy & pâtisseries' },
];

const tables = [
  { name: 'Table Jasmin', guests: ['Ali B.', 'Sara M.', 'Leila K.', 'Omar F.'] },
  { name: 'Table Rose', guests: ['Nadia H.', 'Youssef A.', 'Fatima R.', 'Karim L.'] },
  { name: 'Table Amber', guests: ['Ines S.', 'Mehdi O.', 'Rim B.', 'Adam Z.'] },
  { name: 'Table Safran', guests: ['Hajar M.', 'Bilal T.', 'Samia N.', 'Rayan D.'] },
];

const menu = {
  entrees: ['Briouats au fromage & miel', 'Salade marocaine traditionnelle', 'Zaalouk d\'aubergine'],
  plats: ['Pastilla au pigeon aux amandes', 'Tajine d\'agneau aux pruneaux', 'Couscous royal aux 7 légumes'],
  desserts: ['Chebakia au miel & sésame', 'Cornes de gazelle', 'Gâteau de mariage personnalisé'],
};

const galerieColors = [
  '#ECC49D', '#C16D2D', '#D59667', '#8B763A',
  '#BC5A2F', '#C5B691', '#D59667', '#ECC49D',
  '#8B763A', '#C16D2D', '#C5B691', '#BC5A2F',
];

function ProgrammeTab() {
  return (
    <div className="space-y-3">
      {programme.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="bg-[#C16D2D] text-white text-xs font-bold px-2 py-1 rounded-md min-w-[52px] text-center mt-0.5">
            {item.time}
          </div>
          <div>
            <p className="text-[#2C1A0E] font-semibold text-sm">{item.title}</p>
            <p className="text-[#6B4C2A] text-xs">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TablesTab() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {tables.map((table, i) => (
        <div key={i} className="bg-[#FBF6F0] rounded-lg p-2 border border-[#ECC49D]/50">
          <p className="text-[#8B763A] font-bold text-xs mb-1">{table.name}</p>
          {table.guests.map((g, j) => (
            <p key={j} className="text-[#2C1A0E] text-xs">• {g}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function MenuTab() {
  return (
    <div className="space-y-4">
      {[
        { label: 'Entrées', items: menu.entrees, color: '#8B763A' },
        { label: 'Plats', items: menu.plats, color: '#C16D2D' },
        { label: 'Desserts', items: menu.desserts, color: '#BC5A2F' },
      ].map((section, i) => (
        <div key={i}>
          <p className="font-bold text-xs tracking-widest uppercase mb-1.5" style={{ color: section.color }}>
            {section.label}
          </p>
          {section.items.map((item, j) => (
            <p key={j} className="text-[#2C1A0E] text-xs mb-1">✦ {item}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function GalerieTab() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {galerieColors.map((color, i) => (
        <div
          key={i}
          className="aspect-square rounded-md flex items-center justify-center text-white/50 text-xs"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
        >
          {i % 4 === 0 ? '❤' : ''}
        </div>
      ))}
    </div>
  );
}

function InfosTab() {
  return (
    <div className="space-y-3">
      <div className="bg-[#FBF6F0] rounded-xl p-3 border border-[#ECC49D]/50">
        <p className="text-[#8B763A] font-bold text-xs mb-1">📍 Lieu</p>
        <p className="text-[#2C1A0E] text-xs">Riad Dar Al Houssoun</p>
        <p className="text-[#6B4C2A] text-xs">15 Derb El Arsa, Marrakech</p>
      </div>
      <div className="bg-[#FBF6F0] rounded-xl p-3 border border-[#ECC49D]/50">
        <p className="text-[#8B763A] font-bold text-xs mb-1">🚗 Parking</p>
        <p className="text-[#6B4C2A] text-xs">Parking Bab Doukkala (5 min). Navette toutes les 30 min.</p>
      </div>
      <div className="bg-[#FBF6F0] rounded-xl p-3 border border-[#ECC49D]/50">
        <p className="text-[#8B763A] font-bold text-xs mb-1">👗 Tenue</p>
        <p className="text-[#6B4C2A] text-xs">Tenue de soirée élégante. Couleurs claires bienvenues.</p>
      </div>
      <div className="bg-[#FBF6F0] rounded-xl p-3 border border-[#ECC49D]/50">
        <p className="text-[#8B763A] font-bold text-xs mb-1">📞 Contact</p>
        <p className="text-[#6B4C2A] text-xs">+212 6 12 34 56 78</p>
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState('programme');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="demo" className="py-24 md:py-32 bg-[#F7EEE3]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> Démonstration <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
          >
            Vivez l&apos;expérience en direct
          </h2>
          <p className="text-[17px] text-[#6B4C2A] max-w-xl mx-auto leading-relaxed">
            Découvrez un exemple réel — le mariage de Sarah & Yassine. Naviguez comme le feraient vos invités.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
          {/* Tab selectors */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm w-full"
          >
            <div className="space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const descriptions: Record<string, string> = {
                  programme: 'Le fil conducteur de votre journée',
                  tables: 'Qui est assis où ?',
                  menu: 'Les saveurs du festin',
                  galerie: 'Les plus beaux moments',
                  infos: "Tout savoir avant d'arriver",
                };
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 w-full text-left p-4 rounded-2xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#C16D2D] text-white shadow-lg'
                        : 'bg-white/60 text-[#6B4C2A] hover:bg-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{tab.label}</p>
                      <p className={`text-xs ${activeTab === tab.id ? 'text-white/70' : 'text-[#8B763A]'}`}>
                        {descriptions[tab.id]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-72 bg-[#1C1C1E] rounded-[3rem] p-3 shadow-2xl">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1C1C1E] rounded-full z-20" />
              <div className="bg-[#FBF6F0] rounded-[2.4rem] overflow-hidden h-[580px] flex flex-col">
                <div className="bg-[#2C1A0E] px-6 pt-8 pb-5 text-center">
                  <p className="text-[#ECC49D] text-xs tracking-widest uppercase font-light mb-1">✦ Seat & Mrahba ✦</p>
                  <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}>
                    Sarah & Yassine
                  </h3>
                  <p className="text-[#C5B691] text-xs mt-1">15 Juin 2025 • Marrakech</p>
                </div>

                <div className="flex bg-white border-b border-[#ECC49D]/30 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex flex-col items-center py-2 px-1 min-w-[52px] transition-all ${
                          activeTab === tab.id
                            ? 'text-[#C16D2D] border-b-2 border-[#C16D2D]'
                            : 'text-[#C5B691]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'programme' && <ProgrammeTab />}
                      {activeTab === 'tables' && <TablesTab />}
                      {activeTab === 'menu' && <MenuTab />}
                      {activeTab === 'galerie' && <GalerieTab />}
                      {activeTab === 'infos' && <InfosTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center pb-2 pt-1">
                  <div className="w-24 h-1 bg-[#2C1A0E]/20 rounded-full" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full bg-[#C16D2D]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
