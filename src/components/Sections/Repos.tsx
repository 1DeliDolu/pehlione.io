import { useEffect, useMemo, useState } from 'react'
import { staticProjects } from '@/constants/staticData'
import { apiBaseUrl } from '@/constants/api'
import type { Repo_, Repo } from '@/types/types'

const getRepoNameFromUrl = (url: string) => {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, '')
    return pathname.split('/').pop()?.replace(/\.git$/, '') ?? url
  } catch {
    return url.replace(/\/+$/, '').split('/').pop()?.replace(/\.git$/, '') ?? url
  }
}

const inferLanguage = (input: string) => {
  const value = input.toLowerCase()
  if (value.includes('typescript') || value.includes('react')) return 'TypeScript'
  if (value.includes('go ') || value.includes('golang')) return 'Go'
  if (value.includes('spring boot') || value.includes('java')) return 'Java'
  if (value.includes('laravel') || value.includes('symfony') || value.includes('php')) return 'PHP'
  if (value.includes('c#') || value.includes('.net')) return 'C#'
  return null
}

const toStaticRepo = (
  project: (typeof staticProjects)[number],
  index: number,
): Repo => ({
  id: -(index + 1),
  name: project.repoUrl ? getRepoNameFromUrl(project.repoUrl) : project.name,
  html_url: project.repoUrl ?? project.demoUrl ?? '#',
  description: project.description,
  stargazers_count: -1,
  language: inferLanguage(`${project.name} ${project.description}`),
  updated_at: '',
  pushed_at: '',
})

function Repos({ username, perPage = 10, onOpenDrawer, variant = 'summary' }: Repo_) {
  const repoLimit = variant === 'detail' ? 10 : perPage
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const fallbackRepos = useMemo(
    () =>
      staticProjects
        .filter((project) => project.repoUrl || project.demoUrl)
        .map(toStaticRepo)
        .slice(0, repoLimit),
    [repoLimit],
  )

  useEffect(() => {
    const controller = new AbortController()
    const cacheKey = `repos-cache:${username}`
    const url = apiBaseUrl
      ? `${apiBaseUrl}/github/users/${encodeURIComponent(username)}/repos?per_page=${repoLimit}`
      : ''
    setNotice(null)
    setRepos(null)
    if (!url) {
      setRepos(fallbackRepos)
      return () => controller.abort()
    }

    fetch(url, {
      signal: controller.signal,
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`)
        return {
          repos: (await r.json()) as Repo[],
          source: r.headers.get('X-Repo-Source'),
          warning: r.headers.get('X-Repo-Warning'),
        }
      })
      .then(({ repos: data, source, warning }) => {
        setRepos(data)
        if (source !== 'static') {
          localStorage.setItem(cacheKey, JSON.stringify(data))
        }
        if (source === 'static') {
          setNotice('GitHub API derzeit nicht verfügbar. Es werden statische Repository-Daten angezeigt.')
          return
        }
        if (source === 'cache' && warning) {
          setNotice('GitHub API derzeit nicht verfügbar. Zuletzt geladene Repository-Daten werden angezeigt.')
          return
        }
        setNotice(null)
      })
      .catch((e) => {
        if (e.name === 'AbortError') return

        const cachedRepos = JSON.parse(localStorage.getItem(cacheKey) ?? 'null') as Repo[] | null
        if (cachedRepos && cachedRepos.length > 0) {
          setRepos(cachedRepos.slice(0, repoLimit))
          setNotice('GitHub API derzeit nicht verfügbar. Zuletzt geladene Repository-Daten werden angezeigt.')
          return
        }

        setRepos(fallbackRepos)
        setNotice('GitHub API derzeit nicht verfügbar. Es werden statische Repository-Daten angezeigt.')
      })
    return () => controller.abort()
  }, [username, repoLimit, fallbackRepos])

  const renderMeta = (repo: Repo) => {
    const metaItems = [
      repo.language,
      repo.stargazers_count >= 0 ? `⭐ ${repo.stargazers_count}` : null,
      repo.pushed_at ? `Pushed at ${new Date(repo.pushed_at).toLocaleDateString()}` : null,
    ].filter(Boolean)

    if (metaItems.length === 0) return null

    return (
      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 flex gap-3">
        {metaItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <section id="repos" className="scroll-mt-24 w-screen -ml-[65px] -mr-[65px] px-[calc(65px+1rem)] sm:px-[calc(65px+1.5rem)] lg:px-[calc(65px+2.5rem)] py-12">
        <h2 className="text-3xl font-bold mb-6">Repositories • Details</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">@{username}</p>
        {notice && <p className="text-sm text-amber-600 dark:text-amber-300 mb-4">{notice}</p>}
        {!repos && <p className="text-sm">Loading...</p>}
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
                {renderMeta(r)}
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
      {notice && <p className="text-sm text-amber-600 dark:text-amber-300 mb-4">{notice}</p>}
      {!repos && <p className="text-sm">Loading...</p>}
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
              {renderMeta(r)}
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
