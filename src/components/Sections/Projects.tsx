import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import type { Project } from '@/types/types'
import { staticProjects } from '@/constants/staticData'
import { apiBaseUrl } from '@/constants/api'

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

type ProjectEntry = Project & { id?: string | number }

const sortByIdDesc = (items: ProjectEntry[]) => {
  const hasId = items.some((item) => item.id !== undefined)
  if (!hasId) return items
  return [...items].sort((a, b) => {
    const aNum = Number(a.id)
    const bNum = Number(b.id)
    if (Number.isNaN(aNum) && Number.isNaN(bNum)) return 0
    if (Number.isNaN(aNum)) return 1
    if (Number.isNaN(bNum)) return -1
    return bNum - aNum
  })
}

function Projects({ onOpenDrawer, variant = 'summary' }: Props) {
  const [items, setItems] = useState<ProjectEntry[]>([])
  const apiBase = apiBaseUrl
  const fallbackItems = useMemo(() => sortByIdDesc(staticProjects), [])

  useEffect(() => {
    let mounted = true
    const apiUrl = apiBase ? `${apiBase}/projects` : ''
    if (!apiUrl) {
      if (mounted) setItems(fallbackItems)
      return () => {
        mounted = false
      }
    }
    axios
      .get<ProjectEntry[]>(apiUrl, { timeout: 5000 })
      .then((res) => {
        if (mounted) setItems(sortByIdDesc(res.data))
      })
      .catch(() => {
        if (mounted) setItems(fallbackItems)
      })
    return () => {
      mounted = false
    }
  }, [apiBase, fallbackItems])

  if (variant === 'detail') {
    return (
      <section id="projects" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h1 className="text-3xl font-bold mb-6">Projekte</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((p) => (
            <article key={p.name} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
              <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{p.description}</p>
              <div className="flex gap-3 text-sm">
                {p.demoUrl && (
                  <a className="text-blue-600 hover:underline" href={p.demoUrl} target="_blank" rel="noreferrer">
                    Live-Demo
                  </a>
                )}
                {p.repoUrl && (
                  <a className="text-blue-600 hover:underline" href={p.repoUrl} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Technologien</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>React + TypeScript + Vite</li>
          <li>Tailwind CSS & Material UI</li>
          <li>Go</li>
          <li>Rust</li>
          <li>Java & Spring Boot</li>
          <li>C# & .NET</li>
          {/* php symfony laravel */}
          <li>PHP, Symfony & Laravel</li>
          <li>Git, GitHub Workflows</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Highlights</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Responsives Layout und performante Komponenten</li>
          <li>Saubere Typisierung und wiederverwendbare Bausteine</li>
          <li>Erste Praxiserfahrungen mit Go</li>
          <li>Erste Praxiserfahrungen mit Rust</li>
          <li>Erste Praxiserfahrungen mit PHP, Symfony & Laravel</li>
          <li>Erste Praxiserfahrungen mit Java & Spring Boot</li>
          <li>Erste Praxiserfahrungen mit C# & .NET</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Weitere Links</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">Neueste Repositories</a>
          </li>
          <li>
            <a href="#developer" className="text-blue-600 hover:underline">Entwicklerprofil</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="projects" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Projekte</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <article key={p.name} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
            <h3 className="font-medium mb-1">{p.name}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{p.description}</p>
            <div className="flex gap-3 text-sm">
              {p.demoUrl && (
                <a className="text-blue-600 hover:underline" href={p.demoUrl} target="_blank" rel="noreferrer">
                  Live-Demo
                </a>
              )}
              {p.repoUrl && (
                <a className="text-blue-600 hover:underline" href={p.repoUrl} target="_blank" rel="noreferrer">
                  Repository
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Projekte“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default Projects
