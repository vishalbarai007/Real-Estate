const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Welcome to Our Real Estate Project' },
    subtitle: { type: String, default: 'Find your dream home with us.' }
  },
  overview: {
    text: { type: String, default: 'This project offers modern living with premium amenities.' }
  },
  connectivity: [
    { place: { type: String } }
  ],
  amenities: [
    { 
      title: { type: String },
      description: { type: String }
    }
  ],
  about: {
    text: { type: String, default: 'We are a leading real estate developer committed to quality.' }
  },
  updates: [
    { label: { type: String } }
  ],
  faqs: [
    { 
      question: { type: String },
      answer: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
