'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Event, BuilderStepKey } from './types';
import { createDefaultEvent, markStepComplete } from './utils';

const STORAGE_KEY = 'seat-mrahba-admin-events';

interface AdminStore {
  events: Event[];
  createEvent: () => Event;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  duplicateEvent: (id: string) => Event;
  getEvent: (id: string) => Event | undefined;
  completeStep: (eventId: string, step: BuilderStepKey) => void;
  publishEvent: (id: string) => void;
}

const AdminContext = createContext<AdminStore | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEvents(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  const createEvent = useCallback((): Event => {
    const event = createDefaultEvent();
    setEvents(prev => [event, ...prev]);
    return event;
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    setEvents(prev =>
      prev.map(e => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e)
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const duplicateEvent = useCallback((id: string): Event => {
    const original = events.find(e => e.id === id);
    if (!original) throw new Error('Event not found');
    const { generateId } = require('./utils');
    const copy: Event = {
      ...original,
      id: generateId(),
      name: `${original.name} (copie)`,
      status: 'draft',
      builderSteps: original.builderSteps.map(s => ({ ...s })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEvents(prev => [copy, ...prev]);
    return copy;
  }, [events]);

  const getEvent = useCallback((id: string) => {
    return events.find(e => e.id === id);
  }, [events]);

  const completeStep = useCallback((eventId: string, step: BuilderStepKey) => {
    setEvents(prev =>
      prev.map(e => e.id === eventId ? markStepComplete(e, step) : e)
    );
  }, []);

  const publishEvent = useCallback((id: string) => {
    setEvents(prev =>
      prev.map(e => e.id === id ? { ...e, status: 'published', updatedAt: new Date().toISOString() } : e)
    );
  }, []);

  return (
    <AdminContext.Provider value={{ events, createEvent, updateEvent, deleteEvent, duplicateEvent, getEvent, completeStep, publishEvent }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminStore {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
