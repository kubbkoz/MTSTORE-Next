import React, { useEffect } from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import Button from './Button';

interface WishlistModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onNavigateToProduct: (product: Product) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, products, onClose, onRemove, onNavigateToProduct }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up rounded-none">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-3xl font-black uppercase font-tech tracking-wide mb-1">Obľúbené produkty</h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              {products.length} {products.length === 1 ? 'produkt' : (products.length >= 2 && products.length <= 4) ? 'produkty' : 'produktov'} v zozname
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 transition-colors rounded-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-0 bg-white">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-xl font-bold uppercase font-tech mb-4">Váš zoznam prianí je prázdny</p>
              <Button onClick={onClose} variant="outline">Pokračovať v nákupe</Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {products.map(product => (
                <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center group hover:bg-gray-50 transition-colors">
                  
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white border border-gray-100 p-2 cursor-pointer" onClick={() => onNavigateToProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs text-brand font-bold uppercase tracking-wider mb-1 block">{product.brand}</span>
                    <h3 
                      className="font-bold font-tech uppercase text-xl md:text-2xl leading-tight mb-2 hover:text-brand transition-colors cursor-pointer"
                      onClick={() => onNavigateToProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      {product.oldPrice && <span className="text-gray-400 line-through text-sm font-tech">{product.oldPrice} €</span>}
                      <span className="text-2xl font-black font-tech text-black">{product.price} €</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 min-w-[160px]">
                    <Button 
                      size="sm" 
                      onClick={() => onNavigateToProduct(product)} 
                      className="uppercase font-bold tracking-wider w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Detail
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onRemove(product.id)} 
                      className="uppercase font-bold tracking-wider text-xs text-gray-400 hover:text-red-500 w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Odstrániť
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;