import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Languages, Coffee, Award, Code, Book, Briefcase, UserCheck } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-14 md:py-20 bg-white text-[#333333]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-grotesk font-bold mb-12 flex items-center"
        >
          <User className="mr-3 text-[#7f5af0]" size={32} />
          <span className="pb-2 border-b-2 border-[#7f5af0] inline-block">
            About Me
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Bio Section */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-grotesk font-bold mb-6 flex items-center">
              <UserCheck className="mr-2 text-[#7f5af0]" size={24} />
              Professional Profile
            </h3>
            <div className="space-y-4 text-[#555555] text-lg leading-relaxed">
              <p>
                Passionate Computer Science Engineer with expertise in AI, ML, DL, and Full-Stack Development. Skilled in scalable AI solutions, real-time analytics, and end-to-end applications.
              </p>
              <p>
                Proficient in Python, TensorFlow, Keras, and Flask. Driven to build innovative, efficient, and impactful solutions in software development, data science, and AI-powered applications.
              </p>
              <p>
                My goal is to leverage cutting-edge technologies to develop scalable, efficient, and user-friendly applications that solve complex problems and make a positive impact on society.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="mr-3 text-[#7f5af0] shrink-0" size={24} />
                  <h4 className="text-lg font-grotesk font-semibold">Work Experience</h4>
                </div>
                <ul className="space-y-3 text-[#666666]">
                  <li className="flex items-start">
                    <div className="w-2 h-2 mt-2 mr-2 bg-[#7f5af0] rounded-full"></div>
                    <div>
                      <span className="font-medium block">Uptricks Services Pvt. Ltd.</span>
                      <span className="text-sm">Python Developer Intern (May 2024 - Jul 2024)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 mt-2 mr-2 bg-[#7f5af0] rounded-full"></div>
                    <div>
                      <span className="font-medium block">Generative AI Consortium</span>
                      <span className="text-sm">AI/ML Intern (Jun 2024 - Oct 2024)</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Code className="mr-3 text-[#7f5af0] shrink-0" size={24} />
                  <h4 className="text-lg font-grotesk font-semibold">Core Expertise</h4>
                </div>
                <ul className="space-y-2 text-[#666666]">
                  <li className="flex items-start">
                    <div className="w-2 h-2 mt-2 mr-2 bg-[#7f5af0] rounded-full"></div>
                    <span>AI/ML Development</span>
                  </li>
                 
                  <li className="flex items-start">
                    <div className="w-2 h-2 mt-2 mr-2 bg-[#7f5af0] rounded-full"></div>
                    <span>Data Analysis & Visualization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 mt-2 mr-2 bg-[#7f5af0] rounded-full"></div>
                    <span>IOT & Cloud</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Personal Details Section */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-grotesk font-bold mb-6 text-[#333333]">
                Personal Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="mr-3 text-[#7f5af0] mt-1 shrink-0" size={20} />
                  <div>
                    <span className="text-[#333333] font-medium block">Location</span>
                    <span className="text-[#666666]">Tamil Nadu, India</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="mr-3 text-[#7f5af0] mt-1 shrink-0" size={20} />
                  <div>
                    <span className="text-[#333333] font-medium block">Education</span>
                    <span className="text-[#666666]">B.E. in Computer Science and Engineering</span>
                    <span className="text-[#666666] block text-sm">Kongu Engineering College, Erode (2022-2026)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Languages className="mr-3 text-[#7f5af0] mt-1 shrink-0" size={20} />
                  <div>
                    <span className="text-[#333333] font-medium block">Languages</span>
                    <span className="text-[#666666]">English (Fluent), Tamil (Native), Hindi (Intermediate)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Book className="mr-3 text-[#7f5af0] mt-1 shrink-0" size={20} />
                  <div>
                    <span className="text-[#333333] font-medium block">Education History</span>
                    <div className="text-[#666666] text-sm">
                      <p>Class XII (CBSE) - 85.4%</p>
                      <p>Kendriya Vidyalaya Gandhigram, Dindigul</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Coffee className="mr-3 text-[#7f5af0] mt-1 shrink-0" size={20} />
                  <div>
                    <span className="text-[#333333] font-medium block">Interests</span>
                    <span className="text-[#666666]">AI Research, Cloud Computing, Reading and Continuous Learnin</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
