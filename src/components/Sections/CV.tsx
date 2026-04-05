import type { Cv } from "@/types";

function CV({ onOpenDrawer, onNavigateToCv }: Cv) {
  return (
    <section
      id="cv"
      className="scroll-mt-24 w-screen -ml-[65px] -mr-[65px] px-[calc(65px+1rem)] sm:px-[calc(65px+1.5rem)] lg:px-[calc(65px+2.5rem)] py-12">
      <h2 className="text-2xl font-semibold mb-4">Lebenslauf</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Hier finden Sie meinen Lebenslauf.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNavigateToCv}
          className="inline-flex items-center px-4 py-2 rounded bg-blue-600 dark:bg-orange-500 text-white hover:opacity-90">
          Lebenslauf ansehen
        </button>
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Mehr Details im Drawer unter „Lebenslauf“.
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

export default CV;
