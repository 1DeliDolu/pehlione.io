import React from 'react'
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { hauptKategorien, unterKategorien } from '@/constants'
import type { FotoEintrag } from '@/types'

export default function UploadForm() {
  const [category, setCategory] = React.useState<'foto' | 'garten'>('foto')
  const [subCategory, setSubCategory] = React.useState('')
  const [name, setName] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)
    if (!name || !title || !subCategory) {
      setError('Lütfen name, title ve alt kategori giriniz.')
      return
    }

    const src = `/${category}/${name}`
    const payload: FotoEintrag = {
      src,
      name,
      title,
      description,
      category,
      sub_category: subCategory,
    }

    const endpoint =
      category === 'garten'
        ? 'http://localhost:4000/gardenPhotos'
        : 'http://localhost:4000/fotografiePhotos'

    try {
      setBusy(true)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setName('')
      setTitle('')
      setDescription('')
      setSubCategory('')
      alert('Foto wurde gespeichert!')
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setError(`Kaydedilemedi: ${msg}. json-server açık mı?`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Foto hochladen
      </Typography>
      <Stack spacing={2}>
        <Select value={category} onChange={(e) => setCategory(e.target.value as 'foto' | 'garten')}>
          {hauptKategorien.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>

        <Select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} displayEmpty>
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

        <TextField label="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />

        <TextField
          label="Beschreibung"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit} disabled={busy}>
          {busy ? 'Speichert...' : 'Speichern'}
        </Button>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

