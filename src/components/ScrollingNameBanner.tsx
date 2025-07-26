import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, MotionPathPlugin, Draggable);

const ScrollingNameBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Duplicate text to ensure seamless looping
    const textContent = text.innerHTML;
    text.innerHTML += textContent;

    const totalWidth = text.scrollWidth / 2;

    gsap.to(text, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const numX = parseFloat(x);
          return `${numX % totalWidth}px`;
        }
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-12 bg-[#f0f0f7] overflow-hidden relative border-t-2 border-b-2 border-[#e0e0e7] transition-colors duration-300"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap w-max"
      >
        {[
  "| Building Tech That Empowers |",
  "| Always Learning |",
  "| Creating Meaningful Products |",
].map((text, i) => (
          <div
            key={i}
            className="mx-12 inline-flex items-center transition-all duration-300 group"
          >
            <span
              className="text-5xl md:text-7xl font-black tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(90deg, #7f5af0 0%, #9b87f5 50%, #2cb67d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 2px rgba(127,90,240,0.2))",
                transform: "translateZ(0)",
                transition: "transform 0.3s ease, filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateZ(10px) scale(1.05)";
                e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(127,90,240,0.4))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateZ(0)";
                e.currentTarget.style.filter = "drop-shadow(0 2px 2px rgba(127,90,240,0.2))";
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingNameBanner;
