import React from 'react';
import { Card, CardContent } from './ui/card';
import { Briefcase, Sparkles, ShieldCheck } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: Briefcase,
      title: 'Strong Experience from Global Companies',
      description: 'Our leadership and core team bring a wealth of proven experience from top-tier global organizations, giving us deep understanding of enterprise-level challenges and success strategies.'
    },
    {
      icon: Sparkles,
      title: 'Fresh Talent with an AI-First Mindset',
      description: "We combine this experience with the dynamism of young, bright minds native to the AI era. This infusion of fresh talent ensures we're always challenging conventional thinking."
    },
    {
      icon: ShieldCheck,
      title: 'Global Standards of Professionalism',
      description: 'Expect the highest levels of professionalism and integrity. Our team operates with a commitment to global standards, ensuring seamless collaboration and exceptional results.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              STARTWORKS
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            STARTWORKS TECHNOLOGIES PRIVATE LIMITED is a technology company built on a foundation of expertise, innovation, and strategic vision. With founders who have collaborated for over 14 years, we bring together young, energetic talent and seasoned industry advisors to create transformative technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-blue-600/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-450" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
