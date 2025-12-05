
export interface Variant {
  size: string;
  stockStatus: 'in_stock' | 'on_order' | 'unavailable';
  stockCount?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string; // Added for specific filtering
  brand?: string;       // Added for brand filtering
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[]; 
  badge?: 'Novinka' | 'Výpredaj' | 'Top';
  description?: string;
  features?: string[];
  specs?: Record<string, string>; // Added for detailed specs
  rating?: number;
  reviewsCount?: number;
  hasVariants?: boolean; 
  variants?: Variant[];
  gender?: 'Pánske' | 'Dámske' | 'Detské' | 'Unisex'; // Added for gender filtering
  color?: string; // Added for color filtering
  wheelSize?: string; // Added for wheel size filtering
}

export interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface Hotspot {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
  description: string;
  price: string;
}

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  hotspots?: Hotspot[];
}
