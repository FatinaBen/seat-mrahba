'use client';

import { useEffect } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const { createEvent } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    const ev = createEvent();
    router.replace(`/admin/events/${ev.id}`);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-[13px] text-[#9B7A56]">Création en cours…</div>
    </div>
  );
}
