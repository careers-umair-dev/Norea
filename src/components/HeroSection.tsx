import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Headphones,
  Heart,
  Menu,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { CATEGORIES, HERO_ASSETS, PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const HeroSection: React.FC = () => {
  const { openLookbook, cartCount } = useStore();
  const miniProducts = PRODUCTS.slice(0, 2);

  const highlights = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'Orders over $75',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: 'Trusted Cash on Delivery',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: '30-day exchanges',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: 'Dedicated stylist care',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4F0FE] via-[#EAE3FF]/55 to-[#F8F7FC] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle Ambient Lavender Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#B9A2F4]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#B9A2F4]/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Editorial Headline, CTAs, Service Highlights */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7952D6] mb-3 sm:mb-4">
              Style Meets Comfort
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-[#17172B] leading-[1.08] mb-5 text-balance">
              Modern Fashion
              <br />
              For{' '}
              <span className="bg-gradient-to-r from-[#7952D6] via-[#9672EC] to-[#B9A2F4] bg-clip-text text-transparent">
                Every You
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#77758A] leading-relaxed max-w-lg mb-7 sm:mb-8">
              Discover the latest trends in clothing, accessories, and more.
              Premium quality, effortless style, and all in one place.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 sm:mb-12">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold shadow-[0_12px_28px_-8px_rgba(121,82,214,0.55)] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <button
                type="button"
                onClick={openLookbook}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold text-[#17172B] hover:text-[#7952D6] transition-colors group cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="w-10 h-10 rounded-full bg-white border border-[#EAE3FF] shadow-sm flex items-center justify-center text-[#7952D6] group-hover:scale-105 group-hover:bg-[#7952D6] group-hover:text-white transition-all duration-150">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <span>Watch Collection</span>
              </button>
            </div>

            {/* 4 Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-6 border-t border-[#17172B]/8 max-w-xl">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-start gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white/90 border border-[#EAE3FF] flex items-center justify-center text-[#7952D6] shadow-2xs">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#17172B] leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#77758A] mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Editorial Model + Organic Shape + Overlapping Mobile Preview */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] lg:max-w-[500px] xl:mr-14">
              {/* Organic Lavender Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:inset-2 rounded-[48%_52%_44%_56%/54%_45%_55%_46%] bg-gradient-to-tr from-[#B9A2F4]/65 via-[#EAE3FF] to-[#D4C4FA]/75 -z-0"
              />

              {/* Subtle Decorative Dots */}
              <div
                aria-hidden="true"
                className="hidden sm:grid grid-cols-4 gap-2 absolute -left-6 bottom-12 z-0 opacity-40"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#7952D6]" />
                ))}
              </div>

              {/* Handwritten Promotional Accent */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-2 -right-2 lg:-right-4 z-20 rotate-[-6deg] pointer-events-none select-none"
              >
                <p className="font-script text-2xl lg:text-[28px] leading-tight text-[#7952D6]/90 text-center">
                  Effortless Looks
                  <br />
                  Made For You
                </p>
              </div>

              {/* Main Hero Model Image */}
              <div className="relative z-10 rounded-[28px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(23,23,43,0.22)] border-4 border-white/80 bg-[#EAE3FF] aspect-[4/5]">
                <SmartImage
                  src={HERO_ASSETS.modelImage}
                  alt="Model wearing Noréa pastel lavender oversized hoodie and matching cap"
                  fallbackTitle="Noréa Lavender Core Look"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping Desktop Smartphone Mockup Preview */}
              <div
                aria-label="Mobile storefront preview"
                className="hidden xl:block absolute -right-14 -bottom-6 z-30 w-[238px] rounded-[34px] bg-[#17172B] p-[9px] shadow-[0_28px_60px_-15px_rgba(23,23,43,0.45)] border border-white/20 animate-float-slow"
              >
                {/* Dynamic Island Notch */}
                <div className="relative bg-white rounded-[26px] overflow-hidden">
                  <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[9px] font-semibold text-[#17172B]">
                    <span>9:41</span>
                    <div className="w-14 h-3.5 rounded-full bg-[#17172B]" />
                    <span className="tabular-nums">100%</span>
                  </div>

                  {/* Mini Store Header */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#F0EFF5]">
                    <div className="flex items-center gap-1">
                      <Menu className="w-3 h-3 text-[#17172B]" />
                      <span className="font-display text-[11px] font-bold text-[#17172B]">
                        Noréa
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#17172B]">
                      <Search className="w-2.5 h-2.5" />
                      <Heart className="w-2.5 h-2.5" />
                      <div className="relative">
                        <ShoppingBag className="w-2.5 h-2.5" />
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#7952D6] text-[7px] text-white flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mini Hero Card */}
                  <div className="bg-gradient-to-br from-[#F4F0FE] to-[#EAE3FF] px-3 py-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[7px] uppercase tracking-wider text-[#7952D6] font-semibold">
                        New Season
                      </p>
                      <p className="font-display text-[12px] font-extrabold text-[#17172B] leading-tight mt-0.5">
                        Modern Fashion
                        <br />
                        <span className="text-[#7952D6]">For Every You</span>
                      </p>
                      <Link
                        to="/shop"
                        className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#7952D6] text-white text-[8px] font-semibold"
                      >
                        Shop Now
                      </Link>
                    </div>
                    <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
                      <SmartImage
                        src={HERO_ASSETS.modelImage}
                        alt="Mobile preview look"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Mini Categories */}
                  <div className="px-3 py-2.5">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {CATEGORIES.slice(0, 3).map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${encodeURIComponent(cat.id)}`}
                          className="group/mini block"
                        >
                          <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-[#F4F3F8] border border-[#EAE3FF]">
                            <SmartImage
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="block mt-1 text-[8px] font-medium text-[#17172B]">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mini Best Sellers */}
                  <div className="px-3 pb-3 pt-1">
                    <p className="font-display text-[10px] font-bold text-[#17172B] mb-1.5">
                      Best Sellers
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {miniProducts.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.slug}`}
                          className="block rounded-xl bg-[#F8F7FC] p-1.5 border border-[#EAE3FF]/60 hover:border-[#7952D6]/40 transition-colors"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-white mb-1">
                            <SmartImage
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-[8px] font-semibold text-[#17172B] truncate">
                            {item.name}
                          </p>
                          <p className="text-[8px] font-bold text-[#7952D6] tabular-nums">
                            ${item.price.toFixed(2)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
