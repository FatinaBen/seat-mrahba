'use client';

import { use } from 'react';
import { useAdmin } from '@/lib/admin/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EventWizard from '@/components/admin/EventWizard';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getEvent, hydrated } = useAdmin();
  const router = useRouter();
  const event = getEvent(id);

  useEffect(() => {
    // N'attendre `hydrated` évite de rebondir vers la liste sur un rechargement
    // direct (fréquent sur mobile) : sans ça, l'événement paraît "introuvable"
    // le temps que le localStorage soit lu.
    if (hydrated && !event) router.replace('/admin/events');
  }, [hydrated, event, router]);

  if (!event) return null;

  return <EventWizard event={event} />;
}
