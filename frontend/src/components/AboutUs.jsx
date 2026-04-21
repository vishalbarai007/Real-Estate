import { motion } from 'framer-motion';

export default function AboutUs({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 bg-slate-900 text-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Legacy</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6">About Us</h3>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {data.text}
            </p>
            <div className="mt-8">
              <button className="text-primary hover:text-white transition-colors font-semibold flex items-center space-x-2">
                <span>Read Full Story</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Building" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
