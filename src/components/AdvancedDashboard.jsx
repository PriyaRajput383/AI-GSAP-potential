import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins at the very top level
gsap.registerPlugin(ScrollTrigger);

const AdvancedDashboard = () => {
  const container = useRef();
  const mainCardRef = useRef();
  const morphPath = useRef();

  useGSAP(() => {
    // 1. COMPLEX INITIAL TIMELINE
    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.5 }
    });

    tl.from(".reveal-item", {
      opacity: 0,
      y: 100,
      rotateX: -45, // Dynamic 3D rotation
      stagger: 0.1,
      force3D: true, // Optimizes performance
      transformOrigin: "center center -100px" // More dramatic perspective
    }, "+=0.2")
    
    // 2. SVG MORPHING EFFECT (Requires the SVG in the JSX)
    .to(morphPath.current, { 
      attr: { d: "M0 100C300 100 700 100 1000 100" }, // The 'end' shape (a flat line)
      ease: "power2.inOut",
      duration: 2
    }, "-=1.0"); // Start slightly before the tl ends


    // 3. SCROLLTRIGGER 3D FLIP (The 'Pro' reveal)
    gsap.fromTo(mainCardRef.current, {
        rotationY: 0, // Starts flat
    }, {
        rotationY: 180, // Flips to the 'back'
        ease: "none",
        scrollTrigger: {
            trigger: mainCardRef.current,
            start: "top 20%",
            end: "bottom 20%",
            scrub: 1, // Smoother follow-through
            markers: false // Set to true to debug your scroll positions
        }
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-[200vh] bg-stone-950 text-stone-100 font-sans p-6 md:p-12 overflow-x-hidden">
      
      {/* 4. THE MORPHING BACKGROUND (SVG) */}
      <div className="absolute top-0 left-0 w-full h-screen -z-10 bg-stone-900 overflow-hidden">
         <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-stone-950 fill-current">
            {/* The 'start' d (the curve) */}
            <path ref={morphPath} d="M0 0C300 150 700 150 1000 0L1000 100L0 100Z" />
         </svg>
      </div>

      {/* SECTION 1: DYNAMIC ENTRANCE */}
      <section className="h-screen flex flex-col justify-center max-w-7xl mx-auto z-10 relative">
        <header className="mb-16">
          <p className="reveal-item text-orange-400 font-mono tracking-widest text-sm mb-2">REACT + GSAP v3.12</p>
          <h1 className="reveal-item text-6xl md:text-7xl font-black text-stone-50 tracking-tighter leading-none max-w-4xl">
            Unleashing Full Potential.
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: The 'Pin' Flip Card */}
          <div ref={mainCardRef} className="reveal-item relative col-span-2 aspect-[16/10] [preserve-transform] shadow-2xl">
            
            {/* Front of card */}
            <div className="absolute inset-0 bg-white border border-stone-200 p-8 rounded-3xl [backface-visibility:hidden] text-stone-950 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl mb-6 flex items-center justify-center text-2xl">📈</div>
                <h3 className="text-3xl font-bold mb-4">Dashboard Metrics</h3>
                <p className="text-stone-700 leading-relaxed">This card will flip over 3D as you scroll down the page.</p>
              </div>
              <p className="text-sm font-bold text-orange-500">SCROLL DOWN ↓</p>
            </div>

            {/* Back of card (must be Y-rotated) */}
            <div className="absolute inset-0 bg-orange-500 p-8 rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] text-orange-50 flex flex-col justify-between">
                <div>
                    <h3 className="text-3xl font-bold mb-4">Rear Panel Revealed!</h3>
                    <p className="text-orange-100 leading-relaxed">We used ScrollTrigger to control a flip animation based on screen position.</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Pinning</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">3D Transform</span>
                </div>
            </div>
          </div>

          {/* Simple reveal cards */}
          {[
            { icon: "⚡️", title: "Performance", desc: "Using native DOM refs ensures maximum FPS." },
            { icon: "🎨", title: "Styling", desc: "Tailwind CSS provides the clean, neutral aesthetics." }
          ].map((item, i) => (
            <div key={i} className="reveal-item col-span-2 md:col-span-1 bg-stone-900 border border-stone-800 p-8 rounded-3xl shadow-lg">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-stone-100">{item.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: END SECTION (To allow scrolling) */}
      <section className="h-screen bg-stone-950 flex items-center justify-center">
        <h2 className="text-4xl text-stone-700 font-light italic">Motion that feels alive.</h2>
      </section>
    </div>
  );
};

export default AdvancedDashboard;