'use client';

import { Share2, MessageCircle, Mail, Phone } from 'lucide-react';

/* These hrefs must match the actual section ids */
const navLinks = [
  { label: 'À propos', href: '#about' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Démonstration', href: '#demo' },
  { label: 'Nos offres', href: '#offres' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Mariages',
  'Fiançailles',
  'EVJF',
  'Baby Shower',
  'Anniversaires',
  'Événements corporate',
];

const socials = [
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'Facebook' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Phone, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-[#180D05] text-white">
      {/* Top accent line */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(to right, #C16D2D, #8B763A, #C16D2D)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand column – full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8Z" fill="#D59667" />
              </svg>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif', color: '#ECC49D' }}
              >
                Seat & Mrahba
              </span>
            </div>
            <p className="text-[#8B7055] text-sm leading-relaxed mb-6 max-w-[240px]">
              L&apos;hospitalité marocaine à l&apos;ère digitale. Des expériences invités inoubliables, en un scan.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-[#C16D2D] bg-white/6"
                >
                  <Icon className="w-[15px] h-[15px] text-[#D59667]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#ECC49D] font-semibold text-xs mb-5 tracking-[0.18em] uppercase">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#8B7055] text-sm hover:text-[#D59667] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#ECC49D] font-semibold text-xs mb-5 tracking-[0.18em] uppercase">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-[#8B7055] text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#ECC49D] font-semibold text-xs mb-5 tracking-[0.18em] uppercase">Contact</h4>
            <div className="space-y-4">
              {[
                { label: 'Email', value: 'bonjour@seat-mrahba.com' },
                { label: 'WhatsApp', value: '+212 6 00 00 00 00' },
                { label: 'Instagram', value: '@seat.mrahba' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[#C16D2D] text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-[#8B7055] text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A3020]">
          <p>© {new Date().getFullYear()} Seat & Mrahba. Tous droits réservés.</p>
          <p className="text-[#C16D2D]/60">Made with ♥ in Morocco 🇲🇦</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#D59667] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#D59667] transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
