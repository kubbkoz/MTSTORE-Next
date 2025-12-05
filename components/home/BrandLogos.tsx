
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ALL_PRODUCTS } from '../../constants';

interface BrandLogosProps {
  onViewAll?: () => void;
}

const BrandLogos: React.FC<BrandLogosProps> = ({ onViewAll }) => {
  // Extract all unique brands from products and sort them
  const allBrands = Array.from(new Set(ALL_PRODUCTS.map(p => p.brand).filter(Boolean) as string[])).sort();
  
  // Show max 9 brands so the "All Brands" button acts as the 10th item
  const displayedBrands = allBrands.slice(0, 9);

  return (
    <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="container mx-auto px-4">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-12 font-sans">
                Autorizovaný predajca svetových značiek
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10">
                {displayedBrands.map((brand) => (
                    <div key={brand} className="group cursor-default select-none transition-all duration-300 hover:scale-105">
                        <span className="text-4xl md:text-5xl font-black font-tech uppercase text-gray-300 group-hover:text-black transition-colors duration-300">
                            {brand}
                        </span>
                    </div>
                ))}
                
                {/* View All Button - Acts as the 10th position */}
                <button 
                  onClick={onViewAll}
                  className="group flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-brand group-hover:bg-brand transition-all duration-300 mb-2">
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-brand transition-colors">
                        Všetky značky
                    </span>
                </button>
            </div>
        </div>
    </section>
  );
};

export default BrandLogos;
