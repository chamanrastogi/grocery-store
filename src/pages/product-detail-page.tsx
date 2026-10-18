import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Minus, Plus, RefreshCcw, ShieldCheck, Truck } from 'lucide-react'
import { fetchProduct, fetchRelated } from '@/services/api'
import type { Product } from '@/types'
import { SmartImage } from '@/components/common/smart-image'
import { ProductBadges } from '@/components/product/product-badges'
import { WishlistButton } from '@/components/product/wishlist-button'
import { Rating } from '@/components/product/rating'
import { PriceTag } from '@/components/product/price-tag'
import { ProductSection } from '@/components/product/product-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { NotFoundPage } from '@/pages/not-found-page'
import { useCartStore } from '@/stores/cart-store'
import { useToast } from '@/components/ui/use-toast'
import { discountPercent, formatDate, formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const query = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug!),
    enabled: !!slug,
  })

  if (query.isLoading) return <ProductDetailSkeleton />
  if (query.isError || !query.data) return <NotFoundPage />

  return <ProductDetail product={query.data} />
}

function ProductDetail({ product }: { product: Product }) {
  const relatedQuery = useQuery({
    queryKey: ['related', product.slug],
    queryFn: () => fetchRelated(product, 4),
    staleTime: 60_000,
  })

  const categoryName = product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link to={`/category/${product.categorySlug}`} className="hover:text-brand-700">{categoryName}</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="truncate text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Gallery product={product} />
        <Info product={product} />
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({product.reviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="neutral">{tag}</Badge>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nutrition">
          <div className="grid max-w-xl gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {product.nutrition.length === 0 ? (
              <p className="col-span-full bg-surface p-4 text-sm text-ink-muted">
                Nutrition information is not available for this item.
              </p>
            ) : (
              product.nutrition.map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-surface p-4">
                  <span className="text-sm text-ink-soft">{item.label}</span>
                  <span className="text-sm font-semibold text-ink">{item.value}</span>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          {product.reviews.length === 0 ? (
            <p className="max-w-xl text-sm text-ink-muted">
              No reviews yet. Be the first to share how this product was for you.
            </p>
          ) : (
            <div className="grid max-w-3xl gap-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 font-display text-xs font-bold text-brand-700">
                        {review.author.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {review.author}
                          {review.verified ? (
                            <span className="ml-1.5 text-xs font-medium text-brand-700">· Verified buyer</span>
                          ) : null}
                        </p>
                        <p className="text-xs text-ink-muted">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    <Rating value={review.rating} showValue={false} />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-ink">{review.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <ProductSection
          title="You might also like"
          products={relatedQuery.data}
          isLoading={relatedQuery.isLoading}
          skeletonCount={4}
        />
      </div>
    </div>
  )
}

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const images = product.gallery.length > 0 ? product.gallery : [product.image]

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-brand-50">
        <SmartImage
          src={images[active]}
          alt={product.name}
          fallback={product.emoji}
          tone={product.categorySlug}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4">
          <ProductBadges product={product} />
        </div>
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={active === index}
              className={cn(
                'h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors',
                active === index ? 'border-brand-600' : 'border-line hover:border-brand-300',
              )}
            >
              <SmartImage src={image} alt="" fallback={product.emoji} tone={product.categorySlug} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Info({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id ?? null)
  const addItem = useCartStore((s) => s.addItem)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const { toast } = useToast()

  const discount = product.originalPrice ? discountPercent(product.originalPrice, product.price) : 0
  const outOfStock = product.stock <= 0

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      unit: product.unit,
      price: product.price,
      originalPrice: product.originalPrice,
      maxStock: product.stock,
      quantity,
    })
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} added to your cart.`,
      variant: 'success',
    })
    openDrawer()
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="fresh">In {product.categorySlug}</Badge>
        {product.badges.map((badge) => (
          <Badge key={badge} variant={badge === 'deal' ? 'deal' : badge === 'fresh' ? 'fresh' : 'default'}>
            {badge.replace('-', ' ')}
          </Badge>
        ))}
      </div>

      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {product.name}
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Rating value={product.rating} count={product.ratingCount} />
        <span className="text-sm text-ink-muted">· {product.brand}</span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          priceClassName="text-3xl"
        />
        {discount > 0 ? <Badge variant="deal">{discount}% OFF</Badge> : null}
      </div>
      <p className="mt-1 text-sm text-ink-muted">
        Inclusive of all taxes · Sold in unit of {product.unit}
      </p>

      <Separator className="my-6" />

      {product.variants && product.variants.length > 0 ? (
        <div className="mb-6">
          <p className="mb-2 font-display text-sm font-semibold text-ink">Pack size</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pack size">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                role="radio"
                aria-checked={selectedVariant === variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={cn(
                  'rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors',
                  selectedVariant === variant.id
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-line-strong text-ink-soft hover:border-brand-300',
                )}
              >
                {variant.label} · {formatPrice(variant.price)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </Button>
          <span className="w-10 text-center font-display text-base font-semibold text-ink" aria-live="polite">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase quantity"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <Button size="lg" className="flex-1 sm:flex-none sm:min-w-48" onClick={handleAdd} disabled={outOfStock}>
          {outOfStock ? 'Out of stock' : 'Add to Cart'}
        </Button>

        <WishlistButton productId={product.id} productName={product.name} />
      </div>

      {outOfStock ? (
        <p className="mt-3 text-sm font-medium text-tangerine-600">
          This item is currently out of stock. Check back soon.
        </p>
      ) : (
        <p className="mt-3 text-sm text-ink-muted">
          {product.stock <= 10 ? (
            <span className="font-medium text-tangerine-600">
              Only {product.stock} left in stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              In stock · Ready to ship
            </span>
          )}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
          <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-ink">Fast delivery</p>
            <p className="text-xs text-ink-muted">In 30 minutes with express slot</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
          <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-ink">Easy returns</p>
            <p className="text-xs text-ink-muted">Freshness promise on every item</p>
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-ink-muted">
        <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
        Secure payment · UPI, cards, net banking & COD
      </p>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="h-4 w-64 rounded bg-line" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-square rounded-2xl bg-line" />
        <div className="space-y-4">
          <div className="h-5 w-24 rounded bg-line" />
          <div className="h-9 w-3/4 rounded bg-line" />
          <div className="h-4 w-48 rounded bg-line" />
          <div className="h-10 w-32 rounded bg-line" />
          <div className="h-12 w-full rounded bg-line" />
        </div>
      </div>
    </div>
  )
}