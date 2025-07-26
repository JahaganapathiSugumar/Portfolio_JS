import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Award, X } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Crash Course on Python",
    issuer: "Google - Coursera",
    date: "Completed",
    link: "https://www.coursera.org/account/accomplishments/verify/TBCND5GCWWUS",
    credentialId: "TBCND5GCWWUS",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616540/image8-2_b3hjfr.webp",
    description: "Covered Python basics, syntax, data structures, and automation."
  },
  {
    id: 2,
    name: "Python for Data Science, AI & Development",
    issuer: "IBM - Coursera",
    date: "Completed",
    link: "https://coursera.org/share/03925f4174a4734f2fc63512fd697b65",
    credentialId: "03925f4174a4734f2fc63512fd697b65",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616860/IBM_logo_in_bjyeso.jpg",
    description: "Covered Python basics, data analysis, and AI applications."
  },
  {
    id: 3,
    name: "Data Analysis with Pandas and Python",
    issuer: "Udemy",
    date: "Completed",
    link: "https://www.udemy.com/certificate/UC-edc492d9-cb33-41e1-b14f-118106f098df/",
    credentialId: "UC-edc492d9-cb33-41e1-b14f-118106f098df",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616996/udemy_nus7qv.png",
    description: "Comprehensive training in data manipulation and analysis using Pandas and Python."
  },
  {
    id: 4,
    name: "Machine Learning with Python",
    issuer: "IBM - Coursera",
    date: "Completed",
    link: "https://coursera.org/share/560cb666b00078da45daaac3d97de15c",
    credentialId: "560cb666b00078da45daaac3d97de15c",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616860/IBM_logo_in_bjyeso.jpg",
    description: "Explored ML algorithms, model evaluation, and real-world applications."
  },
  {
    id: 5,
    name: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM - Coursera",
    date: "Completed",
    link: "https://coursera.org/verify/LID4O3JWZYHI",
    credentialId: "LID4O3JWZYHI",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616860/IBM_logo_in_bjyeso.jpg",
    description: "Covered deep learning fundamentals, artificial neural networks, and model building using Keras."
  },
  {
    id: 6,
    name: "Introduction to Cloud Computing",
    issuer: "IBM - Coursera",
    date: "Completed",
    link: "https://coursera.org/share/d400d2811ee5f17bdeee27b41a11b87e",
    credentialId: "d400d2811ee5f17bdeee27b41a11b87e",
    thumbnail: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746616860/IBM_logo_in_bjyeso.jpg",
    description: "Gained foundational knowledge of cloud computing, deployment models, and cloud services."
  }
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const openCertificate = (cert: (typeof certifications)[0]) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#f5f5f7] text-[#333333] relative z-0 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-grotesk font-bold mb-8 flex items-center"
        >
          <Award className="mr-3 text-[#7f5af0]" size={28} />
          <span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
            Certifications
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-600 mb-12 max-w-3xl"
        >
          Professional certifications showcasing my expertise and commitment to continuous learning.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden 
                         hover:shadow-lg hover:border-purple-400 transition-all duration-300 group"
            >
              {/* Image Section */}
              <div className="aspect-w-16 aspect-h-9 cursor-pointer overflow-hidden">
                <img 
                  src={cert.thumbnail} 
                  alt={`${cert.name} Certificate`} 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="font-medium text-lg text-[#333333] group-hover:text-[#7f5af0] transition-colors">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Issued by {cert.issuer} • {cert.date}
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">{cert.description}</p>

                {/* Verify Certificate Link */}
                <div className="mt-4">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#7f5af0] hover:text-purple-700 transition-colors duration-300"
                  >
                    Verify Certificate <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal/Lightbox */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
             onClick={() => setIsModalOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#333333]">{selectedCert.name}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-[#333333]">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <img 
                src={selectedCert.thumbnail} 
                alt={selectedCert.name} 
                className="w-full rounded-md object-contain max-h-[60vh]" 
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-sm text-gray-500">Issuing Organization</p>
                <p className="text-[#333333]">{selectedCert.issuer}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Issue Date</p>
                <p className="text-[#333333]">{selectedCert.date}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Credential ID</p>
                <p className="font-mono text-[#7f5af0]">{selectedCert.credentialId}</p>
              </div>
              
              <a 
                href={selectedCert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[#7f5af0] hover:bg-[#6644cc] text-white rounded-lg transition-colors duration-300"
              >
                Verify Certificate <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
