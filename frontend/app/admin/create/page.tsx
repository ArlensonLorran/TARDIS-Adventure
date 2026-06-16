"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState("");

  return (
    <main className="bg-space-dark text-star p-8">

    <div className="w-full bg-space-light p-8 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold mb-8">
          Nova Postagem
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
              placeholder="Digite o título do post"
              className="w-full p-3 rounded-lg text-black bg-white"
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
              className="w-full p-3 rounded-lg text-black bg-white"
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
              placeholder="Escreva sua postagem..."
              className="w-full p-3 rounded-lg text-black bg-white h-64 resize-none"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="bg-red-500 text-white p-3 rounded-lg">
             {erro}
            </div>
        )}

          {/* Botão */}
          <button
            onClick={() => {

             if (!titulo.trim() || !conteudo.trim()) {
              setErro("Preencha o título e o conteúdo.");
              return;
            }

            setErro("");

            console.log({
              titulo,
              imagem,
              conteudo,
            });

       }}
      className="w-full bg-galaxy py-3 rounded-lg font-bold hover:opacity-80"
    >
      Salvar Postagem
      </button>

        </div>

      </div>

    </main>
  );
}