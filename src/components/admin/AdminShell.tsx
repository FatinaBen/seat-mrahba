'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

// Coquille cliente : porte le state du tiroir mobile (layout.tsx doit rester un
// composant serveur pour exporter `metadata`).
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F2EE', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Barre mobile uniquement : ouvre le menu principal */}
        <div
          className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white flex-shrink-0"
          style={{ borderColor: 'rgba(26,15,8,0.08)' }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-[rgba(26,15,8,0.05)]"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} className="text-[#1A0F08]" />
          </button>
          <span className="text-[13px] font-semibold text-[#1A0F08] truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
            Seat & Mrahba
          </span>
        </div>

        <main className="flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
