const posts = [
  {
    id: "1",
    title: "A TARDIS",
    image: "/images/tardis.jpg",
    content: "A TARDIS é a nave do Doutor."
  },
  {
    id: "2",
    title: "Viagens Temporais",
    image: "/images/time-travel.jpg",
    content: "As viagens temporais são o tema principal da série."
  }
];

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const post = posts.find(
    (post) => post.id === id
  );

  if (!post) {
    return <h1>Post não encontrado</h1>;
  }
  <img
  src={post.image}
  alt={post.title}
  className="w-full max-w-4xl rounded-xl mb-8"
 />

  return (
  <main className="min-h-screen bg-space-dark text-star p-8">

    <article className="max-w-4xl mx-auto">

      <h1 className="text-5xl font-bold mb-8">
        {post.title}
      </h1>

      <img
        src={post.image}
        alt={post.title}
        className="w-full rounded-xl mb-8"
      />

      <p className="text-lg leading-8">
        {post.content}
      </p>

    </article>

  </main>
);
}