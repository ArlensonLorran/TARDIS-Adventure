"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este arquivo da TARDIS?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        router.refresh(); // Isso faz a página re-renderizar e buscar os posts atualizados
      } else {
        alert("Erro ao apagar o post.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-400 hover:text-red-300 transition p-2 hover:bg-gray-800 rounded-lg"
    >
      🗑️ Excluir
    </button>
  );
}