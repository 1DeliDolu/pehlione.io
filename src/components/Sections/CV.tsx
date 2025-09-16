type Props = {
  cvUrl?: string
  onOpenDrawer?: () => void
}

function CV({ cvUrl = '/cv.pdf', onOpenDrawer }: Props) {
  return (
    <section id="cv" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Lebenslauf</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Fügen Sie hier eine kurze Zusammenfassung Ihres Lebenslaufs hinzu. Unten können Sie das PDF herunterladen.
      </p>
      <a
        href={cvUrl}
        className="inline-flex items-center px-4 py-2 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
        target="_blank"
        rel="noreferrer"
      >
        Lebenslauf als PDF herunterladen
      </a>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Lebenslauf“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default CV
