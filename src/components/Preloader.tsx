import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const messages = [
    { text: "Welcome", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "வணக்கம்", lang: "Tamil" },
    { text: "स्वागतम्", lang: "Sanskrit" },
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    const loadingInterval = setInterval(() => {
      setPercentage((prev) => {
        const newValue = prev + Math.floor(Math.random() * 10);
        return newValue > 100 ? 100 : newValue;
      });
    }, 150);

    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade out
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
        onComplete(); // Notify that the preloader is complete
      }, 700); // Duration matches the fade out transition
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearInterval(loadingInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isLoading) return null;


};

export default Preloader;
