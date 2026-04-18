import { projectsData, Project } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Code, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; // revalidate every hour

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Try fetching from Supabase
  const { data: projectFromDB } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  const project = (projectFromDB as Project) || projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Immersive Header */}
      <section className={`relative w-full h-[60vh] bg-gradient-to-br ${project.gradient} flex items-end pb-16 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#projects" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selected Works
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-medium">
                {project.tagline}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                <Code className="w-4 h-4 mr-2" /> Source Code
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">The Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Modern applications require a seamless blend of performance, aesthetics, and scalable architecture. 
                For the {project.title}, the primary objective was to push the boundaries of what's possible in the browser, 
                creating an experience that feels closer to a native cinematic application than a standard web page. 
                Users demanded zero-latency interactions while maintaining high visual fidelity.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-secondary">The Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By leveraging a modern tech stack consisting of {project.tech.join(", ")}, we architected a solution 
                that separates heavy computational tasks from the main UI thread. We implemented aggressive caching strategies, 
                edge rendering, and custom WebGL shaders to deliver a buttery-smooth 60fps experience across all devices.
              </p>
            </div>
            
            {/* Embedded Live Demo Placeholder */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Live Interaction</h2>
              <div className="w-full aspect-video rounded-xl border border-white/10 bg-black overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15),transparent)]" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium">Interactive Demo Environment</p>
                  <p className="text-sm text-muted-foreground mt-2">Click to initialize WebGL context</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 rounded-2xl bg-muted/20 border border-white/5">
              <h3 className="text-xl font-bold mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm font-medium text-white/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-primary">Key Impact Metrics</h3>
              <ul className="space-y-4">
                {project.metrics.map(m => (
                  <li key={m} className="flex items-center text-lg font-medium">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-secondary" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 rounded-2xl bg-muted/20 border border-white/5 relative overflow-hidden">
              <div className="text-6xl text-primary/20 absolute top-4 left-4 font-serif">&quot;</div>
              <p className="relative z-10 text-lg italic text-muted-foreground mb-6 pt-4">
                This changed everything for our team. The latency is practically zero, and the interface is stunning.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <p className="font-bold text-sm">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">CTO, Client Corp</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
