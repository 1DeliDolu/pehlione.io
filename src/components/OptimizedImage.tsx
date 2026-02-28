import React from 'react'
import "@/styles/OptimizedImage.css"

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding' | 'src' | 'alt' | 'style'> & {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
}

/**
 * Lightweight, safe defaults for images served from /public.
 * - Lazy loads by default, eager if priority
 * - Async decode to keep main thread responsive
 * - Encodes src to handle spaces/umlauts
 * - Applies content-visibility for offscreen items
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  sizes,
  width,
  height,
  className,
  ...rest
}: Props) {
  const loading: 'eager' | 'lazy' = priority ? 'eager' : 'lazy'
  const decoding: 'sync' | 'async' = priority ? 'sync' : 'async'
  const finalSizes = sizes ?? (typeof width === 'number' ? `${Math.ceil(width)}px` : '100vw')
  const base: string = import.meta.env.BASE_URL || '/'
  const normalized = src.startsWith('http') ? src : `${base}${src.replace(/^\//, '')}`

  return (
    <img
      src={encodeURI(normalized)}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={priority ? 'high' : 'auto'}
      width={width}
      height={height}
      sizes={finalSizes}
      draggable={false}
      className={["optimized-image", className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}
