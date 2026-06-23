import Link from "next/link";

// Tipagem idêntica aos campos que o seu PostSchema do Mongoose entrega
interface Post {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    // Ajustado: bg-white no claro, bg-space-light no escuro. Adicionada borda sutil no claro.
    <article className="bg-white dark:bg-space-light p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-transparent flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Banner do Card: Agora renderiza a imagem real do banco (imageUrl) */}
        <div className="h-40 rounded-xl mb-4 overflow-hidden bg-azul-tardis">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={`Capa do post: ${post.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Título do Post */}
        {/* Ajustado: texto slate-900 no claro, branco no escuro */}
        <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-slate-900 dark:text-white">
          {post.title}
        </h3>

        {/* Descrição do Post */}
        {/* Ajustado: texto slate-600 no claro, gray-300 no escuro */}
        <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Botão de ação apontando para o ID dinâmico do MongoDB */}
      <div className="mt-6">
        <Link
          href={`/post/${post._id}`}
          className="inline-block bg-azul-tardis text-white px-4 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm shadow-md shadow-azul-tardis/10"
        >
          Ler postagem
        </Link>
      </div>
    </article>
  );
}