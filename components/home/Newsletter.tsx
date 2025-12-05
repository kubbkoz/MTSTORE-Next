import React from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6 font-tech tracking-wide leading-none">
            Nezmeškaj žiadnu <span className="text-brand">jazdu</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg md:text-xl font-light font-sans">
            Prihlás sa na odber newslettra a získaj prístup k exkluzívnym ponukám, 
            novinkám a tipom od profesionálov. Získaj zľavu 10% na prvý nákup.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Tvoj email..." 
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-brand focus:bg-white/20 transition-all font-medium font-sans"
            />
            <Button size="lg" className="whitespace-nowrap text-lg tracking-wider uppercase">
              Odoberať <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
          
          <p className="mt-6 text-xs text-gray-600 uppercase tracking-widest font-sans">
            Prihlásením súhlasíte so spracovaním osobných údajov.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;