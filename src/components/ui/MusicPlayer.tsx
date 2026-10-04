"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
  src?: string;
}

export default function MusicPlayer({
  autoPlayTrigger = false,
  src = "/kusuma_jaya.mp3",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSrc, setMusicSrc] = useState(src);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.settings?.music_url) {
          setMusicSrc(data.data.settings.music_url);
        }
      })
      .catch(() => {});
  }, []);

  // Trigger play when user opens invitation
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlayTrigger, musicSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        style={{ display: "none" }}
      />

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
