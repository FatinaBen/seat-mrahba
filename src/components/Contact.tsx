'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Share2, Send, CheckCircle } from 'lucide-react';

const eventTypes = [
  'Mariage',
  'Fiançailles',
  'EVJF',
  'Baby Shower',
  'Anniversaire',
  "Événement d'entreprise",
  'Autre',
];

const inputClass = 'w-full px-4 py-3 rounded-xl text-[14px] text-[#1A0F08] focus:outline-none transition-all placeholder:text-[#C4B08A]'
  + ' border border-[rgba(232,196,154,0.35)] bg-[#F8F4EF]'
  + ' focus:border-[#B85C28] focus:bg-white focus:ring-1 focus:ring-[#B85C28]/15';
const labelClass = 'block text-[10px] font-medium text-[#8A7235] mb-1.5 uppercase tracking-[0.18em]';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Contact
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-bold text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
          >
            Parlons de votre événement
          </h2>
          <p className="text-base text-[#9B7A56] max-w-md mx-auto leading-relaxed">
            Partagez votre projet. Nous vous répondrons sous 24h avec une proposition personnalisée.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div
              className="rounded-2xl p-7 text-white flex-1"
              style={{ background: '#1A0F08' }}
            >
              <h3
                className="text-xl font-semibold mb-7 text-white"
                style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
              >
                Restons en contact
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'bonjour@seat-mrahba.com' },
                  { icon: Phone, label: 'WhatsApp', value: '+212 6 00 00 00 00' },
                  { icon: Share2, label: 'Instagram', value: '@seat.mrahba' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,196,154,0.1)' }}>
                      <Icon size={16} color="#CF9068" />
                    </div>
                    <div>
                      <p className="text-[#9B7A56] text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white text-[13px] font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/8">
                <p className="text-[#9B7A56] text-[13px] leading-relaxed">
                  Réponse garantie sous{' '}
                  <span className="text-[#E8C49A] font-medium">24 heures</span>.
                  Pour les urgences, WhatsApp.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-7 text-white"
              style={{ background: 'linear-gradient(135deg, #B85C28, #8A7235)' }}
            >
              <p className="text-white/60 text-lg mb-3">✦</p>
              <p className="font-semibold text-[17px] mb-2" style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}>
                Devis gratuit & sans engagement
              </p>
              <p className="text-white/65 text-[13px] leading-relaxed">
                Chaque projet est unique. Partagez votre vision et recevez une proposition sur mesure.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[480px] border"
                style={{ borderColor: 'rgba(232,196,154,0.2)', boxShadow: '0 2px 28px rgba(184,92,40,0.06)' }}
              >
                <CheckCircle className="w-14 h-14 text-[#8A7235] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-2xl font-semibold text-[#1A0F08] mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Times New Roman, serif' }}
                >
                  Message envoyé !
                </h3>
                <p className="text-[#9B7A56] max-w-sm leading-relaxed mb-8 text-[14.5px]">
                  Merci pour votre demande. Nous vous contacterons dans les 24 heures avec une proposition personnalisée.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[13px] text-[#8A7235] underline underline-offset-4 hover:text-[#B85C28] transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-7 lg:p-8 space-y-5 border"
                style={{ borderColor: 'rgba(232,196,154,0.2)', boxShadow: '0 2px 28px rgba(184,92,40,0.06)' }}
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nom complet <span className="text-[#B85C28]">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-[#B85C28]">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Téléphone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+212 6 00 00 00 00" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Type d&apos;événement <span className="text-[#B85C28]">*</span></label>
                    <select name="eventType" value={form.eventType} onChange={handleChange} required className={inputClass}>
                      <option value="">Choisir...</option>
                      {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Date de l&apos;événement</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Nombre d&apos;invités</label>
                    <input name="guests" type="number" value={form.guests} onChange={handleChange} placeholder="Ex: 150" min="1" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Votre message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre événement, vos envies, vos questions..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-4 px-8 rounded-full text-[14px] font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  style={{ background: '#B85C28', boxShadow: '0 4px 20px rgba(184,92,40,0.3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#A0501F')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#B85C28')}
                >
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </button>

                <p className="text-center text-[11px] text-[#9B7A56]">
                  ✦ Gratuit · Sans engagement · Réponse sous 24h
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
