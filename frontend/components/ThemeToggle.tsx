"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Evita erros de hidratação garantindo o carregamento no cliente
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <span className="text-xs font-mono opacity-60 uppercase text-white tracking-wider">
        Selecione o Tema:
      </span>
      
      <div className="grid grid-cols-2 gap-2 bg-space-dark/50 p-1 rounded-xl border border-gray-800">
        {/* Botão Tema Claro */}
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            theme === "light"
              ? "bg-white text-space-dark shadow-md scale-100"
              : "text-gray-400 hover:text-white hover:bg-space-light/30"
          }`}
        >
          <Sun size={16} />
          Claro
        </button>

        {/* Botão Tema Escuro */}
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            theme === "dark"
              ? "bg-galaxy text-white shadow-lg shadow-galaxy/20 scale-100"
              : "text-gray-400 hover:text-white hover:bg-space-light/30"
          }`}
        >
          <Moon size={16} />
          Escuro
        </button>
      </div>
    </div>
  );
}