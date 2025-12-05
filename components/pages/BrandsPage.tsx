
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ALL_PRODUCTS } from '../../constants';
import Button from '../ui/Button';

interface BrandsPageProps {
  onBack: () => void;
}

const BrandsPage: React.FC<BrandsPageProps> = ({ onBack }) => {
  // Extract all unique brands
  const brands = Array.from(new Set(ALL_PRODUCTS.map(p => p.brand).filter(Boolean) as string[])).sort();

  return (
    <div className="pt-24 lg:pt-48 pb-20 bg-white min-h-screen animate-fade-in font-sans">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-brand transition-colors mb-6 text-sm font-bold uppercase tracking-wider font-sans"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Späť na úvod
          </button>
          
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-4 font-tech tracking-wide">
              Všetky <span className="text-brand">značky</span>
            </h1>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg] mb-6"></div>
            <p className="text-gray-500 font-medium font-sans text-lg max-w-2xl">
              Sme hrdým partnerom popredných svetových výrobcov. 
              Prezrite si kompletný zoznam značiek, ktoré nájdete v našej ponuke.
            </p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {brands.map((brand) => (
            <div 
              key={brand} 
              className="group bg-gray-50 h-40 flex items-center justify-center border border-gray-100 hover:border-brand/50 hover:shadow-xl transition-all duration-300 rounded-none cursor-pointer"
            >
              <div className="text-center">
                 {/* 
                   Ideally this would be an <img> with brand logo. 
                   Using stylized text as placeholder as per current design system.
                 */}
                 <span className="text-3xl md:text-4xl font-black font-tech uppercase text-gray-400 group-hover:text-black transition-colors duration-300 block">
                    {brand}
                 </span>
                 <span className="inline-block mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-brand uppercase tracking-wider">
                    Zobraziť produkty
                 </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State / Join Us */}
        <div className="mt-20 p-12 bg-black text-white text-center">
            <h3 className="text-2xl font-black uppercase font-tech mb-4">Chýba vám tu nejaká značka?</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Neustále rozširujeme našu ponuku. Napíšte nám, akú značku by ste radi videli v našom sortimente.
            </p>
            <Button variant="white" className="uppercase font-bold tracking-wider">
                Napíšte nám
            </Button>
        </div>

      </div>
    </div>
  );
};

export default BrandsPage;
