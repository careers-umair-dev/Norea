import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderRecord } from '../types/store';
import { SmartImage } from '../components/SmartImage';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, shippingFee, placeOrder } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      next.phone = 'Please enter a valid contact phone number.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!address.trim() || address.trim().length < 5) {
      next.address = 'Please provide your street delivery address.';
    }
    if (!city.trim()) {
      next.city = 'Please enter your city.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || cart.length === 0) return;
    const order = placeOrder({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      notes: notes.trim() || undefined,
    });
    setConfirmedOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Confirmation State
  if (confirmedOrder) {
    return (
      <div className="min-h-[75vh] bg-[#F8F7FC] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(23,23,43,0.12)]">
            <div className="flex flex-col items-center text-center pb-8 border-b border-[#F0EFF5]">
              <div className="w-16 h-16 rounded-full bg-[#EAE3FF] text-[#7952D6] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" strokeWidth={1.8} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6]">
                Order Confirmed
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#17172B] mt-1.5">
                Thank you, {confirmedOrder.customer.fullName}
              </h1>
              <p className="text-sm text-[#77758A] mt-2 max-w-md">
                Your order is preparing for dispatch. Keep your order reference handy to track your delivery.
              </p>

              <div className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F8F7FC] border border-[#EAE3FF]">
                <span className="text-xs text-[#77758A]">Order Reference:</span>
                <span className="font-display text-sm font-extrabold text-[#7952D6] tabular-nums">
                  {confirmedOrder.orderNumber}
                </span>
              </div>
            </div>

            {/* Customer & Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#F0EFF5] text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#77758A] mb-2">
                  Delivery Address
                </p>
                <p className="font-semibold text-[#17172B]">{confirmedOrder.customer.fullName}</p>
                <p className="text-[#77758A] mt-0.5">{confirmedOrder.customer.address}</p>
                <p className="text-[#77758A]">{confirmedOrder.customer.city}</p>
                <p className="text-[#77758A] mt-1">{confirmedOrder.customer.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#77758A] mb-2">
                  Payment & Dispatch
                </p>
                <p className="font-semibold text-[#17172B]">{confirmedOrder.paymentMethod}</p>
                <p className="text-[#77758A] mt-0.5">{confirmedOrder.status}</p>
                <p className="text-[#77758A] mt-1">
                  Confirmation sent to {confirmedOrder.customer.email}
                </p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="py-6 space-y-3 border-b border-[#F0EFF5]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#77758A]">
                Order Summary
              </p>
              {confirmedOrder.items.map((item) => (
                <div key={item.cartKey} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#F4F3F8] overflow-hidden shrink-0">
                      <SmartImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#17172B] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#77758A]">
                        {item.color.name} · Size {item.size} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#17172B] tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-6 space-y-2 text-sm">
              <div className="flex justify-between text-[#77758A]">
                <span>Subtotal</span>
                <span className="tabular-nums">${confirmedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#77758A]">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {confirmedOrder.shippingFee === 0
                    ? 'Free'
                    : `$${confirmedOrder.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#F0EFF5] font-display text-lg font-extrabold text-[#17172B]">
                <span>Amount Due on Delivery</span>
                <span className="text-[#7952D6] tabular-nums">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?tab=tracking"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#F8F7FC] border border-[#EAE3FF] text-[#17172B] hover:border-[#7952D6]/40 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <PackageCheck className="w-4 h-4 text-[#7952D6]" />
                <span>Track This Order</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag Checkout Guard
  if (cart.length === 0) {
    return (
      <div className="min-h-[65vh] bg-[#F8F7FC] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-[#EAE3FF] p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-full bg-[#EAE3FF]/60 text-[#7952D6] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#17172B] mb-2">
            Your bag is empty
          </h1>
          <p className="text-sm text-[#77758A] mb-6">
            Add items to your shopping bag before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors"
          >
            <span>Browse Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const grandTotal = cartSubtotal + shippingFee;

  return (
    <div className="bg-[#F8F7FC]/75 min-h-[80vh] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#77758A] hover:text-[#7952D6] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Delivery Details & Payment Option */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#F0EFF5]">
                <MapPin className="w-5 h-5 text-[#7952D6]" />
                <h2 className="font-display text-lg font-bold text-[#17172B]">
                  Delivery Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                  Delivery Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, apartment, or suite"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                />
                {errors.address && (
                  <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                    Delivery Notes (Optional)
                  </label>
                  <input
                    id="notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Gate code or preferred hours"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm text-[#17172B] focus:outline-none focus:border-[#7952D6]"
                  />
                </div>
              </div>
            </div>

            {/* Cash on Delivery Payment Card */}
            <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#F0EFF5] mb-4">
                <Banknote className="w-5 h-5 text-[#7952D6]" />
                <h2 className="font-display text-lg font-bold text-[#17172B]">
                  Payment Method
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7FC] border-2 border-[#7952D6] flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-[#7952D6] text-white flex items-center justify-center mt-0.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#17172B]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-[#77758A] mt-1 leading-relaxed">
                    Pay in cash directly to our courier upon parcel arrival. No online card details are collected on this checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-8 space-y-5 shadow-[0_16px_40px_-20px_rgba(23,23,43,0.12)]">
              <h2 className="font-display text-lg font-bold text-[#17172B] pb-4 border-b border-[#F0EFF5]">
                Order Summary
              </h2>

              <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <li key={item.cartKey} className="flex items-center gap-3.5">
                    <div className="w-14 h-16 rounded-xl bg-[#F4F3F8] overflow-hidden shrink-0 border border-[#EAE3FF]/60">
                      <SmartImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-semibold text-[#17172B] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#77758A]">
                        {item.color.name} · Size {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#17172B] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#F0EFF5] space-y-2.5 text-sm">
                <div className="flex justify-between text-[#77758A]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#17172B] tabular-nums">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#77758A]">
                  <span>Shipping Charges</span>
                  <span className="font-semibold text-[#17172B] tabular-nums">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#EAE3FF] flex justify-between items-baseline">
                  <span className="font-display font-bold text-[#17172B]">Total Amount</span>
                  <span className="font-display text-2xl font-extrabold text-[#7952D6] tabular-nums">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_12px_28px_-8px_rgba(121,82,214,0.5)] transition-colors cursor-pointer"
              >
                <span>Confirm Order (Cash on Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-[#77758A]">
                <ShieldCheck className="w-4 h-4 text-[#7952D6]" />
                <span>30-day complimentary returns & exchanges</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
