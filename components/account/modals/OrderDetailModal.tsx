import React from 'react';
import { X } from 'lucide-react';
import { Order } from '../types';
import Button from '../../ui/Button';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative w-full max-w-2xl bg-white shadow-2xl animate-slide-up rounded-none overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                    <h3 className="text-xl font-bold font-tech uppercase">Detail objednávky</h3>
                    <p className="text-sm text-gray-500 font-mono font-bold">{order.id}</p>
                </div>
                <button onClick={onClose}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
                <div className="flex justify-between mb-6 text-sm">
                    <div>
                        <span className="block text-gray-400 text-xs uppercase font-bold">Dátum</span>
                        <span className="font-bold">{order.date}</span>
                    </div>
                    <div>
                        <span className="block text-gray-400 text-xs uppercase font-bold">Platba</span>
                        <span className="font-bold">{order.paymentMethod}</span>
                    </div>
                    <div>
                        <span className="block text-gray-400 text-xs uppercase font-bold">Stav</span>
                        <span className="font-bold text-brand">{order.status}</span>
                    </div>
                </div>
                
                <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                            <div className="w-16 h-16 bg-gray-50 border border-gray-100 p-1">
                                <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm uppercase font-tech">{item.name}</h4>
                                <p className="text-xs text-gray-500">Množstvo: {item.quantity} ks</p>
                            </div>
                            <div className="font-bold">{item.price} €</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t-2 border-black">
                    <span className="font-bold uppercase tracking-wider text-sm">Spolu</span>
                    <span className="text-2xl font-black font-tech">{order.total} €</span>
                </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                <Button fullWidth onClick={() => { alert('Faktúra stiahnutá'); }}>Stiahnuť faktúru (PDF)</Button>
            </div>
        </div>
    </div>
  );
};

export default OrderDetailModal;