import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConstructionUpdates({ data }) {
  if (!data || data.length === 0) return null;
  
  return (
    <section className="py-24 bg-slate-50" id="updates">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Progress</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-secondary">Construction Updates</h3>
        </div>
        <div className="space-y-6">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="bg-green-100 text-green-600 p-2 rounded-full flex-shrink-0">
                <Check size={20} />
              </div>
              <p className="text-lg text-slate-700 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
