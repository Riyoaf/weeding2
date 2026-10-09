"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningAnimation from "@/components/ui/OpeningAnimation";
import HeroSection from "@/components/sections/HeroSection";
import CountdownTimer from "@/components/sections/CountdownTimer";
import EventDetails from "@/components/sections/EventDetails";
import MapSection from "@/components/sections/MapSection";
import GallerySection from "@/components/sections/GallerySection";
import AmpllopDigital from "@/components/sections/AmpllopDigital";
import WishesWall from "@/components/sections/WishesWall";
import ClosingSection from "@/components/sections/ClosingSection";
import MusicPlayer from "@/components/ui/MusicPlayer";
import FlyingButterflies from "@/components/ui/FlyingButterflies";

export default function HomePage() {
  const [isMusicTriggered, setIsMusicTriggered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // Lock body scroll while cover is visible, unlock when opened
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <>
      {/* Opening Animation Overlay with 3D Envelope Reveal */}
      <AnimatePresence>
        {!isOpened && (
          <OpeningAnimation
            onStartOpen={() => setIsMusicTriggered(true)}
            onOpenComplete={() => setIsOpened(true)}
            onOpen={() => setIsMusicTriggered(true)}
          />
        )}
      </AnimatePresence>

      {/* Floating Background Music Controller */}
      <MusicPlayer autoPlayTrigger={isMusicTriggered || isOpened} />

      {/* Main Invitation Content - Always 100% HD with crisp native resolution */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 1 : 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/baground.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundColor: "#111111",
          minHeight: "100vh",
          pointerEvents: isOpened ? "auto" : "none",
        }}
      >
        {/* Ambient Flying Golden Butterflies in Background */}
        {isOpened && <FlyingButterflies />}

        {/* 1. Hero — Nama & Tanggal */}
        <HeroSection />

        {/* 2. Galeri Foto Bahagia */}
        <GallerySection />

        {/* 3. Countdown Timer */}
        <CountdownTimer />

        {/* 4. Detail Acara (Akad & Resepsi) */}
        <EventDetails />

        {/* 5. Peta Lokasi GIS */}
        <MapSection />

        {/* 6. Amplop Digital */}
        <AmpllopDigital />

        {/* 7. Ucapan & Doa */}
        <WishesWall />

        {/* 8. Penutup */}
        <ClosingSection />
      </motion.main>
    </>
  );
}
