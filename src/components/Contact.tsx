'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Share2, Send } from 'lucide-react';

const eventTypes = [
  'Mariage',
  'Fiançailles',
  'EVJF',
  'Baby Shower',
  'Anniversaire',
  'Événement d\'entreprise',
  'Autre',
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#FBF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Contact
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Parlons de votre événement
          </h2>
          <p className="text-lg text-[#6B4C2A] max-w-2xl mx-auto">
            Dites-nous tout sur votre projet. Nous vous répondrons sous 24h avec une proposition personnalisée.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-[#2C1A0E] rounded-3xl p-8 text-white flex-1">
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Restons en contact
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#C16D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D59667]" />
                  </div>
                  <div>
                    <p className="text-[#C5B691] text-xs">Email</p>
                    <p className="text-white text-sm">bonjour@seat-mrahba.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#C16D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D59667]" />
                  </div>
                  <div>
                    <p className="text-[#C5B691] text-xs">WhatsApp</p>
                    <p className="text-white text-sm">+212 6 00 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#C16D2D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-[#D59667]" />
                  </div>
                  <div>
                    <p className="text-[#C5B691] text-xs">Instagram</p>
                    <p className="text-white text-sm">@seat.mrahba</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[#C5B691] text-sm leading-relaxed">
                  Nous répondons à toutes les demandes sous{' '}
                  <span className="text-[#D59667] font-semibold">24 heures</span>. Pour les urgences,
                  contactez-nous directement sur WhatsApp.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#C16D2D] to-[#8B763A] rounded-3xl p-8 text-white">
              <p className="text-3xl mb-3">✦</p>
              <p className="font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Devis gratuit & sans engagement
              </p>
              <p className="text-white/80 text-sm">
                Chaque projet est unique. Partagez votre vision et recevez une proposition sur mesure.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#ECC49D]/20 text-center h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-6">✦</div>
                <h3
                  className="text-2xl font-bold text-[#2C1A0E] mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Message envoyé !
                </h3>
                <p className="text-[#6B4C2A] max-w-sm">
                  Merci pour votre demande. Nous vous contacterons dans les 24 heures avec une proposition personnalisée.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-lg border border-[#ECC49D]/20 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Nom complet *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors placeholder:text-[#C5B691]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors placeholder:text-[#C5B691]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+212 6 00 00 00 00"
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors placeholder:text-[#C5B691]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Type d&apos;événement *
                    </label>
                    <select
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors"
                    >
                      <option value="">Choisir...</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Date de l&apos;événement
                    </label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                      Nombre d&apos;invités
                    </label>
                    <input
                      name="guests"
                      type="number"
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="Ex: 150"
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors placeholder:text-[#C5B691]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B4C2A] mb-2 uppercase tracking-wider">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre événement, vos envies, vos questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#ECC49D]/50 bg-[#FBF6F0] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C16D2D] transition-colors resize-none placeholder:text-[#C5B691]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C16D2D] text-white py-4 px-8 rounded-full font-medium hover:bg-[#BC5A2F] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
