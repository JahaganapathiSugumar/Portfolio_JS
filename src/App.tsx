import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setLoading(false); // Update loading state
      }, 10); // Reduced delay to 10ms
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearInterval(loadingInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a2a2a]"
        >
          <div className="w-full max-w-md px-4 text-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute left-0 right-0 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-8 text-white">
                  {messages[currentMessageIndex].text}
                </h2>
              </motion.div>
            </AnimatePresence>

            <div className="mt-32">
              <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 h-full bg-[#7f5af0] rounded-full"
                ></motion.div>
              </div>

              <div className="text-sm text-right text-gray-400">{percentage}%</div>
            </div>
          </div>
        </motion.div>
      )}
      {!loading && (
        <BrowserRouter>
          <TooltipProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
};

export default App;
