import React from 'react';
import Button from '../ui/Button';

const PromoBanner: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-fixed bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2000&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-brand font-bold tracking-[0.2em] uppercase mb-4 block animate-fade-in font-tech text-xl">Limitovaná ponuka</span>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 uppercase italic leading-[0.85] font-tech tracking-wide">
          Jazdi ako <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-500">Profesionál</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light leading-relaxed font-sans">
          Vylepši svoj výkon s najnovšou kolekciou oblečenia Fox Racing 2026. 
          Aerodynamika, pohodlie a štýl v jednom.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg" className="text-lg tracking-wider uppercase">Nakupovať oblečenie</Button>
          <Button variant="white" size="lg" className="text-lg tracking-wider uppercase">Čítať recenzie</Button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;