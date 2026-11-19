import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Instagram, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-[#EAE3FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#F0EFF5]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="Noréa Home">
              <BrandMark />
            </Link>
            <p className="text-sm text-[#77758A] leading-relaxed max-w-xs">
              Fashion Today. Confidence Tomorrow. Thoughtfully tailored essentials, heavyweight fleece, and everyday leather crafted for modern wardrobes.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Pinterest', href: 'https://pinterest.com' },
                { label: 'X', href: 'https://x.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="px-3 py-1.5 rounded-full bg-[#F8F7FC] border border-[#EAE3FF] text-xs font-medium text-[#17172B] hover:bg-[#EAE3FF] hover:text-[#7952D6] transition-colors inline-flex items-center gap-1.5"
                >
                  {social.label === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-[#17172B] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#77758A]">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop All', to: '/shop' },
                { label: 'New Arrivals', to: '/new-arrivals' },
                { label: 'Collections', to: '/collections' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-[#7952D6] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-[#17172B] mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm text-[#77758A]">
              {[
                { label: 'Shipping Info', to: '/contact?tab=shipping' },
                { label: 'Returns & Exchanges', to: '/contact?tab=returns' },
                { label: 'FAQs', to: '/contact?tab=faqs' },
                { label: 'Size Guide', to: '/contact?tab=sizing' },
                { label: 'Order Tracking', to: '/contact?tab=tracking' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-[#7952D6] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#17172B] mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-[#77758A] mb-4">
              Get early access to seasonal capsule drops, restock alerts, and member exclusives.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#EAE3FF]/60 text-[#17172B] text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7952D6] shrink-0" />
                <span>Welcome to Noréa. Check your inbox for your welcome note.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#F8F7FC] border border-[#EAE3FF] focus-within:border-[#7952D6] transition-colors">
                  <Mail className="w-4 h-4 text-[#77758A] ml-3 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Footer newsletter email"
                    className="flex-1 bg-transparent text-sm text-[#17172B] placeholder:text-[#77758A] focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-9 h-9 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-600 pl-3">{error}</p>}
              </form>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#77758A]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7952D6]" />
                Cash on Delivery Available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7952D6]" />
                Nationwide Express
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77758A]">
          <p>© {new Date().getFullYear()} Noréa Apparel Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/contact?tab=shipping" className="hover:text-[#17172B] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact?tab=returns" className="hover:text-[#17172B] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact?tab=returns" className="hover:text-[#17172B] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
