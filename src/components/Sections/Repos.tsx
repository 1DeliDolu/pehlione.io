import { useEffect, useState } from 'react'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  updated_at: string
}

type Props = {
  username: string
  perPage?: number
  onOpenDrawer?: () => void
}

function Repos({ username, perPage = 5, onOpenDrawer }: Props) {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${perPage}`
    setError(null)
    setRepos(null)
    fetch(url, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`)
        return (await r.json()) as Repo[]
      })
      .then((data) => setRepos(data))
      .catch((e) => {
        if (e.name !== 'AbortError') setError(String(e))
      })
    return () => controller.abort()
  }, [username, perPage])

  return (
    <section id="repos" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">@{username}</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && !repos && <p className="text-sm">Wird geladen...</p>}
      {repos && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((r) => (
            <li key={r.id} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
              <a href={r.html_url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                {r.name}
              </a>
              {r.description && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{r.description}</p>
              )}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 flex gap-3">
                {r.language && <span>{r.language}</span>}
                <span>⭐ {r.stargazers_count}</span>
                <span>Aktualisiert am {new Date(r.updated_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Repositories“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default Repos
