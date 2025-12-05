import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Variant } from '../types';

export interface CartItem extends Product {
  cartId: string; // Unique ID (product.id + size)
  selectedSize?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  notification: CartItem | null;
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  toggleCart: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  discountCode: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<CartItem | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('mt_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, size?: string) => {
    const selectedSize = size || (product.variants && product.variants.length > 0 ? product.variants[0].size : undefined);
    const cartId = `${product.id}-${selectedSize || 'uni'}`;

    setItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, cartId, selectedSize, quantity }];
    });

    // Trigger Notification
    const newItem = { ...product, cartId, selectedSize, quantity };
    setNotification(newItem);
    setTimeout(() => setNotification(null), 4000);
  };

  const removeFromCart = (cartId: string) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleCart = (open: boolean) => setIsOpen(open);

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    if (code.toUpperCase() === 'MT2026') {
      setDiscountCode('MT2026');
      return true;
    }
    return false;
  };

  const discountAmount = discountCode === 'MT2026' ? Math.round(cartTotal * 0.1) : 0;

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      notification,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      cartTotal,
      cartCount,
      discountCode,
      discountAmount,
      applyCoupon,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};