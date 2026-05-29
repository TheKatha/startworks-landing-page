import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { caseStudiesContent } from '../src/data/resourcesData';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Compass } from 'lucide-react';
import { Button } from './ui/button';

export const CaseStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cs = caseStudiesContent[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!cs) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  // Find other case studies
  const otherCases = Object.keys(caseStudiesContent)
    .filter(csId => csId !== id)
    .slice(0, 2);

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 animate-in fade-in duration-300">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {cs.title}
          </h1>
        </div>

        {/* Intro */}
        <div className="p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/50 mb-12">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
            {cs.intro}
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12 mb-16">
          {/* Challenges */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-rose-500" /> Key Challenges
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {cs.challenges.map((c, i) => (
                <div key={i} className="p-5 bg-card border border-border/60 rounded-xl shadow-sm space-y-2">
                  <span className="font-extrabold text-base text-foreground block">{c.title}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Compass className="h-6 w-6 text-blue-600" /> Our Strategic Approach
            </h3>
            <div className="border border-border/60 rounded-2xl bg-card p-6 md:p-8 space-y-4 shadow-sm">
              {cs.approach.map((a, i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm">
                    {i + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-base text-foreground">{a.title}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-500" /> Results Achieved
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {cs.results.map((r, i) => {
                const parts = r.split(':');
                const metricTitle = parts[0];
                const metricText = parts[1] || '';
                return (
                  <div key={i} className="p-6 bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-xl flex flex-col justify-between">
                    <span className="font-bold text-base text-emerald-600 dark:text-emerald-400 block mb-2">
                      {metricTitle}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{metricText.trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl mb-16 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-extrabold">Ready to achieve similar success?</h3>
          <p className="max-w-xl mx-auto text-sm text-blue-100 leading-relaxed">
            Let's collaborate to solve your technical and business bottlenecks using modern AI and cloud engineering architectures.
          </p>
          <div className="pt-2">
            <Button 
              variant="secondary"
              size="lg" 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#contact');
                }
              }}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Other Case Studies */}
        <div className="border-t pt-12 space-y-6">
          <h3 className="text-2xl font-bold">More Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherCases.map(csId => {
              const item = caseStudiesContent[csId];
              return (
                <Link 
                  key={csId}
                  to={`/case-study/${csId}`}
                  className="block p-6 rounded-xl border bg-card hover:border-blue-600/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <span className="text-xs text-muted-foreground">Case Study-{csId}</span>
                    <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1">
                      View Case Study <ArrowLeft className="h-3 w-3 rotate-180 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
