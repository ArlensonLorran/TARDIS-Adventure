// frontend/app/page.tsx
import Link from "next/link";
import PostCard from "@/components/PostCard";
export const dynamic = "force-dynamic";

interface Post {
  _id: string;
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

// Interface para capturar os parâmetros de busca da URL no Next.js v15+ / v14
interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

// Função modificada para suportar a sua rota de busca e a listagem padrão
async function getFeedPosts(query?: string): Promise<Post[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Se o usuário digitou algo, consome a rota '/search', caso contrário traz a rota padrão
    const endpoint = query 
      ? `${baseUrl}/api/posts/search?q=${encodeURIComponent(query)}`
      : `${baseUrl}/api/posts`;

    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error("Erro ao carregar os posts:", error);
    return []; 
  }
}

export default async function Home({ searchParams }: HomeProps) {
  // 1. Aguarda a resolução dos parâmetros da URL
  const resolvedParams = await searchParams;
  const query = resolvedParams.q;

  // 2. Busca os posts filtrados ou normais do backend
  const posts = await getFeedPosts(query);
  
  const postDestaque = posts[0];
  const postsRestantes = posts.slice(1);

  return (
    // Removido bg-space-dark fixo para herdar o tema claro/escuro global
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-10 overflow-x-hidden transition-colors duration-300">
      <div className="mx-auto">
        
        {/* TÍTULO PRINCIPAL */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
            {query ? `Resultados para: "${query}"` : "Linha do Tempo"}
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base">
            {query 
              ? `Encontramos ${posts.length} conexões nos arquivos de dados.` 
              : "Explore crônicas, mistérios e segredos através do tempo e do espaço."}
          </p>
        </div>

        {/* GRADE PRINCIPAL */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUNA DO FEED (OCUPA 2 COLUNAS) */}
          <section className="lg:col-span-2 w-full space-y-10">
            
            {/* POST DE DESTAQUE */}
            <div className="w-full">
              <h2 className="text-xs font-bold uppercase tracking-widest text-azul-tardis dark:text-blue-400 mb-4 font-mono">
                // {query ? "Arquivos Localizados" : "Transmissão Recente"}
              </h2>
              
              {postDestaque ? (
                <Link href={`/post/${postDestaque._id}`} className="block group w-full">
                  {/* Ajustado background para responder ao modo claro/escuro */}
                  <article className="bg-white dark:bg-space-light p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-transparent group-hover:border-azul-tardis/50 transition duration-300 w-full overflow-hidden text-slate-900 dark:text-white">
                    <div className="relative overflow-hidden rounded-xl mb-6 bg-azul-tardis h-64 md:h-80 w-full">
                      {postDestaque.imageUrl && (
                        <img
                          src={postDestaque.imageUrl}
                          alt={postDestaque.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      )}
                      <span className="absolute top-4 left-4 bg-azul-tardis text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide shadow">
                        Destaque
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition leading-tight">
                      {postDestaque.title}
                    </h2>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-4 text-sm md:text-base">
                      {postDestaque.description}
                    </p>
                  </article>
                </Link>
              ) : (
                <div className="bg-white dark:bg-space-light p-8 rounded-2xl text-center text-slate-500 dark:text-gray-400 border border-dashed border-slate-300 dark:border-gray-800 w-full">
                  🌌 O vortex temporal está vazio... nenhum post correspondente nesta dimensão.
                </div>
              )}
            </div>

            {/* ÚLTIMAS POSTAGENS */}
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-gray-800 pb-2">
                {query ? "Outras Ocorrências" : "Últimas Postagens"}
              </h2>

              {postsRestantes.length === 0 && !postDestaque ? (
                <p className="text-slate-500 dark:text-gray-400 text-sm">O silêncio impera no universo... nada mais por aqui.</p>
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
          <aside className="w-full space-y-8 lg:sticky lg:top-24">
            
            {/* BARRA DE PESQUISA (SCANNER DE DADOS) */}
            {/* Envolvida em um formulário nativo para executar a busca ao pressionar enter */}
            <form 
              action="/" 
              method="GET"
              className="bg-white dark:bg-space-light p-5 rounded-2xl shadow-lg border border-slate-200 dark:border-transparent w-full"
            >
              <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Scanner de Dados</h3>
              <div className="relative w-full">
                <input
                  type="text"
                  name="q" // O atributo name="q" faz o formulário colocar automaticamente ?q=... na URL
                  defaultValue={query || ""}
                  placeholder="Pesquisar arquivos da TARDIS..."
                  className="w-full bg-slate-50 dark:bg-space-dark text-slate-900 dark:text-white rounded-xl pl-4 pr-10 py-3 text-sm border border-slate-200 dark:border-gray-800 focus:outline-none focus:border-azul-tardis transition"
                />
                <button type="submit" className="absolute right-3 top-3 text-slate-400 hover:text-azul-tardis transition text-sm">
                  🔍
                </button>
              </div>
            </form>

            {/* BOX INFORMATIVO */}
            <div className="bg-gradient-to-b from-white to-slate-50 dark:from-space-light dark:to-transparent p-6 rounded-2xl border border-slate-200 dark:border-gray-800 w-full text-slate-900 dark:text-white">
              <div className="text-2xl mb-2">🌀</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Status do Sistema</h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                Conexão com o banco de dados estabelecida. Monitorando flutuações temporais através do servidor. Lembre-se: <em>"Don't Blink"</em>.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}