import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Customer Support Agent for JZ Atelier, a premium digital strategy and web design studio.
Your goal is to be professional, direct, and helpful, reflecting the "rough professional" and high-performance brand identity.

Key Business Information:
- Name: JZ Atelier
- Services: 
  * Custom Website Design: Starts at $800. Includes mobile optimization, SEO, and high-converting forms.
  * Ad Campaigns: Starts at $100. We launch targeted ads within 24-48 hours.
  * Site Maintenance: $25-$50/month for full site management and updates.
- Ad Packages:
  * Starter Ads ($100): Includes 1 ad, basic targeting. Note: There is a $0.10 fee per view, capped at 1000 views.
  * Advanced Ads ($120): Includes 3 ads, enhanced targeting.
  * Elite Package ($160): Includes 5 ads, advanced setup, full market dominance.
- Payments: We accept CashApp and PayPal as primary methods. Stripe is coming soon.
- Support: For direct human support, clients can text 319-483-8875. Remind them it is TEXT ONLY, no calls.
- Philosophy: We build websites that "Kill The Competition". We focus on direct results and no fluff.

Guidelines:
- Keep responses concise and impactful.
- If a user wants a demo, direct them to the "Get Free Demo" form on the website.
- If they have technical issues, suggest texting the support number.
- Always maintain a premium, confident tone.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to JZ Atelier. How can I help you dominate your market today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Format history for the API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again or text our support line.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please check your network or text 319-483-8875 for direct help." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : (window.innerWidth < 768 ? '450px' : '500px')
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-32px)] md:w-[400px] bg-brand-dark border-2 border-brand-purple shadow-[10px_10px_0px_0px_rgba(168,85,247,0.2)] mb-4 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-brand-purple flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="font-display font-bold text-white uppercase tracking-widest">JZ AI Support</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-purple/20"
                >
                  {messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 font-mono text-xs uppercase tracking-tight ${
                        m.role === 'user' 
                          ? 'bg-brand-purple text-white border-l-4 border-white/20' 
                          : 'bg-white/5 text-gray-300 border-l-4 border-brand-purple'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-50">
                          {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          <span>{m.role === 'user' ? 'CLIENT' : 'ATELIER AI'}</span>
                        </div>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 p-3 border-l-4 border-brand-purple">
                        <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-brand-gray">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow bg-white/5 border border-white/10 px-4 py-2 focus:outline-none focus:border-brand-purple font-mono text-xs text-white uppercase"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-brand-purple text-white p-2 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`w-16 h-16 bg-brand-purple flex items-center justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
};
