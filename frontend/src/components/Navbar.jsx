import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-secondary' : 'text-white'}`}>
              Real<span className="text-primary">Estate</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#overview" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`}>Overview</a>
            <a href="#amenities" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`}>Amenities</a>
            <a href="#about" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`}>About Us</a>
            <Link to="/admin/login" className={`text-sm font-semibold border-2 rounded-full px-5 py-2 transition-colors ${isScrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-primary'}`}>
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-secondary' : 'text-white'} hover:text-primary focus:outline-none`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-lg border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-1 text-center flex flex-col">
            <a href="#overview" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md">Overview</a>
            <a href="#amenities" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md">Amenities</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md">About Us</a>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="inline-block px-8 py-3 text-base font-medium text-white bg-primary rounded-full w-full">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
