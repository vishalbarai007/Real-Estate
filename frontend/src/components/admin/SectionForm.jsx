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

  const handleRemoveItem = (index) => {
    const newArray = [...formData];
    newArray.splice(index, 1);
    setFormData(newArray);
  };

  const handleAddItem = (emptyItem) => {
    setFormData([...(Array.isArray(formData) ? formData : []), emptyItem]);
  };

  // ─── OUR STORY handlers ───
  const handleStoryChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTimelineChange = (index, field, value) => {
    const timeline = [...(formData.timeline || [])];
    timeline[index] = { ...timeline[index], [field]: value };
    setFormData({ ...formData, timeline });
  };

  const addTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...(formData.timeline || []), { year: '', title: '', description: '', image: '' }],
    });
  };

  const removeTimelineItem = (index) => {
    const timeline = [...(formData.timeline || [])];
    timeline.splice(index, 1);
    setFormData({ ...formData, timeline });
  };

  // ─── OUR IMPACT handlers ───
  const handleImpactChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStatChange = (index, field, value) => {
    const stats = [...(formData.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    setFormData({ ...formData, stats });
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...(formData.stats || []), { value: '', label: '' }],
    });
  };

  const removeStat = (index) => {
    const stats = [...(formData.stats || [])];
    stats.splice(index, 1);
    setFormData({ ...formData, stats });
  };

  const handleTestimonialChange = (index, field, value) => {
    const testimonials = [...(formData.testimonials || [])];
    testimonials[index] = { ...testimonials[index], [field]: value };
    setFormData({ ...formData, testimonials });
  };

  const addTestimonial = () => {
    setFormData({
      ...formData,
      testimonials: [
        ...(formData.testimonials || []),
        { name: '', designation: '', text: '', type: 'text', youtubeUrl: '', avatar: '' },
      ],
    });
  };

  const removeTestimonial = (index) => {
    const testimonials = [...(formData.testimonials || [])];
    testimonials.splice(index, 1);
    setFormData({ ...formData, testimonials });
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

  const inputClass = 'w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none transition-all text-sm';
  const labelClass = 'block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider';

  const renderFields = () => {
    if (section === 'hero') {
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={formData.title || ''} onChange={(e) => handleChange(e, 'title')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input type="text" value={formData.subtitle || ''} onChange={(e) => handleChange(e, 'subtitle')} className={inputClass} />
          </div>
        </div>
      );
    }
    
    if (section === 'overview' || section === 'about') {
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Text Content</label>
            <textarea rows={5} value={formData.text || ''} onChange={(e) => handleChange(e, 'text')} className={inputClass} />
          </div>
        </div>
      );
    }

    if (section === 'connectivity') {
      return (
        <div className="space-y-4">
          {(Array.isArray(formData) ? formData : []).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input type="text" value={item.place || ''} onChange={(e) => handleArrayChange(idx, 'place', e.target.value)} className={`flex-1 ${inputClass}`} placeholder="e.g. Airport - 10 mins" />
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
              <input type="text" value={item.label || ''} onChange={(e) => handleArrayChange(idx, 'label', e.target.value)} className={`flex-1 ${inputClass}`} placeholder="e.g. Foundation completed" />
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
                  <label className={labelClass}>Title</label>
                  <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange(idx, 'title', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea rows={2} value={item.description || ''} onChange={(e) => handleArrayChange(idx, 'description', e.target.value)} className={inputClass} />
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
                  <label className={labelClass}>Question</label>
                  <input type="text" value={item.question || ''} onChange={(e) => handleArrayChange(idx, 'question', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Answer</label>
                  <textarea rows={2} value={item.answer || ''} onChange={(e) => handleArrayChange(idx, 'answer', e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem({ question: '', answer: '' })} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline"><Plus size={16} /> <span>Add FAQ</span></button>
        </div>
      );
    }

    // ─── OUR STORY ───
    if (section === 'ourStory') {
      return (
        <div className="space-y-8">
          {/* Hero fields */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Hero Section</h4>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Hero Title</label>
                <input type="text" value={formData.heroTitle || ''} onChange={(e) => handleStoryChange('heroTitle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hero Subtitle</label>
                <input type="text" value={formData.heroSubtitle || ''} onChange={(e) => handleStoryChange('heroSubtitle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hero Image URL</label>
                <input type="text" value={formData.heroImage || ''} onChange={(e) => handleStoryChange('heroImage', e.target.value)} className={inputClass} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Introduction</h4>
            <textarea rows={5} value={formData.introduction || ''} onChange={(e) => handleStoryChange('introduction', e.target.value)} className={inputClass} />
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Timeline</h4>
            <div className="space-y-6">
              {(formData.timeline || []).map((item, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-slate-50 relative">
                  <button type="button" onClick={() => removeTimelineItem(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className={labelClass}>Year</label>
                      <input type="text" value={item.year || ''} onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)} className={inputClass} placeholder="e.g. 2005" />
                    </div>
                    <div>
                      <label className={labelClass}>Title</label>
                      <input type="text" value={item.title || ''} onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea rows={2} value={item.description || ''} onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Image URL</label>
                      <input type="text" value={item.image || ''} onChange={(e) => handleTimelineChange(idx, 'image', e.target.value)} className={inputClass} placeholder="https://..." />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addTimelineItem} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline">
                <Plus size={16} /> <span>Add Timeline Entry</span>
              </button>
            </div>
          </div>

          {/* Vision & Mission */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Vision & Mission</h4>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Vision</label>
                <textarea rows={3} value={formData.vision || ''} onChange={(e) => handleStoryChange('vision', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mission</label>
                <textarea rows={3} value={formData.mission || ''} onChange={(e) => handleStoryChange('mission', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ─── OUR IMPACT ───
    if (section === 'ourImpact') {
      return (
        <div className="space-y-8">
          {/* Hero fields */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Hero Section</h4>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Hero Title</label>
                <input type="text" value={formData.heroTitle || ''} onChange={(e) => handleImpactChange('heroTitle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hero Subtitle</label>
                <input type="text" value={formData.heroSubtitle || ''} onChange={(e) => handleImpactChange('heroSubtitle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hero Image URL</label>
                <input type="text" value={formData.heroImage || ''} onChange={(e) => handleImpactChange('heroImage', e.target.value)} className={inputClass} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Impact Stats</h4>
            <div className="space-y-4">
              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input type="text" value={stat.value || ''} onChange={(e) => handleStatChange(idx, 'value', e.target.value)} className={`flex-1 ${inputClass}`} placeholder="Value (e.g. 50+)" />
                  <input type="text" value={stat.label || ''} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} className={`flex-1 ${inputClass}`} placeholder="Label (e.g. Projects)" />
                  <button type="button" onClick={() => removeStat(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addStat} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline">
                <Plus size={16} /> <span>Add Stat</span>
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Testimonials</h4>
            <div className="space-y-6">
              {(formData.testimonials || []).map((t, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-slate-50 relative">
                  <button type="button" onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded">
                    <Trash2 size={18} />
                  </button>
                  <div className="space-y-3 pr-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input type="text" value={t.name || ''} onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Designation</label>
                        <input type="text" value={t.designation || ''} onChange={(e) => handleTestimonialChange(idx, 'designation', e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Type</label>
                      <select value={t.type || 'text'} onChange={(e) => handleTestimonialChange(idx, 'type', e.target.value)} className={inputClass}>
                        <option value="text">Text</option>
                        <option value="video">Video (YouTube)</option>
                      </select>
                    </div>
                    {t.type === 'video' ? (
                      <div>
                        <label className={labelClass}>YouTube URL</label>
                        <input type="text" value={t.youtubeUrl || ''} onChange={(e) => handleTestimonialChange(idx, 'youtubeUrl', e.target.value)} className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className={labelClass}>Testimonial Text</label>
                          <textarea rows={3} value={t.text || ''} onChange={(e) => handleTestimonialChange(idx, 'text', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Avatar Image URL</label>
                          <input type="text" value={t.avatar || ''} onChange={(e) => handleTestimonialChange(idx, 'avatar', e.target.value)} className={inputClass} placeholder="https://..." />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addTestimonial} className="flex items-center space-x-1 text-primary text-sm font-medium hover:underline">
                <Plus size={16} /> <span>Add Testimonial</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getSectionTitle = () => {
    const titles = {
      ourStory: 'Our Story',
      ourImpact: 'Our Impact',
    };
    return titles[section] || section;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-bold text-slate-800 capitalize">{getSectionTitle()} Section</h3>
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
