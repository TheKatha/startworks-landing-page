import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const Events = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success(`Subscribed ${email}! We will notify you as soon as new schedules are announced.`, {
        duration: 5000,
      });
      e.target.reset();
    }
  };

  return (
    <section id="events" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-60"></div>
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400 animate-pulse" />
            Online Webinars
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
            Upcoming <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Events</span>
          </h2>
          
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Big Ideas. Expert Insights. Live & Online. We're bringing together top minds in AI, data, and innovation to share what's shaping the future and you're invited.
          </p>
        </div>

        {/* Coming Soon Panel */}
        <div className="max-w-2xl mx-auto text-center p-10 md:p-16 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md shadow-xl dark:shadow-2xl space-y-8">
          <div className="space-y-3">
            <span className="text-sm font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase block">
              Webinars Coming Soon
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              We are currently finalizing our speaker lineup and schedule details. Sign up below to receive direct invites and updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-1.5"
            >
              <Bell className="h-4 w-4" /> Notify Me
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
