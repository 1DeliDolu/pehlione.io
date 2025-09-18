import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import PhotoGallery from '@/components/PhotoGallery'
import { gardenPhotos as gardenStatic, fotografiePhotos as fotoStatic } from '@/redux/photos'
import type { FotoEintrag } from '@/types'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

type Category = 'gartenarbeit' | 'fotografie'

type Props = {
  category: Category
}

export default function Foto({ category }: Props) {
  const [photos, setPhotos] = useState<FotoEintrag[]>([])
  const [showSpinner, setShowSpinner] = useState(true)
  const startRef = useRef<number>(Date.now())
  const initialLoadDoneRef = useRef<boolean>(false)
  const MIN_SPINNER_MS = 0

  const cfg = useMemo(() => (
    category === 'gartenarbeit'
      ? {
          title: 'Gartenarbeit',
          intro:
            'Fotos, die ich im Garten gemacht habe, und ihre kurzen Beschreibungen.',
          resource: 'gardenPhotos' as const,
          fallback: gardenStatic,
        }
      : {
          title: 'Fotografie',
          intro: 'Eine Auswahl von Fotos, die ich gemacht habe.',
          resource: 'fotografiePhotos' as const,
          fallback: fotoStatic,
        }
  ), [category])

  useEffect(() => {
    let mounted = true
    startRef.current = Date.now()
    initialLoadDoneRef.current = false
    setShowSpinner(true)
    const fetchData = () => {
      axios
        .get<FotoEintrag[]>(`http://localhost:4000/${cfg.resource}`, { timeout: 5000 })
        .then((res) => {
          if (mounted) setPhotos(res.data)
        })
        .catch(() => {
          if (mounted) setPhotos(cfg.fallback)
        })
    }

    fetchData()

    const onUpdated = () => fetchData()
    window.addEventListener('photos:updated', onUpdated as EventListener)
    return () => {
      mounted = false
      window.removeEventListener('photos:updated', onUpdated as EventListener)
    }
  }, [cfg])

  const handleImagesLoadingStart = () => {
    // Only show the overlay on initial load
    if (!initialLoadDoneRef.current) setShowSpinner(true)
  }

  const handleImagesLoaded = () => {
    const elapsed = Date.now() - startRef.current
    const wait = Math.max(0, MIN_SPINNER_MS - elapsed)
    const hide = () => {
      setShowSpinner(false)
      initialLoadDoneRef.current = true
    }
    if (wait > 0) setTimeout(hide, wait)
    else hide()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        position: 'absolute', inset: 0,
        display: showSpinner ? 'flex' : 'none',
        alignItems: 'center', justifyContent: 'center',
        minHeight: 320,
        background: 'rgba(0,0,0,0.04)',
        zIndex: 2,
        pointerEvents: showSpinner ? 'auto' : 'none',
      }}>
        <CircularProgress />
      </Box>
      <PhotoGallery
        title={cfg.title}
        intro={cfg.intro}
        photos={photos}
        itemsPerPage={3}
        onImagesLoadingStart={handleImagesLoadingStart}
        onImagesLoaded={handleImagesLoaded}
      />
    </Box>
  )
}

