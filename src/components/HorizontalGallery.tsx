"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const artPieces = [
  { id: 1, title: "Black Dude", year: "2026", src: "/black-dude.jpg" },
  { id: 2, title: "Eve", year: "2026", src: "/eve.png" },
  { id: 3, title: "Flower", year: "2026", src: "/flower.png" },
  { id: 4, title: "Hand", year: "2026", src: "/hand.png" },
  { id: 5, title: "Mose Hero", year: "2026", src: "/mose-hero.png" },
  { id: 6, title: "Myles", year: "2026", src: "/myles.png" },
  { id: 7, title: "Scaupture", year: "2026", src: "/scaupture.png" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (containerRef.current && sectionRef.current) {
        let scrollAmount = containerRef.current.offsetWidth - window.innerWidth;
        
        gsap.to(containerRef.current, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="h-screen bg-[#F5F5F5] overflow-hidden flex relative items-center">
      <div 
        ref={containerRef} 
        className="flex w-max items-center h-full px-16 gap-32"
      >
        <div className="w-[30vw] shrink-0 font-display text-7xl uppercase pr-20">
          Selected <br/> Works
        </div>
        {artPieces.map((art) => (
          <div 
            key={art.id} 
            className="w-[60vw] md:w-[40vw] h-[60vh] shrink-0 relative group"
            data-magnetic
          >
            <div className="w-full h-full bg-[#E5E5E5] overflow-hidden rounded-sm relative">
              <Image 
                src={art.src}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 60vw, 40vw"
              />
            </div>
            <div className="mt-6 flex justify-between items-center text-black font-sans uppercase text-sm tracking-widest">
              <span>{art.title}</span>
              <span className="text-[#9C9C9C]">{art.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
