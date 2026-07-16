import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Database, LineChart, MessageSquareCode, Sparkles, Cpu, ChevronRight, ShieldCheck } from 'lucide-react';

export const Services = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    const handleSelectTab = (event) => {
      if (event.detail && event.detail.tabId) {
        setActiveTab(event.detail.tabId);
      }
    };
    window.addEventListener('select-service-tab', handleSelectTab);
    return () => window.removeEventListener('select-service-tab', handleSelectTab);
  }, []);

  const tabsContent = {
    analytics: {
      title: 'AI-Powered Data Analytics',
      subtitle: 'We turn raw data into reliable, real-time insight with cleaned pipelines, smart dashboards, and optimized reporting—so you can make decisions that drive growth.',
      icon: LineChart,
      features: [
        { title: 'Dashboard Creation', desc: 'We design intuitive BI dashboards that bring critical metrics to your fingertips, helping your team make faster, smarter decisions.' },
        { title: 'Data Preparation and Cleansing', desc: 'Our AI-powered workflows clean and prep your data, ensuring accuracy and quality before it powers any analytics.' },
        { title: 'Performance Optimization', desc: 'We fine-tune your dashboards and reports for fast refreshes—no delays—whether your data is on-premise or in the cloud.' },
        { title: 'End to End BI Analytics', desc: 'We handle the full analytics lifecycle—from data modeling and ETL to building dashboards—so you get clear, actionable insights regularly.' }
      ]
    },
    consulting: {
      title: 'AI-Consulting',
      subtitle: 'We guide you through end-to-end AI adoption—from strategy and architecture to hands-on implementation—using a flexible, data-first approach that delivers real business value.',
      icon: MessageSquareCode,
      features: [
        { title: 'Tailored AI Roadmaps', desc: 'We develop customized AI strategies and architectures that match your organization’s current maturity and long-term goals.' },
        { title: 'Data-Centric, Platform-Agnostic Expertise', desc: 'Our team applies a data-first approach without locking you into specific tools or platforms, ensuring flexibility.' },
        { title: 'Hands-on Production Ready Implementation', desc: 'Our experts don’t just advise—they build and deploy. With over 50+ AI/ML projects in production, we bring real-world delivery.' },
        { title: 'Value-Driven & Cost-Effective Model', desc: 'Through our offshore/onshore model, we offer top-tier AI talent and results at competitive pricing—delivering high ROI.' }
      ]
    },
    genai: {
      title: 'Generative AI',
      subtitle: 'Bring your ideas to life using cutting-edge AI/ML models that enhance creativity, automation, and user engagement.',
      icon: Sparkles,
      features: [
        { title: 'Custom Model Design & Deployment', desc: 'We build customized generative pipelines and model fine-tuning processes tailored to your specific domain context.' },
        { title: 'Scalable Model Production', desc: 'Optimize open-source or proprietary models (LLMs) to serve low-latency requests in enterprise production environments.' },
        { title: 'Rigorous Validation & Testing', desc: 'Evaluate generative system outputs for quality, bias, hallucination mitigation, and alignment with guardrails.' },
        { title: 'Ongoing Model Maintenance', desc: 'We establish frameworks to monitor and retrain models to prevent degradation, keeping performance strong over time.' }
      ]
    },
    product: {
      title: 'Product building',
      subtitle: 'We build smart, reliable data products end-to-end—with quality, usability, and fast feedback at their core.',
      icon: Cpu,
      features: [
        { title: 'End-to-End Digital Product Development', desc: 'We partner from idea to launch—designing, prototyping, and engineering AI-powered products that align with your business goals.' },
        { title: 'Quality-First Engineering', desc: 'Every product is rigorously tested—ensuring clean data, accurate insights, and dependable performance in the field.' },
        { title: 'Intuitive UI/UX Design', desc: 'We build user-friendly interfaces tailored for data and AI tools, ensuring high adoption and ease of use.' },
        { title: 'Ongoing Model Maintenance', desc: 'We establish frameworks to monitor and retrain models to prevent degradation, keeping performance strong over time.' }
      ]
    },
    cloud: {
      title: 'Cloud Data Engineering',
      subtitle: 'We build end-to-end cloud data platforms which are strategic, scalable, and reliable so your team gets clean, unified data when and where it’s needed.',
      icon: Database,
      features: [
        { title: 'Cloud Strategy & Architecture', desc: 'We design the right roadmap and infrastructure for hybrid environments, ensuring smooth migration and scalable cloud deployments.' },
        { title: 'Cloud-Native Development', desc: 'We build and deploy applications optimized for the cloud—scalable, maintainable, and flexible from day one.' },
        { title: 'Data Engineering Pipelines', desc: 'We create robust pipelines that consolidate, clean, and transform data from on-premise and cloud sources, delivering reliable data.' },
        { title: 'Master Data Management', desc: 'We establish a single source of truth by linking and governing critical data across systems for real-time, trusted insights.' }
      ]
    },
    aigovernance: {
      title: 'AI Governance',
      subtitle: 'Comprehensive governance, readiness, security, and compliance frameworks to ensure your AI initiatives are safe, responsible, and effective.',
      icon: ShieldCheck,
      features: [
        { title: 'Readiness Assessment', desc: 'Evaluate your organization\'s preparedness for AI adoption across infrastructure, data, and culture.' },
        { title: 'Governance for General AI Readiness', desc: 'Establish robust frameworks and policies to guide responsible and effective general AI deployment.' },
        { title: 'Compliance to Follow', desc: 'Ensure adherence to industry standards, regulations, and legal requirements for AI systems.' },
        { title: 'Security to Consider for Copilot', desc: 'Address specific security vulnerabilities and data privacy concerns when integrating Copilot tools.' },
        { title: 'Governance for Copilot Chat', desc: 'Define usage guidelines, data boundaries, and monitoring protocols for Copilot Chat.' },
        { title: 'Governance for Copilot Agent', desc: 'Implement control mechanisms and accountability structures for autonomous Copilot agents.' },
        { title: 'Security Considerations for Custom AI', desc: 'Design secure architectures and threat mitigation strategies tailored to your custom AI models.' },
        { title: 'Governance for Custom Open Source AI solutions', desc: 'Manage risks, licensing, and ethical implications associated with integrating open source AI solutions.' }
      ]
    }
  };

  const tabsList = [
    { id: 'analytics', label: 'AI-Powered Data Analytics', icon: LineChart },
    { id: 'consulting', label: 'AI-Consulting', icon: MessageSquareCode },
    { id: 'genai', label: 'Generative AI', icon: Sparkles },
    { id: 'product', label: 'Product building', icon: Cpu },
    { id: 'cloud', label: 'Cloud Data Engineering', icon: Database },
    { id: 'aigovernance', label: 'AI Governance', icon: ShieldCheck }
  ];

  const ActiveIcon = tabsContent[activeTab].icon;

  return (
    <section id="services" className="py-20 lg:py-32 bg-background scroll-mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Empowering businesses with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              smart solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our specific capabilities across data, product engineering, and cutting-edge artificial intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Tab buttons sidebar */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 border-b lg:border-b-0 lg:border-r border-border pb-4 lg:pb-0 pr-0 lg:pr-4 scrollbar-thin">
            {tabsList.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap lg:whitespace-normal w-full text-left ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <TabIcon className="h-4.5 w-4.5 flex-shrink-0" />
                  <span className="flex-1">{tab.label}</span>
                  <ChevronRight className="h-4 w-4 hidden lg:block opacity-40" />
                </button>
              );
            })}
          </div>

          {/* Active Tab contents details */}
          <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-350">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <ActiveIcon className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">{tabsContent[activeTab].title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tabsContent[activeTab].subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
              {tabsContent[activeTab].features.map((feature, idx) => (
                <Card key={idx} className="border-border/50 bg-background/50 hover:shadow-md transition-all">
                  <CardContent className="p-5 space-y-2">
                    <h4 className="font-bold text-base text-foreground flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
