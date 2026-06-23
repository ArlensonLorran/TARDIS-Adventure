// frontend/app/post/[id]/page.tsx
import Link from "next/link"; 
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
import CommentsSection from "@/components/CommentsSection"

interface Post {
  _id: string;
  title: string;
  content: string;
  comments: [];
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
        <CommentsSection 
          postId={post._id} 
          initialComments={post.comments || []} 
        />

      </div>
    </main>
  );
} 