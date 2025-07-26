import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Find the current active section
      const sections = [
        "intro", "about", "skills", "stats", "projects", "work", 
        "certifications", "education", "achievements", "contact"
      ];
      
      let currentSection = "intro";
      let minDistance = Infinity;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-3 bg-white/90 backdrop-blur-lg shadow-md" : "py-5 bg-white/70"}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#intro" className="text-xl font-grotesk font-bold tracking-wider text-[#7f5af0] hover:text-[#6644cc] transition-colors">JS.</a>
          <nav className="hidden md:flex space-x-8">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "stats", label: "Stats" },
              { id: "projects", label: "Projects" },
              { id: "work", label: "Work" },
              { id: "certifications", label: "Certifications" },
              { id: "education", label: "Education" },
              { id: "achievements", label: "Achievements" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a 
                key={item.id}
                onClick={() => scrollTo(item.id)} 
                className={`text-sm uppercase relative font-medium cursor-pointer transition-colors
                          ${activeSection === item.id ? "text-[#7f5af0]" : "text-[#333333] hover:text-[#7f5af0]"}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[#7f5af0]"
                  />
                )}
              </a>
            ))}
          </nav>
          <button 
            onClick={toggleMenu} 
            className="md:hidden flex flex-col space-y-1.5 justify-center items-center w-10 h-10 rounded-full"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] origin-left" 
          style={{ scaleX }}
        />
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              {[
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "stats", label: "Stats" },
                { id: "projects", label: "Projects" },
                { id: "work", label: "Work" },
                { id: "certifications", label: "Certifications" },
                { id: "education", label: "Education" },
                { id: "achievements", label: "Achievements" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.a 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollTo(item.id)} 
                  className={`text-3xl font-medium cursor-pointer transition-colors
                            ${activeSection === item.id ? "text-[#7f5af0]" : "text-[#333333] hover:text-[#7f5af0]"}`}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
