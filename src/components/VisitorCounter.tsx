import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [animatedCount, setAnimatedCount] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Function to animate the counter
  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);

      setAnimatedCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // Fetch visitor count from the backend
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("https://portfolio-backend-m1ev.onrender.com");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.count) {
          setVisitorCount(data.count);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setVisitorCount(1530); // Fallback count
        setLoaded(true);
      }
    };

    fetchVisitorCount();
  }, []);

  // Animate the counter when the visitor count is loaded
  useEffect(() => {
    if (loaded && visitorCount > 0) {
      animateValue(0, visitorCount, 1500);
    }
  }, [loaded, visitorCount]);

  return (
    <motion.div
      className="fixed bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 z-40 text-sm flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <div>
        <span className="font-bold">{animatedCount.toLocaleString()}</span>
        <span className="text-gray-600 ml-1">visitors</span>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;

