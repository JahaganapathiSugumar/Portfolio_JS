import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";
import { Github, Code, BarChart } from "lucide-react";

interface GitHubStats {
  totalContributions: number;
  totalRepositories: number;
  totalPullRequests: number;
  totalStars: number;
  followers: number;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

const StatsContributionsSection = () => {
  const [gitHubStats, setGitHubStats] = useState<GitHubStats>({
    totalContributions: 1250,
    totalRepositories: 35,
    totalPullRequests: 86,
    totalStars: 174,
    followers: 42
  });

  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats>({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    acceptanceRate: 0,
    ranking: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/JahaganapathiSugumar');
        const data = await response.json();

        if (data) {
          setGitHubStats({
            totalContributions: 0, // Not available from this endpoint
            totalRepositories: data.public_repos || 0,
            totalPullRequests: 0, // Not available from this endpoint
            totalStars: 0, // Not available from this endpoint
            followers: data.followers || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  // Fetch LeetCode stats
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/JAHAGANAPATHI_SUGUMAR');
        const data = await response.json();

        if (data) {
          setLeetCodeStats({
            totalSolved: data.totalSolved || 385,
            easySolved: data.easySolved || 156,
            mediumSolved: data.mediumSolved || 194,
            hardSolved: data.hardSolved || 35,
            acceptanceRate: data.acceptanceRate || 66.8,
            ranking: data.ranking || 98205
          });
        }
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        setError(true);
        // Fallback to default mock data
        setLeetCodeStats({
          totalSolved: 385,
          easySolved: 156,
          mediumSolved: 194,
          hardSolved: 35,
          acceptanceRate: 66.8,
          ranking: 98205
        });
      } finally {
        setLoading(false);
      }
    };

    if (inViewport) {
      fetchLeetCodeStats();
    }
  }, [inViewport]);

  // Intersection observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          observer.unobserve(entry.target); // This is sufficient
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inViewport ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-grotesk font-bold mb-10 text-[#333333] flex items-center"
        >
          <BarChart className="mr-3 text-[#7f5af0]" size={28} />
          <span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
            Stats & Contributions
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ff]">
              <CardHeader className="bg-gradient-to-r from-[#7f5af0]/10 to-[#2cb67d]/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Github className="text-[#7f5af0]" />
                  GitHub Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 pt-6 pb-8">
                <div className="flex flex-col items-center">
                  <img 
                    src={`https://github-readme-stats.vercel.app/api?username=JahaganapathiSugumar&show_icons=true&theme=default&hide_border=true&count_private=true`}
                    alt="GitHub Stats"
                    className="w-full max-w-xs rounded-lg shadow"
                  />
                  <div className="grid grid-cols-2 gap-6 mt-8 w-full">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Repositories</div>
                      <div className="text-2xl font-bold text-[#7f5af0]">
                        {inViewport ? (
                          <CountUp end={gitHubStats.totalRepositories} duration={2.5} />
                        ) : (
                          0
                        )}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Followers</div>
                      <div className="text-2xl font-bold text-[#7f5af0]">
                        {inViewport ? (
                          <CountUp end={gitHubStats.followers} duration={2.5} />
                        ) : (
                          0
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/JahaganapathiSugumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-[#7f5af0] text-white rounded-lg font-medium shadow hover:bg-[#6644cc] transition-colors"
                  >
                    View GitHub Profile
                  </a>
                  <a
                    href="https://github.com/JahaganapathiSugumar?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-white border border-[#7f5af0] text-[#7f5af0] rounded-lg font-medium shadow hover:bg-[#f3f4f6] transition-colors"
                  >
                    View All Repositories
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LeetCode Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ff]">
              <CardHeader className="bg-gradient-to-r from-[#2cb67d]/10 to-[#7f5af0]/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Code className="text-[#2cb67d]" />
                  LeetCode Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 pt-6 pb-8">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2cb67d]"></div>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="text-center text-sm text-red-500 mb-4">
                        Unable to fetch real-time LeetCode stats. Displaying fallback data.
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <div className="grid grid-cols-2 gap-6 w-full">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                          <div className="text-sm text-gray-500 mb-1">Total Solved</div>
                          <div className="text-2xl font-bold text-[#2cb67d]">
                            <CountUp end={leetCodeStats.totalSolved} duration={2.5} />
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                          <div className="text-sm text-gray-500 mb-1">Global Rank</div>
                          <div className="text-2xl font-bold text-[#2cb67d]">
                            <CountUp end={leetCodeStats.ranking} duration={2.5} />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center mt-6 w-full">
                        <div className="text-sm text-gray-500 mb-1">Acceptance Rate</div>
                        <div className="text-2xl font-bold text-[#2cb67d]">
                          <CountUp end={leetCodeStats.acceptanceRate} duration={2.5} decimals={1} suffix="%" />
                        </div>
                      </div>
                      <div className="mt-8 w-full">
                        <div className="text-lg font-semibold mb-4 text-gray-700 text-center">Problems by Difficulty</div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-[#43A047]/10 p-4 rounded-lg shadow-sm border border-[#43A047]/20 flex flex-col items-center">
                            <div className="text-sm text-gray-600 mb-1">Easy</div>
                            <div className="text-xl font-bold text-[#43A047]">
                              <CountUp end={leetCodeStats.easySolved} duration={2.5} />
                            </div>
                          </div>
                          <div className="bg-[#FB8C00]/10 p-4 rounded-lg shadow-sm border border-[#FB8C00]/20 flex flex-col items-center">
                            <div className="text-sm text-gray-600 mb-1">Medium</div>
                            <div className="text-xl font-bold text-[#FB8C00]">
                              <CountUp end={leetCodeStats.mediumSolved} duration={2.5} />
                            </div>
                          </div>
                          <div className="bg-[#E91E63]/10 p-4 rounded-lg shadow-sm border border-[#E91E63]/20 flex flex-col items-center">
                            <div className="text-sm text-gray-600 mb-1">Hard</div>
                            <div className="text-xl font-bold text-[#E91E63]">
                              <CountUp end={leetCodeStats.hardSolved} duration={2.5} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <a
                          href="https://leetcode.com/JAHAGANAPATHI_SUGUMAR/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-block px-5 py-2 bg-[#2cb67d] text-white rounded-lg font-medium shadow hover:bg-[#249e5c] transition-colors"
                        >
                          View LeetCode Profile
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsContributionsSection;
