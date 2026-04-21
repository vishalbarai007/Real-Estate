import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NearbyConnectivity({ data }) {
  if (!data || data.length === 0) return null;
  
  return (
    <section className="py-24 bg-slate-50" id="connectivity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Location</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-secondary">Nearby Connectivity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <p className="text-slate-700 font-medium">{item.place}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
