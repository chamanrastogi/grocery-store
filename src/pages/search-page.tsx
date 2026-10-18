import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PackageSearch, SearchX } from 'lucide-react'
import { searchProducts } from '@/services/api'
import { useDebounce } from '@/hooks/use-debounce'
import { ProductGrid } from '@/components/product/product-grid'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { SearchBar } from '@/components/navigation/search-bar'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const rawQuery = searchParams.get('q') ?? ''
  const query = useDebounce(rawQuery.trim(), 250)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['search-page', query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  })

  const results = useMemo(() => data ?? [], [data])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {query ? `Results for “${query}”` : 'Search'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {query ? `${results.length} product${results.length === 1 ? '' : 's'} found` : 'Type to search our aisles.'}
        </p>
      </div>

      <SearchBar className="mb-8 max-w-xl" defaultValue={rawQuery} />

      {query === '' ? (
        <EmptyState
          icon={SearchX}
          title="Search our aisles"
          description="Try “tomatoes”, “milk”, “paneer” or “granola” to find what you need."
        />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <ProductGrid isLoading skeletonCount={8} />
      ) : results.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title={`Nothing for “${query}”`}
          description="We couldn't find a match. Check the spelling or try a broader term."
        />
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  )
}