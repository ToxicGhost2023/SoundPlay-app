"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Featured Tracks
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="cursor-grab"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.trackId}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={song.artworkUrl100.replace("100x100", "300x300")}
                alt={song.trackName}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{song.trackName}</h3>
                <p className="text-gray-500 text-sm">{song.artistName}</p>
                <p className="mt-2 font-bold">
                  {song.trackPrice
                    ? `${song.trackPrice} ${song.currency}`
                    : "Free"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardLanding;
