"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este arquivo da TARDIS?")) return;

    setIsDeleting(true);

    try {
      // Garante que pegamos a URL correta da API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      const res = await fetch(`${baseUrl}/api/posts/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        alert("Post excluído com sucesso!");
        router.refresh(); // Atualiza os dados da página atual
        
        // Se você estiver dentro da página de detalhes do post, o ideal é redirecionar para a home/admin:
        // router.push("/admin"); 
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Erro do servidor (${res.status}): ${errorData.message || "Não foi possível apagar."}`);
      }
    } catch (error) {
      console.error("Erro na requisição de DELETE:", error);
      alert("Erro de conexão. Verifique se o backend no Render está ativo.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-1"
    >
      {isDeleting ? "⏳ Sumindo..." : "Excluir"}
    </button>
  );
}