"use client";

// Bypass TypeScript error for custom web component
const ModelViewer = 'model-viewer' as any;

export default function VirtualGallery3D() {
  return (
    <div className="w-full h-[80vh] relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center">
      <ModelViewer
        src="/art-studio.glb"
        alt="My 3D Model"
        auto-rotate="true"
        camera-controls="true"
        style={{ width: "100%", height: "100%", outline: "none" }}
      ></ModelViewer>
    </div>
  );
}
