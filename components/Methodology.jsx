import React from 'react';
import { Card, CardContent } from './ui/card';
import { Search, Compass, MessageCircle, RefreshCw } from 'lucide-react';

export const Methodology = () => {
  const steps = [
    {
      icon: Search,
      step: '01',
      title: 'Understand',
      description: 'Assess the current state to identify gaps, opportunities, and challenges.',
      color: 'border-blue-500 text-blue-500'
    },
    {
      icon: Compass,
      step: '02',
      title: 'Advocate',
      description: 'Define the desired future state and champion the changes needed to get there.',
      color: 'border-indigo-500 text-indigo-500'
    },
    {
      icon: MessageCircle,
      step: '03',
      title: 'Communicate',
      description: 'Ensure transparency with consistent, clear, and collaborative communication throughout the journey.',
      color: 'border-purple-500 text-purple-500'
    },
    {
      icon: RefreshCw,
      step: '04',
      title: 'Iterate',
      description: 'Use agile methods to develop, test, and refine solutions that deliver value early and often.',
      color: 'border-pink-500 text-pink-500'
    }
  ];

  return (
    <section id="methodology" className="py-20 lg:py-32 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            How We Work
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Methodology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Achieving impactful outcomes requires clarity, communication, and adaptability. Our step-by-step lifecycle ensures alignment from vision to execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 -translate-y-12 z-0 opacity-25" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-border/50 bg-background/80 backdrop-blur hover:border-blue-500/35 transition-all duration-300 hover:shadow-lg relative z-10">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="relative mx-auto flex items-center justify-center">
                    <div className={`h-16 w-16 rounded-full border-2 ${item.color} flex items-center justify-center bg-background shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -top-3 -right-2 text-xs font-bold bg-muted px-2 py-0.5 rounded-full border">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight pt-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
