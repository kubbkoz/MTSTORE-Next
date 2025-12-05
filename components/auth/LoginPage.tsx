
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {
  onRegisterClick: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onRegisterClick, onSuccess, onBack }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    await login(email);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="pt-32 lg:pt-48 pb-20 min-h-screen bg-white font-sans animate-fade-in">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row shadow-2xl overflow-hidden min-h-[600px] border border-gray-100">
          
          {/* Left Side - Image */}
          <div className="hidden lg:block w-1/2 relative bg-black">
            <img 
              src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=1200&auto=format&fit=crop" 
              alt="MT-SPORT Login" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-12 text-white">
              <h2 className="text-5xl font-black font-tech uppercase italic mb-4 leading-none">
                Vitajte späť <br/> v tíme
              </h2>
              <p className="text-gray-300 max-w-md text-lg leading-relaxed font-light">
                Prihláste sa a spravujte svoje objednávky, sledujte stav servisu a získajte prístup k exkluzívnym zľavám.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center relative">
            <button onClick={onBack} className="absolute top-8 left-8 text-gray-400 hover:text-black transition-colors flex items-center text-sm font-bold uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" /> Späť
            </button>

            <div className="max-w-md mx-auto w-full mt-12 lg:mt-0">
              <h1 className="text-4xl font-black font-tech uppercase mb-2">Prihlásenie</h1>
              <p className="text-gray-500 mb-10 font-sans">
                Ešte nemáte účet? <button onClick={onRegisterClick} className="text-brand font-bold hover:underline">Registrovať sa</button>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Emailová adresa</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none transition-colors font-medium rounded-none"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Heslo</label>
                    <a href="#" className="text-xs text-brand font-bold hover:underline">Zabudli ste heslo?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none transition-colors font-medium rounded-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand accent-brand" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 font-medium">Zapamätať prihlásenie</label>
                </div>

                <Button fullWidth size="lg" className="uppercase font-bold tracking-widest text-sm shadow-xl" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Prihlásiť sa'}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Alebo pokračujte cez</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center py-3 border border-gray-200 hover:bg-gray-50 transition-colors font-bold text-sm">
                    Google
                  </button>
                  <button className="flex items-center justify-center py-3 border border-gray-200 hover:bg-gray-50 transition-colors font-bold text-sm">
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
