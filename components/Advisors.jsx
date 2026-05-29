import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase } from 'lucide-react';

export const Advisors = () => {
  const advisors = [
    {
      name: 'Shobhit Niranjan',
      role: 'AI & ML Advisor',
      company: 'Microsoft',
      position: 'Partner, Applied Sciences (ML & AI)',
      expertise: 'AI Implementation & Strategy',
      description: 'Guiding AI and machine learning implementations with expertise from Microsoft.'
    },
    {
      name: 'Anish Sebastian',
      role: 'Financial Advisor',
      company: 'Parsons Corporation',
      position: 'Financial Controller (GEMA23 INSEAD)',
      expertise: 'Finance & Strategy',
      description: 'Providing financial guidance and strategic planning insights.'
    },
    {
      name: 'Aditya Uppuluri',
      role: 'Technology Advisor',
      company: 'JPMorgan Chase',
      position: 'Technical Expert',
      expertise: 'Enterprise Technology',
      description: 'Advising on technology strategy and enterprise architecture.'
    },
    {
      name: 'Abhishek Kumar',
      role: 'Marketing Advisor',
      company: 'Amazon',
      position: 'Sr. Product Marketing Manager',
      expertise: 'Marketing & GTM Strategy',
      description: 'Guiding marketing strategies and go-to-market execution.'
    }
  ];

  return (
    <section id="advisors" className="py-12 lg:py-16 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Strategic{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Advisors
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Industry experts from leading technology and financial institutions providing strategic guidance across AI, finance, technology, and marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl group">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {advisor.position}
                    </p>
                    <Badge className="mb-3 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200">
                      {advisor.company}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-2">{advisor.description}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {advisor.expertise}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <Card className="border-blue-600/20 bg-blue-50/50 dark:bg-blue-900/10">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Our advisory board brings together decades of combined experience from Microsoft, Amazon, JPMorgan Chase, and Parsons Corporation, ensuring we stay at the forefront of technology, finance, and business strategy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
