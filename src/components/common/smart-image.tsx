import * as React from 'react'
import { cn } from '@/utils/cn'
import { ProduceArt } from '@/components/product/produce-art'

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string
  tone?: string
}

export function SmartImage({ src, alt, fallback, tone, className, ...props }: SmartImageProps) {
  const [error, setError] = React.useState(false)

  React.useEffect(() => setError(false), [src])

  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('overflow-hidden bg-line', className)}
      >
        <ProduceArt emoji={fallback} tone={tone} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  )
}