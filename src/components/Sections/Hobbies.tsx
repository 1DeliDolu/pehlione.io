import type { Props } from '@/types/types'
import hobbies from "@/constants/constants"
import OptimizedImage from "@/components/OptimizedImage";
import "@/styles/Hobbies.css"

function Hobbies({ onOpenDrawer, onOpenPage, onOpenDeveloper, variant = 'summary' }: Props) {
  if (variant === 'detail') {
    return (
      <section
        id="hobbies"
        className="scroll-mt-24 w-full min-h-screen px-4 sm:px-6 lg:px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Hobbys</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {hobbies.map((h) => {
            const isFoto =
              h.title === "Fotografie" || h.title === "Gartenarbeit";
            const isProg = h.title === "Programmieren";
            const clickable =
              (isFoto && !!onOpenPage) || (isProg && !!onOpenDeveloper);
            const handleClick = clickable
              ? () => {
                if (isFoto && onOpenPage)
                  onOpenPage(
                    h.title === "Gartenarbeit" ? "gartenarbeit" : "fotografie",
                  );
                else if (isProg && onOpenDeveloper) onOpenDeveloper();
              }
              : undefined;
            return (
              <article
                key={h.title}
                className="group rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
                {h.img && (
                  <OptimizedImage
                    src={h.img}
                    alt={h.title}
                    className="w-full aspect-[4/3] object-cover bg-neutral-50 dark:bg-neutral-900 rounded mb-3 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {clickable ? (
                  <button
                    type="button"
                    className="hobby-button"
                    onClick={handleClick}
                    aria-label={`${h.title} öffnen`}>
                    <h3 className="font-semibold text-lg">{h.title}</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {h.detail}
                    </p>
                  </button>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">{h.title}</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {h.detail}
                    </p>
                  </>
                )}
              </article>
            );
          })}
        </div>

        <h3 className="text-xl font-semibold mb-2">Outdoor</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>Gartenplanung: saisonale Beete, Bewässerung, Bodenpflege</li>
          <li>Wandern & Naturerkundung in Hessen</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Kreativ</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>
            Fotografie: Komposition, Bearbeitung, Lichtführung – überwiegend als
            Hobby auf Amateur-Niveau
          </li>
          <li>Musik: hören, Interessen an verschiedenen Genres</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Technik</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>
            Webentwicklung mit TypeScript & React – von der Idee bis zum
            fertigen UI
          </li>
          <li>
            Backend-Entwicklung mit Java & Spring Boot für robuste REST-APIs
          </li>
          <li>
            PHP-Projekte mit Laravel und Symfony – MVC, Routing und
            Datenbankanbindung
          </li>
          <li>
            C# & .NET: Blazor für interaktive Web-UIs und ASP.NET für
            Backend-Services
          </li>
          <li>
            Backend-Experimente mit Go und Rust für CLI-Tools und kleine
            Services
          </li>
          <li>
            Interesse an modernen UI-Bibliotheken wie shadcn/ui, Radix UI und
            Tailwind CSS
          </li>
          <li>Neugier auf neue Technologien und Freude am Ausprobieren</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Links</h3>
        <ul className="list-disc pl-6 mb-8">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">
              Meine Projekte
            </a>
          </li>
          <li>
            <a href="#repos" className="text-blue-600 hover:underline">
              Neueste Repositories
            </a>
          </li>
        </ul>
      </section>
    );
  }

  // summary
  return (
    <section
      id="hobbies"
      className="scroll-mt-24 w-full min-h-screen px-4 sm:px-6 lg:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-4">Hobbys</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hobbies.map((h) => {
          const isFoto = h.title === "Fotografie" || h.title === "Gartenarbeit";
          const isProg = h.title === "Programmieren";
          const clickable =
            (isFoto && !!onOpenPage) || (isProg && !!onOpenDeveloper);
          const handleClick = clickable
            ? () => {
              if (isFoto && onOpenPage)
                onOpenPage(
                  h.title === "Gartenarbeit" ? "gartenarbeit" : "fotografie",
                );
              else if (isProg && onOpenDeveloper) onOpenDeveloper();
            }
            : undefined;
          return (
            <article
              key={h.title}
              className="group rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4">
              {h.img && (
                <OptimizedImage
                  src={h.img}
                  alt={h.title}
                  className="w-full aspect-[4/3] object-cover bg-neutral-50 dark:bg-neutral-900 rounded mb-2 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              {clickable ? (
                <button
                  type="button"
                  className="hobby-button"
                  onClick={handleClick}
                  aria-label={`${h.title} öffnen`}>
                  <h3 className="font-medium">{h.title}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {h.detail}
                  </p>
                </button>
              ) : (
                <>
                  <h3 className="font-medium">{h.title}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {h.detail}
                  </p>
                </>
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Hobbys“.
        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="ml-2 text-blue-600 hover:underline">
            Im Drawer ansehen
          </button>
        )}
      </p>
    </section>
  );
}

export default Hobbies
