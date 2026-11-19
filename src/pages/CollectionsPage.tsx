import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/catalog';
import { SmartImage } from '../components/SmartImage';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="bg-white pb-20">
      <section className="bg-gradient-to-b from-[#EAE3FF]/60 to-white py-12 sm:py-16 border-b border-[#EAE3FF]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7952D6] mb-3">
            Seasonal Capsules
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#17172B] tracking-tight mb-4">
            Curated Wardrobes for Every Pace
          </h1>
          <p className="text-sm sm:text-base text-[#77758A] leading-relaxed">
            Each Noréa capsule is built around cohesive textures and muted tones so every garment layers cleanly with the next.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group rounded-3xl overflow-hidden bg-[#F8F7FC] border border-[#EAE3FF] grid grid-cols-1 sm:grid-cols-12 items-stretch"
            >
              <div className="sm:col-span-5 relative min-h-[240px] bg-[#EAE3FF]/40 overflow-hidden">
                <SmartImage
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7952D6] mb-1.5">
                    {col.subtitle}
                  </p>
                  <h2 className="font-display text-2xl font-extrabold text-[#17172B] mb-2.5">
                    {col.title}
                  </h2>
                  <p className="text-sm text-[#77758A] leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/shop${col.filterCategory ? `?category=${encodeURIComponent(col.filterCategory)}` : ''}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#17172B] hover:bg-[#7952D6] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Explore Capsule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Pieces */}
        <div className="pt-8 border-t border-[#F0EFF5]">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-1.5">
                Editor&apos;s Edit
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#17172B]">
                Capsule Highlights
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-semibold text-[#7952D6] hover:underline inline-flex items-center gap-1"
            >
              <span>Shop All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
