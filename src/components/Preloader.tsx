"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const words = [
    ".Hello", ".hola", ".bonjour", ".ciao", ".こんにちは", ".你好",
    ".WELCOME", ".TO", ".THE", ".EXHIBITION", "MOSCATTI"
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        // Dispatch an event so other components know loading is done
        window.dispatchEvent(new CustomEvent("preloader:complete"));
      },
    });

    // Initial state
    gsap.set(containerRef.current, { 
      yPercent: 0,
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%"
    });
    const wordElements = textRef.current?.children;

    if (wordElements) {
      gsap.set(wordElements, { opacity: 0, y: 50 });

      // Reveal words one by one
      Array.from(wordElements).forEach((word, i) => {
        const startTime = i * 0.18;
        tl.to(
          word,
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power3.out",
          },
          startTime
        ).to(
          word,
          {
            opacity: 0,
            y: -50,
            duration: 0.1,
            ease: "power3.in",
          },
          startTime + 0.15
        );
      });
    }

    // Finally, slide the entire preloader up and away
    tl.to(containerRef.current, {
      yPercent: -100,
      borderBottomLeftRadius: "50% 20vh",
      borderBottomRightRadius: "50% 20vh",
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2, // Small pause after words finish
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(225,7%,12%)] text-white overflow-hidden pointer-events-none"
    >
      <div
        ref={textRef}
        className="text-4xl md:text-7xl font-bold tracking-widest uppercase flex flex-col items-center justify-center absolute inset-0"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        {words.map((word, index) => (
          <span key={index} className="absolute inset-0 flex items-center justify-center opacity-0">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
