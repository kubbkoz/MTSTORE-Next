
import React from 'react';
import { Gift } from 'lucide-react';
import Button from '../../ui/Button';

interface LoyaltyTabProps {
  onRedeemClick: () => void;
}

const LoyaltyTab: React.FC<LoyaltyTabProps> = ({ onRedeemClick }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
                <h3 className="text-2xl font-bold font-tech uppercase tracking-wide mb-2">Vernostný program</h3>
                <p className="text-sm text-gray-500">Zbierajte body a vymeňte ich za zľavy.</p>
            </div>
            <div className="text-right flex flex-col items-end">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Aktuálny stav</span>
                <span className="text-4xl font-black font-tech text-brand mb-4">450 b</span>
                <Button onClick={onRedeemClick} size="sm" className="uppercase font-bold tracking-wider text-xs">
                    Uplatniť body
                </Button>
            </div>
        </div>
        
        <div className="bg-black text-white p-6 mb-8 relative overflow-hidden">
            <div className="relative z-10">
                <h4 className="font-bold text-lg uppercase mb-2 font-tech">Úroveň: Silver Rider</h4>
                <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                    <div className="h-full bg-brand w-[45%]"></div>
                </div>
                <p className="text-xs text-gray-400">Chýba 550 bodov do úrovne Gold Rider (zľava 10%)</p>
            </div>
            <Gift className="absolute -bottom-4 -right-4 w-32 h-32 text-gray-800 opacity-20 rotate-12" />
        </div>

        <h4 className="font-bold uppercase text-sm mb-4">História bodov</h4>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
                <span>Nákup #20268892</span>
                <span className="text-green-600 font-bold">+289 b</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
                <span>Registrácia</span>
                <span className="text-green-600 font-bold">+100 b</span>
            </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                <span>Prvá recenzia</span>
                <span className="text-green-600 font-bold">+50 b</span>
            </div>
        </div>
    </div>
  );
};

export default LoyaltyTab;
