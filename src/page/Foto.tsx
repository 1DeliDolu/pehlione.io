import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import PhotoGallery from '@/components/PhotoGallery'
import { gardenPhotos as gardenStatic, fotografiePhotos as fotoStatic } from '@/redux/photos'
import type { FotoEintrag } from '@/types/types'
import Box from '@mui/material/Box'
import { apiBaseUrl } from '@/constants/api'

type Category = 'gartenarbeit' | 'fotografie'

type Props = {
  category: Category
}

const sortByIdDesc = (items: FotoEintrag[]) =>
  [...items].sort((a, b) => {
    const aNum = Number(a.id)
    const bNum = Number(b.id)
    if (Number.isNaN(aNum) && Number.isNaN(bNum)) return 0
    if (Number.isNaN(aNum)) return 1
    if (Number.isNaN(bNum)) return -1
    return bNum - aNum
  })

export default function Foto({ category }: Props) {
  const [photos, setPhotos] = useState<FotoEintrag[]>([])

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
    const fetchData = () => {
      if (!apiBaseUrl) {
        if (mounted) setPhotos(sortByIdDesc(cfg.fallback))
        return
      }
      axios
        .get<FotoEintrag[]>(`${apiBaseUrl}/${cfg.resource}`, { timeout: 5000 })
        .then((res) => {
          if (mounted) setPhotos(sortByIdDesc(res.data))
        })
        .catch(() => {
          if (mounted) setPhotos(sortByIdDesc(cfg.fallback))
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

  return (
    <Box sx={{ position: 'relative' }}>
      <PhotoGallery
        title={cfg.title}
        intro={cfg.intro}
        photos={photos}
        itemsPerPage={3}
      />
    </Box>
  )
}

