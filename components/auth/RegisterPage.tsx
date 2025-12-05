
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Phone, Loader2, Check } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface RegisterPageProps {
  onLoginClick: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLoginClick, onSuccess, onBack }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return;
    
    setLoading(true);
    await register(`${formData.firstName} ${formData.lastName}`, formData.email);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="pt-32 lg:pt-48 pb-20 min-h-screen bg-white font-sans animate-fade-in">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row shadow-2xl overflow-hidden min-h-[700px] border border-gray-100">
          
          {/* Left Side - Image & Benefits */}
          <div className="hidden lg:block w-1/2 relative bg-black">
            <img 
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop" 
              alt="MT-SPORT Register" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-center text-white">
              <h2 className="text-5xl font-black font-tech uppercase italic mb-8 leading-none">
                Pridaj sa k <br/> <span className="text-brand">profesionálom</span>
              </h2>
              
              <ul className="space-y-6 max-w-md">
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center mr-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">Vernostný program so zľavami až 15%</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-gray-200">Prednostný servis bicyklov</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-gray-200">História objednávok a rýchlejší nákup</span>
                </li>
              </ul>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=1" alt="" />
                      <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=2" alt="" />
                      <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=3" alt="" />
                   </div>
                   <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                     Pridaj sa k viac ako <span className="text-white">15,000</span> spokojným jazdcom
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center relative">
            <button onClick={onBack} className="absolute top-8 left-8 text-gray-400 hover:text-black transition-colors flex items-center text-sm font-bold uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" /> Späť
            </button>

            <div className="max-w-md mx-auto w-full mt-12 lg:mt-0">
              <h1 className="text-4xl font-black font-tech uppercase mb-2">Vytvoriť účet</h1>
              <p className="text-gray-500 mb-8 font-sans">
                Už máte účet? <button onClick={onLoginClick} className="text-brand font-bold hover:underline">Prihlásiť sa</button>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Meno</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                        placeholder="Jozef"
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Priezvisko</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                      placeholder="Mrkvička"
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                      placeholder="jozef@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Telefón</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                      placeholder="+421 900 000 000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Heslo</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        required
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Potvrdiť heslo</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start">
                    <input 
                        id="terms" 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand accent-brand" 
                        checked={formData.agreeTerms}
                        onChange={e => setFormData({...formData, agreeTerms: e.target.checked})}
                        required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      Súhlasím so spracovaním osobných údajov a <a href="#" className="underline hover:text-black">obchodnými podmienkami</a>.
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input 
                        id="news" 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand accent-brand"
                        checked={formData.newsletter}
                        onChange={e => setFormData({...formData, newsletter: e.target.checked})} 
                    />
                    <label htmlFor="news" className="ml-2 block text-sm text-gray-600">
                      Chcem dostávať novinky a exkluzívne zľavy na email.
                    </label>
                  </div>
                </div>

                <Button fullWidth size="lg" className="uppercase font-bold tracking-widest text-sm shadow-xl mt-4" disabled={loading || !formData.agreeTerms}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Vytvoriť účet'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
