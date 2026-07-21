import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { TypingHeadline } from "@/components/hero/TypingHeadline";
import { FloatingBadge } from "@/components/hero/FloatingBadge";
import { NarrativeTimeline } from "@/components/about/NarrativeTimeline";
import { ProfileCard } from "@/components/about/ProfileCard";
import { AchievementGrid } from "@/components/about/AchievementGrid";
import { SkillRadar } from "@/components/expertise/SkillRadar";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { ScrollCanvas } from "@/components/layout/ScrollCanvas";

import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/layout/SectionReveal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <ScrollCanvas />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen w-full relative flex items-center justify-center overflow-hidden z-10">
        <HeroCanvas />
        <FloatingBadge />
        
        <div className="z-10 flex flex-col items-center gap-24 mt-48 px-4">
          <TypingHeadline />
          
          <div className="flex flex-col sm:flex-row gap-8 mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[2000ms] fill-mode-backwards relative z-20">
            <Link 
              href="/#about" 
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-full px-12 py-8 text-xl font-bold shadow-[0_0_30px_rgba(74,127,181,0.3)] transition-all w-full sm:w-auto flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Explore the magic <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link 
              href="/#contact" 
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-12 py-8 text-xl font-bold border-primary/20 hover:bg-primary/10 backdrop-blur-md w-full sm:w-auto flex items-center justify-center"
              )}
            >
              <Mail className="mr-3 w-6 h-6" /> Let&apos;s build legendary
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce text-muted-foreground/40">
          <span className="text-[10px] uppercase tracking-[0.5em] font-mono">Commence Journey</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary/40 to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full pt-32 pb-40 relative z-10 bg-background/10 overflow-hidden">
        <SectionReveal>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="glass-card inline-block px-10 py-10 md:px-16 md:py-12 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300 tracking-tighter drop-shadow-sm">THE JOURNEY</h2>
                <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-wide italic drop-shadow-sm">Tracing the evolution of a system architect.</p>
              </div>
            </div>

            <div className="mb-32">
              <ProfileCard />
            </div>

            <NarrativeTimeline />

            <div className="mt-20">
              <AchievementGrid />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="min-h-screen w-full py-32 relative z-10 bg-background/10 overflow-hidden">
        <SectionReveal>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="glass-card inline-block px-10 py-10 md:px-16 md:py-12 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300 tracking-tighter drop-shadow-sm">CAPABILITIES</h2>
                <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-wide italic drop-shadow-sm">Technical mastery at the intersection of power and precision.</p>
              </div>
            </div>
            <SkillRadar />
          </div>
        </SectionReveal>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full py-32 bg-background/10 relative z-10 overflow-hidden">
        <SectionReveal>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="glass-card inline-block px-10 py-10 md:px-16 md:py-12 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300 tracking-tighter drop-shadow-sm">SELECTED WORKS</h2>
                <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-wide italic drop-shadow-sm">Case studies of solutions that moved the needle.</p>
              </div>
            </div>
            <ProjectGrid />
          </div>
        </SectionReveal>
      </section>

      {/* Insights Section */}
      <section id="insights" className="min-h-screen w-full py-32 relative z-10 bg-background/10 overflow-hidden">
        <SectionReveal>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
              <div className="glass-card p-10 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65 flex-1">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300 tracking-tighter drop-shadow-sm">INSIGHTS</h2>
                <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl max-w-xl font-medium leading-relaxed tracking-wide italic drop-shadow-sm">Architectural deep dives and technological observations.</p>
              </div>
              <Button variant="outline" className="border-border hover:bg-primary/10 rounded-full px-12 py-8 font-bold uppercase tracking-widest text-xs transition-all opacity-80 hover:opacity-100">
                Access Archive <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </div>
            <InsightsGrid />
          </div>
        </SectionReveal>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full py-32 bg-background/10 relative z-10 overflow-hidden">
        <SectionReveal>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="glass-card inline-block px-10 py-10 md:px-16 md:py-12 rounded-[2.5rem] border border-white/50 dark:border-sky-300/20 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-[#0C1222]/65">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-sky-100 dark:to-slate-300 tracking-tighter drop-shadow-sm">CONNECT</h2>
                <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-wide italic drop-shadow-sm">Ready to engineer the next frontier?</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </SectionReveal>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-border bg-background/20 z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">© 2026 Solution Builder. Built with Next.js 15 & Celestial Vision.</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="/#expertise" className="hover:text-primary transition-colors">Expertise</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
