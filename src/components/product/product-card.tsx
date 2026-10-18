import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { Card } from '@/components/ui/card'
import { SmartImage } from '@/components/common/smart-image'
import { ProductBadges } from '@/components/product/product-badges'
import { WishlistButton } from '@/components/product/wishlist-button'
import { Rating } from '@/components/product/rating'
import { PriceTag } from '@/components/product/price-tag'
import { AddToCartButton } from '@/components/product/add-to-cart-button'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card
      className={`group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop ${className ?? ''}`}
    >
      <div className="relative aspect-square overflow-hidden bg-brand-50">
        <Link to={`/product/${product.slug}`} className="block h-full w-full" tabIndex={-1}>
          <SmartImage
            src={product.image}
            alt={product.name}
            fallback={product.emoji}
            tone={product.categorySlug}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-2.5 top-2.5">
          <ProductBadges product={product} />
        </div>
        <WishlistButton
          productId={product.id}
          productName={product.name}
          size="sm"
          className="absolute right-2.5 top-2.5"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <Link to={`/product/${product.slug}`} className="group/name">
          <h3 className="font-display text-sm font-semibold leading-snug text-ink transition-colors group-hover/name:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-ink-muted">{product.unit}</span>
          <Rating value={product.rating} showValue={false} />
        </div>
        <div className="mt-auto pt-1.5">
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
        </div>
        <div className="mt-2">
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </Card>
  )
}