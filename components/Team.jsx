import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { User, Users } from 'lucide-react';

export const Team = () => {
  const team = [
    {
      name: 'Ramesh',
      role: 'Founder',
      image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=R',
      description: 'Visionary leader with extensive experience in technology and business strategy.'
    },
    {
      name: 'Co-Founder',
      role: 'Co-Founder',
      image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=CF',
      description: '14 years of partnership with Ramesh, bringing complementary expertise and shared vision.'
    }
  ];

  const engineers = [
    {
      name: 'Hymavathi Peddimudi',
      role: 'Junior SDE (Founding)',
      specialty: 'Product Development'
    },
    {
      name: 'Hemakesh Surla',
      role: 'Junior SDE (Founding)',
      specialty: 'System Architecture'
    }
  ];

  return (
    <section id="team" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the experienced founders who have been working together for over 14 years, building a legacy of innovation and excellence.
          </p>
        </div>

        {/* Founders */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {team.map((member, index) => (
            <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl group">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 mx-auto w-32 h-32 rounded-full border-4 border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <User className="h-16 w-16 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200">
                  {member.role}
                </Badge>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Engineers Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Founding Engineers</h3>
            <p className="text-muted-foreground">
              Young, energetic graduates focused on executing the product vision with technical excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {engineers.map((engineer, index) => (
              <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <User className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{engineer.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{engineer.role}</p>
                    <p className="text-sm text-muted-foreground">{engineer.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
