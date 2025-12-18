import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Sun, Flower2 } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Timeless Elegance",
      subtitle: "Embrace the art of refined living",
      tagline: "Where Grace Meets Style",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&h=900&fit=crop&q=90"
    },
    {
      title: "Radiant Beauty",
      subtitle: "Illuminate your everyday moments",
      tagline: "Crafted with Love",
      icon: Sun,
      image: "/images/beauty1.avif"
    },
    {
      title: "Gentle Sophistication",
      subtitle: "Discover pieces that tell your story",
      tagline: "Effortlessly Chic",
      icon: Flower2,
      image: "/images/dress1.avif"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-50">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100/70 via-amber-50/60 to-rose-100/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50/90 via-transparent to-stone-50/40" />
        </div>
      ))}

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 61, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Main Content Area */}
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Tagline Badge */}
            <div className="mb-8 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/40 backdrop-blur-sm border border-stone-200/50 shadow-sm animate-fadeIn">
              <CurrentIcon className="w-5 h-5 text-amber-700" strokeWidth={1.5} />
              <span className="text-amber-900 font-light tracking-widest text-sm uppercase" style={{fontFamily: 'Georgia, serif'}}>
                {slides[currentSlide].tagline}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="mb-6 animate-fadeInUp" style={{
              animationDelay: '0.2s',
              animationFillMode: 'both',
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: '#57534e',
              letterSpacing: '-0.02em'
            }}>
              {slides[currentSlide].title}
            </h1>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            </div>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-stone-600 mb-12 animate-fadeInUp" style={{
              animationDelay: '0.4s',
              animationFillMode: 'both',
              fontFamily: 'Georgia, serif',
              fontWeight: '300',
              fontStyle: 'italic'
            }}>
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Button */}
            <button
              className="group relative px-12 py-4 text-base font-light overflow-hidden rounded-full transition-all duration-500 hover:scale-105 animate-fadeInUp shadow-lg hover:shadow-xl"
              style={{
                animationDelay: '0.6s',
                animationFillMode: 'both',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.1em'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-rose-100" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3 text-stone-700 uppercase">
                Shop Collection
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
              </span>
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-16">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'w-16 bg-amber-400' 
                      : 'w-8 bg-stone-300 group-hover:bg-amber-300'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/50 text-stone-600 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/50 text-stone-600 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-sm"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}} />

      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-stone-200/30" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-stone-200/30" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          33% { 
            transform: translate(30px, -30px) scale(1.1);
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;