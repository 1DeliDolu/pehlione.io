import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import OptimizedImage from './OptimizedImage'
import '@/styles/ImageWithLoader.css'

type Props = React.ComponentProps<typeof OptimizedImage> & {
  overlayBg?: string
  ratio?: string | number | null
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  showLoader?: boolean
}

export default function ImageWithLoader({ overlayBg = 'rgba(0,0,0,0.06)', ratio = '4 / 3', wrapperClassName, wrapperStyle, className, onLoad, onError, showLoader = true, ...imgProps }: Props) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback<NonNullable<typeof onLoad>>((e) => {
    setLoaded(true)
    onLoad?.(e)
  }, [onLoad])

  const handleError = useCallback<NonNullable<typeof onError>>((e) => {
    setLoaded(false)
    onError?.(e)
  }, [onError])

  const baseWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    ...(ratio ? { aspectRatio: ratio as string | number } : {}),
  }

  return (
    <Box className={wrapperClassName} sx={baseWrapperStyle} style={wrapperStyle}>
      {showLoader && !loaded && (
        <Box sx={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: overlayBg,
          zIndex: 1,
        }}>
          <CircularProgress size={28} thickness={4} />
        </Box>
      )}
      <OptimizedImage
        {...imgProps}
        className={`fancy-img image-with-loader-img ${className ?? ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </Box>
  )
}
