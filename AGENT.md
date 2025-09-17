Aşağıdaki örnek, **TypeScript + React + Material-UI** kullanarak fotoğraf yükleme formunu adım adım gösterir.
Form; **ana kategori (foto / garten)** ve **alt kategori** seçimi içerir,
girdiğiniz **name, title, description** bilgileriyle birlikte `db.json` dosyasına POST isteği gönderir.

> **Not:** Bu form **dosyayı fiziksel klasöre kopyalamaz**.
> json-server yalnızca JSON kaydeder, resmin gerçek dosyasını `/public/foto` veya `/public/garten` altına **siz elle koyarsınız**.
> Form sadece `src` alanını, seçtiğiniz ana kategoriye göre otomatik oluşturur.

---

## 1️⃣ db.json Yapısı (örnek)

```json
{
  "gardenPhotos": [],
  "fotografiePhotos": []
}
```

---

## 2️⃣ TypeScript Tipleri

`src/types.ts`

```ts
export interface FotoEintrag {
  src: string;
  name: string;
  title: string;
  description: string;
  category: "foto" | "garten";
  sub_category: string;
}
```

---

## 3️⃣ Kategori ve Alt Kategori Listesi

`src/constants.ts`

```ts
export const hauptKategorien = ["foto", "garten"] as const;

export const unterKategorien: Record<string, string[]> = {
  foto: ["natur", "herbst", "blumen"],
  garten: ["herbst", "ernte", "gemuese"]
};
```

---

## 4️⃣ UploadForm.tsx

```tsx
import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { hauptKategorien, unterKategorien } from "./constants";
import { FotoEintrag } from "./types";

export const UploadForm: React.FC = () => {
  const [category, setCategory] = React.useState<"foto" | "garten">("foto");
  const [subCategory, setSubCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async () => {
    if (!name || !title || !subCategory) return;

    // Ana kategoriye göre src yolu
    const src = `/${category}/${name}`;

    const payload: FotoEintrag = {
      src,
      name,
      title,
      description,
      category,
      sub_category: subCategory
    };

    // Hangi koleksiyon?
    const endpoint =
      category === "garten"
        ? "http://localhost:4000/gardenPhotos"
        : "http://localhost:4000/fotografiePhotos";

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Formu sıfırla
    setName("");
    setTitle("");
    setDescription("");
    setSubCategory("");
    alert("Foto wurde gespeichert!");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Foto hochladen
      </Typography>

      <Stack spacing={2}>
        {/* Ana Kategori */}
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as "foto" | "garten")}
        >
          {hauptKategorien.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>

        {/* Alt Kategori */}
        <Select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Unterkategorie wählen
          </MenuItem>
          {unterKategorien[category].map((sub) => (
            <MenuItem key={sub} value={sub}>
              {sub}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Dateiname (name)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="z.B. blaetter_herbst.jpg"
        />

        <TextField
          label="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Beschreibung"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Speichern
        </Button>
      </Stack>
    </Box>
  );
};
```

---

## 5️⃣ Kullanım

App.tsx’te:

```tsx
import { UploadForm } from "./UploadForm";

function App() {
  return <UploadForm />;
}

export default App;
```

---

## 🔑 Çalışma Akışı

1. Siz resmi manuel olarak `/public/foto/` veya `/public/garten/` altına koyarsınız
   (adı formda girdiğiniz `name` ile aynı olmalı).
2. Formda:

   * **Ana kategori**: `foto` veya `garten`
   * **Alt kategori**: otomatik dropdown
   * **name**: örn. `blaetter_herbst.jpg`
   * **title** ve **description**
3. Kaydet dediğinizde json-server’a şu şekilde kayıt gider:

```json
{
  "src": "/garten/blaetter_herbst.jpg",
  "name": "blaetter_herbst.jpg",
  "title": "Sonbahar Yaprakları",
  "description": "Ein Blick auf den Herbst in meinem Garten.",
  "category": "garten",
  "sub_category": "herbst"
}
```

Bu kayıt `gardenPhotos` veya `fotografiePhotos` listesine eklenir
ve GitHub Pages’e push öncesi `generatePhotos.ts` scriptinizle
`src/redux/photos.ts` dosyasına dönüştürülüp deploy edilebilir.
