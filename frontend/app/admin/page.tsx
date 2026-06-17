import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
export const dynamic = "force-dynamic";

interface Post {
  _id: string;
  title: string;
  createdAt: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar posts');
    return res.json();
  } catch (error) {
    console.error("Erro na integração do Admin:", error);
    return [];
  }
}

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-space-dark text-white p-8">
      {/* HEADER DO ADMIN */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard Administrativo</h1>
          <p className="text-gray-400">Gerencie as transmissões da linha do tempo.</p>
        </div>
        <Link 
          href="/admin/create" 
          className="bg-azul-tardis hover:bg-blue-700 transition px-6 py-3 rounded-xl font-bold shadow-lg"
        >
          + Novo Post
        </Link>
      </div>

      {/* TABELA DE POSTS */}
      <div className="bg-space-light rounded-2xl shadow-xl overflow-hidden border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-space-dark/50 border-b border-gray-700">
            <tr>
              <th className="p-5 font-semibold text-gray-300">Título</th>
              <th className="p-5 font-semibold text-gray-300">Data de Criação</th>
              <th className="p-5 font-semibold text-center text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-space-dark/30 transition">
                  <td className="p-5 font-medium">{post.title}</td>
                  <td className="p-5 text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-5 text-center flex justify-center gap-4">
                    <Link 
                      href={`/admin/edit/${post._id}`} 
                        className="bg-azul-tardis hover:bg-blue-700 transition px-6 py-3 rounded-xl font-bold shadow-lg">
                       ✏️ Editar
                    </Link>
                    <DeleteButton id={post._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-500">
                  Nenhum registro encontrado no banco de dados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}