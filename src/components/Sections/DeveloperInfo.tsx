const skills = ['TypeScript', 'React', 'Vite', 'Node.js', '.NET', 'Go']

type Props = { onOpenDrawer?: () => void }

function DeveloperInfo({ onOpenDrawer }: Props) {
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
