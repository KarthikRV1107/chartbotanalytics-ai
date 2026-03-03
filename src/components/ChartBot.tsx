import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, BarChart3, LineChart, PieChart, AreaChart, TrendingUp,
  Zap, Database, Activity, Bot, Mic, Paperclip, ChevronDown,
} from "lucide-react";
import { ChatMessage, type Message } from "./ChatMessage";
import { generateChartResponse } from "@/lib/chartBot";
import { ParticleBackground } from "./ParticleBackground";

const SUGGESTIONS = [
  { icon: BarChart3, label: "Sales by region", prompt: "Show me a bar chart of sales by region", color: "from-primary to-primary/60" },
  { icon: LineChart, label: "Revenue trend", prompt: "Show a line chart of monthly revenue for 2024", color: "from-accent to-accent/60" },
  { icon: PieChart, label: "Market share", prompt: "Create a pie chart of market share by company", color: "from-chart-pink to-chart-pink/60" },
  { icon: AreaChart, label: "User growth", prompt: "Display an area chart of user growth over time", color: "from-chart-blue to-chart-blue/60" },
  { icon: TrendingUp, label: "Performance", prompt: "Show performance metrics comparison as a bar chart", color: "from-chart-orange to-chart-orange/60" },
  { icon: Activity, label: "Radar analysis", prompt: "Show a radar chart of team skills and capabilities", color: "from-chart-cyan to-chart-cyan/60" },
];

const STATS = [
  { icon: Zap, label: "Charts Generated", value: "12.4K" },
  { icon: Database, label: "Data Points", value: "1.2M" },
  { icon: Activity, label: "Chart Types", value: "6+" },
];

export function ChartBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollDown(scrollHeight - scrollTop - clientHeight > 100);
  };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));

    const botResponse = generateChartResponse(msg);
    botResponse.timestamp = new Date();
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen overflow-hidden">
      <ParticleBackground />

      {/* Ambient gradient orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative z-10 glass-strong px-6 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-card"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="font-heading font-bold text-lg text-foreground tracking-tight flex items-center gap-2">
              ChartBot
              <span className="text-gradient font-black">AI</span>
              <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">Pro</span>
            </h1>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
              Online · Powered by advanced analytics
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-xs"
            >
              <stat.icon className="w-3.5 h-3.5 text-primary" />
              <div>
                <span className="font-mono font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground ml-1">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.header>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative z-10 flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-full gap-10"
          >
            {/* Hero section */}
            <div className="text-center space-y-5">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 mx-auto"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent blur-xl opacity-50" />
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-2xl shadow-primary/40">
                  <Sparkles className="w-12 h-12 text-primary-foreground" />
                </div>
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    animate={{
                      x: [0, 30 * Math.cos((i * Math.PI * 2) / 3), 0],
                      y: [0, 30 * Math.sin((i * Math.PI * 2) / 3), 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                    style={{ top: "50%", left: "50%" }}
                  />
                ))}
              </motion.div>

              <div className="space-y-2">
                <h2 className="font-heading text-3xl md:text-4xl font-black">
                  <span className="text-foreground">Create </span>
                  <span className="text-gradient">stunning charts</span>
                  <span className="text-foreground"> instantly</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                  Just describe what you want to visualize. I support bar charts, line graphs, pie charts, area plots, radar diagrams and more — all beautifully rendered.
                </p>
              </div>
            </div>

            {/* Suggestion cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl w-full">
              {SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSend(s.prompt)}
                  className="glass rounded-2xl p-4 flex items-center gap-3 text-left hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground block">{s.label}</span>
                    <span className="text-[11px] text-muted-foreground">Click to generate</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Powered by badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-[11px] text-muted-foreground"
            >
              <Zap className="w-3 h-3" />
              <span>Powered by Recharts · 6 chart types · Instant generation</span>
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">Analyzing & generating chart...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToBottom}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors shadow-lg"
          >
            <ChevronDown className="w-5 h-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 p-4 glass-strong"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-muted/40 rounded-2xl px-2 py-1.5 border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe any chart... e.g. 'Compare Q1 vs Q2 revenue as a bar chart'"
              className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
            />
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all shrink-0">
              <Mic className="w-4 h-4" />
            </button>
            <motion.button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            ChartBot AI can generate bar, line, pie, area & radar charts. Try describing your data!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
