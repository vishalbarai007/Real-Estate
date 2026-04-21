import { motion } from 'framer-motion';

export default function ProjectOverview({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 bg-white" id="overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Project Overview</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-secondary">Discover Your Dream Home</h3>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-50 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-4xl mx-auto"
        >
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            {data.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
