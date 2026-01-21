import { certificateSkills as skills } from "@/constants/certificate";

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

function DeveloperInfo( { onOpenDrawer, variant = 'summary' }: Props ) {
  if ( variant === 'detail' ) {
    return (
      <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Anwendungsentwickler</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          Teamorientiert, motiviert und offen für Neues. Fokus auf saubere Umsetzung,
          klare Kommunikation und kontinuierliche Weiterentwicklung.
        </p>

        <h3 className="text-xl font-semibold mb-2">Arbeitsweise & Team</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Strukturiert, zuverlässig und lösungsorientiert</li>
          <li>Offen für Feedback und gemeinsame Abstimmung</li>
          <li>Transparente Kommunikation im Team</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Motivation & Lernbereitschaft</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Schnelles Einarbeiten in neue Technologien</li>
          <li>Interesse an Best Practices, Tests und sauberem Code</li>
          <li>Kontinuierliches Lernen durch Praxis und Dokumentation</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Technische Kenntnisse (Auszug)</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map( ( s ) => (
            <span key={s} className="px-2 py-1 rounded border border-neutral-200/60 dark:border-neutral-800/60 text-sm">
              {s}
            </span>
          ) )}
        </div>

        <h3 className="text-xl font-semibold mb-2">Persönliche Schwerpunkte</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Saubere UI, klare Struktur und nachvollziehbare Entscheidungen</li>
          <li>Wartbare Komponenten und konsistente Qualität</li>
          <li>Dokumentation und saubere Übergaben</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="https://github.com/1DeliDolu/PRTG.git" className="text-blue-600 hover:underline">Übungsprojekte</a>
          </li>
          <li>
            <a href="https://github.com/1DeliDolu?tab=repositories" className="text-blue-600 hover:underline">GitHub Repositories</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="developer" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Anwendungsentwickler</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Teamorientiert, motiviert und lernbereit. Fokus auf klare Kommunikation und saubere Umsetzung.
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map( ( s ) => (
          <span
            key={s}
            className="px-2 py-1 rounded border border-neutral-200/60 dark:border-neutral-800/60 text-sm"
          >
            {s}
          </span>
        ) )}
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
