# Geliştirici Rehberi (Statik Fotoğraf Akışı)

Bu proje fotoğraf galerilerini tamamen statik olarak yönetir. Fotoğrafları siz manuel olarak `public` içine eklersiniz; build sırasında bir script bu klasörleri tarar ve uygulamanın kullandığı listeyi üretir. Backend veya veritabanı yoktur.

## Klasör Yapısı
- `public/foto` → Fotografie kategorisi için görseller
- `public/garten` → Gartenarbeit kategorisi için görseller

## Statik Liste Üretimi (Build-time)
- Script: `scripts/generatePhotos.mjs`
  - `public/foto` ve `public/garten` klasörlerini tarar.
  - `src/redux/photosData.ts` dosyasını otomatik üretir.
- Türeyen dosya: `src/redux/photosData.ts`
  - Uygulama için foto listelerini TypeScript olarak içerir.
- Türeyeni kullanan yer: `src/redux/photos.ts`
  - Üretilen listeleri import eder.
  - Üretilen liste boş ise, örnek/fallback veriye geri düşer (repo’da mevcut örnekler).

## Çalıştırma Komutları
- Geliştirme: `npm run dev`
  - Başlamadan önce `predev` ile liste otomatik üretilir.
- Manuel üretim: `npm run generate:photos`
  - Yeni dosya ekledikten sonra isteğe bağlı çalıştırabilirsiniz.
- Build: `npm run build`
  - Build öncesi `prebuild` ile liste otomatik üretilir.
- Deploy (GH Pages): `npm run deploy`

## Fotoğraf Ekleme Akışı
1. Görselleri ilgili klasöre kopyalayın:
   - Fotografie → `public/foto`
   - Gartenarbeit → `public/garten`
2. Geliştirme yapıyorsanız:
   - `npm run dev` (veya `npm run generate:photos` ardından sayfayı yenileyin).
3. Üretime alırken:
   - `npm run build` ve ardından `npm run deploy`.

## Başlık ve Sıralama
- Başlık, dosya adından (uzantısız) otomatik türetilir.
- Basit sıralama için dosya adlarını numaralandırabilirsiniz:
  - Örn. `001_ilk.jpg`, `002_ikinci.jpg` …

## Metadata ile Başlık/Açıklama (İsteğe Bağlı)
Klasör bazında başlık ve açıklama belirlemek için `photos.meta.json` dosyası ekleyebilirsiniz:

- Fotografie meta: `public/foto/photos.meta.json`
- Gartenarbeit meta: `public/garten/photos.meta.json`

İki biçimi destekler:

1) Nesne haritası (önerilir)

```
{
  "apfelblumen.png": { "title": "Apfelblüten", "description": "Frühling." },
  "/foto/licht.png": { "title": "Licht", "description": "Sonnenstrahlen." },
  "sonnenbluhmen.png": { "order": 1 },
  "wolke.png": { "order": 2, "title": "Wolke" }
}
```

2) Dizi biçimi

```
[
  { "file": "apfelblumen.png", "title": "Apfelblüten" },
  { "src": "/foto/licht.png", "description": "Sonnenstrahlen." },
  { "file": "raps.png", "order": 10 }
]
```

- Desteklenen alanlar: `title` (başlık), `description` (açıklama), `order` (sıralama için küçük sayı önce gelir).
- Anahtar olarak hem dosya adı (`apfelblumen.png`) hem de tam yol (`/foto/apfelblumen.png`) kullanılabilir.
- Meta güncelledikten sonra listeyi yenilemek için:
  - Geliştirme: `npm run dev` çalışıyorsa yeniden başlatın veya `npm run generate:photos` çalıştırın.
  - Build: `npm run build` ile otomatik üretilir.

## Önemli Notlar
- Backend/Upload Formu yoktur.
  - Daha önceki yükleme formu ve Express/Multer backend kaldırıldı.
  - API çağrısı/proxy kullanılmıyor.
- Cache: GH Pages gibi ortamlarda yeni deploy sonrası tarayıcı önbelleği nedeniyle 1–2 dakika gecikme olabilir. Sert yenileme (Ctrl/Cmd+F5) gerekebilir.

## İlgili Dosyalar
- `scripts/generatePhotos.mjs` → Klasör tarama ve veri üretimi
- `src/redux/photosData.ts` → Otomatik üretilen liste (elle düzenlemeyin)
- `src/redux/photos.ts` → Uygulamanın kullandığı liste kaynağı (generated + fallback)
- `src/page/Foto.tsx` → Foto sayfası, sadece statik listeyi gösterir

## Sorular / Genişletme
- Dosya adına ek metadata (başlık, açıklama) istiyorsanız küçük bir `photos.meta.json` desteği eklenebilir. İstiyorsanız belirtin, uygun biçimi ve script entegrasyonunu ekleyebiliriz.
