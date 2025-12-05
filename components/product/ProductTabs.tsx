import React, { useState } from 'react';
import { Product } from '../../types';
import DescriptionTab from './tabs/DescriptionTab';
import SpecsTab from './tabs/SpecsTab';
import GeometryTab from './tabs/GeometryTab';
import ReviewsTab from './tabs/ReviewsTab';
import DownloadsTab from './tabs/DownloadsTab';
import DistributorTab from './tabs/DistributorTab';

interface ProductTabsProps {
  product: Product;
  availableSizes: string[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, availableSizes }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'geometry' | 'downloads' | 'distributor'>('description');

  return (
    <div className="border-t border-gray-200 pt-10">
      <div className="flex flex-wrap justify-start gap-10 mb-10 border-b border-gray-200" role="tablist" aria-label="Informácie o produkte">
        {['description', 'specs', 'geometry', 'reviews', 'downloads', 'distributor'].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            id={`tab-${tab}`}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-xl font-black uppercase tracking-wide font-tech transition-all relative focus:outline-none ${
              activeTab === tab 
                ? 'text-black' 
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {tab === 'description' && 'Popis produktu'}
            {tab === 'specs' && 'Špecifikácia'}
            {tab === 'geometry' && 'Geometria rámu'}
            {tab === 'reviews' && `Hodnotenia (${product.reviewsCount})`}
            {tab === 'downloads' && 'Dokumenty na stiahnutie'}
            {tab === 'distributor' && 'Výrobca / distribútor'}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-brand" aria-hidden="true"></span>
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[300px]" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'description' && <DescriptionTab product={product} />}
        {activeTab === 'specs' && <SpecsTab product={product} availableSizes={availableSizes} />}
        {activeTab === 'geometry' && <GeometryTab availableSizes={availableSizes} />}
        {activeTab === 'reviews' && <ReviewsTab product={product} />}
        {activeTab === 'downloads' && <DownloadsTab />}
        {activeTab === 'distributor' && <DistributorTab product={product} />}
      </div>
    </div>
  );
};

export default ProductTabs;