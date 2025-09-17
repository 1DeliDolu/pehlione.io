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
          intro: 'Bahçede çektiğim fotoğraflar ve kısa açıklamaları.',
          photos: gardenPhotos,
        }
      : {
          title: 'Fotografie',
          intro: 'Çektiğim fotoğraflardan seçkiler.',
          photos: fotografiePhotos,
        }

  return (
    <PhotoGallery title={cfg.title} intro={cfg.intro} photos={cfg.photos} itemsPerPage={3} />
  )
}

