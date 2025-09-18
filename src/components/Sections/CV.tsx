import { useState } from 'react'
import type { Cv } from '@/types'


function CV({ cvUrl, onOpenDrawer }: Cv) {
  // Default to the file in public/certificates, respecting Vite base path
  const defaultUrl = `${import.meta.env.BASE_URL}certificates/Lebenslauf.pdf`
  const href = cvUrl ?? defaultUrl
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const res = await fetch(href, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const cd = res.headers.get('content-disposition') || ''
      let filename = 'Lebenslauf.pdf'
      const match = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i)
      if (match) {
        filename = decodeURIComponent(match[1] || match[2])
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('CV download failed, opening in new tab.', err)
      window.open(href, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloading(false)
    }
  }
  return (
    <section id="cv" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Lebenslauf</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Unten können Sie das PDF herunterladen.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center px-4 py-2 rounded bg-neutral-900 text-black dark:bg-blue-600 dark:text-neutral-900 disabled:opacity-60 hover:opacity-90"
        >
          {downloading ? 'Wird heruntergeladen…' : 'Lebenslauf als PDF herunterladen'}
        </button>
        <a className="text-blue-600 hover:underline text-sm" href={href} target="_blank" rel="noreferrer">
          In neuem Tab öffnen
        </a>
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Lebenslauf“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default CV
