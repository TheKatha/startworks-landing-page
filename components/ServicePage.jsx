import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { servicesContent } from '../src/data/servicesData';
import { Button } from './ui/button';

export const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesContent[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <p className="text-muted-foreground mb-8">The service you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const ActiveIcon = service.icon;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* 1. Tech & Modern Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 border-b border-border/40">
        {/* Subtle Tech Gradients */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[120px]" />
          <div className="absolute top-[20%] left-[-10%] w-[30%] h-[40%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm text-muted-foreground mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <button onClick={() => navigate('/services')} className="hover:text-blue-600 transition-colors">Services</button>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <span className="text-foreground font-medium">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
                <Zap className="h-4 w-4" />
                <span>Enterprise Solution</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {service.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {service.subtitle}
              </p>

              <div className="flex gap-4">
                <Button size="lg" onClick={() => navigate('/contact')} className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6">
                  Schedule Consultation <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Overview Card */}
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl transform rotate-3 blur-sm" />
              <div className="relative bg-background/80 backdrop-blur-xl border border-border p-8 rounded-2xl shadow-xl">
                <ActiveIcon className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-lg text-muted-foreground">Comprehensive features designed to drive immediate impact.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Business Benefits */}
      <section className="py-24 bg-background border-y border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Business Benefits</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We don't just deliver technology; we deliver measurable business outcomes. Here's what you can expect when you implement {service.title.toLowerCase()}.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-border/50">
                  <h4 className="font-semibold text-lg mb-2 text-foreground">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Execution Process */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Methodology</h2>
            <p className="text-lg text-muted-foreground">A proven, risk-mitigated approach to bringing this solution to production.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="relative flex flex-col">
                <div className="text-5xl font-black text-blue-100 dark:text-blue-900/40 mb-4 tracking-tighter">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
                {/* Connector line for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-20 w-[calc(100%-2rem)] h-px bg-border border-dashed border-t-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 bg-background relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-600/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's discuss how {service.title} can be customized to solve your specific business challenges.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')} className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-blue-600/20">
            Talk to an Expert
          </Button>
        </div>
      </section>

    </div>
  );
};
