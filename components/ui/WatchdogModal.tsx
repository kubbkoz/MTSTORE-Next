import React, { useEffect, useState } from 'react';
import { X, Eye, Send } from 'lucide-react';
import { Product } from '../../types';
import Button from './Button';

interface WatchdogModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const WatchdogModal: React.FC<WatchdogModalProps> = ({ isOpen, product, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetPrice: ''
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', targetPrice: '' });
      setSelectedSizes([]);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the API call with selectedSizes included
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl animate-slide-up rounded-none overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-black uppercase font-tech tracking-wide mb-1 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-brand" /> Strážny pes
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 transition-colors rounded-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase font-tech mb-2">Požiadavka odoslaná</h3>
              <p className="text-gray-600 mb-6">Ďakujeme. Hneď ako cena klesne alebo bude tovar skladom, budeme vás informovať.</p>
              <Button onClick={onClose} fullWidth>Zatvoriť</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                <div>
                   <h4 className="font-bold text-sm uppercase">{product.name}</h4>
                   <span className="text-brand font-black font-tech text-lg">{product.price} €</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Meno a Priezvisko</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Telefón</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Sledovať cenu pod (€)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                    placeholder="Zadajte cieľovú sumu"
                    value={formData.targetPrice}
                    onChange={e => setFormData({...formData, targetPrice: e.target.value})}
                  />
                  <p className="text-xs text-gray-400 mt-1">Aktuálna cena: {product.price} €</p>
                </div>

                {/* Size Selection */}
                {product.variants && product.variants.length > 0 && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Strážiť dostupnosť veľkosti:</label>
                    <div className="flex flex-wrap gap-3">
                      {product.variants.map((variant) => {
                        const isSelected = selectedSizes.includes(variant.size);
                        return (
                          <button
                            key={variant.size}
                            type="button"
                            onClick={() => toggleSize(variant.size)}
                            className={`min-w-[3.5rem] w-auto px-3 h-14 flex items-center justify-center font-bold text-sm transition-all border-2 font-sans focus:outline-none focus:ring-2 focus:ring-brand rounded-none ${
                              isSelected
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                            }`}
                          >
                            {variant.size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button type="submit" fullWidth size="lg" className="uppercase font-bold tracking-wider">
                    Aktivovať stráženie
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchdogModal;