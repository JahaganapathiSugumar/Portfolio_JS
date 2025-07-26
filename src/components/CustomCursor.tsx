import { useEffect, useState } from "react";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.getAttribute("role") === "button";

      setPosition((prev) => ({ ...prev, isHovering: isInteractive }));
    };

    const handleMouseDown = () => {
      setPosition((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setPosition((prev) => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (typeof window === "undefined" || window.matchMedia("(max-width: 768px)").matches) {
    return null; // Hide on mobile
  }

  const mildYellow = "#F6FA70";

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block transition-opacity"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-200"
          style={{
            width: position.isHovering ? "60px" : "30px",
            height: position.isHovering ? "60px" : "30px",
            transform: `translate(-50%, -50%) scale(${position.isClicking ? 0.8 : 1})`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full transition-all duration-200"
            style={{
              backgroundColor: mildYellow,
              opacity: 0.8,
              transform: "scale(1)", // no scaling on hover
            }}
          />
        </div>
      </div>

      {/* Trailing Dot */}
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          width: position.isHovering ? "70px" : "8px",
          height: position.isHovering ? "70px" : "8px",
          borderRadius: "50%",
          backgroundColor: mildYellow,
          opacity: isVisible ? 0.5 : 0,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, opacity 0.3s, background-color 0.3s",
          boxShadow: `0 0 10px ${mildYellow}`,
        }}
      />
    </>
  );
};

export default CustomCursor;
