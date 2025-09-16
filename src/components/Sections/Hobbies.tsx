const hobbies = [
  { title: 'Gartenarbeit', detail: 'Pflanzenpflege und Landschaftsgestaltung.' },
  { title: 'Fotografie', detail: 'Ich fotografiere Natur- und Stadtmotive.' },
  { title: 'Musik', detail: 'Ich spiele Gitarre und interessiere mich für Musikproduktion.' },
]

type Props = { onOpenDrawer?: () => void }

function Hobbies({ onOpenDrawer }: Props) {
  return (
    <section id="hobbies" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Hobbys</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hobbies.map((h) => (
          <li key={h.title} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
            <h3 className="font-medium">{h.title}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{h.detail}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Hobbys“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default Hobbies
