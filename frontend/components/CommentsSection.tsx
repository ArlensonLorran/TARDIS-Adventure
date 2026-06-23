"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  _id?: string;
  author: string;
  text: string;
  createdAt?: string;
}

interface CommentsSectionProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const router = useRouter();
  
  // Estados para controlar o formulário e a lista
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setIsSubmitting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text }),
      });

      if (res.ok) {
        const updatedComments = await res.json();
        setComments(updatedComments); // Atualiza a lista na tela instantaneamente
        setAuthor(""); // Limpa os campos
        setText("");
        router.refresh(); // Pede pro Next atualizar o servidor por baixo dos panos
      } else {
        alert("Falha na transmissão pelo Vortex.");
      }
    } catch (error) {
      console.error("Erro ao comentar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10 bg-space-light p-5 sm:p-8 rounded-3xl shadow-xl border border-gray-800/40 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
        💬 Comentários da Comunidade
      </h2>
      
      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="mb-8 bg-space-dark/40 p-4 sm:p-6 rounded-2xl border border-gray-800 w-full">
        <h3 className="text-xs font-semibold text-gray-400 mb-4">// Deixe sua transmissão no Vortex</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Seu nome ou codinome espacial" 
            disabled={isSubmitting}
            className="w-full bg-space-dark text-white rounded-xl p-3 text-sm border border-gray-800 focus:outline-none focus:border-azul-tardis transition disabled:opacity-50" 
          />
          <textarea 
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva seu comentário... sem spoilers!" 
            disabled={isSubmitting}
            className="w-full bg-space-dark text-white rounded-xl p-3 text-sm h-28 resize-none border border-gray-800 focus:outline-none focus:border-azul-tardis transition disabled:opacity-50" 
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-azul-tardis text-white px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition text-sm shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Transmitindo..." : "Comentar"}
          </button>
        </div>
      </form>

      {/* LISTA DE COMENTÁRIOS */}
      <div className="space-y-4 w-full">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment._id || index} className="bg-space-dark/60 p-4 rounded-xl border border-gray-800/60 w-full animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-azul-tardis text-sm">{comment.author}</h4>
                {/* Se quiser adicionar badges de admin no futuro, a lógica entra aqui */}
              </div>
              <p className="text-gray-300 text-xs sm:text-sm whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">Nenhuma comentário ainda. Seja o primeiro!</p>
        )}
      </div>
    </section>
  );
}