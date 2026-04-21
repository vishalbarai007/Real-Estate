export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-bold text-white tracking-tighter">Real<span className="text-primary">Estate</span></span>
          <p className="mt-2 text-sm max-w-xs">Building your dreams, one brick at a time. Quality and luxury redefined.</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#amenities" className="hover:text-white transition-colors">Amenities</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-sm md:flex md:justify-between">
        <p>&copy; {new Date().getFullYear()} RealEstate Inc. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed elegantly</p>
      </div>
    </footer>
  );
}
