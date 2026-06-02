import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-space-dark text-star">

      <header className="bg-azul-tardis shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            TARDIS Adventure
          </h1>

          <nav className="flex gap-6">
            <Link href="/">
              Feed
            </Link>

            <Link href="/admin">
              Admin
            </Link>
          </nav>

        </div>

      </header>

      <section className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-bold mb-4">
          Feed Principal
        </h2>

        <p>
          Aqui serão exibidas as postagens do blog.
        </p>
      </section>

    </main>
  );
}