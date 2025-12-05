import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, ArrowRight, Scale } from 'lucide-react';
import { ALL_PRODUCTS } from '../../constants';
import { Product } from '../../types';
import Button from '../ui/Button';
import QuickViewModal from '../ui/QuickViewModal';
import AddToCartButton from '../ui/AddToCartButton';

interface FlashSalesProps {
  onNavigateToProduct?: (product: Product) => void;
  compareList?: Product[];
  onToggleCompare?: (e: React.MouseEvent, product: Product) => void;
}

const FlashSales: React.FC<FlashSalesProps> = ({ 
  onNavigateToProduct,
  compareList = [],
  onToggleCompare
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products that have discounts for the flash sale
  const flashSaleProducts = ALL_PRODUCTS.filter(p => p.oldPrice).slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
              else clearInterval(timer);
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Autoscroll logic
  useEffect(() => {
    let scrollInterval: ReturnType<typeof setInterval>;

    if (!isPaused) {
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
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
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

  const calculateDiscount = (product: Product) => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  const handleViewDetails = (product: Product) => {
    if (onNavigateToProduct) {
      setSelectedProduct(null);
      onNavigateToProduct(product);
    }
  };

  const handleProductClick = (product: Product) => {
    if (onNavigateToProduct) {
      onNavigateToProduct(product);
    }
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  const timerItems = [
    { label: 'Dní', value: timeLeft.days },
    { label: 'Hodín', value: timeLeft.hours },
    { label: 'Minút', value: timeLeft.minutes },
    { label: 'Sekúnd', value: timeLeft.seconds }
  ];

  return (
    <>
      <section className="py-24 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6 relative">
            
            {/* Left: Title */}
            <div className="text-left w-full lg:w-auto">
               <h2 className="text-5xl md:text-6xl font-black uppercase italic font-tech tracking-wide leading-none mb-4">
                 Bleskové <span className="text-brand">zľavy</span>
               </h2>
               <div className="w-24 h-1.5 bg-brand skew-x-[-20deg]"></div>
            </div>

            {/* Center: Timer with Fire Icon */}
            <div className="flex-1 flex justify-center items-end pb-1 w-full lg:w-auto">
                <div className="flex items-end gap-3 md:gap-4">
                    <span className="text-4xl md:text-5xl animate-pulse mb-1">🔥</span>
                    <div className="flex items-center gap-2">
                        {timerItems.map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="text-center group min-w-[3rem] md:min-w-[4rem]">
                              <div className="text-3xl md:text-4xl font-black font-tech text-black leading-none group-hover:text-brand transition-colors bg-white px-2 py-1 shadow-sm border border-gray-200">
                                {item.value.toString().padStart(2, '0')}
                              </div>
                            </div>
                            {idx < 3 && (
                              <div className="text-3xl md:text-4xl font-black font-tech text-gray-300 mx-1 mb-1">:</div>
                            )}
                          </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Navigation Buttons */}
            <div className="hidden lg:flex gap-3 pb-1">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 border border-gray-200 bg-white hover:border-brand hover:bg-brand hover:text-white flex items-center justify-center transition-all rounded-none shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 border border-gray-200 bg-white hover:border-brand hover:bg-brand hover:text-white flex items-center justify-center transition-all rounded-none shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 -mx-4 px-4 md:px-0 scroll-smooth snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {flashSaleProducts.map((product) => (
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
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  />

                  {/* Quick Actions */}
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
                      >
                        <Scale className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

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

                {/* Info Area */}
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

                  <div className="flex justify-center items-center gap-3">
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-lg font-tech">{product.oldPrice} €</span>
                    )}
                    <span className="text-3xl font-black font-tech text-black">{product.price} €</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Spacer for end of scroll */}
            <div className="min-w-[1px] opacity-0"></div>
          </div>

          <QuickViewModal 
            isOpen={!!selectedProduct} 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onViewDetails={() => selectedProduct && handleViewDetails(selectedProduct)}
          />
        </div>
      </section>
    </>
  );
};

export default FlashSales;