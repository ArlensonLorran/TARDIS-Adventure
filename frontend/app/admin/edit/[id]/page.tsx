"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  // Desembrulha os parâmetros da rota de forma assíncrona exigida pelo Next.js 15
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState(""); // ✨ Adicionado o estado da descrição
  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Carrega os dados atuais do post para preencher os campos automaticamente
  useEffect(() => {
    async function carregarPost() {
      try {
        const res = await fetch(`${baseUrl}/api/posts/${id}`);
        if (!res.ok) throw new Error("Não foi possível localizar este registro na TARDIS.");
        const post = await res.json();
        
        setTitulo(post.title);
        setImagem(post.imageUrl || "");
        setDescricao(post.description || ""); // ✨ Carrega a descrição do banco
        setConteudo(post.content);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }
    carregarPost();
  }, [id, baseUrl]);

  const handleEditar = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      setErro("Preencha o título e o conteúdo.");
      return;
    }

    setErro("");
    setIsSubmitting(true);

    const dadosAtualizados = {
      title: titulo,
      description: descricao, // ✨ Enviando a descrição atualizada
      content: conteudo,
      imageUrl: imagem || undefined
    };

    try {
      const response = await fetch(`${baseUrl}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.details || resultado.message || "Erro ao atualizar no banco.");
      }

      alert("Post atualizado com sucesso no MongoDB!");
      router.push("/admin");
      router.refresh(); 

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-dark text-white flex items-center justify-center font-mono">
        ⏳ Sintonizando frequências da TARDIS...
      </div>
    );
  }

  return (
    <main className="bg-space-dark text-white p-8">
      <div className="w-full bg-space-light p-8 rounded-xl shadow-lg">
        
        <h1 className="text-4xl font-bold mb-8">
          Editar Postagem
        </h1>

        <div className="space-y-6">
          {/* Título */}
          <div>
            <label className="block mb-2">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do post (mínimo 5 caracteres)"
              className="w-full p-3 rounded-lg text-black bg-white focus:outline-none"
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="block mb-2">
              URL da Imagem
            </label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="https://..."
              className="w-full p-3 rounded-lg text-black bg-white focus:outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite uma descrição para o post (mínimo 10 caracteres)"
              className="w-full p-3 rounded-lg text-black bg-white focus:outline-none"
            />
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block mb-2">
              Conteúdo
            </label>
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Escreva sua postagem (mínimo 20 caracteres)..."
              className="w-full p-3 rounded-lg text-black bg-white h-64 resize-none focus:outline-none"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="bg-red-500 text-white p-3 rounded-lg">
              {erro}
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="w-1/3 bg-gray-700 py-3 rounded-lg font-bold hover:opacity-80 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleEditar}
              disabled={isSubmitting}
              className="w-2/3 bg-galaxy py-3 rounded-lg font-bold hover:opacity-80 transition"
            >
              {isSubmitting ? "Atualizando Matrix..." : "Salvar Alterações"}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}