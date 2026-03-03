import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { ChartDisplay } from "./ChartDisplay";
import type { ChartConfig } from "@/lib/chartBot";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  chart?: ChartConfig;
}

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-1">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      <div className={`max-w-[85%] lg:max-w-[70%] ${isBot ? "" : "order-first"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? "glass text-foreground"
              : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
          }`}
        >
          {message.content}
        </div>

        {message.chart && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-3"
          >
            <ChartDisplay config={message.chart} />
          </motion.div>
        )}
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </motion.div>
  );
}
