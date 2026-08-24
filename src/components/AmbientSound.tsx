"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Moon, Disc3, Play, Pause } from "lucide-react";

type SoundMode = "oasis" | "rain" | "off";

export default function MusicPlayer() {
  const [mode, setMode] = useState<SoundMode>("off");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ stop: () => void }[]>([]);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const stopAllSounds = () => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });
    activeNodesRef.current = [];
  };

  // Play Wonderwall by Oasis - Acoustic chords & melody progression
  const startWonderwall = (ctx: AudioContext) => {
    stopAllSounds();
    let isRunning = true;

    // Chords: Em7, G, Dsus4, A7sus4 (The signature Wonderwall progression)
    const chords = [
      { name: "Em7", freqs: [164.81, 196.0, 246.94, 293.66, 329.63] },
      { name: "G", freqs: [196.0, 246.94, 293.66, 392.0] },
      { name: "Dsus4", freqs: [146.83, 220.0, 293.66, 392.0] },
      { name: "A7sus4", freqs: [110.0, 220.0, 293.66, 329.63] },
    ];

    let chordIdx = 0;

    const playStrum = () => {
      if (!isRunning) return;

      const chord = chords[chordIdx % chords.length];
      const now = ctx.currentTime;

      // Strum each string slightly arpeggiated for acoustic guitar effect
      chord.freqs.forEach((freq, stringIndex) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + stringIndex * 0.035);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        const startTime = now + stringIndex * 0.035;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.7);
      });

      chordIdx++;
      loopTimeoutRef.current = setTimeout(playStrum, 1200);
    };

    playStrum();
    activeNodesRef.current.push({
      stop: () => {
        isRunning = false;
        if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      },
    });
  };

  const startRain = (ctx: AudioContext) => {
    stopAllSounds();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(750, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    activeNodesRef.current.push(whiteNoise);
  };

  const toggleSound = (targetMode: SoundMode) => {
    const ctx = getAudioContext();
    if (mode === targetMode) {
      stopAllSounds();
      setMode("off");
      setIsPlaying(false);
    } else {
      if (targetMode === "oasis") startWonderwall(ctx);
      if (targetMode === "rain") startRain(ctx);
      setMode(targetMode);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/70 shadow-xl text-xs text-slate-300">
      {/* Wonderwall by Oasis Button */}
      <button
        onClick={() => toggleSound("oasis")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
          mode === "oasis"
            ? "bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm"
            : "hover:bg-slate-800 text-slate-300 hover:text-white"
        }`}
        title="Reproducir Wonderwall - Oasis"
      >
        <Disc3
          className={`w-3.5 h-3.5 text-amber-400 ${
            mode === "oasis" ? "animate-spin" : ""
          }`}
        />
        <span className="font-serif tracking-wide text-[11px] sm:text-xs">
          Wonderwall — Oasis
        </span>
        {mode === "oasis" ? (
          <Pause className="w-3 h-3 text-amber-300" />
        ) : (
          <Play className="w-3 h-3 text-slate-400 fill-slate-400" />
        )}
      </button>

      {/* Rain Atmosphere Button */}
      <button
        onClick={() => toggleSound("rain")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all ${
          mode === "rain"
            ? "bg-blue-600/25 text-blue-200 border border-blue-400/40"
            : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        }`}
        title="Lluvia de fondo"
      >
        <Moon className="w-3 h-3 text-blue-400" />
        <span className="text-[11px] sm:text-xs">Lluvia</span>
      </button>

      {isPlaying && (
        <button
          onClick={() => {
            stopAllSounds();
            setMode("off");
            setIsPlaying(false);
          }}
          className="p-1 rounded-full hover:bg-rose-900/30 text-rose-400 transition-colors ml-0.5"
          title="Silenciar"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
