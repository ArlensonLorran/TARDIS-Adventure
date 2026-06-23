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
    <main className="min-h-screen bg-slate-50 dark:bg-space-dark text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
      
      {/* HEADER DO ADMIN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm">Delete, crie ou altere os posts.</p>
        </div>
        <Link 
          href="/admin/create" 
          className="inline-block bg-azul-tardis text-white hover:opacity-90 transition px-6 py-3 rounded-xl font-bold shadow-md shadow-azul-tardis/10 text-sm w-full sm:w-auto text-center"
        >
          + Novo Post
        </Link>
      </div>

      {/* TABELA DE POSTS */}
      <div className="bg-white dark:bg-space-light rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-gray-800 w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 dark:bg-space-dark/50 border-b border-slate-200 dark:border-gray-700">
            <tr>
              <th className="p-5 font-semibold text-slate-700 dark:text-gray-300 text-sm">Título</th>
              <th className="p-5 font-semibold text-slate-700 dark:text-gray-300 text-sm">Data de Criação</th>
              <th className="p-5 font-semibold text-center text-slate-700 dark:text-gray-300 text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-50 dark:hover:bg-space-dark/30 transition-colors">
                  <td className="p-5 font-medium text-sm text-slate-900 dark:text-white">{post.title}</td>
                  <td className="p-5 text-sm text-slate-600 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-5 text-center flex justify-center items-center gap-4">
                    <Link 
                      href={`/admin/edit/${post._id}`} 
                      className="inline-block bg-azul-tardis text-white hover:opacity-90 transition px-6 py-3 rounded-xl font-bold shadow-md shadow-azul-tardis/10 text-sm"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={post._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-400 dark:text-gray-500 text-sm">
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