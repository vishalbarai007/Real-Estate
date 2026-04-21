const mongoose = require('mongoose');
const User = require('./models/User');
const Content = require('./models/Content');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Seed Admin
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password });
      await user.save();
      console.log('Admin user seeded');
    } else {
      console.log('Admin user already exists');
    }

    // Seed Content
    let content = await Content.findOne();
    if (!content) {
      content = new Content({
        hero: { title: 'Modern Living Reimagined', subtitle: 'Experience luxury in every corner of your new home.' },
        overview: { text: 'Welcome to our premium residential project. We offer spacious apartments with world-class design and architecture.' },
        connectivity: [
          { place: 'International Airport - 15 mins' },
          { place: 'Metro Station - 5 mins' },
          { place: 'City Center Mall - 10 mins' },
          { place: 'Global Hospital - 8 mins' }
        ],
        amenities: [
          { title: 'Swimming Pool', description: 'Infinity pool with a deck for your relaxation.' },
          { title: 'Gymnasium', description: 'Fully equipped state-of-the-art fitness center.' },
          { title: 'Kids Play Area', description: 'Safe and fun environment for your children.' },
          { title: 'Clubhouse', description: 'Perfect place for social gatherings and events.' }
        ],
        about: { text: 'With over 20 years of excellence, we have delivered more than 50 projects across the country, making us a trusted name in real estate.' },
        updates: [
          { label: 'Foundation work completed' },
          { label: 'Slab casting for Block A in progress' },
          { label: 'Plumbing and electrical work started' }
        ],
        faqs: [
          { question: 'What is the possession date?', answer: 'The project is expected to be completed by December 2026.' },
          { question: 'Are bank loans available?', answer: 'Yes, we are tied up with all major nationalized and private banks.' },
          { question: 'What is the BHK configuration?', answer: 'We offer 2, 3, and 4 BHK luxury apartments.' }
        ]
      });
      await content.save();
      console.log('Initial content seeded');
    } else {
      console.log('Content already exists');
    }

    mongoose.disconnect();
    console.log('Seeding completed.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
