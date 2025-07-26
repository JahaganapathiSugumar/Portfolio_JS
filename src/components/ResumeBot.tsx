
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  source?: string;
}

const ResumeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi there! I'm Jaha's Resume Bot. Feel free to ask me anything about Jahaganapathi's skills, experience, or background!",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // For now, we'll simulate a response since the backend isn't connected yet
    setTimeout(() => {
      const botResponses = [
        "Based on Jahaganapathi's resume, he has extensive experience in AI/ML and full-stack development.",
        "Jahaganapathi has worked on several projects involving React, TypeScript, and AI integration.",
        "According to his resume, Jahaganapathi has expertise in Python, JavaScript, TypeScript, and Java.",
        "Jahaganapathi has a background in computer science with a focus on artificial intelligence.",
        "His resume highlights experience with various cloud platforms and DevOps practices."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Float button */}
      <motion.button
        className={`fixed bottom-8 right-8 bg-[#7f5af0] text-white p-4 rounded-full shadow-lg z-50 ${isOpen ? 'hidden' : 'flex'}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-8 right-8 w-[350px] h-[500px] bg-white rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#7f5af0] p-4 text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <h3 className="font-medium">Resume Bot</h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.isUser
                        ? 'bg-[#7f5af0] text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    {msg.source && (
                      <div className="mt-2 text-xs opacity-70 italic">
                        Source: {msg.source}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Input */}
            <div className="p-4 bg-white flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Jaha's resume..."
                className="flex-1 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#7f5af0] text-sm h-10"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage} 
                className="ml-2 bg-[#7f5af0] hover:bg-[#6644cc]"
                size="icon"
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeBot;
