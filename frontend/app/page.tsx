export default function Home() {
  return (
    <main className="min-h-screen bg-space-dark text-star">

      {/* HEADER */}
      <header className="bg-azul-tardis shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-3xl font-bold">
            TARDIS Adventure 
          </h1>

          {/* MENU */}
          <nav className="flex gap-6 text-lg">

            <a
              href="/"
              className="hover:text-galaxy transition"
            >
              Home
            </a>

            <a
              href="/adventure"
              className="hover:text-galaxy transition"
            >
              Adventure
            </a>

            <a
              href="/prevision"
              className="hover:text-galaxy transition"
            >
              Prevision
            </a>

          </nav>

        </div>

      </header>

      {/* ÁREA PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* TÍTULO */}
        <div className="mb-12 text-center">

          <h2 className="text-5xl font-extrabold mb-4">
            Blog 
          </h2>

          <p className="text-space-light text-xl">
            Notícias, aventuras e mistérios do universo.
          </p>

        </div>

        {/* FEED DO BLOG */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* CARD 1 */}
          <article className="bg-space-light p-6 rounded-2xl shadow-lg">

            <div className="h-40 bg-azul-tardis rounded-xl mb-4"></div>

            <h3 className="text-2xl font-bold mb-3">
              Viagem Temporal
            </h3>

            <p className="text-gray-300">
              Conteúdo do blog aparecerá aqui futuramente.
            </p>

          </article>

          {/* CARD 2 */}
          <article className="bg-space-light p-6 rounded-2xl shadow-lg">

            <div className="h-40 bg-galaxy rounded-xl mb-4"></div>

            <h3 className="text-2xl font-bold mb-3">
              Buracos Negros
            </h3>

            <p className="text-gray-300">
              Área reservada para postagens do sistema.
            </p>

          </article>

          {/* CARD 3 */}
          <article className="bg-space-light p-6 rounded-2xl shadow-lg">

            <div className="h-40 bg-azul-tardis rounded-xl mb-4"></div>

            <h3 className="text-2xl font-bold mb-3">
              A TARDIS
            </h3>

            <p className="text-gray-300">
              Estrutura visual inicial do feed do blog.
            </p>

          </article>

        </div>

      </section>

    </main>
  );
}