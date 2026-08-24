import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Para mi Pastelito | Una carta entre páginas",
  description: "Una tarjeta 3D interactiva para la lectora más especial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dancingScript.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
