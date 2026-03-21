"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import VirtualGallery3D from "./VirtualGallery3D";

export default function VirtualGalleryCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterClick = () => {
    setIsEntering(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsEntering(false);
    }, 2500);
  };

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || isOpen) return;

    const handleHover = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.8,
        ease: "power3.out",
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      if (textRef.current) gsap.to(textRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleHover);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mousemove", handleHover);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || isEntering) {
      document.body.style.overflow = "hidden"; // Prevent scrolling behind overlay
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, isEntering]);

  return (
    <>
      <section className="h-[80vh] w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none" />
        
        <p className="font-sans uppercase tracking-widest text-[#9C9C9C] mb-8 z-10 text-sm md:text-base animate-pulse">
          Step inside the exhibition
        </p>
        
        <button 
          ref={buttonRef}
          onClick={handleEnterClick}
          className="relative z-10 w-[30vh] h-[30vh] md:w-[35vh] md:h-[35vh] rounded-full border border-white/20 flex items-center justify-center group overflow-hidden bg-transparent hover:bg-white hover:text-black transition-all duration-700 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]"
          data-magnetic
        >
          <div className="absolute inset-0 bg-white scale-0 rounded-full group-hover:scale-100 transition-transform duration-500 ease-in-out origin-center" />
          <span ref={textRef} className="font-display text-2xl md:text-4xl uppercase text-center max-w-[80%] relative z-20 transition-colors duration-500">
            Enter The <br/> Virtual Gallery
          </span>
        </button>
      </section>

      {/* Cinematic Entry Overlay */}
      {isEntering && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center animate-fade-in duration-1000">
          <p className="font-sans text-[#9C9C9C] tracking-[0.3em] uppercase animate-pulse text-sm md:text-xl text-center px-8">
            Entering MossCatti Virtual Gallery...
          </p>
        </div>
      )}

      {/* Fullscreen 3D Gallery Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center animate-fade-in duration-1000">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 md:top-12 md:right-12 z-50 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm flex items-center gap-3 border border-white/10 group"
            data-magnetic
          >
            <span className="font-sans uppercase tracking-widest text-xs hidden md:block">Back to Gallery</span>
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300"/>
          </button>
          
          <div className="w-full h-full p-4 md:p-12 pb-24 md:pb-12 h-screen flex flex-col items-center justify-center">
             <VirtualGallery3D />
             <p className="font-sans text-xs font-normal mt-4 text-[#9C9C9C] tracking-wide text-center uppercase"> 
                Interactive 3D Exhibition Environment (Drag to Rotate, Scroll to Zoom)
             </p>
          </div>
        </div>
      )}
    </>
  );
}
