import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.collection.toLowerCase().includes(trimmed)
      )
    : PRODUCTS.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeSearch();
    navigate(`/shop${trimmed ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-[#17172B]/45 backdrop-blur-xs"
        onClick={closeSearch}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAE3FF] overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-[#F0EFF5]">
          <Search className="w-5 h-5 text-[#7952D6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, sneakers, leather bags, wool coats..."
            className="flex-1 text-sm sm:text-base text-[#17172B] placeholder:text-[#77758A] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-medium text-[#77758A] hover:text-[#17172B] px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#77758A] hover:bg-[#F0EFF5] hover:text-[#17172B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        <div className="p-5 max-h-[65vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#77758A]">
              {trimmed ? `Results (${results.length})` : 'Popular Searches'}
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#7952D6] hover:underline cursor-pointer"
            >
              <span>View in Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-[#17172B]">
                No items found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#77758A] mt-1">
                Try searching for Hoodie, Runners, Tote, or Trench Coat.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3.5 p-2.5 rounded-2xl border border-[#F0EFF5] hover:border-[#B9A2F4] hover:bg-[#F8F7FC] transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#F4F3F8] overflow-hidden shrink-0">
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#77758A]">
                      {product.category}
                    </p>
                    <p className="font-display text-sm font-semibold text-[#17172B] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-bold text-[#7952D6] tabular-nums mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
