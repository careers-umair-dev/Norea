import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#77758A] mb-6 sm:mb-8">
          <Link to="/" className="hover:text-[#7952D6] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#7952D6] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#17172B] font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Studio Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-square rounded-3xl bg-[#F4F3F8] border border-[#EAE3FF]/80 overflow-hidden">
              <SmartImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPercent && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#7952D6] text-white text-xs font-semibold tabular-nums">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Right Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7952D6]">
                  {product.collection} · {product.category}
                </span>
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#17172B] tabular-nums">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#77758A]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3 tabular-nums">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#7952D6]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#77758A] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#77758A] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17172B]">
                  Color: <span className="text-[#7952D6]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colors.map((color) => {
                  const active = color.name === selectedColor.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color.name}`}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        active
                          ? 'border-[#7952D6] bg-[#F8F7FC] text-[#17172B] ring-2 ring-[#7952D6]/20'
                          : 'border-[#EAE3FF] bg-white text-[#77758A] hover:border-[#B9A2F4]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#17172B]">
                  Size: <span className="text-[#7952D6]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#77758A] hover:text-[#7952D6] cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = size === selectedSize;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#17172B] text-white border-[#17172B]'
                          : 'bg-white text-[#17172B] border-[#EAE3FF] hover:border-[#7952D6]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {showSizeGuide && (
                <div className="mt-3 p-4 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF] text-xs text-[#77758A] space-y-1">
                  <p className="font-semibold text-[#17172B]">Standard Fit Measurements</p>
                  <p>XS: Chest 34–36&quot; · S: Chest 36–38&quot; · M: Chest 38–40&quot; · L: Chest 40–42&quot; · XL: Chest 42–44&quot;</p>
                </div>
              )}
            </div>

            {/* Quantity & Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="inline-flex items-center justify-between sm:justify-start rounded-full border border-[#EAE3FF] bg-[#F8F7FC] px-2 h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#17172B] hover:text-[#7952D6] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#17172B] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#17172B] hover:text-[#7952D6] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, selectedSize, selectedColor, quantity, true)}
                className="flex-1 h-12 px-7 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_12px_28px_-8px_rgba(121,82,214,0.45)] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`h-12 w-full sm:w-12 rounded-full border flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 ${
                  wishlisted
                    ? 'bg-[#EAE3FF] border-[#7952D6] text-[#7952D6]'
                    : 'bg-white border-[#EAE3FF] text-[#17172B] hover:border-[#7952D6]'
                }`}
              >
                <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
                <span className="sm:hidden text-xs font-semibold">
                  {wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                </span>
              </button>
            </div>

            {/* Fabric & Delivery Guarantees */}
            <div className="pt-6 border-t border-[#F0EFF5] space-y-5">
              <div>
                <h2 className="font-display text-sm font-bold text-[#17172B] mb-2.5">
                  Fabric & Care
                </h2>
                <ul className="space-y-1.5">
                  {product.fabricAndCare.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-xs text-[#77758A]">
                      <Check className="w-3.5 h-3.5 text-[#7952D6] mt-0.5 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, title: 'Free Over $75', desc: '2–4 day express' },
                  { icon: ShieldCheck, title: 'Cash on Delivery', desc: 'Pay at doorstep' },
                  { icon: RotateCcw, title: '30-Day Returns', desc: 'Easy size swap' },
                ].map((info) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={info.title}
                      className="p-3.5 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF]/80 flex items-center gap-3"
                    >
                      <Icon className="w-4 h-4 text-[#7952D6] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#17172B]">{info.title}</p>
                        <p className="text-[11px] text-[#77758A]">{info.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 pt-14 border-t border-[#F0EFF5]">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-1.5">
                Complete the Look
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#17172B]">
                You May Also Like
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7952D6] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
