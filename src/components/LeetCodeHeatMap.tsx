
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactTooltip from "react-tooltip";

interface LeetCodeSubmission {
  date: string;
  count: number;
}

interface LeetCodeHeatMapProps {
  username: string;
}

const LeetCodeHeatMap = ({ username }: LeetCodeHeatMapProps) => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<LeetCodeSubmission[]>([]);
  const [maxCount, setMaxCount] = useState(0);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        // Generate mock data for LeetCode submissions
        const mockData: LeetCodeSubmission[] = [];
        let maxSubmissions = 0;
        
        // Generate a year of data
        const startDate = new Date(yearToShow, 0, 1);
        const endDate = new Date(yearToShow, 11, 31);
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          // Generate random submissions (more on weekends for realism)
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          const randomFactor = isWeekend ? 3 : 1;
          const randomChance = Math.random();
          
          // Create a pattern: 70% chance of submission on weekends, 40% on weekdays
          if ((isWeekend && randomChance < 0.7) || (!isWeekend && randomChance < 0.4)) {
            const count = Math.floor(Math.random() * 5 * randomFactor) + 1;
            mockData.push({
              date: d.toISOString().split('T')[0],
              count
            });
            
            if (count > maxSubmissions) {
              maxSubmissions = count;
            }
          } else {
            // Add dates with zero contributions to ensure all dates exist
            mockData.push({
              date: d.toISOString().split('T')[0],
              count: 0
            });
          }
        }
        
        setSubmissions(mockData);
        setMaxCount(maxSubmissions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
        // Generate some backup data
        const fallbackData = generateFallbackData(yearToShow);
        setSubmissions(fallbackData.data);
        setMaxCount(fallbackData.max);
        setLoading(false);
      }
    };
    
    fetchLeetCodeData();
  }, [username, yearToShow]);

  const generateFallbackData = (year: number) => {
    const data: LeetCodeSubmission[] = [];
    let max = 0;
    
    // Generate some basic fallback data
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (Math.random() > 0.6) {
        const count = Math.floor(Math.random() * 3) + 1;
        data.push({
          date: d.toISOString().split('T')[0],
          count
        });
        
        if (count > max) max = count;
      } else {
        data.push({
          date: d.toISOString().split('T')[0],
          count: 0
        });
      }
    }
    
    return { data, max };
  };

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-[#ebedf0]";
    
    const intensity = Math.min(Math.max(count / maxCount, 0.2), 1);
    
    if (intensity < 0.25) return "bg-[#c6e48b]";
    if (intensity < 0.5) return "bg-[#7bc96f]";
    if (intensity < 0.75) return "bg-[#239a3b]";
    return "bg-[#196127]";
  };

  // Previous year button handler
  const handlePrevYear = () => {
    setYearToShow(prev => prev - 1);
    setLoading(true);
  };

  // Next year button handler
  const handleNextYear = () => {
    const nextYear = yearToShow + 1;
    if (nextYear <= new Date().getFullYear()) {
      setYearToShow(nextYear);
      setLoading(true);
    }
  };

  const handleCellMouseEnter = (submission: LeetCodeSubmission) => {
    setHoveredDay(submission.date);
    setTooltipContent(`${submission.count} problems on ${submission.date}`);
  };

  const handleCellMouseLeave = () => {
    setHoveredDay(null);
  };

  // Get months for the calendar
  const getMonthLabels = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months;
  };

  // Get days of the week
  const getDayLabels = () => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  // Group submissions by month and week
  const groupSubmissionsByMonth = () => {
    const monthData: { [key: string]: LeetCodeSubmission[][] } = {};
    const months = getMonthLabels();
    
    months.forEach((_, monthIndex) => {
      // Initialize each month with empty weeks
      monthData[monthIndex] = [];
      
      // Find the first day of the month
      const firstDay = new Date(yearToShow, monthIndex, 1);
      
      // Find the last day of the month
      const lastDay = new Date(yearToShow, monthIndex + 1, 0);
      
      // Get submissions for this month
      const monthSubmissions = submissions.filter(sub => {
        const date = new Date(sub.date);
        return date.getFullYear() === yearToShow && date.getMonth() === monthIndex;
      });
      
      // Group by weeks
      let weekData: LeetCodeSubmission[] = [];
      let currentWeek = 0;
      
      // Add empty cells for days before the first day of month
      const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
      for (let i = 0; i < firstDayOfWeek; i++) {
        weekData.push({ date: "empty", count: -1 });
      }
      
      // Add actual submissions
      monthSubmissions.forEach(submission => {
        const date = new Date(submission.date);
        const dayOfWeek = date.getDay();
        
        weekData.push(submission);
        
        // If we're at the end of the week or the month, start a new week
        if (dayOfWeek === 6 || date.getDate() === lastDay.getDate()) {
          monthData[monthIndex].push([...weekData]);
          weekData = [];
          currentWeek++;
        }
      });
      
      // If we have a partial week at the end of the month, add it
      if (weekData.length > 0) {
        monthData[monthIndex].push([...weekData]);
      }
    });
    
    return monthData;
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#7f5af0]"
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
          <span className="text-gradient">LeetCode Contributions</span>
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
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrevYear}
                  className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  Previous Year
                </button>
                <span className="font-medium">{yearToShow}</span>
                <button 
                  onClick={handleNextYear}
                  className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={loading || yearToShow >= new Date().getFullYear()}
                >
                  Next Year
                </button>
                <a 
                  href={`https://leetcode.com/${username}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#7f5af0] hover:text-[#6644cc] transition-colors duration-300"
                >
                  @{username}
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7f5af0]"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <TooltipProvider>
                  <div className="min-w-max">
                    {/* GitHub-like calendar layout */}
                    <div className="flex">
                      {/* Day labels column */}
                      <div className="flex flex-col pr-2 mt-[36px]">
                        {getDayLabels().map((day, index) => (
                          index % 2 === 0 && (
                            <div key={day} className="h-[12px] text-xs text-gray-500 flex items-center mb-[2px]">
                              {day[0]}
                            </div>
                          )
                        ))}
                      </div>
                      
                      {/* Calendar grid */}
                      <div className="flex-1">
                        {/* Month labels */}
                        <div className="flex">
                          {getMonthLabels().map((month, index) => (
                            <div 
                              key={month} 
                              className="text-xs text-gray-500 mr-1"
                              style={{ width: index === 1 && yearToShow % 4 === 0 ? '29px' : `${submissions.filter(s => new Date(s.date).getMonth() === index).length/7*12}px` }}
                            >
                              {month}
                            </div>
                          ))}
                        </div>
                        
                        {/* Calendar cells */}
                        <div className="mt-1 flex flex-wrap">
                          {submissions.map((submission, idx) => (
                            <div 
                              key={`${submission.date}-${idx}`}
                              className={`w-[10px] h-[10px] m-[2px] rounded-sm 
                                ${getColorClass(submission.count)} 
                                transition-all duration-200
                                hover:ring-2 hover:ring-gray-300
                              `}
                              onMouseEnter={() => handleCellMouseEnter(submission)}
                              onMouseLeave={handleCellMouseLeave}
                              data-tip={`${submission.count} problems on ${submission.date}`}
                            />
                          ))}
                          <ReactTooltip />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4 gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
                        <span className="text-xs">0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#c6e48b]"></div>
                        <span className="text-xs">1-2</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#7bc96f]"></div>
                        <span className="text-xs">3-4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#239a3b]"></div>
                        <span className="text-xs">5-7</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#196127]"></div>
                        <span className="text-xs">8+</span>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>
                
                <div className="mt-4 text-center text-xs text-gray-400">
                  Based on simulated LeetCode activity data
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default LeetCodeHeatMap;
