import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { servicesList, servicesContent } from '../src/data/servicesData';

export const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 lg:py-32 bg-background scroll-mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Transformation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Help businesses become AI-first organizations by identifying, implementing, and managing AI solutions that deliver measurable business value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicesList.map((serviceItem) => {
            const Icon = serviceItem.icon;
            const details = servicesContent[serviceItem.id];
            
            return (
              <Card 
                key={serviceItem.id} 
                className="group border-border/50 bg-background/50 hover:bg-accent/5 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/services/${serviceItem.id}`)}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="h-12 w-12 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3">{serviceItem.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {details.subtitle}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium text-sm mt-auto group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
