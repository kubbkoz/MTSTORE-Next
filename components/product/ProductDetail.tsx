
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../../types';
import { ArrowLeft } from 'lucide-react';
import SizeChartModal from '../ui/SizeChartModal';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCompare?: (e: React.MouseEvent, product: Product) => void;
  onAddToWishlist?: (e: React.MouseEvent, product: Product) => void;
  onOpenWatchdog?: (product: Product) => void;
  onOpenPriceOffer?: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack,
  onAddToCompare,
  onAddToWishlist,
  onOpenWatchdog,
  onOpenPriceOffer
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState(product.image);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Initialize selected size with the first available variant
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const firstAvailable = product.variants.find(v => v.stockStatus === 'in_stock') || product.variants[0];
      setSelectedSize(firstAvailable.size);
    } else {
      setSelectedSize('M'); // Fallback
    }
  }, [product]);

  // Combine primary image and additional images into a single unique array
  const galleryImages = useMemo(() => {
    return Array.from(new Set([product.image, ...(product.images || [])]));
  }, [product]);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  // Find current variant
  const currentVariant = useMemo(() => {
    return product.variants?.find(v => v.size === selectedSize);
  }, [product, selectedSize]);

  // Extract available sizes for Size Chart
  const availableSizes = useMemo(() => {
    return product.variants?.map(v => v.size) || [];
  }, [product]);

  return (
    <div className="pt-24 lg:pt-48 pb-20 bg-white min-h-screen animate-fade-in font-sans">
      {/* Breadcrumbs & Back */}
      <div className="container mx-auto px-4 mb-8">
        <button 
          onClick={onBack}
          aria-label="Späť do obchodu"
          className="flex items-center text-gray-500 hover:text-brand transition-colors mb-6 text-sm font-bold uppercase tracking-wider font-sans focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-none"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Späť do obchodu
        </button>
        
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-xs text-gray-400 uppercase tracking-widest space-x-2 font-sans list-none p-0 m-0">
            <li><span>Domov</span></li>
            <li aria-hidden="true"><span>/</span></li>
            <li><span>{product.category}</span></li>
            <li aria-hidden="true"><span>/</span></li>
            <li aria-current="page"><span className="text-black font-bold">{product.name}</span></li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
          
          {/* Left Column - Gallery */}
          <ProductGallery 
            product={product}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            galleryImages={galleryImages}
          />

          {/* Right Column - Info */}
          <ProductInfo 
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            currentVariant={currentVariant}
            onAddToCompare={onAddToCompare}
            onAddToWishlist={onAddToWishlist}
            onOpenWatchdog={onOpenWatchdog}
            onOpenPriceOffer={onOpenPriceOffer}
            setIsSizeChartOpen={setIsSizeChartOpen}
          />
        </div>

        {/* Tabs Section */}
        <ProductTabs 
          product={product}
          availableSizes={availableSizes}
        />
      </div>

       {/* Size Chart Modal */}
       <SizeChartModal 
        isOpen={isSizeChartOpen} 
        onClose={() => setIsSizeChartOpen(false)} 
        category={product.category}
        availableSizes={availableSizes}
      />
    </div>
  );
};

export default ProductDetail;
