import { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import ProjectForm from './ProjectForm';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm(`Are you sure you want to delete this project?`)) return;
    try {
      await api.delete(`/projects/${slug}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (showForm) {
    return <ProjectForm project={editingProject} onClose={handleFormClose} />;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-xl font-bold text-slate-800">Projects Manager</h3>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg mb-2">No projects yet.</p>
          <p className="text-sm">Click "Add Project" to create your first project.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between py-4 px-2 hover:bg-slate-50 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {/* Thumbnail */}
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0 border border-slate-200"
                  style={{
                    backgroundImage: project.heroImage
                      ? `url('${project.heroImage}')`
                      : 'none',
                    backgroundColor: project.heroImage ? 'transparent' : '#f1f5f9',
                  }}
                />

                {/* Info */}
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-800 truncate">{project.name}</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="flex items-center space-x-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(project.slug)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
