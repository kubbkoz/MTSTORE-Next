import React from 'react';
import { NEW_PRODUCTS } from '../../../constants';
import { Order } from '../types';
import { Package } from 'lucide-react';

interface DashboardTabProps {
  recentOrders: Order[];
  onViewAllOrders: () => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ recentOrders, onViewAllOrders }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 border-l-4 border-brand shadow-sm">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Aktívne objednávky</span>
          <div className="text-3xl font-black font-tech">1</div>
        </div>
        <div className="bg-white p-6 border-l-4 border-black shadow-sm">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Vernostné body</span>
          <div className="text-3xl font-black font-tech">450 b</div>
        </div>
        <div className="bg-white p-6 border-l-4 border-gray-200 shadow-sm">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Celkovo minuté</span>
          <div className="text-3xl font-black font-tech">3 133 €</div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-bold font-tech uppercase tracking-wide">Posledné objednávky</h3>
              <button onClick={onViewAllOrders} className="text-xs font-bold uppercase text-brand hover:underline">Zobraziť všetky</button>
          </div>
          <div className="space-y-4">
              {recentOrders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-white border border-gray-200">
                              <Package className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                              <span className="block font-bold text-sm font-tech">{order.id}</span>
                              <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="block font-bold text-sm">{order.total} €</span>
                          <span className={`text-[10px] font-bold uppercase ${order.status === 'Doručené' ? 'text-green-600' : 'text-blue-600'}`}>{order.status}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Recently Viewed */}
      <div className="bg-white border border-gray-100 shadow-sm p-8">
          <h3 className="text-xl font-bold font-tech uppercase tracking-wide mb-6">Naposledy prezerané</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {NEW_PRODUCTS.slice(0, 4).map(product => (
                  <div key={product.id} className="group cursor-pointer">
                      <div className="bg-gray-50 mb-2 overflow-hidden h-40 flex items-center justify-center p-4">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="font-bold text-xs uppercase truncate group-hover:text-brand">{product.name}</h4>
                      <span className="font-black font-tech text-sm">{product.price} €</span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default DashboardTab;