const mongoose = require('mongoose');
const User = require('./models/User');
const Content = require('./models/Content');
const Project = require('./models/Project');
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
        ],
        ourStory: {
          heroTitle: 'Our Story',
          heroSubtitle: 'A legacy built on trust, excellence, and the promise of building a better life.',
          heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
          introduction: 'For over four decades, we have been at the forefront of India\'s real estate revolution. What began as a vision to create world-class living spaces has today become a legacy that spans iconic developments across Mumbai, Pune, Bangalore, London, and beyond. Our journey is defined by an unwavering commitment to quality, innovation, and the belief that everyone deserves a better life.',
          timeline: [
            {
              year: '1980',
              title: 'The Foundation',
              description: 'Our journey began with a vision to create world-class living spaces that set new benchmarks in quality and design. The first residential project was launched in Mumbai.',
              image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop'
            },
            {
              year: '1995',
              title: 'Expanding Horizons',
              description: 'With 15 years of excellence, we expanded beyond Mumbai to Pune and other key markets, delivering over 10 landmark projects and earning our reputation for trust.',
              image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop'
            },
            {
              year: '2005',
              title: 'Redefining Luxury',
              description: 'The launch of our iconic ultra-luxury portfolio set new standards in premium living with world-renowned architects and designers.',
              image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'
            },
            {
              year: '2014',
              title: 'Going Global',
              description: 'We made our mark on the world stage with the acquisition of the iconic No. 1 Grosvenor Square in London\'s Mayfair, signaling our global ambitions.',
              image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop'
            },
            {
              year: '2020',
              title: 'The Smart City Vision',
              description: 'Palava, our smart city near Mumbai, crossed 100,000 residents, making it one of India\'s fastest-growing private city developments with sustainable infrastructure.',
              image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop'
            },
            {
              year: '2024',
              title: 'India\'s No.1 Developer',
              description: 'Recognized as India\'s No.1 real estate developer by sales, we continue to set benchmarks with 50+ ongoing projects and a commitment to building a better life for all.',
              image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
            }
          ],
          vision: 'To be the most trusted and admired real estate developer in the world, creating landmarks that redefine luxury, sustainability, and community living for generations to come.',
          mission: 'To build developments of the highest quality that meet global standards, epitomize the values of trust and transparency, and create lasting value for all our stakeholders — homeowners, communities, investors, and the environment.'
        },
        ourImpact: {
          heroTitle: 'Our Impact',
          heroSubtitle: 'Committed to sustainable development and enriching the communities in which we operate.',
          heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
          stats: [
            { value: '50+', label: 'Projects Delivered' },
            { value: '20,000+', label: 'Happy Families' },
            { value: '40+', label: 'Years of Excellence' },
            { value: '4', label: 'Countries' },
            { value: '1M+', label: 'Sq. Ft. Green Spaces' },
            { value: '100K+', label: 'Palava Residents' }
          ],
          testimonials: [
            {
              name: 'Rajesh Mehta',
              designation: 'Homeowner, Lodha Altamount',
              text: 'Moving into our Lodha home was a transformative experience. The attention to detail, the quality of construction, and the community they\'ve built is truly world-class. It has exceeded every expectation we had.',
              type: 'text',
              youtubeUrl: '',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
            },
            {
              name: 'Priya Sharma',
              designation: 'Resident, Palava City',
              text: '',
              type: 'video',
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              avatar: ''
            },
            {
              name: 'Anand Kulkarni',
              designation: 'Investor & Homeowner',
              text: 'I\'ve invested in three Lodha properties over the past decade, and each one has delivered exceptional returns. But more than the investment, it\'s the quality of life that keeps me coming back. Their developments are in a league of their own.',
              type: 'text',
              youtubeUrl: '',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
            },
            {
              name: 'The Patel Family',
              designation: 'Homeowners, World Towers',
              text: '',
              type: 'video',
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              avatar: ''
            },
            {
              name: 'Meera Joshi',
              designation: 'Resident, Lodha Bellevue',
              text: 'From the moment we walked into the show apartment, we knew this was home. The design, the natural light, the views — everything was perfect. Two years in, and we still pinch ourselves every morning.',
              type: 'text',
              youtubeUrl: '',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
            },
            {
              name: 'Vikram Singh',
              designation: 'Commercial Tenant',
              text: 'Our offices in the Lodha commercial complex have been a game-changer for our business. The infrastructure, connectivity, and prestige associated with the address has had a tangible impact on our client relationships.',
              type: 'text',
              youtubeUrl: '',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
            }
          ]
        }
      });
      await content.save();
      console.log('Initial content seeded');
    } else {
      // Update existing content with new fields if they don't exist
      let updated = false;
      if (!content.ourStory || !content.ourStory.heroTitle) {
        content.ourStory = {
          heroTitle: 'Our Story',
          heroSubtitle: 'A legacy built on trust, excellence, and the promise of building a better life.',
          heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
          introduction: 'For over four decades, we have been at the forefront of India\'s real estate revolution.',
          timeline: [
            { year: '1980', title: 'The Foundation', description: 'Our journey began with a vision to create world-class living spaces.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop' },
            { year: '1995', title: 'Expanding Horizons', description: 'With 15 years of excellence, we expanded beyond Mumbai.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop' },
            { year: '2005', title: 'Redefining Luxury', description: 'The launch of our iconic ultra-luxury portfolio.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
            { year: '2014', title: 'Going Global', description: 'Our mark on the world stage with No. 1 Grosvenor Square, London.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop' },
            { year: '2024', title: 'India\'s No.1 Developer', description: 'Recognized as India\'s No.1 real estate developer by sales.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop' }
          ],
          vision: 'To be the most trusted and admired real estate developer in the world.',
          mission: 'To build developments of the highest quality that meet global standards.'
        };
        updated = true;
      }
      if (!content.ourImpact || !content.ourImpact.heroTitle) {
        content.ourImpact = {
          heroTitle: 'Our Impact',
          heroSubtitle: 'Committed to sustainable development and enriching communities.',
          heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
          stats: [
            { value: '50+', label: 'Projects Delivered' },
            { value: '20,000+', label: 'Happy Families' },
            { value: '40+', label: 'Years of Excellence' },
            { value: '4', label: 'Countries' }
          ],
          testimonials: [
            { name: 'Rajesh Mehta', designation: 'Homeowner', text: 'The quality of construction is truly world-class.', type: 'text', youtubeUrl: '', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
            { name: 'Priya Sharma', designation: 'Resident', text: '', type: 'video', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', avatar: '' }
          ]
        };
        updated = true;
      }
      if (updated) {
        await content.save();
        console.log('Existing content updated with new sections');
      } else {
        console.log('Content already exists with all sections');
      }
    }

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = [
        {
          slug: 'no-1-grosvenor-square',
          name: 'No. 1 Grosvenor Square',
          location: 'London',
          category: 'icons',
          tagline: 'The Most Prestigious Address in the World',
          description: 'Located in the heart of Mayfair, No. 1 Grosvenor Square represents the pinnacle of luxury living. This iconic address, formerly home to the US Embassy, has been transformed into 44 exceptional residences that embody the finest in British craftsmanship and timeless elegance. With interiors by leading international designers and unparalleled amenities including a private cinema, wine cellar, and spa, this is truly one of the most coveted addresses on Earth.',
          heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753086-00f18f6b2de4?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: '2, 3 & 4 Bedroom Residences' },
            { label: 'Area', value: '1,500 - 6,500 sq ft' },
            { label: 'Architect', value: 'Squire & Partners' },
            { label: 'Status', value: 'Ready to Move' }
          ],
          amenities: ['Private Cinema', 'Wine Cellar & Tasting Room', 'Spa & Wellness Center', 'Concierge Service', 'Valet Parking', 'Private Dining Room', 'Residents Lounge', 'Landscaped Gardens'],
          floorPlans: [],
          status: 'Ready to Move',
          featured: true,
          order: 1
        },
        {
          slug: 'lodha-altamount',
          name: 'Lodha Altamount',
          location: 'Altamount Road, Mumbai',
          category: 'icons',
          tagline: 'Where the Sky Meets the Sea',
          description: 'Rising majestically on one of Mumbai\'s most prestigious streets, Lodha Altamount offers an unparalleled lifestyle with breathtaking views of the Arabian Sea and the city skyline. Each residence is a masterpiece of design, featuring Italian marble flooring, bespoke joinery, and floor-to-ceiling windows that frame stunning panoramic views. The tower offers world-class amenities designed to elevate every aspect of daily life.',
          heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600566753086-00f18f6b2de4?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600573472591-ee13f44d0bfa?q=80&w=2070&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: '4 & 5 BHK Residences' },
            { label: 'Area', value: '4,500 - 10,000 sq ft' },
            { label: 'Floors', value: '40 Storeys' },
            { label: 'Status', value: 'Ready to Move' }
          ],
          amenities: ['Infinity Pool', 'Sky Lounge', 'Private Theater', 'Spa & Sauna', 'Squash Court', 'Wine Cellar', 'Concierge', 'Jogging Track'],
          floorPlans: [],
          status: 'Ready to Move',
          featured: true,
          order: 2
        },
        {
          slug: 'lodha-avalon',
          name: 'Lodha Avalon',
          location: 'Worli, Mumbai',
          category: 'icons',
          tagline: 'A New Legend in the Making',
          description: 'Lodha Avalon at Worli is a striking architectural landmark that redefines the Mumbai skyline. Designed by international architects, this development offers spacious residences with panoramic sea views, world-class amenities, and an address that speaks of prestige and legacy.',
          heroImage: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: '3 & 4 BHK' },
            { label: 'Area', value: '2,800 - 5,500 sq ft' },
            { label: 'Status', value: 'Under Construction' }
          ],
          amenities: ['Club House', 'Swimming Pool', 'Gymnasium', 'Landscaped Garden', 'Children\'s Play Area', 'Multi-purpose Hall'],
          floorPlans: [],
          status: 'Under Construction',
          featured: true,
          order: 3
        },
        {
          slug: 'lodha-malabar',
          name: 'Lodha Malabar',
          location: 'Malabar Hill, Mumbai',
          category: 'icons',
          tagline: 'The Crown Jewel of South Mumbai',
          description: 'Perched atop the legendary Malabar Hill, this ultra-luxury development offers an exclusive collection of residences with unmatched views of the Arabian Sea. Every detail has been crafted to perfection, from the imported marble lobbies to the private elevator access for each residence.',
          heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753086-00f18f6b2de4?q=80&w=2070&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: '4 BHK Ultra Luxury' },
            { label: 'Area', value: '5,000 - 12,000 sq ft' },
            { label: 'Status', value: 'Nearing Completion' }
          ],
          amenities: ['Private Pool', 'Helipad Access', 'Butler Service', 'Art Gallery', 'Fine Dining Restaurant', 'Wellness Spa'],
          floorPlans: [],
          status: 'Nearing Completion',
          featured: false,
          order: 4
        },
        {
          slug: 'lodha-alibaug',
          name: 'Lodha Alibaug',
          location: 'Alibaug',
          category: 'residential',
          tagline: 'Your Seaside Sanctuary',
          description: 'Lodha Alibaug is an exclusive gated community of villas and plots set against the backdrop of the Sahyadri mountains and the Arabian Sea. Designed as a perfect weekend getaway or a full-time retreat, this development offers lush landscapes, world-class recreational facilities, and the serenity of coastal living.',
          heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: 'Villas & Plots' },
            { label: 'Area', value: '2,000 - 8,000 sq ft' },
            { label: 'Status', value: 'Ready to Move' }
          ],
          amenities: ['Beach Club', 'Golf Course', 'Equestrian Center', 'Organic Farm', 'Infinity Pool', 'Spa'],
          floorPlans: [],
          status: 'Ready to Move',
          featured: false,
          order: 5
        },
        {
          slug: 'lodha-bellevue',
          name: 'Lodha Bellevue',
          location: 'Mahalaxmi, Mumbai',
          category: 'residential',
          tagline: 'Elegant Living, Elevated',
          description: 'Lodha Bellevue in Mahalaxmi offers sophisticated residences with stunning views of the racecourse and the sea. Thoughtfully designed spaces, premium finishes, and a curated lifestyle experience make this one of Mumbai\'s most desirable addresses.',
          heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1600573472591-ee13f44d0bfa?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
          ],
          highlights: [
            { label: 'Configuration', value: '3 & 4 BHK' },
            { label: 'Area', value: '1,800 - 4,200 sq ft' },
            { label: 'Status', value: 'Under Construction' }
          ],
          amenities: ['Rooftop Lounge', 'Swimming Pool', 'Gym', 'Children\'s Area', 'Library', 'Party Hall'],
          floorPlans: [],
          status: 'Under Construction',
          featured: false,
          order: 6
        },
        {
          slug: 'lodha-camelot',
          name: 'Lodha Camelot',
          location: 'Pune',
          category: 'residential',
          tagline: 'A Kingdom of Comfort',
          description: 'Set in the cultural capital of Maharashtra, Lodha Camelot brings luxury living to Pune. Spacious apartments surrounded by landscaped gardens, a grand clubhouse, and proximity to the city\'s key IT hubs make this an ideal choice for modern families.',
          heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
          gallery: [],
          highlights: [
            { label: 'Configuration', value: '2 & 3 BHK' },
            { label: 'Area', value: '1,200 - 2,400 sq ft' },
            { label: 'Status', value: 'Ongoing' }
          ],
          amenities: ['Clubhouse', 'Swimming Pool', 'Gym', 'Jogging Track', 'Indoor Games', 'Amphitheater'],
          floorPlans: [],
          status: 'Ongoing',
          featured: false,
          order: 7
        },
        {
          slug: 'lodha-elanza',
          name: 'Lodha Elanza',
          location: 'Bangalore',
          category: 'residential',
          tagline: 'Silicon Valley Sophistication',
          description: 'Lodha Elanza in Bangalore offers contemporary luxury for the city\'s most discerning residents. Located in a prime neighborhood with excellent connectivity, these residences offer the perfect blend of style, comfort, and convenience.',
          heroImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
          gallery: [],
          highlights: [
            { label: 'Configuration', value: '2, 3 & 4 BHK' },
            { label: 'Area', value: '1,400 - 3,800 sq ft' },
            { label: 'Status', value: 'Ongoing' }
          ],
          amenities: ['Co-working Space', 'Infinity Pool', 'Yoga Deck', 'Pet Park', 'EV Charging', 'Smart Home Features'],
          floorPlans: [],
          status: 'Ongoing',
          featured: false,
          order: 8
        }
      ];

      await Project.insertMany(projects);
      console.log('Projects seeded');
    } else {
      console.log('Projects already exist');
    }

    mongoose.disconnect();
    console.log('Seeding completed.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
