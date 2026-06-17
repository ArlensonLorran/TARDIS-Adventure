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
    <article className="bg-space-light p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
      <div>
        {/* Banner do Card: Agora renderiza a imagem real do banco (imageUrl) */}
        <div className="h-40 rounded-xl mb-4 overflow-hidden bg-azul-tardis">
          <img 
            src={post.imageUrl} 
            alt={`Capa do post: ${post.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Título do Post */}
        <h3 className="text-2xl font-bold mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Descrição do Post */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {post.description}
        </p>
      </div>

      {/* Botão de ação apontando para o ID dinâmico do MongoDB */}
      <div className="mt-6">
        <Link
          href={`/post/${post._id}`}
          className="inline-block bg-azul-tardis text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 transition-colors"
        >
          Ler postagem
        </Link>
      </div>
    </article>
  );
}