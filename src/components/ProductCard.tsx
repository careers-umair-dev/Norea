import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1, true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-[#EAE3FF]/80 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(23,23,43,0.12)]">
      {/* Studio Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square bg-[#F4F3F8] overflow-hidden"
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Single subtle tag (discount or new) */}
        {(product.discountPercent || product.badge === 'New') && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide tabular-nums ${
              product.discountPercent
                ? 'bg-[#7952D6] text-white'
                : 'bg-[#17172B] text-white'
            }`}
          >
            {product.discountPercent ? `-${product.discountPercent}%` : 'New'}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7952D6] ${
            wishlisted
              ? 'bg-[#7952D6] text-white shadow-sm'
              : 'bg-white/95 text-[#17172B] hover:bg-[#EAE3FF] hover:text-[#7952D6] shadow-xs'
          }`}
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={1.8}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 transition-all duration-200 hidden sm:block">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 rounded-full bg-[#17172B]/95 hover:bg-[#7952D6] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.9} />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#77758A]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#77758A] tabular-nums">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-[#17172B]">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="font-display text-[15px] font-semibold text-[#17172B] hover:text-[#7952D6] transition-colors line-clamp-1 mb-2"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span
              className={`text-[15px] font-bold ${
                product.originalPrice ? 'text-[#7952D6]' : 'text-[#17172B]'
              }`}
            >
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#77758A] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F0EFF5] hover:bg-[#7952D6] text-[#17172B] hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
};
