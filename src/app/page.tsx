import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { TypingHeadline } from "@/components/hero/TypingHeadline";
import { FloatingBadge } from "@/components/hero/FloatingBadge";
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

      {/* Other sections scaffold */}
      <section id="about" className="min-h-screen w-full py-20 relative z-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">About Me</h2>
        </div>
      </section>

      <section id="projects" className="min-h-screen w-full py-20 bg-muted/20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">Case Studies</h2>
        </div>
      </section>

      <section id="expertise" className="min-h-screen w-full py-20 relative z-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">Expertise</h2>
        </div>
      </section>
      
      <section id="contact" className="min-h-[50vh] w-full py-20 bg-muted/20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">Connect</h2>
        </div>
      </section>
    </main>
  );
}
