"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const exhibitions = [
  { year: "2026", title: "Echoes of Nairobi", location: "Nairobi National Museum" },
  { year: "2025", title: "Modern Canvas Show", location: "Circle Art Gallery" },
  { year: "2024", title: "Emerging Artists Expo", location: "The GoDown Arts Centre" },
];

export function Exhibitions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray(".exhibition-item");
    items.forEach((item: any) => {
      gsap.fromTo(item,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="exhibitions" className="bg-[#F5F5F5] text-black py-32 px-8 md:px-32" ref={containerRef}>
      <h2 className="font-display text-6xl md:text-8xl uppercase mb-20 border-b border-black/10 pb-8">Exhibitions</h2>
      <div className="flex flex-col gap-12">
        {exhibitions.map((ex, i) => (
          <div key={i} className="exhibition-item flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-8 group" data-magnetic>
            <div className="font-sans text-xl md:text-2xl tracking-widest shrink-0 w-32 mb-4 md:mb-0">
              {ex.year}
            </div>
            <div className="font-display text-4xl md:text-5xl uppercase group-hover:pl-4 transition-all duration-300 w-full">
              {ex.title}
            </div>
            <div className="font-sans text-[#9C9C9C] uppercase tracking-wider shrink-0 mt-4 md:mt-0 md:text-right w-64">
              {ex.location}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutContact() {
  return (
    <section id="about" className="bg-black text-white relative flex flex-col justify-between pt-32 pb-8 px-8 md:px-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
        <div className="lg:col-span-5 font-display text-4xl md:text-5xl leading-tight flex flex-col justify-center order-2 lg:order-1">
          "I paint to explore the silent conversations between chaos and clarity. Every brushstroke is a reaction to the vibrant tempo of Nairobi."
        </div>

        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="w-full aspect-[3/4] bg-[#111] flex items-center justify-center relative overflow-hidden">
            <img
              src="/njuguna-picture.jpg"
              alt="Moses Njuguna"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-700 z-10 cursor-pointer select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onTouchStart={() => { }}
              style={{ WebkitTouchCallout: "none" }}
            />
          </div>
        </div>

        <div className="lg:col-span-3 font-sans text-[#9C9C9C] text-lg leading-relaxed flex flex-col justify-end order-3">
          <p className="mb-8">
            Moses Njuguna is a 21-year-old contemporary artist based in Nairobi, Kenya. His work relies heavily on abstraction and bold color fields to synthesize his environment.
          </p>
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@mosesnjuguna.art" className="uppercase tracking-widest text-white border-b border-white hover:text-gray-300 w-max transition-colors pb-1" data-magnetic>
              contact@mosesnjuguna.art
            </a>
            <a href="https://wa.me/254758585413" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-white border-b border-white hover:text-gray-300 w-max transition-colors pb-1" data-magnetic>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mt-32 border-t border-white/20 pt-8">
        <div className="flex gap-8 mb-8 md:mb-0">
          <a href="https://www.instagram.com/mos._.catti/" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-[#9C9C9C] hover:text-white transition-colors text-sm" data-magnetic>Instagram</a>
          <a href="#" className="uppercase tracking-widest text-[#9C9C9C] hover:text-white transition-colors text-sm" data-magnetic>Twitter</a>
        </div>
        <h1 className="font-display text-[10vw] leading-none uppercase m-0 p-0 text-center md:text-right">Moses</h1>
      </div>
    </section>
  );
}
