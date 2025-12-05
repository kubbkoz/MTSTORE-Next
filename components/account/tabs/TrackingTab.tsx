import React, { useState } from 'react';
import { Search, CheckCircle, Box, Truck, MapPin } from 'lucide-react';
import { Order } from '../types';
import Button from '../../ui/Button';

interface TrackingTabProps {
  orders: Order[];
}

const TrackingTab: React.FC<TrackingTabProps> = ({ orders }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-white border border-gray-100 shadow-sm p-8">
            <h3 className="text-2xl font-bold font-tech uppercase tracking-wide mb-6">Sledovanie objednávky</h3>
            <div className="max-w-xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Číslo zásielky / Objednávky</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Napr. 20268892" 
                        className="flex-1 p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <Button className="uppercase font-bold tracking-wider">Hľadať</Button>
                </div>
                <p className="text-sm text-gray-400 mt-4 italic">Zadajte číslo objednávky alebo sledovacie číslo od kuriéra.</p>
            </div>
        </div>

        {/* Active Order Tracking */}
        {orders.filter(o => o.status !== 'Doručené' && o.status !== 'Zrušené').map(order => (
            <div key={order.id} className="bg-white border border-gray-100 shadow-sm p-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h4 className="text-lg font-bold font-tech uppercase tracking-wide mb-1">Aktívna objednávka {order.id}</h4>
                        <p className="text-sm text-gray-500">Predpokladané doručenie: <strong>Zajtra</strong></p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">{order.status}</span>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand transition-all duration-1000" style={{ width: `${((order.trackingStep || 1) - 1) * 33}%` }}></div>
                    
                    <div className="relative flex justify-between">
                        {[
                            { step: 1, label: 'Prijaté', icon: CheckCircle },
                            { step: 2, label: 'Spracováva sa', icon: Box },
                            { step: 3, label: 'Odoslané', icon: Truck },
                            { step: 4, label: 'Doručené', icon: MapPin }
                        ].map((s) => {
                            const isCompleted = (order.trackingStep || 1) >= s.step;
                            const isCurrent = (order.trackingStep || 1) === s.step;
                            
                            return (
                                <div key={s.step} className="flex flex-col items-center gap-2 bg-white px-2 z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                        isCompleted ? 'bg-brand border-brand text-white' : 'bg-white border-gray-200 text-gray-400'
                                    }`}>
                                        <s.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-brand' : 'text-gray-400'}`}>
                                        {s.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default TrackingTab;