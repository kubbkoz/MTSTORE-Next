import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

interface CartDrawerProps {
    onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  const handleCheckout = () => {
    toggleCart(false);
    onCheckout();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[95] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-100 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-2xl font-black uppercase font-tech tracking-wide flex items-center">
              <ShoppingBag className="w-6 h-6 mr-3 text-brand" />
              Nákupný košík
            </h2>
            <button 
              onClick={() => toggleCart(false)}
              className="p-2 hover:bg-white hover:text-brand transition-colors rounded-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-wider mb-2">Váš košík je prázdny</p>
                <p className="text-sm font-sans mb-6">Objavte našu ponuku a vyberte si niečo špeciálne.</p>
                <Button variant="outline" onClick={() => toggleCart(false)}>Pokračovať v nákupe</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartId} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-50 border border-gray-100 flex-shrink-0 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm uppercase truncate pr-4 font-tech">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">
                        {item.selectedSize ? `Veľkosť: ${item.selectedSize}` : 'Univerzálna veľkosť'}
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                         <button 
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-black font-tech text-lg">{item.price * item.quantity} €</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-bold uppercase text-sm tracking-wide">Medzisúčet</span>
                <span className="text-3xl font-black font-tech">{cartTotal} €</span>
              </div>
              <Button 
                fullWidth 
                size="lg" 
                className="uppercase font-bold tracking-widest shadow-xl"
                onClick={handleCheckout}
              >
                Prejsť k pokladni <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CartDrawer;