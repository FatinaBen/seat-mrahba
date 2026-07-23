'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Comment fonctionne le QR code ?',
    answer: "Le QR code est unique et lié à votre page web personnalisée. Vos invités pointent simplement l'appareil photo de leur smartphone et accèdent immédiatement à toutes les informations — sans application à installer.",
  },
  {
    question: 'Peut-on modifier les informations après la création ?',
    answer: "Absolument. Nous pouvons modifier le contenu de votre page à tout moment avant et pendant votre événement. Changement de lieu, ajout d'un programme, modification du menu — tout est mis à jour en quelques heures, sans changer le QR code.",
  },
  {
    question: "Les invités doivent-ils installer une application ?",
    answer: "Non, aucune application n'est nécessaire. La page est accessible directement via le navigateur web après un simple scan, sur tous les appareils — iPhone, Android, tablettes.",
  },
  {
    question: 'Combien de temps pour créer la page ?',
    answer: "Une fois toutes les informations reçues, nous livrons votre page en 48 heures ouvrées. Pour les formules Signature avec personnalisations avancées, comptez 5 à 7 jours. Service express disponible sur demande.",
  },
  {
    question: "La page est-elle disponible en plusieurs langues ?",
    answer: "Oui, nous créons votre page en français, arabe, anglais ou en combinaison selon vos besoins. Idéal pour les mariages mixtes ou internationaux.",
  },
  {
    question: "Que se passe-t-il après l'événement ?",
    answer: "Votre page reste accessible pendant 30 jours après l'événement. À l'issue de cette période, vous pouvez prolonger l'accès ou télécharger le contenu — tout est convenu en amont.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-28 md:py-36" style={{ background: '#F8F4EF' }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#8A7235] mb-6">
            Questions fréquentes
          </p>
          <h2
            className="text-[2.2rem] sm:text-4xl text-[#1A0F08] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Vous avez des questions ?
          </h2>
          <p className="text-base text-[#9B7A56] leading-relaxed">
            Et si vous n&apos;en trouvez pas la réponse ici, écrivez-nous directement.
          </p>
        </motion.div>

        <div className="space-y-2.5 mb-12">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`rounded-xl overflow-hidden transition-all ${
                openIndex === i
                  ? 'bg-white border border-[#B85C28]/20 shadow-sm'
                  : 'bg-white border border-[rgba(232,196,154,0.2)]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className={`font-medium pr-4 text-[14.5px] leading-snug transition-colors ${
                  openIndex === i ? 'text-[#B85C28]' : 'text-[#1A0F08] group-hover:text-[#B85C28]'
                }`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i ? 'bg-[#B85C28]' : 'bg-[#E8C49A]/40'
                }`}>
                  {openIndex === i ? (
                    <Minus className="w-3 h-3 text-white" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-3 h-3 text-[#B85C28]" strokeWidth={2.5} />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26 }}
                  >
                    <div className="px-5 pb-5 text-[13.5px] text-[#9B7A56] leading-relaxed border-t border-[#E8C49A]/20 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-10 rounded-2xl"
          style={{ background: '#1A0F08' }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#CF9068] mb-3">
            Une autre question ?
          </p>
          <h3
            className="text-xl font-semibold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Nous sommes là pour vous répondre
          </h3>
          <a
            href="#contact"
            className="inline-block px-7 py-3 rounded-full text-[13px] font-medium text-[#1A0F08] bg-[#E8C49A] hover:bg-white active:scale-[0.97] transition-all"
          >
            Nous contacter
          </a>
        </motion.div>

      </div>
    </section>
  );
}
