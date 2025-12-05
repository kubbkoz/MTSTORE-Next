
import React from 'react';
import { Product } from '../../../types';
import { Activity, Layers, Check, Truck, Zap, Cpu, Feather, Gauge, Disc } from 'lucide-react';

interface DescriptionTabProps {
  product: Product;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ product }) => {
  const getFeatureIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('motor') || lower.includes('bosch') || lower.includes('shimano') || lower.includes('batéria')) return <Zap aria-hidden="true" className="w-6 h-6 text-brand" />;
    if (lower.includes('rám') || lower.includes('carbon') || lower.includes('alloy')) return <Layers aria-hidden="true" className="w-6 h-6 text-blue-500" />;
    if (lower.includes('vidlica') || lower.includes('tlmič') || lower.includes('suspension') || lower.includes('travel')) return <Activity aria-hidden="true" className="w-6 h-6 text-green-500" />;
    if (lower.includes('brzdy') || lower.includes('brakes')) return <Disc aria-hidden="true" className="w-6 h-6 text-red-500" />;
    if (lower.includes('hmotnosť') || lower.includes('kg') || lower.includes('weight')) return <Feather aria-hidden="true" className="w-6 h-6 text-gray-500" />;
    if (lower.includes('display') || lower.includes('gps') || lower.includes('speed')) return <Gauge aria-hidden="true" className="w-6 h-6 text-purple-500" />;
    return <Cpu aria-hidden="true" className="w-6 h-6 text-gray-700" />;
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white">
        {/* Header */}
        <h3 className="text-3xl font-black mb-8 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Detailný popis produktu
        </h3>
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column */}
          <div className="flex-1 space-y-12">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none text-gray-600 font-sans">
                    <p className="text-xl font-medium leading-relaxed text-gray-800 border-l-4 border-brand pl-6">
                      {product.description}
                    </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Performance Column */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-brand">
                        <Activity className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-bold font-tech uppercase tracking-wide">Výkon & Technológie</h4>
                    </div>
                    <ul className="space-y-4 font-sans">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Optimalizovaná geometria</span>
                          <span className="text-sm text-gray-600">Navrhnuté pre maximálnu stabilitu a kontrolu v každom teréne.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Efektívny prenos sily</span>
                          <span className="text-sm text-gray-600">Minimálne straty energie pri šliapaní vďaka tuhému stredu.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Prémiové komponenty</span>
                          <span className="text-sm text-gray-600">Osadené diely od svetových výrobcov pre dlhú životnosť.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Comfort Column */}
                  <div>
                      <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-brand">
                          <Layers className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-bold font-tech uppercase tracking-wide">Komfort & Dizajn</h4>
                    </div>
                    <ul className="space-y-4 font-sans">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center mr-3 mt-1 flex-shrink-0" aria-hidden="true">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Ergonomický kokpit</span>
                          <span className="text-sm text-gray-600">Pohodlný úchop a intuitívne ovládanie všetkých prvkov.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center mr-3 mt-1 flex-shrink-0" aria-hidden="true">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        </div>
                          <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Integrovaná kabeláž</span>
                          <span className="text-sm text-gray-600">Čistý vzhľad rámu a ochrana káblov pred nečistotami.</span>
                        </div>
                      </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center mr-3 mt-1 flex-shrink-0" aria-hidden="true">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        </div>
                          <div>
                          <span className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-1">Moderná estetika</span>
                          <span className="text-sm text-gray-600">Dizajn ocenený prestížnymi cenami v roku 2026.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
              </div>

              {/* Dynamic Key Features Cards */}
              {product.features && product.features.length > 0 ? (
                  <div>
                  <h4 className="text-xl font-bold mb-6 font-tech uppercase flex items-center">
                      <span className="w-1.5 h-8 bg-brand mr-3" aria-hidden="true"></span>
                      Technológie & Kľúčové vlastnosti
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-none shadow-sm border border-gray-100 hover:shadow-md hover:border-brand/30 transition-all duration-300 flex items-start group">
                          <div className="bg-gray-50 p-3 rounded-full mr-4 group-hover:bg-brand/10 transition-colors">
                          {getFeatureIcon(feature)}
                          </div>
                          <div>
                          <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1 pt-1 font-tech">
                              {feature.split(' ').slice(0, 2).join(' ')}
                          </h5>
                          <p className="text-sm text-gray-600 font-medium font-sans">
                              {feature}
                          </p>
                          </div>
                      </div>
                      ))}
                  </div>
                  </div>
              ) : null}
          </div>

          {/* Sidebar Column: Packaging Info */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="bg-gray-50 p-8 rounded-none border border-gray-100 sticky top-24 lg:top-48">
                  <h4 className="text-lg font-bold mb-6 font-tech uppercase tracking-wide flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-brand" aria-hidden="true" />
                  Doručenie a montáž
                  </h4>
                  <div className="space-y-8 font-sans">
                      <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Obsah balenia</span>
                          <ul className="text-sm text-gray-600 space-y-3">
                          <li className="flex items-start"><Check className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" /> <span>Bicykel (zmontovaný a nastavený)</span></li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" /> <span>Servisná knižka a manuál</span></li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" /> <span>Pedále (ak sú súčasťou)</span></li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" /> <span>Namontované doplnky, ktoré ste si vybrali</span></li>
                          </ul>
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Stav pri doručení</span>
                          <p className="text-sm text-gray-600 leading-relaxed">
                          Bicykel doručujeme <strong>plne zmontovaný a nastavený</strong> našimi technikmi. 
                          Stačí vybaliť, nastaviť výšku sedla a môžete si vychutnať jazdu. 
                          </p>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;
