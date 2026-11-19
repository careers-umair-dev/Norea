import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  HelpCircle,
  Mail,
  MapPin,
  PackageSearch,
  Phone,
  RotateCcw,
  Ruler,
  Truck,
} from 'lucide-react';
import { FAQS } from '../data/catalog';
import { useStore } from '../context/StoreContext';

type CareTab = 'contact' | 'shipping' | 'returns' | 'faqs' | 'sizing' | 'tracking';

export const ContactPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as CareTab | null) || 'contact';
  const [activeTab, setActiveTab] = useState<CareTab>(initialTab);

  const { orders } = useStore();
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedResult, setTrackedResult] = useState<'idle' | 'found' | 'not-found'>('idle');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = searchParams.get('tab') as CareTab | null;
    if (t && ['contact', 'shipping', 'returns', 'faqs', 'sizing', 'tracking'].includes(t)) {
      setActiveTab(t);
    }
  }, [searchParams]);

  const handleTabChange = (tab: CareTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = trackingQuery.trim().toUpperCase();
    if (!cleaned) return;
    const match = orders.find((o) => o.orderNumber.toUpperCase() === cleaned);
    setTrackedResult(match ? 'found' : 'not-found');
  };

  const matchedOrder = orders.find(
    (o) => o.orderNumber.toUpperCase() === trackingQuery.trim().toUpperCase()
  );

  return (
    <div className="min-h-[75vh] bg-[#F8F7FC]/60 pb-20">
      <section className="bg-gradient-to-b from-[#EAE3FF]/55 to-white border-b border-[#EAE3FF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7952D6] mb-2">
            Client Concierge
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#17172B] tracking-tight">
            Contact & Customer Care
          </h1>
          <p className="text-sm text-[#77758A] mt-2 max-w-xl">
            Questions about sizing, nationwide shipping, returns, or an existing Cash on Delivery parcel? Our team is here every day.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { id: 'contact', label: 'Message Us', icon: Mail },
              { id: 'shipping', label: 'Shipping Info', icon: Truck },
              { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
              { id: 'sizing', label: 'Size Guide', icon: Ruler },
              { id: 'tracking', label: 'Order Tracking', icon: PackageSearch },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id as CareTab)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#7952D6] text-white shadow-xs'
                      : 'bg-white border border-[#EAE3FF] text-[#17172B] hover:border-[#7952D6]/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#17172B] mb-4">
                Send a Note
              </h2>
              {sent ? (
                <div className="p-6 rounded-2xl bg-[#EAE3FF]/50 border border-[#B9A2F4]/50 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7952D6] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-sm font-bold text-[#17172B]">
                      Message received
                    </p>
                    <p className="text-xs text-[#77758A] mt-1">
                      Our client care specialists reply within 4 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-3 text-xs font-semibold text-[#7952D6] hover:underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cName" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="cName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Taylor Reed"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm focus:outline-none focus:border-[#7952D6]"
                      />
                    </div>
                    <div>
                      <label htmlFor="cEmail" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="cEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm focus:outline-none focus:border-[#7952D6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cMsg" className="block text-xs font-semibold text-[#17172B] mb-1.5">
                      How can we help?
                    </label>
                    <textarea
                      id="cMsg"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Sizing advice, order updates, or styling inquiries..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#EAE3FF] text-sm focus:outline-none focus:border-[#7952D6]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 space-y-4">
                <h3 className="font-display text-base font-bold text-[#17172B]">
                  Studio & Support Desk
                </h3>
                <div className="flex items-start gap-3 text-sm text-[#77758A]">
                  <MapPin className="w-4 h-4 text-[#7952D6] mt-1 shrink-0" />
                  <span>412 Mercer Studio Loft, Suite 3B, New York, NY 10013</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#77758A]">
                  <Mail className="w-4 h-4 text-[#7952D6] shrink-0" />
                  <span>care@norea-atelier.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#77758A]">
                  <Phone className="w-4 h-4 text-[#7952D6] shrink-0" />
                  <span>+1 (800) 555-0194 · Mon–Sun, 9am–8pm EST</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-10 max-w-3xl space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#17172B]">
              Shipping Information
            </h2>
            <p className="text-sm text-[#77758A] leading-relaxed">
              Every Noréa parcel is packed in recyclable protective garment sleeves and dispatched within 24 business hours.
            </p>
            <ul className="space-y-3 text-sm text-[#17172B] pt-2">
              <li className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF]">
                <strong>Complimentary Express Shipping:</strong> Automatically applied on all orders of $75 or more.
              </li>
              <li className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#EAE3FF]">
                <strong>Standard Delivery Rate:</strong> Flat $6.99 nationwide for orders under $75 (arrives in 2–4 business days).
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-10 max-w-3xl space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#17172B]">
              30-Day Returns & Exchanges
            </h2>
            <p className="text-sm text-[#77758A] leading-relaxed">
              If a piece does not fit as expected, we gladly accept unworn, unwashed items with original tags within 30 days of delivery. Size exchanges ship out free of charge.
            </p>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#EAE3FF] p-6"
              >
                <h3 className="font-display text-base font-bold text-[#17172B] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#77758A] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sizing' && (
          <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-10 max-w-3xl overflow-x-auto">
            <h2 className="font-display text-2xl font-bold text-[#17172B] mb-4">
              Apparel Size Guide
            </h2>
            <table className="w-full text-left text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-[#EAE3FF] text-xs uppercase text-[#77758A]">
                  <th className="py-3 pr-4">Size</th>
                  <th className="py-3 pr-4">Chest (in)</th>
                  <th className="py-3 pr-4">Waist (in)</th>
                  <th className="py-3">Fit Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EFF5] text-[#17172B]">
                {[
                  ['XS', '34–36', '27–29', 'Tailored / Relaxed'],
                  ['S', '36–38', '29–31', 'Standard Everyday'],
                  ['M', '38–40', '31–33', 'Standard Everyday'],
                  ['L', '40–42', '33–35', 'Relaxed Layering'],
                  ['XL', '42–45', '35–38', 'Generous Drape'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-3 pr-4 font-bold">{row[0]}</td>
                    <td className="py-3 pr-4">{row[1]}</td>
                    <td className="py-3 pr-4">{row[2]}</td>
                    <td className="py-3 text-[#77758A]">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="bg-white rounded-3xl border border-[#EAE3FF] p-6 sm:p-10 max-w-2xl space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#17172B]">
                Track Your Order
              </h2>
              <p className="text-sm text-[#77758A] mt-1">
                Enter your Noréa order reference (for example, NR-123456) to check dispatch status.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingQuery}
                onChange={(e) => setTrackingQuery(e.target.value)}
                placeholder="Enter order reference (e.g. NR-482910)"
                className="flex-1 px-4 py-3 rounded-full bg-[#F8F7FC] border border-[#EAE3FF] text-sm focus:outline-none focus:border-[#7952D6]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold cursor-pointer"
              >
                Track Parcel
              </button>
            </form>

            {trackedResult === 'found' && matchedOrder && (
              <div className="p-5 rounded-2xl bg-[#F8F7FC] border border-[#B9A2F4] space-y-1.5 text-sm">
                <p className="font-display font-bold text-[#7952D6] tabular-nums">
                  {matchedOrder.orderNumber} — {matchedOrder.status}
                </p>
                <p className="text-[#17172B]">
                  Recipient: {matchedOrder.customer.fullName} ({matchedOrder.customer.city})
                </p>
                <p className="text-[#77758A] tabular-nums">
                  Total Due on Delivery: ${matchedOrder.total.toFixed(2)}
                </p>
              </div>
            )}

            {trackedResult === 'not-found' && (
              <p className="text-xs text-rose-600">
                No order found with reference &ldquo;{trackingQuery}&rdquo; in this browser session.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
