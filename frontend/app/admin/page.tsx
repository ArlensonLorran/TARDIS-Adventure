const posts = [
  {
    id: 1,
    title: "A TARDIS",
    date: "02/06/2026",
  },
  {
    id: 2,
    title: "Viagens Temporais",
    date: "01/06/2026",
  },
  {
    id: 3,
    title: "Buracos Negros",
    date: "28/05/2026",
  },
];

export default function AdminPage() {
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

            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-700"
              >
                <td className="p-4">{post.title}</td>

                <td className="p-4">{post.date}</td>

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