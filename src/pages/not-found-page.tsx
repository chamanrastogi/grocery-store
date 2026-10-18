import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
        <Compass className="h-8 w-8 text-brand-600" aria-hidden="true" />
      </div>
      <p className="font-display text-5xl font-bold tracking-tight text-brand-700">404</p>
      <h1 className="mt-3 font-display text-xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-ink-muted">
        We couldn't find the page you were looking for. It may have moved or no longer exists.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}