import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight, Sparkles, Loader2, ArrowRight, Scale } from 'lucide-react';
import { RECOMMENDED_PRODUCTS } from '../../constants';
import { Product } from '../../types';
import Button from '../ui/Button';
import QuickViewModal from '../ui/QuickViewModal';
import { generateImageWithGemini } from '../../utils/gemini';
import AddToCartButton from '../ui/AddToCartButton';

interface RecommendedProductsProps {
  onNavigateToProduct?: (product: Product) => void;
  compareList?: Product[];
  onToggleCompare?: (e: React.MouseEvent, product: Product) => void;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/f3f4f6/9ca3af?text=MT-SPORT";

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ 
  onNavigateToProduct,
  compareList = [],
  onToggleCompare
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Všetko');
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from products
  const categories = ['Všetko', ...Array.from(new Set(RECOMMENDED_PRODUCTS.map(p => p.category)))];

  const filteredProducts = activeCategory === 'Všetko' 
    ? RECOMMENDED_PRODUCTS 
    : RECOMMENDED_PRODUCTS.filter(p => p.category === activeCategory);

  // Autoscroll logic
  useEffect(() => {
    let scrollInterval: ReturnType<typeof setInterval>;

    if (!isPaused && filteredProducts.length > 3) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          // Check if we are near the end
          const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
          
          const targetScroll = isEnd ? 0 : scrollLeft + 350; // Scroll one card width or reset

          scrollContainerRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
          });
        }
      }, 3000); // Scroll every 3 seconds
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused, filteredProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Reset scroll position when filter changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleViewDetails = (product: Product) => {
    if (onNavigateToProduct) {
      setSelectedProduct(null); // Close modal if open
      onNavigateToProduct(product);
    }
  };

  const handleProductClick = (product: Product) => {
    // Navigate directly to details
    if (onNavigateToProduct) {
      onNavigateToProduct(product);
    }
  };

  const handleGenerateImage = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent card click
    setGeneratingId(product.id);
    try {
      const prompt = `Professional product studio photography of ${product.name}, ${product.category}, white background, high quality, realistic`;
      const imageUrl = await generateImageWithGemini(prompt);
      setGeneratedImages(prev => ({ ...prev, [product.id]: imageUrl }));
    } catch (err) {
      console.error("Failed to generate image", err);
      // Optional: show error toast or alert
    } finally {
      setGeneratingId(null);
    }
  };

  const calculateDiscount = (product: Product) => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  return (
    <>
      <section className="py-24 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div className="text-left w-full md:w-auto">
              <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 font-tech tracking-wide">
                Odporúčané pre <span className="text-brand">Teba</span>
              </h2>
              <div className="w-24 h-1.5 bg-brand skew-x-[-20deg] mb-6"></div>
              <p className="text-gray-500 max-w-xl font-medium font-sans">Na základe tvojich preferencií sme vybrali produkty, ktoré posunú tvoju jazdu na vyšší level.</p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="hidden md:flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 border border-gray-200 bg-white hover:border-brand hover:bg-brand hover:text-white flex items-center justify-center transition-all rounded-none shadow-sm"
                aria-label="Previous items"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 border border-gray-200 bg-white hover:border-brand hover:bg-brand hover:text-white flex items-center justify-center transition-all rounded-none shadow-sm"
                aria-label="Next items"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10 animate-fade-in">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-300 border font-sans ${
                  activeCategory === cat 
                    ? 'bg-brand border-brand text-white shadow-lg transform scale-105' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-brand hover:text-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 -mx-4 px-4 md:px-0 scroll-smooth snap-x snap-mandatory hide-scrollbar"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const displayImage = generatedImages[product.id] || product.image || PLACEHOLDER_IMAGE;
                const isPlaceholder = displayImage === PLACEHOLDER_IMAGE;

                return (
                  <div 
                    key={product.id} 
                    className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px] snap-center group bg-white rounded-none shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in"
                  >
                    {/* Image Area */}
                    <div className="relative h-[300px] overflow-hidden bg-white p-6 mb-2 flex items-center justify-center">
                       {product.oldPrice && (
                        <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-lg font-black text-white uppercase tracking-wider font-tech bg-brand shadow-lg transform -rotate-2">
                          -{calculateDiscount(product)}%
                        </span>
                      )}
                      {!product.oldPrice && product.badge && (
                        <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-sm font-bold text-white uppercase tracking-wider font-tech
                          ${product.badge === 'Novinka' ? 'bg-blue-600' : 'bg-black'}
                        `}>
                          {product.badge}
                        </span>
                      )}
                      
                      <img 
                        src={displayImage} 
                        alt={product.name} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Prevent infinite loop if placeholder also fails
                          if (target.src !== PLACEHOLDER_IMAGE) {
                            target.src = PLACEHOLDER_IMAGE;
                          }
                        }}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 cursor-pointer" 
                        onClick={() => handleProductClick(product)}
                      />

                      {/* Generate Image Button for missing/placeholders */}
                      {isPlaceholder && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                           <button 
                             onClick={(e) => handleGenerateImage(e, product)}
                             disabled={generatingId === product.id}
                             className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-none hover:text-brand transition-colors text-gray-500 border border-gray-200 hover:border-brand"
                           >
                             {generatingId === product.id ? (
                               <Loader2 className="w-8 h-8 animate-spin mb-2" />
                             ) : (
                               <Sparkles className="w-8 h-8 mb-2" />
                             )}
                             <span className="font-bold uppercase text-xs tracking-wider">
                               {generatingId === product.id ? 'Generujem...' : 'Vygenerovať s AI'}
                             </span>
                           </button>
                        </div>
                      )}

                      {/* Quick Actions (only if not generating/placeholder) */}
                      {!isPlaceholder && (
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                          <button className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand">
                            <Heart className="w-5 h-5" />
                          </button>
                          {onToggleCompare && (
                            <button 
                              onClick={(e) => onToggleCompare(e, product)}
                              className={`w-10 h-10 rounded-none flex items-center justify-center shadow-lg transition-colors border border-transparent ${
                                isInCompare(product.id) ? 'bg-brand text-white' : 'bg-white hover:bg-brand hover:text-white hover:border-brand'
                              }`}
                              title="Porovnať produkt"
                            >
                              <Scale className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {/* Add to Cart Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent">
                          <AddToCartButton 
                            product={product} 
                            fullWidth 
                            className="shadow-xl"
                            variant={product.hasVariants ? 'compact' : 'primary'}
                            showText={true}
                          />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center p-6 pt-0">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wide font-sans">{product.category}</p>
                      <h3 
                        className="text-2xl font-bold mb-3 group-hover:text-brand transition-colors cursor-pointer leading-none font-tech uppercase tracking-wide"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </h3>

                      {/* Variant Chips */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                          {product.variants.slice(0, 5).map(v => {
                            let stockColor = "bg-gray-200 border-gray-200";
                            let animateClass = "";
                            if (v.stockStatus === 'in_stock') {
                              stockColor = "bg-green-500 border-green-500";
                              animateClass = "animate-pulse";
                            }
                            else if (v.stockStatus === 'on_order') stockColor = "bg-orange-500 border-orange-500";
                            
                            return (
                              <div key={v.size} className="relative group/variant">
                                <span className="block border border-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600 min-w-[28px] text-center hover:border-black transition-colors cursor-default bg-gray-50">
                                  {v.size}
                                </span>
                                <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${stockColor} border border-white shadow-sm ${animateClass}`}></span>
                              </div>
                            )
                          })}
                          {product.variants.length > 5 && (
                            <span className="text-[10px] text-gray-400 flex items-center">+</span>
                          )}
                        </div>
                      )}

                      <div className="flex justify-center items-center gap-3">
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through text-lg font-tech">{product.oldPrice} €</span>
                        )}
                        <span className="text-3xl font-black text-black font-tech">{product.price} €</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full py-10 text-center text-gray-400 italic">
                Pre túto kategóriu neboli nájdené žiadne produkty.
              </div>
            )}
            
            {/* Fake padding/element at end for better mobile scrolling */}
            <div className="min-w-[1px] opacity-0"></div>
          </div>
        </div>
      </section>

      {/* Quick View Modal - only open when explicitly requested via icon */}
      <QuickViewModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onViewDetails={() => selectedProduct && handleViewDetails(selectedProduct)}
      />
    </>
  );
};

export default RecommendedProducts;