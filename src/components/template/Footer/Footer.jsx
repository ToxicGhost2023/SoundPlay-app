"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 p-[50px] rounded-lg">
      <div className="max-w-6xl mx-auto px-6 md:px-0 flex flex-col md:flex-row md:justify-between gap-8">
        {/* لوگو و توضیح کوتاه */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-orange-500">MusicUI</h1>
          <p className="text-sm max-w-xs">
            Explore playlists, artists, and music videos. Feel the rhythm and
            creativity in every beat.
          </p>
        </div>

        {/* لینک‌های سریع */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Albums
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Music Videos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-500 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Develop By ToxicGhost
      </div>
    </footer>
  );
}
