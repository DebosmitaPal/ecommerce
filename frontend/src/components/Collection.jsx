import React, { useState } from 'react';
import { Sparkles, TrendingUp, Star, ArrowRight, Heart, Eye } from 'lucide-react';

const TopCollectionsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const collections = [
    {
      id: 1,
      title: 'Tech Essentials',
      subtitle: 'Gadgets & Electronics',
      trending: true,
      image: '/images/headphones1.webp',
      gradient: 'from-blue-500/20 to-purple-500/20',
      badge: 'Hot Deal'
    },
    {
      id: 2,
      title: 'Fashion Forward',
      subtitle: 'Clothing & Accessories',
      trending: true,
      image: '/images/jewellery.jpg',
      gradient: 'from-pink-500/20 to-rose-500/20',
      badge: 'Trending'
    },
    {
      id: 3,
      title: 'Home Comfort',
      subtitle: 'Furniture & Decor',
      itemCount: '3,200+ Products',
      trending: false,
      image: '/images/sofa.webp',
      gradient: 'from-amber-500/20 to-orange-500/20',
      badge: 'New'
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          
          <h1 className="text-3xl md:text-6xl font-extrabold text-slate-800 mb-6 leading-tight tracking-tight" style={{fontFamily: 'Georgia, serif', letterSpacing: '-0.02em'}}>
            Top Collections
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
            Explore our handpicked collections featuring the best deals across categories. From trending tech to timeless fashion, find everything you need in one place.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onMouseEnter={() => setHoveredCard(collection.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {collection.badge}
                  </span>
                </div>

                {/* Trending Icon */}
                {collection.trending && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-slate-900" style={{fontFamily: 'Georgia, serif', letterSpacing: '-0.01em'}}>
                      {collection.title}
                    </h3>
                    <p className="text-sm text-slate-500" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                      {collection.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-slate-300 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCollectionsSection;