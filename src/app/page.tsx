import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import Hero from "@/components/Hero";
import HorizontalGallery from "@/components/HorizontalGallery";
import VirtualGalleryCTA from "@/components/VirtualGalleryCTA";
import { Exhibitions, AboutContact } from "@/components/AboutContact";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <LenisScrollProvider>
      <Preloader />
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen relative w-full overflow-hidden select-none">
        <Hero />
        <HorizontalGallery />
        <VirtualGalleryCTA />
        <Exhibitions />
        <AboutContact />
      </main>
    </LenisScrollProvider>
  );
}
