import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Cpu, Activity, Layers, Sparkles, Terminal, Users } from 'lucide-react';

export const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#030712] py-24 lg:py-36 border-b border-border/40">
      {/* Premium ambient decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(59,130,246,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Glow balls */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
            <span>Empowering businesses with smart and scalable solutions</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient">
                STARTWORKS
              </span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80 font-mono">
              STARTWORKS TECHNOLOGIES PRIVATE LIMITED
            </p>
          </div>

          {/* Subtitle description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-normal">
            From building your data foundation to scaling advanced analytics, we help organizations unlock value no matter where they are in their data journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 group shadow-lg shadow-blue-500/10 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('equibudx')}
              className="border-border/60 hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold"
            >
              <span>Explore Portfolio</span>
            </Button>
          </div>

          {/* Integrated Statistics Grid */}
          <div className="pt-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-8 rounded-2xl border border-border/50 bg-white/40 dark:bg-slate-900/20 backdrop-blur-md">
              
              <div className="space-y-2 text-center border-r border-border/30">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">14+</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">Years Partnership</div>
              </div>

              <div className="space-y-2 text-center border-r border-border/30">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">6</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">Expert Team</div>
              </div>

              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">4</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Advisors</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
