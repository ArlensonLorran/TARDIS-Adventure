"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSalvar = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      setErro("Preencha o título e o conteúdo.");
      return;
    }

    setErro("");
    setIsSubmitting(true);

    const dadosParaEnvio = {
      title: titulo,
      description: descricao,
      content: conteudo,
      imageUrl: imagem || undefined
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.details || resultado.message || "Erro ao salvar no banco.");
      }

      alert("Post publicado com sucesso!");
      
      router.push("/admin");
      router.refresh(); 

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-space-dark text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-space-light p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-800 transition-colors duration-300">

        <h1 className="text-3xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
          Nova Postagem
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

          {/* Botão */}
          <button
            onClick={handleSalvar}
            disabled={isSubmitting}
            className="w-full bg-azul-tardis text-white py-3.5 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-azul-tardis/10 text-sm mt-4"
          >
            {isSubmitting ? "Publicando..." : "Salvar Postagem"}
          </button>
        </div>
      </div>
    </main>
  );
}