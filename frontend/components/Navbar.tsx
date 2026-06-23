"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Search, LayoutDashboard, Home, X } from "lucide-react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Estado para controlar se o modal de login está visível ou não
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    // Envia o usuário para a página inicial com o parâmetro de busca correspondente ao feed
    router.push(`/?q=${encodeURIComponent(search)}`);

    setMenuOpen(false); // Fecha o menu lateral para mostrar o resultado
  };

  return (
    <>
      <header className="bg-azul-tardis w-full h-20 flex items-center justify-between px-6 sm:px-10 shadow-xl border-b border-blue-900 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-galaxy to-azul-tardis flex items-center justify-center text-xl">
            🚀
          </div>
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-white">Tardis Adventure</h2>
            <p className="text-xs opacity-75 hidden sm:block font-mono">Blog de Aventuras no Tempo</p>
          </div>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 rounded-xl bg-space-light hover:bg-space-dark text-white border border-gray-700 transition-all"
        >
          {menuOpen ? <X size={24} /> : <span className="text-xl">⚙️</span>}
        </button>
      </header>

      {/* Painel lateral (Drawer) */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

          <aside className="fixed top-0 right-0 h-full w-80 bg-space-dark border-l border-galaxy p-6 z-[9999] shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Menu</h3>
                <button onClick={() => setMenuOpen(false)} className="text-white hover:text-galaxy"><X /></button>
              </div>

              <div className="flex flex-col gap-2">
                {/* AQUI ENTRA A TROCA DE TEMA */}
                <ThemeToggle />
              </div>

              {/* Busca */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar posts..."
                  className="w-full bg-space-light text-white p-3 pr-10 rounded-lg border border-gray-700 focus:border-galaxy outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition text-sm"
                >
                  🔍
                </button>
              </form>

              {/* Links */}
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-3 text-white hover:bg-azul-tardis rounded-lg transition"
                >
                  <Home size={20} /> Início
                </Link>

                {/* Mudamos de <Link> para <button> para interceptar o clique e abrir o Modal */}
                <button
                  onClick={() => {
                    setMenuOpen(false);    // Fecha o menu lateral para dar espaço
                    setIsLoginOpen(true);  // Abre o modal de login no centro da tela
                  }}
                  className="flex items-center gap-3 p-3 text-white hover:bg-azul-tardis rounded-lg transition text-left w-full"
                >
                  <LayoutDashboard size={20} /> Área Administrativa
                </button>
              </nav>

            </div>
          </aside>
        </>
      )}

      {/* RENDERIZAÇÃO DO MODAL DE LOGIN */}
      {/* Ele fica monitorando o estado 'isLoginOpen'. Quando for true, ele aparece na tela */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}