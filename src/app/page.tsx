export default function TodayPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
      <header className="mb-8">
        <p className="text-sm text-zinc-500">Today</p>
        <h1 className="text-2xl font-semibold tracking-tight">Ledger</h1>
      </header>

      <section
        aria-label="Today's habits"
        className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700"
      >
        <p className="font-medium">No habits yet</p>
        <p className="mt-1 text-sm text-zinc-500">
          Start with who you want to become, then make the first step take two
          minutes.
        </p>
      </section>
    </main>
  );
}
