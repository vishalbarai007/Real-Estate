const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['icons', 'residential', 'commercial'], default: 'residential' },
  tagline: { type: String, default: '' },
  description: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  gallery: [{ type: String }],
  highlights: [{
    label: { type: String },
    value: { type: String }
  }],
  amenities: [{ type: String }],
  floorPlans: [{
    name: { type: String },
    image: { type: String }
  }],
  status: { type: String, default: 'Ongoing' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
