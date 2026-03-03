import { motion } from "framer-motion";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ChartDisplay } from "./ChartDisplay";
import type { ChartConfig } from "@/lib/chartBot";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  chart?: ChartConfig;
  timestamp?: Date;
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  });

  return (
    <span>
      {displayed}
      {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle" />}
    </span>
  );
}

function TimeAgo({ date }: { date?: Date }) {
  if (!date) return null;
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const label = diff < 5 ? "just now" : diff < 60 ? `${diff}s ago` : `${Math.floor(diff / 60)}m ago`;
  return <span className="text-[10px] text-muted-foreground">{label}</span>;
}

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-primary/20"
        >
          <Bot className="w-5 h-5 text-primary-foreground" />
        </motion.div>
      )}

      <div className={`max-w-[85%] lg:max-w-[70%] space-y-1 ${isBot ? "" : "flex flex-col items-end"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
            isBot
              ? "glass text-foreground rounded-tl-md"
              : "bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground rounded-tr-md shadow-lg shadow-primary/20"
          }`}
        >
          {isBot ? <TypewriterText text={message.content} /> : message.content}

          {/* Copy button for bot messages */}
          {isBot && (
            <button
              onClick={handleCopy}
              className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            >
              {copied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
            </button>
          )}
        </div>

        <TimeAgo date={message.timestamp} />

        {message.chart && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mt-2 w-full"
          >
            <ChartDisplay config={message.chart} />
          </motion.div>
        )}
      </div>

      {!isBot && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shrink-0 mt-1 border border-border"
        >
          <User className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
}
