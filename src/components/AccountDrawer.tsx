import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Package, ShoppingBag, User, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountDrawer: React.FC = () => {
  const { isAccountOpen, closeAccount, orders, wishlist, cartCount, openCart } = useStore();

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#17172B]/40 backdrop-blur-xs"
        onClick={closeAccount}
      />

      <aside
        aria-label="Account and orders"
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EFF5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EAE3FF] text-[#7952D6] flex items-center justify-center">
              <User className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-[#17172B]">
                Noréa Member
              </h2>
              <p className="text-xs text-[#77758A]">Orders, saved items & delivery</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAccount}
            aria-label="Close account panel"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#77758A] hover:bg-[#F0EFF5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Account Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/wishlist"
              onClick={closeAccount}
              className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF] hover:border-[#7952D6]/40 transition-colors"
            >
              <Heart className="w-4 h-4 text-[#7952D6] mb-2" />
              <p className="font-display text-xl font-bold text-[#17172B] tabular-nums">
                {wishlist.length}
              </p>
              <p className="text-xs text-[#77758A]">Saved Wishlist</p>
            </Link>

            <button
              type="button"
              onClick={() => {
                closeAccount();
                openCart();
              }}
              className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF] hover:border-[#7952D6]/40 transition-colors text-left cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#7952D6] mb-2" />
              <p className="font-display text-xl font-bold text-[#17172B] tabular-nums">
                {cartCount}
              </p>
              <p className="text-xs text-[#77758A]">Items in Bag</p>
            </button>
          </div>

          {/* Order History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-bold text-[#17172B]">
                Recent Orders
              </h3>
              <Link
                to="/contact?tab=tracking"
                onClick={closeAccount}
                className="text-xs font-semibold text-[#7952D6] hover:underline"
              >
                Track Order
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#F8F7FC] border border-[#F0EFF5] text-center">
                <Package className="w-6 h-6 text-[#77758A] mx-auto mb-2" strokeWidth={1.6} />
                <p className="text-sm font-medium text-[#17172B]">No orders placed yet</p>
                <p className="text-xs text-[#77758A] mt-1 mb-4">
                  Orders you place with Cash on Delivery appear here immediately with their tracking reference.
                </p>
                <Link
                  to="/shop"
                  onClick={closeAccount}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7952D6] hover:underline"
                >
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.orderNumber}
                    className="p-4 rounded-2xl border border-[#EAE3FF] bg-[#F8F7FC]/60"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-display text-sm font-bold text-[#17172B] tabular-nums">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs font-semibold text-[#7952D6] tabular-nums">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#77758A]">
                      {order.status} · {order.paymentMethod}
                    </p>
                    <p className="text-xs text-[#77758A] mt-1">
                      Deliver to {order.customer.fullName}, {order.customer.city}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-[#F0EFF5] bg-[#F8F7FC]">
          <Link
            to="/contact?tab=shipping"
            onClick={closeAccount}
            className="w-full py-3 px-5 rounded-full bg-[#17172B] hover:bg-[#7952D6] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>Customer Care & Returns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
};
