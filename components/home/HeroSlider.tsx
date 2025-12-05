
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { HERO_SLIDES } from '../../constants';
import Button from '../ui/Button';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // Pause auto-slide if user is interacting with a hotspot
      if (!activeHotspot) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, activeHotspot]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setActiveHotspot(null);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setActiveHotspot(null);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out transform scale-105"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-20 pt-20 md:pt-48">
        <div className="max-w-3xl animate-slide-up pl-4 md:pl-0 border-l-4 border-brand md:border-0 md:pl-0">
          <div className="inline-block bg-brand px-6 py-2 mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white font-tech transform -skew-x-12">
            <span className="block transform skew-x-12">Kolekcia 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[0.85] uppercase italic font-tech tracking-wide">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-lg font-light leading-relaxed font-sans">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-sm md:text-base tracking-wider">{slide.cta}</Button>
            <Button size="lg" variant="outline" className="text-sm md:text-base tracking-wider">Zobraziť galériu</Button>
          </div>
        </div>
      </div>

      {/* Interactive Hotspots (Only for slides that have them) */}
      {slide.hotspots && (
        <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
          {slide.hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute w-8 h-8 pointer-events-auto"
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* The Dot */}
              <button 
                className={`relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeHotspot === spot.id ? 'bg-brand scale-110' : 'bg-white/20 backdrop-blur-sm hover:bg-brand/80'
                }`}
              >
                <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse-slow"></div>
                <Plus className={`w-4 h-4 ${activeHotspot === spot.id ? 'text-white' : 'text-white'}`} />
              </button>

              {/* The Tooltip/Card */}
              <div 
                className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 w-96 bg-black/90 backdrop-blur-md p-6 rounded-none shadow-2xl border-l-4 border-brand transition-all duration-300 origin-left ${
                  activeHotspot === spot.id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
              >
                <h3 className="text-white font-bold text-2xl mb-1 font-tech uppercase">{spot.label}</h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed font-sans">{spot.description}</p>
                <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                  <span className="text-brand font-bold text-lg font-tech">{spot.price}</span>
                  <a href="#" className="text-xs text-white uppercase tracking-wider hover:text-brand transition-colors font-sans">Viac info &rarr;</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-2 z-30">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 border border-white/30 hover:bg-brand hover:border-brand flex items-center justify-center transition-all text-white bg-black/50 backdrop-blur-sm rounded-none"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-14 h-14 border border-white/30 hover:bg-brand hover:border-brand flex items-center justify-center transition-all text-white bg-black/50 backdrop-blur-sm rounded-none"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-10 md:left-20 flex space-x-3 z-30">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-none ${
              currentSlide === idx ? 'w-16 bg-brand' : 'w-8 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
