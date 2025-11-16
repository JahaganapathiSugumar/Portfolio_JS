
import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const IntroSection = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center pt-16 pb-6 bg-[#f9f9f9]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-7 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-grotesk font-bold mb-6 leading-tight tracking-wider"
              style={{ 
                background: "linear-gradient(135deg, #7f5af0 0%, #2cb67d 100%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 40px rgba(127, 90, 240, 0.1)"
              }}
            >
              JAHAGANAPATHI SUGUMAR
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-[#666666]"
            >
              AI/ML Developer | Architecting Agentic AI Systems
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl max-w-2xl text-[#666666] mb-8"
            >
              Creating intelligent, scalable, and impactful digital solutions that transform ideas into reality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-10"
            >
              <SocialLinks className="mb-8" iconSize={26} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                className="bg-[#7f5af0] hover:bg-[#6644cc] px-8 py-6 rounded-lg text-white font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_4px_15px_rgba(127,90,240,0.5)]"
                onClick={() => window.open('https://drive.google.com/file/d/1EdSyltf4qivNx9iTVXy7JB7VPA2e-f3h/view?usp=sharing', '_blank')}
              >
                <FileText size={20} className="mr-2" />
                Download Resume
              </Button>
              
              <Button 
                variant="outline"
                className="border-[#7f5af0] text-[#7f5af0] hover:bg-[#7f5af0]/5 px-8 py-6 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px] hover:border-[#6644cc]"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              
              <Button 
                variant="ghost"
                className="text-[#333333] hover:bg-[#7f5af0]/5 px-8 py-6 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="md:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-full border-4 border-[#7f5af0]/30 shadow-xl">
              <img 
                src="https://res.cloudinary.com/dyxu6ylng/image/upload/73346a1f-9c2e-400d-bf1c-af372c15eebb_qkilo9.jpg" 
                alt="Jahaganapathi Sugumar" 
                className="w-full h-auto rounded-full hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
