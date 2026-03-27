import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LiquidSmooth = () => {
  const scope = useRef();
  const circleRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    // 1. SET INITIAL GPU LAYERS
    gsap.set(".gpu-layer", { force3D: true, willChange: "transform" });

    // 2. INTERNAL TRACKING (No State Re-renders!)
    const moveMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // 3. THE TICKER (The Smoothest Way to Move)
    // This runs every single frame, independent of React
    const xSet = gsap.quickSetter(circleRef.current, "x", "px");
    const ySet = gsap.quickSetter(circleRef.current, "y", "px");

    const tick = () => {
      // Linear Interpolation (Lerp) for that "Liquid" feel
      const dt = 1.0 - Math.pow(1.0 - 0.1, gsap.ticker.deltaRatio()); 
      
      // Calculate new position
      const targetX = mouse.current.x - 24;
      const targetY = mouse.current.y - 24;
      
      // We don't use state, we use quickSetter for raw speed
      xSet(gsap.utils.interpolate(gsap.getProperty(circleRef.current, "x"), targetX, dt));
      ySet(gsap.utils.interpolate(gsap.getProperty(circleRef.current, "y"), targetY, dt));
    };

    window.addEventListener("mousemove", moveMouse);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      gsap.ticker.remove(tick);
    };
  }, { scope });

  return (
    <div ref={scope} className="h-screen bg-stone-950 flex items-center justify-center overflow-hidden cursor-none">
      
      {/* THE LIQUID FOLLOWER */}
      <div 
        ref={circleRef}
        className="gpu-layer fixed top-0 left-0 w-12 h-12 border-2 border-orange-500 rounded-full z-50 pointer-events-none"
      />

      <div className="text-center">
        <h2 className="gpu-layer text-stone-700 text-sm font-mono mb-4 tracking-[0.2em] uppercase">
          Direct DOM Manipulation
        </h2>
        <h1 className="gpu-layer text-white text-8xl font-black tracking-tighter">
          NO JANK.
        </h1>
      </div>
    </div>
  );
};

export default LiquidSmooth;
