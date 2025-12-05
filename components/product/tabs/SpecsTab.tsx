import React from 'react';
import { Product } from '../../../types';
import { AlertTriangle, Zap, Layers, Settings, Disc, Box, CircleDot, Info, Cpu, Hash } from 'lucide-react';

interface SpecsTabProps {
  product: Product;
  availableSizes: string[];
}

const SpecsTab: React.FC<SpecsTabProps> = ({ product, availableSizes }) => {
  const detailedSpecs = [
    { key: 'Rám', value: 'Low Aluminium 27,5", 140mm' },
    { key: 'Motor', value: 'Bosch Performance Line CX, 600W, 25km/h, 85Nm' },
    { key: 'Batéria', value: 'Bosch PowerTube 600Wh' },
    { key: 'Displej', value: 'Bosch LED Remote' },
    { key: 'Vidlica', value: 'RockShox Psylo Silver RC, Crown Adjust, Solo Air, Offset: 44 mm, 140mm' },
    { key: 'Tlmič', value: 'RockShox Deluxe Select R 185x55mm, Trunnion, DebonAir+' },
    { key: 'Prehadzovačka', value: 'Shimano CUES RD-U6000 10/11s, Shadow+' },
    { key: 'Kľuky/Prevodník', value: 'Miranda Crius ISIS Crankset 165 mm' },
    { key: 'Radenie', value: 'SHIMANO CUES SL-U6000-11R, RAPIDFIRE Plus, 11-speed' },
    { key: 'Kazeta', value: 'Shimano CUES CS-LG400-11, HG, 11-50T' },
    { key: 'Brzdy', value: 'Tektro TRP Slate EVO HD-M807, 4 pistons, 203 mm' },
    { key: 'Hlavové zloženie', value: 'Acros BlockLock 135° ZS56/ZS56, Semi-Integtrated' },
    { key: 'Reťaz', value: 'Shimano CN-LG500 9-11s, LINKGLIDE' },
    { key: 'Riadidlá', value: 'Haibike TheBar++ Dia. 31.8 mm, 780 mm' },
    { key: 'Predstavec', value: 'Haibike JD-ST161A, Dia. 31.8 mm, L: 35 mm, A-Head' },
    { key: 'Madlá', value: 'XLC MTB Grip Set VLG-1751D2' },
    { key: 'Sedlovka', value: 'Limotec Dropperpost A1H Dropper, Dia. 34.9 mm, Travel: 125 mm 402 mm, teleskopická' },
    { key: 'Sedlo', value: 'SELLE ROYAL VIVO' },
    { key: 'Ráfiky', value: 'WTB ST i30 TCS 2.0 27.5" 32H, nitovaný, ráfik s dutinou' },
    { key: 'Plášte', value: 'Continental Xynotal Trail Endurance, foldable skin SL, 60-584' },
    { key: 'Pedále', value: 'XLC VPE-527 MTB Alloy Pedal w. Reflector' },
    { key: 'Rýchlosti', value: '11' },
    { key: 'Montáž', value: 'Doručíme poskladaný a nastavený' },
    { key: 'Veľkosť rámu', value: availableSizes.join(', ') },
    { key: 'Značka/Výrobca/Distribútor', value: product.brand || 'Haibike' },
    { key: 'Ročník', value: '2025' },
  ];

  // Logic to categorize specs
  const categorizeSpecs = () => {
    const groups = {
      ebike: { id: 'ebike', title: 'E-Bike Systém', icon: <Zap className="w-5 h-5 text-yellow-500" />, items: [] as typeof detailedSpecs },
      frame: { id: 'frame', title: 'Rám a Odpruženie', icon: <Layers className="w-5 h-5 text-brand" />, items: [] as typeof detailedSpecs },
      drivetrain: { id: 'drivetrain', title: 'Pohon a Radenie', icon: <Settings className="w-5 h-5 text-gray-500" />, items: [] as typeof detailedSpecs },
      brakes: { id: 'brakes', title: 'Brzdy', icon: <Disc className="w-5 h-5 text-red-500" />, items: [] as typeof detailedSpecs },
      wheels: { id: 'wheels', title: 'Kolesá a Plášte', icon: <CircleDot className="w-5 h-5 text-blue-500" />, items: [] as typeof detailedSpecs },
      components: { id: 'components', title: 'Komponenty', icon: <Box className="w-5 h-5 text-purple-500" />, items: [] as typeof detailedSpecs },
      other: { id: 'other', title: 'Ostatné', icon: <Info className="w-5 h-5 text-gray-400" />, items: [] as typeof detailedSpecs },
    };

    detailedSpecs.forEach(spec => {
      const k = spec.key.toLowerCase();
      if (k.includes('motor') || k.includes('batéria') || k.includes('displej') || k.includes('nabíjačka')) {
        groups.ebike.items.push(spec);
      } else if (k.includes('rám') || k.includes('vidlica') || k.includes('tlmič') || k.includes('hlavové')) {
        groups.frame.items.push(spec);
      } else if (k.includes('prehadzovačka') || k.includes('radenie') || k.includes('kľuky') || k.includes('kazeta') || k.includes('reťaz') || k.includes('pedále') || k.includes('rýchlosti')) {
        groups.drivetrain.items.push(spec);
      } else if (k.includes('brzdy') || k.includes('kotúč')) {
        groups.brakes.items.push(spec);
      } else if (k.includes('ráfiky') || k.includes('plášte') || k.includes('náboj') || k.includes('výplet')) {
        groups.wheels.items.push(spec);
      } else if (k.includes('riadidlá') || k.includes('predstavec') || k.includes('sedlovka') || k.includes('sedlo') || k.includes('madlá')) {
        groups.components.items.push(spec);
      } else {
        groups.other.items.push(spec);
      }
    });

    return groups;
  };

  const groups = categorizeSpecs();

  // Define column layout
  const leftColumnKeys = ['ebike', 'frame', 'drivetrain'];
  const rightColumnKeys = ['brakes','wheels', 'components', 'other'];

  const renderGroup = (groupKey: string) => {
    // @ts-ignore
    const group = groups[groupKey];
    if (!group || group.items.length === 0) return null;

    return (
      <div key={groupKey} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-none overflow-hidden h-fit">
        {/* Group Header - Standardized */}
        <div className="px-6 py-4 border-b bg-gray-50 border-gray-100 text-gray-900 flex items-center justify-between">
          <h4 className="text-lg font-black font-tech uppercase tracking-wide flex items-center">
            <span className="mr-3">{group.icon}</span>
            {group.title}
          </h4>
        </div>
        
        {/* Items List */}
        <div className="divide-y divide-gray-50">
          {group.items.map((spec: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-3 hover:bg-gray-50/80 transition-colors gap-1 sm:gap-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans flex-shrink-0">
                {spec.key}
              </span>
              <span className="text-sm font-bold text-gray-900 text-left sm:text-right font-sans leading-tight">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in font-sans">
      {/* Header */}
      <h3 className="text-3xl font-black mb-12 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Kompletná špecifikácia
      </h3>

      {/* 1. Warning Box - Top Full Width */}
      <div className="flex items-center p-6 border-l-4 border-orange-400 bg-orange-50/50 mb-10">
         <AlertTriangle className="w-8 h-8 text-orange-500 mr-6 flex-shrink-0" />
         <div>
           <h5 className="font-bold font-tech uppercase text-orange-700 mb-1 text-lg">Dôležité upozornenie</h5>
           <p className="text-base text-orange-800/80 leading-relaxed font-medium">
             Výrobca si vyhradzuje právo meniť špecifikácie, farby a parametre bez predchádzajúceho upozornenia. 
             Hmotnosti bicyklov nie sú štandardne udávané, pretože neexistuje jednotná norma váženia.
           </p>
         </div>
      </div>

      {/* Main Grid: Left and Right Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          {leftColumnKeys.map(key => renderGroup(key))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {rightColumnKeys.map(key => renderGroup(key))}
        </div>

      </div>

      {/* 2. System ID Box - Bottom Full Width */}
      <div className="bg-gray-50 text-gray-800 p-8 border border-gray-200 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 rounded-none">
         <Hash className="absolute top-4 right-4 w-12 h-12 text-gray-200" />
         <h5 className="font-bold font-tech uppercase text-black mb-8 tracking-wider flex items-center text-xl">
           <Cpu className="w-5 h-5 mr-2 text-brand" /> 
           Systémové dáta
         </h5>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 font-mono">
            {product.variants?.map((v) => {
               // Generate deterministic fake data
               const seed = v.size.charCodeAt(0) + (product.id.charCodeAt(0) || 0); 
               return (
                 <div key={v.size} className="bg-white p-5 border border-gray-100 shadow-sm hover:border-brand/30 transition-colors">
                   <span className="block font-bold text-brand mb-3 text-lg border-b border-gray-100 pb-2">
                     {v.size} {v.size === 'M' ? '(45cm)' : v.size === 'L' ? '(49cm)' : v.size === 'S' ? '(40cm)' : ''}
                   </span>
                   <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">SKU:</span> <span className="font-bold">452025{seed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">EAN:</span> <span className="font-bold">4054624166{seed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Model ID:</span> <span className="font-bold">8896{seed}</span>
                      </div>
                   </div>
                 </div>
               )
            })}
         </div>
      </div>

    </div>
  );
};

export default SpecsTab;