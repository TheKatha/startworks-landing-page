import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Terminal, Layers, Sparkles } from 'lucide-react';
import { productsContent } from '../src/data/products/data';

// Helper component to render Logo or Fallback Icon with high compatibility
const LogoOrIcon = ({ product, isActive, className }) => {
  const Icon = product.icon || Layers;
  const [imgError, setImgError] = useState(false);

  if (product.logo && !imgError) {
    return (
      <div className="h-full w-full flex items-center justify-center p-1 bg-white dark:bg-slate-900 rounded-lg border border-border/40 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}${product.logo}`}
          alt={`${product.title} logo`}
          onError={() => setImgError(true)}
          className={`h-full w-full object-contain ${
            product.id === 'gxp-regulatory' || product.id === 'gxp' ? 'scale-[1.35]' : ''
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`h-full w-full rounded-lg flex items-center justify-center transition-all duration-300 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
    }`}>
      <Icon className={className} />
    </div>
  );
};

export const Equibudx = () => {
  const navigate = useNavigate();
  const products = Object.values(productsContent);
  const [activeId, setActiveId] = useState(products[0]?.id || 'qreceipts');
  
  const activeProduct = productsContent[activeId] || products[0];

  return (
    <section id="equibudx" className="py-20 lg:py-32 bg-slate-50 dark:bg-[#030712] relative overflow-hidden">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-6">
            <Terminal className="h-3.5 w-3.5" />
            <span>Product & Client Ecosystem</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Portfolio Console
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            An interactive showcase of our flagship systems, enterprise solutions, and core product engineering.
          </p>
        </div>

        {/* Dynamic Split-Pane Cockpit */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Product Navigation Panel */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Mobile horizontal scroll container */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x">
              {products.map((product) => {
                const isActive = product.id === activeId;
                
                return (
                  <button
                    key={product.id}
                    onClick={() => setActiveId(product.id)}
                    className={`w-72 lg:w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 flex-shrink-0 snap-center relative ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-blue-600/40 dark:border-blue-500/40 shadow-md shadow-blue-500/5'
                        : 'bg-white/40 dark:bg-slate-900/30 border-border/40 hover:border-border/80 hover:bg-white dark:hover:bg-slate-900/50'
                    }`}
                  >
                    {/* Left active line indicator */}
                    <div className={`hidden lg:block absolute left-0 top-0 bottom-0 w-1 rounded-r-md bg-blue-600 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                    }`} />
                    
                    {/* Logo/Icon Container */}
                    <div className="h-10 w-10 flex-shrink-0">
                      <LogoOrIcon product={product} isActive={isActive} className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm tracking-tight truncate text-foreground">
                          {product.title}
                        </span>
                        {product.stats?.type && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border bg-muted/50 border-border/30 text-muted-foreground shrink-0 animate-in fade-in">
                            {product.stats.type}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Console Details Showcase */}
          <div className="lg:col-span-8">
            <div className="relative h-full flex flex-col justify-between p-6 md:p-10 rounded-2xl border border-border/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl transition-all duration-500">
              
              {/* Outer decorative accents */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Sparkles className="h-24 w-24 text-blue-600" />
              </div>

              <div className="space-y-8">
                {/* Header detail */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/40">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 flex-shrink-0">
                      <LogoOrIcon product={activeProduct} isActive={true} className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        {activeProduct.title}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {activeProduct.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Metadata display */}
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.stats && Object.entries(activeProduct.stats).slice(0, 2).map(([key, val]) => (
                      <div key={key} className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 border border-border/40 rounded-md text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        {key}: <span className="text-foreground">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description & Overview */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Overview</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Features & Architecture Grid */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Core Architecture</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {activeProduct.pillars.slice(0, 2).map((pillar, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border/50 bg-background/50 flex gap-3 items-start hover:border-blue-600/30 transition-colors">
                        <span className="flex h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-foreground block">
                            {pillar.title}
                          </span>
                          <p className="text-xs text-muted-foreground leading-normal">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="pt-8 mt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Engine Operational</span>
                </div>
                
                <Button
                  onClick={() => navigate(`/product/${activeProduct.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 group shadow-md shadow-blue-500/10"
                >
                  <span>Explore Deep Dive Specs</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
