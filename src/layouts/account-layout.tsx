import { Outlet, NavLink } from 'react-router-dom'
import { Heart, MapPin, Package, User } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/orders', label: 'Orders', icon: Package },
  { to: '/addresses', label: 'Addresses', icon: MapPin },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
]

export function AccountLayout() {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[240px_1fr] lg:gap-10">
        {!isMobile ? (
          <aside aria-label="Account">
            <nav className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/profile'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-soft hover:bg-paper hover:text-ink',
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
        ) : (
          <nav aria-label="Account" className="-mx-4 overflow-x-auto px-4 no-scrollbar">
            <div className="flex w-max gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/profile'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-line bg-surface text-ink-soft hover:text-ink',
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}