"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", targetId: "home" },
  { name: "Work", targetId: "work" },
  { name: "Exhibitions", targetId: "exhibitions" },
  { name: "About", targetId: "about" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const transitionContainerRef = useRef<HTMLDivElement>(null);
  const transitionTextRef = useRef<HTMLDivElement>(null);
  const isAnimatingTransition = useRef(false);

  // Toggle overlay (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power4.out",
      });
      // Stagger in the links
      gsap.fromTo(".menu-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  // Magnetic trigger button
  useEffect(() => {
    const btn = triggerRef.current;
    if (!btn) return;

    const handleHover = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.8, ease: "power3.out" });
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleHover);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleHover);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleNavigate = (name: string, targetId: string) => {
    if (isAnimatingTransition.current) return;
    isAnimatingTransition.current = true;
    
    setIsOpen(false);
    setTransitionText(`.${name}`);

    const tl = gsap.timeline();

    // 1. Container slides in from bottom
    tl.fromTo(transitionContainerRef.current,
      { 
        yPercent: 100, 
        borderTopLeftRadius: "50% 20vh", 
        borderTopRightRadius: "50% 20vh", 
        borderBottomLeftRadius: "0%", 
        borderBottomRightRadius: "0%", 
        display: "flex" 
      },
      { 
        yPercent: 0, 
        borderTopLeftRadius: "0%", 
        borderTopRightRadius: "0%", 
        duration: 0.8, 
        ease: "power4.inOut" 
      }
    );

    // 2. Text pops up
    tl.fromTo(transitionTextRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );

    // 3. Scroll & Pause
    tl.add(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    });

    // Pause while user reads
    tl.to({}, { duration: 0.5 });

    // 4. Text pops down
    tl.to(transitionTextRef.current, { opacity: 0, y: -50, duration: 0.4, ease: "power3.in" });

    // 5. Container slides up
    tl.to(transitionContainerRef.current, {
      yPercent: -100, 
      borderBottomLeftRadius: "50% 20vh", 
      borderBottomRightRadius: "50% 20vh", 
      duration: 0.8, 
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(transitionContainerRef.current, { display: "none" });
        isAnimatingTransition.current = false;
      }
    });
  };

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <div className="fixed top-0 left-0 right-0 z-[100] hidden md:flex justify-between items-center px-16 py-8 mix-blend-difference text-white pointer-events-none">
        <div 
          className="font-display text-2xl uppercase pointer-events-auto cursor-pointer" 
          onClick={() => handleNavigate("Home", "home")}
        >
          Moses
        </div>
        <nav className="flex gap-12 pointer-events-auto">
          {links.map((link, i) => (
             <button 
               key={i} 
               onClick={() => handleNavigate(link.name, link.targetId)} 
               className="font-sans uppercase text-sm tracking-widest hover:italic transition-all duration-300"
             >
               {link.name}
             </button>
          ))}
        </nav>
      </div>

      {/* --- MOBILE HAMBURGER TRIGGER --- */}
      <div className="fixed top-8 right-8 z-[100] md:hidden mix-blend-difference">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 overflow-hidden relative group ${isOpen ? "bg-[#4C5FD5] text-white" : "bg-[#1C1D20] text-white"}`}
          data-magnetic
        >
          <div className={`absolute inset-0 transition-transform duration-500 rounded-full scale-0 group-hover:scale-100 ${isOpen ? "bg-white" : "bg-[#4C5FD5]"}`} />
          <div className={`relative z-10 transition-colors duration-300 ${isOpen ? "group-hover:text-[#4C5FD5]" : ""}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 w-full bg-[#1C1D20] text-white z-[90] translate-x-full shadow-2xl flex flex-col justify-between px-8 py-32 md:hidden"
      >
        <div>
          <h3 className="uppercase text-xs tracking-widest text-[#9C9C9C] mb-12 border-b border-white/20 pb-4">Navigation</h3>
          <nav className="flex flex-col gap-6">
            {links.map((link, i) => (
              <div key={i} className="menu-link-wrapper w-max cursor-pointer">
                <button
                  onClick={() => handleNavigate(link.name, link.targetId)}
                  className="menu-link font-sans text-5xl hover:italic transition-all duration-300 flex items-center group text-left"
                >
                  <span className="w-3 h-3 rounded-full bg-white mr-6 opacity-0 group-hover:opacity-100 transition-opacity -ml-9" />
                  {link.name}
                </button>
              </div>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="uppercase text-xs tracking-widest text-[#9C9C9C] mb-6">Socials</h3>
          <div className="flex gap-6">
            {["Awwwards", "Instagram", "Twitter", "LinkedIn"].map((social, i) => (
              <a key={i} href="#" className="text-sm hover:underline underline-offset-4">{social}</a>
            ))}
          </div>
        </div>
      </div>

      {/* --- MOBILE BACKDROP --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm md:hidden cursor-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- PAGE TRANSITION OVERLAY --- */}
      <div 
        ref={transitionContainerRef} 
        className="fixed inset-0 z-[200] bg-[hsl(225,7%,12%)] text-white hidden flex-col items-center justify-center overflow-hidden pointer-events-none"
      >
        <div 
          ref={transitionTextRef}
          className="text-4xl md:text-7xl font-bold tracking-widest uppercase opacity-0 translate-y-12"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          {transitionText}
        </div>
      </div>
    </>
  );
}
