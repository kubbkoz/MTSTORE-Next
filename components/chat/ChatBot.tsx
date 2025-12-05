
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ALL_PRODUCTS } from '../../constants';
import { Product } from '../../types';
import Button from '../ui/Button';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
  recommendedProducts?: Product[];
}

interface ChatBotProps {
  onNavigateToProduct?: (product: Product) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNavigateToProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Ahoj! Som tvoj AI cyklo-špecialista MT-SPORT. Hľadáš bicykel na konkrétnu výšku, e-bike do určitej ceny, alebo potrebuješ poradiť s výbavou?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Prepare product data context (simplify to save tokens)
  const productContext = ALL_PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price,
    brand: p.brand,
    gender: p.gender,
    variants: p.variants?.map(v => v.size).join(', '),
    features: p.features?.slice(0, 3).join(', ')
  }));

  const systemInstruction = `
    You are an expert cycling sales assistant for MT-SPORT.
    You communicate in Slovak language.
    Your tone is professional, enthusiastic, and helpful (like a pro bike shop employee).
    
    You have access to the following product inventory JSON:
    ${JSON.stringify(productContext)}

    RULES:
    1. Answer user questions based ONLY on the provided inventory.
    2. If the user asks for a recommendation (e.g., "bike for 180cm under 3000eur"), filter the inventory.
    3. Use general cycling knowledge for sizing:
       - 150-165cm: XS/S
       - 165-175cm: S/M
       - 175-185cm: M/L
       - 185-195cm: L/XL
       - >195cm: XL/XXL
    4. If you recommend specific products, mention them in the text, AND AT THE END of your response, output their IDs in this exact format: [[IDS: id1, id2]].
    5. If no products match, suggest the closest alternatives or ask clarifying questions.
    6. Keep responses concise (max 3-4 sentences unless detailed explanation is needed).
  `;

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Create chat history for context
      // Note: The SDK expects history in the format { role: string, parts: { text: string }[] }
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Create a new chat session with the full history
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
        history: history,
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text || ''; // Access .text directly

      // Parse IDs from response
      let finalText = responseText;
      let recommendedProducts: Product[] = [];
      
      const idMatch = responseText.match(/\[\[IDS: (.*?)\]\]/);
      if (idMatch) {
        const ids = idMatch[1].split(',').map(id => id.trim());
        recommendedProducts = ALL_PRODUCTS.filter(p => ids.includes(p.id));
        finalText = responseText.replace(idMatch[0], '').trim();
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: finalText,
        recommendedProducts
      }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Ospravedlňujem sa, momentálne mám technické problémy. Skúste to prosím neskôr.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-zinc-900 rotate-90' : 'bg-brand animate-bounce'
        }`}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-28 right-4 md:right-8 z-[60] w-[90vw] md:w-[450px] h-[600px] max-h-[80vh] bg-white shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 transform origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-brand">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center border border-brand/50">
               <Sparkles className="w-5 h-5 text-brand" />
             </div>
             <div>
               <h3 className="font-bold font-tech uppercase text-lg leading-none">MTSPORT BOT</h3>
               <span className="text-xs text-gray-400 flex items-center mt-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                 Online
               </span>
             </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message Bubble */}
              <div className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-black text-white rounded-t-xl rounded-bl-xl' 
                  : 'bg-white text-gray-800 rounded-t-xl rounded-br-xl border border-gray-100'
              }`}>
                {msg.text}
              </div>

              {/* Product Cards in Chat */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-3 grid gap-2 w-full max-w-[90%]">
                  {msg.recommendedProducts.map(product => (
                    <a 
                      key={product.id}
                      href="#"
                      className="flex gap-3 bg-white p-2 border-l-4 border-brand shadow-sm hover:shadow-md transition-all group cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateToProduct) {
                          onNavigateToProduct(product);
                          // Optionally keep chat open so user can continue conversation
                        }
                      }}
                    >
                      <div className="w-16 h-16 bg-gray-50 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-xs font-bold uppercase truncate font-tech group-hover:text-brand">{product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-black text-black">{product.price} €</span>
                          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">Detail</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start">
              <div className="bg-white p-4 rounded-t-xl rounded-br-xl border border-gray-100 shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin text-brand" />
                 <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Premýšľam...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
           <div className="relative flex items-center">
             <input
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyPress}
               placeholder="Napíšte správu..."
               className="w-full bg-gray-100 text-sm p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-brand font-medium text-black rounded-none placeholder-gray-500"
             />
             <button 
               onClick={handleSend}
               disabled={!inputValue.trim() || isLoading}
               className="absolute right-2 p-2 bg-black text-white hover:bg-brand disabled:opacity-50 disabled:hover:bg-black transition-colors rounded-none"
             >
               <Send className="w-4 h-4" />
             </button>
           </div>
           <p className="text-[10px] text-center text-gray-400 mt-2">
             AI môže robiť chyby. Skontrolujte si prosím detaily produktu.
           </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
