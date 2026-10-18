import { useState } from 'react'
import { PackageSearch, SlidersHorizontal } from 'lucide-react'
import { useProductBrowse } from '@/features/products/use-product-browse'
import { FilterSidebar } from '@/components/product/filter-sidebar'
import { ProductGrid } from '@/components/product/product-grid'
import { ErrorState } from '@/components/common/error-state'
import { EmptyState } from '@/components/common/empty-state'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utils/cn'

interface ProductsPageProps {
  title?: string
  subtitle?: string
  initialCategorySlug?: string
}

export function ProductsPage({ title = 'All Products', subtitle, initialCategorySlug }: ProductsPageProps) {
  const browse = useProductBrowse(initialCategorySlug)
  const [visibleCount, setVisibleCount] = useState(12)

  const filteredProducts = browse.products ?? []
  const shownProducts = filteredProducts.slice(0, visibleCount)

  const handleClearFilters = () => {
    browse.clearFilters()
    setVisibleCount(12)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-ink-muted">{subtitle}</p> : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <FilterSidebar
          categories={browse.categories}
          brands={browse.brands}
          filters={browse.filters}
          onChange={(patch) => {
            browse.patchFilters(patch)
            setVisibleCount(12)
          }}
          onClear={handleClearFilters}
          className="hidden lg:block"
        />

        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-muted" aria-live="polite">
              {browse.productsLoading
                ? 'Loading products…'
                : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => browse.setFiltersOpen(true)}
                aria-haspopup="dialog"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filter
                {browse.activeFilterCount > 0 ? (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">
                    {browse.activeFilterCount}
                  </span>
                ) : null}
              </Button>
              <label htmlFor="sort-select" className="sr-only">
                Sort products
              </label>
              <Select
                value={browse.sort}
                onValueChange={(value) => {
                  setVisibleCount(12)
                  browse.setSort(value as typeof browse.sort)
                }}
              >
                <SelectTrigger id="sort-select" className="w-[180px]" aria-label="Sort products">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: 'popular', label: 'Most popular' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Top rated' },
                    { value: 'newest', label: 'Newest' },
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {browse.productsError ? (
            <ErrorState onRetry={browse.refetch} />
          ) : browse.productsLoading ? (
            <ProductGrid isLoading skeletonCount={12} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              description="Try adjusting your filters or clearing a few to see more groceries."
              actionLabel="Clear filters"
              onAction={handleClearFilters}
            />
          ) : (
            <>
              <ProductGrid products={shownProducts} />
              {shownProducts.length < filteredProducts.length ? (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((count) => count + 12)}
                    className="min-w-40"
                  >
                    Show more
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <Sheet open={browse.filtersOpen} onOpenChange={browse.setFiltersOpen}>
        <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your grocery search.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterSidebar
              categories={browse.categories}
              brands={browse.brands}
              filters={browse.filters}
              onChange={(patch) => {
                browse.patchFilters(patch)
                setVisibleCount(12)
              }}
              onClear={handleClearFilters}
              className={cn('pb-6')}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}