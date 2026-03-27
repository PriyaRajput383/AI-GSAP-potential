import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProAnimatedCard = () => {
  const container = useRef();
  const tl = useRef(); // Store the timeline in a ref to control it later

  useGSAP(() => {
    // 1. Initialize the timeline for the entrance animation
    tl.current = gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".card-bg", { scaleY: 0, duration: 1, transformOrigin: "bottom" })
      .from(".card-content > *", { 
        y: 30, 
        opacity: 0, 
        stagger: 0.2, // Professional staggered entrance
        duration: 0.8 
      }, "-=0.5") // Overlap with previous animation by 0.5s
      .from(".accent-line", { width: 0, duration: 1 }, "-=0.3");

  }, { scope: container });

  // 2. Interactive Hover Logic
  const onMouseEnter = () => {
    gsap.to(".card-bg", { backgroundColor: "#2d3436", duration: 0.3 });
    gsap.to(".icon", { y: -10, repeat: -1, yoyo: true, ease: "sine.inOut" });
  };

  const onMouseLeave = () => {
    gsap.to(".card-bg", { backgroundColor: "#ffffff", duration: 0.3 });
    gsap.to(".icon", { y: 0, overwrite: "auto" }); // Kill the bouncing loop
  };

  return (
    <div ref={container} className="p-20 flex justify-center items-center bg-gray-100 min-h-screen">
      <div 
        className="relative w-80 p-8 shadow-2xl rounded-2xl overflow-hidden cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Background Layer */}
        <div className="card-bg absolute inset-0 bg-white -z-10" />
        
        <div className="card-content flex flex-col gap-4">
          <div className="icon text-4xl">🚀</div>
          <div className="accent-line h-1 w-12 bg-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">GSAP x React</h2>
          <p className="text-gray-600">
            This component uses scoped selectors and timelines for a 
            fluid, cinematic feel.
          </p>
          <button className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg self-start">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProAnimatedCard;