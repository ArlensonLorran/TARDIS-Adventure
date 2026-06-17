export default function Footer() {
  return (
    <footer className="w-full bg-space-light border-t border-gray-800 py-6 text-center text-sm text-gray-400 font-mono mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} TARDIS Adventure. Desenvolvido no Espaço-Tempo.</p>
        <p className="text-xs opacity-50 mt-1">"We're all stories, in the end. Just make it a good one, eh?" — The Doctor</p>
      </div>
    </footer>
  );
}