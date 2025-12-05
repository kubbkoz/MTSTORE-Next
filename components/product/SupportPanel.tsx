
import React from 'react';
import { Phone, Mail, Headset } from 'lucide-react';

const SupportPanel: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          
          {/* Left Content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic font-tech tracking-wide mb-6 leading-none">
              Potrebujete pomôcť <br /> s výberom?
            </h2>
            
            <div className="inline-block bg-brand px-6 py-3 mb-6 transform -skew-x-12">
              <span className="block transform skew-x-12 font-bold uppercase text-white tracking-widest text-sm font-sans">
                Neváhajte a napíšte, alebo zavolajte nám
              </span>
            </div>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl font-sans font-light">
              V prípade akýchkoľvek otázok ohľadom výberu bicykla, jeho špecifikácie, 
              alebo ak chcete iba doladiť správne doplnky k bicyklu, neváhajte nás kontaktovať.
            </p>

            <div className="mb-8">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2 font-sans">Sme tu pre vás k dispozícii</span>
               <span className="text-xl font-bold font-tech text-white">Pon – So: 8:00 – 16:00</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0948993236" className="flex items-center justify-center px-8 py-4 bg-brand hover:bg-red-700 transition-colors text-white font-bold uppercase tracking-wider text-sm shadow-lg shadow-brand/20">
                <Phone className="w-5 h-5 mr-3" />
                0948 993 236
              </a>
              <a href="mailto:info@mt-sport.sk" className="flex items-center justify-center px-8 py-4 bg-zinc-900 hover:bg-zinc-800 transition-colors text-white font-bold uppercase tracking-wider text-sm border border-zinc-800">
                <Mail className="w-5 h-5 mr-3" />
                info@mt-sport.sk
              </a>
            </div>
          </div>

          {/* Right Content - Agent Visual */}
          <div className="relative">
            {/* Circle Bg */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-800 relative overflow-hidden">
                <img 
                    src="https://img.freepik.com/free-vector/customer-support-illustration_23-2148889374.jpg?w=740&t=st=1709900000~exp=1709900600~hmac=fakehash" // Placeholder vector style
                    alt="Support Agent" 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Headset className="w-32 h-32 text-gray-700 opacity-20" />
                </div>
            </div>
            
            {/* Online Indicator */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black px-4 py-2 border border-zinc-800 rounded-full flex items-center shadow-xl">
               <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
               <span className="text-sm font-bold uppercase tracking-wider text-white font-sans whitespace-nowrap">Sme práve online</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportPanel;
