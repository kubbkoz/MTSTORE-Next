
import React from 'react';
import { Star, User, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Jozef Novák",
    date: "pred 2 dňami",
    rating: 5,
    text: "Absolútna spokojnosť. Bicykel prišiel perfektne nastavený, stačilo nasadnúť a jazdiť. Doručenie bolo bleskové, do 24 hodín som ho mal doma.",
    initials: "JN",
    color: "bg-blue-600"
  },
  {
    id: 2,
    name: "Michal Kováč",
    date: "pred týždňom",
    rating: 5,
    text: "Profesionálny prístup pri výbere e-biku. Personál mi všetko vysvetlil a pomohol vybrať tú správnu veľkosť rámu. Odporúčam každému.",
    initials: "MK",
    color: "bg-green-600"
  },
  {
    id: 3,
    name: "Katarína Veselá",
    date: "pred 3 týždňami",
    rating: 4,
    text: "Veľký výber cyklo oblečenia. Objednávala som dresy pre celú rodinu, veľkosti sedeli podľa tabuľky. Jedna hviezda dole len kvôli kuriérovi, ktorý meškal.",
    initials: "KV",
    color: "bg-purple-600"
  },
  {
    id: 4,
    name: "Peter Svoboda",
    date: "pred mesiacom",
    rating: 5,
    text: "Špičkový servis! Môj tlmič potreboval generálku a chalani to zvládli na jednotku. Bicykel teraz jazdí ako nový.",
    initials: "PS",
    color: "bg-orange-500"
  }
];

const GoogleReviews: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Header Section with Summary Badge */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 font-tech tracking-wide leading-none">
              Hodnotenia na <span className="text-brand">Google</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand skew-x-[-20deg] mb-6"></div>
            <p className="text-gray-500 font-medium font-sans text-lg">
              Vaša spokojnosť je našou prioritou. Pridajte sa k tisíckam spokojných cyklistov.
            </p>
          </div>

          {/* Google Rating Badge */}
          <div className="bg-gray-50 border border-gray-200 p-6 flex items-center gap-6 shadow-sm min-w-[280px]">
             <div className="flex flex-col items-center justify-center border-r border-gray-200 pr-6">
                <span className="text-5xl font-black font-tech text-black leading-none">4.9</span>
                <div className="flex text-yellow-400 mt-1">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
             </div>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   {/* Google G Logo SVG */}
                   <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                   </svg>
                   <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Google</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest block">
                   Na základe 450+ recenzií
                </span>
             </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              className="bg-gray-50 p-8 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group flex flex-col h-full relative"
            >
              {/* Google Icon Watermark */}
              <div className="absolute top-4 right-4 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                   </svg>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold font-tech text-lg shadow-md ${review.color}`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase text-sm tracking-wide font-tech">{review.name}</h4>
                  <span className="text-xs text-gray-400 font-medium flex items-center">
                     {review.date}
                     <CheckCircle className="w-3 h-3 text-blue-500 ml-1" />
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex text-yellow-400 mb-4 scale-90 origin-left">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed italic flex-1 font-sans">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand transition-colors border-b-2 border-transparent hover:border-brand pb-1">
                Zobraziť všetkých 450+ recenzií na Google Maps
            </a>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;
