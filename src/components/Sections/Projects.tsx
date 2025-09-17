type Project = {
  name: string
  description: string
  demoUrl?: string
  repoUrl?: string
}

const projects: Project[] = [
  {
    name: 'Portfolio-Website',
    description: 'Persönliche Website mit React + TypeScript + Vite.',
    demoUrl: 'https://pehlione.com/',
    repoUrl: 'https://github.com/1DeliDolu/pehlione.io/',
  },
  {
    name: 'Task Tracker',
    description: 'Einfache To-do-App mit Persistenz über localStorage.',
    demoUrl: 'https://pehlione.com/',
    repoUrl: 'https://github.com/1DeliDolu/pehlione.io',
  },
]

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

function Projects({ onOpenDrawer, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section id="projects" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Projekte</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {projects.map((p) => (
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
          <li>Material UI & Tailwind CSS</li>
          <li>Git, GitHub Workflows</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Highlights</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Responsives Layout und performante Komponenten</li>
          <li>Saubere Typisierung und wiederverwendbare Bausteine</li>
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
        {projects.map((p) => (
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
