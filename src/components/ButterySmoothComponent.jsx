import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ButterySmoothComponent = () => {
  const container = useRef();
  const cardRef = useRef();
  const circleRef = useRef();

  useGSAP(() => {
    // 1. Pre-optimize for the GPU
    gsap.set(".smooth-item", { force3D: true });

    // 2. Entrance: Use 'expo' ease (the smoothest of all eases)
    gsap.from(".smooth-item", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });

    // 3. HIGH-PERFORMANCE MOUSE TRACKING
    // quickTo is much smoother than standard gsap.to for mouse events
    const xTo = gsap.quickTo(circleRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(circleRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Subtracting half the circle size (24px) to center it
      xTo(clientX - 24);
      yTo(clientY - 24);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <div ref={container} className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-10">
      
      {/* THE SMOOTH FOLLOWER (Blurry Glow) */}
      <div 
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 w-12 h-12 bg-orange-500/30 rounded-full blur-xl z-0"
        style={{ willChange: "transform" }}
      />

      <div className="z-10 text-center max-w-2xl">
        <h1 className="smooth-item text-7xl font-bold text-white tracking-tighter mb-6 will-change-transform">
          Zero Jitter.
        </h1>
        
        <div 
          ref={cardRef}
          className="smooth-item bg-stone-900/50 backdrop-blur-md border border-stone-800 p-12 rounded-[2rem] shadow-2xl will-change-transform"
        >
          <p className="text-stone-400 text-xl leading-relaxed">
            We are now using <code className="text-orange-400">quickTo()</code> and 
            <code className="text-orange-400">will-change</code>. This offloads the 
            math to the GPU, making the movement feel like liquid.
          </p>
          
          <button className="smooth-item mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300">
            Feel the Smoothness
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButterySmoothComponent;