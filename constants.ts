


import { Product, Category, BlogPost, Slide } from './types';

export const NAV_LINKS = [
  { name: 'Bicykle', subcategories: ['Horskí Hardtail', 'Horskí Celoodpružené', 'Gravel & Cyklokros', 'Cestné', 'Detské', 'Krosové'] },
  { name: 'E-Bicykle', subcategories: ['E-Horskí Celoodpružené', 'E-Horskí Hardtail', 'E-Mestské & Tour', 'E-Gravel', 'Príslušenstvo e-bike'] },
  { name: 'Oblečenie', subcategories: ['Dresy', 'Nohavice', 'Bundy & Vesty', 'Tretry', 'Rukavice', 'Prilby', 'Chrániče'] },
  { name: 'Komponenty', subcategories: ['Pohony & Brzdy', 'Kolesá & Plášte', 'Kokpit & Sedlá', 'Vidlice & Tlmiče', 'Pedále'] },
  { name: 'Doplnky', subcategories: ['Svetlá', 'Zámky', 'Tachometre & GPS', 'Batohy & Tašky', 'Fľaše & Košíky', 'Trenažéry'] },
  { name: 'Výpredaj', subcategories: [] },
];

export const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'SCOTT SPARK RC 2026',
    subtitle: 'Rýchlosť svetového pohára. Integrované tlmenie, nízka hmotnosť a geometria, ktorá vyhráva preteky.',
    image: 'https://images.unsplash.com/photo-1576435728678-38d01d52e38b?q=80&w=2500&auto=format&fit=crop',
    cta: 'OBJAVIŤ KOLEKCIU',
    hotspots: [
      { id: 'h1', x: 45, y: 55, label: 'Rám Carbon HMX', description: 'Revolučná integrácia tlmiča do rámu pre nižšie ťažisko a čistý dizajn.', price: '3 499 € (Rám)' },
      { id: 'h2', x: 72, y: 65, label: 'Kolesá Syncros Silverton', description: 'Jednodielna karbónová konštrukcia pre maximálny prenos sily.', price: '1 899 €' },
      { id: 'h3', x: 25, y: 40, label: 'Kokpit Fraser iC SL', description: 'Ultraľahký integrovaný kokpit pre agresívnu jazdnú pozíciu.', price: '499 €' },
    ]
  },
  {
    id: 'slide-2',
    title: 'NOVÁ DEFINÍCIA E-BIKE',
    subtitle: 'KTM Macina Prowler s motorom Bosch Performance CX Race. Výkon bez kompromisov.',
    image: 'https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?q=80&w=2500&auto=format&fit=crop',
    cta: 'PREZRIEŤ E-BIKY',
    hotspots: [
       { id: 'h4', x: 50, y: 50, label: 'Motor Bosch CX Race', description: 'Limitovaná edícia motora s podporou až 400% a režimom Race Mode.', price: 'Súčasť' },
       { id: 'h5', x: 35, y: 70, label: 'Odpruženie FOX Factory', description: 'Povrchová úprava Kashima pre maslovo hladký chod.', price: 'Súčasť' }
    ]
  }
];

export const FEATURES = [
  { title: 'Skladom na predajni', desc: 'Viac ako 1000 bicyklov pripravených ihneď k odberu.', icon: 'Truck' },
  { title: 'Autorizovaný servis', desc: 'Certifikovaný servis pre Bosch, Shimano, Fox a RockShox.', icon: 'Wrench' },
  { title: 'Odborné poradenstvo', desc: 'Jazdíme to, čo predávame. Poradíme vám z vlastnej skúsenosti.', icon: 'MessageCircle' },
  { title: 'Garančná prehliadka', desc: 'K novému bicyklu prvá garančná prehliadka ZADARMO.', icon: 'ShieldCheck' },
];

export const CATEGORIES: Category[] = [
  { id: 'c1', title: 'BICYKLE', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800&auto=format&fit=crop', link: '#' },
  { id: 'c2', title: 'ELEKTROBICYKLE', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=800&auto=format&fit=crop', link: '#' },
  { id: 'c3', title: 'DOPLNKY K BICYKLOM', image: 'https://images.unsplash.com/photo-1559132148-369dd4432172?q=80&w=800&auto=format&fit=crop', link: '#' },
  { id: 'c4', title: 'KOMPONENTY A NÁHRADNÉ DIELY', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop', link: '#' },
  { id: 'c5', title: 'OBLEČENIE', image: 'https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=800&auto=format&fit=crop', link: '#' },
  { id: 'c6', title: 'NÁHRADNÉ DIELY PRE E-BIKY', image: 'https://images.unsplash.com/photo-1623053398290-34a974b26090?q=80&w=800&auto=format&fit=crop', link: '#' },
];

// --- Product Generator Logic ---

const BRANDS = ['Scott', 'KTM', 'Kellys', 'CTM', 'Shimano', 'Fox', 'Oakley', 'Castelli', 'POC', 'Maxxis', 'Garmin', 'Lezyne'];
const COLORS = ['Čierna', 'Biela', 'Červená', 'Modrá', 'Zelená', 'Oranžová', 'Sivá', 'Žltá'];
const GENDERS: Array<'Pánske' | 'Dámske' | 'Detské' | 'Unisex'> = ['Pánske', 'Dámske', 'Unisex', 'Detské'];
const WHEEL_SIZES = ['29"', '27.5"', '28"', '26"', '24"', '20"'];

const IMAGES_BY_CATEGORY: Record<string, string[]> = {
  'Bicykle': [
    'https://images.unsplash.com/photo-1576435728678-38d01d52e38b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616963248328-6b7aec574d66?q=80&w=600&auto=format&fit=crop'
  ],
  'E-Bicykle': [
    'https://images.unsplash.com/photo-1623053398290-34a974b26090?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop'
  ],
  'Oblečenie': [
    'https://images.unsplash.com/photo-1505322101000-19457c43224e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558529324-71b5635075de?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563853610-d8329622d10c?q=80&w=600&auto=format&fit=crop'
  ],
  'Komponenty': [
    'https://images.unsplash.com/photo-1612154696144-88469d45e489?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop'
  ],
  'Doplnky': [
    'https://images.unsplash.com/photo-1551817958-c963c403c53e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop'
  ]
};

const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  
  // Base products from original constants
  const baseProducts: Product[] = [
    { 
      id: 'p1', 
      name: 'Scott Patron eRIDE 900', 
      category: 'E-Bicykle', 
      subcategory: 'E-Horskí Celoodpružené',
      brand: 'Scott',
      price: 7699, 
      image: 'https://images.unsplash.com/photo-1623053398290-34a974b26090?q=80&w=600&auto=format&fit=crop', 
      images: [
        'https://images.unsplash.com/photo-1623053398290-34a974b26090?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596568359553-a56de6970068?q=80&w=600&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=600&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1576435728678-38d01d52e38b?q=80&w=600&auto=format&fit=crop'
      ],
      badge: 'Novinka',
      description: 'Nový Scott Patron eRIDE bol navrhnutý ako systém optimalizovaný pre celodenné jazdenie v teréne. Vnútorná kabeláž, integrovaný tlmič a motor Bosch Smart System.',
      features: ['Rám Carbon/Alloy', 'Vidlica FOX 38 Perf. 160mm', 'Bosch CX 85Nm, 750Wh', 'Shimano XT 12speed'],
      rating: 5,
      reviewsCount: 4,
      hasVariants: true,
      variants: [
        { size: 'S', stockStatus: 'in_stock', stockCount: 2 },
        { size: 'M', stockStatus: 'in_stock', stockCount: 5 },
        { size: 'L', stockStatus: 'on_order' },
        { size: 'XL', stockStatus: 'unavailable' }
      ],
      gender: 'Unisex',
      color: 'Čierna',
      wheelSize: '29"'
    },
    { 
      id: 'p2', 
      name: 'Kellys Swag 50', 
      category: 'Bicykle', 
      subcategory: 'Horskí Celoodpružené',
      brand: 'Kellys',
      price: 2899, 
      oldPrice: 3199, 
      image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=600&auto=format&fit=crop', 
      badge: 'Výpredaj',
      description: 'Kellys Swag 50 je čistokrvné enduro, ktoré sa nezľakne ničoho. Odolný rám, premyslená geometria a komponenty, ktoré vydržia aj tie najdrsnejšie zaobchádzanie.',
      features: ['Rám KELLYS Enduro 29', 'Rock Shox ZEB Select 170mm', 'Shimano XT M8100', 'Brzdy Shimano SLX M7120'],
      rating: 4.8,
      reviewsCount: 23,
      hasVariants: true,
      variants: [
        { size: 'M', stockStatus: 'in_stock', stockCount: 3 },
        { size: 'L', stockStatus: 'in_stock', stockCount: 1 },
        { size: 'XL', stockStatus: 'on_order' }
      ],
      gender: 'Pánske',
      color: 'Oranžová',
      wheelSize: '29"'
    },
    { 
      id: 'p3', 
      name: 'CTM Mons Pro 29', 
      category: 'Bicykle', 
      subcategory: 'Horskí Celoodpružené',
      brand: 'CTM',
      price: 4599, 
      image: 'https://images.unsplash.com/photo-1616963248328-6b7aec574d66?q=80&w=600&auto=format&fit=crop',
      description: 'Zjazdový špeciál testovaný na svetových pohároch. Mons Pro je nekompromisná zbraň proti času s karbónovým rámom a špičkovým odpružením.',
      features: ['Rám Carbon, 210mm travel', 'Rock Shox Boxxer Ultimate', 'SRAM X01 DH 7sp', 'Kolesá Novatec Demon'],
      rating: 5,
      reviewsCount: 8,
      hasVariants: true,
      variants: [
        { size: 'L', stockStatus: 'in_stock', stockCount: 1 },
        { size: 'XL', stockStatus: 'on_order' }
      ],
      gender: 'Unisex',
      color: 'Červená',
      wheelSize: '29"'
    },
    { 
      id: 'p4', 
      name: 'KTM Macina Kapoho 7973', 
      category: 'E-Bicykle', 
      subcategory: 'E-Horskí Celoodpružené',
      brand: 'KTM',
      price: 5299, 
      image: 'https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?q=80&w=600&auto=format&fit=crop', 
      badge: 'Top',
      description: 'KTM Macina Kapoho s konceptom kolies DIMMIX (29" vpredu, 27.5"+ vzadu) pre maximálnu trakciu a priechodnosť terénom.',
      features: ['Motor Bosch Perf. CX Gen.4', 'Batéria Powertube 750Wh', 'Vidlica RockShox 35 Silver', 'Prehadzovačka SRAM SX Eagle'],
      rating: 4.7,
      reviewsCount: 15,
      hasVariants: true,
       variants: [
        { size: 'M', stockStatus: 'on_order' },
        { size: 'L', stockStatus: 'in_stock', stockCount: 4 }
      ],
      gender: 'Pánske',
      color: 'Sivá',
      wheelSize: '29"'
    },
  ];

  // Add base products
  products.push(...baseProducts);

  // Generate remaining products
  for (let i = products.length; i < count; i++) {
    const mainCategory = Object.keys(IMAGES_BY_CATEGORY)[Math.floor(Math.random() * Object.keys(IMAGES_BY_CATEGORY).length)];
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    const price = Math.floor(Math.random() * 5000) + 20;
    const hasDiscount = Math.random() > 0.7;
    const oldPrice = hasDiscount ? Math.floor(price * 1.2) : undefined;
    const categoryImages = IMAGES_BY_CATEGORY[mainCategory];
    const image = categoryImages[Math.floor(Math.random() * categoryImages.length)];
    const subcategory = NAV_LINKS.find(n => n.name === mainCategory)?.subcategories[0] || mainCategory;
    const gender = GENDERS[Math.floor(Math.random() * GENDERS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Assign Wheel Size
    let wheelSize = undefined;
    if (mainCategory === 'Bicykle' || mainCategory === 'E-Bicykle') {
      if (subcategory.includes('Cestné') || subcategory.includes('Gravel') || subcategory.includes('Krosové')) {
        wheelSize = '28"';
      } else if (subcategory.includes('Detské')) {
        wheelSize = ['24"', '20"'][Math.floor(Math.random() * 2)];
      } else {
        // MTB
        wheelSize = ['29"', '27.5"'][Math.floor(Math.random() * 2)];
      }
    }

    products.push({
      id: `gen-${i}`,
      name: `${brand} ${mainCategory} Pro ${2025 + Math.floor(Math.random() * 2)}`,
      category: mainCategory,
      subcategory: subcategory,
      brand: brand,
      price: price,
      oldPrice: oldPrice,
      image: image,
      description: `Profesionálny produkt ${brand} z kategórie ${mainCategory}. Špičková kvalita a moderný dizajn.`,
      features: ['Vysoká odolnosť', 'Moderné technológie', 'Záruka 2 roky'],
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 100),
      hasVariants: mainCategory.includes('Bicykle') || mainCategory.includes('Oblečenie'),
      variants: [
        { size: 'S', stockStatus: 'in_stock', stockCount: Math.floor(Math.random() * 5) },
        { size: 'M', stockStatus: 'in_stock', stockCount: Math.floor(Math.random() * 10) },
        { size: 'L', stockStatus: 'on_order' }
      ],
      gender: gender,
      color: color,
      wheelSize: wheelSize
    });
  }

  return products;
};

// Generate ~60 products
export const ALL_PRODUCTS = generateMockProducts(60);

// Helper to get products for carousel (mix of manual and generated)
export const NEW_PRODUCTS = ALL_PRODUCTS.slice(0, 8);
export const RECOMMENDED_PRODUCTS = ALL_PRODUCTS.slice(8, 16);

export const BLOG_POSTS: BlogPost[] = [
  { id: 'b1', title: 'PREDSTAVUJEME NOVÝ SCOTT SPARK 2026', date: '15. Marec 2026', excerpt: 'Technologický skvost s integrovaným tlmičom opäť posúva hranice možného. Pozreli sme sa mu na zúbok.', image: 'https://images.unsplash.com/photo-1596568359553-a56de6970068?q=80&w=800&auto=format&fit=crop' },
  { id: 'b2', title: 'AKO SA OBLIECŤ DO PRECHODNÉHO OBDOBIA', date: '10. Marec 2026', excerpt: 'Jarné počasie vie byť zradné. Poradíme vám, ako vrstviť oblečenie, aby ste ostali v teple a suchu.', image: 'https://images.unsplash.com/photo-1534066795493-2776c7614f85?q=80&w=800&auto=format&fit=crop' },
  { id: 'b3', title: '5 DÔVODOV PREČO SKÚSIŤ GRAVEL', date: '01. Marec 2026', excerpt: 'Sloboda, žiadne autá a objavovanie nových ciest. Gravel cyklistika zažíva boom a my vieme prečo.', image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=800&auto=format&fit=crop' },
];
