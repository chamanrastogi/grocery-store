import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = 'Something went wrong while loading.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface px-6 py-14 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-tangerine-50">
        <AlertCircle className="h-7 w-7 text-tangerine-600" aria-hidden="true" />
      </div>
      <p className="max-w-sm text-sm text-ink-soft">{message}</p>
      {onRetry ? (
        <Button variant="outline" className="mt-5" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      ) : null}
    </div>
  )
}