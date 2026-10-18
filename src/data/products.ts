import type { Product, Review } from '@/types'
import { unsplash } from '@/data/images'

type ProductSeed = Omit<Product, 'gallery' | 'reviews' | 'isBestSeller' | 'isDeal' | 'isFreshPick'> & {
  gallery?: string[]
  reviews?: Review[]
  isBestSeller?: boolean
  isDeal?: boolean
  isFreshPick?: boolean
}

function p(seed: ProductSeed): Product {
  return {
    gallery: seed.gallery ?? [seed.image],
    reviews: seed.reviews ?? [],
    isBestSeller: seed.isBestSeller ?? false,
    isDeal: seed.isDeal ?? false,
    isFreshPick: seed.isFreshPick ?? false,
    ...seed,
  }
}

const reviews: Record<string, Review[]> = {
  tomatoes: [
    { id: 'r1', author: 'Priya S.', rating: 5, date: '2026-08-10', title: 'Firm and fresh', body: 'Came in great condition, perfectly ripe and firm. Delivery was quick.', verified: true },
    { id: 'r2', author: 'Rahul M.', rating: 4, date: '2026-07-28', title: 'Good value', body: 'Tasty tomatoes for the price. A couple were a bit soft but overall good.', verified: true },
  ],
  mangoes: [
    { id: 'r3', author: 'Anita K.', rating: 5, date: '2026-08-05', title: 'Sweetest of the season', body: 'These Alphonsos were unbelievably sweet and fibreless. Will reorder.', verified: true },
  ],
  milk: [
    { id: 'r4', author: 'Vikram T.', rating: 5, date: '2026-08-12', title: 'Fresh every time', body: 'Always fresh with a good shelf life. Our everyday staple.', verified: true },
  ],
  bread: [
    { id: 'r5', author: 'Sneha R.', rating: 4, date: '2026-08-02', title: 'Soft slices', body: 'Soft and stays fresh for days. Great for sandwiches.', verified: true },
  ],
  chicken: [
    { id: 'r6', author: 'Arjun D.', rating: 5, date: '2026-08-09', title: 'Really fresh', body: 'Skinless and trimmed well. No smell at all, clearly fresh.', verified: true },
  ],
  strawberries: [
    { id: 'r7', author: 'Meera J.', rating: 5, date: '2026-08-07', title: 'Juicy', body: 'Sweet, red and juicy. Kids finished them in a day!', verified: true },
  ],
  curd: [
    { id: 'r8', author: 'Neha P.', rating: 4, date: '2026-07-30', title: 'Thick and creamy', body: 'Good thickness, perfect for raita and smoothies.', verified: true },
  ],
  spinach: [
    { id: 'r9', author: 'Ravi N.', rating: 5, date: '2026-08-01', title: 'Clean leaves', body: 'Well washed and fresh. No yellow leaves at all.', verified: true },
  ],
  orange: [
    { id: 'r10', author: 'Farah A.', rating: 4, date: '2026-07-25', title: 'No added sugar', body: 'Tastes like real oranges, slightly tart. Great for mornings.', verified: true },
  ],
  icecream: [
    { id: 'r11', author: 'Kunal B.', rating: 5, date: '2026-08-14', title: 'Creamy', body: 'Arrived still frozen solid. Rich vanilla flavour.', verified: true },
  ],
}

export const products: Product[] = [
  p({
    id: 'p1', slug: 'fresh-tomatoes', name: 'Fresh Tomatoes', categorySlug: 'vegetables', brand: 'Farm Fresh', emoji: '🍅',
    image: unsplash('1576045057995-568f588f82fb'), unit: '1 kg', price: 80, originalPrice: 100,
    rating: 4.8, ratingCount: 1842, stock: 60, tags: ['farm fresh', 'local'],
    badges: ['deal', 'fresh'], description: 'Vine-ripened tomatoes with a firm texture and deep red colour. Great for curries, salads and sandwiches.',
    nutrition: [
      { label: 'Energy', value: '18 kcal / 100g' }, { label: 'Vitamin C', value: '14 mg / 100g' }, { label: 'Fibre', value: '1.2 g / 100g' },
    ],
    reviews: reviews.tomatoes, isBestSeller: true, isDeal: true, isFreshPick: true,
  }),
  p({
    id: 'p2', slug: 'onions', name: 'Onions', categorySlug: 'vegetables', brand: 'Farm Fresh', emoji: '🧅',
    image: unsplash('1518977651021-c8d6b25f4f1d'), unit: '1 kg', price: 35, rating: 4.6, ratingCount: 912, stock: 120,
    tags: ['bulk'], badges: ['fresh'],
    description: 'Crisp, medium-sized red onions with a strong flavour. A kitchen essential for every Indian household.',
    nutrition: [{ label: 'Energy', value: '40 kcal / 100g' }, { label: 'Vitamin C', value: '7 mg / 100g' }],
    isFreshPick: true,
  }),
  p({
    id: 'p3', slug: 'potatoes', name: 'Potatoes', categorySlug: 'vegetables', brand: 'Farm Fresh', emoji: '🥔',
    image: unsplash('1518977728891-1095f0b4f83e'), unit: '1 kg', price: 30, rating: 4.5, ratingCount: 1104, stock: 140,
    tags: ['bulk'], badges: [],
    description: 'Fresh, evenly sized potatoes that mash, fry and roast beautifully. Ideal for aloo sabzi and fries.',
    nutrition: [{ label: 'Energy', value: '77 kcal / 100g' }, { label: 'Potassium', value: '421 mg / 100g' }],
    isFreshPick: true,
  }),
  p({
    id: 'p4', slug: 'spinach', name: 'Spinach (Palak)', categorySlug: 'vegetables', brand: 'Organic Valley', emoji: '🥬',
    image: unsplash('1576045057995-568f588f82fb'), unit: '250 g', price: 25, originalPrice: 30,
    rating: 4.7, ratingCount: 520, stock: 45, tags: ['leafy'], badges: ['fresh'],
    description: 'Tender, dark-green palak leaves harvested the same morning. Great for palak paneer and smoothies.',
    nutrition: [{ label: 'Iron', value: '2.7 mg / 100g' }, { label: 'Vitamin K', value: '483 mcg / 100g' }, { label: 'Fibre', value: '2.2 g / 100g' }],
    reviews: reviews.spinach, isFreshPick: true,
  }),
  p({
    id: 'p5', slug: 'cauliflower', name: 'Cauliflower', categorySlug: 'vegetables', brand: 'Farm Fresh', emoji: '🥦',
    image: unsplash('1540420773420-3366772f4999'), unit: '1 pc', price: 45, rating: 4.4, ratingCount: 310, stock: 55,
    tags: ['seasonal'], badges: [],
    description: 'Compact white heads with tight florets. Perfect for gobi manchurian and sabzi.',
    nutrition: [{ label: 'Vitamin C', value: '48 mg / 100g' }, { label: 'Fibre', value: '2 g / 100g' }],
  }),
  p({
    id: 'p6', slug: 'mixed-salad-greens', name: 'Mixed Salad Greens', categorySlug: 'vegetables', brand: 'Organic Valley', emoji: '🥗',
    image: unsplash('1512621776951-a57141f2eefd'), unit: '200 g', price: 89, rating: 4.6, ratingCount: 205, stock: 30,
    tags: ['organic', 'leafy'], badges: ['organic'],
    description: 'A crisp mix of lettuce, rocket and baby spinach, washed and ready to serve.',
    nutrition: [{ label: 'Vitamin A', value: '740 mcg / 100g' }, { label: 'Fibre', value: '2 g / 100g' }],
  }),
  p({
    id: 'p7', slug: 'cucumber', name: 'Cucumber', categorySlug: 'vegetables', brand: 'Farm Fresh', emoji: '🥒',
    image: unsplash('1567135860058-8f24ac5f3b5b'), unit: '500 g', price: 28, rating: 4.5, ratingCount: 640, stock: 80,
    tags: ['salad'], badges: [],
    description: 'Cool, crisp cucumbers with thin skin. Great for salads, raita and detox water.',
    nutrition: [{ label: 'Water', value: '95%' }, { label: 'Vitamin K', value: '16 mcg / 100g' }],
  }),
  p({
    id: 'p8', slug: 'bananas', name: 'Bananas (Robusta)', categorySlug: 'fruits', brand: 'Farm Fresh', emoji: '🍌',
    image: unsplash('1560806887-1e4cd0b6cbd6'), unit: '1 kg', price: 54, rating: 4.7, ratingCount: 1502, stock: 100,
    tags: ['natural'], badges: ['fresh', 'deal'], description: 'Naturally ripened robusta bananas, sweet and energy-packed. Great for breakfast and smoothies.',
    nutrition: [{ label: 'Energy', value: '89 kcal / 100g' }, { label: 'Potassium', value: '358 mg / 100g' }],
    isBestSeller: true, isDeal: true, isFreshPick: true,
  }),
  p({
    id: 'p9', slug: 'red-apples', name: 'Red Apples', categorySlug: 'fruits', brand: 'Himachal Fresh', emoji: '🍎',
    image: unsplash('1568702846914-96b305d2aaeb'), unit: '1 kg', price: 160, originalPrice: 190,
    rating: 4.6, ratingCount: 880, stock: 70, tags: ['imported', 'crisp'], badges: ['deal'],
    description: 'Crisp, juicy red apples from the hills. Perfectly balanced sweet-tart taste.',
    nutrition: [{ label: 'Fibre', value: '2.4 g / 100g' }, { label: 'Vitamin C', value: '4.6 mg / 100g' }],
    isDeal: true,
  }),
  p({
    id: 'p10', slug: 'strawberries', name: 'Strawberries', categorySlug: 'fruits', brand: 'Mahableshwar', emoji: '🍓',
    image: unsplash('1567306226416-28f0efdc88ce'), unit: '500 g', price: 210, rating: 4.8, ratingCount: 460, stock: 25,
    tags: ['seasonal', 'premium'], badges: ['limited'],
    description: 'Plump, ruby-red strawberries with intense sweetness. A seasonal treat best enjoyed fresh.',
    nutrition: [{ label: 'Vitamin C', value: '59 mg / 100g' }, { label: 'Manganese', value: '0.4 mg / 100g' }],
    reviews: reviews.strawberries, isFreshPick: true,
  }),
  p({
    id: 'p11', slug: 'alphonso-mangoes', name: 'Alphonso Mangoes', categorySlug: 'fruits', brand: 'Ratnagiri', emoji: '🥭',
    image: unsplash('1553279768-865429fa0078'), unit: '2 pc', price: 249, originalPrice: 299,
    rating: 4.9, ratingCount: 1203, stock: 40, tags: ['premium', 'seasonal'], badges: ['best-seller', 'deal'],
    description: 'The king of mangoes from Ratnagiri. Fibreless, golden and intensely aromatic.',
    nutrition: [{ label: 'Vitamin A', value: '54 mcg / 100g' }, { label: 'Vitamin C', value: '36 mg / 100g' }],
    reviews: reviews.mangoes, isBestSeller: true, isDeal: true,
  }),
  p({
    id: 'p12', slug: 'watermelon', name: 'Seedless Watermelon', categorySlug: 'fruits', brand: 'Farm Fresh', emoji: '🍉',
    image: unsplash('1563114773-84221bd62daa'), unit: '1 pc (2.5 kg)', price: 99, rating: 4.5, ratingCount: 390, stock: 50,
    tags: ['seasonal', 'hydrating'], badges: ['fresh'],
    description: 'Cooling, seedless watermelon — 92% water and perfect for a hot afternoon.',
    nutrition: [{ label: 'Water', value: '92%' }, { label: 'Vitamin C', value: '8 mg / 100g' }],
    isFreshPick: true,
  }),
  p({
    id: 'p13', slug: 'seedless-grapes', name: 'Green Seedless Grapes', categorySlug: 'fruits', brand: 'Nashik', emoji: '🍇',
    image: unsplash('1537640538966-79f369143f8f'), unit: '500 g', price: 120, rating: 4.6, ratingCount: 510, stock: 60,
    tags: ['crunchy'], badges: [],
    description: 'Crunchy, sweet green grapes with no seeds. A great snack for kids.',
    nutrition: [{ label: 'Vitamin K', value: '14.6 mcg / 100g' }, { label: 'Copper', value: '0.13 mg / 100g' }],
  }),
  p({
    id: 'p14', slug: 'whole-milk', name: 'Whole Milk', categorySlug: 'dairy', brand: 'Daily Farm', emoji: '🥛',
    image: unsplash('1550583724-b2692b85b150'), unit: '1 L', price: 68, originalPrice: 75,
    rating: 4.8, ratingCount: 2231, stock: 150, tags: ['toned'], badges: ['best-seller', 'deal'],
    description: 'Fresh, pasteurised whole milk with 6% fat. Delivered chilled every day.',
    nutrition: [{ label: 'Protein', value: '3.2 g / 100ml' }, { label: 'Calcium', value: '125 mg / 100ml' }],
    reviews: reviews.milk, isBestSeller: true, isDeal: true, isFreshPick: true,
  }),
  p({
    id: 'p15', slug: 'curd', name: 'Curd (Dahi)', categorySlug: 'dairy', brand: 'Daily Farm', emoji: '🍶',
    image: unsplash('1550583724-b2692b85b150'), unit: '400 g', price: 55, rating: 4.7, ratingCount: 930, stock: 90,
    tags: ['probiotic'], badges: [],
    description: 'Thick, creamy curd made from fresh milk. Great for raita, lassi and everyday meals.',
    nutrition: [{ label: 'Protein', value: '4 g / 100g' }, { label: 'Calcium', value: '120 mg / 100g' }],
    reviews: reviews.curd, isFreshPick: true,
  }),
  p({
    id: 'p16', slug: 'cheddar-cheese', name: 'Cheddar Cheese', categorySlug: 'dairy', brand: 'Amul', emoji: '🧀',
    image: unsplash('1541696432-82c6da8ce7bf'), unit: '200 g', price: 165, rating: 4.7, ratingCount: 702, stock: 60,
    tags: ['cheese'], badges: [],
    description: 'Sharp, aged cheddar that melts beautifully for sandwiches, pasta and burgers.',
    nutrition: [{ label: 'Protein', value: '25 g / 100g' }, { label: 'Calcium', value: '721 mg / 100g' }],
  }),
  p({
    id: 'p17', slug: 'paneer', name: 'Fresh Paneer', categorySlug: 'dairy', brand: 'Daily Farm', emoji: '🧀',
    image: unsplash('1615485925600-97237c4fc1ec'), unit: '200 g', price: 95, rating: 4.6, ratingCount: 1180, stock: 75,
    tags: ['protein'], badges: ['fresh'],
    description: 'Soft, fresh paneer that stays soft even after frying. Perfect for palak paneer and curries.',
    nutrition: [{ label: 'Protein', value: '18 g / 100g' }, { label: 'Fat', value: '20 g / 100g' }],
    isBestSeller: true,
  }),
  p({
    id: 'p18', slug: 'butter', name: 'Unsalted Butter', categorySlug: 'dairy', brand: 'Daily Farm', emoji: '🧈',
    image: unsplash('1589985270826-4b7bb135bc9d'), unit: '100 g', price: 62, rating: 4.6, ratingCount: 460, stock: 85,
    tags: ['cooking'], badges: [],
    description: 'Creamy unsalted butter churned from fresh cream. Ideal for baking and spreads.',
    nutrition: [{ label: 'Fat', value: '81 g / 100g' }, { label: 'Vitamin A', value: '684 mcg / 100g' }],
  }),
  p({
    id: 'p19', slug: 'multigrain-bread', name: 'Multigrain Bread', categorySlug: 'bakery', brand: 'Fresh Oven', emoji: '🍞',
    image: unsplash('1509440159596-0249088772ff'), unit: '400 g', price: 55, originalPrice: 60,
    rating: 4.5, ratingCount: 890, stock: 45, tags: ['baked today'], badges: ['fresh'],
    description: 'Soft multigrain loaf packed with oats, millets and seeds. Baked fresh this morning.',
    nutrition: [{ label: 'Fibre', value: '6 g / 100g' }, { label: 'Protein', value: '11 g / 100g' }],
    reviews: reviews.bread, isFreshPick: true,
  }),
  p({
    id: 'p20', slug: 'butter-croissants', name: 'Butter Croissants', categorySlug: 'bakery', brand: 'Fresh Oven', emoji: '🥐',
    image: unsplash('1555507036-ab1f4038808a'), unit: '2 pc', price: 89, rating: 4.7, ratingCount: 340, stock: 20,
    tags: ['artisan'], badges: ['limited'],
    description: 'Flaky, golden croissants laminated with real butter. Best enjoyed warm.',
    nutrition: [{ label: 'Energy', value: '406 kcal / 100g' }, { label: 'Fat', value: '21 g / 100g' }],
  }),
  p({
    id: 'p21', slug: 'sourdough-loaf', name: 'Sourdough Loaf', categorySlug: 'bakery', brand: 'Fresh Oven', emoji: '🍞',
    image: unsplash('1586444248902-2f64eddc13df'), unit: '500 g', price: 139, rating: 4.8, ratingCount: 210, stock: 18,
    tags: ['artisan', 'fermented'], badges: ['new'],
    description: 'Slow-fermented sourdough with a crackly crust and airy crumb. Naturally leavened.',
    nutrition: [{ label: 'Fibre', value: '4.2 g / 100g' }, { label: 'Protein', value: '10 g / 100g' }],
  }),
  p({
    id: 'p22', slug: 'pav-buns', name: 'Pav Buns', categorySlug: 'bakery', brand: 'Fresh Oven', emoji: '🥯',
    image: unsplash('1608198093002-ad4e6c47589f'), unit: '6 pc', price: 45, rating: 4.6, ratingCount: 680, stock: 60,
    tags: ['street food'], badges: [],
    description: 'Soft, pillowy pav buns — the perfect companion to bhaji, vada and jams.',
    nutrition: [{ label: 'Energy', value: '280 kcal / 100g' }, { label: 'Carbohydrates', value: '56 g / 100g' }],
  }),
  p({
    id: 'p23', slug: 'chicken-breast', name: 'Skinless Chicken Breast', categorySlug: 'meat', brand: 'Pure Meat', emoji: '🍗',
    image: unsplash('1604503468506-a8da13d82791'), unit: '500 g', price: 185, originalPrice: 210,
    rating: 4.7, ratingCount: 950, stock: 40, tags: ['lean', 'protein'], badges: ['fresh', 'deal'],
    description: 'Skinless, boneless chicken breast, trimmed and packed in cold chain. High in protein, low in fat.',
    nutrition: [{ label: 'Protein', value: '31 g / 100g' }, { label: 'Fat', value: '3.6 g / 100g' }],
    reviews: reviews.chicken, isBestSeller: true, isDeal: true,
  }),
  p({
    id: 'p24', slug: 'eggs', name: 'Farm Eggs', categorySlug: 'meat', brand: 'Pure Meat', emoji: '🥚',
    image: unsplash('1506976785307-8732e854ad03'), unit: '12 pc', price: 98, originalPrice: 110,
    rating: 4.8, ratingCount: 1520, stock: 200, tags: ['protein'], badges: ['best-seller'],
    description: 'Free-range farm eggs with rich, golden yolks. A complete source of protein.',
    nutrition: [{ label: 'Protein', value: '13 g / egg' }, { label: 'Choline', value: '147 mg / egg' }],
    isBestSeller: true,
  }),
  p({
    id: 'p25', slug: 'basa-fillets', name: 'Basa Fish Fillets', categorySlug: 'meat', brand: 'Ocean Catch', emoji: '🐟',
    image: unsplash('1615141982883-c7ad0e69fd62'), unit: '500 g', price: 260, rating: 4.5, ratingCount: 320, stock: 25,
    tags: ['seafood', 'boneless'], badges: ['fresh'],
    description: 'Mild, white basa fillets, cleaned and de-skinned. Quick to cook and family friendly.',
    nutrition: [{ label: 'Protein', value: '13 g / 100g' }, { label: 'Omega-3', value: '0.3 g / 100g' }],
  }),
  p({
    id: 'p26', slug: 'chicken-drumsticks', name: 'Chicken Drumsticks', categorySlug: 'meat', brand: 'Pure Meat', emoji: '🍖',
    image: unsplash('1598515214211-89d3c73ae83b'), unit: '1 kg', price: 240, rating: 4.6, ratingCount: 610, stock: 35,
    tags: ['bbq'], badges: [],
    description: 'Meaty drumsticks, ideal for roasting, grilling and curries. Packed fresh daily.',
    nutrition: [{ label: 'Protein', value: '26 g / 100g' }, { label: 'Fat', value: '10 g / 100g' }],
  }),
  p({
    id: 'p27', slug: 'orange-juice', name: 'Pressed Orange Juice', categorySlug: 'beverages', brand: 'Tropicana', emoji: '🍊',
    image: unsplash('1600271886742-f049cd451bba'), unit: '1 L', price: 145, rating: 4.5, ratingCount: 430, stock: 55,
    tags: ['no sugar'], badges: [],
    description: '100% pressed orange juice with no added sugar. Chilled, tangy and refreshing.',
    nutrition: [{ label: 'Vitamin C', value: '50 mg / 200ml' }, { label: 'Energy', value: '45 kcal / 200ml' }],
    reviews: reviews.orange,
  }),
  p({
    id: 'p28', slug: 'coconut-water', name: 'Coconut Water', categorySlug: 'beverages', brand: 'Raw Pressery', emoji: '🥥',
    image: unsplash('1580912980048-f8d66ff4f1d5'), unit: '1 L', price: 120, rating: 4.4, ratingCount: 280, stock: 40,
    tags: ['natural', 'electrolytes'], badges: [],
    description: 'Fresh, young coconut water rich in electrolytes. The perfect post-workout drink.',
    nutrition: [{ label: 'Potassium', value: '600 mg / 1L' }, { label: 'Energy', value: '19 kcal / 100ml' }],
  }),
  p({
    id: 'p29', slug: 'green-tea', name: 'Green Tea Bags', categorySlug: 'beverages', brand: 'Twinings', emoji: '🍵',
    image: unsplash('1558160074-4d7d8bdf43f6'), unit: '25 bags', price: 175, rating: 4.7, ratingCount: 520, stock: 70,
    tags: ['antioxidant'], badges: [],
    description: 'Light and subtly grassy green tea, gently steamed to preserve flavour and antioxidants.',
    nutrition: [{ label: 'Caffeine', value: '25 mg / cup' }, { label: 'Energy', value: '0 kcal' }],
  }),
  p({
    id: 'p30', slug: 'cold-coffee', name: 'Cold Coffee', categorySlug: 'beverages', brand: 'Bru', emoji: '☕',
    image: unsplash('1461023058943-07fcbe16d735'), unit: '1 L', price: 110, rating: 4.3, ratingCount: 350, stock: 60,
    tags: ['iced', 'caffeine'], badges: [],
    description: 'Ready-to-drink iced coffee with real coffee extract and creamy milk. Keep chilled.',
    nutrition: [{ label: 'Caffeine', value: '30 mg / 100ml' }, { label: 'Energy', value: '62 kcal / 100ml' }],
  }),
  p({
    id: 'p31', slug: 'salted-peanuts', name: 'Roasted Salted Peanuts', categorySlug: 'snacks', brand: 'Act II', emoji: '🥜',
    image: unsplash('1599599810769-bcde5a160d32'), unit: '200 g', price: 65, rating: 4.4, ratingCount: 270, stock: 90,
    tags: ['high protein'], badges: [],
    description: 'Crunchy peanuts roasted to perfection with a light salt. A protein-rich snack.',
    nutrition: [{ label: 'Protein', value: '25 g / 100g' }, { label: 'Fibre', value: '8 g / 100g' }],
  }),
  p({
    id: 'p32', slug: 'oat-cookies', name: 'Oatmeal Cookies', categorySlug: 'snacks', brand: 'Bakers', emoji: '🍪',
    image: unsplash('1590080874088-1e0c73c00a5f'), unit: '400 g', price: 95, originalPrice: 115,
    rating: 4.5, ratingCount: 410, stock: 65, tags: ['wholegrain'], badges: ['deal'],
    description: 'Chewy oatmeal cookies with raisins and a hint of cinnamon. Baked with whole grains.',
    nutrition: [{ label: 'Fibre', value: '4 g / 100g' }, { label: 'Energy', value: '440 kcal / 100g' }],
    isDeal: true,
  }),
  p({
    id: 'p33', slug: 'granola', name: 'Honey Granola', categorySlug: 'snacks', brand: 'Soulfull', emoji: '🥣',
    image: unsplash('1496940960848-270da6c1f5c2'), unit: '500 g', price: 299, rating: 4.7, ratingCount: 380, stock: 40,
    tags: ['breakfast', 'oats'], badges: ['new'],
    description: 'Toasted oats, nuts and seeds glazed with honey. Pairs beautifully with curd or milk.',
    nutrition: [{ label: 'Fibre', value: '7 g / 100g' }, { label: 'Protein', value: '10 g / 100g' }],
  }),
  p({
    id: 'p34', slug: 'dark-chocolate', name: '70% Dark Chocolate', categorySlug: 'snacks', brand: 'Lindt', emoji: '🍫',
    image: unsplash('1551024506-0bccd828d307'), unit: '80 g', price: 189, rating: 4.8, ratingCount: 760, stock: 80,
    tags: ['premium'], badges: [],
    description: 'Intensely rich 70% cocoa dark chocolate with a smooth, lingering finish.',
    nutrition: [{ label: 'Cocoa', value: '70%' }, { label: 'Sugar', value: '28 g / 100g' }],
  }),
  p({
    id: 'p35', slug: 'frozen-peas', name: 'Frozen Green Peas', categorySlug: 'frozen', brand: 'Green Harvest', emoji: '🫛',
    image: unsplash('1626082927389-6cd097d4c51e'), unit: '500 g', price: 85, rating: 4.5, ratingCount: 520, stock: 75,
    tags: ['quick cook'], badges: [],
    description: 'Sweet green peas, blanched and flash-frozen within hours of harvest. Ready in minutes.',
    nutrition: [{ label: 'Fibre', value: '5 g / 100g' }, { label: 'Protein', value: '5 g / 100g' }],
  }),
  p({
    id: 'p36', slug: 'french-fries', name: 'Crinkle French Fries', categorySlug: 'frozen', brand: 'McCain', emoji: '🍟',
    image: unsplash('1573080496219-bb080dd4f877'), unit: '750 g', price: 149, originalPrice: 165,
    rating: 4.6, ratingCount: 890, stock: 50, tags: ['kids favourite'], badges: ['deal'],
    description: 'Crinkle-cut potato fries, ready to bake or fry. A guaranteed crowd pleaser.',
    nutrition: [{ label: 'Energy', value: '140 kcal / 85g' }, { label: 'Fat', value: '5 g / 85g' }],
    isDeal: true,
  }),
  p({
    id: 'p37', slug: 'vanilla-icecream', name: 'Vanilla Ice Cream', categorySlug: 'frozen', brand: 'Amul', emoji: '🍨',
    image: unsplash('1560008581-09826d1de69e'), unit: '1 L', price: 220, originalPrice: 245,
    rating: 4.7, ratingCount: 1200, stock: 45, tags: ['dessert'], badges: ['best-seller'],
    description: 'Creamy French vanilla ice cream made with real vanilla beans and fresh milk.',
    nutrition: [{ label: 'Fat', value: '10 g / 100g' }, { label: 'Energy', value: '207 kcal / 100g' }],
    reviews: reviews.icecream, isBestSeller: true,
  }),
  p({
    id: 'p38', slug: 'chicken-nuggets', name: 'Chicken Nuggets', categorySlug: 'frozen', brand: 'Pure Meat', emoji: '🍗',
    image: unsplash('1562967914-608f82629710'), unit: '300 g', price: 165, rating: 4.4, ratingCount: 310, stock: 30,
    tags: ['quick cook'], badges: [],
    description: 'Juicy, breaded chicken nuggets that bake or air-fry in under 15 minutes.',
    nutrition: [{ label: 'Protein', value: '14 g / 100g' }, { label: 'Energy', value: '250 kcal / 100g' }],
  }),
  p({
    id: 'p39', slug: 'dishwash-liquid', name: 'Lemon Dishwash Liquid', categorySlug: 'household', brand: 'Vim', emoji: '🧴',
    image: unsplash('1585421514738-01798e348b17'), unit: '750 ml', price: 139, originalPrice: 155,
    rating: 4.6, ratingCount: 2100, stock: 110, tags: ['essential'], badges: ['deal'],
    description: 'Concentrated lemon dishwash that cuts through grease. Tough on oil, gentle on hands.',
    nutrition: [],
    isDeal: true,
  }),
  p({
    id: 'p40', slug: 'laundry-detergent', name: 'Front-Load Laundry Detergent', categorySlug: 'household', brand: 'Surf Excel', emoji: '🧺',
    image: unsplash('1582735689369-4fe89db7114c'), unit: '1 kg', price: 189, rating: 4.5, ratingCount: 1560, stock: 90,
    tags: ['essential'], badges: [],
    description: 'Low-foam detergent with stain-removal power, made for front-load machines.',
    nutrition: [],
  }),
  p({
    id: 'p41', slug: 'garbage-bags', name: 'Garbage Bags', categorySlug: 'household', brand: 'Safe Hands', emoji: '🗑️',
    image: unsplash('1604754312978-ff4a9b6c6e1e'), unit: '30 pc', price: 99, rating: 4.3, ratingCount: 640, stock: 120,
    tags: ['essential'], badges: [],
    description: 'Thick, leak-proof garbage bags with easy-tie handles. Bio-degradable option available.',
    nutrition: [],
  }),
  p({
    id: 'p42', slug: 'shampoo', name: 'Nourishing Shampoo', categorySlug: 'personal-care', brand: 'Dove', emoji: '🧴',
    image: unsplash('1556228720-195a672e8a03'), unit: '340 ml', price: 245, originalPrice: 275,
    rating: 4.6, ratingCount: 1820, stock: 95, tags: ['hair care'], badges: ['deal'],
    description: 'Gentle daily shampoo with moisturising cream that repairs and nourishes hair.',
    nutrition: [],
    isDeal: true,
  }),
  p({
    id: 'p43', slug: 'toothpaste', name: 'Fluoride Toothpaste', categorySlug: 'personal-care', brand: 'Colgate', emoji: '🪥',
    image: unsplash('1587011951026-38a676b81c25'), unit: '150 g', price: 85, rating: 4.7, ratingCount: 2410, stock: 130,
    tags: ['oral care'], badges: [],
    description: 'Cavity-fighting fluoride toothpaste with fresh mint flavour for whole-family protection.',
    nutrition: [],
  }),
  p({
    id: 'p44', slug: 'bath-soap', name: 'Moisture Bath Soap', categorySlug: 'personal-care', brand: 'Dove', emoji: '🧼',
    image: unsplash('1604671060736-4e7d5a5f5c1e'), unit: '4 x 125 g', price: 165, originalPrice: 185,
    rating: 4.6, ratingCount: 1330, stock: 85, tags: ['body care'], badges: [],
    description: 'Mild, moisturising bath soaps that leave skin soft and smooth without drying.',
    nutrition: [],
  }),
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .concat(products.filter((p) => p.categorySlug !== product.categorySlug))
    .slice(0, limit)
}