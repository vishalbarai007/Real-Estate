import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Questions?</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-secondary">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-slate-200 bg-white'}`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-slate-800 text-lg">{item.question}</span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-primary' : ''}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 font-light leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
