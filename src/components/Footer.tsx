
import { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import { ArrowUp, GlobeIcon, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [location, setLocation] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch geolocation data
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data && data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);
        }
      } catch (error) {
        console.error("Could not fetch location:", error);
        setLocation(null);
      }
    };
    
    fetchLocation();
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <footer className="py-10 md:py-14 border-t border-gray-200 bg-[#f7f7f7] text-[#333333] text-center">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <a 
              href="#intro" 
              className="text-2xl font-grotesk font-bold tracking-wider text-[#7f5af0] hover:scale-105 transition-transform inline-block"
              style={{ 
                background: "linear-gradient(135deg, #7f5af0 20%, #2cb67d 80%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent"
              }}
            >
              JS.
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SocialLinks className="space-x-5" iconSize={22} />
          </motion.div>
          
          {location && (
            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center text-[#666666] space-x-2"
            >
              <GlobeIcon size={18} className="text-[#7f5af0]" />
              <span>📍 Currently in {location}</span>
            </motion.div>
          )}
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col space-y-3 items-center text-[#666666]"
          >
            <a 
              href="mailto:jaganapathisugumar@gmail.com" 
              className="flex items-center space-x-2 hover:text-[#7f5af0] transition-colors group"
              aria-label="Email"
            >
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">jaganapathisugumar@gmail.com</span>
            </a>
            <a 
              href="tel:+916379613654" 
              className="flex items-center space-x-2 hover:text-[#7f5af0] transition-colors group"
              aria-label="Phone"
            >
              <Phone size={18} className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">+91 6379 613654</span>
            </a>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center"
          >
            <p className="text-[#666666] text-sm mb-1">
              © {currentYear} Jahaganapathi Sugumar. All rights reserved.
            </p>
            <p className="text-xs text-[#666666]">
              Thank you for visiting my portfolio
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 bg-[#7f5af0] hover:bg-[#6644cc] text-white p-3 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
