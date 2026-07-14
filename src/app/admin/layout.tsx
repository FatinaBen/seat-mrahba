import type { Metadata } from 'next';
import { AdminProvider } from '@/lib/admin/store';
import Sidebar from '@/components/admin/Sidebar';

export const metadata: Metadata = {
  title: 'Administration — Seat & Mrahba',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="flex h-screen overflow-hidden" style={{ background: '#F5F2EE', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminProvider>
  );
}
