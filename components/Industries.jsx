import React from 'react';
import { Card, CardContent } from './ui/card';
import { HeartPulse, Activity, ShieldCheck, Settings, LineChart, Cpu } from 'lucide-react';

export const Industries = () => {
  const healthcareFeatures = [
    {
      icon: HeartPulse,
      title: 'Smart Patient Assistance',
      description: 'AI-powered chatbots and virtual assistants help patients with triage, scheduling, and care navigation.'
    },
    {
      icon: Activity,
      title: 'Workflow Automation',
      description: 'Streamline admin tasks like appointment management, billing, and record handling—freeing up staff time.'
    },
    {
      icon: ShieldCheck,
      title: 'Clinical Documentation with Gen AI',
      description: 'Use Generative AI and NLP to auto-create clinical notes and EHR summaries, reducing manual work.'
    }
  ];

  const manufacturingFeatures = [
    {
      icon: Settings,
      title: 'Predictive & Preventive Maintenance',
      description: 'Use AI to monitor machines in real time, reduce unplanned downtime, and extend equipment lifespan.'
    },
    {
      icon: LineChart,
      title: 'Production Planning & Inventory',
      description: 'Optimize supply chain logistics and manufacturing schedules to match dynamic market demands.'
    },
    {
      icon: Cpu,
      title: 'Quality Intelligence',
      description: 'Analyze sensor data to detect manufacturing defects early and automate quality inspection checks.'
    }
  ];

  return (
    <section id="industries" className="py-20 lg:py-32 bg-slate-50 dark:bg-gray-900/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Sectors We Empower
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Industries We{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Serve
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We deploy intelligent AI tools to automate workflows, optimize production, and deliver scalable industry solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Healthcare Card */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Healthcare</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We deploy intelligent AI tools to smoothly guide patient journeys, streamline admin work, and auto-generate clinical notes—helping providers deliver better care, faster.
            </p>
            <div className="space-y-4 pt-4">
              {healthcareFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-border/50 bg-background/50 hover:border-rose-500/20 transition-colors">
                    <CardContent className="p-5 flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center flex-shrink-0 text-rose-600 dark:text-rose-450">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Manufacturing Card */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Manufacturing</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We build end-to-end data pipelines and modern predictive AI systems to optimize material tracking, manage inventories, and streamline industrial pipelines.
            </p>
            <div className="space-y-4 pt-4">
              {manufacturingFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-border/50 bg-background/50 hover:border-blue-500/20 transition-colors">
                    <CardContent className="p-5 flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-450">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
