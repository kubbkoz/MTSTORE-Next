import React, { useEffect } from 'react';
import { X, Check, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import Button from './Button';

interface CompareModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onNavigateToProduct: (product: Product) => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ isOpen, products, onClose, onRemove, onNavigateToProduct }) => {
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
      <div className="relative w-full max-w-7xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up rounded-none">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-3xl font-black uppercase font-tech tracking-wide mb-1">Porovnanie produktov</h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              {products.length} {products.length === 1 ? 'produkt' : (products.length >= 2 && products.length <= 4) ? 'produkty' : 'produktov'} v porovnaní
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 transition-colors rounded-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto flex-1 p-0 md:p-6 bg-white">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-xl font-bold uppercase font-tech mb-4">Žiadne produkty na porovnanie</p>
              <Button onClick={onClose} variant="outline">Zatvoriť</Button>
            </div>
          ) : (
            <div className="min-w-[800px] overflow-x-auto">
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${Math.max(products.length, 3)}, 1fr)` }}>
                
                {/* 1. Product Summary Row */}
                <div className="p-4 bg-gray-50 font-bold border-b border-r border-gray-100 flex items-center text-xs uppercase tracking-wider text-gray-500">Produkt</div>
                {products.map(product => (
                  <div key={product.id} className="p-6 border-b border-r border-gray-100 relative group min-w-[250px]">
                    <button 
                      onClick={() => onRemove(product.id)}
                      className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Odstrániť z porovnania"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center text-center h-full justify-between">
                      <div className="w-full flex flex-col items-center cursor-pointer" onClick={() => onNavigateToProduct(product)}>
                        <img src={product.image} alt={product.name} className="h-40 object-contain mb-4 mix-blend-multiply hover:scale-105 transition-transform duration-500" />
                        <span className="text-xs text-brand font-bold uppercase tracking-wider mb-1">{product.brand}</span>
                        <h3 className="font-bold font-tech uppercase text-xl leading-tight mb-2 hover:text-brand transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className="w-full mt-4">
                        <div className="flex flex-col items-center gap-1 mb-4">
                          {product.oldPrice && <span className="text-gray-400 line-through text-base font-tech">{product.oldPrice} €</span>}
                          <span className="text-3xl font-black font-tech text-black">{product.price} €</span>
                        </div>
                        <Button size="sm" fullWidth onClick={() => onNavigateToProduct(product)} className="uppercase font-bold tracking-wider">
                          Detail <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Empty slots filler */}
                {[...Array(Math.max(0, 3 - products.length))].map((_, i) => (
                   <div key={`empty-${i}`} className="p-6 border-b border-r border-gray-100 bg-gray-50/30 flex items-center justify-center text-gray-300 italic min-w-[250px]">
                     <span className="text-sm font-bold uppercase tracking-widest opacity-30">Prázdny slot</span>
                   </div>
                ))}

                {/* 2. Specs Rows */}
                {['Kategória', 'Hodnotenie', 'Dostupnosť'].map(label => (
                   <React.Fragment key={label}>
                     <div className="p-4 bg-gray-50 font-bold border-b border-r border-gray-100 flex items-center text-xs uppercase tracking-wider text-gray-500">{label}</div>
                     {products.map(product => (
                       <div key={`${product.id}-${label}`} className="p-4 border-b border-r border-gray-100 text-sm text-center flex items-center justify-center">
                         {label === 'Kategória' && <span className="font-bold text-gray-700">{product.category}</span>}
                         {label === 'Hodnotenie' && (
                           <div className="flex items-center text-black font-bold font-tech text-lg">
                             <span className="text-yellow-400 mr-2">★</span> {product.rating} <span className="text-gray-300 ml-1 text-sm font-sans">/ 5</span>
                           </div>
                         )}
                         {label === 'Dostupnosť' && (
                           product.variants?.some(v => v.stockStatus === 'in_stock') 
                             ? <span className="text-green-600 font-bold flex items-center uppercase text-xs tracking-wider"><Check className="w-4 h-4 mr-1"/> Skladom</span>
                             : <span className="text-orange-500 font-bold flex items-center uppercase text-xs tracking-wider">Na objednávku</span>
                         )}
                       </div>
                     ))}
                     {[...Array(Math.max(0, 3 - products.length))].map((_, i) => <div key={`empty-cell-${i}`} className="border-b border-r border-gray-100 bg-gray-50/30"></div>)}
                   </React.Fragment>
                ))}
                
                {/* 3. Features Row */}
                <div className="p-4 bg-gray-50 font-bold border-b border-r border-gray-100 flex items-center text-xs uppercase tracking-wider text-gray-500">Kľúčové vlastnosti</div>
                {products.map(product => (
                  <div key={`${product.id}-features`} className="p-4 border-b border-r border-gray-100 text-xs text-center align-top">
                    <ul className="space-y-2 text-left inline-block">
                      {product.features?.slice(0, 5).map((f, i) => (
                        <li key={i} className="text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {[...Array(Math.max(0, 3 - products.length))].map((_, i) => <div key={`empty-f-${i}`} className="border-b border-r border-gray-100 bg-gray-50/30"></div>)}

              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {products.length > 0 && (
           <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <Button variant="ghost" onClick={onClose} className="uppercase text-xs font-bold tracking-widest">Zatvoriť porovnanie</Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;