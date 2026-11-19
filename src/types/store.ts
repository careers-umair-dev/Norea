export type CategoryId = 'Women' | 'Men' | 'Accessories' | 'Footwear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  collection: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'New' | 'Sale' | 'Bestseller';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  description: string;
  fabricAndCare: string[];
  sizes: string[];
  colors: ProductColor[];
}

export interface CategoryItem {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  cartKey: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    notes?: string;
  };
  paymentMethod: 'Cash on Delivery';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Confirmed — Preparing Shipment';
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  productPurchased: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CollectionCapsule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  filterCategory?: CategoryId;
  accentTone: string;
}
