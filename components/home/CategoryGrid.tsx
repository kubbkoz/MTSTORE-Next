import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../constants';

const CategoryGrid: React.FC = () => {
  // Helper funkcia na vynútenie WebP formátu a optimalizáciu z Unsplash
  const getOptimizedImageUrl = (url: string) => {
    if (!url.includes('images.unsplash.com')) return url;
    
    // Nahradíme auto=format za fm=webp pre explicitný WebP
    // Prípadne upravíme kvalitu na q=75 pre menšiu veľkosť súboru
    let newUrl = url;
    
    if (newUrl.includes('auto=format')) {
      newUrl = newUrl.replace('auto=format', 'fm=webp');
    } else if (!newUrl.includes('fm=')) {
      newUrl += '&fm=webp';
    }

    // Jemná optimalizácia kvality ak ešte nie je nastavená inak
    if (!newUrl.includes('q=')) {
      newUrl += '&q=75';
    }

    return newUrl;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-black italic uppercase mb-4 font-tech tracking-wide">
              Vyber si svoju <span className="text-brand">kategóriu</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg] mb-6"></div>
            <p className="text-gray-500 font-medium font-sans">Objav našu širokú ponuku bicyklov, e-bikov, ale aj doplnkov a komponentov.</p>
          </div>
          <a href="#" className="hidden md:flex items-center font-bold hover:text-brand transition-colors uppercase tracking-wider text-sm mb-2">
            Všetky kategórie <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, index) => (
            <a 
              key={cat.id} 
              href={cat.link}
              className="group relative h-[315px] overflow-hidden rounded-sm block bg-gray-100"
            >
              <img 
                src={getOptimizedImageUrl(cat.image)} 
                alt={cat.title} 
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-1 bg-brand mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <h3 className="text-3xl font-black text-white mb-2 uppercase italic font-tech leading-none tracking-wide break-words">{cat.title}</h3>
                <div className="flex items-center text-brand font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  Prezrieť <ArrowUpRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;