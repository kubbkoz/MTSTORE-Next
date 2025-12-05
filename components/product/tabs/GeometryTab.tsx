
import React, { useState, useEffect } from 'react';

interface GeometryTabProps {
  availableSizes: string[];
}

const GeometryTab: React.FC<GeometryTabProps> = ({ availableSizes }) => {
  const [geoRiderHeight, setGeoRiderHeight] = useState<number>(178);
  const [geoActiveSize, setGeoActiveSize] = useState<string>('M');

  // Geometry Logic
  useEffect(() => {
    let calculatedSize = 'M';
    if (geoRiderHeight < 170) calculatedSize = 'XS';
    else if (geoRiderHeight >= 170 && geoRiderHeight < 180) calculatedSize = 'S';
    else if (geoRiderHeight >= 180 && geoRiderHeight < 185) calculatedSize = 'M';
    else if (geoRiderHeight >= 185 && geoRiderHeight < 195) calculatedSize = 'L';
    else calculatedSize = 'XL';
    setGeoActiveSize(calculatedSize);
  }, [geoRiderHeight]);

  const geometryData: Record<string, Record<string, string>> = {
    'XS': { 'Wheel Size': '27.5"', 'Seat Tube': '440', 'Top Tube': '550', 'Head Tube': '100', 'Reach': '390', 'Stack': '590', 'Wheelbase': '1140' },
    'S': { 'Wheel Size': '29"', 'Seat Tube': '480', 'Top Tube': '580', 'Head Tube': '110', 'Reach': '420', 'Stack': '605', 'Wheelbase': '1170' },
    'M': { 'Wheel Size': '29"', 'Seat Tube': '503', 'Top Tube': '605', 'Head Tube': '120', 'Reach': '450', 'Stack': '615', 'Wheelbase': '1200' },
    'L': { 'Wheel Size': '29"', 'Seat Tube': '520', 'Top Tube': '630', 'Head Tube': '130', 'Reach': '475', 'Stack': '630', 'Wheelbase': '1230' },
    'XL': { 'Wheel Size': '29"', 'Seat Tube': '540', 'Top Tube': '650', 'Head Tube': '145', 'Reach': '500', 'Stack': '645', 'Wheelbase': '1260' },
  };

  return (
    <div className="animate-fade-in font-sans">
      {/* Header */}
      <h3 className="text-3xl font-black mb-12 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Geometria a veľkostná tabuľka
      </h3>

      <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Visuals & Slider */}
          <div className="flex-1">
            <div className="bg-gray-50 p-6 mb-8 border border-gray-100 flex items-center justify-center">
              <img 
                src="https://www.mt-sport.sk/wp-content/uploads/2025/07/image-58.png.webp" 
                alt="Geometry Diagram" 
                className="w-full h-auto max-h-[300px] object-contain mix-blend-multiply"
              />
            </div>
            <div className="bg-gray-50 p-6 border border-gray-100">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 text-center">
                Nastavte výšku jazdca: <span className="text-brand text-lg">{geoRiderHeight} cm</span>
              </label>
              <div className="relative px-2">
                <input 
                  type="range" 
                  min="155" 
                  max="205" 
                  value={geoRiderHeight} 
                  onChange={(e) => setGeoRiderHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono font-bold">
                  <span>155cm</span>
                  <span>180cm</span>
                  <span>205cm</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">Odporúčaná veľkosť:</span>
                <div className="text-4xl font-black font-tech text-black mt-1">{geoActiveSize}</div>
              </div>
            </div>
          </div>

          {/* Right Side: Data Table */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setGeoActiveSize(size)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border-b-4 ${
                    geoActiveSize === size 
                      ? 'border-brand text-black bg-gray-50' 
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold uppercase font-tech mb-6 text-center lg:text-left">
              {geoActiveSize === 'XS' && 'XS 49 (155-170cm)'}
              {geoActiveSize === 'S' && 'S 52 (170-180cm)'}
              {geoActiveSize === 'M' && 'M 54 (175-185cm)'}
              {geoActiveSize === 'L' && 'L 56 (180-190cm)'}
              {geoActiveSize === 'XL' && 'XL 58 (185-200cm)'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mb-8">
              {geometryData[geoActiveSize] && Object.entries(geometryData[geoActiveSize]).map(([key, value]) => (
                <div key={key} className="text-center">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{key}</span>
                  <span className="block text-xl font-black font-tech text-gray-900">{value} {key === 'Wheel Size' ? '' : 'mm'}</span>
                </div>
              ))}
              {/* Static filler */}
              <div className="text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">BB Drop</span>
                <span className="block text-xl font-black font-tech text-gray-900">70 mm</span>
              </div>
                <div className="text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seat Angle</span>
                <span className="block text-xl font-black font-tech text-gray-900">74°</span>
              </div>
                <div className="text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Head Angle</span>
                <span className="block text-xl font-black font-tech text-gray-900">68°</span>
              </div>
              <div className="text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Chainstay</span>
                <span className="block text-xl font-black font-tech text-gray-900">435 mm</span>
              </div>
            </div>

            {/* Expert Tip Box */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 text-sm text-blue-800 rounded-none shadow-sm">
              <p className="leading-relaxed"><strong>Tip experta:</strong> Ak sa nachádzate na rozmedzí dvoch veľkostí, pre športovejšiu jazdu zvoľte menší rám, pre komfortnejšiu jazdu zvoľte väčší rám.</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default GeometryTab;
