'use client';

import { Share2, MessageCircle, Mail, Phone } from 'lucide-react';

const navLinks = [
  { label: 'À propos', href: '#a-propos' },
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

export default function Footer() {
  return (
    <footer className="bg-[#1A0F07] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#D59667] text-lg">✦</span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Seat & Mrahba
              </span>
            </div>
            <p className="text-[#C5B691] text-sm leading-relaxed mb-6">
              L&apos;hospitalité marocaine à l&apos;ère digitale. Des expériences invités inoubliables, en un scan.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: '#', label: 'Instagram' },
                { icon: MessageCircle, href: '#', label: 'Facebook' },
                { icon: Mail, href: '#', label: 'Email' },
                { icon: Phone, href: '#', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-white/5 hover:bg-[#C16D2D] rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#D59667]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#C5B691] text-sm hover:text-[#D59667] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-[#C5B691] text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[#8B763A] text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-[#C5B691] text-sm">bonjour@seat-mrahba.com</p>
              </div>
              <div>
                <p className="text-[#8B763A] text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-[#C5B691] text-sm">+212 6 00 00 00 00</p>
              </div>
              <div>
                <p className="text-[#8B763A] text-xs uppercase tracking-wider mb-1">Instagram</p>
                <p className="text-[#C5B691] text-sm">@seat.mrahba</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B4C2A] text-xs">
            © {new Date().getFullYear()} Seat & Mrahba. Tous droits réservés.
          </p>
          <p className="text-[#6B4C2A] text-xs">Made with ♥ in Morocco</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#6B4C2A] hover:text-[#D59667] text-xs transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-[#6B4C2A] hover:text-[#D59667] text-xs transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
