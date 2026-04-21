import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Loader2, Play, Quote } from 'lucide-react';
import api from '../services/api';

// Helper to extract YouTube video ID from various URL formats
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Animated counter component
const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="block text-4xl md:text-5xl lg:text-6xl font-serif text-lodha-gold font-light mb-2">
        {value}
      </span>
      <span className="text-sm font-sans tracking-widest uppercase text-gray-500">
        {label}
      </span>
    </motion.div>
  );
};

// Text testimonial card
const TextTestimonial = ({ testimonial, index }) => (
  <motion.div
    className="bg-white p-8 md:p-10 border border-gray-100 relative group hover:shadow-xl transition-shadow duration-500"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.1 }}
  >
    <Quote className="w-8 h-8 text-lodha-gold/30 mb-6" />
    <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed mb-8 italic">
      "{testimonial.text}"
    </p>
    <div className="flex items-center space-x-4">
      {testimonial.avatar && (
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        <h4 className="font-serif text-lodha-black text-base">{testimonial.name}</h4>
        <p className="text-xs font-sans text-gray-500 tracking-wider uppercase">{testimonial.designation}</p>
      </div>
    </div>
    {/* Gold accent line */}
    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-lodha-gold group-hover:w-full transition-all duration-700"></div>
  </motion.div>
);

// Video testimonial card
const VideoTestimonial = ({ testimonial, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeId(testimonial.youtubeUrl);

  return (
    <motion.div
      className="relative overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {isPlaying && videoId ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={testimonial.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="relative cursor-pointer"
          style={{ paddingBottom: '56.25%' }}
          onClick={() => setIsPlaying(true)}
        >
          {/* YouTube thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
            style={{
              backgroundImage: videoId
                ? `url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg')`
                : "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')"
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h4 className="font-serif text-white text-lg">{testimonial.name}</h4>
            <p className="text-xs font-sans text-gray-300 tracking-wider uppercase">{testimonial.designation}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const OurImpactPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/content');
        setData(response.data.ourImpact);
      } catch (error) {
        console.error('Error fetching Our Impact data:', error);
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

  const textTestimonials = (data.testimonials || []).filter((t) => t.type === 'text');
  const videoTestimonials = (data.testimonials || []).filter((t) => t.type === 'video');

  return (
    <div className="bg-lodha-white">
      {/* ─── HERO ─── */}
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
            Building a Better World
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
      </section>

      {/* ─── STATS ─── */}
      {data.stats && data.stats.length > 0 && (
        <section className="py-20 md:py-28 bg-lodha-white border-b border-gray-100">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">By The Numbers</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">Our Impact in Numbers</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
              {data.stats.map((stat, index) => (
                <AnimatedStat key={index} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── VIDEO TESTIMONIALS ─── */}
      {videoTestimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-[#F9F9F9]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Stories</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">Hear From Our Residents</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {videoTestimonials.map((testimonial, index) => (
                <VideoTestimonial key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TEXT TESTIMONIALS ─── */}
      {textTestimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-lodha-white">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">What People Say</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {textTestimonials.map((testimonial, index) => (
                <TextTestimonial key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-24 bg-lodha-black text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">
              Join <span className="text-lodha-gold italic">Our Community</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl mx-auto mb-10">
              Experience the difference of living in a Lodha home. Connect with us to learn more.
            </p>
            <a
              href="/projects"
              className="inline-block text-xs font-sans tracking-[0.2em] uppercase border border-lodha-gold text-lodha-gold px-10 py-4 hover:bg-lodha-gold hover:text-lodha-black transition-all duration-300"
            >
              Explore Projects
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurImpactPage;
