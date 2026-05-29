import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { FileText, Rss, ArrowUpRight } from 'lucide-react';
import { caseStudies, blogs } from '../src/data/resourcesData';

export const Resources = () => {
  return (
    <section id="resources" className="py-20 lg:py-32 bg-background scroll-mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Insights & Guides
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our latest case studies, research documents, and tech articles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Case Studies Group */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Case Studies</h3>
            </div>
            <div className="grid gap-6">
              {caseStudies.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/case-study/${item.id}`}
                  className="block group"
                >
                  <Card className="border-border/50 hover:border-blue-600/30 hover:shadow-md transition-all duration-300 h-full cursor-pointer">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded">
                          {item.metric}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h4 className="text-xl font-bold tracking-tight">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Blogs Group */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2">
              <Rss className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Latest Blogs</h3>
            </div>
            <div className="grid gap-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {blogs.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/blog/${item.id}`}
                  className="block group"
                >
                  <Card className="border-border/50 hover:border-blue-600/30 hover:shadow-md transition-all duration-300 h-full cursor-pointer">
                    <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                      <div>
                        <h4 className="text-lg font-bold group-hover:text-blue-600 transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t">
                        <span>{item.date}</span>
                        <span>{item.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
