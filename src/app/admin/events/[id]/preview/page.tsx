'use client';

import { use } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PhonePreview from '@/components/admin/PhonePreview';
import { ArrowLeft, Edit3 } from 'lucide-react';

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getEvent } = useAdmin();
  const router = useRouter();
  const event = getEvent(id);

  useEffect(() => {
    if (!event) router.replace('/admin/events');
  }, [event, router]);

  if (!event) return null;

  return (
    <div className="min-h-full p-8" style={{ background: '#F5F2EE' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/admin/events/${id}`)}
              className="flex items-center gap-1.5 text-[12px] text-[#9B7A56] hover:text-[#1A0F08] transition-colors"
            >
              <ArrowLeft size={13} />
              Retour
            </button>
            <div className="w-px h-4 bg-[rgba(26,15,8,0.1)]" />
            <div>
              <p className="text-[11px] text-[#9B7A56]">Aperçu de</p>
              <h1 className="text-[14px] font-semibold text-[#1A0F08]">{event.name || 'Sans titre'}</h1>
            </div>
          </div>
          <button
            onClick={() => router.push(`/admin/events/${id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium border transition-colors hover:bg-white"
            style={{ borderColor: 'rgba(26,15,8,0.12)', color: '#5A3C1E' }}
          >
            <Edit3 size={13} />
            Modifier
          </button>
        </div>

        {/* Phone */}
        <div className="flex justify-center">
          <PhonePreview event={event} />
        </div>
      </div>
    </div>
  );
}
