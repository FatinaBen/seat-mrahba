'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, PlusCircle,
  Settings, ChevronLeft, ChevronRight, ExternalLink, X,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        href: '/admin' },
  { icon: CalendarDays,    label: 'Événements',       href: '/admin/events' },
  { icon: PlusCircle,      label: 'Nouvel événement', href: '/admin/events/new', accent: true },
  { divider: true },
  { icon: Settings,        label: 'Paramètres',       href: '/admin/settings' },
];

interface Props {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

// Desktop (lg+) : colonne fixe, repliable via le bouton rond.
// Mobile (<lg) : tiroir plein écran ouvert/fermé depuis la barre du haut (AdminShell),
// toujours en pleine largeur de nav (pas de mode "replié" sur mobile).
export default function Sidebar({ mobileOpen = false, onCloseMobile }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const content = (isMobile: boolean) => (
    <>
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-5 border-b flex-shrink-0"
        style={{ borderColor: 'rgba(26,15,8,0.07)' }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#B85C28' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L7.2 4.3L10.5 6L7.2 7.7L6 11L4.8 7.7L1.5 6L4.8 4.3Z" fill="white" />
          </svg>
        </div>
        {(isMobile || !collapsed) && (
          <span className="text-[13px] font-semibold text-[#1A0F08] truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
            Seat & Mrahba
          </span>
        )}
        {isMobile && (
          <button onClick={onCloseMobile} className="ml-auto p-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)]">
            <X size={16} className="text-[#5A3C1E]" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {navItems.map((item, i) => {
          if ('divider' in item && item.divider) {
            return (
              <div key={`div-${i}`} className="mx-4 my-2 h-px" style={{ background: 'rgba(26,15,8,0.06)' }} />
            );
          }
          const { icon: Icon, label, href, accent } = item as { icon: React.ElementType; label: string; href: string; accent?: boolean };
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onCloseMobile}
              title={!isMobile && collapsed ? label : undefined}
              className={`flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                active
                  ? 'text-[#B85C28]'
                  : accent
                  ? 'text-[#B85C28] hover:bg-[#B85C28]/8'
                  : 'text-[#5A3C1E] hover:bg-[rgba(26,15,8,0.04)] hover:text-[#1A0F08]'
              }`}
              style={active ? { background: 'rgba(184,92,40,0.08)' } : {}}
            >
              <Icon
                size={16}
                className="flex-shrink-0"
                strokeWidth={active ? 2 : 1.75}
              />
              {(isMobile || !collapsed) && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {(isMobile || !collapsed) && (
        <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: 'rgba(26,15,8,0.07)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-[11px] text-[#9B7A56] hover:text-[#B85C28] transition-colors"
          >
            <ExternalLink size={11} />
            Voir le site
          </Link>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-shrink-0 flex-col h-full border-r transition-all duration-300 relative"
        style={{
          width: collapsed ? 64 : 220,
          background: '#FDFCF9',
          borderColor: 'rgba(26,15,8,0.07)',
        }}
      >
        {content(false)}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white border flex items-center justify-center shadow-sm hover:shadow transition-shadow"
          style={{ borderColor: 'rgba(26,15,8,0.12)' }}
        >
          {collapsed
            ? <ChevronRight size={12} className="text-[#9B7A56]" />
            : <ChevronLeft size={12} className="text-[#9B7A56]" />
          }
        </button>
      </aside>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onCloseMobile}
        />
        <aside
          className="absolute inset-y-0 left-0 flex flex-col transition-transform duration-300"
          style={{
            width: 260,
            background: '#FDFCF9',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          {content(true)}
        </aside>
      </div>
    </>
  );
}
