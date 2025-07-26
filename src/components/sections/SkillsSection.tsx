import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Code, Database, Server, Globe, Wrench, 
  BrainCircuit, Languages, Award
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: Skill[];
}

const techIcons: Record<string, string> = {
  // Languages
  Python: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746541395/python_mm65od.png",
  Java: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Java_1_jqkame.png",
  JavaScript: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542635/js_vmkyww.png",
  
  // Frontend
  React: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/physics_xbpbxb.png",
  "HTML": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/html_ntaheb.png",
  "CSS": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/css-3_scayyi.png",
  "Bootstrap": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/bootstrap_lfzxqh.png",
  
  // Backend
  "Node.js": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/node-js_jkign9.png",
  Flask: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/Flask_a76kdy.svg",
  "Express.js": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542634/Express_i51lol.png",
  
  // Databases
  MongoDB: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/MongoDB_sxensz.png",
  MySQL: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/MySQL_czjlxn.png",
  
  // ML & AI
  TensorFlow: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/TensorFlow_mwtscv.png",
  PyTorch: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/PyTorch_syp7ey.png",
  "Scikit-learn": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/scikit-learn_eytloi.png",
  Keras: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/Keras_oiyxmh.png",
  OpenCV: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/OpenCV_x60yg3.png",
  Pandas: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746544299/Pandas_ntkdoq.png",
  Matplotlib: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/Matplotlib_req2ni.png",
  
  // Cloud & Tools
  AWS: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/AWS_ash6k1.png",
  Git: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Git_vgpppv.png",
  Docker: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Docker_gxhufz.png",
  "VS Code": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Visual_Studio_Code_VS_Code_cxzfnp.png",
  "Jupyter": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Jupyter_sqiheg.png",
  "IntelliJ IDEA": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/IntelliJ_IDEA_jyig78.png",
  Thonny: "/images/tech/python.svg",
  
  // UI/UX
  "Figma": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542633/Figma_gcy8iv.png",
  "Canva": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746542632/Canva_tpye5o.png",

  "Power BI": "https://res.cloudinary.com/dyxu6ylng/image/upload/e_background_removal/f_png/v1746620125/power-bi-icon-logo-png_seeklogo-439962_yqmglm.png",
  "C Language": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746619344/C_oun9jv.svg",
  Arduino: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746619605/Arduino_okwyna.svg",
  "Raspberry Pi": "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746619650/Raspberry-Pi_rogqzl.svg",
  NumPy: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746619399/NumPy_ieh89u.svg",
  Netlify: "https://res.cloudinary.com/dyxu6ylng/image/upload/e_background_removal/f_png/v1746620242/netlify-icon5435.logowik.com_iv9dbh.webp",
  Render: "https://res.cloudinary.com/dyxu6ylng/image/upload/e_background_removal/f_png/v1746620216/renderco_logo_glkfyd.jpg",
  Twilio: "https://res.cloudinary.com/dyxu6ylng/image/upload/e_background_removal/f_png/v1746619762/images_vnpgi3.png",
};

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: Code,
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "JavaScript", icon: "JS" },
      { name: "C Language", icon: "🅲" }
    ]
  },
  {
    name: "Frontend",
    icon: Globe,
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "Bootstrap", icon: "📱" },
    ]
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Flask", icon: "🧪" },
      { name: "Express.js", icon: "⚡" },
    ]
  },
  {
    name: "Databases & Cloud",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
      { name: "AWS", icon: "☁️" },
      { name: "Twilio", icon: "📞" }
    ]
  },
  {
    name: "ML & AI",
    icon: BrainCircuit,
    skills: [
      { name: "TensorFlow", icon: "🧠" },
      { name: "PyTorch", icon: "🔥" },
      { name: "Scikit-learn", icon: "📊" },
      { name: "Keras", icon: "⚙️" },
      { name: "OpenCV", icon: "👁️" },
      { name: "Pandas", icon: "🐼" },
      { name: "Matplotlib", icon: "📈" },
      { name: "NumPy", icon: "📐" }
    ]
  },
  {
    name: "IoT & Hardware",
    icon: Wrench,
    skills: [
      { name: "Arduino", icon: "🔧" },
      { name: "Raspberry Pi", icon: "🍓" }
    ]
  },
  {
    name: "Data Visualization",
    icon: Award,
    skills: [
      { name: "Power BI", icon: "📊" }
    ]
  },
  {
    name: "Soft Skills",
    icon: Award,
    skills: [
      { name: "Problem Solving", icon: "🧩" },
      { name: "Critical Thinking", icon: "🧠" },
      { name: "Time Management", icon: "⏰" },
      { name: "Communication", icon: "💬" }
    ]
  },
  {
    name: "Languages Known",
    icon: Languages,
    skills: [
      { name: "English", icon: "🇬🇧" },
      { name: "Tamil", icon: "🇮🇳" },
      { name: "Hindi", icon: "🇮🇳" }
    ]
  }
];

const SkillsSection = () => {
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
      { threshold: 0.1 }
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
    <TooltipProvider>
      <section id="skills" ref={sectionRef} className="py-10 md:py-14 bg-[#f9f9f9] text-[#333333]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-grotesk font-bold mb-8 flex items-center"
            >
              <Wrench className="mr-3 text-[#7f5af0]" size={28} />
              <span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
                Skills & Interests
              </span>
            </motion.h2>
            <p className="text-lg text-[#666666] max-w-3xl">
              An in-depth showcase of my technical expertise, tools, and skills in crafting innovative solutions in software development, artificial intelligence, and machine learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skillCategories.map((category, catIndex) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className="bg-white shadow-sm rounded-lg p-4 hover:border-[#7f5af0]/40 hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#f0f0ff]"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="mr-2 text-[#7f5af0]" size={20} />
                    <h3 className="text-lg font-bold text-[#333333]">{category.name}</h3>
                  </div>
                  
                  {/* Tech icons grid - more compact */}
                  <div className="grid grid-cols-3 gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Tooltip key={skill.name}>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + (skillIndex * 0.1) }}
                            className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-[#f0f0ff] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-sm"
                          >
                            {category.name !== "Soft Skills" && category.name !== "Languages Known" && techIcons[skill.name] ? (
                              <div className="w-8 h-8 flex items-center justify-center mb-1">
                                <img 
                                  src={techIcons[skill.name]} 
                                  alt={skill.name}
                                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 flex items-center justify-center mb-1 text-xl">
                                {skill.icon}
                              </div>
                            )}
                            <span className="text-xs font-medium text-center">{skill.name}</span>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 bg-white shadow-sm rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <BrainCircuit className="mr-2 text-[#7f5af0]" size={20} />
              Areas of Interest
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {["AI & Machine Learning", "Internet of Things", "Cloud Computing", "Computer Vision", "Data Analysis", "Web Development"].map((interest, i) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + (i * 0.1) }}
                  className="bg-gradient-to-r from-[#7f5af0]/10 to-[#2cb67d]/10 px-3 py-1 rounded-full text-sm text-[#555555] border border-[#7f5af0]/20 hover:from-[#7f5af0]/20 hover:to-[#2cb67d]/20 hover:shadow-sm transition-all duration-300"
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default SkillsSection;
