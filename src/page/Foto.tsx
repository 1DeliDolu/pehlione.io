import PhotoGallery from '@/components/PhotoGallery'
import { gardenPhotos, fotografiePhotos } from '@/redux/photos'

type Category = 'gartenarbeit' | 'fotografie'

type Props = {
  category: Category
}

export default function Foto({ category }: Props) {
  const cfg =
    category === 'gartenarbeit'
      ? {
        title: 'Gartenarbeit',
        intro: 'Fotos, die ich im Garten gemacht habe, und ihre kurzen Beschreibungen.',
        photos: gardenPhotos,
      }
      : {
        title: 'Fotografie',
        intro: 'Eine Auswahl von Fotos, die ich gemacht habe.',
        photos: fotografiePhotos,
      }

  return (
    <PhotoGallery title={cfg.title} intro={cfg.intro} photos={cfg.photos} itemsPerPage={3} />
  )
}

