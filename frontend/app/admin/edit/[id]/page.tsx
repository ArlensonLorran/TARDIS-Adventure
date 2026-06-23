"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState(""); 
  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    async function carregarPost() {
      try {
        const res = await fetch(`${baseUrl}/api/posts/${id}`);
        if (!res.ok) throw new Error("Não foi possível localizar este registro.");
        const post = await res.json();
        
        setTitulo(post.title);
        setImagem(post.imageUrl || "");
        setDescricao(post.description || ""); 
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
      description: descricao, 
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

      alert("Post atualizado com sucesso!");
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
      <div className="min-h-screen bg-slate-50 dark:bg-space-dark text-slate-600 dark:text-gray-400 flex items-center justify-center text-sm font-medium transition-colors duration-300">
        <span className="animate-pulse">⏳ Carregando dados do artigo...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-space-dark text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-space-light p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-800 transition-colors duration-300">
        
        <h1 className="text-3xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
          Editar Postagem
        </h1>

        <div className="space-y-6">
          {/* Título */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do post (mínimo 5 caracteres)"
              className="w-full p-3 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-space-dark border border-slate-200 dark:border-gray-800 focus:outline-none focus:border-slate-400 dark:focus:border-gray-600 transition text-sm"
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
              URL da Imagem
            </label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="https://..."
              className="w-full p-3 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-space-dark border border-slate-200 dark:border-gray-800 focus:outline-none focus:border-slate-400 dark:focus:border-gray-600 transition text-sm"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
              Descrição
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite uma descrição para o post (mínimo 10 caracteres)"
              className="w-full p-3 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-space-dark border border-slate-200 dark:border-gray-800 focus:outline-none focus:border-slate-400 dark:focus:border-gray-600 transition text-sm"
            />
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
              Conteúdo
            </label>
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Escreva sua postagem (mínimo 20 caracteres)..."
              className="w-full p-3 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-space-dark border border-slate-200 dark:border-gray-800 focus:outline-none focus:border-slate-400 dark:focus:border-gray-600 transition h-64 resize-none text-sm"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="bg-red-500 text-white p-4 rounded-xl text-sm font-medium shadow-md">
              {erro}
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full sm:w-1/3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3.5 rounded-xl font-bold hover:opacity-90 transition text-sm order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleEditar}
              disabled={isSubmitting}
              className="w-full sm:w-2/3 bg-azul-tardis text-white py-3.5 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-azul-tardis/10 text-sm order-1 sm:order-2"
            >
              {isSubmitting ? "Atualizando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}