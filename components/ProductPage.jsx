import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle2, Star, Layers, FolderGit2, Terminal, ShieldAlert, Cpu, Heart, Sparkles, Activity } from 'lucide-react';
import { productsContent } from '../src/data/products/data';
import { Button } from './ui/button';

// Helper component to render Logo or Fallback Icon with high compatibility
const LogoOrIcon = ({ product, className }) => {
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
            product.id === 'gxp' || product.id === 'gxp-regulatory' ? 'scale-[1.35]' : ''
          }`}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
      <Icon className={className} />
    </div>
  );
};

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsContent[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The product or project you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  // Custom visual components based on the product
  const renderCustomVisual = () => {
    // 1. SPORTISTA: System Architecture Dashboard
    if (product.id === 'sportista') {
      return (
        <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 md:p-8 font-mono border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Cpu className="h-32 w-32" />
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-blue-400" />
              sportista-system-architecture
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Go / Dart Dual Stack
            </span>
          </div>
          
          <div className="space-y-4 text-xs md:text-sm pt-6 text-slate-350">
            <div className="space-y-3">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-bold block">Real-Time Sync Engine</span>
                  <span className="text-slate-400 text-[10px]">Go WebSocket Gateway / 1.5ms Latency</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ONLINE</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-bold block">Ecosystem Core API</span>
                  <span className="text-slate-400 text-[10px]">Dart Auth & Drafting Pipeline Coordinator</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ONLINE</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-bold block">Statistics Ingestion Engine</span>
                  <span className="text-slate-400 text-[10px]">Go Parser Worker & Real-time Feeds Aggregator</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ONLINE</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-bold block">Mobile Gaming Client</span>
                  <span className="text-slate-400 text-[10px]">Flutter Cross-Platform Player Console</span>
                </div>
                <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">STABLE</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. QRECEIPTS: Compliance scanning simulation
    if (product.id === 'qreceipts') {
      return (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-blue-400 font-bold">ComplyIQ OCR Pipeline</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>ACTIVE</span>
          </div>
          <div className="space-y-2">
            <p className="text-slate-500">&gt; INGESTING TRANSACTION RECEIPT...</p>
            <p className="text-slate-400">&gt; OCR ENGINE RUNNING TEXT EXTRACTION...</p>
            <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[10px] space-y-1">
              <p className="text-emerald-400">✔ Merchant: ComplyIQ GCC</p>
              <p className="text-emerald-400">✔ Tax Code: AE-VAT-15</p>
              <p className="text-emerald-400">✔ Subtotal: 120.00 AED</p>
              <p className="text-emerald-400">✔ VAT (5%): 6.00 AED</p>
            </div>
            <p className="text-blue-400">&gt; SYNCING REAL-TIME COMPLIANCE AUDIT SCHEMA...</p>
            <p className="text-emerald-500 font-bold">&gt; ERP REPORTING INTEGRATED [OK]</p>
          </div>
        </div>
      );
    }

    // 3. EQUIBUDX: Coach Discovery & Payout Settlement Console
    if (product.id === 'equibudx') {
      return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-200 font-mono text-xs shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-blue-400 font-bold flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-blue-400" />
              Coach Discovery & Payout Ledger
            </span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500">Coaches Onboarded:</span>
                <span className="text-slate-250 font-bold">142 Active Listings</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500">Booking Slots Explored:</span>
                <span className="text-slate-250 font-bold">1,820 slots/week</span>
              </div>
              <div className="flex justify-between items-center text-[10px] border-t border-slate-900 pt-1.5">
                <span className="text-slate-500">Identity Checks (PAN/Bank):</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
            </div>

            <div className="border border-slate-800 rounded-lg bg-slate-900/20 overflow-hidden text-[9px]">
              <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 text-slate-400 flex justify-between">
                <span>TXN REF</span>
                <span>COACH ID</span>
                <span>STATUS / TDS</span>
              </div>
              <div className="p-3 space-y-2 text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-mono">TXN-88022</span>
                  <span>COACH-104</span>
                  <span className="text-emerald-400 font-bold">SUCCESS (-10% TDS)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-mono">TXN-88023</span>
                  <span>COACH-092</span>
                  <span className="text-emerald-400 font-bold">SUCCESS (-10% TDS)</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-mono">TXN-88024</span>
                  <span>COACH-221</span>
                  <span>SETTLING...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. SAMARS: AI Municipal Ingestion & Prioritization Dashboard
    if (product.id === 'samars') {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative max-w-[280px] mx-auto overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full" />
          <div className="border border-slate-800 rounded-xl bg-slate-950 p-4 mt-6 space-y-4 font-mono text-[10px] text-slate-350">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-blue-400">Grievance ingestion</span>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">RESOLVED</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">Pincode:</span>
                <span className="text-slate-200">560001</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">Constituency:</span>
                <span className="text-blue-400">Bangalore Central</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">AI Severity:</span>
                <span className="text-red-400 font-bold">Severe (92/100)</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">AI Urgency:</span>
                <span className="text-amber-400 font-bold">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">AutoML priority:</span>
                <span className="text-emerald-400 font-semibold">Priority Rank #3</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. GXP: Validation checklist monitor
    if (product.id === 'gxp') {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-blue-400 font-bold">21 CFR Part 11 Auditor</span>
            <span className="text-emerald-400 font-bold">VALIDATED</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>1. Immutable Audit Trail</span>
              <span className="text-emerald-500 font-bold">✓ SECURE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2. Electronic Signatures</span>
              <span className="text-emerald-500 font-bold">✓ VALID</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3. Deviations Control</span>
              <span className="text-emerald-500 font-bold">✓ ENFORCED</span>
            </div>
            <div className="flex items-center justify-between">
              <span>4. Data Encryption</span>
              <span className="text-emerald-500 font-bold">✓ AES-256</span>
            </div>
          </div>
        </div>
      );
    }

    // 6. ALMAM: Connection Node visualizer
    if (product.id === 'almam') {
      return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 relative overflow-hidden h-48 flex items-center justify-center">
          <div className="absolute top-2 right-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">AlmaM Match Engine</div>
          
          <div className="flex justify-between items-center w-full max-w-sm relative z-10 font-mono text-[10px]">
            {/* Startup node */}
            <div className="p-3 bg-blue-600/20 border border-blue-500 rounded-xl text-center">
              <span className="text-blue-400 font-bold block">STARTUP</span>
              <span className="text-slate-400 text-[8px]">SaaS / AI</span>
            </div>

            {/* Connecting pulses */}
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 relative mx-3">
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-1.5 w-1.5 bg-white rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 border px-1.5 py-0.5 rounded text-[8px] text-indigo-400">
                98% Match
              </div>
            </div>

            {/* Investor node */}
            <div className="p-3 bg-emerald-600/20 border border-emerald-500 rounded-xl text-center">
              <span className="text-emerald-400 font-bold block">INVESTOR</span>
              <span className="text-slate-400 text-[8px]">Seed / Series A</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. BATTALU: Laundry order preview cards
    if (product.id === 'battalu') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-white/80 dark:bg-slate-900/60 shadow-sm space-y-3 font-mono text-[10px]">
            <div className="h-20 bg-blue-500/10 rounded-lg flex flex-col items-center justify-center text-blue-600 font-bold p-2 text-center">
              <span className="text-xs">Wash & Fold</span>
              <span className="text-[9px] font-normal opacity-85">Order #1024</span>
            </div>
            <div>
              <span className="text-[8px] uppercase font-bold text-slate-500 block">Status</span>
              <span className="font-bold text-amber-500 animate-pulse">Washing...</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-white/80 dark:bg-slate-900/60 shadow-sm space-y-3 font-mono text-[10px]">
            <div className="h-20 bg-emerald-500/10 rounded-lg flex flex-col items-center justify-center text-emerald-600 font-bold p-2 text-center">
              <span className="text-xs">Dry Clean Saree</span>
              <span className="text-[9px] font-normal opacity-85">Order #1025</span>
            </div>
            <div>
              <span className="text-[8px] uppercase font-bold text-slate-500 block">Status</span>
              <span className="font-bold text-emerald-500">Out for Delivery</span>
            </div>
          </div>
        </div>
      );
    }

    // Default visual: Premium gradient glass frame
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl transform rotate-2 blur-sm" />
        <div className="relative bg-background/80 backdrop-blur-xl border border-border p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 flex-shrink-0">
              <LogoOrIcon product={product} className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-muted-foreground border px-2.5 py-1 rounded-full uppercase tracking-widest bg-muted/30">
              Details
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {product.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-foreground font-sans animate-in fade-in duration-300 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Hero Header Area */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate('/products')}>Products</span>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>

          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Title / Description info */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Logo Rendered Above Title */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0">
                  <LogoOrIcon product={product} className="h-8 w-8" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-xs font-semibold text-blue-700 dark:text-blue-300">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>Engineered Artifact</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                {product.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                {product.tagline}
              </p>
            </div>

            {/* Custom Visual Column */}
            <div className="lg:col-span-5">
              {renderCustomVisual()}
            </div>

          </div>
        </div>
      </section>

      {/* Section 1 & 2: Product Information & Product Idea */}
      <section className="py-16 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Product Information */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">
                Product Information
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              {product.about && (
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  {product.about}
                </p>
              )}
            </div>

            {/* Product Idea */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400">
                Product Idea
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic bg-white dark:bg-slate-900/40 border border-border/50 rounded-2xl p-6 shadow-sm">
                "{product.idea || 'Conceived to bridge the gaps in current technology solutions by designing scalable architectures tailored for end-user efficiency.'}"
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Tech Stack */}
      {product.techStack && (
        <section className="py-16 border-b border-border/40 bg-white/40 dark:bg-slate-900/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">Tech Stack</h2>
              <p className="text-sm text-muted-foreground mt-1">The advanced toolsets and frameworks deployed for this platform.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 shadow-sm transition-all duration-300 hover:scale-105">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Key Performance Metrics Dashboard */}
      {product.metrics && (
        <section className="py-16 border-b border-border/40">
          <div className="container mx-auto px-4 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.metrics.map((metric, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <span className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 block mb-1">
                    {metric.value}
                    <span className="text-sm font-medium text-muted-foreground ml-1">{metric.unit}</span>
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: How We Approached Solution */}
      <section className="py-20 bg-white/40 dark:bg-slate-900/10 relative border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">How We Approached Solution</h2>
            <p className="text-sm text-muted-foreground mt-1">Our engineering methodology and core tactical pillars.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {product.pillars.map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border/50 bg-white dark:bg-slate-900/40 hover:border-blue-600/30 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Benefits</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                How this implementation delivers value, removes structural bottlenecks, and optimizes operations.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 w-full">
              {product.whyUs.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-border/40 bg-white/50 dark:bg-slate-900/20 flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 border-t border-border/40 bg-slate-100/50 dark:bg-slate-950/20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Interested in similar integrations?</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Consult with our engineering and advisory leads to architect and build custom software frameworks.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Schedule a Consultation
          </Button>
        </div>
      </section>

    </div>
  );
};
