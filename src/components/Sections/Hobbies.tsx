const hobbies = [
  { title: 'Gartenarbeit', detail: 'Pflanzenpflege und Landschaftsgestaltung.' },
  { title: 'Fotografie', detail: 'Ich fotografiere Natur- und Stadtmotive.' },
  { title: 'Musik', detail: 'Ich höre gerne Musik und interessiere mich für verschiedene Genres.' },
]

type Props = {
  onOpenDrawer?: () => void
  variant?: 'summary' | 'detail'
  onOpenPage?: (page: 'gartenarbeit' | 'fotografie') => void
}

import ImageWithLoader from "@/components/ImageWithLoader";

function Hobbies({ onOpenDrawer, onOpenPage, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section id="hobbies" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Hobbys</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {hobbies.map((h) => (
            <article
              key={h.title}
              className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4"
              onClick={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? () => onOpenPage(h.title === 'Gartenarbeit' ? 'gartenarbeit' : 'fotografie') : undefined}
              role={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? 'button' : undefined}
              tabIndex={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? 0 : undefined}
              style={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? { cursor: 'pointer' } : undefined}
            >
              <h3 className="font-semibold text-lg">{h.title}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{h.detail}</p>
            </article>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Outdoor</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Gartenplanung: saisonale Beete, Bewässerung, Bodenpflege</li>
          <li>Wandern & Naturerkundung in Hessen</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Kreativ</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Fotografie: Komposition, Bearbeitung, Lichtführung</li>
          <li>Musik: Ich höre gerne Musik und interessiere mich für verschiedene Genres.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6 mb-8">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">Meine Projekte</a>
          </li>
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">Neueste Repositories</a>
          </li>
        </ul>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" style={{ contentVisibility: 'auto' }}>
          <figure className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-3 flex items-center justify-center bg-white dark:bg-neutral-900">
            <ImageWithLoader
              src="/sonnen_blumen.jpeg"
              alt="Galerie 1"
              width={64}
              height={64}
              ratio={null}
              wrapperClassName="h-16 w-16"
              className="transition-transform duration-200 ease-out hover:scale-110"
              overlayBg="rgba(0,0,0,0.05)"
            />
          </figure>
          <figure className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-3 flex items-center justify-center bg-white dark:bg-neutral-900">
            <ImageWithLoader
              src="/foto.JPG"
              alt="Galerie 2"
              width={64}
              height={64}
              ratio={null}
              wrapperClassName="h-16 w-16"
              className="object-cover transition-transform duration-200 ease-out hover:scale-110"
              overlayBg="rgba(0,0,0,0.05)"
            />
          </figure>
          <figure className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-3 flex items-center justify-center bg-white dark:bg-neutral-900">
            <ImageWithLoader
              src="/foto/apfelblumen.png"
              alt="Galerie 3"
              width={64}
              height={64}
              ratio={null}
              wrapperClassName="h-16 w-16"
              className="transition-transform duration-200 ease-out hover:scale-110"
              overlayBg="rgba(0,0,0,0.05)"
            />
          </figure>
        </div>
      </section>
    )
  }

  // summary
  return (
    <section id="hobbies" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Hobbys</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hobbies.map((h) => (
          <li
            key={h.title}
            className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4"
            onClick={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? () => onOpenPage(h.title === 'Gartenarbeit' ? 'gartenarbeit' : 'fotografie') : undefined}
            role={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? 'button' : undefined}
            tabIndex={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? 0 : undefined}
            style={onOpenPage && (h.title === 'Gartenarbeit' || h.title === 'Fotografie') ? { cursor: 'pointer' } : undefined}
          >
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
