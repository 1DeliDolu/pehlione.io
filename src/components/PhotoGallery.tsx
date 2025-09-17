import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import type { Photo } from '@/redux/photos'

type Props = {
  title: string
  intro?: string
  photos: Photo[]
  itemsPerPage?: number
}

export default function PhotoGallery({ title, intro, photos, itemsPerPage = 9 }: Props) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(photos.length / itemsPerPage))
  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return photos.slice(start, start + itemsPerPage)
  }, [page, itemsPerPage, photos])

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
        {current.map((p) => (
          <Card key={p.src} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              image={encodeURI(p.src)}
              alt={p.title}
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }}
            />
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
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} />
      </Box>
    </Box>
  )
}

