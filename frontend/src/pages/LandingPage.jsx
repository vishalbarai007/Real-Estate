import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectOverview from '../components/ProjectOverview';
import NearbyConnectivity from '../components/NearbyConnectivity';
import Amenities from '../components/Amenities';
import AboutUs from '../components/AboutUs';
import ConstructionUpdates from '../components/ConstructionUpdates';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import api from '../services/api';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content');
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Content Available</h2>
        <p className="text-slate-500">Please make sure the backend is running and seeded.</p>
      </div>
    );
  }

  return (
    <div className="scroll-smooth">
      <Navbar />
      <Hero data={content.hero} />
      <ProjectOverview data={content.overview} />
      <NearbyConnectivity data={content.connectivity} />
      <Amenities data={content.amenities} />
      <AboutUs data={content.about} />
      <ConstructionUpdates data={content.updates} />
      <FAQ data={content.faqs} />
      <Footer />
    </div>
  );
}
