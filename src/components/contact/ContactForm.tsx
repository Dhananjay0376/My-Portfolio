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
        className="text-center py-20 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-3xl"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50">
          <Send className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Solution Request Received</h3>
        <p className="text-muted-foreground text-lg">Your signal has been captured. Expect a response within one galactic rotation.</p>
        <Button 
          variant="outline" 
          className="mt-8 border-white/10"
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
        <div>
          <h3 className="text-3xl font-bold mb-4">Let&apos;s build something legendary.</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you have a vision for a complex real-time system, an AI-powered pipeline, 
            or a high-conversion e-commerce platform, I&apos;m ready to architect the solution.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Connect with me</p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.link}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20">
          <p className="text-sm text-secondary font-bold mb-2">Current Availability</p>
          <p className="text-white/80">Accepting high-impact projects for Q3 2026.</p>
        </div>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6 p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Your Name</label>
            <Input 
              required
              placeholder="Elon Musk" 
              className="bg-white/5 border-white/10 focus:border-primary transition-all h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Email Address</label>
            <Input 
              required
              type="email"
              placeholder="elon@spacex.com" 
              className="bg-white/5 border-white/10 focus:border-primary transition-all h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium ml-1">Subject</label>
          <Input 
            required
            placeholder="Planetary scale web-app proposal" 
            className="bg-white/5 border-white/10 focus:border-primary transition-all h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium ml-1">Project Details</label>
          <Textarea 
            required
            placeholder="Tell me about the magic you want to build..." 
            className="bg-white/5 border-white/10 focus:border-primary transition-all min-h-[150px] rounded-xl"
          />
        </div>

        <Button 
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
        >
          {isSubmitting ? "Transmitting..." : "Submit Solution Request"}
        </Button>
      </motion.form>
    </div>
  );
}
