"use client";

import { useState } from "react";
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

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      {/* Opening Animation Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <OpeningAnimation onOpen={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {/* Floating Background Music Controller */}
      <MusicPlayer autoPlayTrigger={isOpened} src="/kusuma_jaya.mp3" />

      {/* Main Invitation Content */}
      <AnimatePresence>
        {isOpened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              backgroundImage: "url('/bg.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundAttachment: "fixed",
              backgroundColor: "#FCFBF7",
              minHeight: "100vh",
            }}
          >
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
        )}
      </AnimatePresence>
    </>
  );
}
