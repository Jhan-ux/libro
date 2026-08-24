"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Moon, Flame } from "lucide-react";

type SoundMode = "rain" | "fire" | "chimes" | "off";

export default function AmbientSound() {
  const [mode, setMode] = useState<SoundMode>("off");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ stop: () => void }[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllSounds();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const stopAllSounds = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });
    activeNodesRef.current = [];
  };

  const startRain = (ctx: AudioContext) => {
    stopAllSounds();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink / Brown noise for realistic soft rain
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to make it cozy rain
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    activeNodesRef.current.push(whiteNoise);
  };

  const startChimes = (ctx: AudioContext) => {
    stopAllSounds();
    let isRunning = true;

    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C Major
      [220.0, 261.63, 329.63, 440.0],  // A Minor
      [349.23, 440.0, 523.25, 659.25], // F Major
      [196.0, 246.94, 293.66, 392.0],  // G Major
    ];

    let chordIndex = 0;

    const playChime = () => {
      if (!isRunning) return;
      const currentChord = chords[chordIndex % chords.length];
      const freq = currentChord[Math.floor(Math.random() * currentChord.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);

      chordIndex++;
      const nextDelay = 1200 + Math.random() * 1800;
      setTimeout(playChime, nextDelay);
    };

    playChime();
    activeNodesRef.current.push({
      stop: () => {
        isRunning = false;
      },
    });
  };

  const toggleSound = (targetMode: SoundMode) => {
    const ctx = getAudioContext();
    if (mode === targetMode) {
      stopAllSounds();
      setMode("off");
      setIsPlaying(false);
    } else {
      if (targetMode === "rain") startRain(ctx);
      if (targetMode === "chimes") startChimes(ctx);
      setMode(targetMode);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-lg text-xs text-slate-300">
      <span className="flex items-center gap-1 font-medium text-amber-200/90">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        Ambiente:
      </span>

      <button
        onClick={() => toggleSound("rain")}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
          mode === "rain"
            ? "bg-blue-600/30 text-blue-200 border border-blue-400/40 shadow-sm"
            : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        }`}
        title="Lluvia suave en la ventana"
      >
        <Moon className="w-3 h-3 text-blue-400" />
        <span>Lluvia</span>
      </button>

      <button
        onClick={() => toggleSound("chimes")}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
          mode === "chimes"
            ? "bg-purple-600/30 text-purple-200 border border-purple-400/40 shadow-sm"
            : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        }`}
        title="Melodía estrellada de piano/campanas"
      >
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>Melodía</span>
      </button>

      {isPlaying && (
        <button
          onClick={() => {
            stopAllSounds();
            setMode("off");
            setIsPlaying(false);
          }}
          className="p-1 rounded-full hover:bg-rose-900/40 text-rose-300 transition-colors ml-1"
          title="Silenciar sonido"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
