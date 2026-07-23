export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  categories: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  expirationDate: string; // YYYY-MM-DD
  usageType: 'single' | 'multiple';
  minPurchase: number;
  active: boolean;
  usedCount: number;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  cpf?: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    reference?: string;
  };
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled';

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  shippingMethod: string;
  total: number;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  status: OrderStatus;
  couponCode?: string;
  notes?: string;
  createdAt: number;
}

export interface StoreSettings {
  storeName: string;
  slogan: string;
  phone: string;
  whatsappNumber: string; // 5511956366343
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  floatingWhatsappMsg: string;
  freeShippingThreshold: number;
  announcementBarText: string;
  returnPolicy: string;
}

export interface FilterState {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  color: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
