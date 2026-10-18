import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, ShoppingBasket } from 'lucide-react'
import { categories } from '@/data/categories'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const shopLinks = [
  { to: '/products', label: 'All products' },
  ...categories.map((c) => ({ to: `/category/${c.slug}`, label: c.name })),
]

const helpLinks = [
  { to: '/orders', label: 'Track your order' },
  { to: '/addresses', label: 'Delivery addresses' },
  { to: '/profile', label: 'My account' },
  { to: '/login', label: 'Sign in' },
]

export function Footer() {
  const { toast } = useToast()

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShoppingBasket className="h-5 w-5" aria-hidden="true" />
            </span>
            Green<span className="text-brand-600">grocer</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Fresh produce, dairy and everyday essentials, picked daily and delivered to your door in
            under an hour.
          </p>
          <div className="mt-5 space-y-2 text-sm text-ink-soft">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Mumbai, Maharashtra
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
              1800-123-4567 (toll free)
            </p>
          </div>
        </div>

        <nav aria-label="Shop">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">Shop</h3>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">Help</h3>
          <ul className="mt-4 space-y-2.5">
            {helpLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Get deals in your inbox
          </h3>
          <p className="mt-4 text-sm text-ink-muted">
            Fresh offers and new arrivals, once a week. No spam.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              toast({
                title: 'Subscribed!',
                description: 'Check your inbox for a welcome offer.',
                variant: 'success',
              })
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <Input id="newsletter-email" type="email" required placeholder="you@example.com" className="flex-1" />
            <Button type="submit" aria-label="Subscribe to newsletter">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </form>
          <p className="mt-4 text-xs text-ink-muted">
            Accepts UPI, cards, net banking and cash on delivery.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Greengrocer. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/" className="hover:text-brand-700">Terms</Link>
            <Link to="/" className="hover:text-brand-700">Privacy</Link>
            <Link to="/" className="hover:text-brand-700">Returns</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}