
import React, { useState } from 'react';
import { Scale, Heart } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import HeroSlider from './components/home/HeroSlider';
import Features from './components/home/Features';
import CategoryGrid from './components/home/CategoryGrid';
import FlashSales from './components/home/FlashSales';
import FeaturedCollection from './components/home/FeaturedCollection';
import ProductCarousel from './components/home/ProductCarousel';
import RecommendedProducts from './components/home/RecommendedProducts';
import StoreLocation from './components/home/StoreLocation';
import BrandLogos from './components/home/BrandLogos';
import PromoBanner from './components/home/PromoBanner';
import BlogGrid from './components/home/BlogGrid';
import GoogleReviews from './components/home/GoogleReviews';
import Newsletter from './components/home/Newsletter';
import Footer from './components/layout/Footer';
import ProductDetail from './components/product/ProductDetail';
import CategoryPage from './components/category/CategoryPage';
import BrandsPage from './components/pages/BrandsPage';
import StorePage from './components/pages/StorePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AccountPage from './components/account/AccountPage';
import CompareModal from './components/ui/CompareModal';
import WishlistModal from './components/ui/WishlistModal';
import WatchdogModal from './components/ui/WatchdogModal';
import PriceOfferModal from './components/ui/PriceOfferModal';
import { Product } from './types';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/cart/CartDrawer';
import CartToast from './components/cart/CartToast';
import CheckoutPage from './components/cart/CheckoutPage';
import ChatBot from './components/chat/ChatBot';
import SupportPanel from './components/product/SupportPanel';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'category' | 'checkout' | 'brands' | 'store' | 'login' | 'register' | 'account'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Category View State
  const [activeCategory, setActiveCategory] = useState<{name: string, subcategory?: string | null}>({ name: '', subcategory: null });

  // Comparison State
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Watchdog & Price Offer State
  const [watchdogProduct, setWatchdogProduct] = useState<Product | null>(null);
  const [priceOfferProduct, setPriceOfferProduct] = useState<Product | null>(null);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (categoryName: string, subcategory?: string) => {
    setActiveCategory({ name: categoryName, subcategory: subcategory || null });
    setCurrentView('category');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };
  
  const navigateToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo(0,0);
  }

  const navigateToBrands = () => {
    setCurrentView('brands');
    window.scrollTo(0, 0);
  };

  const navigateToStore = () => {
    setCurrentView('store');
    window.scrollTo(0, 0);
  };

  const navigateToLogin = () => {
    setCurrentView('login');
    window.scrollTo(0, 0);
  };

  const navigateToRegister = () => {
    setCurrentView('register');
    window.scrollTo(0, 0);
  };

  const navigateToAccount = () => {
    setCurrentView('account');
    window.scrollTo(0, 0);
  };

  const toggleCompare = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) {
        alert("Môžete porovnávať maximálne 4 produkty."); 
        return prev;
      }
      setIsCompareModalOpen(true);
      return [...prev, product];
    });
  };

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      setIsWishlistModalOpen(true);
      return [...prev, product];
    });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white font-sans antialiased selection:bg-brand selection:text-white relative">
          <Navbar 
            onNavigateToProduct={navigateToProduct} 
            onNavigateToCategory={navigateToCategory} 
            onNavigateToStore={navigateToStore}
            onNavigateToLogin={navigateToLogin}
            onNavigateToAccount={navigateToAccount}
          />
          
          {/* Cart Overlays */}
          <CartDrawer onCheckout={navigateToCheckout} />
          <CartToast />
          
          {/* AI Chatbot */}
          <ChatBot onNavigateToProduct={navigateToProduct} />

          <main>
            {currentView === 'home' && (
              <>
                <HeroSlider />
                <Features />
                <CategoryGrid />
                <FlashSales onNavigateToProduct={navigateToProduct} compareList={compareList} onToggleCompare={toggleCompare} />
                <FeaturedCollection onNavigateToProduct={navigateToProduct} compareList={compareList} onToggleCompare={toggleCompare} />
                <ProductCarousel onNavigateToProduct={navigateToProduct} compareList={compareList} onToggleCompare={toggleCompare} />
                <PromoBanner />
                <RecommendedProducts onNavigateToProduct={navigateToProduct} compareList={compareList} onToggleCompare={toggleCompare} />
                <StoreLocation />
                <BlogGrid />
              </>
            )}

            {currentView === 'product' && selectedProduct && (
              <>
                <ProductDetail 
                  product={selectedProduct} 
                  onBack={navigateHome}
                  onAddToCompare={toggleCompare}
                  onAddToWishlist={toggleWishlist}
                  onOpenWatchdog={setWatchdogProduct}
                  onOpenPriceOffer={setPriceOfferProduct}
                />
                <SupportPanel />
              </>
            )}

            {currentView === 'category' && (
              <CategoryPage 
                categoryName={activeCategory.name} 
                initialSubcategory={activeCategory.subcategory}
                onNavigateToProduct={navigateToProduct}
                onBack={navigateHome}
                compareList={compareList}
                onToggleCompare={toggleCompare}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutPage onBackToShop={navigateHome} />
            )}

            {currentView === 'brands' && (
              <BrandsPage onBack={navigateHome} />
            )}

            {currentView === 'store' && (
              <StorePage onBack={navigateHome} />
            )}

            {currentView === 'login' && (
              <LoginPage 
                onRegisterClick={navigateToRegister} 
                onSuccess={navigateToAccount}
                onBack={navigateHome}
              />
            )}

            {currentView === 'register' && (
              <RegisterPage 
                onLoginClick={navigateToLogin} 
                onSuccess={navigateToAccount}
                onBack={navigateHome}
              />
            )}

            {currentView === 'account' && (
              <AccountPage onBack={navigateHome} />
            )}
          </main>

          {/* Global Floating Buttons (Only show on non-auth/admin pages) */}
          {['home', 'product', 'category', 'brands', 'store'].includes(currentView) && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-slide-up flex gap-4 pointer-events-none">
              <div className="pointer-events-auto flex gap-4">
                {compareList.length > 0 && (
                  <button 
                    onClick={() => setIsCompareModalOpen(true)}
                    className="bg-brand text-white px-6 py-4 shadow-2xl flex items-center font-bold uppercase tracking-wider hover:bg-black transition-all duration-300 border-2 border-white rounded-none hover:scale-105 group"
                  >
                    <Scale className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Porovnať ({compareList.length})
                  </button>
                )}
                {wishlist.length > 0 && (
                  <button 
                    onClick={() => setIsWishlistModalOpen(true)}
                    className="bg-black text-white px-6 py-4 shadow-2xl flex items-center font-bold uppercase tracking-wider hover:bg-brand transition-all duration-300 border-2 border-white rounded-none hover:scale-105 group"
                  >
                    <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Obľúbené ({wishlist.length})
                  </button>
                )}
              </div>
            </div>
          )}

          <CompareModal 
            isOpen={isCompareModalOpen}
            products={compareList}
            onClose={() => setIsCompareModalOpen(false)}
            onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
            onNavigateToProduct={(p) => { setIsCompareModalOpen(false); navigateToProduct(p); }}
          />

          <WishlistModal 
            isOpen={isWishlistModalOpen}
            products={wishlist}
            onClose={() => setIsWishlistModalOpen(false)}
            onRemove={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
            onNavigateToProduct={(p) => { setIsWishlistModalOpen(false); navigateToProduct(p); }}
          />

          <WatchdogModal 
            isOpen={!!watchdogProduct}
            product={watchdogProduct}
            onClose={() => setWatchdogProduct(null)}
          />

          <PriceOfferModal 
            isOpen={!!priceOfferProduct}
            product={priceOfferProduct}
            onClose={() => setPriceOfferProduct(null)}
          />

          <GoogleReviews />
          <BrandLogos onViewAll={navigateToBrands} />
          <Newsletter />
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
