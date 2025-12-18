import React from 'react';
import { Shield, Heart, Zap, Globe, Sparkles, Users, TrendingUp, Award, Star } from 'lucide-react';

const CoreValuesSection = () => {
  const values = [
    { 
      icon: Shield, 
      title: 'Trust & Transparency', 
      description: 'We believe in honest pricing and clear information. No hidden fees, no misleading deals. Every price you see is verified and accurate.',
      color: 'from-blue-50 to-slate-100'
    },
    { 
      icon: Heart, 
      title: 'Customer First', 
      description: 'Your satisfaction drives everything we do. We are here to make shopping effortless, rewarding, and tailored to your unique needs.',
      color: 'from-rose-50 to-slate-100'
    },
    { 
      icon: Zap, 
      title: 'Innovation', 
      description: 'Constantly evolving our technology to bring you the most accurate and real-time price comparisons across thousands of products.',
      color: 'from-amber-50 to-slate-100'
    },
    { 
      icon: Globe, 
      title: 'Community', 
      description: 'Building a global community of smart shoppers who help each other find the best deals and make informed purchasing decisions.',
      color: 'from-emerald-50 to-slate-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 leading-tight tracking-tight" style={{fontFamily: 'Georgia, serif', letterSpacing: '-0.02em'}}>
            Our Core Values
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed" style={{fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400'}}>
            These fundamental principles guide our decisions, shape our culture, and define who we are as a company. They are the foundation of everything we do at ShopHub.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  <value.icon className="w-8 h-8 text-slate-700" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900" style={{fontFamily: 'Georgia, serif', letterSpacing: '-0.01em'}}>
                  {value.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm group-hover:text-slate-700" style={{fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.7'}}>
                  {value.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;