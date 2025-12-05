import React from 'react';
import { Truck, Wrench, MessageCircle, ShieldCheck } from 'lucide-react';
import { FEATURES } from '../../constants';

const iconMap = {
  Truck, Wrench, MessageCircle, ShieldCheck
};

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div key={idx} className="flex items-start space-x-4 group p-4 rounded hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="bg-gray-200 text-black p-3 rounded-full group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;