
import React from 'react';
import { FileText, Download } from 'lucide-react';

const DownloadsTab: React.FC = () => {
  return (
    <div className="animate-fade-in font-sans">
        {/* Header */}
        <h3 className="text-3xl font-black mb-12 font-tech uppercase flex items-center tracking-wide">
          <span className="w-12 h-1.5 bg-brand mr-4" aria-hidden="true"></span>
          Dokumenty a manuály na stiahnutie
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-brand hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-brand/10 rounded-full flex items-center justify-center mr-4 text-gray-500 group-hover:text-brand">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 uppercase text-sm">Užívateľský manuál</h5>
                  <p className="text-xs text-gray-500">PDF, 2.4 MB</p>
                </div>
            </div>
            <Download className="w-5 h-5 text-gray-400 group-hover:text-brand" />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-brand hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-brand/10 rounded-full flex items-center justify-center mr-4 text-gray-500 group-hover:text-brand">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 uppercase text-sm">Servisná knižka</h5>
                  <p className="text-xs text-gray-500">PDF, 1.1 MB</p>
                </div>
            </div>
            <Download className="w-5 h-5 text-gray-400 group-hover:text-brand" />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-brand hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-brand/10 rounded-full flex items-center justify-center mr-4 text-gray-500 group-hover:text-brand">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 uppercase text-sm">Záručný list</h5>
                  <p className="text-xs text-gray-500">PDF, 0.5 MB</p>
                </div>
            </div>
            <Download className="w-5 h-5 text-gray-400 group-hover:text-brand" />
          </div>
      </div>
    </div>
  );
};

export default DownloadsTab;
