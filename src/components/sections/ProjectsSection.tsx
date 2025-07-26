import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Code, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "WhatsApp Agentic AI Assistant",
    description: "A multi-modal Agentic AI assistant integrated with WhatsApp using n8n, OpenAI GPT, and SerpAPI. Supports text, voice, and image inputs, delivering context-aware responses in real-time.",
    tech: ["n8n", "OpenAI GPT-4", "WhatsApp Cloud API", "SerpAPI", "Agentic AI", "LLM"],
    github: "https://github.com/JahaganapathiSugumar/Whatsapp_Bot_Agentic_AI",
    live: "",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1753509465/457752671-31a56e54-046f-4413-ae3e-e2033049fd3f_vckrw2.png"
  },
  {
    id: 2,
    name: "Brain Scan AI",
    description: "Deep learning solution for early detection of neurological disorders through MRI scan analysis.",
    tech: ["Python", "PyTorch", "ML", "scikit-learn", "Flask"],
    github: "https://github.com/JahaganapathiSugumar/BRAIN_SCAN_AI",
    live: "https://brain-scan-ai.onrender.com/",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1748021330/b_felfl3.png"
  },
  {
    id: 3,
    name: "SpamShield - Advanced Spam Detection",
    description: "AI-powered spam detection web application that classifies messages as Spam or Not Spam using Naïve Bayes and TF-IDF.",
    tech: ["Python", "Flask", "Naïve Bayes", "TF-IDF", "HTML", "CSS", "JavaScript", "Scikit-Learn", "Gunicorn"],
    github: "https://github.com/JahaganapathiSugumar/SpamShield---Advanced-Spam-Detection",
    live: "https://spamshield-advanced-spam-detection.onrender.com/",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1753507261/Brain_scan_spdvkl.png"
  },
  {
    id: 4,
    name: "HerProTech",
    description: "AI Women Safety Surveillance system designed to detect and alert security threats using computer vision and machine learning.",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    github: "https://github.com/JahaganapathiSugumar/Women_Safety_Analytics",
    live: "",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1748022621/hhh_l5odiv.png"
  },
  {
    id: 5,
    name: "Smart Spectacles",
    description: "Wearable obstacle detector for the visually impaired using ultrasonic sensors and Arduino Nano to provide proximity-based buzzer alerts.",
    tech: ["Arduino Nano", "Ultrasonic Sensors", "Buzzer", "Embedded Systems"],
    github: "https://github.com/JahaganapathiSugumar/SMART-SPECTACLES",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746608629/new_nn_ktj0ku.jpg"
  },
  {
    id: 6,
    name: "Weather Pro Web",
    description: "Modern weather application that provides real-time forecasts, interactive maps, and personalized weather alerts.",
    tech: ["React", "Node.js", "Express", "Weather API"],
    github: "https://github.com/JahaganapathiSugumar/Weather_Pro_Web",
    live: "https://weatherpro-web.netlify.app",
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1748020932/weather_jpu5ju.png"
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 md:py-24 bg-[#f0f0f7]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-grotesk font-bold mb-8 flex items-center"
        >
          <Code className="mr-3 text-[#7f5af0]" size={28} />
          <span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
            Projects
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-600 mb-12 max-w-3xl"
        >
          Explore my portfolio of projects showcasing expertise in AI, machine learning, and full-stack development.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm 
                       hover:transform hover:scale-105 hover:shadow-lg hover:border-purple-400 
                       transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <div className="relative h-full w-full group-hover:scale-105 transition-all duration-500">
                  <img 
                    src={`${project.image}?w=500&auto=format&fit=crop&q=80`} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                flex items-center justify-center">
                    <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-center space-x-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#7f5af0]/80 hover:bg-[#7f5af0] hover:text-white p-2 rounded-full 
                                     transition-colors flex items-center space-x-2 px-4 hover:translate-y-[-2px]"
                            aria-label={`View ${project.name} code on GitHub`}
                          >
                            <Github size={18} className="text-white" />
                            <span>🔗 View Code</span>
                          </a>
                        )}
                        
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2cb67d]/80 hover:bg-[#2cb67d] hover:text-white p-2 rounded-full 
                                     transition-colors flex items-center space-x-2 px-4 hover:translate-y-[-2px]"
                            aria-label={`View ${project.name} live demo`}
                          >
                            <ArrowRight size={18} className="text-white" />
                            <span>🌐 Visit Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-grotesk font-bold mb-3 text-[#333333] group-hover:text-[#7f5af0] transition-all duration-300">
                  {project.name}
                </h3>
                <p className="text-[#555555] mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs bg-[#8b5cf6]/20 text-[#8b5cf6] px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#666666] hover:text-purple-600 transition-colors flex items-center"
                      aria-label={`View ${project.name} code on GitHub`}
                    >
                      <Code size={16} className="mr-1" />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#666666] hover:text-purple-600 transition-colors flex items-center"
                      aria-label={`View ${project.name} live demo`}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
