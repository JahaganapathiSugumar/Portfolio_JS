
// import { motion } from "framer-motion";
// import { Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const BookCallCTA = () => {
//   const handleBookCall = () => {
//     // You can replace this URL with your actual Calendly or TidyCal link
//     window.open("https://calendly.com/jaganapathisugumar", "_blank");
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="fixed bottom-8 right-8 z-40"
//     >
//       <Button
//         onClick={handleBookCall}
//         className="bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-white px-6 py-6 rounded-full 
//                 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
//         size="lg"
//       >
//         <motion.span
//           animate={{ scale: [1, 1.05, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="mr-2"
//         >
//           <Calendar size={20} />
//         </motion.span>
//         <span className="font-medium">Book a Call</span>
//       </Button>
//     </motion.div>
//   );
// };

// export default BookCallCTA;
