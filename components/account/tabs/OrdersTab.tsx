import React, { useState } from 'react';
import { Package, Clock, ChevronUp, ChevronDown, Eye, RotateCcw } from 'lucide-react';
import { Order } from '../types';
import Button from '../../ui/Button';

interface OrdersTabProps {
  orders: Order[];
  onViewDetail: (order: Order) => void;
  onReorder: (order: Order) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onViewDetail, onReorder }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const isReturnable = (dateStr: string) => {
    return dateStr.includes('2026'); 
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 animate-fade-in min-h-[500px]">
       <h3 className="text-2xl font-bold font-tech uppercase tracking-wide mb-8">História objednávok</h3>
       <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-50 border border-gray-100 transition-colors group">
              {/* Order Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer" onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}>
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className={`p-3 rounded-full ${order.status === 'Doručené' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                          <Package className="w-5 h-5" />
                      </div>
                      <div>
                          <span className="block font-bold text-lg font-tech">{order.id}</span>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" /> {order.date}
                          </div>
                      </div>
                  </div>
                  <div className="flex items-center justify-between md:gap-8 w-full md:w-auto">
                      <div className="text-right mr-4">
                          <span className="block text-xs text-gray-400 uppercase font-bold">Celkom</span>
                          <span className="font-black font-tech text-xl">{order.total} €</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-none ${
                              order.status === 'Doručené' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                              {order.status}
                          </span>
                          {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                  </div>
              </div>

              {/* Expandable Actions & Preview */}
              {expandedOrderId === order.id && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-200 animate-fade-in">
                      <div className="flex flex-wrap gap-3 mt-4 justify-end">
                          <Button size="sm" variant="outline" onClick={() => onViewDetail(order)} className="text-xs uppercase font-bold">
                              <Eye className="w-4 h-4 mr-2" /> Detail objednávky
                          </Button>
                          <Button size="sm" onClick={() => onReorder(order)} className="text-xs uppercase font-bold">
                              <RotateCcw className="w-4 h-4 mr-2" /> Objednať znova
                          </Button>
                          <Button 
                              size="sm" 
                              variant="ghost" 
                              disabled={!isReturnable(order.date)} 
                              className={`text-xs uppercase font-bold ${!isReturnable(order.date) ? 'opacity-50 cursor-not-allowed' : 'text-red-500 hover:text-red-600'}`}
                          >
                              Vrátiť tovar
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs uppercase font-bold text-gray-500">
                              Reklamovať
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs uppercase font-bold text-yellow-500">
                              Ohodnotiť
                          </Button>
                      </div>
                  </div>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default OrdersTab;