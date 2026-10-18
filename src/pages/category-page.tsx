import { useParams } from 'react-router-dom'
import { getCategory } from '@/data/categories'
import { ProductsPage } from '@/pages/products-page'
import { NotFoundPage } from '@/pages/not-found-page'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = slug ? getCategory(slug) : undefined

  if (!category) return <NotFoundPage />

  return (
    <ProductsPage
      title={category.name}
      subtitle={`${category.tagline} · ${category.productCount} products`}
      initialCategorySlug={category.slug}
    />
  )
}