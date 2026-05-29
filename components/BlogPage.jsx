import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogsContent } from '../src/data/resourcesData';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogsContent[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  // Find related articles (excluding the current one)
  const relatedBlogIds = Object.keys(blogsContent)
    .filter(blogId => blogId !== id)
    .slice(0, 2);

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 animate-in fade-in duration-300">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Blog Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            Technical Blog
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground pt-4 border-b border-border/80 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-600" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              {blog.time}
            </span>
            <span>•</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">STARTWORKS Research</span>
          </div>
        </div>

        {/* Blog Content */}
        <article className="space-y-6 text-foreground/90 text-lg leading-relaxed mb-16">
          {blog.paragraphs.map((p, index) => (
            <p key={index} className="first-letter:text-4xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-1 first-letter:float-left first-letter:leading-none p-first:first-letter:block">
              {index === 0 ? p : p}
            </p>
          ))}
        </article>

        {/* Author Bio / Call to Action */}
        <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-md mb-16 flex flex-col md:flex-row gap-6 items-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            SW
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h4 className="font-bold text-lg">STARTWORKS Engineering</h4>
            <p className="text-sm text-muted-foreground">
              Our engineering team builds scalable data products, production AI/ML architectures, and clean pipeline-level contract enforcement platforms.
            </p>
          </div>
          <Button onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/#contact');
            }
          }} className="whitespace-nowrap">
            Work With Us
          </Button>
        </div>

        {/* Related Articles */}
        <div className="border-t pt-12 space-y-6">
          <h3 className="text-2xl font-bold">Keep Reading</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogIds.map(blogId => {
              const item = blogsContent[blogId];
              return (
                <Link 
                  key={blogId}
                  to={`/blog/${blogId}`}
                  className="block p-6 rounded-xl border bg-card hover:border-blue-600/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1">
                      Read Article <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
