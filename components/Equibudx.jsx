import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Zap, Shield, LineChart, Boxes, ArrowRight } from 'lucide-react';

export const Equibudx = () => {
  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Built for speed and scalability to handle enterprise-level demands.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with robust data protection mechanisms.'
    },
    {
      icon: LineChart,
      title: 'Analytics Driven',
      description: 'Powerful insights and analytics to drive informed business decisions.'
    },
    {
      icon: Boxes,
      title: 'Modular Architecture',
      description: 'Flexible and extensible design that grows with your business needs.'
    }
  ];

  return (
    <section id="equibudx" className="py-20 lg:py-32 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Flagship Product
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Introducing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Equibudx
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Equibudx is our flagship product, designed and developed by the expert team at STARTWORKS. A cutting-edge solution that combines innovation with practical business value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <Card className="border-blue-600/20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-background">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-muted-foreground mb-6">
                Discover how Equibudx can revolutionize your operations and drive growth.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white group"
                onClick={() => window.open('https://equibudx.com', '_blank', 'noopener,noreferrer')}
              >
                Learn More About Equibudx
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
