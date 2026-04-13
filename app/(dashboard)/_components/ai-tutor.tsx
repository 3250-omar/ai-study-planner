"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static mock conversation                                           */
/* ------------------------------------------------------------------ */

const staticMessages = [
  {
    role: "ai" as const,
    content:
      "Hello! I'm your AI study assistant. How can I help you study today?",
  },
  {
    role: "user" as const,
    content: "Can you explain the concept of quantum tunneling?",
  },
  {
    role: "ai" as const,
    content:
      "Quantum tunneling is a phenomenon where a particle passes through a potential energy barrier that it classically shouldn't be able to cross.\n\nThink of it like a ball rolling towards a hill — classically, if it doesn't have enough energy, it can't get over. But in quantum mechanics, there's a non-zero probability the particle appears on the other side!\n\nThis is fundamental to many technologies including transistors and scanning tunneling microscopes.",
  },
  {
    role: "user" as const,
    content: "That's cool! Does it relate to semiconductors?",
  },
  {
    role: "ai" as const,
    content:
      "Absolutely! Quantum tunneling is essential to how semiconductors work. In transistors, electrons tunnel through thin insulating barriers. Without tunneling, modern processors simply wouldn't function. It's one of those beautiful connections between quantum theory and everyday technology.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AiTutor() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  /* Scroll to bottom when opened */
  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <>
      {/* ============================================================ */}
      {/*  Chat Panel — ALWAYS mounted, never unmounted.                */}
      {/*  State persists because the component stays in the tree.      */}
      {/* ============================================================ */}
      <motion.div
        initial={false}
        animate={
          isOpen
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                pointerEvents: "auto" as const,
              }
            : {
                opacity: 0,
                y: 20,
                scale: 0.95,
                pointerEvents: "none" as const,
              }
        }
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] flex flex-col rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/20 dark:shadow-black/40 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-card">
          <div className="flex items-center gap-3">
            <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Sparkles className="size-4" />
              {/* Online dot */}
              <div className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 ring-2 ring-card" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">
                Aura AI Tutor
              </h3>
              <p className="text-[10px] text-green-500 font-semibold uppercase tracking-wider mt-1">
                Online
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {staticMessages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {/* AI avatar */}
              {msg.role === "ai" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mr-2 mt-1">
                  <Sparkles className="size-3" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 bg-card">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full h-10 bg-muted/50 border-border/50 px-4 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  // Static — no-op for now
                  setInputValue("");
                }
              }}
            />
            <Button
              size="icon"
              className="size-10 rounded-full bg-primary text-primary-foreground shrink-0 shadow-md shadow-primary/20 hover:bg-primary/90"
            >
              <Send className="size-4" />
            </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
            Powered by AuraStudy AI
          </p>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/*  FAB – Floating Action Button                                */}
      {/* ============================================================ */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full shadow-xl transition-colors cursor-pointer",
          isOpen
            ? "bg-muted text-foreground shadow-lg"
            : "bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90"
        )}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 360 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isOpen ? <X className="size-6" /> : <Bot className="size-6" />}
        </motion.div>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
}
