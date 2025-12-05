
import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, Settings, ChevronRight, Camera, RotateCcw, Gift, Search, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { MOCK_ORDERS, MOCK_ADDRESSES, AVATARS } from './constants';
import { Order } from './types';

// Tabs
import DashboardTab from './tabs/DashboardTab';
import OrdersTab from './tabs/OrdersTab';
import TrackingTab from './tabs/TrackingTab';
import AddressesTab from './tabs/AddressesTab';
import ProfileTab from './tabs/ProfileTab';
import LoyaltyTab from './tabs/LoyaltyTab';
import ReturnsTab from './tabs/ReturnsTab';

// Modals
import AddressModal from './modals/AddressModal';
import OrderDetailModal from './modals/OrderDetailModal';
import LoyaltyRedeemModal from './modals/LoyaltyRedeemModal';

interface AccountPageProps {
  onBack: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'tracking' | 'returns' | 'loyalty' | 'profile'>('dashboard');
  
  // Modals State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressModalType, setAddressModalType] = useState<'billing' | 'delivery'>('delivery');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handleLogout = () => {
    logout();
    onBack();
  };

  const navItems = [
    { id: 'dashboard', label: 'Prehľad', icon: User },
    { id: 'orders', label: 'Moje objednávky', icon: Package },
    { id: 'tracking', label: 'Sledovanie objednávky', icon: Search },
    { id: 'addresses', label: 'Adresy', icon: MapPin },
    { id: 'returns', label: 'Reklamácie a vrátenie', icon: RotateCcw },
    { id: 'loyalty', label: 'Vernostné body', icon: Gift },
    { id: 'profile', label: 'Nastavenia profilu', icon: Settings },
  ];

  const handleOrderAction = (order: Order) => {
      alert("Produkty boli pridané do košíka (Simulácia)");
  };

  return (
    <div className="pt-24 lg:pt-48 pb-20 min-h-screen bg-gray-50 font-sans animate-fade-in relative">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-2 font-tech tracking-wide">
              Môj <span className="text-brand">účet</span>
            </h1>
            <p className="text-gray-500 font-medium font-sans">
              Vitajte späť, <span className="text-black font-bold">{user?.name}</span>
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="mt-4 md:mt-0 uppercase font-bold text-xs tracking-wider">
            <LogOut className="w-4 h-4 mr-2" /> Odhlásiť sa
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white shadow-sm border border-gray-100 sticky top-48">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div 
                    className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden relative group cursor-pointer"
                    onClick={() => setIsAvatarModalOpen(true)}
                >
                   {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-brand flex items-center justify-center text-white font-bold text-lg">{user?.name.charAt(0)}</div>}
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                   </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Účet</p>
                  <p className="font-bold text-sm truncate max-w-[140px]">{user?.email}</p>
                </div>
              </div>
              <nav className="p-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 mb-1 transition-all rounded-none text-sm font-bold uppercase tracking-wide ${
                      activeTab === item.id 
                        ? 'bg-black text-white' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-4 h-4 mr-3 flex-shrink-0 ${activeTab === item.id ? 'text-brand' : ''}`} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            
            {activeTab === 'dashboard' && (
              <DashboardTab recentOrders={MOCK_ORDERS} onViewAllOrders={() => setActiveTab('orders')} />
            )}

            {activeTab === 'orders' && (
              <OrdersTab orders={MOCK_ORDERS} onViewDetail={setSelectedOrder} onReorder={handleOrderAction} />
            )}

            {activeTab === 'tracking' && (
                <TrackingTab orders={MOCK_ORDERS} />
            )}

            {activeTab === 'returns' && (
               <ReturnsTab />
            )}

            {activeTab === 'loyalty' && (
                <LoyaltyTab onRedeemClick={() => setIsLoyaltyModalOpen(true)} />
            )}

            {activeTab === 'addresses' && (
               <AddressesTab addresses={MOCK_ADDRESSES} onAddClick={(type) => { setAddressModalType(type); setIsAddressModalOpen(true); }} />
            )}

            {activeTab === 'profile' && (
                <ProfileTab user={user} onDeleteClick={() => setIsDeleteModalOpen(true)} />
            )}

          </main>
        </div>
      </div>

      {/* --- MODALS --- */}

      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAvatarModalOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white p-8 shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold font-tech uppercase">Zmeniť profilovú fotku</h3>
                    <button onClick={() => setIsAvatarModalOpen(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {AVATARS.map((av, idx) => (
                        <button key={idx} className="w-full aspect-square rounded-full overflow-hidden border-2 border-transparent hover:border-brand transition-all">
                            <img src={av} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
                <div className="border-t border-gray-100 pt-6 text-center">
                    <button className="text-brand font-bold uppercase text-sm hover:underline">Nahrať vlastnú fotografiu</button>
                </div>
            </div>
        </div>
      )}

      <AddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        type={addressModalType} 
        setType={setAddressModalType} 
      />

      <OrderDetailModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />

      <LoyaltyRedeemModal 
        isOpen={isLoyaltyModalOpen}
        onClose={() => setIsLoyaltyModalOpen(false)}
        points={450} 
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white p-8 shadow-2xl animate-fade-in border-t-4 border-red-600">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black font-tech uppercase text-red-600">Naozaj zmazať účet?</h3>
                    <p className="text-sm text-gray-600 mt-2">Táto akcia je nevratná. Stratíte prístup k histórii objednávok a vernostným bodom.</p>
                </div>
                
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Potvrďte heslom</label>
                    <input 
                        type="password" 
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-full p-3 border border-gray-200 focus:border-red-500 focus:outline-none rounded-none" 
                        placeholder="Vaše heslo"
                    />
                </div>

                <div className="flex gap-4">
                    <Button variant="white" fullWidth onClick={() => setIsDeleteModalOpen(false)}>Zrušiť</Button>
                    <button 
                        className="w-full bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-700 transition-colors py-3"
                        onClick={() => { alert('Účet zmazaný'); handleLogout(); }}
                        disabled={!deletePassword}
                    >
                        Zmazať navždy
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AccountPage;
