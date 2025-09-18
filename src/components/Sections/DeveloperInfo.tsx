const skills = [
  'JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3',
  'Tailwind CSS', 'Bootstrap',
  'Node.js', 'SQL', 'MySQL',
  'Express.js', 'MongoDB',
  'REST APIs', 'GraphQL',
  'Golang', 'Docker','Rust','PHP','Laravel','Symfony',
  'Git', 'GitHub', 'Vite', 'ESLint', 'Prettier','Java','C#','Playwright',
]

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

function DeveloperInfo({ onOpenDrawer, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Junior Anwendungsentwickler</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          Einstieg als Junior Developer mit Fokus auf Webentwicklung und modernen Frontend-Technologien.
        </p>

        <h3 className="text-xl font-semibold mb-2">Grundkenntnisse</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((s) => (
            <span key={s} className="px-2 py-1 rounded border border-neutral-200/60 dark:border-neutral-800/60 text-sm">
              {s}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Aufgaben</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Mitarbeit an der Entwicklung von Webanwendungen</li>
          <li>Unterstützung bei Tests, Linting und Code-Reviews</li>
          <li>Lernen und Anwenden von Best Practices im Team</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Soft Skills</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Lernbereitschaft und Teamarbeit</li>
          <li>Offene Kommunikation und Feedbackkultur</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">Übungsprojekte</a>
          </li>
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">GitHub Repositories</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Junior Anwendungsentwickler</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Einstieg als Junior Developer: Schwerpunkt Webtechnologien und kontinuierliches Lernen.
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
        Mehr Details im Drawer unter „Junior Anwendungsentwickler“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default DeveloperInfo
