
import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

interface StorePageProps {
  onBack: () => void;
}

const StorePage: React.FC<StorePageProps> = ({ onBack }) => {
  return (
    <div className="pt-24 lg:pt-48 pb-20 bg-white min-h-screen animate-fade-in font-sans">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-brand transition-colors mb-6 text-sm font-bold uppercase tracking-wider font-sans"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Späť na úvod
          </button>
          
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-4 font-tech tracking-wide">
              Kamenná <span className="text-brand">predajňa</span>
            </h1>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg] mb-6"></div>
            <p className="text-gray-500 font-medium font-sans text-lg max-w-2xl">
              Navštívte najväčšie cyklistické centrum na Orave. 
              Viac ako 1000m² predajnej plochy, profesionálny servis a odborné poradenstvo.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Gallery */}
            <div className="grid gap-4">
              <div className="relative h-[400px] w-full group overflow-hidden border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=1200&auto=format&fit=crop" 
                  alt="Interiér predajne MT-SPORT" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-xs font-bold uppercase tracking-wider font-tech">
                    Showroom
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[200px] w-full group overflow-hidden border border-gray-200">
                   <img 
                    src="https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=600&auto=format&fit=crop" 
                    alt="Príslušenstvo a prilby" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative h-[200px] w-full group overflow-hidden border border-gray-200">
                   <img 
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop" 
                    alt="Servis bicyklov" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 h-full">
                <h3 className="text-3xl font-black font-tech uppercase mb-8">MT-SPORT LOKCA</h3>
                
                <div className="space-y-8 font-sans">
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-200 mr-4 flex-shrink-0">
                            <MapPin className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Adresa</span>
                            <p className="font-bold text-lg">Hlavná 123/45</p>
                            <p className="text-gray-600">029 51 Lokca, Slovensko</p>
                            <Button variant="outline" size="sm" className="mt-3 uppercase text-xs">
                                <Navigation className="w-3 h-3 mr-2" /> Navigovať
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-200 mr-4 flex-shrink-0">
                            <Clock className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Otváracie hodiny</span>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                                <span className="font-bold">Pondelok - Piatok</span>
                                <span>8:00 - 17:00</span>
                                <span className="font-bold">Sobota</span>
                                <span>9:00 - 12:00</span>
                                <span className="font-bold text-gray-400">Nedeľa</span>
                                <span className="text-gray-400">Zatvorené</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-200 mr-4 flex-shrink-0">
                            <Phone className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Kontakt</span>
                            <p className="font-bold text-lg hover:text-brand cursor-pointer">+421 948 993 236</p>
                            <p className="text-gray-600 hover:text-brand cursor-pointer">info@mt-sport.sk</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-96 bg-gray-200 relative group overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                 <p className="text-gray-500 font-bold uppercase tracking-widest flex items-center">
                    <MapPin className="w-6 h-6 mr-2" /> Google Maps Embed Placeholder
                 </p>
             </div>
             {/* In production, replace with iframe: 
             <iframe 
                src="https://www.google.com/maps/embed?..." 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
             /> 
             */}
        </div>

      </div>
    </div>
  );
};

export default StorePage;
