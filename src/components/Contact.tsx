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

const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-[#ECC49D]/60 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] focus:bg-white focus:ring-1 focus:ring-[#C16D2D]/20 transition-all placeholder:text-[#C5B691]';
const labelClass = 'block text-[11px] font-semibold text-[#6B4C2A] mb-1.5 uppercase tracking-[0.12em]';

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
    <section id="contact" className="py-24 md:py-32 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> Contact <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Parlons de votre événement
          </h2>
          <p className="text-[17px] text-[#6B4C2A] max-w-xl mx-auto leading-relaxed">
            Dites-nous tout sur votre projet. Nous vous répondrons sous 24h avec une proposition personnalisée.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact panel */}
            <div
              className="rounded-3xl p-7 text-white flex-1"
              style={{ background: 'linear-gradient(145deg, #2C1A0E, #3D2510)' }}
            >
              <h3
                className="text-2xl font-bold mb-7"
                style={{ fontFamily: 'Playfair Display, serif' }}
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
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(193,109,45,0.2)' }}>
                      <Icon className="w-4.5 h-4.5 text-[#D59667]" size={18} />
                    </div>
                    <div>
                      <p className="text-[#C5B691] text-[11px] uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-7 border-t border-white/10">
                <p className="text-[#C5B691] text-sm leading-relaxed">
                  Réponse garantie sous{' '}
                  <span className="text-[#D59667] font-semibold">24 heures</span>.
                  Pour les urgences, contactez-nous sur WhatsApp.
                </p>
              </div>
            </div>

            {/* Devis card */}
            <div
              className="rounded-3xl p-7 text-white"
              style={{ background: 'linear-gradient(135deg, #C16D2D, #8B763A)' }}
            >
              <p className="text-white/70 text-2xl mb-3">✦</p>
              <p className="font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Devis gratuit & sans engagement
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                Chaque projet est unique. Partagez votre vision et recevez une proposition sur mesure adaptée à votre événement.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 shadow-lg border border-[#ECC49D]/20 flex flex-col items-center justify-center text-center min-h-[480px]">
                <CheckCircle className="w-16 h-16 text-[#8B763A] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-2xl font-bold text-[#2C1A0E] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Message envoyé !
                </h3>
                <p className="text-[#6B4C2A] max-w-sm leading-relaxed mb-8">
                  Merci pour votre demande. Nous vous contacterons dans les 24 heures avec une proposition personnalisée.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-[#8B763A] underline underline-offset-4 hover:text-[#C16D2D] transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-7 lg:p-8 shadow-lg border border-[#ECC49D]/20 space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nom complet <span className="text-[#C16D2D]">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-[#C16D2D]">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Téléphone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+212 6 00 00 00 00" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Type d&apos;événement <span className="text-[#C16D2D]">*</span></label>
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
                  className="w-full bg-[#C16D2D] text-white py-4 px-8 rounded-full text-[15px] font-semibold hover:bg-[#BC5A2F] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </button>

                <p className="text-center text-xs text-[#8B763A]">
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
