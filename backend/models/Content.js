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
  ],
  ourStory: {
    heroTitle: { type: String, default: 'Our Story' },
    heroSubtitle: { type: String, default: 'A legacy built on trust, excellence, and the promise of building a better life.' },
    heroImage: { type: String, default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
    introduction: { type: String, default: 'For over four decades, we have been at the forefront of India\'s real estate revolution. What began as a vision to create world-class living spaces has today become a legacy that spans iconic developments across Mumbai, Pune, Bangalore, London, and beyond. Our journey is defined by an unwavering commitment to quality, innovation, and the belief that everyone deserves a better life.' },
    timeline: [{
      year: { type: String },
      title: { type: String },
      description: { type: String },
      image: { type: String }
    }],
    vision: { type: String, default: 'To be the most trusted and admired real estate developer in the world, creating landmarks that redefine luxury, sustainability, and community living.' },
    mission: { type: String, default: 'To build developments of the highest quality that meet global standards, epitomize the values of trust and transparency, and create lasting value for all stakeholders.' }
  },
  ourImpact: {
    heroTitle: { type: String, default: 'Our Impact' },
    heroSubtitle: { type: String, default: 'Committed to sustainable development and enriching the communities in which we operate.' },
    heroImage: { type: String, default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
    stats: [{
      value: { type: String },
      label: { type: String }
    }],
    testimonials: [{
      name: { type: String },
      designation: { type: String },
      text: { type: String },
      type: { type: String, enum: ['text', 'video'], default: 'text' },
      youtubeUrl: { type: String },
      avatar: { type: String }
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
