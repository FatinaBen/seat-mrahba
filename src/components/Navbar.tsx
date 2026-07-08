'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

/* IDs match actual section id attributes in each component */
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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
            ? 'bg-[#FBF6F0]/95 backdrop-blur-md shadow-sm border-b border-[#ECC49D]/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[68px] md:h-[80px]">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Seat & Mrahba"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" fill="#8B763A" />
                <path d="M12 6.5L13.8 11.2L18.5 12L13.8 12.8L12 17.5L10.2 12.8L5.5 12L10.2 11.2Z" fill="#FBF6F0" opacity="0.65" />
              </svg>
              <span
                className="text-xl md:text-[22px] font-bold tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif', color: '#8B763A' }}
              >
                Seat & Mrahba
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13.5px] font-medium text-[#2C1A0E] hover:text-[#C16D2D] transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#C16D2D] rounded-full transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-[#C16D2D] hover:bg-[#BC5A2F] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Demander un devis
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#2C1A0E] hover:bg-[#ECC49D]/30 transition-colors"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#2C1A0E]/15 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-[#FBF6F0] border-b border-[#ECC49D]/50 shadow-xl md:hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[15px] font-medium py-3 px-4 rounded-xl text-[#2C1A0E] hover:bg-[#ECC49D]/25 hover:text-[#C16D2D] transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-3 pb-2"
              >
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-3.5 rounded-full text-[14px] font-semibold text-white bg-[#C16D2D] hover:bg-[#BC5A2F] transition-colors shadow-md"
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
