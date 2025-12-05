import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, User, Menu, X, ChevronDown, ArrowRight, Loader2, Phone, MapPin, Clock, Info, ArrowLeft, LogOut } from 'lucide-react';
import { NAV_LINKS, NEW_PRODUCTS, CATEGORIES } from '../../constants';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onNavigateToProduct?: (product: Product) => void;
  onNavigateToCategory?: (categoryName: string, subcategory?: string) => void;
  onNavigateToStore?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToAccount?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigateToProduct, 
  onNavigateToCategory, 
  onNavigateToStore,
  onNavigateToLogin,
  onNavigateToAccount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Cart Context
  const { toggleCart, cartCount } = useCart();
  
  // Auth Context
  const { user, isAuthenticated } = useAuth();
  
  // Mega Menu State
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search State
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close search (Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile search or menu is open
  useEffect(() => {
    if (isMobileSearchOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isMobileSearchOpen, mobileMenuOpen]);

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase();
      const results = NEW_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.category.toLowerCase().includes(lowerQuery)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Mega Menu Handlers
  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  };

  const handleCategoryClick = (categoryName: string, subcategory?: string) => {
    if (onNavigateToCategory) {
      onNavigateToCategory(categoryName, subcategory);
      setActiveSubmenu(null);
      setMobileMenuOpen(false);
    }
  };

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (onNavigateToProduct) {
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
      setSearchQuery('');
      onNavigateToProduct(product);
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      onNavigateToAccount?.();
    } else {
      onNavigateToLogin?.();
    }
  };

  // Category specific images
  const categoryImages: Record<string, string> = {
    'Bicykle': 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=600&auto=format&fit=contain',
    'E-Bicykle': 'https://www.mt-sport.sk/wp-content/uploads/2025/07/erival-5-5-royal-purple-2-1024x590.jpg',
    'Oblečenie': 'https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=600&auto=format&fit=contain',
    'Komponenty': 'https://images.unsplash.com/photo-1562615193-cbeef074a501?q=80&w=600&auto=format&fit=contain&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Doplnky': 'https://images.unsplash.com/photo-1551817958-c963c403c53e?q=80&w=600&auto=format&fit=contain',
    'Výpredaj': 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=600&auto=format&fit=contain',
  };

  const activeCategory = NAV_LINKS.find(c => c.name === activeSubmenu);

  return (
    <nav className="fixed w-full z-50 flex flex-col">
      
      {/* 1. TOP BAR */}
      <div 
        className={`bg-zinc-950 text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 py-0' : 'max-h-12 py-2'}`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3 h-3 mr-2 text-brand" /> +421 948 993 236
            </span>
            <span className="flex items-center hover:text-white transition-colors cursor-pointer" onClick={onNavigateToStore}>
              <Clock className="w-3 h-3 mr-2 text-brand" /> Po-So: 8:00 - 16:00
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Kontakty</a>
            <a href="#" className="hover:text-white transition-colors">Všetko o nákupe</a>
            <a href="#" className="hover:text-white transition-colors">O nás</a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search, Icons) */}
      <div className={`bg-black py-4 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <a href="#" onClick={() => window.location.reload()} className="block">
                <img 
                  src="https://www.mt-sport.sk/wp-content/uploads/2025/12/Group-2.png" 
                  alt="MT-SPORT" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
            </div>

            {/* Central Search Input (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-2xl relative" ref={searchWrapperRef}>
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Hľadať produkt, kategóriu..." 
                  className="w-full bg-white text-black pl-4 pr-12 py-3 focus:outline-none rounded-none font-bold text-sm tracking-wide shadow-inner focus:shadow-[0_0_0_2px_rgba(182,0,5,1)] transition-shadow placeholder-gray-400 font-sans"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                <button className="absolute right-0 top-0 h-full w-12 bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-colors">
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
              </div>

              {/* Smart Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl z-[60] border-t-4 border-brand animate-fade-in mt-1">
                  {searchQuery ? (
                    // Search Results
                    <div className="p-4">
                      {searchResults.length > 0 ? (
                        <>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Produkty</h4>
                          <div className="space-y-2">
                            {searchResults.slice(0, 5).map(product => (
                              <div 
                                key={product.id} 
                                className="flex items-center gap-4 p-2 hover:bg-gray-50 cursor-pointer group"
                                onClick={(e) => handleProductClick(e, product)}
                              >
                                <div className="w-12 h-12 bg-gray-50 flex-shrink-0 p-1 border border-gray-100">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-sm text-black group-hover:text-brand transition-colors font-tech uppercase">{product.name}</h5>
                                  <p className="text-xs text-gray-500 font-bold">{product.price} €</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand" />
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                            <button className="text-xs font-bold text-brand uppercase tracking-widest hover:underline">
                              Zobraziť všetkých {searchResults.length} výsledkov
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm italic">
                          Nenašli sa žiadne produkty.
                        </div>
                      )}
                    </div>
                  ) : (
                    // Default / Recommendations
                    <div className="p-6 grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Populárne kategórie</h4>
                        <div className="space-y-2">
                          {['Elektrobicykle', 'Horské bicykle', 'Prilby', 'Tretry'].map(cat => (
                            <button key={cat} className="block text-sm font-bold text-black hover:text-brand hover:translate-x-1 transition-all w-full text-left">
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Odporúčame</h4>
                        {NEW_PRODUCTS.slice(0, 2).map(product => (
                           <div 
                              key={product.id} 
                              className="flex items-center gap-3 mb-3 cursor-pointer group"
                              onClick={(e) => handleProductClick(e, product)}
                           >
                              <div className="w-10 h-10 bg-gray-50 p-1">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                              </div>
                              <span className="text-xs font-bold uppercase truncate group-hover:text-brand transition-colors">{product.name}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6 text-white z-50">
              <button 
                className="lg:hidden hover:text-brand transition-colors focus:outline-none rounded-none"
                onClick={() => {
                  setIsMobileSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="w-6 h-6" />
              </button>
              
              <button 
                className="hidden md:flex hover:text-brand transition-colors rounded-none items-center"
                onClick={handleUserClick}
              >
                <User className="w-6 h-6" />
                {isAuthenticated && <span className="ml-2 text-xs font-bold uppercase hidden xl:block">{user?.name.split(' ')[0]}</span>}
              </button>
              
              {/* Cart Button */}
              <button 
                className="relative hover:text-brand transition-colors group rounded-none"
                onClick={() => toggleCart(true)}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform animate-fade-in">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                className="lg:hidden hover:text-brand transition-colors rounded-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN MOBILE SEARCH OVERLAY */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white animate-fade-in flex flex-col font-sans">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white shadow-sm">
             <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 -ml-2">
               <ArrowLeft className="w-6 h-6 text-black" />
             </button>
             <div className="flex-1 relative">
               <input 
                  autoFocus
                  type="text" 
                  placeholder="Hľadať..." 
                  className="w-full text-lg font-bold placeholder-gray-400 focus:outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               {isSearching && <Loader2 className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-brand" />}
             </div>
             {searchQuery && (
               <button onClick={() => setSearchQuery('')}>
                 <X className="w-6 h-6 text-gray-400" />
               </button>
             )}
          </div>
          
          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
             {searchQuery ? (
                <div className="space-y-3">
                   {searchResults.length > 0 ? (
                     searchResults.map(product => (
                       <div 
                          key={product.id} 
                          className="flex items-center gap-4 p-3 bg-white border border-gray-100 shadow-sm active:scale-95 transition-transform"
                          onClick={(e) => handleProductClick(e, product)}
                       >
                          <div className="w-16 h-16 bg-gray-50 flex-shrink-0 p-1 border border-gray-100">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-black font-tech uppercase leading-tight mb-1">{product.name}</h5>
                            <p className="text-sm text-brand font-black font-tech">{product.price} €</p>
                          </div>
                       </div>
                     ))
                   ) : (
                      <div className="text-center py-12 text-gray-400 font-medium">Nenašli sa žiadne produkty.</div>
                   )}
                </div>
             ) : (
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Populárne kategórie</h4>
                   <div className="flex flex-wrap gap-2">
                      {['Elektrobicykle', 'Horské bicykle', 'Prilby', 'Tretry', 'Dresy', 'Komponenty'].map(cat => (
                        <button 
                          key={cat} 
                          className="px-4 py-3 bg-white border border-gray-200 text-sm font-bold text-black rounded-none shadow-sm active:bg-gray-100"
                          onClick={() => setSearchQuery(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>
             )}
          </div>
        </div>
      )}

      {/* 3. NAVIGATION BAR (Categories) */}
      <div 
        className="bg-black border-t border-zinc-800 hidden lg:block relative"
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Categories */}
            <div className="flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <div 
                  key={link.name} 
                  className="group relative py-4"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                >
                  <button 
                    onClick={() => handleCategoryClick(link.name)}
                    className={`flex items-center text-base font-bold uppercase tracking-widest transition-all duration-300 font-tech ${
                      activeSubmenu === link.name ? 'text-brand' : 'text-white hover:text-brand'
                    }`}
                  >
                    {link.name}
                    {link.subcategories.length > 0 && (
                      <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${
                        activeSubmenu === link.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Store Link */}
            <div>
              <button 
                onClick={onNavigateToStore}
                className="flex items-center text-base font-bold uppercase tracking-widest text-white hover:text-brand transition-colors font-tech py-4 border-b-2 border-transparent hover:border-brand"
              >
                <MapPin className="w-4 h-4 mr-2 text-brand" />
                Kamenná predajňa
              </button>
            </div>

          </div>
        </div>

        {/* MEGA MENU OVERLAY - Positioned relative to this nav bar */}
        <div 
          className={`absolute top-full left-0 w-full bg-white text-black shadow-2xl transition-all duration-300 transform origin-top border-t-4 border-brand z-40 ${
            activeSubmenu && activeCategory?.subcategories.length ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
          onMouseEnter={() => { if(timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
        >
          {activeCategory && (
            <div className="container mx-auto px-4 lg:px-8 py-8 h-[550px]">
              <div className="grid grid-cols-12 gap-12 h-full">
                
                {/* Column 1: Categories List */}
                <div className="col-span-3 border-r border-gray-100 pr-8 flex flex-col justify-between">
                  <div>
                    <h4 
                      className="font-tech text-4xl font-black uppercase text-black mb-8 tracking-wide italic cursor-pointer hover:text-brand transition-colors"
                      onClick={() => handleCategoryClick(activeCategory.name)}
                    >
                      <span className="text-brand mr-2">#</span>
                      {activeCategory.name}
                    </h4>
                    <ul className="space-y-3">
                      {activeCategory.subcategories.map((sub, idx) => (
                        <li key={idx} className="group/item">
                          <button 
                            onClick={() => handleCategoryClick(activeCategory.name, sub)}
                            className="flex items-center text-gray-500 hover:text-black hover:translate-x-2 transition-all duration-300 font-bold uppercase tracking-wider text-sm w-full text-left"
                          >
                            <span className="w-1.5 h-1.5 bg-brand rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity"></span>
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => handleCategoryClick(activeCategory.name)}
                      className="inline-flex items-center text-brand font-bold uppercase tracking-widest text-xs border-b-2 border-brand pb-1 hover:text-black hover:border-black transition-colors"
                    >
                      Zobraziť všetko <ArrowRight className="ml-2 w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Column 2: Promo Visuals */}
                <div className="col-span-9 grid grid-cols-3 gap-6 h-full">
                  {/* Card 1 */}
                  <div className="col-span-1 group/card cursor-pointer relative h-full overflow-hidden rounded-sm bg-gray-100" onClick={() => handleCategoryClick(activeCategory.name)}>
                    <img 
                      src={categoryImages[activeCategory.name]}
                      alt="New Collection" 
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                      <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                        <span className="text-brand text-xs font-bold uppercase tracking-widest mb-2 block">Novinka 2026</span>
                        <h5 className="font-tech text-3xl font-black text-white uppercase leading-none mb-2">Premium Series</h5>
                        <div className="h-0.5 w-12 bg-white group-hover/card:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="col-span-1 group/card cursor-pointer relative h-full overflow-hidden rounded-sm bg-gray-100" onClick={() => handleCategoryClick(activeCategory.name)}>
                    <img 
                      src={`https://images.unsplash.com/photo-1576435728678-38d01d52e38b?q=80&w=600&auto=format&fit=crop`}
                      alt="Best Sellers" 
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                       <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                        <span className="text-white text-xs font-bold uppercase tracking-widest mb-2 block">Najpredávanejšie</span>
                        <h5 className="font-tech text-3xl font-black text-white uppercase leading-none mb-2">Best Sellers</h5>
                        <div className="h-0.5 w-12 bg-brand group-hover/card:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Big Promo Text/Banner */}
                  <div className="col-span-1 bg-black text-white p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group/banner rounded-sm h-full">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute inset-0 bg-brand/10 transform scale-0 rounded-full group-hover/banner:scale-150 transition-transform duration-700 ease-out"></div>
                    
                    <div className="relative z-10">
                      <span className="text-brand font-tech text-xl uppercase tracking-widest mb-2 block">MT-Sport Club</span>
                      <h4 className="font-tech text-5xl font-black uppercase italic leading-[0.9] mb-6">
                        Získaj <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-500">10% Zľavu</span>
                      </h4>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Staň sa členom nášho klubu a nakupuj výhodnejšie ešte dnes.
                      </p>
                      <button className="px-6 py-3 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all rounded-none">
                        Registrovať sa
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-24 px-6 overflow-y-auto`}>
        <div className="flex flex-col space-y-6 pb-12">
          
          {isAuthenticated ? (
             <button onClick={() => {onNavigateToAccount?.(); setMobileMenuOpen(false);}} className="text-xl font-bold text-white w-full text-left flex items-center font-tech uppercase tracking-wide border-b border-gray-800 pb-4">
                <User className="w-5 h-5 mr-3 text-brand" /> {user?.name}
             </button>
          ) : (
             <button onClick={() => {onNavigateToLogin?.(); setMobileMenuOpen(false);}} className="text-xl font-bold text-white w-full text-left flex items-center font-tech uppercase tracking-wide border-b border-gray-800 pb-4">
                <User className="w-5 h-5 mr-3" /> Prihlásiť sa
             </button>
          )}

          <button onClick={() => {onNavigateToStore && onNavigateToStore(); setMobileMenuOpen(false);}} className="text-xl font-bold text-brand w-full text-left flex items-center font-tech uppercase tracking-wide border-b border-gray-800 pb-4">
             <MapPin className="w-5 h-5 mr-3" /> Kamenná predajňa
          </button>

          {NAV_LINKS.map((link) => (
            <div key={link.name} className="border-b border-gray-800 pb-4">
              <button 
                onClick={() => handleCategoryClick(link.name)}
                className="text-xl font-bold text-white w-full text-left flex justify-between items-center font-tech uppercase tracking-wide"
              >
                {link.name}
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              {link.subcategories.length > 0 && (
                <div className="mt-4 pl-4 space-y-3 border-l border-gray-800 ml-1">
                  {link.subcategories.map(sub => (
                    <button 
                      key={sub} 
                      onClick={() => handleCategoryClick(link.name, sub)}
                      className="block text-gray-400 text-sm hover:text-white uppercase font-bold tracking-wider w-full text-left"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="space-y-4 text-gray-500 text-sm font-bold uppercase tracking-wider pt-4">
             <a href="#" className="block hover:text-white">Kontakty</a>
             <a href="#" className="block hover:text-white">Všetko o nákupe</a>
             <a href="#" className="block hover:text-white">O nás</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;