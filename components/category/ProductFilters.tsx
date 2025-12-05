import React, { useState } from 'react';
import { Plus, Minus, Check, Search } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  brands: string[];
  sizes: string[];
  genders: string[];
  colors: string[];
  wheelSizes: string[];
  activeSubcategory: string | null;
  onSubcategoryChange: (sub: string | null) => void;
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
  selectedGenders: string[];
  onGenderToggle: (gender: string) => void;
  selectedColors: string[];
  onColorToggle: (color: string) => void;
  selectedWheelSizes: string[];
  onWheelSizeToggle: (size: string) => void;
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onStockToggle: () => void;
  className?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  brands,
  sizes,
  genders,
  colors,
  wheelSizes,
  activeSubcategory,
  onSubcategoryChange,
  selectedBrands,
  onBrandToggle,
  selectedSizes,
  onSizeToggle,
  selectedGenders,
  onGenderToggle,
  selectedColors,
  onColorToggle,
  selectedWheelSizes,
  onWheelSizeToggle,
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  inStockOnly,
  onStockToggle,
  className = ''
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    wheelSizes: false,
    sizes: false,
    genders: false,
    brands: false,
    colors: false,
    availability: false
  });

  const [brandSearch, setBrandSearch] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const colorMap: Record<string, string> = {
    'Čierna': '#000000',
    'Biela': '#FFFFFF',
    'Červená': '#ef4444',
    'Modrá': '#3b82f6',
    'Zelená': '#22c55e',
    'Oranžová': '#f97316',
    'Sivá': '#6b7280',
    'Žltá': '#eab308',
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* 1. Categories */}
      <div className="border-b border-gray-100 pb-6">
        <button 
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Kategórie
          {openSections.categories ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.categories && (
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <button 
                onClick={() => onSubcategoryChange(null)}
                className={`flex items-center w-full text-left transition-colors ${
                  activeSubcategory === null ? 'text-brand font-bold' : 'text-gray-600 hover:text-black'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${activeSubcategory === null ? 'bg-brand' : 'bg-transparent'}`}></div>
                Všetky
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => onSubcategoryChange(cat)}
                  className={`flex items-center w-full text-left transition-colors ${
                    activeSubcategory === cat ? 'text-brand font-bold' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${activeSubcategory === cat ? 'bg-brand' : 'bg-transparent'}`}></div>
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. Price */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Cena
          {openSections.price ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="font-sans">
             <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">{priceRange[0]} €</span>
                <span className="text-sm font-bold">{priceRange[1]} €</span>
             </div>
             <input 
              type="range" 
              min={minPrice} 
              max={maxPrice} 
              step="10"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
             />
             <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>{minPrice} €</span>
                <span>{maxPrice} €</span>
             </div>
             <div className="flex gap-2 mt-4">
               <input 
                 type="number" 
                 value={priceRange[0]}
                 min={minPrice}
                 max={maxPrice}
                 onChange={(e) => onPriceChange([parseInt(e.target.value) || minPrice, priceRange[1]])}
                 className="w-1/2 p-2 bg-gray-50 border border-gray-200 text-sm font-bold text-center rounded-none focus:outline-none focus:border-brand"
               />
               <span className="text-gray-400">-</span>
               <input 
                 type="number" 
                 value={priceRange[1]}
                 min={minPrice}
                 max={maxPrice}
                 onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                 className="w-1/2 p-2 bg-gray-50 border border-gray-200 text-sm font-bold text-center rounded-none focus:outline-none focus:border-brand"
               />
             </div>
          </div>
        )}
      </div>

      {/* 3. Wheel Sizes (New) */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('wheelSizes')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Veľkosť kolesa
          {openSections.wheelSizes ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.wheelSizes && (
          <div className="flex flex-wrap gap-2 font-sans">
             {wheelSizes.length > 0 ? wheelSizes.map(size => (
               <button
                 key={size}
                 onClick={() => onWheelSizeToggle(size)}
                 className={`px-3 py-2 text-xs font-bold border transition-all rounded-none ${
                   selectedWheelSizes.includes(size) 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                 }`}
               >
                 {size}
               </button>
             )) : (
               <span className="text-xs text-gray-400 italic">Žiadne veľkosti kolies.</span>
             )}
          </div>
        )}
      </div>

      {/* 4. Sizes (Frame Size) */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('sizes')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Veľkosť rámu
          {openSections.sizes ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.sizes && (
          <div className="flex flex-wrap gap-2 font-sans">
             {sizes.length > 0 ? sizes.map(size => (
               <button
                 key={size}
                 onClick={() => onSizeToggle(size)}
                 className={`px-3 py-2 text-xs font-bold border transition-all rounded-none ${
                   selectedSizes.includes(size) 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                 }`}
               >
                 {size}
               </button>
             )) : (
               <span className="text-xs text-gray-400 italic">Žiadne veľkosti.</span>
             )}
          </div>
        )}
      </div>

      {/* 5. Gender */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('genders')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Určenie
          {openSections.genders ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.genders && (
          <ul className="space-y-2 font-sans text-sm">
            {genders.map(gender => (
               <li key={gender}>
                <button 
                  onClick={() => onGenderToggle(gender)}
                  className="flex items-center w-full text-left group"
                >
                  <div className={`w-4 h-4 border mr-3 flex items-center justify-center transition-colors rounded-none flex-shrink-0 ${
                    selectedGenders.includes(gender) ? 'bg-brand border-brand text-white' : 'border-gray-300 group-hover:border-black'
                  }`}>
                    {selectedGenders.includes(gender) && <Check className="w-3 h-3" />}
                  </div>
                  <span className={selectedGenders.includes(gender) ? 'font-bold' : 'text-gray-600'}>{gender}</span>
                </button>
               </li>
            ))}
          </ul>
        )}
      </div>

      {/* 6. Brands */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Značka
          {openSections.brands ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.brands && (
          <div className="space-y-3">
             {/* Search Input */}
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Hľadať značku..." 
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 text-xs font-sans focus:outline-none focus:border-brand rounded-none placeholder-gray-400"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
             </div>

            <ul className="space-y-2 font-sans text-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {filteredBrands.length > 0 ? (
                filteredBrands.map(brand => (
                  <li key={brand} className="flex items-center">
                    <button 
                      onClick={() => onBrandToggle(brand)}
                      className="flex items-center w-full text-left group"
                    >
                      <div className={`w-4 h-4 border mr-3 flex items-center justify-center transition-colors rounded-none flex-shrink-0 ${
                        selectedBrands.includes(brand) ? 'bg-brand border-brand text-white' : 'border-gray-300 group-hover:border-black'
                      }`}>
                        {selectedBrands.includes(brand) && <Check className="w-3 h-3" />}
                      </div>
                      <span className={selectedBrands.includes(brand) ? 'font-bold' : 'text-gray-600'}>{brand}</span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400 italic py-2">Nenašla sa žiadna značka.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 7. Colors */}
      <div className="border-b border-gray-100 pb-6">
         <button 
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Farba
          {openSections.colors ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.colors && (
          <div className="flex flex-wrap gap-3">
             {colors.map(color => {
               const hex = colorMap[color] || '#cccccc';
               const isWhite = hex.toLowerCase() === '#ffffff';
               
               return (
                <button
                 key={color}
                 onClick={() => onColorToggle(color)}
                 className={`w-8 h-8 rounded-full border shadow-sm transition-all flex items-center justify-center relative ${
                   selectedColors.includes(color) 
                    ? 'ring-2 ring-brand ring-offset-2' 
                    : 'hover:scale-110'
                 }`}
                 style={{ backgroundColor: hex, borderColor: isWhite ? '#e5e7eb' : 'transparent' }}
                 title={color}
               >
                 {selectedColors.includes(color) && (
                   <Check className={`w-4 h-4 ${isWhite ? 'text-black' : 'text-white'}`} />
                 )}
               </button>
               )
             })}
          </div>
        )}
      </div>

      {/* 8. Availability */}
      <div>
         <button 
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full font-bold uppercase tracking-wider text-sm mb-4 font-tech"
        >
          Dostupnosť
          {openSections.availability ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        {openSections.availability && (
          <div className="font-sans text-sm">
            <button 
              onClick={onStockToggle}
              className="flex items-center w-full text-left group"
            >
              <div className={`w-4 h-4 border mr-3 flex items-center justify-center transition-colors rounded-none ${
                inStockOnly ? 'bg-brand border-brand text-white' : 'border-gray-300 group-hover:border-black'
              }`}>
                {inStockOnly && <Check className="w-3 h-3" />}
              </div>
              <span className={inStockOnly ? 'font-bold' : 'text-gray-600'}>Iba skladom</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductFilters;