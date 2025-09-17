import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { subCategories } from "../constants/constants";

const UploadForm: React.FC = () => {
  const [category, setCategory] = useState<"foto" | "garten">("foto");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const baseName = f.name.replace(/\.[^/.]+$/, "");
    setName(baseName);
  };

  const handleSubmit = async () => {
    if (!file || !subCategory || !title) {
      alert("Lütfen dosya, başlık ve alt kategori seçin");
      return;
    }

    try {
      // 1. Dosyayı backend'e yükle
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);
      formData.append("name", name);

      await axios.post("http://localhost:3001/upload", formData, {
        timeout: 10000,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2. JSON kaydını ekle
      const newPhoto = {
        src: `/${category}/${file.name}`,
        name,
        title,
        description,
        category,
        sub_category: subCategory,
      };

      const endpoint =
        category === "foto"
          ? "http://localhost:4000/fotografiePhotos"
          : "http://localhost:4000/gardenPhotos";

      await axios.post(endpoint, newPhoto, { timeout: 10000 });

      alert("✅ Fotoğraf kaydedildi!");
      setFile(null);
      setName("");
      setTitle("");
      setDescription("");
      setSubCategory("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Hatası:", error.message);
        alert(`Bir hata oluştu: ${error.message}`);
      } else {
        console.error("Bilinmeyen Hata:", error);
        alert("Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Neues Foto hinzufügen
      </Typography>

      <Stack spacing={2}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as "foto" | "garten")}
        >
          <MenuItem value="foto">foto</MenuItem>
          <MenuItem value="garten">garten</MenuItem>
        </Select>

        <Select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Unterkategorie wählen
          </MenuItem>
          {subCategories[category].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>

        <TextField
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={handleFile}
        />

        <TextField
          label="Dosya Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default UploadForm;
