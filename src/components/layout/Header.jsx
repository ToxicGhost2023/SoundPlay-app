"use client";
import React, { useState } from "react";
import { FaHome, FaMusic, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "../ui/DarkModeSwitch";

const headerItems = [
  { name: "Home", icon: <FaHome className="w-5 h-5" />, href: "/" },
  { name: "Music", icon: <FaMusic className="w-5 h-5" />, href: "/music" },
  { name: "About", icon: <FaInfoCircle className="w-5 h-5" />, href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-black border-b-2 border-orange-500 dark:border-orange-400 px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Logo */}
      <div className="flex items-center justify-between md:justify-start gap-2">
        <div className="flex items-center gap-2 select-none">
          <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Beat
            <span className="text-orange-500 dark:text-orange-400 ml-1">
              Flow
            </span>
          </span>
          <Image
            src="/images/logo.png"
            width={60}
            height={60}
            alt="BeatFlow Logo"
            className="object-cover -mt-2"
            priority
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-4 text-black dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Nav links */}
      <nav
        className={`flex-col md:flex md:flex-row gap-6 md:items-center transition-all duration-300 ${
          mobileMenuOpen ? "flex mt-4 md:mt-0" : "hidden md:flex"
        }`}
      >
        {headerItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-2 text-black dark:text-white 
                       hover:text-orange-500 dark:hover:text-orange-400 
                       transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <DarkModeSwitch />
        <Link
          href="/signin"
          className="font-bold bg-blue-500 text-white px-6 py-1.5 rounded-md 
                     hover:bg-blue-600 transition-colors duration-300
                     dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
