import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PurposeSection = () => {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        {/* Card 1 */}
        <motion.div 
          className="group relative h-[80vh] md:h-[90vh] overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lodha-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-14">
            <h3 className="text-white text-3xl md:text-5xl font-serif mb-4">Our Story</h3>
            <p className="text-gray-300 font-sans text-sm tracking-wide leading-relaxed mb-8 max-w-sm">
              Discover the legacy of excellence and trust that has shaped India's finest developments.
            </p>
            <Link to="/our-story" className="inline-flex items-center text-white text-xs font-sans tracking-[0.2em] uppercase border-b border-white hover:text-lodha-gold hover:border-lodha-gold transition-colors pb-1 w-max">
              Discover More
            </Link>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="group relative h-[80vh] md:h-[90vh] overflow-hidden md:mt-24" // Staggered layout 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lodha-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-14">
            <h3 className="text-white text-3xl md:text-5xl font-serif mb-4">Our Impact</h3>
            <p className="text-gray-300 font-sans text-sm tracking-wide leading-relaxed mb-8 max-w-sm">
              Commitment to sustainability and building a better life for our communities.
            </p>
            <Link to="/our-impact" className="inline-flex items-center text-white text-xs font-sans tracking-[0.2em] uppercase border-b border-white hover:text-lodha-gold hover:border-lodha-gold transition-colors pb-1 w-max">
              Explore Sustainability
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PurposeSection;
