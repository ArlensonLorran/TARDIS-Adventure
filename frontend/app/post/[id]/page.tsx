// frontend/app/post/[id]/page.tsx
import Link from "next/link"; 
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

interface Post {
  _id: string;
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

interface PostPageProps {
  params: Promise<{ id: string }>;
}

async function getSinglePost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Erro ao carregar o post:", error);
    return null;
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getSinglePost(resolvedParams.id);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen w-full bg-space-dark text-white p-4 sm:p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* BOTÃO DE VOLTAR */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-azul-tardis transition group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> 
            Voltar para a Linha do Tempo
          </Link>
        </div>

        {/* ARTIGO COMPLETO */}
        <article className="bg-space-light p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800/40 w-full overflow-hidden">
          
          <div className="flex items-center gap-3 text-xs md:text-sm text-azul-tardis font-mono mb-4">
            <span>Transmissão em:</span>
            <time dateTime={post.createdAt} className="text-gray-400">{formattedDate}</time>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white break-words">
            {post.title}
          </h1>

          <div className="relative w-full h-48 sm:h-64 md:h-[450px] overflow-hidden rounded-2xl bg-zinc-950 mb-8 shadow-lg">
            <img
              src={post.imageUrl}
              alt={`Capa de: ${post.title}`}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            {post.description}
          </p>

          <div className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-6 whitespace-pre-line font-light break-words">
            {post.content}
          </div>

        </article>

        {/* SEÇÃO DE COMENTÁRIOS */}
        <section className="mt-10 bg-space-light p-5 sm:p-8 rounded-3xl shadow-xl border border-gray-800/40 w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            💬 Comentários da Comunidade
          </h2>
          
          <div className="mb-8 bg-space-dark/40 p-4 sm:p-6 rounded-2xl border border-gray-800 w-full">
            <h3 className="text-xs font-semibold text-gray-400 mb-4">// Deixe sua transmissão no Vortex</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome ou codinome espacial" 
                className="w-full bg-space-dark text-white rounded-xl p-3 text-sm border border-gray-800 focus:outline-none focus:border-azul-tardis transition" 
              />
              <textarea 
                placeholder="Escreva seu comentário... sem spoilers!" 
                className="w-full bg-space-dark text-white rounded-xl p-3 text-sm h-28 resize-none border border-gray-800 focus:outline-none focus:border-azul-tardis transition" 
              />
              <button className="bg-azul-tardis text-white px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition text-sm shadow-md">
                Transmitir Comentário
              </button>
            </div>
          </div>

          <div className="space-y-4 w-full">
            <div className="bg-space-dark/60 p-4 rounded-xl border border-gray-800/60 w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-azul-tardis text-sm">Clara Oswald</h4>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-gray-400 font-mono">A Garota Impossível</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Incrível! Ler este arquivo me fez lembrar exatamente de quando corremos pelo vortex.
              </p>
            </div>

            <div className="bg-space-dark/60 p-4 rounded-xl border border-gray-800/60 w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-azul-tardis text-sm">River Song</h4>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-gray-400 font-mono">Hello Sweetie</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Eu poderia dizer se o que está escrito aqui está 100% correto... mas isso seria spoiler. 😉
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
} 