import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { fetchProducts } from '@/services/api'
import { useWishlistStore } from '@/stores/wishlist-store'
import { ProductGrid } from '@/components/product/product-grid'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'

export function WishlistPage() {
  const navigate = useNavigate()
  const ids = useWishlistStore((s) => s.ids)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 60_000,
  })

  const wishlistProducts = (data ?? []).filter((p) => ids.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Your Wishlist
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {ids.length === 0 ? 'Save items you love for later.' : `${wishlistProducts.length} saved item${wishlistProducts.length === 1 ? '' : 's'}`}
        </p>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <ProductGrid isLoading skeletonCount={8} />
      ) : wishlistProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          description="Tap the heart on any product to save it here for later."
          actionLabel="Browse products"
          onAction={() => navigate('/products')}
        />
      ) : (
        <ProductGrid products={wishlistProducts} />
      )}
    </div>
  )
}