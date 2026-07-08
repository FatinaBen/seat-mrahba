'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Comment fonctionne le QR code ?',
    answer: "Le QR code est un code scannable unique lié à votre page web personnalisée. Vos invités n'ont qu'à ouvrir l'appareil photo de leur smartphone et le pointer vers le code. En une seconde, ils accèdent à toutes les informations de votre événement, sans application à installer.",
  },
  {
    question: 'Peut-on modifier les informations après la création ?',
    answer: "Absolument. Nous pouvons modifier le contenu de votre page à tout moment avant et pendant votre événement. Changement de lieu de dernière minute, ajout d'un programme, modification du menu — tout est mis à jour en quelques heures, sans changer le QR code.",
  },
  {
    question: "Les invités doivent-ils installer une application ?",
    answer: "Non, aucune application n'est nécessaire. La page est accessible directement via le navigateur web après un simple scan. Cela fonctionne sur tous les appareils — iPhone, Android, tablettes — sans aucune friction.",
  },
  {
    question: 'Combien de temps pour créer la page ?',
    answer: "Une fois toutes les informations reçues, nous livrons votre page en 48 à 72 heures ouvrées. Pour les formules Signature avec personnalisations avancées, comptez 5 à 7 jours. Nous proposons également un service express sur demande.",
  },
  {
    question: "La page est-elle disponible en plusieurs langues ?",
    answer: "Oui, nous créons votre page en français, arabe, anglais ou en combinaison selon vos besoins. Idéal pour les mariages mixtes ou internationaux où les invités viennent de différents pays.",
  },
  {
    question: "Que se passe-t-il après l'événement ?",
    answer: "Votre page reste accessible pendant 30 jours après l'événement, permettant à vos invités de retrouver photos et souvenirs. À l'issue de cette période, vous pouvez prolonger l'accès ou télécharger le contenu — tout est discuté en amont.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F7EEE3]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#8B763A] mb-5">
            <span>✦</span> FAQ <span>✦</span>
          </span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Vous avez des questions ?
          </h2>
          <p className="text-[17px] text-[#6B4C2A] leading-relaxed">
            Nous avons les réponses. Et si vous n&apos;en trouvez pas, écrivez-nous directement.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3 mb-14">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`rounded-2xl overflow-hidden shadow-sm transition-shadow ${
                openIndex === i
                  ? 'border border-[#C16D2D]/30 bg-white shadow-md'
                  : 'border border-[#ECC49D]/30 bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#FBF6F0] transition-colors group"
                aria-expanded={openIndex === i}
              >
                <span className={`font-semibold pr-4 text-[14.5px] sm:text-[15.5px] leading-snug transition-colors ${
                  openIndex === i ? 'text-[#C16D2D]' : 'text-[#2C1A0E] group-hover:text-[#C16D2D]'
                }`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i ? 'bg-[#C16D2D]' : 'bg-[#ECC49D]/40'
                }`}>
                  {openIndex === i ? (
                    <Minus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-[#C16D2D]" strokeWidth={2.5} />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#6B4C2A] text-[14.5px] leading-relaxed border-t border-[#ECC49D]/25 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#2C1A0E] rounded-3xl p-8 text-center"
        >
          <p className="text-[#D59667] text-sm tracking-widest uppercase mb-3">✦ Une autre question ?</p>
          <h3
            className="text-xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Nous sommes là pour vous répondre
          </h3>
          <p className="text-[#C5B691] text-sm mb-6 leading-relaxed max-w-sm mx-auto">
            Envoyez-nous votre message, nous vous répondons sous 24 heures ouvrées.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#C16D2D] text-white px-8 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-[#BC5A2F] active:scale-[0.97] transition-all shadow-lg"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}
