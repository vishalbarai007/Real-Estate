import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-lodha-darkgray text-gray-300 py-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="space-y-6 md:col-span-1">
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-3xl font-serif tracking-widest text-white">LODHA</span>
            <span className="text-[0.6rem] tracking-[0.3em] font-sans -mt-1 text-lodha-gold">
              BUILDING A BETTER LIFE
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Guided by the vision of Building a Better Life, we create landmarks that meet global standards, epitomize the values of our family, and are built on a legacy of trust spanning four decades.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-serif tracking-wider uppercase text-sm border-b border-gray-700 pb-2">Our Company</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li><Link to="/our-story" className="hover:text-lodha-gold transition-colors">Our Story</Link></li>
            <li><Link to="/leadership" className="hover:text-lodha-gold transition-colors">Leadership</Link></li>
            <li><Link to="/sustainability" className="hover:text-lodha-gold transition-colors">Sustainability</Link></li>
            <li><Link to="/careers" className="hover:text-lodha-gold transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-serif tracking-wider uppercase text-sm border-b border-gray-700 pb-2">Developments</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li><Link to="/projects/mumbai" className="hover:text-lodha-gold transition-colors">Mumbai</Link></li>
            <li><Link to="/projects/pune" className="hover:text-lodha-gold transition-colors">Pune</Link></li>
            <li><Link to="/projects/london" className="hover:text-lodha-gold transition-colors">London</Link></li>
            <li><Link to="/projects/commercial" className="hover:text-lodha-gold transition-colors">Commercial</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-serif tracking-wider uppercase text-sm border-b border-gray-700 pb-2">Connect</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li><a href="#" className="hover:text-lodha-gold transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-lodha-gold transition-colors">Investors</a></li>
            <li><a href="#" className="hover:text-lodha-gold transition-colors">Media</a></li>
            <li><a href="#" className="hover:text-lodha-gold transition-colors">Channel Partners</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Lodha Group. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-lodha-gold transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-lodha-gold transition-colors">Terms & Conditions</Link>
          <Link to="/disclaimer" className="hover:text-lodha-gold transition-colors">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
