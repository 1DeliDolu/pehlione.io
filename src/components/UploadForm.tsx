import React, { useEffect, useState } from "react";
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
import { subCategories } from '../constants/constants';

const UploadForm: React.FC = () => {
  const [ category, setCategory ] = useState<"foto" | "garten" | "certificates">( "foto" );
  const [ subCategory, setSubCategory ] = useState( "" );
  const [ title, setTitle ] = useState( "" );
  const [ description, setDescription ] = useState( "" );
  const [ file, setFile ] = useState<File | null>( null );
  const [ name, setName ] = useState( "" );
  const [ loading, setLoading ] = useState( false );
  const isCertificate = category === "certificates";

  useEffect( () => {
    if ( category === "certificates" ) {
      setSubCategory( "all" );
    } else if ( subCategory === "all" ) {
      setSubCategory( "" );
    }
  }, [ category, subCategory ] );

  const handleFile = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const f = e.target.files?.[ 0 ];
    if ( !f ) return;
    setFile( f );
    const baseName = f.name.replace( /\.[^/.]+$/, "" );
    setName( baseName );
  };

  const handleSubmit = async () => {
    const normalizedSubCategory = isCertificate ? "all" : subCategory;
    if ( !file || !title || ( !isCertificate && !normalizedSubCategory ) ) {
      alert(
        isCertificate
          ? "Lütfen dosya ve sertifika adını girin"
          : "Lütfen dosya, başlık ve alt kategori seçin"
      );
      return;
    }

    try {
      setLoading( true );
      const uploadPath = "http://localhost:3001/upload";

      const formData = new FormData();
      // Multer diskStorage filename/destination needs fields BEFORE file
      formData.append( "name", name );
      formData.append( "category", category );
      formData.append( "sub_category", normalizedSubCategory );
      formData.append( "title", title );
      formData.append( "description", description );
      formData.append( "image", file );

      const { data } = await axios.post( uploadPath, formData, {
        timeout: 30000,
        headers: { "Content-Type": "multipart/form-data" },
      } );

      const savedFileName: string = data?.file?.filename ?? ( () => {
        const m = file.name.match( /\.[^.]+$/ );
        const ext = m ? m[ 0 ] : "";
        return `${ name }${ ext }`;
      } )();

      const srcFromServer: string | undefined = data?.src;
      const assetSrc =
        srcFromServer ??
        `/${ isCertificate ? "certificates" : category }/${ savedFileName }`;
      const payload = isCertificate
        ? {
          name: title,
          issuer: description,
          img: assetSrc,
        }
        : {
          src: assetSrc,
          name,
          title,
          description,
          category,
          sub_category: normalizedSubCategory,
        };

      const endpoint = isCertificate
        ? "http://localhost:4000/certificates"
        : category === "foto"
          ? "http://localhost:4000/fotografiePhotos"
          : "http://localhost:4000/gardenPhotos";
      const eventName = isCertificate ? "certificates:updated" : "photos:updated";
      const itemLabel = isCertificate ? "Sertifika" : "Fotoğraf";

      let dbSaved = true;
      try {
        await axios.post( endpoint, payload, { timeout: 10000 } );
      } catch ( dbError ) {
        dbSaved = false;
        if ( axios.isAxiosError( dbError ) ) {
          console.warn( "DB kaydı başarısız:", dbError.message );
          alert(
            `${ itemLabel } yüklendi, ancak liste güncellenemedi: ${ dbError.message }`
          );
        } else {
          console.warn( "DB kaydı başarısız:", dbError );
          alert( `${ itemLabel } yüklendi, ancak liste güncellenemedi.` );
        }
      }

      if ( dbSaved ) {
        // Notify listeners to refresh photo lists
        try {
          window.dispatchEvent(
            new CustomEvent( eventName, {
              detail: { category, subCategory: normalizedSubCategory },
            } )
          );
        } catch {
          // Intentionally left empty
        }

        alert( `✓ ${ itemLabel } kaydedildi!` );
      }
      setFile( null );
      setName( "" );
      setTitle( "" );
      setDescription( "" );
      setSubCategory( "" );
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        console.error( "Axios Hatası:", error.message );
        alert( `Bir hata oluştu: ${ error.message }` );
      } else {
        console.error( "Bilinmeyen Hata:", error );
        alert( "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin." );
      }
    } finally {
      setLoading( false );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 460,
        mx: "auto",
        mt: 4,
        p: 3,
        color: "#fff",
        borderRadius: 4,
        background:
          "radial-gradient(120% 120% at 0% 0%, rgba(56, 189, 248, 0.18) 0%, rgba(15, 23, 42, 0.96) 45%, rgba(2, 6, 23, 0.98) 100%)",
        boxShadow: "0 24px 60px rgba(2, 6, 23, 0.5)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
      }}
    >
      <Typography variant="h6" mb={2} sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
        {isCertificate ? "Neues Zertifikat hinzufügen" : "Neues Foto hinzufügen"}
      </Typography>

      <Stack
        spacing={2}
        sx={{
          "& .MuiInputBase-root": {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: 2,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.25)",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.45)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#38bdf8",
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.75)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#e2e8f0",
          },
          "& .MuiSelect-icon": {
            color: "#fff",
          },
        }}
      >
        <Select
          value={category}
          onChange={( e ) =>
            setCategory( e.target.value as "foto" | "garten" | "certificates" )
          }
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#0b1120",
                color: "#fff",
                border: "1px solid rgba(148, 163, 184, 0.2)",
              },
            },
          }}
        >
          <MenuItem value="foto">foto</MenuItem>
          <MenuItem value="garten">garten</MenuItem>
          <MenuItem value="certificates">certificates</MenuItem>
        </Select>

        <Select
          value={subCategory}
          onChange={( e ) => setSubCategory( e.target.value )}
          displayEmpty
          disabled={isCertificate}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#0b1120",
                color: "#fff",
                border: "1px solid rgba(148, 163, 184, 0.2)",
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Unterkategorie wählen
          </MenuItem>
          {subCategories[ category ].map( ( s ) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ) )}
        </Select>

        <TextField
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={handleFile}
        />

        <TextField
          label="Dosya Adı"
          value={name}
          onChange={( e ) => setName( e.target.value )}
        />

        <TextField
          label={isCertificate ? "Sertifika Adı" : "Titel"}
          value={title}
          onChange={( e ) => setTitle( e.target.value )}
        />

        <TextField
          label={isCertificate ? "Kurum / Issuer" : "Beschreibung"}
          multiline
          rows={3}
          value={description}
          onChange={( e ) => setDescription( e.target.value )}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !file}
          sx={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 12px 24px rgba(2, 6, 23, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #1e40af 0%, #0284c7 100%)",
            },
          }}
        >
          Speichern
        </Button>
      </Stack>
    </Box>
  );
};

export { UploadForm };
