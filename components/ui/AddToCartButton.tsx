import React, { useState } from 'react';
import { ShoppingCart, Check, Loader2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from './Button';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  selectedSize?: string;
  variant?: 'primary' | 'white' | 'outline' | 'compact';
  className?: string;
  fullWidth?: boolean;
  showText?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  quantity = 1, 
  selectedSize,
  variant = 'primary',
  className = '',
  fullWidth = false,
  showText = true
}) => {
  const { addToCart } = useCart();
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state !== 'idle') return;

    setState('loading');
    
    // Simulate network delay for UX
    setTimeout(() => {
      addToCart(product, quantity, selectedSize);
      setState('success');
      
      // Reset after showing success
      setTimeout(() => {
        setState('idle');
      }, 2000);
    }, 600);
  };

  // Styles based on state
  const getButtonContent = () => {
    switch (state) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {showText && <span className="ml-2">Pridávam...</span>}
          </>
        );
      case 'success':
        return (
          <>
            <Check className="w-5 h-5" />
            {showText && <span className="ml-2">Pridané</span>}
          </>
        );
      default:
        return (
          <>
            <ShoppingCart className="w-5 h-5" />
            {showText && <span className="ml-2">Do košíka</span>}
          </>
        );
    }
  };

  // If showing details instead of add (for complex products in listings)
  if (product.hasVariants && !selectedSize && variant === 'compact') {
     // This logic is usually handled by parent, but safeguard here
     return (
        <Button 
            fullWidth={fullWidth} 
            className={`shadow-xl uppercase tracking-wider text-sm font-bold ${className}`}
             // Just pass click up
             onClick={(e) => { e.stopPropagation(); }} 
        >
             <ArrowRight className="w-4 h-4 mr-2" /> Detail
        </Button>
     )
  }

  const successStyle = state === 'success' ? '!bg-green-600 !border-green-600 !text-white hover:!bg-green-700' : '';
  
  // Map internal variant to Button component variant
  const buttonVariant = variant === 'compact' ? 'primary' : variant;

  return (
    <Button
      variant={buttonVariant}
      fullWidth={fullWidth}
      className={`transition-all duration-300 gap-2 ${successStyle} ${className}`}
      onClick={handleClick}
      disabled={state !== 'idle'}
    >
      {getButtonContent()}
    </Button>
  );
};

export default AddToCartButton;