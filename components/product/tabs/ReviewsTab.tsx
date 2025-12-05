
import React from 'react';
import { Product } from '../../../types';
import { Star } from 'lucide-react';
import Button from '../../ui/Button';

interface ReviewsTabProps {
  product: Product;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ product }) => {
  return (
    <div className="animate-fade-in font-sans">
      {/* Header */}
      <h3 className="text-3xl font-black mb-12 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Zákaznícke hodnotenia produktu
      </h3>

      {/* Summary Section - Centered */}
      <div className="flex flex-col items-center text-center mb-16">
          <div className="text-6xl font-black font-tech text-black mb-2">{product.rating}</div>
          <div className="flex text-yellow-400 mb-4 scale-125">
              {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-200'}`} />
              ))}
          </div>
          <p className="text-gray-500 font-medium mb-8">Založené na {product.reviewsCount} hodnoteniach</p>
          <Button variant="primary" size="lg" className="uppercase font-bold tracking-wider">
              Napísať recenziu
          </Button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3].map((review) => (
          <div key={review} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 font-tech text-lg">
                  MK
                </div>
                <div className="text-left">
                  <span className="block font-bold text-sm uppercase tracking-wide">Martin K.</span>
                  <span className="text-xs text-gray-400">Overený zákazník</span>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">Pred 2 týždňami</span>
            </div>
            <div className="flex text-yellow-400 mb-4 text-xs">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <p className="text-gray-600 italic leading-relaxed text-sm">
              "Výborný produkt, splnil všetky moje očakávania. Doručenie bolo bleskové a komunikácia s obchodom na jedničku. Určite odporúčam."
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
