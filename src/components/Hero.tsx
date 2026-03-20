"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Reveal text slightly delayed after preloader
    const tl = gsap.timeline({ delay: 3 }); // wait for preloader

    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      y: 150,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-end bg-black text-white px-8 pb-16 md:px-16"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url('/mose_hero.png')` }}
      />
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div ref={textRef} className="relative z-20" data-magnetic>
        <p className="font-sans text-sm md:text-xl uppercase tracking-widest text-[#9C9C9C] mb-4">
          The Work Of
        </p>
        <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase font-medium">
          Moscatti
        </h1>
      </div>
    </section>
  );
}
