import { useMemo, useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import ImageWithLoader from '@/components/ImageWithLoader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import type { FotoEintrag } from '../types'

type Props = {
  title: string
  intro?: string
  photos: FotoEintrag[]
  itemsPerPage?: number
  onImagesLoadingStart?: (count: number) => void
  onImagesLoaded?: () => void
}

export default function PhotoGallery({ title, intro, photos, itemsPerPage = 3, onImagesLoadingStart, onImagesLoaded }: Props) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(photos.length / itemsPerPage))
  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return photos.slice(start, start + itemsPerPage)
  }, [page, itemsPerPage, photos])
  const pendingRef = useRef<number>(0)
  const perItemLoaderEnabledRef = useRef<boolean>(true)

  useEffect(() => {
    if (page > 1 && perItemLoaderEnabledRef.current) {
      perItemLoaderEnabledRef.current = false
    }
  }, [page])

  useMemo(() => {
    const count = current.length
    pendingRef.current = count
    if (count === 0) {
      onImagesLoaded?.()
    } else {
      onImagesLoadingStart?.(count)
    }
    return current
  }, [current, onImagesLoaded, onImagesLoadingStart])

  const markDoneOnce = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget as HTMLImageElement
    if (target.dataset.done) return
    target.dataset.done = '1'
    const next = Math.max(0, pendingRef.current - 1)
    pendingRef.current = next
    if (next === 0) onImagesLoaded?.()
  }

  return (
    <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {intro && (
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          {intro}
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {current.map((p) => {
          const baseUrl = (import.meta as any).env?.BASE_URL ?? '/'
          const full = `${baseUrl}${p.src.replace(/^\//, '')}`
          const parts = p.src.split('/')
          const file = parts[parts.length - 1]
          const name = file.replace(/\.[^.]+$/, '')
          const dir = parts.slice(0, -1).join('/')
          const thumb = `${baseUrl}${`${dir}/thumbs/${name}.webp`.replace(/^\//, '')}`
          return (
          <Card
            key={p.src}
            sx={{
              height: '100%',
              overflow: 'hidden',
              boxShadow: 'none',
              transition: 'transform .2s ease, box-shadow .2s ease',
              '& .fancy-img': { transition: 'transform .25s ease, filter .25s ease' },
              '&:hover .fancy-img': { transform: 'scale(1.035)', filter: 'saturate(1.04) brightness(1.02)' },
              '&:hover': { boxShadow: 3 },
            }}
          >
            <a href={encodeURI(full)} target="_blank" rel="noreferrer" aria-label={`Bild ${p.title} in groß öffnen`}>
              <ImageWithLoader
                src={thumb}
                alt={p.title}
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                showLoader={perItemLoaderEnabledRef.current}
                // fallback to full-size if thumbnail missing
                onLoad={markDoneOnce}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  if (!target.dataset.fallback) {
                    target.src = encodeURI(full)
                    target.dataset.fallback = '1'
                  } else {
                    // second error -> consider it done to avoid hanging the loader
                    markDoneOnce(e)
                  }
                }}
              />
            </a>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {p.title}
              </Typography>
              {p.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {p.description}
                </Typography>
              )}
            </CardContent>
          </Card>)
        })}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} />
      </Box>
    </Box>
  )
}
