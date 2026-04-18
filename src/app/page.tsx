import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { TypingHeadline } from "@/components/hero/TypingHeadline";
import { FloatingBadge } from "@/components/hero/FloatingBadge";
import { NarrativeTimeline } from "@/components/about/NarrativeTimeline";
import { SkillRadar } from "@/components/expertise/SkillRadar";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <HeroCanvas />
        <FloatingBadge />
        
        <div className="z-10 flex flex-col items-center gap-12 mt-16">
          <TypingHeadline />
          
          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[4000ms] fill-mode-backwards">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all">
              Explore the magic <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-medium border-white/20 hover:bg-white/5 backdrop-blur-sm">
              <Mail className="mr-2 w-5 h-5" /> Let&apos;s build something legendary
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-muted-foreground/50">
          <span className="text-sm uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full py-32 relative z-10 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">My Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From writing my first line of code to architecting planetary-scale systems.</p>
          </div>
          <NarrativeTimeline />
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="min-h-screen w-full py-32 relative z-10 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SkillRadar />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full py-32 bg-background relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Selected Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Case studies of solutions that moved the needle.</p>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="min-h-screen w-full py-32 relative z-10 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Insights</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Thoughts, tutorials, and deep dives into modern web development and architecture.</p>
            </div>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              View all articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <InsightsGrid />
        </div>
      </section>
      
      {/* Contact Scaffold */}
      <section id="contact" className="min-h-[50vh] w-full py-32 bg-background relative z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary">Connect</h2>
        </div>
      </section>
    </main>
  );
}
