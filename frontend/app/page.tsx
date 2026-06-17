// frontend/app/page.tsx
import Link from "next/link";
import PostCard from "@/components/PostCard";
export const dynamic = "force-dynamic";

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

async function getFeedPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, 
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error("Erro ao carregar o feed:", error);
    return []; 
  }
}

export default async function Home() {
  const posts = await getFeedPosts();
  const postDestaque = posts[0];
  const postsRestantes = posts.slice(1);

  return (
    <div className="min-h-screen w-full bg-space-dark text-white p-4 sm:p-6 md:p-10 overflow-x-hidden">
      <div className="mx-auto">
        
        {/* TÍTULO PRINCIPAL */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Linha do Tempo
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Explore crônicas, mistérios e segredos através do tempo e do espaço.
          </p>
        </div>

        {/* GRADE PRINCIPAL: Ajustada para garantir distribuição perfeita */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUNA DO FEED (OCUPA 2 COLUNAS) */}
          <section className="lg:col-span-2 w-full space-y-10">
            
            {/* POST DE DESTAQUE */}
            <div className="w-full">
              <h2 className="text-xs font-bold uppercase tracking-widest text-azul-tardis mb-4">
                // Transmissão Recente
              </h2>
              
              {postDestaque ? (
                <Link href={`/post/${postDestaque._id}`} className="block group w-full">
                  <article className="bg-space-light p-6 rounded-2xl shadow-xl border border-transparent group-hover:border-azul-tardis/50 transition duration-300 w-full overflow-hidden">
                    <div className="relative overflow-hidden rounded-xl mb-6 bg-azul-tardis h-64 md:h-80 w-full">
                      <img
                        src={postDestaque.imageUrl}
                        alt={postDestaque.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                      <span className="absolute top-4 left-4 bg-azul-tardis text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide shadow">
                        Destaque
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white group-hover:text-blue-400 transition leading-tight">
                      {postDestaque.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-4 text-sm md:text-base">
                      {postDestaque.content}
                    </p>
                  </article>
                </Link>
              ) : (
                <div className="bg-space-light p-8 rounded-2xl text-center text-gray-400 border border-dashed border-gray-800 w-full">
                  🌌 O vortex temporal está vazio... nenhum post publicado ainda.
                </div>
              )}
            </div>

            {/* ÚLTIMAS POSTAGENS */}
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
                Últimas Postagens
              </h2>

              {postsRestantes.length === 0 && !postDestaque ? (
                <p className="text-gray-400 text-sm">O silêncio impera no universo... nenhum outro post encontrado.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {postsRestantes.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}
            </div>

          </section>

          {/* BARRA LATERAL (OCUPA 1 COLUNA) */}
          <aside className="w-full space-y-8 lg:sticky lg:top-6">
            {/* BARRA DE PESQUISA */}
            <div className="bg-space-light p-5 rounded-2xl shadow-lg w-full">
              <h3 className="font-bold text-lg mb-3 text-white">Scanner de Dados</h3>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquisar arquivos da TARDIS..."
                  className="w-full bg-space-dark text-white rounded-xl pl-4 pr-10 py-3 text-sm border border-gray-800 focus:outline-none focus:border-azul-tardis transition"
                />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">🔍</span>
              </div>
            </div>

            {/* BOX INFORMATIVO */}
            <div className="bg-gradient-to-b from-space-light to-transparent p-6 rounded-2xl border border-gray-800 w-full">
              <div className="text-2xl mb-2">🌀</div>
              <h3 className="font-bold text-lg mb-2 text-white">Status do Sistema</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Conexão com o banco de dados estabelecida. Monitorando flutuações temporais através do servidor Render e da Vercel. Lembre-se: <em>"Don't Blink"</em>.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}









//import Link from "next/link";
//
//async function getFeedPosts() {
//  try {
//    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, { cache: "no-store" });
//    if (!res.ok) throw new Error();
//    return res.json();
//  } catch (error) {
//    console.error("Erro ao carregar o feed:", error);
//    return []; 
//  }
//}
//
//export default async function Home() {
//  const posts = await getFeedPosts();
//
//  const postDestaque = posts[0];
//  const postsRestantes = posts.slice(1);
//
//  return (
//    <main className="min-h-screen bg-space-dark text-star">
//
//      {/* HEADER */}
//      <header className="bg-azul-tardis h-24 flex items-center justify-between px-8 shadow-lg">
//        <div className="flex items-center gap-4">
//          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-galaxy to-azul-tardis flex items-center justify-center text-xl">
//            🚀
//          </div>
//          <div>
//            <h2 className="font-bold text-2xl text-white">Doctor Who</h2>
//            <p className="text-sm opacity-80">Blog de Aventuras no Tempo e Espaço</p>
//          </div>
//        </div>
//        <Link href="/admin" className="text-3xl hover:scale-110 transition-transform">
//          ⚙️
//        </Link>
//      </header>
//
//      {/* CONTEÚDO */}
//      <div className="flex">
//
//        {/* MENU LATERAL */}
//        <aside className="w-64 min-h-screen bg-space-light p-6 shadow-lg">
//          <h3 className="font-bold text-xl mb-6">Navegação</h3>
//          <nav className="flex flex-col gap-2">
//            <Link href="/" className="p-3 rounded-lg hover:bg-space-dark transition">📰 Feed</Link>
//            <Link href="/admin" className="mt-6 bg-galaxy text-center py-3 rounded-lg font-semibold hover:opacity-80 text-white">
//              Área Admin
//            </Link>
//          </nav>
//        </aside>
//
//        {/* FEED PRINCIPAL */}
//        <section className="flex-1 p-8">
//
//          {/* PESQUISA */}
//          <input
//            type="text"
//            placeholder="🔍 Pesquisar postagens..."
//            className="w-full rounded-xl px-5 py-4 text-black shadow-lg focus:outline-none"
//          />
//
//          {/* POST DE DESTAQUE DINÂMICO */}
//          {postDestaque ? (
//            <Link href={`/post/${postDestaque._id}`} className="block mt-8 group">
//              <article className="bg-space-light p-6 rounded-xl shadow-lg border border-transparent group-hover:border-blue-500 transition duration-200">
//                <span className="bg-galaxy px-3 py-1 rounded-full text-sm font-semibold">Destaque</span>
//                <h2 className="text-4xl font-bold mt-4 mb-4 text-white group-hover:text-blue-400 transition">
//                  {postDestaque.title}
//                </h2>
//                <div className="flex flex-col lg:flex-row gap-6">
//                  <div className="flex-1">
//                    <p className="text-lg leading-8 opacity-90 line-clamp-4">
//                      {postDestaque.content}
//                    </p>
//                  </div>
//                  <img
//                    src={postDestaque.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"}
//                    alt={postDestaque.title}
//                    className="w-full lg:w-72 h-56 rounded-xl object-cover shadow-md"
//                  />
//                </div>
//              </article>
//            </Link>
//          ) : (
//            <div className="mt-8 bg-space-light p-6 rounded-xl text-center text-gray-400">
//              Nenhum post publicado na galáxia ainda.
//            </div>
//          )}
//
//          {/* ÚLTIMAS POSTAGENS DINÂMICAS */}
//          <section className="mt-10">
//            <h2 className="text-3xl font-bold mb-6 text-white">Últimas Postagens</h2>
//
//            {postsRestantes.length === 0 && !postDestaque ? (
//              <p className="text-gray-400">O vazio do espaço... nenhum outro post encontrado.</p>
//            ) : (
//              <div className="grid md:grid-cols-2 gap-6">
//                {postsRestantes.map((post: any) => (
//                  <Link href={`/post/${post._id}`} key={post._id} className="group">
//                    <article className="bg-space-light p-6 rounded-xl shadow-lg hover:scale-[1.02] transition duration-200 border border-transparent group-hover:border-gray-700 h-full flex flex-col justify-between">
//                      <div>
//                        <span className="text-xs text-blue-400 font-mono">
//                          {new Date(post.createdAt).toLocaleDateString('pt-BR')}
//                        </span>
//                        <h3 className="text-xl font-bold my-2 text-white group-hover:text-blue-400 transition line-clamp-1">
//                          {post.title}
//                        </h3>
//                        <p className="opacity-80 text-sm line-clamp-3 leading-relaxed">
//                          {post.content}
//                        </p>
//                      </div>
//                    </article>
//                  </Link>
//                ))}
//              </div>
//            )}
//          </section>
//          
//          {/* COMENTÁRIOS ESTÁTICOS (Deixamos guardado aqui para a próxima parte!) */}
//          <section className="mt-10">
//            <h2 className="text-3xl font-bold mb-6 text-white">Comentários da Comunidade</h2>
//            <div className="bg-space-light p-6 rounded-xl shadow-lg">
//              <div className="mb-6">
//                <input type="text" placeholder="Seu nome" className="w-full p-3 rounded-lg text-black mb-4 focus:outline-none" />
//                <textarea placeholder="Escreva seu comentário..." className="w-full p-3 rounded-lg text-black h-32 resize-none focus:outline-none" />
//                <button className="mt-4 bg-galaxy px-6 py-3 rounded-lg font-bold hover:opacity-80 text-white">Comentar</button>
//              </div>
//              <div className="space-y-4">
//                <div className="bg-space-dark p-4 rounded-lg">
//                  <h4 className="font-bold text-white">Clara Oswald</h4>
//                  <p className="opacity-80 mt-2 text-sm">Adorei a matéria sobre a TARDIS!</p>
//                </div>
//                <div className="bg-space-dark p-4 rounded-lg">
//                  <h4 className="font-bold text-white">River Song</h4>
//                  <p className="opacity-80 mt-2 text-sm">O artigo dos Daleks ficou incrível.</p>
//                </div>
//              </div>
//            </div>
//          </section>
//
//        </section>
//      </div>
//    </main>
//  );
//}