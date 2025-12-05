
import React from 'react';
import { MapPin, Clock, ArrowRight, Navigation } from 'lucide-react';
import Button from '../ui/Button';

const StoreLocation: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-2 font-tech tracking-wide leading-none">
              Kamenná predajňa
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-8 font-tech tracking-wide leading-none text-gray-400">
              MT-SPORT Lokca
            </h3>

            <div className="inline-block bg-brand px-6 py-3 mb-10 transform -skew-x-12">
              <span className="block transform skew-x-12 font-bold uppercase tracking-widest text-sm text-white font-sans">
                Príďte nás navštíviť, radi vás privítame
              </span>
            </div>

            <div className="space-y-6 mb-12 font-sans text-lg text-gray-300 font-light leading-relaxed">
              <p>
                Sme najväčšia predajňa bicyklov, elektrobicyklov, doplnkov a komponentov na Orave.
                Na výber máme viac ako <strong className="text-white font-bold">1000 kusov</strong> bicyklov a elektrobicyklov.
              </p>
              <p>
                Poskytujeme odborné poradenstvo, profesionálny servis a možnosť vyskúšať si bicykle priamo na mieste.
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-brand font-bold uppercase tracking-widest mb-2 font-tech text-xl flex items-center">
                <Clock className="w-5 h-5 mr-2" /> Otváracie hodiny:
              </h4>
              <p className="text-2xl font-bold text-white font-tech">Pon - So: 7:00 - 16:00</p>
              <p className="text-gray-500 text-sm mt-1">Nedeľa: Zatvorené</p>
            </div>

            <Button 
              className="uppercase font-bold tracking-wider text-sm shadow-lg border-white/20 hover:border-brand" 
              size="lg"
            >
              Kde nás nájdete? <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Images Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid gap-4">
              {/* Main Large Image */}
              <div className="relative h-[300px] md:h-[400px] w-full group overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=1200&auto=format&fit=crop" 
                  alt="Interiér predajne MT-SPORT" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-xs font-bold uppercase tracking-wider font-tech">
                    Showroom
                </div>
              </div>
              
              {/* Bottom Two Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[200px] w-full group overflow-hidden border border-white/10">
                   <img 
                    src="https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=600&auto=format&fit=crop" 
                    alt="Príslušenstvo a prilby" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="relative h-[200px] w-full group overflow-hidden border border-white/10">
                   <img 
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop" 
                    alt="Servis bicyklov" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
