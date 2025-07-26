import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import IntroSection from "@/components/sections/IntroSection";
import WorkSection from "@/components/sections/WorkSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import StatsContributionsSection from "@/components/sections/StatsContributionsSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollingNameBanner from "@/components/ScrollingNameBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import VisitorCounter from "@/components/VisitorCounter";
import userConfig from "@/config/userConfig";
import { Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Remove loading class to show content
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 100);
    
    // Handle scroll progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Add Google Analytics if configured
  useEffect(() => {
    const { googleAnalyticsId } = userConfig.analytics;
    
    if (googleAnalyticsId) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);
      
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        (window.dataLayer as any[]).push(args);
      }
      gtag('js', new Date());
      gtag('config', googleAnalyticsId, {
        send_page_view: true,
        page_path: window.location.pathname,
      });
      
      // Track scrolling to different sections
      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gtag('event', 'view_section', {
              'section_id': entry.target.id
            });
          }
        });
      }, { threshold: 0.7 });
      
      sections.forEach(section => {
        observer.observe(section);
      });
      
      return () => {
        sections.forEach(section => {
          observer.unobserve(section);
        });
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      <Preloader />
    
      <CustomCursor />
      
      <div className="sticky top-0 z-50">
        <Navigation />
        <div 
          className="h-1 bg-[#7f5af0] transition-all duration-200 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <main className="flex-grow">
        <IntroSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <ScrollingNameBanner />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <AboutSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <SkillsSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <StatsContributionsSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <ProjectsSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <WorkSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <CertificationsSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <EducationSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <AchievementsSection />
        <Separator className="h-0.5 bg-[#7f5af0]/30 m-0" />
        <ContactSection />
      </main>
      
      <Footer />
      
    </div>
  );
};

export default Index;
