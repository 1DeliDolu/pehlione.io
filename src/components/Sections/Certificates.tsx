type Cert = {
  name: string
  issuer: string
  link?: string
}

const certificates: Cert[] = [
  { name: 'TypeScript Fundamentals', issuer: 'Udemy', link: '#' },
  { name: 'React Developer', issuer: 'Coursera', link: '#' },
  { name: 'Git & GitHub', issuer: 'freeCodeCamp', link: '#' },
]

type Props = { onOpenDrawer?: () => void }

function Certificates({ onOpenDrawer }: Props) {
  return (
    <section id="certificates" className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Zertifikate</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c) => (
          <article key={c.name} className="rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
            <h3 className="font-medium">{c.name}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{c.issuer}</p>
            {c.link && (
              <a className="text-sm text-blue-600 hover:underline" href={c.link} target="_blank" rel="noreferrer">
                Zertifikat anzeigen
              </a>
            )}
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
