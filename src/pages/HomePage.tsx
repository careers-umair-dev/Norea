import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe,
  Package,
  Star,
} from 'lucide-react';
import {
  CATEGORIES,
  CUSTOMER_REVIEWS,
  HERO_ASSETS,
  PRODUCTS,
} from '../data/catalog';
import { HeroSection } from '../components/HeroSection';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

export const HomePage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
                <span className="w-5 h-[1.5px] bg-[#7952D6]" aria-hidden="true" />
                Shop by Category
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
                Find Your Perfect Style
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#17172B] hover:text-[#7952D6] transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${encodeURIComponent(category.id)}`}
                className="group relative flex flex-col rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF]/70 p-3 sm:p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(121,82,214,0.2)]"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE3FF]/45 mb-3.5">
                  <SmartImage
                    src={category.image}
                    alt={`${category.name} fashion collection`}
                    fallbackTitle={category.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 px-1">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#17172B] group-hover:text-[#7952D6] transition-colors">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#77758A] group-hover:text-[#7952D6] mt-0.5 transition-colors">
                      <span>Shop Now</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-medium text-[#77758A] tabular-nums">
                    {category.itemCount} styles
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products / Best Sellers */}
      <section className="py-16 sm:py-20 bg-[#F8F7FC]/65 border-y border-[#F0EFF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
                <span className="w-5 h-[1.5px] bg-[#7952D6]" aria-hidden="true" />
                Featured Products
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
                Best Sellers
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#17172B] hover:text-[#7952D6] transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Brand Banner */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#17172B] via-[#271E4F] to-[#3B2678] text-white shadow-[0_24px_60px_-20px_rgba(23,23,43,0.4)]">
            {/* Subtle Ambient Lavender Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-[#B9A2F4]/20 blur-3xl"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Campaign Image */}
              <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-[340px] overflow-hidden">
                <SmartImage
                  src={HERO_ASSETS.campaignBanner}
                  alt="Noréa models in black and lavender heavyweight hoodies"
                  fallbackTitle="Noréa Seasonal Campaign"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#17172B]/40 via-transparent to-[#271E4F]"
                />
              </div>

              {/* Center Copy + CTA */}
              <div className="lg:col-span-4 px-6 py-8 sm:px-10 lg:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B9A2F4] mb-3">
                  Your Style. Our Passion.
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 text-balance">
                  Quality Fashion
                  <br />
                  At Your Fingertips
                </h2>
                <p className="text-sm text-[#EAE3FF]/80 leading-relaxed mb-6">
                  Discover premium clothing and accessories designed to complement your everyday style.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9E7CF0] hover:bg-[#B9A2F4] hover:text-[#17172B] text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Brand Highlights */}
              <div className="lg:col-span-3 px-6 pb-8 lg:py-8 lg:pr-10">
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                  {[
                    { icon: Star, value: '10K+', label: 'Happy Customers' },
                    { icon: Package, value: '500+', label: 'Products' },
                    { icon: Globe, value: 'Nationwide', label: 'Express Shipping' },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#B9A2F4] shrink-0">
                          <Icon className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-base sm:text-lg font-extrabold text-white leading-none tabular-nums">
                            {stat.value}
                          </p>
                          <p className="text-xs text-[#EAE3FF]/75 mt-1 truncate">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals + Special Offer Banner */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
                <span className="w-5 h-[1.5px] bg-[#7952D6]" aria-hidden="true" />
                Just Dropped
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/new-arrivals"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#17172B] hover:text-[#7952D6] transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>View New Arrivals</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Refined Seasonal Offer Strip */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#EAE3FF] via-[#F4F0FE] to-[#EAE3FF]/80 border border-[#B9A2F4]/40 px-6 py-8 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7952D6] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7952D6]">
                  Seasonal Wardrobe Offer
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#17172B] mt-0.5">
                  Save up to 24% on Selected Everyday Essentials
                </h3>
                <p className="text-sm text-[#77758A] mt-1">
                  Plus complimentary express delivery on all orders above $75.
                </p>
              </div>
            </div>

            <Link
              to="/shop?filter=sale"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17172B] hover:bg-[#7952D6] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <span>Shop Special Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="py-16 sm:py-20 bg-[#F8F7FC] border-y border-[#F0EFF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
              Community Voices
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
              Loved by Everyday Dressers
            </h2>
            <p className="text-sm sm:text-base text-[#77758A] mt-2">
              Verified reviews from customers wearing Noréa across daily routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-white rounded-2xl border border-[#EAE3FF]/80 p-6 flex flex-col justify-between shadow-[0_10px_30px_-18px_rgba(23,23,43,0.12)]"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#17172B]/85 leading-relaxed mb-6">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EFF5] flex items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-bold text-[#17172B]">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#77758A]">
                      {review.location} · {review.productPurchased}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-[#77758A]">
                    {review.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Subscription ("Stay in Style") */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#EAE3FF] via-[#F4F0FE] to-[#EAE3FF]/90 border border-[#B9A2F4]/40 px-6 py-12 sm:px-12 sm:py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7952D6] mb-2">
              Private Invitations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight mb-3">
              Stay in Style
            </h2>
            <p className="text-sm sm:text-base text-[#77758A] max-w-lg mx-auto mb-8">
              Subscribe for early access to limited seasonal drops, styling notes, and exclusive member offers.
            </p>

            {newsletterSuccess ? (
              <div className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#17172B] text-sm font-semibold shadow-sm border border-[#EAE3FF]">
                <CheckCircle2 className="w-5 h-5 text-[#7952D6]" />
                <span>You&apos;re on the list. Thank you for joining Noréa!</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-1.5 rounded-3xl sm:rounded-full bg-white border border-[#B9A2F4]/50 shadow-sm focus-within:border-[#7952D6]">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for Stay in Style newsletter"
                    className="flex-1 px-4 py-2.5 bg-transparent text-sm text-[#17172B] placeholder:text-[#77758A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-rose-600 mt-2.5">{newsletterError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
