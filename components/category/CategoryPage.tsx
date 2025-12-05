
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../../types';
import { ALL_PRODUCTS, NAV_LINKS } from '../../constants';
import { Filter, Grid, List, ChevronDown, ArrowRight, ArrowLeft, Heart, Scale, Eye } from 'lucide-react';
import Button from '../ui/Button';
import ProductFilters from './ProductFilters';
import QuickViewModal from '../ui/QuickViewModal';

interface CategoryPageProps {
  categoryName: string;
  initialSubcategory?: string | null;
  onNavigateToProduct: (product: Product) => void;
  onBack: () => void;
  compareList: Product[];
  onToggleCompare: (e: React.MouseEvent, product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ 
  categoryName, 
  initialSubcategory, 
  onNavigateToProduct, 
  onBack,
  compareList,
  onToggleCompare
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Derived Data
  const currentCategoryDef = NAV_LINKS.find(n => n.name === categoryName);
  const subcategories = currentCategoryDef?.subcategories || [];
  
  const categoryProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => p.category === categoryName);
  }, [categoryName]);

  // Calculate Min and Max Prices for the category
  const { minPrice, maxPrice } = useMemo(() => {
    if (categoryProducts.length === 0) return { minPrice: 0, maxPrice: 10000 };
    const prices = categoryProducts.map(p => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [categoryProducts]);

  // Filters
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(initialSubcategory || null);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedWheelSizes, setSelectedWheelSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'discount_desc' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'>('recommended');

  // Reset filters when category changes
  useEffect(() => {
    setActiveSubcategory(initialSubcategory || null);
    
    // Recalculate range for the new category to set defaults
    const products = ALL_PRODUCTS.filter(p => p.category === categoryName);
    if (products.length > 0) {
       const prices = products.map(p => p.price);
       setPriceRange([Math.min(...prices), Math.max(...prices)]);
    } else {
       setPriceRange([0, 10000]);
    }

    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedGenders([]);
    setSelectedColors([]);
    setSelectedWheelSizes([]);
    setInStockOnly(false);
    setVisibleCount(12);
    setSortBy('recommended');
  }, [categoryName, initialSubcategory]);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.brand || 'Other'))).sort();
  }, [categoryProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    categoryProducts.forEach(p => {
      p.variants?.forEach(v => sizes.add(v.size));
    });
    return Array.from(sizes).sort();
  }, [categoryProducts]);

  const availableGenders = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.gender).filter(Boolean) as string[])).sort();
  }, [categoryProducts]);

  const availableColors = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.color).filter(Boolean) as string[])).sort();
  }, [categoryProducts]);

  const availableWheelSizes = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.wheelSize).filter(Boolean) as string[]))
      .sort((a, b) => parseFloat(b) - parseFloat(a)); // Sort descending (e.g., 29" first)
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (activeSubcategory) {
      result = result.filter(p => p.subcategory === activeSubcategory);
    }

    if (inStockOnly) {
      result = result.filter(p => p.variants?.some(v => v.stockStatus === 'in_stock'));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand || 'Other'));
    }

    if (selectedSizes.length > 0) {
      result = result.filter(p => p.variants?.some(v => selectedSizes.includes(v.size)));
    }

    if (selectedGenders.length > 0) {
      result = result.filter(p => p.gender && selectedGenders.includes(p.gender));
    }

    if (selectedColors.length > 0) {
      result = result.filter(p => p.color && selectedColors.includes(p.color));
    }

    if (selectedWheelSizes.length > 0) {
      result = result.filter(p => p.wheelSize && selectedWheelSizes.includes(p.wheelSize));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // Sort by badge 'Novinka' first
        result.sort((a, b) => {
          if (a.badge === 'Novinka' && b.badge !== 'Novinka') return -1;
          if (a.badge !== 'Novinka' && b.badge === 'Novinka') return 1;
          return 0;
        });
        break;
      case 'discount_desc':
        result.sort((a, b) => {
            const discountA = a.oldPrice && a.oldPrice > a.price ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
            const discountB = b.oldPrice && b.oldPrice > b.price ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
            return discountB - discountA;
        });
        break;
      case 'recommended':
      default:
        // Default order
        break;
    }

    return result;
  }, [categoryProducts, activeSubcategory, inStockOnly, selectedBrands, selectedSizes, selectedGenders, selectedColors, selectedWheelSizes, priceRange, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleGenderToggle = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleWheelSizeToggle = (size: string) => {
    setSelectedWheelSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const calculateDiscount = (product: Product) => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  return (
    <div className="pt-24 lg:pt-48 bg-white min-h-screen animate-fade-in font-sans">
      
      {/* Category Header */}
      <div className="relative bg-black text-white h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={categoryProducts[0]?.image || 'https://images.unsplash.com/photo-1576435728678-38d01d52e38b?q=80&w=2500&auto=format&fit=crop'} 
            alt={categoryName} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <button onClick={onBack} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-brand mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Domov
          </button>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic font-tech tracking-wide mb-2">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-300 font-sans max-w-2xl font-light">
            Objavte našu prémiovú ponuku v kategórii {categoryName}. Kvalita bez kompromisov.
          </p>
        </div>
      </div>

      {/* Subcategory Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-20 lg:top-44 z-30 shadow-sm transition-all">
        <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
          <div className="flex whitespace-nowrap gap-8">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeSubcategory === null ? 'border-brand text-black' : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Všetky
            </button>
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeSubcategory === sub ? 'border-brand text-black' : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
             <ProductFilters 
                categories={subcategories}
                brands={availableBrands}
                sizes={availableSizes}
                genders={availableGenders}
                colors={availableColors}
                wheelSizes={availableWheelSizes}
                activeSubcategory={activeSubcategory}
                onSubcategoryChange={setActiveSubcategory}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                selectedSizes={selectedSizes}
                onSizeToggle={handleSizeToggle}
                selectedGenders={selectedGenders}
                onGenderToggle={handleGenderToggle}
                selectedColors={selectedColors}
                onColorToggle={handleColorToggle}
                selectedWheelSizes={selectedWheelSizes}
                onWheelSizeToggle={handleWheelSizeToggle}
                priceRange={priceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={setPriceRange}
                inStockOnly={inStockOnly}
                onStockToggle={() => setInStockOnly(!inStockOnly)}
             />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-50 p-4 rounded-none border border-gray-100">
              <div className="flex items-center gap-4">
                 <Button 
                   variant="outline" 
                   size="sm" 
                   className="lg:hidden flex items-center"
                   onClick={() => setIsMobileFilterOpen(true)}
                 >
                   <Filter className="w-4 h-4 mr-2" /> Filtre
                 </Button>
                 <span className="text-sm font-bold text-gray-500 font-sans uppercase tracking-wider">
                   {filteredProducts.length} produktov
                 </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 bg-white">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-brand bg-gray-50' : 'text-gray-400 hover:text-black'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'text-brand bg-gray-50' : 'text-gray-400 hover:text-black'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2 text-sm font-bold tracking-wider focus:outline-none focus:border-brand cursor-pointer rounded-none"
                  >
                    <option value="recommended">Odporúčané</option>
                    <option value="newest">Najnovšie</option>
                    <option value="discount_desc">Podľa zľavy</option>
                    <option value="price_asc">Od najlacnejších</option>
                    <option value="price_desc">Od najdrahších</option>
                    <option value="name_asc">Abecedne A-Z</option>
                    <option value="name_desc">Abecedne Z-A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {visibleProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {visibleProducts.map(product => (
                  <div 
                    key={product.id} 
                    className={`group bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 rounded-none ${
                      viewMode === 'list' ? 'flex flex-row items-stretch gap-0' : 'flex flex-col'
                    }`}
                  >
                    <div className={`relative overflow-hidden bg-gray-50 flex items-center justify-center ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-[320px] w-full p-8'}`}>
                        {product.oldPrice && (
                          <span className="absolute top-0 left-0 z-20 px-3 py-2 text-base font-black text-white uppercase tracking-wider font-tech bg-brand shadow-xl">
                            -{calculateDiscount(product)}%
                          </span>
                        )}
                         {!product.oldPrice && product.badge && (
                            <span className={`absolute top-0 left-0 z-20 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider font-tech
                              ${product.badge === 'Novinka' ? 'bg-blue-600' : 'bg-black'}
                            `}>
                              {product.badge}
                            </span>
                          )}

                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                          onClick={() => onNavigateToProduct(product)}
                        />
                        
                        {/* Hover Icons Overlay */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                           <button className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand" title="Pridať do obľúbených">
                              <Heart className="w-5 h-5" />
                           </button>
                           <button 
                              onClick={(e) => onToggleCompare(e, product)}
                              className={`w-10 h-10 rounded-none flex items-center justify-center shadow-lg transition-colors border border-transparent ${
                                isInCompare(product.id) ? 'bg-brand text-white' : 'bg-white hover:bg-brand hover:text-white hover:border-brand'
                              }`}
                              title="Porovnať produkt"
                           >
                              <Scale className="w-5 h-5" />
                           </button>
                           <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                              className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand"
                              title="Rýchly náhľad"
                           >
                              <Eye className="w-5 h-5" />
                           </button>
                        </div>

                         {/* Bottom Overlay Action (Grid View) */}
                         {viewMode === 'grid' && (
                           <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent">
                               <Button 
                                fullWidth 
                                size="md"
                                className="uppercase tracking-wider font-bold shadow-lg text-xs"
                                onClick={() => onNavigateToProduct(product)}
                              >
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Zobraziť detail
                              </Button>
                           </div>
                         )}
                    </div>

                    <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : 'text-center'}`}>
                       <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 block font-sans">{product.brand}</span>
                       <h3 
                         onClick={() => onNavigateToProduct(product)}
                         className={`font-black font-tech uppercase tracking-wide mb-3 cursor-pointer hover:text-brand transition-colors leading-none ${viewMode === 'list' ? 'text-3xl' : 'text-xl'}`}
                        >
                         {product.name}
                       </h3>

                       {/* Variant Preview Chips */}
                       {product.variants && product.variants.length > 0 && (
                          <div className={`flex flex-wrap gap-1.5 mb-4 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                            {product.variants.slice(0, 5).map(v => {
                              let stockColor = "bg-gray-200 border-gray-200";
                              if (v.stockStatus === 'in_stock') stockColor = "bg-green-500 border-green-500";
                              else if (v.stockStatus === 'on_order') stockColor = "bg-orange-500 border-orange-500";
                              
                              return (
                                <div key={v.size} className="relative group/variant">
                                  <span className="block border border-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600 min-w-[28px] text-center hover:border-black transition-colors cursor-default bg-gray-50">
                                    {v.size}
                                  </span>
                                  <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${stockColor} border border-white shadow-sm`}></span>
                                </div>
                              )
                            })}
                            {product.variants.length > 5 && (
                              <span className="text-[10px] text-gray-400 flex items-center">+</span>
                            )}
                          </div>
                       )}

                       <div className={`flex items-baseline gap-3 ${viewMode === 'list' ? 'mb-4' : 'justify-center mb-0'}`}>
                          {product.oldPrice && <span className="text-gray-400 line-through text-lg font-tech">{product.oldPrice} €</span>}
                          <span className="text-3xl font-black font-tech text-black">{product.price} €</span>
                       </div>
                       
                       {viewMode === 'list' && (
                         <div className="mt-4">
                           <p className="text-gray-600 text-sm line-clamp-2 mb-6 font-sans max-w-2xl">{product.description}</p>
                           <Button 
                              size="md"
                              className="uppercase tracking-wider font-bold shadow-lg"
                              onClick={() => onNavigateToProduct(product)}
                            >
                              Detail produktu
                            </Button>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50">
                <p className="text-2xl font-bold text-gray-400 font-tech uppercase mb-2">Nenašli sa žiadne produkty</p>
                <p className="text-gray-500 mb-8 font-sans">Skúste zmeniť nastavenia filtrov alebo hľadajte niečo iné.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Reset to computed min/max
                    setPriceRange([minPrice, maxPrice]);
                    setSelectedBrands([]);
                    setSelectedSizes([]);
                    setSelectedGenders([]);
                    setSelectedColors([]);
                    setSelectedWheelSizes([]);
                    setInStockOnly(false);
                    setActiveSubcategory(null);
                  }}
                  className="uppercase tracking-widest font-bold"
                >
                  Vymazať všetky filtre
                </Button>
              </div>
            )}

            {/* Pagination / Load More */}
            {hasMore && (
              <div className="mt-20 text-center">
                <p className="text-gray-400 text-xs mb-4 font-bold uppercase tracking-widest font-sans">
                  Zobrazených {visibleCount} z {filteredProducts.length} produktov
                </p>
                <div className="w-64 h-1 bg-gray-100 mx-auto mb-8 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand transition-all duration-500"
                    style={{ width: `${(visibleCount / filteredProducts.length) * 100}%` }}
                  ></div>
                </div>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="uppercase tracking-widest font-bold border-gray-300 hover:border-black"
                >
                  Načítať ďalšie produkty
                </Button>
              </div>
            )}
            
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black uppercase font-tech">Filtrovať produkty</h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 hover:text-black">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <ProductFilters 
             categories={subcategories}
             brands={availableBrands}
             sizes={availableSizes}
             genders={availableGenders}
             colors={availableColors}
             wheelSizes={availableWheelSizes}
             activeSubcategory={activeSubcategory}
             onSubcategoryChange={(cat) => { setActiveSubcategory(cat); setIsMobileFilterOpen(false); }}
             selectedBrands={selectedBrands}
             onBrandToggle={handleBrandToggle}
             selectedSizes={selectedSizes}
             onSizeToggle={handleSizeToggle}
             selectedGenders={selectedGenders}
             onGenderToggle={handleGenderToggle}
             selectedColors={selectedColors}
             onColorToggle={handleColorToggle}
             selectedWheelSizes={selectedWheelSizes}
             onWheelSizeToggle={handleWheelSizeToggle}
             priceRange={priceRange}
             minPrice={minPrice}
             maxPrice={maxPrice}
             onPriceChange={setPriceRange}
             inStockOnly={inStockOnly}
             onStockToggle={() => setInStockOnly(!inStockOnly)}
          />
          <div className="mt-8 pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
            <Button fullWidth size="lg" onClick={() => setIsMobileFilterOpen(false)} className="uppercase font-bold tracking-wider">
              Zobraziť {filteredProducts.length} produktov
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <QuickViewModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onViewDetails={() => selectedProduct && onNavigateToProduct(selectedProduct)}
      />

    </div>
  );
};

export default CategoryPage;
