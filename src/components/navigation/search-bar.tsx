import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '@/services/api'
import { useDebounce } from '@/hooks/use-debounce'
import { SmartImage } from '@/components/common/smart-image'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  className?: string
  autoFocus?: boolean
  defaultValue?: string
  onNavigate?: () => void
}

export function SearchBar({ className, autoFocus, defaultValue, onNavigate }: SearchBarProps) {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState(defaultValue ?? '')
  const [focused, setFocused] = React.useState(false)
  const debounced = useDebounce(query, 300)

  const { data, isFetching } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchProducts(debounced),
    enabled: debounced.trim().length > 0,
  })

  const showResults = focused && debounced.trim().length > 0

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length === 0) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    onNavigate?.()
  }

  return (
    <div className={cn('relative', className)}>
      <form role="search" onSubmit={submit}>
        <label className="sr-only" htmlFor="global-search">
          Search groceries
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            id="global-search"
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search groceries…"
            className="h-11 w-full rounded-lg border border-line-strong bg-surface pl-9 pr-4 text-sm text-ink shadow-float placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          {isFetching ? (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-ink-muted" aria-hidden="true" />
          ) : null}
        </div>
      </form>

      {showResults && data ? (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-pop">
          {data.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              No results for “{debounced}”. Try “tomatoes” or “milk”.
            </p>
          ) : (
            <ul>
              {data.slice(0, 6).map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-paper"
                  >
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      fallback={product.emoji}
                      tone={product.categorySlug}
                      className="h-11 w-11 rounded-md object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{product.name}</span>
                      <span className="block text-xs text-ink-muted">{product.unit}</span>
                    </span>
                    <span className="font-display text-sm font-semibold text-brand-700">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}