import { useEffect, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'

const systemDarkQuery = '(prefers-color-scheme: dark)'

function RootApp() {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia(systemDarkQuery).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(systemDarkQuery)

    const syncColorMode = (matches: boolean) => {
      setIsDark(matches)
      document.documentElement.classList.toggle('dark', matches)
    }

    syncColorMode(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      syncColorMode(event.matches)
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          background: {
            default: isDark ? '#020617' : '#f8fafc',
            paper: isDark ? '#111827' : '#ffffff',
          },
          text: {
            primary: isDark ? '#f8fafc' : '#0f172a',
            secondary: isDark ? '#f8fafc' : '#0f172a',
          },
        },
      }),
    [isDark],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  )
}

export default RootApp
