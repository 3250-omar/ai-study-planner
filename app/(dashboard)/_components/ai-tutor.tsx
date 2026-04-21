"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Files, Check, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat, Message } from "ai/react";

import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { useAiTutorModal } from "@/store/use-ai-tutor-modal";
import { getDocumentsAction } from "../_api/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function AiTutor() {
  const { isOpen, closeModal, toggleModal } = useAiTutorModal();
  const [selectedDocId, setSelectedDocId] = React.useState<string | null>(null);
  const [documents, setDocuments] = React.useState<{ id: string; title: string }[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
    useChat({
      body: {
        documentId: selectedDocId,
      },
      initialMessages: [
        {
          id: "sys-welcome",
          role: "assistant",
          content:
            "Hello! I'm AuraStudy AI. I'll help you dive deep into your materials. What are we studying today?",
        },
      ],
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error(
          error.message ||
            "Failed to get a response from the AI. Check your API key.",
        );
      },
    });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      getDocumentsAction().then(setDocuments);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const selectedDoc = documents.find((d) => d.id === selectedDocId);

  const clearGrounding = () => {
    setSelectedDocId(null);
    toast.info("Grounding cleared. Chatting generally now.");
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" }
        }
        className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[600px] flex flex-col rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-card relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Sparkles className="size-4" />
              <div className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 ring-2 ring-card" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">Aura AI Tutor</h3>
              <p className="text-[10px] text-green-500 font-semibold uppercase tracking-wider mt-1">
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Document Selector for Grounding */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-8 rounded-full transition-colors",
                    selectedDocId ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Files className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px] rounded-xl shadow-xl border-border/50">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Select Grounding Source
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={clearGrounding}
                  className="flex items-center justify-between"
                >
                  <span>General Knowledge</span>
                  {!selectedDocId && <Check className="size-3 text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="max-h-[200px] overflow-y-auto">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <DropdownMenuItem
                        key={doc.id}
                        onClick={() => {
                          setSelectedDocId(doc.id);
                          toast.success(`Grounded in: ${doc.title}`);
                        }}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate pr-4">{doc.title}</span>
                        {selectedDocId === doc.id && <Check className="size-3 text-primary" />}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="px-2 py-3 text-center text-xs text-muted-foreground">
                      No documents in library
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={closeModal}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Grounding Indicator Bar */}
        <AnimatePresence>
          {selectedDocId && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 py-2 bg-primary/5 border-b border-primary/10 flex items-center justify-between overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <Target className="size-3 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider truncate max-w-[200px]">
                  Grounded: {selectedDoc?.title}
                </span>
              </div>
              <button 
                onClick={clearGrounding}
                className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                CLEAR
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-card to-muted/10">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role !== "user" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mr-2 mt-1 shadow-inner">
                  <Sparkles className="size-3" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted/80 backdrop-blur-sm text-foreground rounded-bl-none border border-border/50",
                )}
              >
                <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mr-2 mt-1">
                <Sparkles className="size-3 animate-pulse" />
              </div>
              <div className="rounded-2xl bg-muted/80 px-4 py-3 text-sm flex items-center gap-1 rounded-bl-none border border-border/50">
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 bg-card pb-6">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={selectedDocId ? `Ask about ${selectedDoc?.title}...` : "Ask me anything..."}
              className="flex-1 rounded-xl h-11 bg-muted/50 border-border/50 px-4 text-sm focus-visible:ring-primary/20 transition-all"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="size-11 rounded-xl bg-primary text-primary-foreground shrink-0 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="size-4" />
            </Button>
          </form>
          <div className="mt-3 flex items-center justify-center gap-1">
             <span className="size-1 rounded-full bg-primary/30" />
             <p className="text-[10px] text-muted-foreground/60 font-medium">
               Aura AI grounding version 1.2
             </p>
             <span className="size-1 rounded-full bg-primary/30" />
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={toggleModal}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full shadow-2xl transition-all cursor-pointer",
          isOpen
            ? "bg-muted text-foreground translate-y-[-10px]"
            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110",
        )}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 360 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isOpen ? <X className="size-6" /> : <Bot className="size-6" />}
        </motion.div>
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
}
