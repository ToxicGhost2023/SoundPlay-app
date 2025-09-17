"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PosterLanding() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center px-4 md:px-0 overflow-visible">
      {/* Sound */}
      <motion.div
        className="absolute top-1/4 left-4 sm:left-10 md:left-20 text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white z-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 100, y: 60 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Sound
      </motion.div>

      {/* Play */}
      <motion.div
        className="absolute bottom-1/4 right-4 sm:right-10 md:right-20 text-4xl sm:text-5xl md:text-6xl font-bold text-orange-500 z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: -150, y: -250 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Play
      </motion.div>

      {/* Image */}
      <motion.div
        className="z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          rotate: [0, 2, -2, 0],
          transition: { repeat: Infinity, duration: 2 },
        }}
      >
        <Image
          src="/images/music-ui/gitar.png"
          width={400}
          height={400}
          alt="music"
          className="w-[180px] sm:w-[320px] md:w-[560px] h-[500px] mt-[60px]"
        />
      </motion.div>

      {/* Description */}
      <motion.p
        className="mb-[150px] text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-center mt-24 z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        The best landing page for your project. <br />
        Dive into a world of rhythm and design where{" "}
        <span className="font-semibold text-orange-500">
          music meets creativity
        </span>
        . Discover playlists, explore artists, and feel the harmony of UI and
        sound working together.
      </motion.p>
    </main>
  );
}
