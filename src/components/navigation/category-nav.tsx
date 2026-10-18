import { NavLink } from 'react-router-dom'
import { categories } from '@/data/categories'
import { cn } from '@/utils/cn'

export function CategoryNav() {
  return (
    <nav className="hidden border-t border-line md:block" aria-label="Categories">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 no-scrollbar sm:px-6 lg:px-8">
        <CategoryLink to="/products" label="All" />
        {categories.map((category) => (
          <CategoryLink key={category.slug} to={`/category/${category.slug}`} label={category.name} />
        ))}
      </div>
    </nav>
  )
}

function CategoryLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700',
          isActive && 'bg-brand-50 font-semibold text-brand-700',
        )
      }
    >
      {label}
    </NavLink>
  )
}