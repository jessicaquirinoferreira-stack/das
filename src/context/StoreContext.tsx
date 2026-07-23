import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category, Coupon, Order, CartItem, StoreSettings, FilterState } from '../types';
import { 
  seedInitialFirestoreData,
  subscribeProducts, 
  subscribeCategories, 
  subscribeCoupons, 
  subscribeOrders, 
  subscribeSettings,
  createOrder as firebaseCreateOrder
} from '../lib/firebase';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS, INITIAL_SETTINGS } from '../data/initialData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Realtime Data
  products: Product[];
  categories: Category[];
  coupons: Coupon[];
  orders: Order[];
  settings: StoreSettings;

  // Cart & Wishlist State
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, selectedSize: string, selectedColor: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon & Shipping
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingFee: number;
  setShippingFee: (fee: number) => void;
  shippingMethodName: string;
  setShippingMethodName: (name: string) => void;

  // Navigation & View
  currentView: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin';
  setCurrentView: (view: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin') => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  selectedCategorySlug: string | null;
  selectCategory: (slug: string | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Search & Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Checkout
  submitOrder: (customerData: Order['customer'], paymentMethod: Order['paymentMethod'], notes?: string) => Promise<Order>;

  // Admin & UI
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  showLuxuryIntro: boolean;
  triggerLuxuryIntro: () => void;
  closeLuxuryIntro: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  search: '',
  minPrice: 0,
  maxPrice: 1000,
  size: 'all',
  color: 'all',
  sortBy: 'featured'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Realtime state with fallback defaults
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  // Cart & Wishlist persistent state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dua_modas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dua_modas_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [shippingMethodName, setShippingMethodName] = useState<string>('PAC - Entrega Padrão');
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('dua_modas_admin') === 'true';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('dua_modas_dark') === 'true';
  });
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showLuxuryIntro, setShowLuxuryIntro] = useState<boolean>(true);

  const triggerLuxuryIntro = useCallback(() => {
    setShowLuxuryIntro(true);
  }, []);

  const closeLuxuryIntro = useCallback(() => {
    setShowLuxuryIntro(false);
  }, []);

  // Save cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('dua_modas_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dua_modas_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dua_modas_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('dua_modas_dark', darkMode ? 'true' : 'false');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Seed & Subscribe Realtime Firestore
  useEffect(() => {
    seedInitialFirestoreData();

    const unsubProd = subscribeProducts((prods) => {
      if (prods.length > 0) setProducts(prods);
    });

    const unsubCat = subscribeCategories((cats) => {
      if (cats.length > 0) setCategories(cats);
    });

    const unsubCoup = subscribeCoupons((coups) => {
      if (coups.length > 0) setCoupons(coups);
    });

    const unsubOrders = subscribeOrders((ordList) => {
      setOrders(ordList);
    });

    const unsubSet = subscribeSettings((setObj) => {
      if (setObj) setSettings(setObj);
    });

    return () => {
      unsubProd();
      unsubCat();
      unsubCoup();
      unsubOrders();
      unsubSet();
    };
  }, []);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart Operations
  const addToCart = (
    product: Product, 
    selectedSize: string, 
    selectedColor: { name: string; hex: string }, 
    quantity = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize, selectedColor, quantity }];
      }
    });

    showToast(`"${product.name}" adicionado à sacola!`);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removido da sacola', 'info');
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removido dos favoritos', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Adicionado aos favoritos!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.promotionalPrice && item.product.promotionalPrice < item.product.price
      ? item.product.promotionalPrice
      : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Coupon Calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      couponDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      couponDiscount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }

    if (found.minPurchase && cartSubtotal < found.minPurchase) {
      return { 
        success: false, 
        message: `Este cupom exige compra mínima de R$ ${found.minPurchase.toFixed(2)}` 
      };
    }

    setAppliedCoupon(found);
    showToast(`Cupom "${found.code}" aplicado com sucesso!`);
    return { success: true, message: 'Cupom aplicado com sucesso!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupom removido', 'info');
  };

  // Navigation Helpers
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectCategory = (slug: string | null) => {
    setSelectedCategorySlug(slug);
    setFilters((prev) => ({ ...prev, category: slug || 'all' }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Order Submission
  const submitOrder = async (
    customerData: Order['customer'], 
    paymentMethod: Order['paymentMethod'], 
    notes?: string
  ): Promise<Order> => {
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.promotionalPrice || item.product.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor.name,
      image: item.product.images[0] || ''
    }));

    const newOrder = await firebaseCreateOrder({
      customer: customerData,
      items: orderItems,
      subtotal: cartSubtotal,
      discountAmount: couponDiscount,
      shippingFee,
      shippingMethod: shippingMethodName,
      total: cartTotal,
      paymentMethod,
      status: 'pending',
      couponCode: appliedCoupon?.code,
      notes
    });

    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        coupons,
        orders,
        settings,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        couponDiscount,
        applyCouponCode,
        removeCoupon,
        shippingFee,
        setShippingFee,
        shippingMethodName,
        setShippingMethodName,
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        selectedCategorySlug,
        selectCategory,
        isCartOpen,
        setIsCartOpen,
        filters,
        setFilters,
        resetFilters,
        submitOrder,
        isAdmin,
        setIsAdmin,
        darkMode,
        setDarkMode,
        toast,
        showToast,
        showLuxuryIntro,
        triggerLuxuryIntro,
        closeLuxuryIntro
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
