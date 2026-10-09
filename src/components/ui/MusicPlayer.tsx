"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
  src?: string;
}

export default function MusicPlayer({
  autoPlayTrigger = false,
  src = "/api/music",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSrc, setMusicSrc] = useState<string>("");
  const [startSecond, setStartSecond] = useState(0);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasSeekedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.data.settings) {
          if (data.data.settings.music_url) {
            setMusicSrc(`/api/music?file=${encodeURIComponent(data.data.settings.music_url)}`);
          } else {
            setMusicSrc(src);
          }
          if (data.data.settings.music_start_second !== undefined && data.data.settings.music_start_second !== null) {
            const sec = Math.max(0, parseInt(data.data.settings.music_start_second, 10) || 0);
            setStartSecond(sec);
          }
        } else {
          setMusicSrc(src);
        }
        setIsSettingsLoaded(true);
      })
      .catch(() => {
        if (isMounted) {
          setMusicSrc(src);
          setIsSettingsLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    hasSeekedRef.current = false;
  }, [musicSrc, startSecond]);

  const applySeek = () => {
    const audio = audioRef.current;
    if (!audio || startSecond <= 0 || hasSeekedRef.current) return;

    if (audio.readyState >= 1) {
      try {
        audio.currentTime = startSecond;
        hasSeekedRef.current = true;
      } catch (e) {
        console.warn("Seek error:", e);
      }
    } else {
      const onReady = () => {
        audio.removeEventListener("loadedmetadata", onReady);
        try {
          audio.currentTime = startSecond;
          hasSeekedRef.current = true;
        } catch (_) {}
      };
      audio.addEventListener("loadedmetadata", onReady, { once: true });
    }
  };

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !musicSrc) return;

    try {
      applySeek();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      setIsPlaying(true);
      applySeek();
    } catch (err: unknown) {
      // AbortError is a benign browser behavior when media changes or component unmounts
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      console.warn("Audio play prevented or failed:", err);
      setIsPlaying(false);
    }
  };

  // Trigger play when user opens invitation and settings are ready
  useEffect(() => {
    if (autoPlayTrigger && isSettingsLoaded && audioRef.current && musicSrc) {
      playAudio();
    }
  }, [autoPlayTrigger, isSettingsLoaded, musicSrc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.currentTime = startSecond > 0 ? startSecond : 0;
        audio.play().catch(() => {});
      } catch (_) {}
    }
  };

  return (
    <>
      {musicSrc ? (
        <audio
          ref={audioRef}
          src={musicSrc}
          onLoadedMetadata={applySeek}
          onEnded={handleEnded}
          preload="none"
          style={{ display: "none" }}
        />
      ) : null}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
        }}
      >
        <button
          onClick={togglePlay}
          id="music-toggle-btn"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: isPlaying ? "#4A5D52" : "#2D3748",
            color: isPlaying ? "#E2D1A6" : "#FFFFFF",
            border: `2px solid ${isPlaying ? "#E2D1A6" : "rgba(255, 255, 255, 0.7)"}`,
            boxShadow: isPlaying
              ? "0 8px 24px rgba(74, 93, 82, 0.45), 0 0 0 4px rgba(226, 209, 166, 0.25)"
              : "0 6px 20px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            padding: 0,
            transition: "all 0.3s ease",
          }}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 3,
              ease: "linear",
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                /* Playing State: Pause Icon (Twin Bars) */
                <motion.svg
                  key="pause-icon"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </motion.svg>
              ) : (
                /* Paused State: Play Icon (Triangle Arrow) */
                <motion.svg
                  key="play-icon"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ marginLeft: "2px" }}
                >
                  <polygon points="5,3 19,12 5,21" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </motion.div>
    </>
  );
}
