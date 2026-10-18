import type { Category, ProductFilters } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/cn'

interface FilterSidebarProps {
  categories: Category[]
  brands: string[]
  filters: ProductFilters
  onChange: (patch: Partial<ProductFilters>) => void
  onClear: () => void
  className?: string
}

export function FilterSidebar({
  categories,
  brands,
  filters,
  onChange,
  onClear,
  className,
}: FilterSidebarProps) {
  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0) +
    (filters.minRating !== null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.dealOnly ? 1 : 0)

  const toggleInArray = (list: string[], value: string): string[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-ink">Filters</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-brand-700 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            Clear all ({activeCount})
          </button>
        ) : null}
      </div>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-display text-sm font-semibold text-ink">Category</legend>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink"
            >
              <Checkbox
                checked={filters.categories.includes(category.slug)}
                onCheckedChange={() =>
                  onChange({ categories: toggleInArray(filters.categories, category.slug) })
                }
                aria-label={`Filter by ${category.name}`}
              />
              {category.name}
              <span className="ml-auto text-xs text-ink-muted">{category.productCount}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-display text-sm font-semibold text-ink">Brand</legend>
        <div className="space-y-2.5">
          {brands.slice(0, 10).map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink"
            >
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => onChange({ brands: toggleInArray(filters.brands, brand) })}
                aria-label={`Filter by ${brand}`}
              />
              {brand}
            </label>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-display text-sm font-semibold text-ink">Price</legend>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="min-price" className="sr-only">
              Minimum price
            </Label>
            <Input
              id="min-price"
              type="number"
              min={0}
              placeholder="Min ₹"
              value={filters.minPrice ?? ''}
              onChange={(e) =>
                onChange({ minPrice: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })
              }
            />
          </div>
          <span className="text-ink-muted">–</span>
          <div className="flex-1">
            <Label htmlFor="max-price" className="sr-only">
              Maximum price
            </Label>
            <Input
              id="max-price"
              type="number"
              min={0}
              placeholder="Max ₹"
              value={filters.maxPrice ?? ''}
              onChange={(e) =>
                onChange({ maxPrice: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })
              }
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[50, 100, 250].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ maxPrice: filters.maxPrice === value ? null : value, minPrice: 0 })}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                filters.maxPrice === value
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-line bg-surface text-ink-soft hover:border-brand-300',
              )}
            >
              Under ₹{value}
            </button>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="mb-3 font-display text-sm font-semibold text-ink">Rating</legend>
        <RadioGroup
          value={filters.minRating === null ? 'any' : String(filters.minRating)}
          onValueChange={(value) =>
            onChange({ minRating: value === 'any' ? null : Number(value) })
          }
        >
          {[
            { value: 'any', label: 'Any rating' },
            { value: '4.5', label: '4.5 & above' },
            { value: '4', label: '4.0 & above' },
            { value: '3.5', label: '3.5 & above' },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2.5">
              <RadioGroupItem value={option.value} id={`rating-${option.value}`} />
              <Label htmlFor={`rating-${option.value}`} className="font-normal text-ink-soft">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>

      <Separator />

      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink">
          <Checkbox
            checked={filters.dealOnly}
            onCheckedChange={(checked) => onChange({ dealOnly: checked === true })}
            aria-label="Show deals only"
          />
          Deals only
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink">
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onChange({ inStockOnly: checked === true })}
            aria-label="Show in stock only"
          />
          In stock only
        </label>
      </div>
    </div>
  )
}