import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { BrandMark } from './BrandMark';

export const Header: React.FC = () => {
  const { cartCount, wishlist, openCart, openSearch, openAccount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 relative ${
      isActive
        ? 'text-[#7952D6]'
        : 'text-[#17172B]/80 hover:text-[#7952D6]'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAE3FF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Mobile Menu Trigger + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#17172B] hover:bg-[#F0EFF5] transition-colors"
          >
            <Menu className="w-5 h-5" strokeWidth={1.8} />
          </button>

          <Link to="/" aria-label="Noréa Home" className="focus-visible:outline-none">
            <BrandMark />
          </Link>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-7"
        >
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {/* Shop with smooth dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-2 ${
                  isActive ? 'text-[#7952D6]' : 'text-[#17172B]/80 hover:text-[#7952D6]'
                }`
              }
            >
              <span>Shop</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  shopDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </NavLink>

            {shopDropdownOpen && (
              <div className="absolute left-0 top-full pt-1 w-56 z-50">
                <div className="bg-white rounded-2xl border border-[#EAE3FF] shadow-[0_20px_40px_-15px_rgba(23,23,43,0.12)] p-2">
                  <Link
                    to="/shop"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#17172B] hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors"
                  >
                    All Products
                  </Link>
                  <div className="my-1 border-t border-[#F0EFF5]" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setShopDropdownOpen(false);
                        navigate(`/shop?category=${encodeURIComponent(cat.id)}`);
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-sm text-[#17172B]/85 hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-[#77758A] tabular-nums">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/new-arrivals" className={navLinkClass}>
            New Arrivals
          </NavLink>
          <NavLink to="/collections" className={navLinkClass}>
            Collections
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search catalog"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#17172B] hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>

          <Link
            to="/wishlist"
            aria-label="View wishlist"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#17172B] hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors"
          >
            <Heart className="w-[18px] h-[18px]" strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#EAE3FF] text-[#7952D6] text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label="Open shopping bag"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#17172B] hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#7952D6] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openAccount}
            aria-label="Account and orders"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#17172B] hover:bg-[#F8F7FC] hover:text-[#7952D6] transition-colors cursor-pointer"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#17172B]/35 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#F0EFF5]">
              <BrandMark />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#17172B] hover:bg-[#F0EFF5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop All' },
                { to: '/new-arrivals', label: 'New Arrivals' },
                { to: '/collections', label: 'Collections' },
                { to: '/wishlist', label: `Wishlist (${wishlist.length})` },
                { to: '/about', label: 'About Noréa' },
                { to: '/contact', label: 'Contact & Care' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EAE3FF]/60 text-[#7952D6]'
                        : 'text-[#17172B] hover:bg-[#F8F7FC]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-5 mt-5 border-t border-[#F0EFF5]">
                <p className="px-4 text-xs font-semibold uppercase tracking-wider text-[#77758A] mb-2">
                  Shop by Category
                </p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(`/shop?category=${encodeURIComponent(cat.id)}`);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-[#17172B]/85 hover:bg-[#F8F7FC] flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-[#77758A] tabular-nums">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-[#F0EFF5]">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-5 rounded-full bg-[#7952D6] text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
