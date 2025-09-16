GitHub Pages üzerinde **kişisel bir portföy sitesi** geliştirmek için TypeScript çok güzel bir tercih.
Aşağıdaki adımlar, “CV – Hobi – Sertifikalar – Projeler – Repositories – Anwendungsentwickler (Uygulama Geliştirici) profili” gibi bölümleri olan bir siteyi sıfırdan kurmak için yol haritası niteliğindedir.

---

## 1️⃣ Ön Hazırlık

* **GitHub hesabınız** olsun (`username` → siteniz `https://username.github.io` adresinden yayınlanacak).
* Bilgisayarınızda **Node.js** ve **Git** kurulu olmalı.

---

## 2️⃣ Proje Yapısı Oluşturma

Terminalde:

```bash
mkdir portfolio
cd portfolio
npm init -y
npm install --save-dev typescript vite react react-dom @types/react @types/react-dom
npx tsc --init
```

* `Vite` hızlı geliştirme sunucusu ve üretim build’i sağlar.
* React ile bileşen tabanlı (component-based) yapı kurabilirsiniz.

---

## 3️⃣ Dosya Hiyerarşisi (Örnek)

```
portfolio/
 ├─ src/
 │   ├─ components/
 │   │    ├─ Header.tsx
 │   │    ├─ Footer.tsx
 │   │    ├─ Sections/
 │   │    │    ├─ CV.tsx
 │   │    │    ├─ Hobbies.tsx
 │   │    │    ├─ Certificates.tsx
 │   │    │    ├─ Projects.tsx
 │   │    │    ├─ Repos.tsx
 │   │    │    └─ DeveloperInfo.tsx
 │   ├─ App.tsx
 │   └─ main.tsx
 ├─ index.html
 ├─ tsconfig.json
 └─ package.json
```

---

## 4️⃣ İçerik Önerisi

Her bölüm bir React bileşeni olabilir:

* **CV**: İndirme bağlantılı PDF veya JSON tabanlı veri.
* **Hobby**: Bahçe, fotoğraf, müzik vs. küçük yazı ve resimler.
* **Sertifikalar**: Görsel + açıklama + link.
* **Projeler**: Açıklama + canlı demo + GitHub repo linki.
* **Repositories**: GitHub API’si ile dinamik liste (fetch).
* **Anwendungsentwickler**: Kısa biyografi, beceriler (TypeScript, Go, .NET vb.).

---

## 5️⃣ Geliştirme ve Build

Geliştirme sunucusu:

```bash
npm run dev
```

Üretim (statik) build:

```bash
npm run build
```

Vite varsayılan olarak derlenmiş dosyaları `dist/` içine koyar.

---

## 6️⃣ GitHub Pages’e Yayınlama

1. GitHub’da `username.github.io` adında repo açın.
2. Projeyi bağlayın:

   ```bash
   git init
   git remote add origin git@github.com:username/username.github.io.git
   ```
3. `dist` klasörünü deploy edin. Kolay yöntem:

   ```bash
   npm install gh-pages --save-dev
   ```

   `package.json`:

   ```json
   "scripts": {
     "build": "vite build",
     "deploy": "gh-pages -d dist"
   }
   ```

   Sonra:

   ```bash
   npm run build
   npm run deploy
   ```

---

## 7️⃣ İsteğe Bağlı Özellikler

* **Tema desteği**: Tailwind CSS ile hızlı, modern tasarım.
* **Çok dilli destek**: i18next.
* **Form (iletişim)**: Formspree veya Netlify Forms (sunucusuz).
* **Analytics**: Plausible veya Google Analytics.

---

### Özet Yol Haritası

1. **React + TypeScript + Vite** projesi kur.
2. Her içerik bölümü için ayrı `.tsx` bileşenleri yaz.
3. `npm run build` → statik dosyalar oluştur.
4. `gh-pages` veya GitHub Actions ile `username.github.io` adresine deploy et.

Bu yapıyla GitHub Pages üzerinde **tamamen TypeScript ile geliştirilen, kişisel portföy/özgeçmiş sitenizi** rahatlıkla yayınlayabilirsiniz.

---

## Uygulamayı Özelleştir (Hızlı Adımlar)

- `src/App.tsx` içindeki `Repos` bileşeninde `username` değerini GitHub kullanıcı adınızla değiştirin.
- `public/` klasörüne `cv.pdf` ekleyin veya `src/components/Sections/CV.tsx` içindeki `cvUrl` prop’u ile konumu belirtin.
- `Hobbies`, `Certificates` ve `Projects` bileşenlerindeki örnek içerikleri kendi verilerinizle değiştirin.
