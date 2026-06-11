'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Comment fonctionne le QR code ?',
    answer: "Le QR code est un code scannable unique lié à votre page web personnalisée. Vos invités n'ont qu'à ouvrir l'appareil photo de leur smartphone et pointer vers le code. En une seconde, ils accèdent à toutes les informations de votre événement, sans application à installer.",
  },
  {
    question: 'Peut-on modifier les informations après la création de la page ?',
    answer: "Absolument. Nous pouvons modifier le contenu de votre page à tout moment avant et pendant votre événement. Changement de lieu de dernière minute, ajout d'un programme, modification du menu — tout peut être mis à jour rapidement, sans changer le QR code.",
  },
  {
    question: "Les invités doivent-ils installer une application ?",
    answer: "Non, aucune application n'est nécessaire. La page est accessible directement via le navigateur web de votre smartphone après un simple scan du QR code. Cela fonctionne sur tous les appareils — iPhone, Android, tablettes — sans aucune friction.",
  },
  {
    question: 'Combien de temps faut-il pour créer la page ?',
    answer: "Une fois que vous nous avez transmis toutes les informations nécessaires, nous livrons votre page en général sous 48 à 72 heures ouvrées. Pour les formules Signature avec des personnalisations avancées, comptez 5 à 7 jours. Nous proposons également un service express sur demande.",
  },
  {
    question: "La page est-elle accessible en plusieurs langues ?",
    answer: "Oui, nous pouvons créer votre page en français, arabe, anglais ou dans une combinaison de langues selon vos besoins. Idéal pour les mariages mixtes ou internationaux où les invités viennent de différents pays.",
  },
  {
    question: "Que se passe-t-il après l'événement ?",
    answer: "Votre page reste accessible pendant 30 jours après l'événement. Cela permet à vos invités de retrouver les photos et souvenirs. À l'issue de cette période, vous pouvez choisir de prolonger l'accès, de télécharger le contenu ou de fermer la page. Tout cela est discuté en amont.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="faq" className="py-24 bg-[#F7EEE3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[#8B763A] mb-4">
            ✦ Questions fréquentes
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Vous avez des questions ?
          </h2>
          <p className="text-lg text-[#6B4C2A]">
            Nous avons les réponses. Et si vous n&apos;en trouvez pas, contactez-nous directement.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-[#ECC49D]/30 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FBF6F0] transition-colors"
              >
                <span className="font-semibold text-[#2C1A0E] pr-4 text-sm md:text-base">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ECC49D]/30 flex items-center justify-center">
                  {openIndex === i ? (
                    <Minus className="w-4 h-4 text-[#C16D2D]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#C16D2D]" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[#6B4C2A] text-sm leading-relaxed border-t border-[#ECC49D]/20 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
