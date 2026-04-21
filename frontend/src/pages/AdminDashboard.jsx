import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2, LogOut, LayoutDashboard, Home, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionForm from '../components/admin/SectionForm';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  const sections = ['hero', 'overview', 'connectivity', 'amenities', 'about', 'updates', 'faqs'];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content for admin panel.");
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative z-50">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative z-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <LayoutDashboard className="text-primary" />
            <span>Panel</span>
          </h2>
        </div>
        <div className="flex-1 py-6">
          <p className="px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Edit Sections</p>
          <nav className="space-y-1 px-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-colors font-medium ${
                  activeTab === section 
                    ? 'bg-primary text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Globe size={18} />
            <span>View Website</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800">Content Management</h1>
            <p className="text-slate-500 mt-2">Any changes saved here will reflect immediately on the live website.</p>
          </header>
          
          {content && (
            <SectionForm 
              key={activeTab} // Force re-render on tab change to load fresh initialData
              section={activeTab} 
              initialData={content[activeTab]} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
