"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

import { motion } from "framer-motion";

function CardLanding() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=adele&entity=song&limit=20")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center  bg-black text-white">
        <p className="animate-pulse text-lg">Loading Featured Tracks...</p>
      </div>
    );

  const randomTilt = () => Math.random() * 6 - 3;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center  bg-clip-text text-transparent  bg-gradient-to-r from-red-800 via-orange-500 to-orange-200 drop-shadow-lg">
        🎧 Featured Tracks
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          stretch: 20,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        grabCursor={true}
        className="py-8"
      >
        {songs.map((song, index) => (
          <SwiperSlide key={song.trackId}>
            <motion.div
              className=" relative group rounded-2xl overflow-hidden shadow-xl  dark:bg-gray-800 cursor-pointer "
              initial={{ opacity: 0, y: 50, rotate: randomTilt() }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* کاور */}
              <img
                src={song.artworkUrl100.replace("100x100bb", "400x400bb")}
                alt={song.trackName}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay پخش */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg">
                  ▶ Play Preview
                </button>
              </div>

              {/* متن پایین */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 text-white">
                <h3 className="font-bold text-sm truncate">{song.trackName}</h3>
                <p className="text-xs text-gray-300 truncate">
                  {song.artistName}
                </p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardLanding;
