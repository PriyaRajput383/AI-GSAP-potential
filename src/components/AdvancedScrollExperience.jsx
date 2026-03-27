import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const AdvancedScrollExperience = () => {
  const main = useRef();

  useGSAP(() => {
    const sections = gsap.utils.toArray('.panel');

    // 1. HORIZONTAL SCROLL REVEAL (The "Pro" Pinned Section)
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none", // Critical for smooth scrubbing
      scrollTrigger: {
        trigger: ".horizontal-container",
        pin: true,
        scrub: 1, // Follows the scrollbar with a 1s smooth catch-up
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth
      }
    });

    // 2. STAGGERED TEXT REVEAL (The "Intro" Animation)
    gsap.from(".hero-text span", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
    });

    // 3. PARALLAX IMAGE EFFECT
    gsap.to(".parallax-img", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        scrub: true
      }
    });

  }, { scope: main });

  return (
    <div ref={main} className="bg-stone-50 overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="h-screen flex items-center justify-center bg-stone-100">
        <h1 className="hero-text text-8xl font-black uppercase tracking-tighter text-stone-800">
          {"SCROLL".split("").map((char, i) => <span key={i} className="inline-block">{char}</span>)}
        </h1>
      </section>

      {/* SECTION 2: THE HORIZONTAL PINNED TRACK */}
      <div className="horizontal-container overflow-hidden flex bg-stone-900 h-screen w-[300vw]">
        <section className="panel w-screen h-screen flex items-center justify-center text-white text-6xl font-bold border-r border-stone-700">
          01. DISCOVER
        </section>
        <section className="panel w-screen h-screen flex items-center justify-center text-white text-6xl font-bold border-r border-stone-700">
          02. INTERACT
        </section>
        <section className="panel w-screen h-screen flex items-center justify-center text-white text-6xl font-bold">
          03. EXPERIENCE
        </section>
      </div>

      {/* SECTION 3: PARALLAX REVEAL */}
      <section className="parallax-section h-[150vh] flex items-center justify-center relative overflow-hidden bg-stone-200">
         <div className="parallax-img absolute w-full h-[150%] top-0 left-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-40" />
         <h2 className="relative z-10 text-4xl font-light italic">Motion defines the emotion.</h2>
      </section>

      <section className="h-screen bg-stone-800 flex items-center justify-center text-stone-50">
        <p className="text-xl">End of the Experience.</p>
      </section>
    </div>
  );
};

export default AdvancedScrollExperience;