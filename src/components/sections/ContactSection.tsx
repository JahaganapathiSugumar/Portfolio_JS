import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import SocialLinks from "../SocialLinks";
import { Mail, Phone, SendIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://portfolio-backend-2-pkcx.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });

    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while sending your message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#f5f5f7] dark:bg-[#121212]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8 flex items-center"
        >
          <Mail className="mr-3 text-[#7f5af0]" size={28} />
          <span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
            Contact Me
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#555555] dark:text-[#a1a1aa] mb-12 max-w-3xl"
        >
          Have a project in mind or want to discuss collaboration opportunities?
          Reach out to me and I'll get back to you as soon as possible.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <div className="bg-white dark:bg-[#1e1e1e] shadow-sm border border-gray-200 dark:border-[#333] rounded-lg p-8 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 text-[#333333] dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start group">
                  <div className="rounded-full bg-[#7f5af0]/10 dark:bg-[#7f5af0]/20 p-3 mr-4 group-hover:bg-[#7f5af0]/20 dark:group-hover:bg-[#7f5af0]/30 transition-colors">
                    <Mail className="text-[#7f5af0]" size={20} />
                  </div>
                  <div>
                    <p className="text-[#666666] dark:text-[#a1a1aa] text-sm">Email</p>
                    <a
                      href="mailto:jaganapathisugumar@gmail.com"
                      className="text-[#333333] dark:text-white hover:text-[#7f5af0] transition-colors"
                    >
                      jaganapathisugumar@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="rounded-full bg-[#7f5af0]/10 dark:bg-[#7f5af0]/20 p-3 mr-4 group-hover:bg-[#7f5af0]/20 dark:group-hover:bg-[#7f5af0]/30 transition-colors">
                    <Phone className="text-[#7f5af0]" size={20} />
                  </div>
                  <div>
                    <p className="text-[#666666] dark:text-[#a1a1aa] text-sm">Phone</p>
                    <a
                      href="tel:+916379613654"
                      className="text-[#333333] dark:text-white hover:text-[#7f5af0] transition-colors"
                    >
                      +91 6379 613654
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 mt-8 text-[#333333] dark:text-white">
                Follow Me
              </h3>
              <SocialLinks iconSize={24} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-7"
          >
            <div className="bg-white dark:bg-[#1e1e1e] shadow-sm border border-gray-200 dark:border-[#333] rounded-lg p-8 hover:shadow-md transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-[#666666] dark:text-[#a1a1aa] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f9f9f9] dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-[#333333] dark:text-white
                             focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0] focus:outline-none
                             transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-[#666666] dark:text-[#a1a1aa] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f9f9f9] dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-[#333333] dark:text-white
                             focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0] focus:outline-none
                             transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-[#666666] dark:text-[#a1a1aa] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f9f9f9] dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-[#333333] dark:text-white
                             focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0] focus:outline-none
                             transition-all duration-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7f5af0] hover:bg-[#6644cc] text-white py-6 rounded-lg transition-all duration-300 
                             hover:shadow-[0_0_15px_rgba(127,90,240,0.5)] hover:translate-y-[-2px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <SendIcon className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;