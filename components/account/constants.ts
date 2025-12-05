import { Order, Address } from './types';

export const MOCK_ORDERS: Order[] = [
  { 
    id: '#20268892', 
    date: '15.03.2026', 
    total: 2899, 
    status: 'Odoslané', 
    paymentMethod: 'Platobná karta',
    trackingStep: 3,
    items: [
      { name: 'Kellys Swag 50', price: 2899, quantity: 1, image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  { 
    id: '#20268100', 
    date: '01.02.2026', 
    total: 145, 
    status: 'Doručené', 
    paymentMethod: 'Dobierka',
    trackingStep: 4,
    items: [
      { name: 'Prilba Fox Speedframe', price: 120, quantity: 1, image: 'https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=200&auto=format&fit=crop' },
      { name: 'Rukavice 100%', price: 25, quantity: 1, image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  { 
      id: '#20259981', 
      date: '20.12.2025', 
      total: 89, 
      status: 'Doručené', 
      paymentMethod: 'Platobná karta',
      trackingStep: 4,
      items: [
        { name: 'Plášť Maxxis Minion', price: 89, quantity: 1, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200&auto=format&fit=crop' }
      ]
  }
];

export const MOCK_ADDRESSES: Address[] = [
  { id: 'a1', type: 'billing', name: 'Jozef Mrkvička', street: 'Hlavná 123/45', city: 'Lokca', zip: '029 51', isDefault: true },
  { id: 'a2', type: 'delivery', name: 'Práca', street: 'Priemyselná 5', city: 'Námestovo', zip: '029 01', isDefault: false }
];

export const AVATARS = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop'
];