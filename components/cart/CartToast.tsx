import React from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartToast: React.FC = () => {
  const { notification, toggleCart } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-8 right-4 md:right-8 z-[100] animate-slide-up">
      <div className="bg-white border-l-4 border-brand shadow-2xl p-4 md:p-5 w-80 md:w-96 rounded-none flex flex-col gap-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center text-green-600 font-bold font-tech uppercase tracking-wide">
            <CheckCircle className="w-5 h-5 mr-2" />
            Pridané do košíka
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-50 flex-shrink-0 border border-gray-100">
            <img 
              src={notification.image} 
              alt={notification.name} 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm uppercase truncate font-tech">{notification.name}</h4>
            <div className="text-xs text-gray-500 mt-1 font-sans">
              {notification.selectedSize && <span className="mr-2">Veľkosť: {notification.selectedSize}</span>}
              <span>{notification.quantity} ks</span>
            </div>
            <div className="font-black text-brand mt-1 font-tech">{notification.price} €</div>
          </div>
        </div>

        <button 
          onClick={() => toggleCart(true)}
          className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand transition-colors flex items-center justify-center rounded-none"
        >
          Skontrolovať košík <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CartToast;