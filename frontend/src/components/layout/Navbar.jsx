import React, { useState, useEffect } from 'react';
import { Menu, Search, Phone, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'OUR STORY', path: '/our-story' },
    { name: 'OUR IMPACT', path: '/our-impact' },
    // We will render "OUR PROJECTS" separately to handle the dropdown
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out border-b border-white/10 ${
          isScrolled || isProjectsDropdownOpen ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span
              className={`text-3xl font-serif tracking-widest transition-colors duration-300 ${
                isScrolled || isProjectsDropdownOpen ? 'text-lodha-black' : 'text-white'
              }`}
            >
              LODHA
            </span>
            <span
              className={`text-[0.6rem] tracking-[0.3em] font-sans -mt-1 transition-colors duration-300 ${
                isScrolled || isProjectsDropdownOpen ? 'text-gray-500' : 'text-gray-300'
              }`}
            >
              BUILDING A BETTER LIFE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wider hover:text-lodha-gold transition-colors duration-300 ${
                  isScrolled || isProjectsDropdownOpen ? 'text-lodha-black' : 'text-white text-shadow-sm'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* OUR PROJECTS trigger */}
            <button
              onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
              className={`text-sm font-medium tracking-wider flex items-center gap-1 hover:text-lodha-gold transition-colors duration-300 ${
                isScrolled || isProjectsDropdownOpen ? 'text-lodha-black' : 'text-white text-shadow-sm'
              }`}
            >
              OUR PROJECTS {isProjectsDropdownOpen ? '▲' : '▼'}
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            <button
              className={`hidden md:flex items-center space-x-2 text-sm font-medium hover:text-lodha-gold transition-colors ${
                isScrolled || isProjectsDropdownOpen ? 'text-lodha-black' : 'text-white text-shadow-sm'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>ENQUIRE</span>
            </button>
            <button
              className={`hover:text-lodha-gold transition-colors ${
                isScrolled || isProjectsDropdownOpen ? 'text-lodha-black' : 'text-white text-shadow-sm'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Hamburger Icon */}
            <button
              className={`flex flex-col space-y-1.5 p-2 focus:outline-none group relative z-50`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block w-6 h-[2px] transition-all duration-300 ${isScrolled || isProjectsDropdownOpen || isMobileMenuOpen ? 'bg-lodha-black' : 'bg-white'}`}></span>
              <span className={`block w-4 h-[2px] ml-auto transition-all duration-300 ${isScrolled || isProjectsDropdownOpen || isMobileMenuOpen ? 'bg-lodha-black' : 'bg-white'} group-hover:w-6`}></span>
            </button>
          </div>
        </div>
        
        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isProjectsDropdownOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '70vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 w-full bg-[#1A1A1A] text-white overflow-hidden shadow-2xl"
            >
              <div className="container mx-auto px-6 md:px-12 py-12 h-full flex flex-col pt-16 relative">
                
                <button 
                  onClick={() => setIsProjectsDropdownOpen(false)}
                  className="absolute top-8 right-12 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6 border border-gray-600 rounded-full p-1" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 h-full max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-serif text-white mb-6 border-b border-gray-700 w-max pb-2">Icons</h4>
                    <ul className="space-y-6 text-sm font-sans">
                      <li>
                        <Link to="/projects/1" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">No. 1 Grosvenor Square</span>
                          <span className="text-xs text-gray-500">London</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/2" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Altamount</span>
                          <span className="text-xs text-gray-500">Mumbai</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/3" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Avalon</span>
                          <span className="text-xs text-gray-500">Mumbai</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/4" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Malabar</span>
                          <span className="text-xs text-gray-500">Mumbai</span>
                        </Link>
                      </li>
                    </ul>
                    <Link to="/projects" className="inline-block text-xs uppercase tracking-widest text-lodha-gold border-b border-lodha-gold/30 hover:border-lodha-gold mt-4">View All</Link>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-serif text-white mb-6 border-b border-gray-700 w-max pb-2">Residential</h4>
                    <ul className="space-y-6 text-sm font-sans">
                      <li>
                        <Link to="/projects/5" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Alibaug</span>
                          <span className="text-xs text-gray-500">Alibaug</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/6" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Bellevue</span>
                          <span className="text-xs text-gray-500">Mumbai</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/7" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Camelot</span>
                          <span className="text-xs text-gray-500">Pune</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects/8" className="block group">
                          <span className="block text-white group-hover:text-lodha-gold transition-colors">Lodha Elanza</span>
                          <span className="text-xs text-gray-500">Bangalore</span>
                        </Link>
                      </li>
                    </ul>
                    <Link to="/projects" className="inline-block text-xs uppercase tracking-widest text-lodha-gold border-b border-lodha-gold/30 hover:border-lodha-gold mt-4">View All</Link>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-serif text-white mb-6 border-b border-gray-700 w-max pb-2">Commercial</h4>
                    <ul className="space-y-6 text-sm font-sans">
                      <li><Link to="/projects/offices" className="text-white hover:text-lodha-gold transition-colors">Offices</Link></li>
                      <li><Link to="/projects/retail" className="text-white hover:text-lodha-gold transition-colors">Retail</Link></li>
                      <li><Link to="/projects/warehousing" className="text-white hover:text-lodha-gold transition-colors">Warehousing</Link></li>
                      <li><Link to="/projects/plots" className="text-white hover:text-lodha-gold transition-colors">Plots</Link></li>
                    </ul>
                    <Link to="/projects" className="inline-block text-xs uppercase tracking-widest text-lodha-gold border-b border-lodha-gold/30 hover:border-lodha-gold mt-4">View All</Link>
                    
                    <h4 className="text-xl font-serif text-white mb-2 pt-6 w-max pb-2">Palava</h4>
                    <Link to="/projects/palava" className="inline-block text-xs uppercase tracking-widest text-lodha-gold border-b border-lodha-gold/30 hover:border-lodha-gold mt-2">View All</Link>
                  </div>

                  {/* Column 4 - Search */}
                  <div>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search a project name or location..." 
                        className="w-full bg-[#333333] border-none rounded-full py-4 px-6 text-sm text-white focus:outline-none focus:ring-1 focus:ring-lodha-gold"
                      />
                      <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 pb-8"
          >
            <div className="container mx-auto px-6 md:px-12 flex flex-col h-full bg-white relative">
              <button 
                className="absolute top-[-4rem] right-0 md:bg-gray-100 p-2 md:rounded-full hidden md:block" // Handled by hamburger normally, adding backup X
                onClick={() => setIsMobileMenuOpen(false)}
              >
               <X className="w-5 h-5 text-lodha-black"/>
              </button>
              
              <div className="flex flex-col space-y-8 w-full mt-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-lodha-black text-3xl md:text-5xl font-serif hover:text-lodha-gold transition-colors inline-block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile version of OUR PROJECTS */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (navLinks.length * 0.1), duration: 0.5 }}
                >
                  <Link
                    to="/projects"
                    className="text-lodha-black text-3xl md:text-5xl font-serif hover:text-lodha-gold transition-colors inline-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    OUR PROJECTS
                  </Link>
                </motion.div>
                
                {/* Added Login Link */}
                 <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + ((navLinks.length + 1) * 0.1), duration: 0.5 }}
                  className="pt-6 border-t border-gray-200 mt-6 max-w-xs"
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 text-lodha-black text-2xl font-serif hover:text-lodha-gold transition-colors inline-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-6 h-6" />
                    <span>LOGIN</span>
                  </Link>
                </motion.div>

                <div className="h-px w-full max-w-sm bg-gray-200 my-6"></div>
                
                 <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center space-x-2 text-lodha-black font-sans tracking-widest transition-colors hover:text-lodha-gold border border-lodha-black w-max px-6 py-3"
                >
                  <Phone className="w-4 h-4" />
                  <span>ENQUIRE NOW</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
