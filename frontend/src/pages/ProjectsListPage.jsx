import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, MapPin } from 'lucide-react';
import api from '../services/api';

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'icons', label: 'Icons' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
];

const ProjectsListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-lodha-white">
        <Loader2 className="animate-spin text-lodha-gold w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="bg-lodha-white">
      {/* ─── HERO ─── */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.span
            className="block text-white uppercase tracking-[0.3em] text-xs font-sans mb-6 border-b border-lodha-gold pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Portfolio
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-7xl font-serif font-light text-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-gray-300 font-sans text-lg mt-6 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Explore our iconic developments across the globe.
          </motion.p>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <section className="py-8 border-b border-gray-100 sticky top-[72px] bg-lodha-white/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`text-xs font-sans tracking-[0.15em] uppercase px-6 py-3 border transition-all duration-300 ${
                  activeFilter === cat.key
                    ? 'bg-lodha-black text-white border-lodha-black'
                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-lodha-black hover:text-lodha-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECT GRID ─── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 font-sans text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id || project.slug}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/projects/${project.slug}`} className="group block">
                      {/* Image */}
                      <div className="relative h-[50vh] md:h-[55vh] overflow-hidden mb-6">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
                          style={{
                            backgroundImage: project.heroImage
                              ? `url('${project.heroImage}')`
                              : "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>

                        {/* Status badge */}
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-sm text-lodha-black text-[10px] font-sans tracking-widest uppercase px-4 py-2">
                            {project.status}
                          </span>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-6 right-6">
                          <span className="bg-lodha-gold/90 text-white text-[10px] font-sans tracking-widest uppercase px-4 py-2">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-lodha-gold">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs font-sans tracking-widest uppercase">
                            {project.location}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif text-lodha-black group-hover:text-lodha-gold transition-colors duration-300">
                          {project.name}
                        </h3>
                        {project.tagline && (
                          <p className="text-sm font-sans text-gray-500">{project.tagline}</p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsListPage;
