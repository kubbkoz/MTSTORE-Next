import React from 'react';
import { X } from 'lucide-react';
import Button from '../../ui/Button';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'billing' | 'delivery';
  setType: (type: 'billing' | 'delivery') => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, type, setType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative w-full max-w-lg bg-white p-8 shadow-2xl animate-fade-in rounded-none">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold font-tech uppercase">Pridať novú adresu</h3>
                <button onClick={onClose}><X className="w-6 h-6" /></button>
            </div>
            <form className="space-y-4">
                <div className="flex gap-4 mb-4">
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="addrType" checked={type === 'delivery'} onChange={() => setType('delivery')} className="mr-2 accent-brand"/>
                        <span className="text-sm font-bold">Dodacia</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="addrType" checked={type === 'billing'} onChange={() => setType('billing')} className="mr-2 accent-brand"/>
                        <span className="text-sm font-bold">Fakturačná</span>
                    </label>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Názov adresy (napr. Práca)</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none rounded-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ulica a číslo</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none rounded-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Mesto</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none rounded-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">PSČ</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none rounded-none" />
                    </div>
                </div>
                <div className="pt-4">
                    <Button fullWidth className="uppercase font-bold tracking-wider">Uložiť adresu</Button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AddressModal;