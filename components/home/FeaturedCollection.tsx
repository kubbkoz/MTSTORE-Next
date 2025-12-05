
import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Heart, Scale, Eye } from 'lucide-react';
import { ALL_PRODUCTS } from '../../constants';
import { Product } from '../../types';
import Button from '../ui/Button';
import QuickViewModal from '../ui/QuickViewModal';
import AddToCartButton from '../ui/AddToCartButton';

interface FeaturedCollectionProps {
  onNavigateToProduct?: (product: Product) => void;
  onToggleCompare?: (e: React.MouseEvent, product: Product) => void;
  compareList?: Product[];
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ 
  onNavigateToProduct,
  onToggleCompare,
  compareList = []
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Select specific products for the display
  // Left Hero Product (simulated by a collection/lifestyle shot)
  const heroImage = "https://images.unsplash.com/photo-1623053398290-34a974b26090?q=80&w=1200&auto=format&fit=crop";
  
  // Right Column Products (Pick 2 distinct high-quality items)
  const rightProducts = [ALL_PRODUCTS[2], ALL_PRODUCTS[5]]; 

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  const handleProductClick = (product: Product) => {
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

  return (
    <>
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-left mb-12">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 font-tech tracking-wide">
              Vybrané <span className="text-brand">produkty</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg]"></div>
          </div>

          {/* Grid Layout 50/50 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[600px]">
            
            {/* Left Column - Hero Image */}
            <div className="relative group overflow-hidden h-[400px] lg:h-full w-full">
              <img 
                src={heroImage} 
                alt="Featured Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="inline-block bg-brand px-4 py-1 mb-4 transform -skew-x-12">
                   <span className="block transform skew-x-12 text-white text-xs font-bold uppercase tracking-widest font-tech">
                      Editor's Choice
                   </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic font-tech leading-none mb-4">
                  Premium E-Bike <br/> Collection 2026
                </h3>
                <p className="text-gray-300 font-sans mb-8 max-w-md line-clamp-3">
                  Objavte vrchol inžinierstva a dizajnu. Najnovšie modely elektrobicyklov, 
                  ktoré posúvajú hranice dojazdu a výkonu v náročnom teréne.
                </p>
                <Button 
                  variant="white" 
                  size="lg" 
                  className="uppercase tracking-wider font-bold"
                >
                  Objaviť kolekciu <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right Column - 2 Rows */}
            <div className="flex flex-col gap-8 h-full">
              {rightProducts.map((product) => (
                <div 
                  key={product?.id || Math.random()} 
                  className="group relative flex-1 bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-1/2 relative bg-white flex items-center justify-center p-6 overflow-hidden">
                    {product?.oldPrice && (
                       <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-lg font-black text-white uppercase tracking-wider font-tech bg-brand shadow-lg transform -rotate-2">
                        -{calculateDiscount(product)}%
                      </span>
                    )}
                    <img 
                      src={product?.image} 
                      alt={product?.name} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                      onClick={() => product && handleProductClick(product)}
                    />
                    
                    {/* Quick Actions - Standardized Style */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                      <button className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand">
                        <Heart className="w-5 h-5" />
                      </button>
                      {onToggleCompare && product && (
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
                          if (product) setSelectedProduct(product);
                        }}
                        className="w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg hover:bg-brand hover:text-white transition-colors border border-transparent hover:border-brand"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="w-full sm:w-1/2 p-6 flex flex-col justify-center">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 font-sans">
                      {product?.brand}
                    </span>
                    <h4 
                      className="text-2xl font-black uppercase italic font-tech leading-none mb-3 cursor-pointer hover:text-brand transition-colors"
                      onClick={() => product && handleProductClick(product)}
                    >
                      {product?.name}
                    </h4>
                    <div className="flex items-center gap-3 mb-6">
                      {product?.oldPrice && (
                        <span className="text-gray-400 line-through text-lg font-tech">{product.oldPrice} €</span>
                      )}
                      <span className="text-3xl font-black text-black font-tech">{product?.price} €</span>
                    </div>
                    
                    {product && (
                        <AddToCartButton 
                            product={product} 
                            variant={product.hasVariants ? 'compact' : 'primary'}
                            className="w-fit shadow-lg"
                        />
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Quick View Modal Integration */}
      <QuickViewModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onViewDetails={() => selectedProduct && onNavigateToProduct && onNavigateToProduct(selectedProduct)}
      />
    </>
  );
};

export default FeaturedCollection;
