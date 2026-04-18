"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Terminal, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BotAvatar } from "./BotAvatar";
import { cn } from "@/lib/utils";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

const SUGGESTED_QUESTIONS = [
  "What is your core tech stack?",
  "Tell me about your e-commerce experience.",
  "How do you handle system architecture?",
  "What moved the needle in your last project?",
];

export function AskSolutionBuilder() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [latency, setLatency] = useState(12);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  // Simulate network jitter for the aesthetic
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent, text?: string) => {
    if (e) e.preventDefault();
    const finalContent = text || inputValue;
    if (!finalContent.trim() || isLoading) return;
    sendMessage({ text: finalContent.trim() });
    setInputValue("");
  };

  return (
    <>
      <BotAvatar onClick={() => setIsOpen(true)} />

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200]"
            />
            
            <motion.div
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] md:w-[450px] glass-card z-[201] flex flex-col rounded-[2.5rem] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative Scanlines & Grain */}
              <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
              <div className="absolute inset-0 bg-circuitry pointer-events-none" />
              
              {/* Header: Tech Readout Style */}
              <div className="p-8 border-b border-white/5 relative bg-white/[0.02]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/30 relative overflow-hidden group">
                        <Bot className="w-7 h-7 text-primary relative z-10" />
                        <motion.div 
                          className="absolute inset-0 bg-primary/20"
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tighter text-white uppercase leading-none">Solution<br/>Architect</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Core Interface</span>
                        <div className="h-[2px] w-8 bg-primary/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl hover:bg-white/5 w-12 h-12">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* System Stats Bar */}
                <div className="flex gap-4">
                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                    <Zap className="w-3 h-3 text-secondary" />
                    <span>LATENCY: {latency}ms</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    <span>SECURE_LINK: YES</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {messages.length === 0 && (
                  <div className="space-y-8 mt-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Initialization Complete</span>
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter text-white leading-[1.1]">HOW CAN WE<br/>ENGINEER TODAY?</h2>
                      <p className="text-muted-foreground/60 text-sm font-light leading-relaxed max-w-[280px]">
                        Query the system regarding architectural expertise, stack optimization, or portfolio case studies.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSubmit(undefined, q)}
                          className="text-left px-5 py-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Terminal className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">{q}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, idx) => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx === messages.length - 1 ? 0 : 0 }}
                    className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-3 px-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40">
                        {m.role === 'user' ? 'Authorized_User' : 'Architect_AI'}
                      </span>
                      <div className={cn("w-1 h-1 rounded-full", m.role === 'user' ? 'bg-secondary' : 'bg-primary')} />
                    </div>

                    <div className={cn(
                      "p-5 rounded-[1.5rem] max-w-[90%] text-sm leading-relaxed relative overflow-hidden",
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none shadow-[0_10px_30px_rgba(0,240,255,0.15)] font-medium' 
                        : 'bg-white/5 border border-white/5 rounded-tl-none text-foreground'
                    )}>
                      {m.role !== 'user' && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                      )}
                      {getMessageText(m)}
                    </div>
                  </motion.div>
                ))}

                {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                  <div className="flex flex-col gap-2 items-start">
                    <div className="flex items-center gap-3 px-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40">Processing</span>
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 rounded-tl-none flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area: Terminal Style */}
              <div className="p-8 bg-white/[0.02] border-t border-white/5">
                <form onSubmit={handleSubmit} className="flex items-center gap-3 relative">
                  <div className="absolute left-4 flex items-center gap-2 pointer-events-none">
                    <Terminal className="w-4 h-4 text-primary opacity-40" />
                    <span className="text-[10px] font-mono text-primary/40 font-bold">$</span>
                  </div>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="ENTER_QUERY..."
                    className="bg-white/5 border-white/10 rounded-2xl pl-12 pr-14 focus-visible:ring-primary h-14 font-mono text-xs tracking-wider"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-500 disabled:opacity-20"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <div className="mt-4 flex justify-between items-center px-2">
                  <span className="text-[8px] font-mono text-muted-foreground/20 uppercase tracking-[0.3em]">Encrypted_Stream_Active</span>
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-[2px] h-[2px] bg-primary/20 rounded-full" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
