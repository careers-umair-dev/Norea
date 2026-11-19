import { CategoryItem, CollectionCapsule, CustomerReview, Product } from '../types/store';

export const HERO_ASSETS = {
  modelImage: '/src/assets/images/hero_lavender_model_1795096795429.jpg',
  campaignBanner: '/src/assets/images/campaign_duo_banner_1795096795059.jpg',
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'Women',
    name: 'Women',
    tagline: 'Tailored knits, soft silhouettes & outerwear',
    image: '/src/assets/images/cat_women_editorial_1795096794986.jpg',
    itemCount: 42,
  },
  {
    id: 'Men',
    name: 'Men',
    tagline: 'Heavyweight fleece, relaxed tailoring & essentials',
    image: '/src/assets/images/cat_men_editorial_1795096795240.jpg',
    itemCount: 38,
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    tagline: 'Pebble-leather carryalls, structured caps & accents',
    image: '/src/assets/images/cat_accessories_bag_1795096795864.jpg',
    itemCount: 24,
  },
  {
    id: 'Footwear',
    name: 'Footwear',
    tagline: 'Cushioned runners & minimalist leather sneakers',
    image: '/src/assets/images/cat_footwear_sneakers_1795096796384.jpg',
    itemCount: 19,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-hoodie-01',
    slug: 'oversized-hoodie',
    name: 'Oversized Lavender Hoodie',
    category: 'Women',
    collection: 'Lavender Core',
    price: 44.0,
    originalPrice: 58.0,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 124,
    image: '/src/assets/images/prod_oversized_hoodie_1795096794690.jpg',
    badge: 'Sale',
    isBestSeller: true,
    description:
      'Cut in a relaxed drop-shoulder silhouette from 420gsm brushed organic cotton fleece. Designed with double-lined hood structure, tonal metal-tipped drawcords, and plush ribbed cuffs for all-day warmth without bulk.',
    fabricAndCare: [
      '100% Organic combed cotton fleece (420gsm)',
      'Pre-shrunk garment-washed finish for lasting softness',
      'Machine wash cold with like colors; dry flat',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Soft Lavender', hex: '#C7B6F2' },
      { name: 'Midnight Navy', hex: '#17172B' },
      { name: 'Chalk White', hex: '#F4F3F8' },
    ],
  },
  {
    id: 'prod-tee-02',
    slug: 'geometric-graphic-tshirt',
    name: 'Atelier Graphic T-Shirt',
    category: 'Men',
    collection: 'Studio Monochrome',
    price: 28.0,
    rating: 4.8,
    reviewCount: 98,
    image: '/src/assets/images/prod_graphic_tshirt_1795096797182.jpg',
    isBestSeller: true,
    description:
      'A crisp heavyweight boxy crewneck spun from long-staple cotton jersey. Finished with our architectural violet line-art emblem printed with soft water-based inks that breathe effortlessly.',
    fabricAndCare: [
      '100% Combed ring-spun cotton (260gsm)',
      'Ribbed collar retains shape after repeated wear',
      'Wash inside out cold; do not iron over print',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Soft Lavender', hex: '#B9A2F4' },
    ],
  },
  {
    id: 'prod-cap-03',
    slug: 'classic-twill-cap',
    name: 'Classic Twill Cap',
    category: 'Accessories',
    collection: 'Everyday Carry',
    price: 22.0,
    rating: 4.7,
    reviewCount: 76,
    image: '/src/assets/images/prod_classic_cap_1795096796206.jpg',
    isBestSeller: true,
    description:
      'Six-panel structured crown crafted from dense brushed cotton twill with a pre-curved brim and tonal micro-embroidery. Features an adjustable brushed metal buckle strap for a custom fit.',
    fabricAndCare: [
      '100% Heavyweight brushed cotton twill',
      'Breathable embroidered ventilation eyelets',
      'Spot clean with damp cloth',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Obsidian Black', hex: '#1B1B24' },
      { name: 'Soft Lavender', hex: '#B9A2F4' },
    ],
  },
  {
    id: 'prod-shoes-04',
    slug: 'cloudstride-running-shoes',
    name: 'CloudStride Runners',
    category: 'Footwear',
    collection: 'Active Stride',
    price: 74.0,
    originalPrice: 89.0,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 112,
    image: '/src/assets/images/prod_running_shoes_1795096794888.jpg',
    badge: 'Sale',
    isBestSeller: true,
    description:
      'Engineered with dual-density EVA rebound midsoles, breathable open-weave mesh, and supple lavender suede overlays. Built to transition seamlessly from morning miles to city errands.',
    fabricAndCare: [
      'Breathable technical mesh & genuine suede overlays',
      'High-traction sculpted rubber outsole',
      'Wipe clean with soft brush and mild soap',
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Lavender / Chalk', hex: '#B9A2F4' },
      { name: 'Slate / White', hex: '#4B4A5E' },
    ],
  },
  {
    id: 'prod-trench-05',
    slug: 'belted-wool-trench-coat',
    name: 'Belted Wool Trench Coat',
    category: 'Women',
    collection: 'Lavender Core',
    price: 148.0,
    originalPrice: 175.0,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 54,
    image: '/src/assets/images/prod_trench_coat_1795096795121.jpg',
    badge: 'New',
    isNewArrival: true,
    description:
      'An effortless architectural outer layer tailored in a double-faced wool blend with clean notch lapels, self-tie waist belt, and buttoned cuff tabs. Lined smoothly for easy layering over knitwear.',
    fabricAndCare: [
      '70% Virgin wool, 30% Recycled polyamide',
      'Full satin-twill interior lining',
      'Professional dry clean recommended',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Ivory', hex: '#EAE5DA' },
      { name: 'Midnight Navy', hex: '#17172B' },
    ],
  },
  {
    id: 'prod-cardigan-06',
    slug: 'dusty-lilac-ribbed-cardigan',
    name: 'Lilac Ribbed Cardigan',
    category: 'Women',
    collection: 'Lavender Core',
    price: 68.0,
    rating: 4.8,
    reviewCount: 41,
    image: '/src/assets/images/prod_knit_cardigan_1795096794012.jpg',
    badge: 'New',
    isNewArrival: true,
    description:
      'Fine-gauge vertical ribbing meets a softly draped crewneck cut in an airy merino-cashmere blend. Finished with natural mother-of-pearl buttons for understated texture.',
    fabricAndCare: [
      '85% Extra-fine merino wool, 15% Cashmere',
      'Hand wash cold; reshape and dry flat',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dusty Lilac', hex: '#B4A1BC' },
      { name: 'Soft Lavender', hex: '#B9A2F4' },
    ],
  },
  {
    id: 'prod-crossbody-07',
    slug: 'plum-leather-crossbody',
    name: 'Plum Leather Crossbody',
    category: 'Accessories',
    collection: 'Everyday Carry',
    price: 92.0,
    rating: 4.9,
    reviewCount: 63,
    image: '/src/assets/images/prod_crossbody_bag_1795096794850.jpg',
    badge: 'New',
    isNewArrival: true,
    description:
      'Structured geometric flap bag handcrafted from full-grain vegetable-tanned leather in deep plum-navy. Features brushed silver clasp closure, suede-lined interior pocket, and adjustable strap.',
    fabricAndCare: [
      '100% Full-grain Italian calf leather',
      'Brushed stainless steel hardware',
      'Store in included cotton dust bag',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Plum Navy', hex: '#342B47' },
      { name: 'Obsidian Black', hex: '#17172B' },
    ],
  },
  {
    id: 'prod-trousers-08',
    slug: 'pleated-wool-trousers',
    name: 'Pleated Slate Trousers',
    category: 'Men',
    collection: 'Studio Monochrome',
    price: 84.0,
    rating: 4.8,
    reviewCount: 47,
    image: '/src/assets/images/prod_wool_trousers_1795096795056.jpg',
    badge: 'New',
    isNewArrival: true,
    description:
      'Double front pleats create an elevated, fluid drape from hip to hem. Woven from breathable Italian suiting wool with concealed hook-and-bar closure and coin welt pocket.',
    fabricAndCare: [
      '96% Tropical virgin wool, 4% Elastane',
      'Relaxed wide-leg tailored fit',
      'Dry clean or steam refresh',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Slate Navy', hex: '#282B3A' },
      { name: 'Charcoal', hex: '#3F3F46' },
    ],
  },
  {
    id: 'prod-tote-09',
    slug: 'minimalist-pebble-tote',
    name: 'Minimalist Pebble Tote',
    category: 'Accessories',
    collection: 'Everyday Carry',
    price: 118.0,
    originalPrice: 138.0,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 85,
    image: '/src/assets/images/cat_accessories_bag_1795096795864.jpg',
    badge: 'Sale',
    description:
      'An everyday work-to-weekend structured tote sized for a 14-inch laptop and daily essentials. Crafted in supple pebbled leather with reinforced top handles and turn-lock hardware.',
    fabricAndCare: [
      '100% Full-grain pebbled leather',
      'Interior padded laptop sleeve & zip pocket',
      'Condition leather seasonally',
    ],
    sizes: ['One Size'],
    colors: [{ name: 'Jet Black', hex: '#17172B' }],
  },
  {
    id: 'prod-court-10',
    slug: 'atelier-court-sneakers',
    name: 'Atelier Court Sneakers',
    category: 'Footwear',
    collection: 'Active Stride',
    price: 96.0,
    rating: 4.8,
    reviewCount: 69,
    image: '/src/assets/images/cat_footwear_sneakers_1795096796384.jpg',
    badge: 'Bestseller',
    description:
      'Low-profile heritage court silhouette built from smooth full-grain calfskin and pastel lavender suede panels, set atop a cushioned cupsole for crisp all-day comfort.',
    fabricAndCare: [
      'Full-grain leather & suede upper',
      'Memory-foam cushioned insole',
      'Protect suede with water-repellent spray',
    ],
    sizes: ['37', '38', '39', '40', '41', '42', '43'],
    colors: [{ name: 'White / Lavender', hex: '#B9A2F4' }],
  },
];

export const COLLECTIONS: CollectionCapsule[] = [
  {
    id: 'lavender-core',
    title: 'Lavender Core',
    subtitle: 'Signature Soft Palette',
    description:
      'Our defining capsule of heavyweight cotton fleece, cashmere-blend knits, and tailored ivory coats anchored by serene pastel tones.',
    image: '/src/assets/images/hero_lavender_model_1795096795429.jpg',
    filterCategory: 'Women',
    accentTone: '#EAE3FF',
  },
  {
    id: 'studio-monochrome',
    title: 'Studio Monochrome',
    subtitle: 'Architectural Essentials',
    description:
      'Clean graphic jersey, heavyweight charcoal fleece, and relaxed double-pleated suiting crafted for effortless daily rotation.',
    image: '/src/assets/images/cat_men_editorial_1795096795240.jpg',
    filterCategory: 'Men',
    accentTone: '#F0EFF5',
  },
  {
    id: 'everyday-carry',
    title: 'Everyday Carry',
    subtitle: 'Structured Leather & Caps',
    description:
      'Minimalist pebble-grain totes, plum crossbody silhouettes, and brushed twill headwear engineered for polished utility.',
    image: '/src/assets/images/cat_accessories_bag_1795096795864.jpg',
    filterCategory: 'Accessories',
    accentTone: '#F8F7FC',
  },
  {
    id: 'active-stride',
    title: 'Active Stride',
    subtitle: 'Sculpted Footwear',
    description:
      'Cushioned technical mesh runners and heritage leather court sneakers designed with balanced support and subtle lavender accents.',
    image: '/src/assets/images/cat_footwear_sneakers_1795096796384.jpg',
    filterCategory: 'Footwear',
    accentTone: '#EAE3FF',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Amara Lin',
    location: 'Seattle, WA',
    productPurchased: 'Oversized Lavender Hoodie',
    rating: 5,
    comment:
      'The 420gsm cotton feels genuinely substantial without feeling stiff. The soft lavender shade looks identical to the studio photos and has kept its shape after five washes.',
    date: 'October 2026',
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    location: 'Austin, TX',
    productPurchased: 'CloudStride Runners',
    rating: 5,
    comment:
      'Best everyday sneaker I have picked up this year. Lightweight enough for long walks around the city, and the muted lavender suede elevates simple monochrome outfits.',
    date: 'November 2026',
  },
  {
    id: 'rev-3',
    name: 'Claire Moreau',
    location: 'Chicago, IL',
    productPurchased: 'Plum Leather Crossbody',
    rating: 5,
    comment:
      'Beautiful structured leather and zero flashiness. Fits my phone, keys, and sunglasses cleanly, and delivery arrived two days after placing my order.',
    date: 'November 2026',
  },
];

export const FAQS = [
  {
    question: 'How long does nationwide shipping take?',
    answer:
      'Orders placed before 2:00 PM ship the same business day. Standard nationwide delivery arrives within 2 to 4 business days, and shipping is complimentary on all orders over $75.',
  },
  {
    question: 'How does Cash on Delivery (COD) work?',
    answer:
      'Select Cash on Delivery at checkout and complete your delivery address and phone number. You pay the exact invoice total in cash when your parcel arrives at your doorstep—no card details required online.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer:
      'We offer free 30-day returns and size exchanges on unworn items with original tags attached. Reach out through our Customer Care portal with your order reference to arrange a doorstep pickup.',
  },
  {
    question: 'How do your oversized hoodies and trousers fit?',
    answer:
      'Our Oversized Lavender Hoodie features an intentionally relaxed drop-shoulder fit—take your normal size for a draped look or size down for a closer fit. Tailored trousers run true to waist measurement.',
  },
];
