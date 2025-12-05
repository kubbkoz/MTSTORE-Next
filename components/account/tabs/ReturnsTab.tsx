
import React from 'react';
import { RotateCcw } from 'lucide-react';
import Button from '../../ui/Button';

const ReturnsTab: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 animate-fade-in">
        <h3 className="text-2xl font-bold font-tech uppercase tracking-wide mb-6">Reklamácie a vrátenie</h3>
        <div className="bg-gray-50 p-8 text-center border border-gray-100">
            <RotateCcw className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-wider mb-2">Žiadne aktívne prípady</p>
            <p className="text-sm text-gray-400 mb-6">Momentálne neevidujeme žiadne reklamácie ani vrátenia tovaru.</p>
            <Button variant="outline" className="uppercase font-bold text-xs">Nová reklamácia</Button>
        </div>
    </div>
  );
};

export default ReturnsTab;
