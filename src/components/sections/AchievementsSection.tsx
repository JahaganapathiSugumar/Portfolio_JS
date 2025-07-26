import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Award, Star, Medal, Trophy, BookOpen } from "lucide-react";

const achievements = [
	{
		id: 1,
		title: "Third Prize - Xenobots: The First Living Robot",
		description:
			"Won Third Prize for presenting “Xenobots: The First Living Robot” at the Indian Institute of Technology Madras (IIT Madras).",
		year: "2023",
		icon: Trophy,
	},
	{
		id: 2,
		title: "Second Prize - Full Analysis of Polar Technology and Smart Coaching",
		description:
			"Won Second Prize for presenting on “A Full Analysis of the Science Underlying Polar Technology and Smart Coaching” at the Sri Ramakrishna Institute of Technology.",
		year: "2023",
		icon: Medal,
	},
	{
		id: 3,
		title: "Second Prize - Project Expo (Sensory Glasses)",
		description:
			"Won Second Prize at the Project Expo for the project “Sensory Glasses” at Kongu Engineering College.",
		year: "2023",
		icon: Star,
	},
	{
		id: 4,
		title: "Publication - Sentiment Analysis in Code-Mixed Tweets",
		description: (
			<>
				Published the paper{" "}
				<b>
					“Deciphering Emotions in Tamil-English and Code-Mixed Social Media Tweets”
				</b>{" "}
				(May 2025) at the Fifth Workshop on Speech, Vision, and Language
				Technologies for Dravidian Languages @ NAACL.
				<br />
				<span className="block mt-1">
					<a
						href="https://aclanthology.org/2025.dravidianlangtech-1.52"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#7f5af0] underline"
					>
						Paper Link
					</a>
				</span>
			</>
		),
		year: "2025",
		icon: BookOpen,
	},
];

const AchievementsSection = () => {
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
		<section
			id="achievements"
			ref={sectionRef}
			className="py-20 md:py-32 bg-[#f9f9f9]"
		>
			<div className="container mx-auto px-4 md:px-6">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-grotesk font-bold mb-12 flex items-center"
				>
					<Trophy className="mr-3 text-[#7f5af0]" size={32} />
					<span className="pb-2 border-b-2 border-[#7f5af0] inline-block">
						Achievements
					</span>
				</motion.h2>

				<div className="overflow-x-auto pb-4">
					<div className="flex space-x-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:space-x-0 min-w-max md:min-w-0">
						{achievements.map((achievement, index) => {
							const Icon = achievement.icon;
							return (
								<motion.div
									key={achievement.id}
									initial={{ opacity: 0, y: 30 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: index * 0.15 }}
									className="w-80 md:w-full bg-white shadow-sm border border-gray-200 rounded-lg p-6 
                    hover:border-[#7f5af0]/40 hover:shadow-md transition-all duration-300 group flex flex-col"
								>
									<div className="w-14 h-14 rounded-full bg-[#7f5af0]/10 flex items-center justify-center mb-4 
                         group-hover:bg-[#7f5af0]/20 transition-all duration-300">
										<Icon
											className="text-[#7f5af0] group-hover:scale-110 transition-all duration-300"
											size={28}
										/>
									</div>
									<div className="flex items-center mb-2">
										<span className="text-sm font-medium text-[#7f5af0]">
											{achievement.year}
										</span>
									</div>
									<h3 className="text-xl font-bold mb-2 text-[#333333] group-hover:text-[#7f5af0] transition-all duration-300">
										{achievement.title}
									</h3>
									<div className="text-gray-600 text-sm">
										{achievement.description}
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AchievementsSection;
