export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="relative h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Mansion View" className="w-full h-full object-cover" />
      </div>
      <div className="z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{data.title}</h1>
        <p className="text-xl md:text-2xl mb-8 font-light text-slate-200">{data.subtitle}</p>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Explore Our Properties
        </button>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center items-start p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
