import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Leaf, ShieldCheck, Truck, Timer } from 'lucide-react'
import { fetchCategories, fetchProducts } from '@/services/api'
import { CategoryGrid } from '@/components/category/category-grid'
import { ProductSection } from '@/components/product/product-section'
import { SectionHeader } from '@/components/common/section-header'
import { Button } from '@/components/ui/button'
import { SmartImage } from '@/components/common/smart-image'
import { unsplash } from '@/data/images'
import { useToast } from '@/components/ui/use-toast'

export function HomePage() {
  const { toast } = useToast()

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  })

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 60_000,
  })

  const products = productsQuery.data ?? []
  const freshPicks = products.filter((p) => p.isFreshPick)
  const bestSellers = products.filter((p) => p.isBestSeller)
  const deals = products.filter((p) => p.isDeal).slice(0, 8)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <HeroBanner />

      <TrustStrip />

      <section aria-label="Categories" className="py-6">
        <SectionHeader title="Shop by category" subtitle="Everything fresh, organised the way you think about food." />
        <CategoryGrid categories={categoriesQuery.data} isLoading={categoriesQuery.isLoading} />
      </section>

      <section aria-label="Fresh picks" className="py-6">
        <ProductSection
          title="Fresh Picks"
          subtitle="Picked this morning, delivered today."
          viewAllHref="/products"
          products={freshPicks}
          isLoading={productsQuery.isLoading}
          skeletonCount={4}
        />
      </section>

      <section aria-label="Deals" className="py-6">
        <ProductSection
          title="Deals of the Day"
          subtitle="Grab them before they're gone."
          viewAllHref="/products?deal=1"
          products={deals}
          isLoading={productsQuery.isLoading}
          skeletonCount={4}
        />
      </section>

      <section aria-label="Best sellers" className="py-6">
        <ProductSection
          title="Best Sellers"
          subtitle="Loved by thousands of households."
          viewAllHref="/products?sort=popular"
          products={bestSellers}
          isLoading={productsQuery.isLoading}
          skeletonCount={4}
        />
      </section>

      <section aria-label="Why shop with us" className="py-6">
        <SectionHeader title="Why Greengrocer" />
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <FeatureCard
            icon={Timer}
            title="30-minute delivery"
            text="Express slots across Mumbai, so dinner is never late."
          />
          <FeatureCard
            icon={Leaf}
            title="Farm-fresh daily"
            text="Fruit, vegetables and dairy sourced every single morning."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Freshness promise"
            text="Not happy with an item? We replace it or refund it, no questions."
          />
        </div>
      </section>

      <section aria-label="Easy reorder banner" className="py-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Save time. Reorder in one tap.
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Your past orders are saved — reorder the whole basket or just one item.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => {
              toast({ title: 'Coming soon', description: 'One-tap reorder is almost here.', variant: 'default' })
            }}
          >
            Reorder now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </div>
  )
}

function HeroBanner() {
  return (
    <section
      aria-label="Welcome"
      className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200"
    >
      <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand-700 shadow-float">
            <Truck className="h-3.5 w-3.5" aria-hidden="true" />
            Same-day delivery · Free over ₹499
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Fresh groceries.
            <br />
            Delivered to your door.
          </h1>
          <p className="mt-3 max-w-md text-base text-ink-soft">
            Get fresh fruits, vegetables, dairy and everyday essentials at great prices — from
            farm to kitchen in under an hour.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/products">Shop now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-brand-300 bg-surface/60 hover:bg-surface">
              <Link to="/category/fruits">Explore fruits</Link>
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-brand-600" aria-hidden="true" /> Farm-fresh daily
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" /> Freshness promise
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroImage
            src={unsplash('1601004890684-d8cbf643f5f2', 640)}
            alt="Fresh fruits"
            emoji="🍎"
            tone="fruits"
            className="mt-8"
          />
          <HeroImage
            src={unsplash('1542838132-92c53300491e', 640)}
            alt="Fresh vegetables"
            emoji="🥬"
            tone="vegetables"
          />
          <HeroImage
            src={unsplash('1550583724-b2692b85b150', 640)}
            alt="Dairy products"
            emoji="🥛"
            tone="dairy"
            className="col-span-2 h-36"
          />
        </div>
      </div>
    </section>
  )
}

function HeroImage({
  src,
  alt,
  emoji,
  tone,
  className = '',
}: {
  src: string
  alt: string
  emoji: string
  tone: string
  className?: string
}) {
  return (
    <div className={`h-40 overflow-hidden rounded-xl shadow-card ${className}`}>
      <SmartImage src={src} alt={alt} fallback={emoji} tone={tone} className="h-full w-full object-cover" />
    </div>
  )
}

function TrustStrip() {
  const items = [
    { icon: Truck, label: '30-min express delivery' },
    { icon: Leaf, label: 'Farm-fresh, daily' },
    { icon: ShieldCheck, label: 'Freshness promise' },
    { icon: Timer, label: 'Flexible delivery slots' },
  ]
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <Icon className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
          </span>
          <span className="text-xs font-medium leading-tight text-ink-soft sm:text-[13px]">{label}</span>
        </div>
      ))}
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{text}</p>
    </div>
  )
}