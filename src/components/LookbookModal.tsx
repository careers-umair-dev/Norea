import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { COLLECTIONS, HERO_ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const LookbookModal: React.FC = () => {
  const { isLookbookOpen, closeLookbook } = useStore();

  if (!isLookbookOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#17172B]/65 backdrop-blur-sm"
        onClick={closeLookbook}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Autumn/Winter Collection Lookbook"
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAE3FF]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0EFF5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7952D6]" />
            <span className="font-display text-sm font-bold text-[#17172B]">
              Noréa Campaign Lookbook — Autumn / Winter
            </span>
          </div>
          <button
            type="button"
            onClick={closeLookbook}
            aria-label="Close lookbook"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#77758A] hover:bg-[#F0EFF5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-7 bg-[#17172B] relative min-h-[280px] sm:min-h-[360px]">
            <SmartImage
              src={HERO_ASSETS.campaignBanner}
              alt="Noréa Autumn Winter campaign models"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17172B]/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#B9A2F4] font-semibold">
                  Editorial Film & Capsule
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Soft Lavender Meets Architectural Charcoal
                </h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-[#F8F7FC]">
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#17172B]">
                Featured Capsules
              </h4>
              <div className="space-y-3">
                {COLLECTIONS.slice(0, 3).map((cap) => (
                  <Link
                    key={cap.id}
                    to={`/shop${cap.filterCategory ? `?category=${encodeURIComponent(cap.filterCategory)}` : ''}`}
                    onClick={closeLookbook}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#EAE3FF] hover:border-[#7952D6]/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F4F3F8] shrink-0">
                      <SmartImage
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-[#17172B]">
                        {cap.title}
                      </p>
                      <p className="text-xs text-[#77758A] truncate">{cap.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/collections"
              onClick={closeLookbook}
              className="mt-6 w-full py-3 px-5 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
