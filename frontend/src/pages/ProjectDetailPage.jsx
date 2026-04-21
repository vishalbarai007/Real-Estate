import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Check, Phone } from 'lucide-react';
import api from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${slug}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const scrollGallery = (direction) => {
    if (!galleryRef.current) return;
    const scrollAmount = galleryRef.current.offsetWidth * 0.8;
    galleryRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-lodha-white">
        <Loader2 className="animate-spin text-lodha-gold w-12 h-12" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-lodha-white">
        <h2 className="text-3xl font-serif text-lodha-black mb-4">Project Not Found</h2>
        <Link
          to="/projects"
          className="text-xs font-sans tracking-[0.2em] uppercase border-b border-lodha-black pb-1 hover:text-lodha-gold hover:border-lodha-gold transition-colors"
        >
          Back to All Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-lodha-white">
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: project.heroImage
              ? `url('${project.heroImage}')`
              : "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-white/70 text-xs font-sans tracking-[0.2em] uppercase mb-8 hover:text-lodha-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Projects</span>
            </Link>

            <div className="flex items-center space-x-3 text-lodha-gold mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase">{project.location}</span>
            </div>

            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-light text-shadow-md mb-4">
              {project.name}
            </h1>

            {project.tagline && (
              <p className="text-gray-300 font-sans text-lg md:text-xl max-w-2xl">{project.tagline}</p>
            )}
          </motion.div>
        </div>

        {/* Status badge */}
        <div className="absolute top-28 right-6 md:right-12 z-10">
          <motion.span
            className="bg-lodha-gold text-lodha-black text-[10px] font-sans tracking-widest uppercase px-5 py-2.5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {project.status}
          </motion.span>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans block mb-6">Overview</span>
              <div className="h-[1px] w-16 bg-lodha-gold mb-8"></div>
              <p className="text-gray-700 font-sans text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans block mb-6">
                  Key Details
                </span>
                <div className="h-[1px] w-16 bg-lodha-gold mb-8"></div>
                <div className="grid grid-cols-2 gap-6">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="border-l-2 border-lodha-gold/30 pl-4">
                      <span className="block text-xs font-sans tracking-widest uppercase text-gray-400 mb-1">
                        {highlight.label}
                      </span>
                      <span className="block text-lg font-serif text-lodha-black">{highlight.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Gallery</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">Visual Story</h2>
            </motion.div>

            {/* Horizontal scroll gallery */}
            <div className="relative">
              <div
                ref={galleryRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[50vh] md:h-[60vh] snap-center overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                      style={{ backgroundImage: `url('${image}')` }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Navigation arrows */}
              {project.gallery.length > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    onClick={() => scrollGallery('left')}
                    className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-lodha-black hover:text-lodha-black transition-colors text-gray-400"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollGallery('right')}
                    className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-lodha-black hover:text-lodha-black transition-colors text-gray-400"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── AMENITIES ─── */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-20 md:py-28 bg-lodha-white">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Lifestyle</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">World-Class Amenities</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {project.amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-5 border border-gray-100 hover:border-lodha-gold/30 transition-colors duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Check className="w-4 h-4 text-lodha-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans text-gray-700 group-hover:text-lodha-black transition-colors">
                    {amenity}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FLOOR PLANS ─── */}
      {project.floorPlans && project.floorPlans.length > 0 && (
        <section className="py-20 md:py-28 bg-[#F9F9F9]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lodha-gold uppercase tracking-[0.3em] text-xs font-sans">Plans</span>
              <h2 className="text-4xl md:text-5xl font-serif text-lodha-black mt-4">Floor Plans</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {project.floorPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 border border-gray-100 group hover:shadow-lg transition-shadow duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-64 overflow-hidden mb-4">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-center font-serif text-lodha-black text-lg">{plan.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ENQUIRY CTA ─── */}
      <section className="py-24 bg-lodha-black text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
              Interested in <span className="text-lodha-gold italic">{project.name}</span>?
            </h2>
            <p className="text-gray-400 font-sans max-w-xl mx-auto mb-10">
              Schedule a site visit or request a callback from our team to learn more about this development.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase border border-lodha-gold text-lodha-gold px-10 py-4 hover:bg-lodha-gold hover:text-lodha-black transition-all duration-300">
                <Phone className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>
              <Link
                to="/projects"
                className="inline-block text-xs font-sans tracking-[0.2em] uppercase border border-gray-600 text-gray-400 px-10 py-4 hover:border-white hover:text-white transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
