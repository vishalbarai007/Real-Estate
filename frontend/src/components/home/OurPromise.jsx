import React from 'react';
import { motion } from 'framer-motion';

const OurPromise = () => {
  return (
    <section className="py-24 md:py-40 bg-lodha-white flex items-center justify-center">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <motion.h2 
          className="text-4xl md:text-6xl font-serif font-light text-lodha-black leading-snug"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          Whether it’s giving India some of its most iconic addresses, or crafting some of the world’s most coveted residences... our core promise has remained constant: <span className="text-lodha-gold italic">Building a Better Life.</span>
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="mt-16 flex justify-center"
        >
           <div className="h-24 w-[1px] bg-lodha-gold"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPromise;
