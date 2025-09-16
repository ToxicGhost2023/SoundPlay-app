"use client";
import React, { useState } from "react";
import {
  FaHome,
  FaMusic,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "../ui/DarkModeSwitch";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import { useSession } from "next-auth/react";
import { MdAdminPanelSettings } from "react-icons/md";

const headerItems = [
  { name: "Home", icon: <FaHome className="w-5 h-5" />, href: "/" },
  { name: "Music", icon: <FaMusic className="w-5 h-5" />, href: "/music" },
  { name: "About", icon: <FaInfoCircle className="w-5 h-5" />, href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <header className="w-full dark:bg-black border-b-2 border-orange-500 dark:border-orange-400 px-4 py-3">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center md:flex-row md:justify-between gap-4">
        {/* 1️⃣ Logo */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Beat
            <span className="text-orange-500 dark:text-orange-400 ml-1">
              Flow
            </span>
          </span>
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="BeatFlow Logo"
            className="object-cover"
            priority
          />
        </div>

        {/* 2️⃣ Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {headerItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-lg text-black dark:text-white 
          hover:text-orange-500 dark:hover:text-orange-400 
          transition-colors duration-300"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* 3️⃣ Actions */}
        <div className="flex items-center gap-4">
          <DarkModeSwitch />
          {session?.user?.role === "admin" ? (
            <span className="text-3xl cursor-pointer text-red-500 hover:text-red-600 transition-colors">
              <MdAdminPanelSettings />
            </span>
          ) : session?.user?.role === "user" ? (
            <span className="text-3xl cursor-pointer text-blue-500 hover:text-blue-600 transition-colors">
              <MdAccountCircle />
            </span>
          ) : (
            <Link
              href="/signin"
              className="relative font-bold text-[12px] border border-orange-600 p-2 rounded-3xl 
overflow-hidden flex items-center justify-center gap-2 group hover:border-green-700 hover:bg-green-500"
            >
              {/* متن */}
              <span className="text-orange-500 transition-opacity duration-100 group-hover:opacity-0">
                register
              </span>
              {/* آیکون */}
              <span className="absolute text-white left-[25px] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <HowToRegTwoToneIcon />
              </span>
            </Link>
          )}

          {/* Hamburger Btn (mobile) */}
          <button
            className="md:hidden text-2xl text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 4️⃣ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 items-center border-t border-gray-300 dark:border-gray-700 pt-4">
          {headerItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-lg text-black dark:text-white 
                hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
