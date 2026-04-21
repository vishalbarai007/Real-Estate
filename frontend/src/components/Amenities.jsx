import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Amenities({ data }) {
  if (!data || data.length === 0) return null;
  
  return (
    <section className="py-24 bg-white" id="amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Lifestyle</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-secondary">Premium Amenities</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Everything you need for a comfortable and luxurious living experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-primary/30 transition-colors group"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform origin-left">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-secondary mb-2">{item.title}</h4>
              <p className="text-slate-600 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
