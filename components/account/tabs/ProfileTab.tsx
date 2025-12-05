import React from 'react';
import Button from '../../ui/Button';

interface ProfileTabProps {
  user: any;
  onDeleteClick: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, onDeleteClick }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 animate-fade-in">
        <h3 className="text-2xl font-bold font-tech uppercase tracking-wide mb-8">Osobné údaje</h3>
        <form className="max-w-xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Meno</label>
                    <input type="text" defaultValue={user?.name.split(' ')[0]} className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Priezvisko</label>
                    <input type="text" defaultValue={user?.name.split(' ')[1]} className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                <input type="email" defaultValue={user?.email} className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" disabled />
                <span className="text-xs text-gray-400 mt-1 block">Email nie je možné zmeniť.</span>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Telefón</label>
                <input type="tel" defaultValue={user?.phone || ''} placeholder="+421..." className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" />
            </div>
            
            <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-bold font-tech uppercase mb-4">Zmena hesla</h4>
                <div className="space-y-4">
                    <input type="password" placeholder="Aktuálne heslo" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" />
                    <input type="password" placeholder="Nové heslo" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-brand focus:outline-none font-medium rounded-none" />
                </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
                <Button className="uppercase font-bold tracking-wider">Uložiť zmeny</Button>
                
                <button 
                    type="button"
                    onClick={onDeleteClick}
                    className="text-xs text-red-500 hover:text-red-700 font-bold uppercase tracking-wider underline"
                >
                    Zmazať účet
                </button>
            </div>
        </form>
    </div>
  );
};

export default ProfileTab;