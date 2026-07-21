"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Code, Briefcase, Link as LinkIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const socials = [
    { icon: <GithubIcon className="w-5 h-5" />, link: "https://github.com/Dhananjay0376/", label: "GitHub" },
    { icon: <LinkedinIcon className="w-5 h-5" />, link: "https://linkedin.com/in/dhananjay-narula-6519363a1/", label: "LinkedIn" },
    { icon: <XIcon className="w-5 h-5" />, link: "https://x.com/Dhananjay0376", label: "X (Twitter)" },
    { icon: <Mail className="w-5 h-5" />, link: "mailto:hello@example.com", label: "Email" },
  ];

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 glass-card bg-card/60 backdrop-blur-xl border border-primary/20 rounded-3xl"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50">
          <Send className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-foreground">Solution Request Received</h3>
        <p className="text-muted-foreground text-lg">Your signal has been captured. Expect a response within one galactic rotation.</p>
        <Button 
          variant="outline" 
          className="mt-8 border-border"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="space-y-8">
        <div className="glass-card p-8 rounded-3xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/50 border border-white/40 dark:border-sky-300/10 shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-foreground">Let&apos;s build something legendary.</h3>
          <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
            Whether you have a vision for a complex real-time system, an AI-powered pipeline, 
            or a high-conversion e-commerce platform, I&apos;m ready to architect the solution.
          </p>
        </div>

        <div className="space-y-4">
          <span className="glass-card px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-secondary border border-secondary/30 bg-secondary/10 backdrop-blur-md inline-block shadow-sm">
            Connect with me
          </span>
          <div className="flex gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.link}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass-card bg-white/50 dark:bg-[#0C1222]/60 border border-white/40 dark:border-sky-300/20 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-colors text-foreground shadow-md"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl bg-white/40 dark:bg-[#0C1222]/50 border border-secondary/30 backdrop-blur-md shadow-md">
          <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">Current Availability</p>
          <p className="text-slate-800 dark:text-slate-200 font-semibold">Accepting high-impact projects for Q3 2026.</p>
        </div>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6 p-8 md:p-10 glass-card bg-white/60 dark:bg-[#0C1222]/75 backdrop-blur-md border border-white/40 dark:border-sky-300/20 rounded-3xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="glass-card px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 border border-white/30 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md inline-block">Your Name</span>
            <Input 
              required
              placeholder="Elon Musk" 
              className="glass-card bg-white/50 dark:bg-[#0C1222]/60 border-white/30 dark:border-sky-300/10 focus:border-primary transition-all h-12 rounded-xl text-foreground"
            />
          </div>
          <div className="space-y-2">
            <span className="glass-card px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 border border-white/30 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md inline-block">Email Address</span>
            <Input 
              required
              type="email"
              placeholder="elon@spacex.com" 
              className="glass-card bg-white/50 dark:bg-[#0C1222]/60 border-white/30 dark:border-sky-300/10 focus:border-primary transition-all h-12 rounded-xl text-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="glass-card px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 border border-white/30 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md inline-block">Subject</span>
          <Input 
            required
            placeholder="Planetary scale web-app proposal" 
            className="glass-card bg-white/50 dark:bg-[#0C1222]/60 border-white/30 dark:border-sky-300/10 focus:border-primary transition-all h-12 rounded-xl text-foreground"
          />
        </div>

        <div className="space-y-2">
          <span className="glass-card px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 border border-white/30 dark:border-sky-300/10 bg-white/40 dark:bg-[#0C1222]/50 backdrop-blur-md inline-block">Project Details</span>
          <Textarea 
            required
            placeholder="Tell me about the magic you want to build..." 
            className="glass-card bg-white/50 dark:bg-[#0C1222]/60 border-white/30 dark:border-sky-300/10 focus:border-primary transition-all min-h-[150px] rounded-xl text-foreground"
          />
        </div>

        <Button 
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold shadow-[0_0_20px_rgba(74,127,181,0.3)] hover:shadow-[0_0_30px_rgba(74,127,181,0.5)] transition-all"
        >
          {isSubmitting ? "Transmitting..." : "Submit Solution Request"}
        </Button>
      </motion.form>
    </div>
  );
}
