"use client";

import React from "react";
import StarryBackground from "@/components/StarryBackground";
import BookCard3D from "@/components/BookCard3D";
import AmbientSound from "@/components/AmbientSound";
import { Heart, Sparkles, BookHeart, BookmarkCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background Starry Sky & Nebulas */}
      <StarryBackground />

      {/* Top Navigation & Sound Bar */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
            <BookHeart className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h2 className="font-playfair text-base sm:text-lg font-bold text-amber-200 tracking-wide">
              El Rincón de Lectura
            </h2>
            <p className="text-[11px] text-slate-400 font-serif">
              Dedicado a mi Pastelito favorita 🍰
            </p>
          </div>
        </div>

        {/* Ambient Sound Bar (Rain / Chimes) */}
        <AmbientSound />
      </header>

      {/* Center 3D Card Interactive Experience */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto">
        <div className="text-center mb-1 px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-serif text-rose-300/90 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Un detalle especial entre páginas
          </span>
        </div>

        <BookCard3D />
      </section>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto px-4 py-5 text-center text-xs text-slate-400/70 border-t border-slate-800/40 font-serif">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-300">
          <span>Hecho con amor para ti</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-400">
          &ldquo;Porque cada historia contigo es mi lectura favorita.&rdquo;
        </p>
      </footer>
    </main>
  );
}
