import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-space-dark text-star">

      {/* HEADER */}
      <header className="bg-azul-tardis h-24 flex items-center justify-between px-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-galaxy to-azul-tardis flex items-center justify-center text-xl">
            🚀
          </div>

          <div>
            <h2 className="font-bold text-2xl">
              Doctor Who
            </h2>

            <p className="text-sm opacity-80">
              Blog de Aventuras no Tempo e Espaço
            </p>
          </div>

        </div>

        <Link
          href="/admin"
          className="text-3xl hover:scale-110 transition-transform"
        >
          ⚙️
        </Link>

      </header>

      {/* CONTEÚDO */}
      <div className="flex">

        {/* MENU LATERAL */}
        <aside className="w-64 min-h-screen bg-space-light p-6 shadow-lg">

          <h3 className="font-bold text-xl mb-6">
            Navegação
          </h3>

          <nav className="flex flex-col gap-2">

            <Link
              href="/"
              className="p-3 rounded-lg hover:bg-space-dark transition"
            >
              📰 Feed
            </Link>

            <Link
              href="/tardisExplorer"
              className="p-3 rounded-lg hover:bg-space-dark transition"
            >
              🚀 Explorar Nave
            </Link>

            <Link
              href="/adventure"
              className="p-3 rounded-lg hover:bg-space-dark transition"
            >
              🌌 Aventura
            </Link>

            <Link
              href="/admin"
              className="
                mt-6
                bg-galaxy
                text-center
                py-3
                rounded-lg
                font-semibold
                hover:opacity-80
              "
            >
              Área Admin
            </Link>

          </nav>

        </aside>

        {/* FEED */}
        <section className="flex-1 p-8">

          {/* PESQUISA */}
          <input
            type="text"
            placeholder="🔍 Pesquisar postagens..."
            className="
              w-full
              rounded-xl
              px-5
              py-4
              text-black
              shadow-lg
            "
          />

          {/* POST DE DESTAQUE */}
          <article className="mt-8 bg-space-light p-6 rounded-xl shadow-lg">

            <span className="bg-galaxy px-3 py-1 rounded-full text-sm">
              Destaque
            </span>

            <h2 className="text-4xl font-bold mt-4 mb-4">
              Bem-vindo à TARDIS Adventure
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">

              <div className="flex-1">

                <p className="text-lg leading-8 opacity-90">
                  Aqui serão exibidas notícias,
                  curiosidades, teorias e aventuras
                  do universo Doctor Who. Explore
                  viagens no tempo, alienígenas,
                  planetas distantes e muito mais.
                </p>

              </div>

              <div
                className="
                  w-full
                  lg:w-72
                  h-56
                  rounded-xl
                  bg-gradient-to-br
                  from-azul-tardis
                  to-galaxy
                  flex
                  items-center
                  justify-center
                  text-6xl
                "
              >
                🚀
              </div>

            </div>

          </article>

          {/* ÚLTIMAS POSTAGENS */}
          <section className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Últimas Postagens
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <article className="bg-space-light p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

                <h3 className="text-xl font-bold mb-3">
                  A História da TARDIS
                </h3>

                <p className="opacity-80">
                  Descubra como a nave mais famosa do
                  universo consegue ser maior por dentro.
                </p>

              </article>

              <article className="bg-space-light p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

                <h3 className="text-xl font-bold mb-3">
                  Os Daleks
                </h3>

                <p className="opacity-80">
                  Conheça os maiores inimigos do Doutor
                  e sua origem no universo.
                </p>

              </article>

              <article className="bg-space-light p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

                <h3 className="text-xl font-bold mb-3">
                  Buracos Negros
                </h3>

                <p className="opacity-80">
                  Como funcionam os fenômenos espaciais
                  que desafiam as leis da física.
                </p>

              </article>

              <article className="bg-space-light p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

                <h3 className="text-xl font-bold mb-3">
                  O Décimo Doutor
                </h3>

                <p className="opacity-80">
                  Relembre momentos marcantes de uma das
                  encarnações mais amadas do Doutor.
                </p>

              </article>

            </div>

          </section>
          
          {/* COMENTÁRIOS */}
<section className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Comentários da Comunidade
  </h2>

  <div className="bg-space-light p-6 rounded-xl shadow-lg">

    {/* Formulário */}
    <div className="mb-6">

      <input
        type="text"
        placeholder="Seu nome"
        className="
          w-full
          p-3
          rounded-lg
          text-black
          mb-4
        "
      />

      <textarea
        placeholder="Escreva seu comentário..."
        className="
          w-full
          p-3
          rounded-lg
          text-black
          h-32
          resize-none
        "
      />

      <button
        className="
          mt-4
          bg-galaxy
          px-6
          py-3
          rounded-lg
          font-bold
          hover:opacity-80
        "
      >
        Comentar
      </button>

    </div>

    {/* Comentários exemplo */}

    <div className="space-y-4">

      <div className="bg-space-dark p-4 rounded-lg">

        <h4 className="font-bold">
          Clara Oswald
        </h4>

        <p className="opacity-80 mt-2">
          Adorei a matéria sobre a TARDIS!
        </p>

      </div>

      <div className="bg-space-dark p-4 rounded-lg">

        <h4 className="font-bold">
          River Song
        </h4>

        <p className="opacity-80 mt-2">
          O artigo dos Daleks ficou incrível.
        </p>

      </div>

    </div>

  </div>

</section>

        </section>

      </div>

    </main>
  );
}