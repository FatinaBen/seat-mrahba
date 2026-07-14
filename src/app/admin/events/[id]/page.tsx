'use client';

import { use } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EventWizard from '@/components/admin/EventWizard';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getEvent } = useAdmin();
  const router = useRouter();
  const event = getEvent(id);

  useEffect(() => {
    if (!event) router.replace('/admin/events');
  }, [event, router]);

  if (!event) return null;

  return <EventWizard event={event} />;
}
