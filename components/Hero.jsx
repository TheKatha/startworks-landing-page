import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Building2, Users, Sparkles } from 'lucide-react';

export const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Empowering businesses with smart and scalable solutions</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              STARTWORKS
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            STARTWORKS TECHNOLOGIES PRIVATE LIMITED — From building your data foundation to scaling advanced analytics, we help organizations unlock value no matter where they are in their data journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white group"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('equibudx')}
            >
              Discover Equibudx
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">14+</div>
              <div className="text-sm text-muted-foreground">Years Partnership</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm text-muted-foreground">Expert Team</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Industry Advisors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
