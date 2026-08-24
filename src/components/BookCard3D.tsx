"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  BookOpen,
  Bookmark,
  RotateCcw,
  Star,
  Feather,
  Coffee,
  Quote,
  Flame,
  ChevronRight,
  Gift
} from "lucide-react";

const BOULEVARD_QUOTES = [
  "Todos tenemos un boulevard de sueños rotos, pero contigo encontré la forma de reconstruirlos.",
  "No somos más que instantes y estrellas en un boulevard infinito...",
  "El amor no se trata de salvar a alguien, sino de estar a su lado mientras aprende a volar.",
  "De todos los libros del mundo y de todas las historias posibles, tú siempre serás mi favorita.",
];

export default function BookCard3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating3D, setIsRotating3D] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSecretNote, setShowSecretNote] = useState(false);
  const [heartsCount, setHeartsCount] = useState(0);

  // 3D Tilt values
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for 3D tilt & sheen effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isRotating3D) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    if (!isRotating3D) {
      setRotateX(0);
      setRotateY(0);
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // Launch confetti on opening the card
  const handleToggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fb7185", "#fbbf24", "#c084fc", "#38bdf8"],
      });
    }
  };

  const handleSendHearts = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartsCount((prev) => prev + 1);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      shapes: ["circle"],
      colors: ["#f43f5e", "#fda4af", "#ffd700"],
    });
  };

  const nextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % BOULEVARD_QUOTES.length);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 px-4">
      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[800px] h-[540px] sm:h-[580px] md:h-[520px] flex items-center justify-center cursor-pointer select-none"
        style={{ perspective: "2200px" }}
      >
        {/* Main 3D Card Container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            rotateX: isRotating3D ? [0, 10, -10, 0] : rotateX,
            rotateY: isRotating3D ? [0, 180, 360] : isOpen ? (typeof window !== "undefined" && window.innerWidth < 768 ? 0 : 0) : rotateY,
            scale: isOpen ? 1 : 0.98,
          }}
          transition={
            isRotating3D
              ? { repeat: Infinity, duration: 10, ease: "linear" }
              : { type: "spring", stiffness: 220, damping: 25 }
          }
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* ============================================================ */}
          {/* THE BOOK / CARD BASE (INNER PAGES)                           */}
          {/* ============================================================ */}
          <div
            className={`absolute inset-0 md:inset-x-0 w-full h-full bg-[#faf5ec] rounded-2xl book-shadow border-2 border-[#e5d5be] flex flex-col md:flex-row overflow-hidden transition-all duration-700 ${
              isOpen ? "opacity-100 shadow-2xl scale-100" : "opacity-95"
            }`}
            style={{
              transform: "translateZ(0px)",
            }}
          >
            {/* Vintage Book Spine Shadow in Center */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none z-20" />

            {/* LEFT PAGE: Boulevard Tribute & Quotes */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e8dac5] bg-gradient-to-br from-[#faf6ee] to-[#f4ece0] relative overflow-hidden">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-800/20" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-800/20" />

              {/* Header */}
              <div>
                <div className="flex items-center justify-between text-amber-900/60 mb-3 text-xs tracking-widest uppercase font-serif">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    Capítulo Especial
                  </span>
                  <span className="font-mono text-[10px]">Pág. ∞</span>
                </div>

                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                  Boulevard de Recuerdos
                </h3>
                <p className="text-xs text-amber-800/70 italic font-serif mt-0.5">
                  Inspirado en Flor M. Salvador
                </p>
              </div>

              {/* Interactive Quote Card */}
              <div className="my-auto py-2">
                <div className="relative bg-white/70 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-amber-200/60 shadow-xs">
                  <Quote className="w-6 h-6 text-amber-600/30 absolute -top-2.5 -left-1" />
                  <p className="font-lora text-slate-700 text-sm sm:text-base leading-relaxed italic relative z-10">
                    &ldquo;{BOULEVARD_QUOTES[quoteIndex]}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-amber-900/50 font-serif">
                      Frase {quoteIndex + 1} de {BOULEVARD_QUOTES.length}
                    </span>
                    <button
                      onClick={nextQuote}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full hover:bg-rose-50 transition-colors"
                    >
                      Siguiente frase <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom tag & cute illustration */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-900/10 text-xs text-amber-900/70 font-serif">
                <span className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  Café, libros y tú
                </span>
                <span className="text-rose-600 font-dancing text-base">
                  Para mi lectora favorita ✨
                </span>
              </div>
            </div>

            {/* RIGHT PAGE: Dedicated Love Letter for "Pastelito" */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-bl from-[#fffdf9] to-[#f9f2e7] relative overflow-hidden">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-800/20" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-800/20" />

              {/* Letter Header */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-dancing text-2xl sm:text-3xl text-rose-600 font-bold">
                  Querida Pastelito 🍰
                </span>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Letter Content */}
              <div className="font-lora text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2.5 overflow-y-auto max-h-[190px] sm:max-h-[220px] pr-1 py-1">
                <p>
                  Dicen que hay libros que te cambian la vida, pero para mí, la
                  historia más hermosa comenzó el día en que llegaste a la mía.
                </p>
                <p>
                  Amo verte sumergirte en cada página, ver cómo se iluminan tus
                  ojos con cada historia y la ternura con la que abrazas tus libros
                  favoritos.
                </p>
                <p className="font-medium text-rose-950/90">
                  En un mundo lleno de letras y caminos, tú eres mi párrafo
                  preferido, mi lugar seguro y mi boulevard eterno.
                </p>
              </div>

              {/* Letter Footer & Interactive Love Buttons */}
              <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between gap-2">
                <div>
                  <p className="font-dancing text-lg text-slate-800 leading-none">
                    Con todo mi amor,
                  </p>
                  <p className="text-[11px] text-amber-800/60 font-serif">
                    Siempre a tu lado ❤️
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSecretNote(!showSecretNote)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-serif flex items-center gap-1 transition-all shadow-xs"
                    title="Nota secreta"
                  >
                    <Feather className="w-3 h-3 text-amber-700" />
                    <span>P.D.</span>
                  </button>

                  <button
                    onClick={handleSendHearts}
                    className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{heartsCount > 0 ? heartsCount : "Corazón"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE 3D FRONT COVER (OPENS LIKE A REAL BOOK)                  */}
          {/* ============================================================ */}
          <motion.div
            onClick={handleToggleOpen}
            className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer"
            animate={{
              rotateY: isOpen ? -175 : 0,
            }}
            transition={{
              duration: 1.1,
              ease: [0.25, 1, 0.5, 1], // Smooth book swing
            }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: isOpen ? 10 : 30,
            }}
          >
            {/* FRONT FACE OF COVER */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl book-shadow overflow-hidden bg-gradient-to-br from-[#0c142b] via-[#1a1c38] to-[#2d1b4e] p-6 sm:p-8 flex flex-col justify-between border-2 border-amber-400/40 text-slate-100"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Dynamic Glare Sheen overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 shimmer-gold"
                style={{
                  opacity: glarePos.opacity,
                  backgroundPosition: `${glarePos.x}% ${glarePos.y}%`,
                }}
              />

              {/* Gold Floral/Vintage Border Accent */}
              <div className="absolute inset-3 border border-amber-300/30 rounded-xl pointer-events-none" />
              <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none" />

              {/* Ribbon Bookmark Dangle */}
              <div className="absolute top-0 right-10 w-7 h-28 bg-gradient-to-b from-rose-700 via-rose-600 to-rose-800 shadow-lg flex flex-col items-center justify-end pb-2 rounded-b-sm border-x border-rose-900 z-30">
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-xs mb-1" />
                <div className="w-0 h-0 border-x-[14px] border-x-transparent border-b-[10px] border-b-[#0c142b] absolute -bottom-[1px]" />
              </div>

              {/* Cover Top Header */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-amber-300/80 text-xs tracking-widest uppercase font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edición Especial & Limitada</span>
                </div>
              </div>

              {/* Cover Center Content (Boulevard Tribute + Pastelito) */}
              <div className="relative z-10 text-center my-auto px-4">
                {/* Book Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-serif mb-4">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  Para mi lectora favorita
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                </div>

                {/* Main Title */}
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md tracking-wide">
                  BOULEVARD
                </h1>

                {/* Nickname */}
                <p className="font-dancing text-2xl sm:text-3xl text-rose-300 mt-1 font-semibold">
                  Para mi Pastelito 🍰
                </p>

                {/* Subtitle / Quote */}
                <p className="font-lora text-xs sm:text-sm text-slate-300/80 italic max-w-sm mx-auto mt-3 leading-relaxed">
                  &ldquo;En cada boulevard de la vida, elijo caminar a tu lado.&rdquo;
                </p>
              </div>

              {/* Cover Bottom Call to Action */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-amber-300/40 shadow-lg animate-gentle-pulse">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Haz clic para abrir la tarjeta</span>
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                </div>
              </div>
            </div>

            {/* INSIDE OF THE FRONT COVER (Backface when turned) */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1e142e] to-[#0f172a] p-6 flex flex-col justify-between border-2 border-amber-400/30 text-slate-200"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="flex items-center justify-between text-xs text-amber-300/70 font-serif">
                <span>Guardas del Libro</span>
                <span>✨</span>
              </div>

              <div className="text-center my-auto p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
                </div>
                <p className="font-playfair text-lg text-amber-100 font-semibold">
                  &ldquo;Nuestra propia historia&rdquo;
                </p>
                <p className="text-xs text-slate-300/70 font-lora italic mt-1">
                  Escrita con cada risa, cada abrazo y cada página compartida.
                </p>
              </div>

              <div className="text-center text-[11px] text-amber-300/50 font-serif">
                Toca de nuevo para cerrar
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Secret Note Modal Popup */}
      <AnimatePresence>
        {showSecretNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowSecretNote(false)}
          >
            <div
              className="bg-[#faf6ee] text-slate-800 p-6 sm:p-7 rounded-2xl max-w-md w-full shadow-2xl border-2 border-amber-300 relative vintage-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 border-b border-amber-900/10 pb-2">
                <span className="font-dancing text-2xl text-rose-600 font-bold">
                  P.D. Secreta 💌
                </span>
                <button
                  onClick={() => setShowSecretNote(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-amber-200/50"
                >
                  Cerrar ✕
                </button>
              </div>
              <p className="font-lora text-sm sm:text-base leading-relaxed text-slate-800">
                &ldquo;Pastelito, cada vez que leas un libro y sientas mariposas
                o llores con el final, recuerda que aquí estoy yo para escucharte
                contarme cada detalle. Eres mi persona favorita en todo el
                universo.&rdquo;
              </p>
              <div className="mt-4 pt-2 text-right">
                <span className="font-dancing text-xl text-amber-800">
                  — Te quiero infinito ❤️
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 z-20">
        <button
          onClick={handleToggleOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-rose-900/40 transition-all active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>{isOpen ? "Cerrar Tarjeta" : "Abrir Tarjeta 3D"}</span>
        </button>

        <button
          onClick={() => setIsRotating3D(!isRotating3D)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm border transition-all ${
            isRotating3D
              ? "bg-amber-400/20 text-amber-200 border-amber-300/50 shadow-md"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60"
          }`}
        >
          <RotateCcw className={`w-4 h-4 ${isRotating3D ? "animate-spin" : ""}`} />
          <span>{isRotating3D ? "Detener Giro 3D" : "Giro 3D Libre"}</span>
        </button>

        <button
          onClick={handleSendHearts}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-rose-300 border border-slate-700/60 text-xs sm:text-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Lluvia Mágica</span>
        </button>
      </div>
    </div>
  );
}
