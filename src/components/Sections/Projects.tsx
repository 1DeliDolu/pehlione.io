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
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    name: 'Task Tracker',
    description: 'Einfache To-do-App mit Persistenz über localStorage.',
    demoUrl: '#',
    repoUrl: '#',
  },
]

type Props = { onOpenDrawer?: () => void }

function Projects({ onOpenDrawer }: Props) {
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
