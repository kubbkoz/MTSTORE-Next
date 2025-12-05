import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, ArrowRight, Scale } from 'lucide-react';
import { NEW_PRODUCTS } from '../../constants';
import { Product } from '../../types';
import Button from '../ui/Button';
import QuickViewModal from '../ui/QuickViewModal';
import AddToCartButton from '../ui/AddToCartButton';

interface ProductCarouselProps {
  onNavigateToProduct?: (product: Product) => void;
  compareList?: Product[];
  onToggleCompare?: (e: React.MouseEvent, product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  onNavigateToProduct,
  compareList = [],
  onToggleCompare
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetails = (product: Product) => {
    if (onNavigateToProduct) {
      setSelectedProduct(null); // Close modal if open
      onNavigateToProduct(product);
    }
  };

  const handleProductClick = (product: Product) => {
    // If clicking on image or title, navigate directly to product detail
    if (onNavigateToProduct) {
      onNavigateToProduct(product);
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-left mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 font-tech tracking-wide">
              Novinky v <span className="text-brand">ponuke</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {NEW_PRODUCTS.map((product) => (
              <div key={product.id} className="group bg-white rounded-none border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Image Area */}
                <div className="relative h-[300px] overflow-hidden bg-gray-50 p-4 mb-4">
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
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  />

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                    <button className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand">
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
                      className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add to Cart / View Product Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <AddToCartButton 
                      product={product} 
                      fullWidth 
                      className="shadow-2xl"
                      variant={product.hasVariants ? 'compact' : 'primary'}
                      showText={true}
                      selectedSize={product.hasVariants ? undefined : 'Uni'} // For non-variant items, auto-select
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center px-4 pb-6">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider font-sans">{product.category}</p>
                  <h3 
                    className="text-2xl font-bold mb-2 group-hover:text-brand transition-colors cursor-pointer font-tech uppercase tracking-wide leading-none"
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

                  <div className="flex justify-center items-center gap-3 mt-2">
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-lg font-tech">{product.oldPrice} €</span>
                    )}
                    <span className="text-3xl font-bold text-black font-tech">{product.price} €</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal - only opens on eye icon click */}
      <QuickViewModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onViewDetails={() => selectedProduct && handleViewDetails(selectedProduct)}
      />
    </>
  );
};

export default ProductCarousel;