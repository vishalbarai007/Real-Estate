import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import api from '../services/api';

const OurStoryPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/content');
        setData(response.data.ourStory);
      } catch (error) {
        console.error('Error fetching Our Story data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-lodha-white">
        <Loader2 className="animate-spin text-lodha-gold w-12 h-12" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-lodha-white">
        <p className="text-gray-500 font-sans">Content not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-lodha-white">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url('${data.heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.span
            className="block text-white uppercase tracking-[0.3em] text-xs font-sans mb-6 border-b border-lodha-gold pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Since 1980
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight text-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {data.heroTitle}
          </motion.h1>
          <motion.p
            className="text-gray-300 font-sans text-lg md:text-xl mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {data.heroSubtitle}
          </motion.p>
        </div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-white/70 text-xs tracking-[0.2em] mb-2 font-sans uppercase">Discover</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full h-full bg-lodha-gold"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-10">
              <div className="h-16 w-[1px] bg-lodha-gold"></div>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-lodha-black leading-relaxed">
              {data.introduction}
            </p>
            <div className="flex justify-center mt-10">
              <div className="h-16 w-[1px] bg-lodha-gold"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      {data.timeline && data.timeline.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">Milestones</h2>
            </motion.div>

            {/* Timeline spine */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 md:transform md:-translate-x-1/2"></div>

              {data.timeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-start md:items-center mb-20 last:mb-0 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {/* Dot on spine */}
                    <div className="absolute left-6 md:left-1/2 top-0 w-3 h-3 bg-lodha-gold rounded-full transform -translate-x-1/2 z-10 ring-4 ring-[#F9F9F9]"></div>

                    {/* Content side */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <span className="inline-block text-lodha-gold font-serif text-3xl md:text-4xl font-light mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-lodha-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-sans text-sm leading-relaxed max-w-md inline-block">
                        {item.description}
                      </p>
                    </div>

                    {/* Image side */}
                    <div className={`w-full md:w-1/2 mt-6 md:mt-0 pl-16 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                      {item.image && (
                        <div className="relative h-48 md:h-64 overflow-hidden group">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-110"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          />
                          <div className="absolute inset-0 bg-lodha-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── VISION & MISSION ─── */}
      <section className="py-24 md:py-32 bg-lodha-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans block mb-6">Our Vision</span>
              <div className="h-[1px] w-16 bg-lodha-gold mb-8"></div>
              <p className="text-lg md:text-xl font-serif font-light leading-relaxed text-gray-300">
                {data.vision}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans block mb-6">Our Mission</span>
              <div className="h-[1px] w-16 bg-lodha-gold mb-8"></div>
              <p className="text-lg md:text-xl font-serif font-light leading-relaxed text-gray-300">
                {data.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-lodha-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-lodha-black mb-6">
              Be Part of Our Legacy
            </h2>
            <p className="text-gray-600 font-sans max-w-xl mx-auto mb-10">
              Explore our iconic developments and find a home that reflects your aspirations.
            </p>
            <a
              href="/projects"
              className="inline-block text-xs font-sans tracking-[0.2em] uppercase border border-lodha-black px-10 py-4 hover:bg-lodha-black hover:text-white transition-all duration-300"
            >
              View Our Projects
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
