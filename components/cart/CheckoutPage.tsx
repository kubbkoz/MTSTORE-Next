
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowRight, Tag, Truck, CreditCard, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

interface CheckoutPageProps {
  onBackToShop: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToShop }) => {
  const { items, cartTotal, updateQuantity, removeFromCart, discountCode, discountAmount, applyCoupon, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [couponInput, setCouponInput] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [couponError, setCouponError] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', zip: '', country: 'Slovensko',
    note: ''
  });

  const finalTotal = cartTotal - discountAmount + (shippingMethod === 'courier' ? 3.90 : shippingMethod === 'packeta' ? 2.50 : 0) + (paymentMethod === 'cod' ? 1.00 : 0);

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponInput);
    if (!success) setCouponError(true);
    else setCouponError(false);
  };

  const handleNext = () => {
    window.scrollTo(0,0);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
     window.scrollTo(0,0);
     setStep(prev => prev - 1);
  };

  const handleSubmitOrder = () => {
    window.scrollTo(0,0);
    setStep(4); // Success
    clearCart();
  };

  // Step Indicators
  const steps = [
    { id: 1, label: 'Košík' },
    { id: 2, label: 'Doprava & Platba' },
    { id: 3, label: 'Osobné údaje' },
    { id: 4, label: 'Odoslané' }
  ];

  if (items.length === 0 && step !== 4) {
      return (
          <div className="container mx-auto px-4 py-24 text-center">
             <h2 className="text-4xl font-black font-tech uppercase mb-4">Váš košík je prázdny</h2>
             <Button onClick={onBackToShop}>Späť do obchodu</Button>
          </div>
      )
  }

  return (
    <div className="pt-24 lg:pt-48 pb-20 bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4">
        
        {/* Stepper */}
        <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                {steps.map((s) => (
                    <div key={s.id} className={`flex flex-col items-center bg-gray-50 px-2 ${step >= s.id ? 'text-brand' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-tech text-lg border-2 mb-2 transition-all duration-500 ${step >= s.id ? 'border-brand bg-brand text-white shadow-lg shadow-brand/20' : 'border-gray-200 bg-white'}`}>
                            {s.id < step ? <CheckCircle className="w-5 h-5" /> : s.id}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* STEP 1: CART REVIEW */}
                {step === 1 && (
                    <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-black font-tech uppercase mb-6 flex items-center">
                           <span className="w-1.5 h-6 bg-brand mr-3"></span> Obsah košíka
                        </h2>
                        
                        <div className="space-y-6">
                            {items.map(item => (
                                <div key={item.cartId} className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div className="w-24 h-24 bg-gray-50 flex-shrink-0 border border-gray-100 p-2">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg font-tech uppercase">{item.name}</h4>
                                                <p className="text-sm text-gray-500 font-bold">Veľkosť: {item.selectedSize || 'Uni'}</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 p-1">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center border border-gray-200">
                                                <button onClick={() => updateQuantity(item.cartId, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.cartId, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <div className="text-xl font-black font-tech">{item.price * item.quantity} €</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 2: SHIPPING & PAYMENT */}
                {step === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                             <h2 className="text-2xl font-black font-tech uppercase mb-6 flex items-center">
                               <span className="w-1.5 h-6 bg-brand mr-3"></span> Spôsob dopravy
                            </h2>
                            <div className="grid gap-4">
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${shippingMethod === 'courier' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="shipping" value="courier" className="sr-only" onChange={(e) => setShippingMethod(e.target.value)} checked={shippingMethod === 'courier'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-gray-600">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Kuriér (DPD/GLS)</span>
                                        <span className="text-xs text-gray-500">Doručenie do 24 hodín</span>
                                    </div>
                                    <span className="font-black font-tech">3.90 €</span>
                                </label>
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${shippingMethod === 'packeta' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="shipping" value="packeta" className="sr-only" onChange={(e) => setShippingMethod(e.target.value)} checked={shippingMethod === 'packeta'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-red-600 font-bold">Z</div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Packeta (Zásielkovňa)</span>
                                        <span className="text-xs text-gray-500">Vyzdvihnutie na výdajnom mieste</span>
                                    </div>
                                    <span className="font-black font-tech">2.50 €</span>
                                </label>
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${shippingMethod === 'store' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="shipping" value="store" className="sr-only" onChange={(e) => setShippingMethod(e.target.value)} checked={shippingMethod === 'store'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-gray-600">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Osobný odber (MT-SPORT Lokca)</span>
                                        <span className="text-xs text-gray-500">Pripravíme do 2 hodín</span>
                                    </div>
                                    <span className="font-black font-tech text-green-600">ZDARMA</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                             <h2 className="text-2xl font-black font-tech uppercase mb-6 flex items-center">
                               <span className="w-1.5 h-6 bg-brand mr-3"></span> Spôsob platby
                            </h2>
                            <div className="grid gap-4">
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="payment" value="card" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'card'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-gray-600">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Platobná karta online</span>
                                        <span className="text-xs text-gray-500">Apple Pay, Google Pay, Visa, MC</span>
                                    </div>
                                    <span className="font-black font-tech text-green-600">ZDARMA</span>
                                </label>
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="payment" value="transfer" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'transfer'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-gray-600 font-bold">IBAN</div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Bankový prevod</span>
                                        <span className="text-xs text-gray-500">Tovar odošleme po pripísaní platby</span>
                                    </div>
                                    <span className="font-black font-tech text-green-600">ZDARMA</span>
                                </label>
                                <label className={`flex items-center p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-brand bg-red-50/10' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <input type="radio" name="payment" value="cod" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'cod'} />
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4 text-gray-600 font-bold">€</div>
                                    <div className="flex-1">
                                        <span className="block font-bold uppercase text-sm">Dobierka</span>
                                        <span className="text-xs text-gray-500">Platba pri prevzatí (Karta/Hotovosť)</span>
                                    </div>
                                    <span className="font-black font-tech">1.00 €</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: CONTACT INFO */}
                {step === 3 && (
                    <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-black font-tech uppercase mb-6 flex items-center">
                           <span className="w-1.5 h-6 bg-brand mr-3"></span> Osobné údaje
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Meno *</label>
                                <input type="text" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none" 
                                    value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Priezvisko *</label>
                                <input type="text" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email *</label>
                                <input type="email" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Telefón *</label>
                                <input type="tel" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ulica a číslo *</label>
                                <input type="text" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Mesto *</label>
                                <input type="text" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">PSČ *</label>
                                <input type="text" className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Poznámka k objednávke</label>
                                <textarea rows={3} className="w-full p-3 border border-gray-200 focus:border-brand focus:outline-none bg-gray-50 font-medium rounded-none"
                                value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} ></textarea>
                            </div>
                        </div>

                         <div className="mt-8 flex items-center p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
                            <ShieldCheck className="w-5 h-5 mr-3 flex-shrink-0" />
                            Vaše údaje sú u nás v bezpečí a spracované podľa GDPR.
                        </div>
                    </div>
                )}
                
                {/* SUCCESS STEP */}
                {step === 4 && (
                    <div className="bg-white p-12 text-center shadow-lg border-t-4 border-brand animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-4xl font-black font-tech uppercase mb-4">Ďakujeme za objednávku!</h2>
                        <p className="text-xl text-gray-600 mb-2 font-medium">Číslo objednávky: <span className="text-black font-bold">#20268892</span></p>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Potvrdenie objednávky sme vám poslali na email. Hneď ako tovar vyexpedujeme, budeme vás informovať SMS správou.
                        </p>
                        <Button onClick={onBackToShop} size="lg" className="uppercase font-bold tracking-wider">Späť na úvod</Button>
                    </div>
                )}

                {/* Navigation Buttons for Steps 1-3 */}
                {step < 4 && (
                    <div className="flex justify-between pt-6">
                        {step > 1 ? (
                            <Button variant="outline" onClick={handleBack} className="uppercase font-bold tracking-wider">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Späť
                            </Button>
                        ) : (
                            <Button variant="ghost" onClick={onBackToShop} className="uppercase font-bold tracking-wider">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Pokračovať v nákupe
                            </Button>
                        )}
                        
                        <Button 
                            onClick={step === 3 ? handleSubmitOrder : handleNext} 
                            size="lg" 
                            className="uppercase font-bold tracking-wider shadow-xl"
                            disabled={
                                (step === 2 && (!shippingMethod || !paymentMethod)) ||
                                (step === 3 && (!formData.firstName || !formData.lastName || !formData.email || !formData.street))
                            }
                        >
                            {step === 3 ? 'Záväzne objednať' : 'Pokračovať'} <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            {step < 4 && (
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 shadow-xl border-t-4 border-brand sticky top-24 lg:top-48">
                        <h3 className="text-xl font-black font-tech uppercase mb-6 tracking-wide">Súhrn objednávky</h3>
                        
                        {/* Coupon */}
                        {step === 1 && (
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Máte zľavový kód?</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Zadajte kód (napr. MT2026)" 
                                        className="flex-1 p-2 border border-gray-200 focus:border-brand focus:outline-none uppercase font-bold text-sm rounded-none"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                    />
                                    <Button size="sm" onClick={handleApplyCoupon} disabled={!couponInput}>Použiť</Button>
                                </div>
                                {couponError && <p className="text-red-500 text-xs mt-2 font-bold">Neplatný kód kupónu.</p>}
                                {discountCode && <p className="text-green-600 text-xs mt-2 font-bold flex items-center"><Tag className="w-3 h-3 mr-1"/> Kupón {discountCode} aplikovaný!</p>}
                            </div>
                        )}

                        <div className="space-y-3 text-sm font-sans mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Hodnota tovaru</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-brand font-bold">
                                    <span>Zľava ({discountCode})</span>
                                    <span>-{discountAmount.toFixed(2)} €</span>
                                </div>
                            )}
                            {step > 1 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Doprava</span>
                                    <span>{shippingMethod === 'courier' ? '3.90 €' : shippingMethod === 'packeta' ? '2.50 €' : shippingMethod === 'store' ? '0.00 €' : '-'}</span>
                                </div>
                            )}
                             {step > 1 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Platba</span>
                                    <span>{paymentMethod === 'cod' ? '1.00 €' : paymentMethod ? '0.00 €' : '-'}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t-2 border-black pt-4 flex justify-between items-center mb-6">
                            <span className="font-bold uppercase tracking-wider">Spolu na úhradu</span>
                            <span className="text-3xl font-black font-tech">{finalTotal.toFixed(2)} €</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 text-gray-400 opacity-50 mb-2">
                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                        </div>
                        <p className="text-center text-xs text-gray-400">Bezpečné SSL šifrovanie</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
