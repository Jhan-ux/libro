"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  BookOpen,
  RotateCcw,
  Star,
  Feather,
  Coffee,
  Quote,
  ChevronRight,
  Bookmark,
  X,
  BookMarked
} from "lucide-react";

export interface BookData {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
  ribbonGradient: string;
  borderColor: string;
  subtitle: string;
  leftPageHeader: string;
  secretNote: string;
  quotes: { text: string; author: string }[];
}

export const BOOKS_DATA: BookData[] = [
  {
    id: "boulevard",
    title: "BOULEVARD",
    author: "Flor M. Salvador",
    coverGradient: "from-[#0c142b] via-[#1a1c38] to-[#2d1b4e]",
    ribbonGradient: "from-rose-700 via-rose-600 to-rose-800",
    borderColor: "border-amber-400/40",
    subtitle: "En cada boulevard de la vida, elijo caminar a tu lado.",
    leftPageHeader: "Boulevard de Recuerdos",
    secretNote:
      "Pastelito, cada vez que leas un libro y sientas mariposas o llores con el final, recuerda que aqui estoy yo para escucharte contarme cada detalle. Eres mi persona favorita en todo el universo.",
    quotes: [
      {
        text: "Rompe mi corazón, pero no te vayas, nunca lo hagas.",
        author: "Luke Howland, Boulevard",
      },
      {
        text: "Sé que estoy jodido porque no me enamoré de sus virtudes, me enamoré de sus defectos.",
        author: "Luke Howland, Boulevard",
      },
      {
        text: "Él era oscuridad. Ella un rayo de sol. Y, sin embargo, juntos crearon su propio refugio.",
        author: "Flor M. Salvador, Boulevard",
      },
      {
        text: "Fuimos perfectamente imperfectos... Las reglas de las matemáticas dicen que negativo por negativo iguala a positivo. Entonces, ¿qué fuimos Luke y yo?",
        author: "Hasley Weigel, Boulevard",
      },
      {
        text: "De todos los libros del mundo y de todas las historias posibles, tú siempre serás mi favorita.",
        author: "Flor M. Salvador, Boulevard",
      },
    ],
  },
  {
    id: "despues-de-el",
    title: "DESPUES DE EL",
    author: "Flor M. Salvador",
    coverGradient: "from-[#161233] via-[#281d42] to-[#40203d]",
    ribbonGradient: "from-purple-700 via-pink-600 to-rose-800",
    borderColor: "border-purple-400/40",
    subtitle: "El amor verdadero trasciende el tiempo y se convierte en luz.",
    leftPageHeader: "Un Nuevo Comienzo",
    secretNote:
      "Pastelito, en esta segunda parte Hasley aprendio que volver a empezar es el mayor acto de amor. Gracias por ser mi nuevo amanecer cada dia.",
    quotes: [
      {
        text: "Déjame ser el sosiego de tus miedos.",
        author: "Flor M. Salvador, Después de Él",
      },
      {
        text: "El primer amor no se olvida, solo se aprende a amar con mayor profundidad y ternura.",
        author: "Flor M. Salvador, Después de Él",
      },
      {
        text: "El secreto de volver a empezar es darte otra oportunidad para ser feliz.",
        author: "Flor M. Salvador, Después de Él",
      },
      {
        text: "Aprender a sanar a tu lado es el milagro más hermoso que la vida me regaló.",
        author: "Flor M. Salvador, Después de Él",
      },
      {
        text: "Siempre habrá una parte de mi corazón que te pertenecerá eternamente.",
        author: "Flor M. Salvador, Después de Él",
      },
    ],
  },
  {
    id: "antes-de-diciembre",
    title: "ANTES DE DICIEMBRE",
    author: "Joana Marcús",
    coverGradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
    ribbonGradient: "from-cyan-700 via-cyan-600 to-blue-800",
    borderColor: "border-cyan-400/40",
    subtitle: "Cada historia tiene su estacion, pero contigo quiero todos los meses del ano.",
    leftPageHeader: "El Invierno Mas Calido",
    secretNote:
      "Pastelito, si Jack Ross decia que estaba seguro de pocas cosas en su vida pero de querer a Jen estaba completamente seguro, yo siento exactamente lo mismo contigo.",
    quotes: [
      {
        text: "Te amo. Te quiero, Jen. He estado seguro de muy pocas cosas en mi vida, pero esta es una de ellas.",
        author: "Jack Ross, Antes de Diciembre",
      },
      {
        text: "Eres mi punto débil... y no sabes lo aterrador y emocionante que es eso.",
        author: "Jack Ross, Antes de Diciembre",
      },
      {
        text: "Tú eres distinta.",
        author: "Jack Ross, Antes de Diciembre",
      },
      {
        text: "A veces tenemos que hacer sacrificios por amor, porque queremos a la otra persona más que a nosotros mismos.",
        author: "Joana Marcús, Antes de Diciembre",
      },
      {
        text: "Estar contigo hace que cualquier invierno se sienta como el verano más cálido.",
        author: "Joana Marcús, Antes de Diciembre",
      },
    ],
  },
  {
    id: "orgullo-y-prejuicio",
    title: "ORGULLO Y PREJUICIO",
    author: "Jane Austen",
    coverGradient: "from-[#200122] via-[#3d0b2e] to-[#591024]",
    ribbonGradient: "from-amber-700 via-amber-600 to-yellow-800",
    borderColor: "border-amber-300/40",
    subtitle: "Has hechizado mi cuerpo y mi alma, y te amo con la fuerza de mil paginas.",
    leftPageHeader: "Clasico Inmortal",
    secretNote:
      "Pastelito, el Sr. Darcy dijo que lucho en vano porque no podia contener lo que sentia por Elizabeth. A mi me pasa igual cada vez que te veo sonreir.",
    quotes: [
      {
        text: "Debe usted permitirme decirle cuán apasionadamente la admiro y la amo.",
        author: "Sr. Darcy, Orgullo y Prejuicio",
      },
      {
        text: "He luchado en vano y ya no lo soporto más. Estos últimos meses han sido un tormento... Mis sentimientos no pueden ser reprimidos.",
        author: "Sr. Darcy, Orgullo y Prejuicio",
      },
      {
        text: "Has hechizado mi cuerpo y mi alma, y te amo, te amo, te amo.",
        author: "Sr. Darcy, Orgullo y Prejuicio",
      },
      {
        text: "No puedo fijar la hora, ni el lugar, ni la mirada, ni las palabras que pusieron los cimientos de mi amor. Hace ya demasiado tiempo. Estaba ya en la mitad antes de saber que había empezado.",
        author: "Sr. Darcy, Orgullo y Prejuicio",
      },
      {
        text: "El amor no mira con los ojos, sino con el alma.",
        author: "Jane Austen, Orgullo y Prejuicio",
      },
    ],
  },
  {
    id: "los-ojos-de-mi-princesa",
    title: "LOS OJOS DE MI PRINCESA",
    author: "Carlos Cuauhtémoc Sánchez",
    coverGradient: "from-[#141e30] via-[#1d2d44] to-[#243b55]",
    ribbonGradient: "from-emerald-700 via-emerald-600 to-teal-800",
    borderColor: "border-emerald-400/40",
    subtitle: "En el reflejo de tus ojos encontre la historia mas pura y verdadera.",
    leftPageHeader: "Cartas a Sheccid",
    secretNote:
      "Pastelito, tus ojos tienen esa magia de la que hablaban en este libro. Eres mi inspiracion constante y mi princesa favorita.",
    quotes: [
      {
        text: "Definir es limitar y el amor no tiene límites.",
        author: "Carlos C. Sánchez, Los Ojos de Mi Princesa",
      },
      {
        text: "Te amo porque sí. No sé si lo merezcas, pero no me importa, pues no te amo por merecimiento sino por devoción.",
        author: "Carlos C. Sánchez, Los Ojos de Mi Princesa",
      },
      {
        text: "Sé que tal vez nunca podré expresar todo lo que provocas en mí, pero sé que nunca te irás de mi alma.",
        author: "José Carlos, Los Ojos de Mi Princesa",
      },
      {
        text: "Toda mujer sueña con un amor sincero que la sepa escuchar, que la proteja y la trate como a una reina... y tú eres mi princesa.",
        author: "Carlos C. Sánchez, Los Ojos de Mi Princesa",
      },
      {
        text: "En el reflejo de tus ojos encontré la razón de todos mis versos.",
        author: "José Carlos, Los Ojos de Mi Princesa",
      },
    ],
  },
  {
    id: "damian",
    title: "DAMIAN",
    author: "Alex Mírez",
    coverGradient: "from-[#0a0a0f] via-[#1c1322] to-[#2e112d]",
    ribbonGradient: "from-fuchsia-900 via-purple-700 to-violet-950",
    borderColor: "border-purple-500/40",
    subtitle: "En medio de todos los secretos del mundo, mi unico refugio eres tu.",
    leftPageHeader: "Misterios de Asfil",
    secretNote:
      "Pastelito, incluso en las historias mas intensas y misteriosas como Damian, el amor es esa fuerza inevitable que te atrapa por completo. Como yo contigo.",
    quotes: [
      {
        text: "Te dejaré atraparme hasta el alma.",
        author: "Alex Mírez, Damián",
      },
      {
        text: "En medio del caos y los secretos, mi único lugar seguro siempre fuiste tú.",
        author: "Alex Mírez, Damián",
      },
      {
        text: "No me importa la oscuridad del mundo si es a tu lado donde me encuentro.",
        author: "Alex Mírez, Damián",
      },
      {
        text: "Hay miradas que te desmantelan por completo, y la tuya tiene el poder de paralizar mi mundo entero.",
        author: "Alex Mírez, Damián",
      },
      {
        text: "Mi corazón aprendió a latir con fuerza solo cuando tus pasos se cruzaron con los míos.",
        author: "Alex Mírez, Damián",
      },
    ],
  },
  {
    id: "alas-de-sangre",
    title: "ALAS DE SANGRE",
    author: "Rebecca Yarros",
    coverGradient: "from-[#1a0f0f] via-[#2e1414] to-[#451818]",
    ribbonGradient: "from-red-700 via-rose-700 to-red-950",
    borderColor: "border-rose-500/40",
    subtitle: "No hay un yo sin ti. Mi amor no es voluble.",
    leftPageHeader: "El Cuadrante de los Jinetes",
    secretNote:
      "Pastelito, como le dijo Xaden a Violet: no hay un yo sin ti. Eres mi persona indestructible y mi mayor tesoro.",
    quotes: [
      {
        text: "Mi amor por ti no es voluble, Violet. No hay un yo sin ti.",
        author: "Xaden Riorson, Alas de Sangre",
      },
      {
        text: "He sido tuyo desde hace más tiempo del que podrías imaginar.",
        author: "Xaden Riorson, Alas de Sangre",
      },
      {
        text: "Me diste tu corazón, y te juro que voy a protegerlo con mi propia vida.",
        author: "Xaden Riorson, Alas de Sangre",
      },
      {
        text: "Estar contigo es estar en casa. La única persona en este mundo de la que nunca me cansaré.",
        author: "Rebecca Yarros, Alas de Sangre",
      },
      {
        text: "Violencia, recuerda que solo el cuerpo es frágil. Tu espíritu y nuestro amor son indestructibles.",
        author: "Xaden Riorson, Alas de Sangre",
      },
    ],
  },
  {
    id: "alas-de-hierro",
    title: "ALAS DE HIERRO",
    author: "Rebecca Yarros",
    coverGradient: "from-[#111827] via-[#1f2937] to-[#374151]",
    ribbonGradient: "from-slate-600 via-cyan-800 to-slate-900",
    borderColor: "border-cyan-300/40",
    subtitle: "Eres mi gravedad. Nada en mi mundo funciona sin ti.",
    leftPageHeader: "Fuego y Lealtad",
    secretNote:
      "Pastelito, como en Alas de Hierro: eres mi gravedad absoluta. En cualquier vida, siempre te elegiria a ti.",
    quotes: [
      {
        text: "Te amo. Estoy enamorado de ti. Mi corazón solo late mientras el tuyo lo haga. Estás atrapada conmigo en esta vida y en cualquier otra que siga.",
        author: "Xaden Riorson, Alas de Hierro",
      },
      {
        text: "Eres mi gravedad. Nada en mi mundo funciona sin ti.",
        author: "Xaden Riorson, Alas de Hierro",
      },
      {
        text: "Incluso cuando no estoy contigo, solo estás tú en mi mente.",
        author: "Xaden Riorson, Alas de Hierro",
      },
      {
        text: "Acepta esto, Violet: me tienes a mí. Lo bueno, lo malo, lo imperdonable. Todo ello. Soy completamente tuyo.",
        author: "Xaden Riorson, Alas de Hierro",
      },
      {
        text: "Porque el amor, en su raíz, es esperanza. Esperanza de que la persona a la que le has confiado tu todo lo acunará y protegerá.",
        author: "Rebecca Yarros, Alas de Hierro",
      },
    ],
  },
];

export default function BookCard3D() {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating3D, setIsRotating3D] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSecretNote, setShowSecretNote] = useState(false);
  const [heartsCount, setHeartsCount] = useState(0);

  const currentBook = BOOKS_DATA[selectedBookIndex];

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleToggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fb7185", "#fbbf24", "#c084fc", "#38bdf8"],
      });
    }
  };

  const handleSelectBook = (index: number) => {
    setSelectedBookIndex(index);
    setQuoteIndex(0);
  };

  const handleSendHearts = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartsCount((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 55,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#f43f5e", "#fda4af", "#ffd700"],
    });
  };

  const nextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % currentBook.quotes.length);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 px-4">
      {/* Bookshelf Tab Selector */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto z-20">
        {BOOKS_DATA.map((book, idx) => {
          const isSelected = idx === selectedBookIndex;
          return (
            <button
              key={book.id}
              onClick={() => handleSelectBook(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all shadow-md ${
                isSelected
                  ? "bg-amber-400/20 text-amber-200 border border-amber-400/70 ring-1 ring-amber-400/40 scale-105"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <BookMarked
                className={`w-3.5 h-3.5 ${
                  isSelected ? "text-amber-400" : "text-slate-500"
                }`}
              />
              <span>{book.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[800px] h-[540px] sm:h-[580px] md:h-[520px] flex items-center justify-center cursor-pointer select-none"
        style={{ perspective: "2200px" }}
      >
        <motion.div
          key={currentBook.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            rotateX: isRotating3D ? [0, 10, -10, 0] : rotateX,
            rotateY: isRotating3D ? [0, 180, 360] : isOpen ? 0 : rotateY,
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
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* ============================================================ */}
          {/* INNER PAGES (BASE)                                           */}
          {/* ============================================================ */}
          <div
            className={`absolute inset-0 md:inset-x-0 w-full h-full bg-[#faf5ec] rounded-2xl book-shadow border-2 border-[#e5d5be] flex flex-col md:flex-row overflow-hidden transition-all duration-700 ${
              isOpen ? "opacity-100 shadow-2xl scale-100" : "opacity-95"
            }`}
            style={{
              transform: "translateZ(0px)",
            }}
          >
            {/* Center Spine Shadow */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none z-20" />

            {/* LEFT PAGE: Real Quotes from the selected book */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e8dac5] bg-gradient-to-br from-[#faf6ee] to-[#f4ece0] relative overflow-hidden">
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-800/20" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-800/20" />

              <div>
                <div className="flex items-center justify-between text-amber-900/60 mb-2 text-xs tracking-widest uppercase font-serif">
                  <span className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    Frases de Amor
                  </span>
                  <span className="font-mono text-[10px]">
                    {quoteIndex + 1} / {currentBook.quotes.length}
                  </span>
                </div>

                <h3 className="font-playfair text-lg sm:text-2xl font-bold text-slate-800 leading-tight">
                  {currentBook.title}
                </h3>
                <p className="text-xs text-amber-800/70 italic font-serif mt-0.5">
                  {currentBook.author}
                </p>
              </div>

              {/* Quote Display */}
              <div className="my-auto py-2">
                <div className="relative bg-white/75 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-amber-200/60 shadow-xs min-h-[120px] flex flex-col justify-between">
                  <Quote className="w-6 h-6 text-amber-600/30 absolute -top-2.5 -left-1" />
                  <p className="font-lora text-slate-700 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    &ldquo;{currentBook.quotes[quoteIndex]?.text}&rdquo;
                  </p>
                  <div className="mt-3 pt-2 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-[11px] text-amber-900/60 font-serif truncate max-w-[170px]">
                      {currentBook.quotes[quoteIndex]?.author}
                    </span>
                    <button
                      onClick={nextQuote}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full hover:bg-rose-50 transition-colors shrink-0"
                    >
                      Siguiente frase <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-900/10 text-xs text-amber-900/70 font-serif">
                <span className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  Café, libros y tú
                </span>
                <span className="text-rose-700 font-serif italic text-xs">
                  Para mi lectora favorita
                </span>
              </div>
            </div>

            {/* RIGHT PAGE: Letter for Pastelito */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-bl from-[#fffdf9] to-[#f9f2e7] relative overflow-hidden">
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-800/20" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-800/20" />

              <div className="flex items-center justify-between mb-1">
                <span className="font-dancing text-2xl sm:text-3xl text-rose-700 font-bold">
                  Querida Pastelito
                </span>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                </div>
              </div>

              <div className="font-lora text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2.5 overflow-y-auto max-h-[190px] sm:max-h-[220px] pr-1 py-1">
                <p>
                  Dicen que hay libros que te cambian la vida, pero para mí, la
                  historia más hermosa comenzó el día en que llegaste a la mía.
                </p>
                <p>
                  Amo verte sumergirte en cada página, ver cómo se iluminan tus
                  ojos con cada lectura y la pasión con la que sientes cada
                  capítulo.
                </p>
                <p className="font-medium text-rose-950">
                  En un mundo lleno de caminos, tú eres mi historia favorita,
                  mi lugar seguro y mi lectura eterna.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between gap-2">
                <div>
                  <p className="font-dancing text-lg text-slate-800 leading-none">
                    Con todo mi amor,
                  </p>
                  <p className="text-[11px] text-amber-800/60 font-serif">
                    Siempre a tu lado
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
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{heartsCount > 0 ? heartsCount : "Dedicar"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FRONT COVER (DYNAMIC BY SELECTED BOOK)                       */}
          {/* ============================================================ */}
          <motion.div
            onClick={handleToggleOpen}
            className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer"
            animate={{
              rotateY: isOpen ? -175 : 0,
            }}
            transition={{
              duration: 1.1,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: isOpen ? 10 : 30,
            }}
          >
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl book-shadow overflow-hidden bg-gradient-to-br ${currentBook.coverGradient} p-6 sm:p-8 flex flex-col justify-between border-2 ${currentBook.borderColor} text-slate-100`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 shimmer-gold"
                style={{
                  opacity: glarePos.opacity,
                  backgroundPosition: `${glarePos.x}% ${glarePos.y}%`,
                }}
              />

              <div className="absolute inset-3 border border-amber-300/30 rounded-xl pointer-events-none" />
              <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none" />

              {/* Silk ribbon bookmark */}
              <div
                className={`absolute top-0 right-10 w-7 h-28 bg-gradient-to-b ${currentBook.ribbonGradient} shadow-lg flex flex-col items-center justify-end pb-2 rounded-b-sm border-x border-black/30 z-30`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-xs mb-1" />
                <div className="w-0 h-0 border-x-[14px] border-x-transparent border-b-[10px] border-b-[#0c142b] absolute -bottom-[1px]" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-amber-300/80 text-xs tracking-widest uppercase font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edición Especial</span>
                </div>
              </div>

              <div className="relative z-10 text-center my-auto px-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-serif mb-4">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  Para mi lectora favorita
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                </div>

                <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md tracking-wide leading-tight">
                  {currentBook.title}
                </h1>

                <p className="font-dancing text-2xl sm:text-3xl text-rose-300 mt-1 font-semibold">
                  Para mi Pastelito
                </p>

                <p className="font-lora text-xs sm:text-sm text-slate-300/80 italic max-w-sm mx-auto mt-3 leading-relaxed">
                  &ldquo;{currentBook.subtitle}&rdquo;
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-amber-300/40 shadow-lg animate-gentle-pulse">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Haz clic para abrir la tarjeta</span>
                </div>
              </div>
            </div>

            {/* INSIDE BACKFACE OF COVER */}
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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>

              <div className="text-center my-auto p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                </div>
                <p className="font-playfair text-lg text-amber-100 font-semibold">
                  Nuestra propia historia
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

      {/* Secret Note Modal */}
      <AnimatePresence>
        {showSecretNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowSecretNote(false)}
          >
            <div
              className="bg-[#faf6ee] text-slate-800 p-6 sm:p-7 rounded-2xl max-w-md w-full shadow-2xl border-2 border-amber-300 relative vintage-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 border-b border-amber-900/10 pb-2">
                <span className="font-dancing text-2xl text-rose-700 font-bold">
                  P.D. Secreta ({currentBook.title})
                </span>
                <button
                  onClick={() => setShowSecretNote(false)}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-amber-200/50"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="font-lora text-sm sm:text-base leading-relaxed text-slate-800">
                &ldquo;{currentBook.secretNote}&rdquo;
              </p>
              <div className="mt-4 pt-2 text-right">
                <span className="font-dancing text-xl text-amber-900">
                  — Te quiero infinito
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
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
          <span>{isRotating3D ? "Detener Giro" : "Giro 3D Libre"}</span>
        </button>

        <button
          onClick={handleSendHearts}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-rose-300 border border-slate-700/60 text-xs sm:text-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Lluvia de Estrellas</span>
        </button>
      </div>
    </div>
  );
}
