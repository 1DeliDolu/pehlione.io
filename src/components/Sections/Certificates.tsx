type Cert = {
  name: string
  issuer: string
  img: string // served from /public
}

// Images under public/certificates
const certificates: Cert[] = [
  { name: 'PHP', issuer: 'BTK', img: '/certificates/php.png' },
  { name: 'React', issuer: 'BTK', img: '/certificates/react.png' },
  { name: 'Transact-SQL', issuer: 'Microsoft', img: '/certificates/tsql.png' },
  {
    name: 'Generative AI Engineering with LLMs',
    issuer: 'Coursera',
    img: '/certificates/6UJ5Q3W7Q4IT.png'
  },
  {
    name: 'Building Generative AI-Powered Applications with Python',
    issuer: 'Coursera',
    img: '/certificates/SPUWYF1LZ4HN.png'
  },
  {
    name: 'Generative AI and LLMs: Architecture and Data Preparation',
    issuer: 'Coursera',
    img: '/certificates/KDHR6PKZH6DX.png'
  },
  {
    name: 'Java Programming: Solving Problems with Software',
    issuer: 'Coursera',
    img: '/certificates/GQAY75EGH85E.png'
  },
  {
    name: 'Advanced Styling with Responsive Design',
    issuer: 'Coursera',
    img: '/certificates/HHVRQZCEKE9M.png'
  },
  {
    name: 'Interactivity with JavaScript',
    issuer: 'Coursera',
    img: '/certificates/BBZHU77E8F6Y.png'
  },
  {
    name: 'Introduction to HTML5',
    issuer: 'Coursera',
    img: '/certificates/V2USGSAUHM55.png'
  },
  {
    name: 'Introduction to CSS3',
    issuer: 'Coursera',
    img: '/certificates/UXZ788Y7QCEG.png'
  },

]

type Props = { onOpenDrawer?: () => void; variant?: 'summary' | 'detail' }

function Certificates({ onOpenDrawer, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section id="certificates" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Zertifikate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {certificates.map((c) => (
            <article key={c.name} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
              <img
                src={encodeURI(c.img)}
                alt={c.name}
                className="w-full aspect-[4/3] object-contain bg-neutral-50 dark:bg-neutral-900 rounded mb-3"
                loading="lazy"
              />
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{c.issuer}</p>
              <a className="text-sm text-blue-600 hover:underline" href={encodeURI(c.img)} target="_blank" rel="noreferrer">
                Bild in neuem Tab öffnen
              </a>
            </article>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Schwerpunkte</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>TypeScript: Typen, Generics, Tooling</li>
          <li>React: Hooks, Performance, Testing</li>
          <li>Abfragen von Daten mit Microsoft Transact-SQL</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Ressourcen</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">Beispiel-Projekte</a>
          </li>
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">Neueste Repositories</a>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section id="certificates" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Zertifikate</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.slice(0, 3).map((c) => (
          <article key={c.name} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
            <img
              src={encodeURI(c.img)}
              alt={c.name}
              className="w-full aspect-[4/3] object-contain bg-neutral-50 dark:bg-neutral-900 rounded mb-2"
              loading="lazy"
            />
            <h3 className="font-medium">{c.name}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{c.issuer}</p>
            <a className="text-sm text-blue-600 hover:underline" href={encodeURI(c.img)} target="_blank" rel="noreferrer">
              Bild öffnen
            </a>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Zertifikate“.
        {onOpenDrawer && (
          <button onClick={onOpenDrawer} className="ml-2 text-blue-600 hover:underline">Im Drawer ansehen</button>
        )}
      </p>
    </section>
  )
}

export default Certificates
