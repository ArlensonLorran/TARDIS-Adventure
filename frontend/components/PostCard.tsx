import Link from "next/link";
interface PostCardProps {
  title: string;
  description: string;
}

export default function PostCard({
  title,
  description,
}: PostCardProps) {
  return (
    <article className="bg-space-light p-6 rounded-2xl shadow-lg">

      <div className="h-40 bg-azul-tardis rounded-xl mb-4"></div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-300">
        {description}
      </p>

    </article>
  );
}
<Link
  href="/post/1"
  className="mt-4 inline-block bg-azul-tardis px-4 py-2 rounded"
>
  Ler postagem
</Link>