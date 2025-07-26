import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, ExternalLink, Calendar, MapPin } from "lucide-react";

const education = [
	{
		id: 1,
		institution: "Kongu Engineering College",
		degree: "BE in Computer Science and Engineering",
		period: "2022 - 2026",
		cgpa: "7.98/10 (Till 6th Semester)",
		description:
			"Pursuing a bachelor's degree with a focus on computer science fundamentals, software engineering, and real-world project development.",
		location: "Erode, Tamil Nadu",
		link: "https://kongu.ac.in/",
		image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746609174/KEC_x3mgla.jpg",
	},
	{
		id: 2,
		institution: "Kendriya Vidyalaya Gandhigram",
		degree: "Class XII (CBSE)",
		period: "2021 - 2022",
		cgpa: "85.2%",
		description:
			"Completed higher secondary education in the Computer Science stream under the Central Board of Secondary Education, with emphasis on mathematics, physics, and computer science.",
		location: "Dindigul, Tamil Nadu",
		link: "https://gandhigram.kvs.ac.in",
		image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746624878/kvs_nwxgel.png",
	},
	{
		id: 3,
		institution: "Kendriya Vidyalaya Gandhigram",
		degree: "Class X (CBSE)",
		period: "2019 - 2020",
		cgpa: "72.4%",
		description:
			"Completed secondary school education under the CBSE curriculum with foundational subjects in science and mathematics.",
		location: "Dindigul, Tamil Nadu",
		link: "https://gandhigram.kvs.ac.in",
		image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1746624878/kvs_nwxgel.png",
	},
];

const EducationSection = () => {
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
		<section
			id="education"
			ref={sectionRef}
			className="py-20 md:py-32 bg-[#f9f9f9] text-[#333333]"
		>
			<div className="container mx-auto px-4 md:px-6">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-grotesk font-bold mb-4 text-[#333333] flex items-center"
				>
					<GraduationCap className="mr-3 text-[#7f5af0]" size={28} />
					<span className="pb-2 border-b-2 border-[#8b5cf6] inline-block">
						Education
					</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-lg text-gray-600 mb-12 max-w-3xl"
				>
					My academic journey and educational qualifications that have shaped my
					professional career.
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{education.map((edu, index) => (
						<motion.div
							key={edu.id}
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-white border border-gray-200 rounded-lg overflow-hidden 
                       hover:shadow-lg hover:border-purple-400
                       transition-all duration-300 group"
						>
							<div className="overflow-hidden">
								<img
									src={edu.image}
									alt={edu.institution}
									className="w-full h-48 object-cover"
								/>
							</div>
							<div className="p-6 flex flex-col h-full">
								<div className="mb-4">
									<h3 className="font-medium text-lg text-[#333333] group-hover:text-[#7f5af0] transition-colors duration-300">
										{edu.degree}
									</h3>
									<p className="text-[#555555] border-b border-gray-300 pb-1 inline-block">
										{edu.institution}
									</p>
									<div className="flex items-center mt-2">
										<Calendar size={16} className="text-[#7f5af0] mr-1" />
										<span className="text-sm text-gray-500 mr-3">
											{edu.period}
										</span>
										<span className="text-sm text-[#7f5af0] font-medium">
											{edu.degree.includes("Class") ? `Percentage: ${edu.cgpa}` : `CGPA: ${edu.cgpa}`}
										</span>
									</div>
								</div>

								<div className="flex items-center mt-2 mb-4">
									<MapPin size={16} className="text-[#7f5af0] mr-1" />
									<span className="text-sm text-gray-500">
										{edu.location}
									</span>
								</div>

								<p className="text-sm text-gray-600 mb-4">
									{edu.description}
								</p>

								<div className="mt-auto">
									<a
										href={edu.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center text-[#7f5af0] hover:text-purple-700 transition-colors duration-300"
									>
										Visit Institution Website{" "}
										<ExternalLink size={14} className="ml-1" />
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EducationSection;
