
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactGithubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";

interface GitHubContributionsProps {
  username: string;
}

const GitHubContributions = ({ username }: GitHubContributionsProps) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  // Custom tooltip for the calendar
  const renderTooltip = (day: { date: string; count: number; level: number }) => {
    return (
      <div className="bg-white p-2 rounded-md shadow-md border border-gray-200 text-sm">
        <strong>{new Date(day.date).toLocaleDateString()}</strong>
        <p>{day.count} contributions on this day</p>
      </div>
    );
  };

  return (
    <section className="py-8 md:py-12 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Github size={24} className="text-[#7f5af0]" />
          <span className="text-gradient">GitHub Contributions</span>
        </h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-[#7f5af0]/10 to-[#2cb67d]/10 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium flex items-center gap-2">
                <Calendar className="text-[#7f5af0]" />
                Contribution Calendar
              </CardTitle>
              <div className="flex gap-4">
                <button 
                  onClick={toggleTheme}
                  className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {theme === "light" ? "Dark Theme" : "Light Theme"}
                </button>
                <button 
                  onClick={toggleTooltip}
                  className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {showTooltip ? "Hide Tooltips" : "Show Tooltips"}
                </button>
                <a 
                  href={`https://github.com/${username}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#7f5af0] hover:text-[#6644cc] transition-colors duration-300"
                >
                  @{username}
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7f5af0]"></div>
              </div>
            ) : (
              <div className="min-w-max">
                <ReactGithubCalendar 
                  username={username} 
                  blockSize={14}
                  blockMargin={4}
                  fontSize={14}
                  colorScheme={
                    theme === 'dark' ? 'dark' : 'light'
                  }
                />
                {showTooltip && <ReactTooltip />}
              </div>
            )}
            
            <div className="mt-4 text-center text-xs text-gray-400">
              Data from GitHub API - Year to date contributions
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default GitHubContributions;
