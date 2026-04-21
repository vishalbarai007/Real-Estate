import { useState } from 'react';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const emptyProject = {
  slug: '',
  name: '',
  location: '',
  category: 'residential',
  tagline: '',
  description: '',
  heroImage: '',
  gallery: [],
  highlights: [],
  amenities: [],
  floorPlans: [],
  status: 'Ongoing',
  featured: false,
  order: 0,
};

export default function ProjectForm({ project, onClose }) {
  const isEditing = !!project;
  const [formData, setFormData] = useState(project || { ...emptyProject });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Auto-generate slug from name
  const handleNameChange = (value) => {
    setFormData({
      ...formData,
      name: value,
      slug: isEditing
        ? formData.slug
        : value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim(),
    });
  };

  // Highlights
  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), { label: '', value: '' }],
    });
  };
  const updateHighlight = (index, field, value) => {
    const updated = [...formData.highlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, highlights: updated });
  };
  const removeHighlight = (index) => {
    const updated = [...formData.highlights];
    updated.splice(index, 1);
    setFormData({ ...formData, highlights: updated });
  };

  // Gallery
  const addGalleryImage = () => {
    setFormData({ ...formData, gallery: [...(formData.gallery || []), ''] });
  };
  const updateGalleryImage = (index, value) => {
    const updated = [...formData.gallery];
    updated[index] = value;
    setFormData({ ...formData, gallery: updated });
  };
  const removeGalleryImage = (index) => {
    const updated = [...formData.gallery];
    updated.splice(index, 1);
    setFormData({ ...formData, gallery: updated });
  };

  // Amenities
  const addAmenity = () => {
    setFormData({ ...formData, amenities: [...(formData.amenities || []), ''] });
  };
  const updateAmenity = (index, value) => {
    const updated = [...formData.amenities];
    updated[index] = value;
    setFormData({ ...formData, amenities: updated });
  };
  const removeAmenity = (index) => {
    const updated = [...formData.amenities];
    updated.splice(index, 1);
    setFormData({ ...formData, amenities: updated });
  };

  // Floor Plans
  const addFloorPlan = () => {
    setFormData({
      ...formData,
      floorPlans: [...(formData.floorPlans || []), { name: '', image: '' }],
    });
  };
  const updateFloorPlan = (index, field, value) => {
    const updated = [...formData.floorPlans];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, floorPlans: updated });
  };
  const removeFloorPlan = (index) => {
    const updated = [...formData.floorPlans];
    updated.splice(index, 1);
    setFormData({ ...formData, floorPlans: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.slug || !formData.name) {
      toast.error('Name and Slug are required');
      return;
    }
    setIsSaving(true);
    try {
      if (isEditing) {
        await api.put(`/projects/${project.slug}`, formData);
        toast.success('Project updated successfully!');
      } else {
        await api.post('/projects', formData);
        toast.success('Project created successfully!');
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to save project');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm';
  const labelClass = 'block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <h3 className="text-xl font-bold text-slate-800">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h3>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
        </button>
      </div>

      <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
        {/* ─── Basic Info ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Basic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Project Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. Lodha Altamount"
              />
            </div>
            <div>
              <label className={labelClass}>Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className={`${inputClass} ${isEditing ? 'bg-slate-50 text-slate-500' : ''}`}
                placeholder="auto-generated-from-name"
                readOnly={isEditing}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className={inputClass}
                placeholder="e.g. Mumbai"
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass}
              >
                <option value="icons">Icons</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={inputClass}
                placeholder="e.g. Ongoing, Ready to Move"
              />
            </div>
            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Content
          </h4>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className={inputClass}
                placeholder="A short tagline for the project"
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={inputClass}
                placeholder="Detailed project description..."
              />
            </div>
            <div>
              <label className={labelClass}>Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => handleChange('heroImage', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
                id="featured"
              />
              <label htmlFor="featured" className="text-sm text-slate-700 font-medium">Featured project</label>
            </div>
          </div>
        </div>

        {/* ─── Gallery ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Gallery Images
          </h4>
          <div className="space-y-3">
            {(formData.gallery || []).map((url, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateGalleryImage(idx, e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Image URL"
                />
                <button type="button" onClick={() => removeGalleryImage(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addGalleryImage} className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:underline">
              <Plus size={14} /> <span>Add Image</span>
            </button>
          </div>
        </div>

        {/* ─── Highlights ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Key Highlights
          </h4>
          <div className="space-y-3">
            {(formData.highlights || []).map((h, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={h.label}
                  onChange={(e) => updateHighlight(idx, 'label', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Label (e.g. Area)"
                />
                <input
                  type="text"
                  value={h.value}
                  onChange={(e) => updateHighlight(idx, 'value', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Value (e.g. 2500 sq ft)"
                />
                <button type="button" onClick={() => removeHighlight(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addHighlight} className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:underline">
              <Plus size={14} /> <span>Add Highlight</span>
            </button>
          </div>
        </div>

        {/* ─── Amenities ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Amenities
          </h4>
          <div className="space-y-3">
            {(formData.amenities || []).map((a, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={a}
                  onChange={(e) => updateAmenity(idx, e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="e.g. Swimming Pool"
                />
                <button type="button" onClick={() => removeAmenity(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addAmenity} className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:underline">
              <Plus size={14} /> <span>Add Amenity</span>
            </button>
          </div>
        </div>

        {/* ─── Floor Plans ─── */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
            Floor Plans
          </h4>
          <div className="space-y-3">
            {(formData.floorPlans || []).map((fp, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={fp.name}
                  onChange={(e) => updateFloorPlan(idx, 'name', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Plan Name (e.g. 2 BHK)"
                />
                <input
                  type="text"
                  value={fp.image}
                  onChange={(e) => updateFloorPlan(idx, 'image', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Image URL"
                />
                <button type="button" onClick={() => removeFloorPlan(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFloorPlan} className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:underline">
              <Plus size={14} /> <span>Add Floor Plan</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
