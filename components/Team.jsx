import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { User, Users } from 'lucide-react';

export const Team = () => {
  const engineers = [
    {
      name: 'Hymavathi Peddimudi',
      role: 'Junior SDE (Founding)',
      specialty: 'Full Stack Development · Product Engineering · UI/UX'
    },
    {
      name: 'Hemakesh Surla',
      role: 'Junior SDE (Founding)',
      specialty: 'Full Stack Development · Cloud & DevOps · System Architecture'
    }
  ];

  return (
    <section id="team" className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the experienced founder leading a legacy of innovation and excellence.
          </p>
        </div>

        {/* Founder */}
        <div className="flex justify-center mb-16">
          <Card className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg group max-w-2xl w-full">
            <CardContent className="py-5 px-6">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">Ramesh Botta</h3>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] px-2 py-0">
                      Founder
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    13+ years in End-to-End BI solutions across Retail, Banking, Gaming & Digital Media. Passionate about Data Science, Data Engineering & ML.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">✓ TDWI Certified</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">🏆 BI-Shark</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">🎯 Innovator Finalist</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {['Data Engineering', 'ETL', 'Data Modeling', 'Advanced Analytics', 'Data Science', 'ML', 'Dashboard Design'].map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
