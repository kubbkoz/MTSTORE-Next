
import React, { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { Product } from '../../types';
import Button from '../ui/Button';
import { editImageWithGemini, urlToBase64 } from '../../utils/gemini';

interface ProductGalleryProps {
  product: Product;
  activeImage: string;
  setActiveImage: (img: string) => void;
  galleryImages: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ 
  product, 
  activeImage, 
  setActiveImage, 
  galleryImages 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateDiscount = () => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  const handleAiEdit = async () => {
    if (!editPrompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const imageData = await urlToBase64(activeImage);
      const newImage = await editImageWithGemini(imageData, editPrompt);
      setActiveImage(newImage);
      setIsEditing(false);
      setEditPrompt('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Nepodarilo sa upraviť obrázok.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4" role="region" aria-label="Galéria produktu">
      {/* Main Image */}
      <div className="bg-gray-50 rounded-none p-8 md:p-12 border border-gray-100 relative group overflow-hidden h-[400px] md:h-[500px] flex items-center justify-center">
        {product.oldPrice && (
            <span className="absolute top-6 left-6 z-10 px-3 py-1.5 text-lg font-black text-white uppercase tracking-wider font-tech bg-brand shadow-lg transform -rotate-2">
              -{calculateDiscount()}%
          </span>
        )}
        
        <img 
          src={activeImage} 
          alt={`${product.name} - hlavný pohľad`}
          className="w-full h-full object-contain mix-blend-multiply transform transition-transform duration-700 group-hover:scale-105" 
        />

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black p-2 rounded-none shadow-lg hover:bg-brand hover:text-white transition-all z-20 group/ai"
          title="Upraviť s AI"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {isEditing && (
          <div className="absolute inset-x-4 top-16 z-30 bg-white/95 backdrop-blur-md p-4 rounded-none shadow-2xl border border-gray-200 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-tech text-xl uppercase font-bold flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-brand" />
                AI Magic Editor
              </h4>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-black rounded-none">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder='Napr. "Pridaj do pozadia hory", "Zmeň farbu na modrú"...'
                className="flex-1 px-4 py-2 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-brand font-sans"
                onKeyDown={(e) => e.key === 'Enter' && handleAiEdit()}
              />
              <Button 
                size="sm" 
                onClick={handleAiEdit} 
                disabled={isGenerating || !editPrompt}
                className="min-w-[100px]"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generovať'}
              </Button>
            </div>
            {errorMsg && (
              <p className="text-red-500 text-xs mt-2 font-bold">{errorMsg}</p>
            )}
            <p className="text-gray-400 text-xs mt-2 italic">Používa Gemini 2.5 Flash Image. Zadaj pokyn pre úpravu obrázka.</p>
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4" role="group" aria-label="Náhľady obrázkov">
          {galleryImages.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(img)}
              aria-label={`Zobraziť obrázok ${idx + 1}`}
              aria-current={activeImage === img ? 'true' : 'false'}
              className={`bg-gray-50 rounded-none p-2 border transition-all h-24 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand ${
                activeImage === img 
                  ? 'border-brand ring-1 ring-brand' 
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <img 
                src={img} 
                alt="" 
                aria-hidden="true"
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
