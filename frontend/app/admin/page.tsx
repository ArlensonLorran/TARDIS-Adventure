async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, { cache: 'no-store' });   
    if (!res.ok) {
      throw new Error('Falha ao buscar posts do backend');
    }
    return res.json();
  } catch (error) {
    console.error("Erro na integração do Admin:", error);
    return [];
  }
}
export default async function AdminPage() {
  const posts = await getPosts();
  return (
    <main className="min-h-screen bg-space-dark text-star p-8">

      <h1 className="text-8xl font-bold mb-8">
        Dashboard Administrativo
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-space-light rounded-xl overflow-hidden">

          <thead className="bg-azul-tardis">

            <tr>
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-center">Ações</th>
            </tr>

          </thead>

          <tbody>

            {posts.map((post: any) => (
              <tr
                key={post._id}
                className="border-b border-gray-700"
              >
                <td className="p-4">{post.title}</td>

                <td className="p-4">{post.createdAt}</td>

                <td className="p-4 text-center">

                  <button className="mr-4 text-yellow-400 hover:scale-110">
                    ✏️
                  </button>

                  <button className="text-red-500 hover:scale-110">
                    🗑️
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}