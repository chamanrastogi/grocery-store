import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchBrands, fetchCategories, queryProducts } from '@/services/api'
import type { ProductFilters, SortOption } from '@/types'

export const defaultFilters: ProductFilters = {
  categories: [],
  brands: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStockOnly: false,
  dealOnly: false,
}

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
]

export function useProductBrowse(initialCategorySlug?: string) {
  const [searchParams] = useSearchParams()

  const category = initialCategorySlug ?? searchParams.get('category')
  const dealOnly = searchParams.get('deal') === '1'
  const sortParam = (searchParams.get('sort') as SortOption | null) ?? 'popular'

  const initialFilters = useMemo<ProductFilters>(
    () => ({
      ...defaultFilters,
      categories: category ? [category] : [],
      dealOnly,
    }),
    [category, dealOnly],
  )

  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const [sort, setSort] = useState<SortOption>(sortParam)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  useEffect(() => {
    setSort(sortParam)
  }, [sortParam])

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  })

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: Infinity,
  })

  const productsQuery = useQuery({
    queryKey: ['products-browse', filters, sort],
    queryFn: () => queryProducts(filters, sort),
    staleTime: 30_000,
  })

  const patchFilters = (patch: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
  }

  const clearFilters = () => setFilters(defaultFilters)

  return {
    categories: categoriesQuery.data ?? [],
    brands: brandsQuery.data ?? [],
    products: productsQuery.data,
    productsLoading: productsQuery.isLoading,
    productsError: productsQuery.isError,
    isFetching: productsQuery.isFetching,
    refetch: () => {
      productsQuery.refetch()
      categoriesQuery.refetch()
      brandsQuery.refetch()
    },
    filters,
    patchFilters,
    clearFilters,
    sort,
    setSort,
    filtersOpen,
    setFiltersOpen,
    activeFilterCount:
      filters.categories.length +
      filters.brands.length +
      (filters.minPrice !== null ? 1 : 0) +
      (filters.maxPrice !== null ? 1 : 0) +
      (filters.minRating !== null ? 1 : 0) +
      (filters.inStockOnly ? 1 : 0) +
      (filters.dealOnly ? 1 : 0),
  }
}