import { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { uploadBaseUrl } from "@/constants/api";

type LoginResponse = {
  token?: string;
  expiresIn?: number;
};

type Props = {
  onLoginSuccess: (session: { accessToken: string; expiresAt: number }) => void;
};

function AdminLoginForm({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password) {
      setErrorMessage("Bitte geben Sie Benutzername und Passwort ein.");
      return;
    }

    if (!uploadBaseUrl) {
      setErrorMessage("Login-API ist nicht konfiguriert.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const { data } = await axios.post<LoginResponse>(
        `${uploadBaseUrl}/auth/login`,
        {
          username: normalizedUsername,
          password,
        },
        {
          timeout: 10_000,
        }
      );

      if (!data?.token) {
        throw new Error("Token konnte nicht abgerufen werden.");
      }

      onLoginSuccess({
        accessToken: data.token,
        expiresAt: Date.now() + Math.max(Number(data.expiresIn ?? 0), 1) * 1000,
      });
      setPassword("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Benutzername oder Passwort ist falsch.");
        } else {
          setErrorMessage(`Anmeldung fehlgeschlagen: ${error.message}`);
        }
      } else {
        setErrorMessage(
          "Während der Anmeldung ist ein unbekannter Fehler aufgetreten.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="admin-form-card"
      sx={{
        p: 3,
        color: "#fff",
        mx: "auto",
      }}>
      <Typography
        variant="h6"
        mb={1}
        sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
        Admin-Anmeldung
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(226, 232, 240, 0.82)", mb: 2 }}>
        Der Server validiert Benutzername und Passwort über `.env`. Diese
        Informationen werden nicht automatisch vom Browser gelesen.
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
          "& .MuiFormHelperText-root": {
            color: "rgba(226, 232, 240, 0.75)",
            marginLeft: "4px",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#fda4af",
          },
        }}>
        <TextField
          label="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          helperText={
            errorMessage ||
            "Das JWT wird nach der Anmeldung im Browser-Speicher gespeichert."
          }
          error={Boolean(errorMessage)}
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 12px 24px rgba(2, 6, 23, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #1e40af 0%, #0284c7 100%)",
            },
          }}>
          {loading ? "Anmeldung..." : "Anmelden"}
        </Button>
      </Stack>
    </Box>
  );
}

export default AdminLoginForm;
