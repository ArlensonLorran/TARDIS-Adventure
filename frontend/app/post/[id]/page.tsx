async function getSinglePost(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, { cache: 'no-store' });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar o post específico:", error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const post = await getSinglePost(id);

  if (!post) {
    return (
      <main className="min-h-screen bg-space-dark text-star p-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">🌌 Post não encontrado no banco de dados</h1>
      </main>
    );
  }

  return (
  <main className="min-h-screen bg-space-dark text-star p-8">

    <article className="max-w-4xl mx-auto">

      <img
          src={post.imageUrl || "/images/tardis.jpg"}
          alt={post.title}
          className="w-full h-[450px] object-cover rounded-xl mb-8 shadow-2xl"
        />

      <h1 className="text-5xl font-bold mb-8">
        {post.title}
      </h1>

      <p className="text-lg leading-8">
        {post.content}
      </p>

    </article>

  </main>
);
}