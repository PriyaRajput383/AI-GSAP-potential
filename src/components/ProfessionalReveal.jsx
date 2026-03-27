import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProfessionalReveal = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. INITIAL REVEAL TIMELINE
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)", duration: 1 } });

      tl.from(".reveal-card", { 
        y: 100, 
        opacity: 0, 
        stagger: 0.2, 
        scale: 0.8 
      })
      .from(".reveal-text", { 
        x: -50, 
        opacity: 0, 
        stagger: 0.1 
      }, "-=0.5")
      .from(".reveal-btn", { 
        scale: 0, 
        rotation: -15 
      }, "-=0.7");

      // 2. MAGNETIC MOUSE INTERACTION
      const moveValues = { x: 0, y: 0 };
      
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        
        // Calculate distance from center of button
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Move the button slightly towards the mouse (Magnetic effect)
        gsap.to(buttonRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const resetMouse = () => {
        gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      };

      buttonRef.current.addEventListener("mousemove", handleMouseMove);
      buttonRef.current.addEventListener("mouseleave", resetMouse);

    }, containerRef);

    return () => ctx.revert(); // Cleanup!
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-12 text-center">
        <h1 className="reveal-text text-5xl font-black text-stone-900 tracking-tight mb-2">
          Experience <span className="text-orange-500">Fluidity.</span>
        </h1>
        <p className="reveal-text text-stone-500 text-lg">Built with GSAP & React useEffect</p>
      </div>

      {/* BENTO GRID REVEAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        
        <div className="reveal-card col-span-2 bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500">
          <div className="w-12 h-12 bg-orange-100 rounded-xl mb-6 flex items-center justify-center text-2xl">✨</div>
          <h3 className="text-2xl font-bold text-stone-800 mb-4">Precision Animation</h3>
          <p className="text-stone-600 leading-relaxed">
            By using GSAP Context inside a useEffect, we ensure that every animation 
            is perfectly synced to the React lifecycle without memory leaks.
          </p>
        </div>

        <div className="reveal-card bg-stone-900 p-8 rounded-3xl flex flex-col justify-between">
          <p className="text-stone-400 italic">"The details are not the details. They make the design."</p>
          
          <button 
            ref={buttonRef}
            className="reveal-btn bg-white text-stone-900 font-bold py-4 rounded-2xl shadow-lg mt-8 hover:bg-stone-100 transition-colors"
          >
            Get Started →
          </button>
        </div>

      </div>

      <div className="reveal-card mt-6 w-full max-w-5xl bg-stone-200 h-1 rounded-full overflow-hidden">
        <div className="bg-orange-500 h-full w-1/3 animate-pulse" />
      </div>
    </div>
  );
};

export default ProfessionalReveal;