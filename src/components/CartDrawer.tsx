import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    cartSubtotal,
    shippingFee,
    freeShippingThreshold,
    updateCartQuantity,
    removeFromCart,
  } = useStore();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#17172B]/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Shopping bag"
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EFF5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#7952D6]" strokeWidth={1.8} />
            <h2 className="font-display text-lg font-bold text-[#17172B]">
              Shopping Bag
            </h2>
            <span className="text-xs font-medium text-[#77758A] tabular-nums">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#77758A] hover:bg-[#F0EFF5] hover:text-[#17172B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {cart.length > 0 && (
          <div className="px-6 py-3.5 bg-[#F8F7FC] border-b border-[#EAE3FF]/60">
            <div className="flex items-center gap-2 text-xs font-medium text-[#17172B] mb-2">
              <Truck className="w-4 h-4 text-[#7952D6] shrink-0" />
              {remainingForFreeShipping === 0 ? (
                <span>You have unlocked complimentary nationwide shipping.</span>
              ) : (
                <span>
                  Add{' '}
                  <strong className="text-[#7952D6] tabular-nums">
                    ${remainingForFreeShipping.toFixed(2)}
                  </strong>{' '}
                  more for free shipping
                </span>
              )}
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#EAE3FF] overflow-hidden">
              <div
                className="h-full bg-[#7952D6] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EAE3FF]/60 flex items-center justify-center text-[#7952D6] mb-4">
                <ShoppingBag className="w-7 h-7" strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-lg font-bold text-[#17172B] mb-2">
                Your bag is empty
              </h3>
              <p className="text-sm text-[#77758A] max-w-xs mb-6">
                Explore our signature lavender fleece, everyday tailoring, and sculptural footwear.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#F0EFF5]">
              {cart.map((item) => (
                <li key={item.cartKey} className="py-4 first:pt-0 flex gap-4">
                  <Link
                    to={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="w-20 h-24 rounded-xl bg-[#F4F3F8] overflow-hidden shrink-0 border border-[#EAE3FF]/60"
                  >
                    <SmartImage
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-display text-sm font-semibold text-[#17172B] hover:text-[#7952D6] truncate"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartKey)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-[#77758A] hover:text-rose-600 transition-colors p-1 -mr-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-[#77758A] mt-0.5">
                      {item.color.name} · Size {item.size}
                    </p>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#EAE3FF] bg-[#F8F7FC]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartKey, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#17172B] hover:text-[#7952D6] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#17172B] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartKey, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#17172B] hover:text-[#7952D6] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#17172B] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Totals */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#F0EFF5] bg-[#F8F7FC]/70 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#77758A]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17172B] tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#77758A]">
                <span>Shipping</span>
                <span className="font-semibold text-[#17172B] tabular-nums">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAE3FF] flex items-center justify-between">
                <span className="font-display font-bold text-[#17172B]">Total</span>
                <span className="font-display text-lg font-extrabold text-[#7952D6] tabular-nums">
                  ${(cartSubtotal + shippingFee).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-6 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2.5 px-6 rounded-full bg-white border border-[#EAE3FF] text-[#17172B] hover:border-[#7952D6]/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
