'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'À propos', href: '#about' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Offres', href: '#offres' },
  { label: 'Démo', href: '#demo' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F4EF]/95 backdrop-blur-md border-b border-[#E8C49A]/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px] md:h-[80px]">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group flex-shrink-0"
              aria-label="Seat & Mrahba"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 1.5L12.2 7.8L18.5 10L12.2 12.2L10 18.5L7.8 12.2L1.5 10L7.8 7.8Z" fill="#8A7235" />
              </svg>
              <span
                className="text-[19px] font-bold"
                style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif', color: '#8A7235' }}
              >
                Seat & Mrahba
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13px] font-medium text-[#5A3C1E] hover:text-[#B85C28] transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B85C28] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-200 active:scale-95"
                style={{ background: '#B85C28' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#A0501F')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#B85C28')}
              >
                Demander un devis
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#1A0F08] hover:bg-[#E8C49A]/25 transition-colors"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#1A0F08]/10 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-[#F8F4EF] border-b border-[#E8C49A]/40 shadow-lg md:hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[15px] font-medium py-3 px-4 rounded-xl text-[#1A0F08] hover:bg-[#E8C49A]/20 hover:text-[#B85C28] transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="pt-3 pb-2"
              >
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-3 rounded-full text-[14px] font-medium text-white transition-colors"
                  style={{ background: '#B85C28' }}
                >
                  Demander un devis gratuit
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
