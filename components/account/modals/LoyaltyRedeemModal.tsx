
import React, { useState } from 'react';
import { X, Tag, Check } from 'lucide-react';
import Button from '../../ui/Button';

interface LoyaltyRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const LoyaltyRedeemModal: React.FC<LoyaltyRedeemModalProps> = ({ isOpen, onClose, points }) => {
  const [activeTab, setActiveTab] = useState<'coupons' | 'gifts'>('coupons');
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const coupons = [
    { id: 'c1', cost: 100, value: '5€', description: 'Zľava na nákup nad 50€' },
    { id: 'c2', cost: 200, value: '10€', description: 'Zľava na nákup nad 100€' },
    { id: 'c3', cost: 500, value: '25€', description: 'Zľava na nákup nad 200€' },
  ];

  const gifts = [
    { id: 'g1', cost: 150, name: 'MT-SPORT Fľaša', image: 'https://images.unsplash.com/photo-1602143407151-11115cd4e69b?w=200&fit=crop' },
    { id: 'g2', cost: 300, name: 'Cyklo Ponožky', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&fit=crop' },
    { id: 'g3', cost: 800, name: 'Sada náradia', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&fit=crop' },
  ];

  const handleRedeem = () => {
    setIsSuccess(true);
    // In real app, API call here
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white p-0 shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
                <h3 className="text-xl font-bold font-tech uppercase">Uplatniť body</h3>
                <p className="text-sm text-brand font-bold">Dostupné body: {points}</p>
            </div>
            <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        {isSuccess ? (
            <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold uppercase font-tech mb-2">Úspešne uplatnené!</h3>
                <p className="text-gray-600 mb-8">
                    {activeTab === 'coupons' 
                        ? 'Váš zľavový kód bol vygenerovaný a odoslaný na email.' 
                        : 'Darček bol pridaný do vašej nasledujúcej objednávky.'}
                </p>
                <Button fullWidth onClick={onClose}>Zavrieť</Button>
            </div>
        ) : (
            <>
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button 
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'coupons' ? 'border-b-2 border-brand text-brand' : 'text-gray-500 hover:text-black'}`}
                        onClick={() => setActiveTab('coupons')}
                    >
                        Zľavové kupóny
                    </button>
                    <button 
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'gifts' ? 'border-b-2 border-brand text-brand' : 'text-gray-500 hover:text-black'}`}
                        onClick={() => setActiveTab('gifts')}
                    >
                        Darčeky
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                    {activeTab === 'coupons' && (
                        <div className="space-y-4">
                            {coupons.map(coupon => (
                                <div 
                                    key={coupon.id}
                                    onClick={() => setSelectedReward(coupon.id)}
                                    className={`p-4 border-2 cursor-pointer flex justify-between items-center transition-all bg-white ${selectedReward === coupon.id ? 'border-brand shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-600">
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block font-black font-tech text-xl">{coupon.value}</span>
                                            <span className="text-xs text-gray-500 font-bold uppercase">{coupon.description}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block font-bold ${points >= coupon.cost ? 'text-brand' : 'text-gray-400'}`}>{coupon.cost} bodov</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'gifts' && (
                        <div className="grid grid-cols-2 gap-4">
                            {gifts.map(gift => (
                                <div 
                                    key={gift.id}
                                    onClick={() => setSelectedReward(gift.id)}
                                    className={`p-4 border-2 cursor-pointer transition-all bg-white flex flex-col items-center text-center ${selectedReward === gift.id ? 'border-brand shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-full h-24 mb-3 bg-gray-50">
                                        <img src={gift.image} alt={gift.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <span className="block font-bold text-sm uppercase mb-1">{gift.name}</span>
                                    <span className={`block font-bold text-xs ${points >= gift.cost ? 'text-brand' : 'text-gray-400'}`}>{gift.cost} bodov</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white">
                    <Button 
                        fullWidth 
                        size="lg" 
                        disabled={!selectedReward}
                        onClick={handleRedeem}
                        className="uppercase font-bold tracking-wider"
                    >
                        Uplatniť {selectedReward ? (activeTab === 'coupons' ? coupons.find(c => c.id === selectedReward)?.cost : gifts.find(g => g.id === selectedReward)?.cost) : ''} bodov
                    </Button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default LoyaltyRedeemModal;
