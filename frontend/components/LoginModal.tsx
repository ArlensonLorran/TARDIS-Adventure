"use client";

import { useState } from "react";
import { X, Lock, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Se o modal não estiver aberto, não renderiza nada na tela
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui no futuro entrará a integração com o seu backend (POST /api/login)
    console.log("Tentativa de login com:", { username, password });
    alert("Circuito de autenticação em desenvolvimento!");
  };

  return (
    <>
      {/* 1. Fundo Escurecido e Borrado (Backdrop) */}
      <div 
        className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm animate-fade-in"
        onClick={onClose} // Se clicar fora do modal, ele fecha
      />

      {/* 2. Caixa do Modal Centralizada */}
      <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 pointer-events-none">
        <div className="w-full max-w-md bg-white dark:bg-space-light p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-800 pointer-events-auto transition-all duration-300 transform scale-100 flex flex-col gap-6 text-slate-900 dark:text-white">
          
          {/* Cabeçalho do Modal */}
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-gray-800 pb-4">
            <div>
              <h3 className="text-xl font-bold font-sans">Acesso ao Sistema</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Insira suas credenciais temporais</p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-galaxy dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-space-dark transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Campo Usuário */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Usuário</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome do Doutor ou Admin"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-space-dark p-3 pl-10 rounded-xl border border-slate-200 dark:border-gray-800 focus:border-galaxy dark:focus:border-galaxy outline-none transition text-sm"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Senha de Acesso</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-space-dark p-3 pl-10 rounded-xl border border-slate-200 dark:border-gray-800 focus:border-galaxy dark:focus:border-galaxy outline-none transition text-sm"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-space-dark dark:hover:bg-black text-slate-700 dark:text-white transition"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 py-3 text-sm font-semibold rounded-xl bg-galaxy hover:opacity-90 text-white shadow-lg shadow-galaxy/20 transition"
              >
                Iniciar Sessão
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}