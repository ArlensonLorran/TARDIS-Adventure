import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TARDIS Adventure | Doctor Who Blog",
  description: "Explorando os segredos do tempo e do espaço.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space-dark text-white font-sans">
        
        {/* Navbar fixa no topo */}
        <Navbar />

        {/* Conteúdo principal centralizado e com respiro lateral */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          {children}
        </main>

        {/* Rodapé no final */}
        <Footer />

      </body>
    </html>
  );
}