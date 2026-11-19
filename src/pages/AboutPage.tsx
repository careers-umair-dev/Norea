import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Leaf, ShieldCheck } from 'lucide-react';
import { HERO_ASSETS } from '../data/catalog';
import { SmartImage } from '../components/SmartImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white pb-20">
      <section className="bg-gradient-to-b from-[#EAE3FF]/55 to-white py-14 sm:py-20 border-b border-[#EAE3FF]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7952D6]">
                Our Atelier
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#17172B] tracking-tight leading-tight">
                Effortless Form.
                <br />
                Elevated Everyday Craft.
              </h1>
              <p className="text-base text-[#77758A] leading-relaxed">
                Founded on the belief that everyday essentials deserve tailored precision, Noréa pairs heavyweight organic cottons, fine merino knits, and full-grain leathers in calm, wearable palettes.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7952D6] hover:bg-[#6641C2] text-white text-sm font-semibold transition-colors"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#EAE3FF]/60 aspect-[16/10] bg-[#17172B]">
                <SmartImage
                  src={HERO_ASSETS.campaignBanner}
                  alt="Noréa fashion studio campaign"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              title: '420gsm Signature Fleece',
              desc: 'Dense brushed organic cotton engineered to hold clean architectural structure wash after wash.',
            },
            {
              icon: Leaf,
              title: 'Responsible Materials',
              desc: 'From virgin wool blends to vegetable-tanned leathers, every mill partner meets strict traceability standards.',
            },
            {
              icon: ShieldCheck,
              title: 'Built for Longevity',
              desc: 'Reinforced seams, matte brushed hardware, and colorfast lavender dyes that age gracefully.',
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-3xl bg-[#F8F7FC] border border-[#EAE3FF]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EAE3FF] text-[#7952D6] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h2 className="font-display text-lg font-bold text-[#17172B] mb-2">
                  {pillar.title}
                </h2>
                <p className="text-sm text-[#77758A] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
