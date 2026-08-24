"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Moon, Disc3, Play, Pause } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getPlayerState: () => number;
  setVolume: (volume: number) => void;
}

export default function MusicPlayer() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainNodeRef = useRef<{ stop: () => void } | null>(null);

  // Initialize YouTube Iframe API for the original Oasis - Wonderwall track
  useEffect(() => {
    // Oasis - Wonderwall Official Audio Video ID: bx1Bh8ZvH84 or 6hzrDeceEKc
    const videoId = "bx1Bh8ZvH84";

    const loadYT = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-player-hidden", {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: () => {
              setIsPlayerReady(true);
            },
            onStateChange: (event) => {
              if (window.YT) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlayingMusic(true);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlayingMusic(false);
                }
              }
            },
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loadYT;
    } else {
      loadYT();
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.stopVideo();
        } catch {}
      }
      stopRain();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!playerRef.current) return;

    try {
      if (isPlayingMusic) {
        playerRef.current.pauseVideo();
        setIsPlayingMusic(false);
      } else {
        playerRef.current.playVideo();
        setIsPlayingMusic(true);
      }
    } catch {
      // Fallback
    }
  };

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

  const stopRain = () => {
    if (rainNodeRef.current) {
      try {
        rainNodeRef.current.stop();
      } catch {}
      rainNodeRef.current = null;
    }
  };

  const toggleRain = () => {
    if (isPlayingRain) {
      stopRain();
      setIsPlayingRain(false);
    } else {
      const ctx = getAudioContext();
      stopRain();

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
      gain.gain.setValueAtTime(0.25, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      rainNodeRef.current = whiteNoise;
      setIsPlayingRain(true);
    }
  };

  const stopAll = () => {
    if (playerRef.current) {
      try {
        playerRef.current.pauseVideo();
      } catch {}
    }
    stopRain();
    setIsPlayingMusic(false);
    setIsPlayingRain(false);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/70 shadow-xl text-xs text-slate-300">
      {/* Hidden YouTube Iframe Player container */}
      <div className="hidden" aria-hidden="true">
        <div id="youtube-player-hidden" />
      </div>

      {/* Wonderwall by Oasis Button */}
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
          isPlayingMusic
            ? "bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm"
            : "hover:bg-slate-800 text-slate-300 hover:text-white"
        }`}
        title="Reproducir cancion original: Wonderwall - Oasis"
      >
        <Disc3
          className={`w-3.5 h-3.5 text-amber-400 ${
            isPlayingMusic ? "animate-spin" : ""
          }`}
        />
        <span className="font-serif tracking-wide text-[11px] sm:text-xs">
          Wonderwall — Oasis (Original)
        </span>
        {isPlayingMusic ? (
          <Pause className="w-3 h-3 text-amber-300 fill-amber-300" />
        ) : (
          <Play className="w-3 h-3 text-slate-400 fill-slate-400" />
        )}
      </button>

      {/* Rain Atmosphere Button */}
      <button
        onClick={toggleRain}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all ${
          isPlayingRain
            ? "bg-blue-600/25 text-blue-200 border border-blue-400/40"
            : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        }`}
        title="Sonido de lluvia"
      >
        <Moon className="w-3 h-3 text-blue-400" />
        <span className="text-[11px] sm:text-xs">Lluvia</span>
      </button>

      {(isPlayingMusic || isPlayingRain) && (
        <button
          onClick={stopAll}
          className="p-1 rounded-full hover:bg-rose-900/30 text-rose-400 transition-colors ml-0.5"
          title="Silenciar todo"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
