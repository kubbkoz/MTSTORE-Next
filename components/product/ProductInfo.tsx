import React, { useState } from 'react';
import { Product, Variant } from '../../types';
import { Star, Check, Truck, RefreshCw, CreditCard, Minus, Plus, AlertCircle, Clock, Scale, Eye, Zap, Heart, Ruler, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import AddToCartButton from '../ui/AddToCartButton';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  setQuantity: (q: number) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  currentVariant?: Variant;
  onAddToCompare?: (e: React.MouseEvent, product: Product) => void;
  onAddToWishlist?: (e: React.MouseEvent, product: Product) => void;
  onOpenWatchdog?: (product: Product) => void;
  onOpenPriceOffer?: (product: Product) => void;
  setIsSizeChartOpen: (isOpen: boolean) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
  currentVariant,
  onAddToCompare,
  onAddToWishlist,
  onOpenWatchdog,
  onOpenPriceOffer,
  setIsSizeChartOpen
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shipping: false,
    payment: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderStars = (rating: number = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 fill-gray-100/10'}`}
      />
    ));
  };

  const sizeLabel = (() => {
    const bikeKeywords = ['bicykle', 'e-bicykle', 'horské', 'cestné', 'gravel', 'enduro', 'zjazdové', 'e-bike', 'bicykel'];
    const isBike = bikeKeywords.some(keyword => product.category.toLowerCase().includes(keyword));
    return isBike ? 'Veľkosť rámu' : 'Rozmer';
  })();

  return (
    <div role="main">
      <div className="flex justify-between items-end mb-2">
        <span className="text-brand font-bold text-sm uppercase tracking-[0.2em] font-tech mb-1">{product.category}</span>
        {product.brand && (
           <div className="opacity-90 hover:opacity-100 transition-opacity">
             <img 
               src={`https://placehold.co/120x50/ffffff/000000?text=${encodeURIComponent(product.brand).toUpperCase()}`} 
               alt={`${product.brand} logo`}
               className="h-10 w-auto object-contain mix-blend-multiply"
             />
           </div>
        )}
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-black leading-[0.9] mb-4 font-tech uppercase italic tracking-wide">
        {product.name}
      </h1>

      <div className="flex items-center space-x-6 mb-8 border-b border-gray-100 pb-8">
        <div 
          className="flex items-center gap-1" 
          role="img" 
          aria-label={`Hodnotenie: ${product.rating || 0} z 5 hviezdičiek`}
        >
          {renderStars(product.rating)}
          <span className="text-gray-500 text-sm ml-2 font-bold underline cursor-pointer hover:text-brand font-sans">
            {product.reviewsCount || 0} hodnotení
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline space-x-4 mb-4">
            <span className="text-5xl font-black text-black font-tech">{product.price} €</span>
          {product.oldPrice && (
            <span className="text-3xl text-gray-300 line-through font-tech decoration-2">{product.oldPrice} €</span>
          )}
        </div>
        <p className="text-gray-600 text-lg leading-relaxed font-sans">
          {product.description}
        </p>
      </div>

      {/* Configurator */}
      <div className="space-y-6 mb-10">
        
          {/* Stock Status - Moved above Variants */}
          <div className="mb-4">
          {currentVariant ? (
            <>
              {currentVariant.stockStatus === 'in_stock' && (
                <div className="flex items-center text-green-600 font-bold text-sm font-sans animate-fade-in">
                  <Check className="w-5 h-5 mr-2" aria-hidden="true" /> 
                  <span className="uppercase tracking-wider">Skladom {currentVariant.stockCount ? `> ${currentVariant.stockCount} ks` : ''}</span>
                </div>
              )}
              {currentVariant.stockStatus === 'on_order' && (
                <div className="flex items-center text-orange-500 font-bold text-sm font-sans animate-fade-in">
                  <Clock className="w-5 h-5 mr-2" aria-hidden="true" /> 
                  <span className="uppercase tracking-wider">Na objednávku (do 7 dní)</span>
                </div>
              )}
              {currentVariant.stockStatus === 'unavailable' && (
                  <div className="flex items-center text-gray-500 font-bold text-sm font-sans animate-fade-in">
                  <AlertCircle className="w-5 h-5 mr-2" aria-hidden="true" /> 
                  <span className="uppercase tracking-wider">Momentálne nedostupné</span>
                </div>
              )}
            </>
          ) : (
            <div className="h-5"></div>
          )}
        </div>

        {/* Size Selector */}
        {product.variants && product.variants.length > 0 && (
          <div role="radiogroup" aria-label={sizeLabel}>
            <div className="flex justify-between items-end mb-3">
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 font-sans" id="size-label">{sizeLabel}</span>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="text-xs font-bold text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4 transition-colors flex items-center"
              >
                <Ruler className="w-3 h-3 mr-1" /> Tabuľka veľkostí
              </button>
            </div>

            <div className="flex flex-wrap gap-2 items-center mb-6">
              {product.variants.map((variant) => {
                const isDisabled = variant.stockStatus === 'unavailable';
                let hoverClass = 'hover:border-black';
                if (variant.stockStatus === 'in_stock') hoverClass = 'hover:border-green-500 hover:text-green-600';
                if (variant.stockStatus === 'on_order') hoverClass = 'hover:border-orange-500 hover:text-orange-600';

                return (
                  <button
                    key={variant.size}
                    role="radio"
                    aria-checked={selectedSize === variant.size}
                    disabled={isDisabled}
                    onClick={() => setSelectedSize(variant.size)}
                    className={`min-w-[3.5rem] w-auto px-3 h-14 flex items-center justify-center font-bold text-sm transition-all border-2 font-sans focus:outline-none focus:ring-2 focus:ring-brand rounded-none ${
                      isDisabled 
                        ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed' 
                        : selectedSize === variant.size
                          ? 'bg-black text-white border-black'
                          : `bg-white text-gray-700 border-gray-200 ${hoverClass}`
                    }`}
                    title={isDisabled ? "Nedostupné" : variant.stockStatus === 'in_stock' ? "Skladom" : "Na objednávku"}
                  >
                    {variant.size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & Actions */}
        <div className="flex flex-col pt-2">
          {/* Row 1: Quantity + Add to Cart + Wishlist */}
          <div className="flex gap-3 h-14 w-full mb-3">
            {/* Quantity */}
            <div className="flex items-center border-2 border-gray-200 w-24 h-full bg-white flex-shrink-0" role="group" aria-label="Nastavenie množstva">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Znížiť množstvo"
                className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-sans focus:outline-none focus:bg-gray-100 rounded-none text-gray-600"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="flex-1 text-center font-bold text-lg font-sans text-black" role="status" aria-live="polite">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Zvýšiť množstvo"
                className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-sans focus:outline-none focus:bg-gray-100 rounded-none text-gray-600"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            {/* Add to Cart Button (Animated) */}
            <div className="flex-1">
              <AddToCartButton 
                product={product} 
                quantity={quantity} 
                selectedSize={selectedSize}
                className="h-full w-full"
                showText={true}
              />
            </div>

            {/* Wishlist Icon */}
            <button 
              onClick={(e) => onAddToWishlist && onAddToWishlist(e, product)}
              className="h-full w-14 border-2 border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand transition-colors focus:outline-none focus:border-brand rounded-none flex-shrink-0 bg-white"
                title="Pridať do obľúbených"
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Row 2: Buy Now Button */}
          <button className="w-full h-12 border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-sm font-bold uppercase tracking-wider transition-all focus:outline-none rounded-none">
            Kúpiť ihneď
          </button>

          {/* Row 3: Utility Links (Centered) */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 w-full text-center">
              <button 
                onClick={(e) => onAddToCompare && onAddToCompare(e, product)}
                className="flex items-center text-xs font-bold uppercase text-gray-500 hover:text-black transition-colors"
              >
                <Scale className="w-4 h-4 mr-1.5" /> Porovnať
              </button>
              <button 
                onClick={() => onOpenWatchdog && onOpenWatchdog(product)}
                className="flex items-center text-xs font-bold uppercase text-gray-500 hover:text-black transition-colors"
              >
                <Eye className="w-4 h-4 mr-1.5" /> Strážiť dostupnosť
              </button>
              <button 
                onClick={() => onOpenPriceOffer && onOpenPriceOffer(product)}
                className="flex items-center text-xs font-bold uppercase text-gray-500 hover:text-black transition-colors"
              >
                <Zap className="w-4 h-4 mr-1.5" /> Cenová ponuka
              </button>
          </div>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="mb-8 p-6 bg-gray-50 border border-gray-100">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 font-tech">Bezpečná platba a garancia</h4>
          <div className="flex gap-3 mb-6">
            <div className="h-8 bg-white border border-gray-200 px-2 rounded-sm flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" /></div>
            <div className="h-8 bg-white border border-gray-200 px-2 rounded-sm flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" /></div>
            <div className="h-8 bg-white border border-gray-200 px-2 rounded-sm flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" /></div>
          </div>
          
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <span className="block text-sm font-bold text-gray-900">Vrátenie tovaru</span>
              <p className="text-xs text-gray-500 mt-1">
                Máte 60 dní na vrátenie tovaru akýmkoľvek spôsobom:<br/>
                • Bezplatné vrátenie na predajni<br/>
                • Bezplatné vrátenie cez Packetu
              </p>
            </div>
          </div>
      </div>

      {/* Shipping & Payment Accordions */}
      <div className="mt-8 space-y-3">
        {/* Shipping */}
        <div className="border border-gray-200 rounded-none overflow-hidden">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-3 text-gray-500" aria-hidden="true" />
              <span className="font-bold text-xs uppercase tracking-wider font-sans">Doprava a doručenie</span>
            </div>
            {openSections['shipping'] ? <Minus className="w-3 h-3 text-gray-400" /> : <Plus className="w-3 h-3 text-gray-400" />}
          </button>
          {openSections['shipping'] && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-sm text-gray-600 space-y-2 font-sans">
                <div className="flex justify-between"><span>Kuriér (DPD/GLS)</span><span className="font-bold">3.90 €</span></div>
                <div className="flex justify-between"><span>Packeta</span><span className="font-bold">2.50 €</span></div>
                <div className="flex justify-between"><span>Osobný odber</span><span className="font-bold text-green-600 uppercase text-xs">ZDARMA</span></div>
                <div className="mt-3 text-xs text-green-800 bg-green-50 p-2 border border-green-200 flex items-start rounded-sm">
                  <Check className="w-3 h-3 mr-2 mt-0.5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  Objednávky objednané do 14:00 odosielame v ten istý deň.
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Share (Moved below Shipping) */}
      <div className="mt-4 flex items-center justify-between p-4 bg-black rounded-sm text-white">
        <span className="font-bold text-sm uppercase tracking-wider">Zdieľať produkt:</span>
        <div className="flex gap-4">
            <button className="hover:text-white/80 transition-colors"><Facebook className="w-4 h-4" /></button>
            <button className="hover:text-white/80 transition-colors"><Twitter className="w-4 h-4" /></button>
            <button className="hover:text-white/80 transition-colors"><Linkedin className="w-4 h-4" /></button>
            <button className="hover:text-white/80 transition-colors"><Copy className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;