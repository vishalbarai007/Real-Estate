import React from 'react';

// Stub pages for routing
export const OurStory = () => (
  <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-serif mb-6 text-lodha-black">Our Story</h1>
    <p className="max-w-2xl text-gray-600 font-sans leading-relaxed">
      A legacy of trust, excellence, and building a better life for our communities over the past four decades.
    </p>
  </div>
);

export const OurImpact = () => (
  <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-serif mb-6 text-lodha-black">Our Impact</h1>
    <p className="max-w-2xl text-gray-600 font-sans leading-relaxed">
      Committed to sustainable development and enriching the communities in which we operate.
    </p>
  </div>
);

export const Projects = () => (
  <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
    <h1 className="text-5xl font-serif mb-12 text-lodha-black">Our Projects</h1>
    <p className="max-w-2xl text-gray-600 font-sans leading-relaxed mb-16">
      Explore our iconic developments across the globe.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
       {/* Stubs for project cards */}
       <div className="h-64 bg-gray-200 animate-pulse"></div>
       <div className="h-64 bg-gray-200 animate-pulse"></div>
       <div className="h-64 bg-gray-200 animate-pulse"></div>
       <div className="h-64 bg-gray-200 animate-pulse"></div>
    </div>
  </div>
);
