'use client';

import { Share2, MessageCircle, Mail, Phone } from 'lucide-react';

const navLinks = [
  { label: 'À propos', href: '#about' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Démonstration', href: '#demo' },
  { label: 'Nos offres', href: '#offres' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Mariages', 'Fiançailles', 'EVJF',
  'Baby Shower', 'Anniversaires', 'Corporate',
];

const socials = [
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'Facebook' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Phone, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0F0805' }} className="text-white">
      {/* Top accent */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #B85C28 35%, #8A7235 65%, transparent)' }} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L11 6.5L16.5 9L11 11.5L9 17L7 11.5L1.5 9L7 6.5Z" fill="#E8C49A" />
              </svg>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#E8C49A' }}
              >
                Seat & Mrahba
              </span>
            </div>
            <p className="text-[13px] leading-relaxed mb-6 max-w-[220px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              L&apos;hospitalité marocaine à l&apos;ère digitale. Des expériences invités inoubliables, en un scan.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#B85C28')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: '#CF9068' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.25em] uppercase mb-5" style={{ color: '#E8C49A' }}>
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] transition-colors"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E8C49A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.25em] uppercase mb-5" style={{ color: '#E8C49A' }}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.25em] uppercase mb-5" style={{ color: '#E8C49A' }}>
              Contact
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Email', value: 'bonjour@seat-mrahba.com' },
                { label: 'WhatsApp', value: '+212 6 00 00 00 00' },
                { label: 'Instagram', value: '@seat.mrahba' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: '#B85C28' }}>{label}</p>
                  <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}
        >
          <p>© {new Date().getFullYear()} Seat & Mrahba. Tous droits réservés.</p>
          <p style={{ color: 'rgba(184,92,40,0.5)' }}>Made with ♥ in Morocco 🇲🇦</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/40 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white/40 transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
