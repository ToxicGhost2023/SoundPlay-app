"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function ScrollLayout({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const LocomotiveScroll = require("locomotive-scroll").default;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      scroll && scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container className="relative">
      {children}
    </div>
  );
}
