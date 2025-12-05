
import React from 'react';
import { Product } from '../../../types';
import { Building, MapPin, Globe, Phone } from 'lucide-react';

interface DistributorTabProps {
  product: Product;
}

const DistributorTab: React.FC<DistributorTabProps> = ({ product }) => {
  return (
    <div className="animate-fade-in font-sans">
        {/* Header */}
        <h3 className="text-3xl font-black mb-12 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Informácie o výrobcovi / distribútorovi
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 border border-gray-200 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Building className="w-10 h-10 text-gray-400" />
            </div>
            <h5 className="font-black font-tech text-2xl uppercase mb-2">{product.brand || 'Výrobca'}</h5>
            <p className="text-xs text-gray-500 mb-4">Official Authorized Dealer</p>
            <a href="#" className="text-brand font-bold uppercase text-xs hover:underline">Zobraziť všetky produkty</a>
          </div>
          <div className="flex-1">
            <p className="text-gray-600 leading-relaxed mb-6">
                {product.brand} je popredným svetovým výrobcom v cyklistickom priemysle, známy svojou inováciou, kvalitou a dizajnom. 
                Všetky produkty prechádzajú prísnym testovaním, aby spĺňali najvyššie štandardy bezpečnosti a výkonu.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-brand mr-3 mt-0.5" />
                  <div>
                      <span className="font-bold text-gray-900 block text-sm uppercase">Sídlo</span>
                      <span className="text-sm text-gray-600">Priemyselná 12, 821 09 Bratislava</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-brand mr-3 mt-0.5" />
                  <div>
                      <span className="font-bold text-gray-900 block text-sm uppercase">Web</span>
                      <a href="#" className="text-sm text-gray-600 hover:text-brand">www.{product.brand?.toLowerCase()}.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-brand mr-3 mt-0.5" />
                  <div>
                      <span className="font-bold text-gray-900 block text-sm uppercase">Servisná podpora</span>
                      <span className="text-sm text-gray-600">+421 2 1234 5678</span>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DistributorTab;
