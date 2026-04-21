import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image (Using reliable luxury architecture image from Unsplash) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-32 md:pb-40 px-6 md:px-12 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="block text-white uppercase tracking-[0.3em] text-xs font-sans mb-4 border-l-2 border-lodha-gold pl-4">
            India's No. 1 Real Estate Developer
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-light leading-tight max-w-4xl text-shadow-md">
            The Finest Developments <br/> in the World
          </h1>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/70 text-xs tracking-[0.2em] mb-2 font-sans uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 w-full h-full bg-white"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
