const skills = [
  'JavaScript', 'Node.js', 'TypeScript', 'React', 'XML/JSON',
  'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap',
  'Java', 'C#', 'SQL', 'Microsoft SQL-Server', 'MySQL',
  'Go', 'REST API', 'Logging & Monitoring', 'Cache', 'Schnittstellenprogrammierung',
  'PHP', 'OOP', 'Symfony', 'Laravel','shadcn/ui', 'Radix UI', 'MUI', 'Vite', 'ESLint', 'Prettier', 'Vitest', 'Jest', 'Cypress', 'GitHub Actions', 'Docker'
]

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

function DeveloperInfo({ onOpenDrawer, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Anwendungsentwickler</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          Profil mit Schwerpunkt Webentwicklung, komponentenbasierte UIs und robuste Toolchains.
        </p>

        <h3 className="text-xl font-semibold mb-2">Kompetenzen</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((s) => (
            <span key={s} className="px-2 py-1 rounded border border-neutral-200/60 dark:border-neutral-800/60 text-sm">
              {s}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Aufgaben</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Architektur und Umsetzung moderner Webanwendungen</li>
          <li>Qualitätssicherung: Tests, Linting, Code-Reviews</li>
          <li>CI/CD und saubere Deployments</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Soft Skills</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Teamarbeit, Kommunikation, Mentoring</li>
          <li>Analytisches Denken und Problemlösung</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">Projekte</a>
          </li>
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">Repositories</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Anwendungsentwickler</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Profil als Anwendungsentwickler: Fokus auf Webtechnologien, moderne Frontend-Tools
        und die Entwicklung skalierbarer Anwendungen.
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="px-2 py-1 rounded border border-neutral-200/60 dark:border-neutral-800/60 text-sm"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Anwendungsentwickler“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default DeveloperInfo
