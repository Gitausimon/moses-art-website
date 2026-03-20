"use client";

import { useEffect, useRef, useState } from "react";
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
  const [selectedArt, setSelectedArt] = useState<typeof artPieces[0] | null>(null);

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
            className="w-[60vw] md:w-[40vw] h-[60vh] shrink-0 relative group cursor-pointer"
            data-magnetic
            onClick={() => setSelectedArt(art)}
          >
            <div className="w-full h-full bg-[#E5E5E5] overflow-hidden rounded-sm relative">
              <Image 
                src={art.src}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 60vw, 40vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <h3 className="text-white font-display text-3xl md:text-5xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 uppercase tracking-widest text-center px-4">
                  {art.title}
                </h3>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center text-black font-sans uppercase text-sm tracking-widest">
              <span>{art.title}</span>
              <span className="text-[#9C9C9C]">{art.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedArt && (
        <div 
          className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-center p-8 cursor-pointer"
          onClick={() => setSelectedArt(null)}
        >
          <div className="absolute top-8 right-8 text-white uppercase tracking-widest text-xs font-sans md:text-sm">
            Close [X]
          </div>
          <div className="relative w-full max-w-5xl h-[60vh] md:h-[75vh] mb-8">
            <Image 
              src={selectedArt.src}
              alt={selectedArt.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-white text-center flex flex-col items-center">
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-2">{selectedArt.title}</h2>
            <p className="font-sans text-[#9C9C9C] tracking-widest uppercase text-sm md:text-base mb-8">{selectedArt.year}</p>
            <a 
              href={`https://wa.me/254700000000?text=Hello Moscatti, I am interested in purchasing the artwork: ${selectedArt.title}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-white/30 px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors rounded-full"
              onClick={(e) => e.stopPropagation()}
              data-magnetic
            >
              Inquire / Buy Piece
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
