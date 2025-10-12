import { useEffect, useState } from 'react'
import type { Repo_, Repo } from '@/types/types'





function Repos({ username, perPage = 10, onOpenDrawer, variant = 'summary' }: Repo_) {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=${variant === 'detail' ? 10 : perPage}`
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
  }, [username, perPage, variant])

  if (variant === 'detail') {
    return (
      <section id="repos" className="scroll-mt-24 w-screen -ml-[65px] -mr-[65px] px-[calc(65px+1rem)] sm:px-[calc(65px+1.5rem)] lg:px-[calc(65px+2.5rem)] py-12">
        <h2 className="text-3xl font-bold mb-6">Repositories • Details</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">@{username}</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!error && !repos && <p className="text-sm">Loading...</p>}
        {repos && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {repos.map((r) => (
              <li key={r.id} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
                <a href={r.html_url} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                  {r.name}
                </a>
                {r.description && (
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{r.description}</p>
                )}
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 flex gap-3">
                  {r.language && <span>{r.language}</span>}
                  <span>⭐ {r.stargazers_count}</span>
                  <span>Pushed at {new Date(r.pushed_at).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-xl font-semibold mb-2">Filters & Tips</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Sorted by "pushed" to show the latest changes</li>
          <li>Star count and language for a quick assessment</li>
          <li>Special attention: Go and Rust repos for backend/CLI experience</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">Projects</a>
          </li>
          <li>
            <a href="#developer" className="text-blue-600 hover:underline">Developer Profile</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="repos" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">@{username}</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && !repos && <p className="text-sm">Loading...</p>}
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
                <span>Pushed at {new Date(r.pushed_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-neutral-500">
        More details in the drawer under "Repositories".
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">View in Drawer</button>
        )}
      </p>
    </section>
  )
}

export default Repos
