
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900">
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Info */}
            <div>
               <a href="#" className="text-3xl font-black text-white tracking-tighter italic block mb-6">
                MT<span className="text-brand">-SPORT</span>
              </a>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Váš partner pre profesionálnu cyklistiku od roku 2010. 
                Špičkové bicykle, komponenty a servis pod jednou strechou.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full hover:bg-brand transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full hover:bg-brand transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-full hover:bg-brand transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links 1 */}
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase">Nakupovanie</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-brand transition-colors">Ako nakupovať</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Doprava a platba</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Reklamácie</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Vernostný program</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Darčekové poukazy</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase">O Nás</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-brand transition-colors">Príbeh MT-SPORT</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Náš tím</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Kariéra</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase">Kontakt</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex flex-col">
                  <span className="text-xs text-gray-600 uppercase font-bold">Infolinka</span>
                  <span className="text-xl text-white font-bold">+421 900 000 000</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-gray-600 uppercase font-bold">Email</span>
                  <span className="text-white hover:text-brand cursor-pointer">info@mt-sport.sk</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-gray-600 uppercase font-bold">Adresa</span>
                  <span className="text-white">Hlavná 123, 010 01 Žilina</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2026 MT-SPORT. Všetky práva vyhradené.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Ochrana súkromia</a>
              <a href="#" className="hover:text-white">Obchodné podmienky</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
