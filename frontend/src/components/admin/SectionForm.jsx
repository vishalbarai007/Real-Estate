import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function SectionForm({ section, initialData }) {
  const [formData, setFormData] = useState(initialData || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // Handle nested object changes (hero, about, overview)
  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Handle Array changes (connectivity, amenities, updates, faqs)
  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(newArray);
  };

  const handleArraySimpleChange = (index, value) => {
      // For updates and connectivity if they are simple objects with one field
      // Wait, connectivity is [{ place: "" }], updates is [{ label: "" }]
      // This is handled by handleArrayChange
  }

  const handleRemoveItem = (index) => {
    const newArray = [...formData];
    newArray.splice(index, 1);
    setFormData(newArray);
  };

  const handleAddItem = (emptyItem) => {
    setFormData([...(Array.isArray(formData) ? formData : []), emptyItem]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put(`/content/${section}`, formData);
      toast.success(`${section.toUpperCase()} updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update ${section}`);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderFields = () => {
    if (section === 'hero') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
            <input type="text" value={formData.title || ''} onChange={(e) => handleChange(e, 'title')} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subtitle</label>
            <input type="text" value={formData.subtitle || ''} onChange={(e) => handleChange(e, 'subtitle')} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none" />
          </div>
        </div>
      );
    }
    
    if (section === 'overview' || section === 'about') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Text Content</label>
            <textarea rows={5} value={formData.text || ''} onChange={(e) => handleChange(e, 'text')} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none" />
          </div>
        </div>
      );
    }

    if (section === 'connectivity') {
      return (
        <div className="space-y-4">
          {(Array.isArray(formData) ? formData : []).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input type="text" value={item.place || ''} onChange={(e) => handleArrayChange(idx, 'place', e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none" placeholder="e.g. Airport - 10 mins" />
              <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem({ place: '' })} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline"><Plus size={16} /> <span>Add Place</span></button>
        </div>
      );
    }

    if (section === 'updates') {
      return (
        <div className="space-y-4">
          {(Array.isArray(formData) ? formData : []).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input type="text" value={item.label || ''} onChange={(e) => handleArrayChange(idx, 'label', e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none" placeholder="e.g. Foundation completed" />
              <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem({ label: '' })} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline"><Plus size={16} /> <span>Add Update</span></button>
        </div>
      );
    }

    if (section === 'amenities') {
      return (
        <div className="space-y-6">
          {(Array.isArray(formData) ? formData : []).map((item, idx) => (
            <div key={idx} className="p-4 border rounded-xl bg-slate-50 relative">
              <button type="button" onClick={() => handleRemoveItem(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
              <div className="space-y-3 mb-2 pr-8">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Title</label>
                  <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange(idx, 'title', e.target.value)} className="w-full px-3 py-2 rounded border focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Description</label>
                  <textarea rows={2} value={item.description || ''} onChange={(e) => handleArrayChange(idx, 'description', e.target.value)} className="w-full px-3 py-2 rounded border focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem({ title: '', description: '' })} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline"><Plus size={16} /> <span>Add Amenity</span></button>
        </div>
      );
    }

    if (section === 'faqs') {
      return (
        <div className="space-y-6">
          {(Array.isArray(formData) ? formData : []).map((item, idx) => (
            <div key={idx} className="p-4 border rounded-xl bg-slate-50 relative">
              <button type="button" onClick={() => handleRemoveItem(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
              <div className="space-y-3 mb-2 pr-8">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Question</label>
                  <input type="text" value={item.question || ''} onChange={(e) => handleArrayChange(idx, 'question', e.target.value)} className="w-full px-3 py-2 rounded border focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Answer</label>
                  <textarea rows={2} value={item.answer || ''} onChange={(e) => handleArrayChange(idx, 'answer', e.target.value)} className="w-full px-3 py-2 rounded border focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem({ question: '', answer: '' })} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline"><Plus size={16} /> <span>Add FAQ</span></button>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-bold text-slate-800 capitalize">{section} Section</h3>
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center space-x-2 bg-secondary hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
      <div>
        {renderFields()}
      </div>
    </form>
  );
}
