import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-[70vh] bg-[#F8F7FC]/60 pb-20">
      <div className="bg-gradient-to-b from-[#EAE3FF]/50 to-white border-b border-[#EAE3FF] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
              Saved Styles
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
              Your Wishlist
            </h1>
          </div>
          <p className="text-xs font-semibold text-[#77758A] tabular-nums">
            {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EAE3FF] py-16 px-6 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#EAE3FF]/60 text-[#7952D6] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" strokeWidth={1.7} />
            </div>
            <h2 className="font-display text-xl font-bold text-[#17172B] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-[#77758A] mb-6">
              Save your favorite pieces while browsing to compare fits or move them straight into your shopping bag.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors"
            >
              <span>Explore Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {savedProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-[#EAE3FF] overflow-hidden flex flex-col"
              >
                <Link
                  to={`/product/${product.slug}`}
                  className="aspect-square bg-[#F4F3F8] overflow-hidden relative block"
                >
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-[#77758A]">
                    {product.category}
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="font-display text-base font-bold text-[#17172B] hover:text-[#7952D6] mt-0.5 truncate"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm font-bold text-[#7952D6] tabular-nums mt-1.5 mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="mt-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1, true)}
                      className="flex-1 py-2.5 px-4 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="w-10 h-10 rounded-full border border-[#EAE3FF] text-[#77758A] hover:text-rose-600 hover:border-rose-200 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
