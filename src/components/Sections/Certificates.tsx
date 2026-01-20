import { useEffect, useState } from "react";
import axios from "axios";
import OptimizedImage from "@/components/OptimizedImage";
import type { Cert } from "@/types/types";

type Props = { onOpenDrawer?: () => void; variant?: "summary" | "detail" };

type CertEntry = Cert & { id?: string | number };

const sortByIdDesc = (items: CertEntry[]) => {
  const hasId = items.some((item) => item.id !== undefined);
  if (!hasId) return [...items].reverse();
  return [...items].sort((a, b) => {
    const aNum = Number(a.id);
    const bNum = Number(b.id);
    if (Number.isNaN(aNum) && Number.isNaN(bNum)) return 0;
    if (Number.isNaN(aNum)) return 1;
    if (Number.isNaN(bNum)) return -1;
    return bNum - aNum;
  });
};

function Certificates({ onOpenDrawer, variant = "summary" }: Props) {
  const [items, setItems] = useState<CertEntry[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      axios
        .get<CertEntry[]>("http://localhost:4000/certificates", { timeout: 5000 })
        .then((res) => {
          if (mounted) setItems(sortByIdDesc(res.data));
        })
        .catch(() => {
          if (mounted) setItems([]);
        });
    };

    fetchData();
    const onUpdated = () => fetchData();
    window.addEventListener("certificates:updated", onUpdated as EventListener);
    return () => {
      mounted = false;
      window.removeEventListener(
        "certificates:updated",
        onUpdated as EventListener
      );
    };
  }, []);

  if (variant === "detail") {
    return (
      <section
        id="certificates"
        className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12"
      >
        <h2 className="text-3xl font-bold mb-6">Zertifikate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((c) => (
            <article
              key={c.name}
              className="group rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4"
            >
              <OptimizedImage
                src={c.img}
                alt={c.name}
                className="w-full aspect-[4/3] object-contain bg-neutral-50 dark:bg-neutral-900 rounded mb-3 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {c.issuer}
              </p>
              <a
                className="text-sm text-blue-600 hover:underline"
                href={encodeURI(c.img)}
                target="_blank"
                rel="noreferrer"
              >
                Bild in neuem Tab öffnen
              </a>
            </article>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Schwerpunkte</h3>
        <ul className="list-disc pl-6 mb-6 text-neutral-800 dark:text-neutral-200">
          <li>TypeScript & React: Hooks, Performance, Testing</li>
          <li>Go und Rust: Grundlagen und erste Backend-/CLI-Projekte</li>
          <li>Abfragen von Daten mit Microsoft Transact-SQL</li>
          <li>Generative AI: LLM-Architektur und Implementierung</li>
          {/* php symfony laravel  */}
          <li>PHP, Symfony, Laravel: Webentwicklung und Sicherheit</li>
          {/* Blazor for Front-End Development  */}
          <li>Blazor: Front-End-Entwicklung mit C# und .NET</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Ressourcen</h3>
        <ul className="list-disc pl-6">
          <li>
            <a href="#projects" className="text-blue-600 hover:underline">
              Beispiel-Projekte
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

  return (
    <section
      id="certificates"
      className="scroll-mt-24 w-full px-4 sm:px-6 lg:px-10 py-12"
    >
      <h2 className="text-2xl font-semibold mb-4">Zertifikate</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 3).map((c) => (
            <article
              key={c.name}
              className="group rounded border border-neutral-200/60 dark:border-neutral-800/60 p-4"
            >
              <OptimizedImage
                src={c.img}
                alt={c.name}
                className="w-full aspect-[4/3] object-contain bg-neutral-50 dark:bg-neutral-900 rounded mb-2 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <h3 className="font-medium">{c.name}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {c.issuer}
              </p>
              <a
                className="text-sm text-blue-600 hover:underline"
                href={encodeURI(c.img)}
                target="_blank"
                rel="noreferrer"
              >
                Bild öffnen
              </a>
            </article>
          ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Zertifikate“.
        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="ml-2 text-blue-600 hover:underline"
          >
            Im Drawer ansehen
          </button>
        )}
      </p>
    </section>
  );
}

export default Certificates;
