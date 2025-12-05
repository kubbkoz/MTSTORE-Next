import React, { useEffect } from 'react';
import { X, ShoppingCart, Check, Star, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import Button from './Button';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onViewDetails }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const renderStars = (rating: number = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 fill-gray-100/10'}`}
      />
    ));
  };

  const calculateDiscount = () => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-none shadow-2xl overflow-hidden animate-slide-up flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-none transition-colors text-black hover:text-brand"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative">
          {product.oldPrice && (
             <span className="absolute top-6 left-6 z-10 px-3 py-1.5 text-lg font-black text-white uppercase tracking-wider font-tech bg-brand shadow-lg transform -rotate-2">
                -{calculateDiscount()}%
            </span>
          )}
          {!product.oldPrice && product.badge && (
            <span className={`absolute top-6 left-6 z-10 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider
              ${product.badge === 'Novinka' ? 'bg-blue-600' : 'bg-black'}
            `}>
              {product.badge}
            </span>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain max-h-[400px] mix-blend-multiply" 
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-6">
            <span className="text-brand font-bold text-sm uppercase tracking-widest mb-2 block font-tech">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight mb-4 font-tech">
              {product.name}
            </h2>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-gray-400 text-xs ml-2 font-medium font-sans">({product.reviewsCount || 0} recenzií)</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-green-600 text-sm font-bold flex items-center font-sans">
                <Check className="w-4 h-4 mr-1" /> Skladom
              </span>
            </div>

            <div className="flex items-baseline space-x-4 mb-8">
              <span className="text-4xl font-black text-black font-tech">{product.price} €</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through font-tech">{product.oldPrice} €</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium font-sans">
              {product.description || 'Popis produktu nie je k dispozícii.'}
            </p>

            {product.features && (
              <div className="mb-8">
                <h4 className="font-bold text-black mb-3 text-sm uppercase font-tech tracking-wide">Kľúčové vlastnosti:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button fullWidth size="lg" className="uppercase tracking-wider font-bold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Pridať do košíka
              </Button>
              <Button 
                fullWidth 
                size="lg" 
                variant="outline" 
                className="uppercase tracking-wide font-bold"
                onClick={onViewDetails}
              >
                Zobraziť detaily produktu
              </Button>
            </div>
            <p className="text-xs text-center text-gray-400 font-sans">
              Doprava zadarmo nad 100 € • 30 dní na vrátenie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;