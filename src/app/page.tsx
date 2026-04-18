import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { TypingHeadline } from "@/components/hero/TypingHeadline";
import { FloatingBadge } from "@/components/hero/FloatingBadge";
import { NarrativeTimeline } from "@/components/about/NarrativeTimeline";
import { SkillRadar } from "@/components/expertise/SkillRadar";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { Magnetic } from "@/components/ui/magnetic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <HeroCanvas />
        <FloatingBadge />
        
        <div className="z-10 flex flex-col items-center gap-12 mt-16 px-4">
          <TypingHeadline />
          
          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[4000ms] fill-mode-backwards">
            <Magnetic>
              <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all">
                Explore the magic <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-white/20 hover:bg-white/5 backdrop-blur-md">
                <Mail className="mr-2 w-5 h-5" /> Let&apos;s build something legendary
              </Button>
            </Magnetic>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-muted-foreground/30">
          <span className="text-xs uppercase tracking-[0.3em] font-mono">Initiate Descent</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full py-32 relative z-10 bg-background overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">THE JOURNEY</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">Tracing the evolution of a system architect through the digital frontier.</p>
          </div>
          <NarrativeTimeline />
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="min-h-screen w-full py-32 relative z-10 bg-black overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">CORE CAPABILITIES</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">Technical mastery at the intersection of performance and aesthetics.</p>
          </div>
          <SkillRadar />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full py-32 bg-background relative z-10 overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">SELECTED WORKS</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">Case studies of solutions that moved the needle.</p>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="min-h-screen w-full py-32 relative z-10 bg-black overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">INSIGHTS</h2>
              <p className="text-muted-foreground text-xl max-w-xl font-light leading-relaxed">Architectural deep dives and technological observations.</p>
            </div>
            <Magnetic>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 py-6 font-bold uppercase tracking-widest text-xs transition-all">
                Access Archive <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Magnetic>
          </div>
          <InsightsGrid />
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full py-32 bg-background relative z-10 overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">CONNECT</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">Ready to engineer the next frontier? Let&apos;s discuss the architecture.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5 bg-black z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">© 2026 Solution Builder. Built with Next.js 15 & Cinema.</p>
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
