import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-azul-tardis w-full h-20 flex items-center justify-between px-6 sm:px-10 shadow-xl border-b border-blue-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      
      {/* Logo e Nome do Blog */}
      <Link href="/" className="flex items-center gap-4 group cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-galaxy to-azul-tardis flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
          🚀
        </div>
        <div>
          <h2 className="font-bold text-xl sm:text-2xl tracking-wide text-white group-hover:text-blue-200 transition-colors">
            Doctor Who
          </h2>
          <p className="text-xs opacity-75 hidden sm:block font-mono">
            Blog de Aventuras no Tempo e Espaço
          </p>
        </div>
      </Link>

      {/* Botão de Configurações / Admin */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin" 
          className="p-2.5 rounded-xl bg-space-light hover:bg-space-dark text-xl shadow-md border border-gray-800 hover:border-galaxy transition-all duration-200 text-white flex items-center justify-center group"
          title="Área Administrativa"
        >
          <span className="group-hover:rotate-45 transition-transform duration-300">⚙️</span>
        </Link>
      </div>

    </header>
  );
}