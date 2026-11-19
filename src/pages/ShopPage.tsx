import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { CategoryId } from '../types/store';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface ShopPageProps {
  defaultNewOnly?: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({ defaultNewOnly = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('category') as CategoryId | null) || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialFilter = searchParams.get('filter') || (defaultNewOnly ? 'new' : 'all');

  const [selectedCategory, setSelectedCategory] = useState<'All' | CategoryId>(initialCategory);
  const [specialFilter, setSpecialFilter] = useState<'all' | 'new' | 'sale'>(
    initialFilter === 'new' || initialFilter === 'sale' ? initialFilter : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Sync URL query updates when user clicks header dropdown links
  React.useEffect(() => {
    const catParam = searchParams.get('category') as CategoryId | null;
    const qParam = searchParams.get('q') || '';
    const filterParam = searchParams.get('filter');

    if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    } else if (!catParam && !defaultNewOnly) {
      setSelectedCategory('All');
    }

    setSearchQuery(qParam);

    if (defaultNewOnly) {
      setSpecialFilter('new');
    } else if (filterParam === 'new' || filterParam === 'sale') {
      setSpecialFilter(filterParam);
    } else {
      setSpecialFilter('all');
    }
  }, [searchParams, defaultNewOnly]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (specialFilter === 'new' && !product.isNewArrival && product.badge !== 'New') {
        return false;
      }
      if (specialFilter === 'sale' && !product.discountPercent) {
        return false;
      }
      if (
        q &&
        !product.name.toLowerCase().includes(q) &&
        !product.category.toLowerCase().includes(q) &&
        !product.collection.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [selectedCategory, specialFilter, searchQuery, sortBy]);

  const handleCategoryChange = (cat: 'All' | CategoryId) => {
    setSelectedCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') next.delete('category');
    else next.set('category', cat);
    setSearchParams(next);
  };

  const resetAll = () => {
    setSelectedCategory('All');
    setSpecialFilter('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="min-h-[75vh] bg-[#F8F7FC]/50 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#EAE3FF]/55 to-white border-b border-[#EAE3FF]/80 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
            {defaultNewOnly ? 'Seasonal Drop' : 'Curated Catalog'}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
                {defaultNewOnly
                  ? 'New Arrivals'
                  : selectedCategory === 'All'
                    ? 'Shop All Essentials'
                    : `${selectedCategory} Collection`}
              </h1>
              <p className="text-sm text-[#77758A] mt-1.5 max-w-xl">
                {defaultNewOnly
                  ? 'Fresh seasonal tailoring, organic fleece, and leather pieces crafted for daily wear.'
                  : 'Explore timeless silhouettes crafted from heavyweight cotton, merino wool, and full-grain leather.'}
              </p>
            </div>
            <p className="text-xs font-semibold text-[#77758A] tabular-nums">
              Showing {filteredProducts.length} of {PRODUCTS.length} styles
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#EAE3FF]">
          {/* Category Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', ...CATEGORIES.map((c) => c.id)] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#7952D6] text-white shadow-xs'
                    : 'bg-white border border-[#EAE3FF] text-[#17172B] hover:border-[#7952D6]/50'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="h-5 w-px bg-[#EAE3FF] mx-1 hidden sm:block" />

            {[
              { id: 'all', label: 'All Items' },
              { id: 'new', label: 'New In' },
              { id: 'sale', label: 'On Sale' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSpecialFilter(tab.id as 'all' | 'new' | 'sale')}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  specialFilter === tab.id
                    ? 'bg-[#17172B] text-white'
                    : 'bg-[#F0EFF5] text-[#77758A] hover:text-[#17172B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input + Sort Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#77758A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by product name..."
                aria-label="Search products in catalog"
                className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#EAE3FF] text-xs font-medium text-[#17172B] placeholder:text-[#77758A] focus:outline-none focus:border-[#7952D6]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search filter"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#77758A] hover:text-[#17172B]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative inline-flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7952D6] absolute left-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#EAE3FF] text-xs font-semibold text-[#17172B] focus:outline-none focus:border-[#7952D6] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Popularity & Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#EAE3FF] mt-8 px-6">
            <h2 className="font-display text-xl font-bold text-[#17172B] mb-2">
              No matching styles found
            </h2>
            <p className="text-sm text-[#77758A] max-w-md mx-auto mb-6">
              Try adjusting your category selection or clearing your search query to browse the full Noréa catalog.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="px-6 py-2.5 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
