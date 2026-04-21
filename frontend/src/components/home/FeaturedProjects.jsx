import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Lodha Altamount',
    location: 'Altamount Road, Mumbai',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Park',
    location: 'Worli, Mumbai',
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Lodha World Towers',
    location: 'Lower Parel, Mumbai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  },
];

const FeaturedProjects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-24 bg-lodha-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-lodha-black"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Iconic Developments
          </motion.h2>
          <motion.a 
            href="/projects" 
            className="hidden md:inline-block text-xs font-sans tracking-[0.2em] uppercase border-b border-lodha-black pb-1 hover:text-lodha-gold hover:border-lodha-gold transition-colors"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            View All Projects
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative h-[60vh] overflow-hidden mb-6">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})`, y: index === 1 ? y : 0 }} 
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-sans tracking-widest text-lodha-gold uppercase">{project.location}</span>
                <h3 className="text-2xl font-serif text-lodha-black group-hover:text-lodha-gold transition-colors">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="/projects" className="inline-block text-xs font-sans tracking-[0.2em] uppercase border-b border-lodha-black pb-1 hover:text-lodha-gold">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
