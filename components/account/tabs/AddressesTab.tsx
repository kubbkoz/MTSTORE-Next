import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Address } from '../types';
import Button from '../../ui/Button';

interface AddressesTabProps {
  addresses: Address[];
  onAddClick: (type: 'billing' | 'delivery') => void;
}

const AddressesTab: React.FC<AddressesTabProps> = ({ addresses, onAddClick }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold font-tech uppercase tracking-wide">Moje Adresy</h3>
            <Button 
                size="sm" 
                className="uppercase font-bold text-xs" 
                onClick={() => onAddClick('delivery')}
            >
                <Plus className="w-4 h-4 mr-2"/> Pridať novú
            </Button>
        </div>
        
        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">Fakturačné a Dodacie adresy</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
                <div key={addr.id} className={`border-2 p-6 relative group ${addr.isDefault ? 'border-brand bg-red-50/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="absolute top-4 right-4 flex gap-2">
                        {addr.isDefault && <span className="text-[10px] font-bold text-white bg-brand px-2 py-0.5 uppercase">Hlavná</span>}
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 uppercase border border-gray-200">{addr.type === 'billing' ? 'Fakturačná' : 'Dodacia'}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{addr.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 font-mono">
                        {addr.street}<br/>
                        {addr.zip} {addr.city}<br/>
                        Slovensko
                    </p>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-bold text-gray-500 hover:text-black uppercase flex items-center">
                            <Edit2 className="w-3 h-3 mr-1" /> Upraviť
                        </button>
                        {!addr.isDefault && (
                            <button className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase flex items-center">
                                <Trash2 className="w-3 h-3 mr-1" /> Odstrániť
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
   </div>
  );
};

export default AddressesTab;