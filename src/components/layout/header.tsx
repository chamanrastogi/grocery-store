import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Heart, Home, LayoutGrid, MapPin, ShoppingCart, User } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { SearchBar } from '@/components/navigation/search-bar'
import { CategoryNav } from '@/components/navigation/category-nav'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useCartStore, selectCartCount } from '@/stores/cart-store'
import { useWishlistStore } from '@/stores/wishlist-store'
import { cn } from '@/utils/cn'

export function Header() {
  const cartCount = useCartStore(selectCartCount)
  const openCart = useCartStore((s) => s.openDrawer)
  const wishlistCount = useWishlistStore((s) => s.ids.length)
  const [deliveryArea] = React.useState({ area: 'Andheri West', code: '400053' })

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo className="shrink-0" />

        <button
          type="button"
          className="hidden h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-left transition-colors hover:border-brand-400 md:flex"
          aria-label="Change delivery location"
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-ink-muted">
              Deliver to
            </span>
            <span className="block text-sm font-semibold text-ink">
              {deliveryArea.area} {deliveryArea.code}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
        </button>

        <SearchBar className="hidden flex-1 md:block" />

        <nav className="ml-auto flex items-center gap-1.5" aria-label="Primary">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative text-ink-soft hover:text-ink"
          >
            <Link to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`}>
              <Heart className="h-5 w-5" aria-hidden="true" />
              {wishlistCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tangerine-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-ink-soft hover:text-ink"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="ml-1 flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                aria-label="Account menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-brand-600 font-display text-sm font-semibold text-white">
                    AS
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <span className="block font-display font-semibold text-ink">Aarav Sharma</span>
                <span className="block text-xs font-normal text-ink-muted">aarav@example.com</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="h-4 w-4" aria-hidden="true" /> My profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/orders">
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/addresses">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> Addresses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4" aria-hidden="true" /> Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">
                  <User className="h-4 w-4" aria-hidden="true" /> Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden sm:px-6">
        <SearchBar />
      </div>

      <CategoryNav />

      <MobileNav />
    </header>
  )
}

function MobileNav() {
  const cartCount = useCartStore(selectCartCount)
  const openCart = useCartStore((s) => s.openDrawer)

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile"
    >
      <div className="grid grid-cols-5">
        <MobileLink to="/" label="Home" icon="Home" />
        <MobileLink to="/products" label="Categories" icon="LayoutGrid" />
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:text-brand-700"
          aria-label={`Open cart, ${cartCount} items`}
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </span>
          Cart
        </button>
        <MobileLink to="/wishlist" label="Wishlist" icon="Heart" />
        <MobileLink to="/profile" label="Account" icon="User" />
      </div>
    </nav>
  )
}

function MobileLink({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: 'Home' | 'LayoutGrid' | 'Heart' | 'User'
}) {
  const icons = { Home, LayoutGrid, Heart, User }
  const Icon = icons[icon]
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors',
          isActive ? 'text-brand-700' : 'text-ink-muted hover:text-brand-700',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn('h-5 w-5', isActive && 'fill-brand-100')} aria-hidden="true" />
          {label}
        </>
      )}
    </NavLink>
  )
}