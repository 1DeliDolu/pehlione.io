Amac
- UploadForm'dan secilen gorseller su klasorlere kaydedilir:
  - D:\portfolio\public\foto
  - D:\portfolio\public\garten
- `name` alani dosya adina yansir (ornegin `demo` -> `demo.png`).

Sunucu (server/server.js)
- Endpoint: `POST http://localhost:3001/upload`
- Form alanlari: `name`, `category` (foto|garten), `sub_category`, `title`, `description`, ve en sonda `image` (dosya)
- Onemli: `name` ve `category` alanlarini dosyadan once gonderin. (Multer filename icin `req.body` gerekir.)
- Dosyalar `public/<category>` altina kaydedilir ve var olan isimle carpisma olursa `-1`, `-2` eklenir.
- Yalnizca resim MIME turleri kabul edilir (20MB limit).
- Donus: `{ ok, file, src, category, nameNormalized }` (`src` ornek: `/foto/cx.png`)

Istemci (src/components/UploadForm.tsx)
- FormData sirasini duzgun gonderir: once `name`, `category`, diger alanlar; en sonda `image`.
- Sunucudan donen `data.src` varsa onu kullanir; yoksa `/${category}/${filename}` uretir.
- Yukleme sirasinda buton devre disi olur.

Foto Sayfasi (src/page/Foto.tsx)
- Fotograflari `json-server` uzerinden ceker: `http://localhost:4000/fotografiePhotos` ve `http://localhost:4000/gardenPhotos`.
- Hata olursa statik veriye duser (`src/redux/photos.ts`).

Calistirma
- Upload sunucusu: `cd server && node server.js`  -> http://localhost:3001
- JSON Server: `cd server && json-server --watch db.json --port 4000`
- Vite: `npm run dev` -> http://localhost:5173

Notlar
- `name = cx` girerseniz dosya `cx.png` (veya `cx-1.png`) olarak kaydedilir; timestamp'e dusmez.
- Gerekirse dosya turu ve boyut limitleri CODE.md'ye gore guncellenebilir.
