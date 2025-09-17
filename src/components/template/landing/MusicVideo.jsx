"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function MusicVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://itunes.apple.com/search?term=adele&entity=musicVideo&limit=20"
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  bg-black">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* عنوان */}
        <h1 className="text-3xl md:text-4xl  font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-800 via-orange-500 to-orange-200  drop-shadow-lg">
          Music Video
        </h1>

        {/* گرید کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {videos.map((video, index) => (
            <motion.div
              key={video.trackId}
              className="relative group rounded-xl  shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 ">
                <h2 className="text-sm font-bold  ">{video.trackName}</h2>
                <p className="text-xs text-gray-300">{video.artistName}</p>
              </div>
              {/* پوستر */}
              <img
                src={video.artworkUrl100.replace("100x100bb", "600x600bb")}
                alt={video.trackName}
                className="hover:opacity-100  w-fit h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.video
                src={video.previewUrl}
                controls
                className="absolute inset-0  w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 "
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicVideo;
