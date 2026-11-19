import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/catalog';
import { CartItem, OrderRecord, Product, ProductColor } from '../types/store';

interface ToastMessage {
  id: number;
  text: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAccountOpen: boolean;
  isLookbookOpen: boolean;
  toast: ToastMessage | null;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openAccount: () => void;
  closeAccount: () => void;
  openLookbook: () => void;
  closeLookbook: () => void;
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (cartKey: string) => void;
  updateCartQuantity: (cartKey: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  placeOrder: (customer: OrderRecord['customer']) => OrderRecord;
  showToast: (text: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'norea_cart_v1',
  WISHLIST: 'norea_wishlist_v1',
  ORDERS: 'norea_orders_v1',
};

const FREE_SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING_FEE = 6.99;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [PRODUCTS[0].id, PRODUCTS[3].id];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  const showToast = (text: string) => {
    const id = Date.now();
    setToast({ id, text });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: ProductColor,
    quantity = 1,
    openDrawer = true
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0];
    const cartKey = `${product.id}__${chosenSize}__${chosenColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { cartKey, product, size: chosenSize, color: chosenColor, quantity }];
    });

    showToast(`${product.name} added to your bag`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateCartQuantity = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist');
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee =
    cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

  const placeOrder = (customer: OrderRecord['customer']): OrderRecord => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const order: OrderRecord = {
      orderNumber: `NR-${randomDigits}`,
      createdAt: new Date().toISOString(),
      customer,
      paymentMethod: 'Cash on Delivery',
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      total: cartSubtotal + shippingFee,
      status: 'Confirmed — Preparing Shipment',
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isCartOpen,
        isSearchOpen,
        isAccountOpen,
        isLookbookOpen,
        toast,
        cartCount,
        cartSubtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openAccount: () => setIsAccountOpen(true),
        closeAccount: () => setIsAccountOpen(false),
        openLookbook: () => setIsLookbookOpen(true),
        closeLookbook: () => setIsLookbookOpen(false),
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
