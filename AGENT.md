`json-server` yalnızca **JSON verisini** saklar; dosyaları kendiliğinden bu klasörlere **kopyalamaz veya taşımayı bilmez**.
Ama siz, hem `src` yolu doğru oluşsun hem de gerçek dosya gerçekten şu klasörlere yerleşsin istiyorsunuz:

```
D:\ISTQB\pehlione.io\public\foto
D:\ISTQB\pehlione.io\public\garten
```

Bunu başarmanın iki parçası vardır:

---

## 1️⃣ `src` Yolunu Doğru Oluşturma

Önceki form kodunda zaten şu satır var:

```ts
const srcPath = `/${category}/${safeName}.${fileExt}`;
```

Bu, GitHub Pages’de çalışacak şekilde doğru **URL yolu** üretir.
Yani `category = "foto"` ve `safeName = "guzel_gun"` ise
`src` = `/foto/guzel_gun.png` olur.
Bu kısmı değiştirmeye gerek yok.

---

## 2️⃣ Gerçek Dosyayı Kopyalama

Tarayıcı üzerinden çalışan React/MUI uygulaması **Windows diskinize dosya yazamaz**.
Kopyalama işi için küçük bir **Node.js backend** ya da elle kopyalama gerekir.

### A. Manuel (en basit, deploy için önerilen)

1. Kullanıcı formda resmi seçip kayıt oluşturur (JSON eklenir).
2. Siz bu resmi **elle** şu klasöre kopyalarsınız:

   * `public/foto/`   (category = "foto")
   * `public/garten/` (category = "garten")
3. Git commit/push yaparsınız → GitHub Pages’de hem dosya hem JSON güncellenmiş olur.

### B. Otomatik (lokalde geliştirme için)

Bir küçük Express sunucusu ekleyerek `multipart/form-data` kabul edip
dosyayı doğru klasöre yazdırabilirsiniz:

```bash
npm install express multer
```

`server.js`:

```js
import express from "express";
import multer from "multer";
import path from "path";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // formdan category geliyor: 'foto' veya 'garten'
    const cat = req.body.category;
    const dest = cat === "garten"
      ? "public/garten"
      : "public/foto";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // formdan name geliyor
    const ext = path.extname(file.originalname);
    cb(null, `${req.body.name}${ext}`);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ ok: true });
});

app.listen(5000, () => console.log("Upload server läuft auf Port 5000"));
```

Front-end tarafında:

```ts
const formData = new FormData();
formData.append("image", file);
formData.append("category", category);
formData.append("name", name);

await fetch("http://localhost:5000/upload", {
  method: "POST",
  body: formData
});
```

Bu şekilde dosya seçilen kategoriye göre
`D:\ISTQB\pehlione.io\public\foto` veya `...public\garten` altına **otomatik kopyalanır**.

---

### 🔑 Özet

* **Sadece React/json-server:** JSON kaydı olur, resmi siz manuel kopyalarsınız.
* **Otomatik kopyalama istenirse:** Küçük bir Node/Express + `multer` upload endpoint kurmanız gerekir.
  Tarayıcı kodu tek başına Windows dosya sistemine yazamaz.

GitHub Pages’de yayınlamak istiyorsanız yine de dosyaları repo’ya ekleyip
commit/push yapmanız gerekecek; Node sunucusu sadece **lokalde** çalışır.
