import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import PhotoGallery from '@/components/PhotoGallery'
import { gardenPhotos as gardenStatic, fotografiePhotos as fotoStatic } from '@/redux/photos'
import type { FotoEintrag } from '@/types'

type Category = 'gartenarbeit' | 'fotografie'

type Props = {
  category: Category
}

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

  return (
    <PhotoGallery title={cfg.title} intro={cfg.intro} photos={photos} itemsPerPage={3} />
  )
}

