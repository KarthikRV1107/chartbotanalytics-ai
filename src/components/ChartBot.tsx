import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BarChart3, LineChart, PieChart, AreaChart, TrendingUp } from "lucide-react";
import { ChatMessage, type Message } from "./ChatMessage";
import { generateChartResponse } from "@/lib/chartBot";

const SUGGESTIONS = [
  { icon: BarChart3, label: "Sales by region", prompt: "Show me a bar chart of sales by region" },
  { icon: LineChart, label: "Revenue trend", prompt: "Show a line chart of monthly revenue for 2024" },
  { icon: PieChart, label: "Market share", prompt: "Create a pie chart of market share by company" },
  { icon: AreaChart, label: "User growth", prompt: "Display an area chart of user growth over time" },
  { icon: TrendingUp, label: "Performance", prompt: "Show performance metrics comparison as a bar chart" },
];

export function ChartBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const botResponse = generateChartResponse(msg);
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong px-6 py-4 flex items-center gap-3 z-10"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-background animate-pulse-glow" />
        </div>
        <div>
          <h1 className="font-heading font-semibold text-lg text-foreground">ChartBot AI</h1>
          <p className="text-xs text-muted-foreground">Ask me to create any chart or visualization</p>
        </div>
      </motion.header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-full gap-8"
          >
            <div className="text-center space-y-3">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary"
              >
                <BarChart3 className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h2 className="font-heading text-2xl font-bold text-gradient">What chart would you like?</h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Describe any data visualization and I'll create it instantly. Try bar charts, line graphs, pie charts, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl w-full">
              {SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => handleSend(s.prompt)}
                  className="glass rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:border-primary/50 transition-all group cursor-pointer"
                >
                  <s.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors shrink-0" />
                  <span className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors">{s.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4"
          >
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">Generating chart...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 glass-strong"
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe a chart... e.g. 'bar chart of sales by quarter'"
              className="w-full bg-muted/50 rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border transition-all"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
