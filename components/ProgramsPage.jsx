import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Database, 
  Layers, 
  Clock, 
  Calendar, 
  Award, 
  Users, 
  Check, 
  BookOpen, 
  Laptop, 
  HelpCircle,
  Loader2,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export const ProgramsPage = () => {
  const navigate = useNavigate();
  const formSectionRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    bootcampTrack: 'Full Stack',
    skillLevel: 'Beginner (Basic programming knowledge)',
    linkedIn: '',
    learningGoal: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToTrack = (trackName) => {
    setFormData(prev => ({ ...prev, bootcampTrack: trackName }));
    setIsSuccess(false);
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const zohoFormData = new FormData();
      
      zohoFormData.append('xnQsjsdp', 'd6fb06afd10582600b0bb527466265ecb37accf548464e6d9da204e81479449b');
      zohoFormData.append('zc_gad', '');
      zohoFormData.append('xmIwtLD', '119e04573effde9ace59fac71b98e1b9d10ac17e0eef1e38a2d3b621e1f27f59789ceab68380aa2cc4ada2a6e91024bb');
      zohoFormData.append('actionType', 'TGVhZHM=');
      zohoFormData.append('returnURL', 'null');
      zohoFormData.append('aG9uZXlwb3Q', '');

      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '.';

      zohoFormData.append('First Name', firstName);
      zohoFormData.append('Last Name', lastName);
      zohoFormData.append('Email', formData.email);
      zohoFormData.append('Phone', formData.phone);
      zohoFormData.append('City', formData.city);
      zohoFormData.append('State', formData.city);
      zohoFormData.append('Company', formData.skillLevel || 'Bootcamp Learner');
      zohoFormData.append('Designation', `Bootcamp - ${formData.bootcampTrack}`);

      let description = `=== BOOTCAMP REGISTRATION DETAILS ===
Track Interested In: ${formData.bootcampTrack}
Current Skill Level: ${formData.skillLevel}
LinkedIn Profile: ${formData.linkedIn || 'N/A'}
Learning Goals: ${formData.learningGoal || 'N/A'}
`;

      zohoFormData.append('Description', description);

      await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
        method: 'POST',
        body: zohoFormData,
        mode: 'no-cors',
        cache: 'no-cache'
      });

      setIsSuccess(true);
      toast.success('Registration submitted successfully!', {
        description: 'Check your email for the enrollment confirmation and curriculum details.'
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Bootcamp registration error:', error);
      toast.error('Something went wrong submitting your registration.', {
        description: 'Please try again or email us directly at ramesh@startworks.in'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tracks = [
    {
      id: 'Full Stack',
      title: 'Full Stack Development',
      badge: 'High Demand',
      icon: Code2,
      color: 'from-blue-600 to-indigo-600',
      description: 'Master frontend engineering, robust backend APIs, relational & NoSQL databases, and full deployment pipelines.',
      curriculum: [
        'Advanced React, Next.js 14 & State Management',
        'Node.js, Express & Fastify Microservices',
        'PostgreSQL, Prisma ORM & MongoDB',
        'Docker containerization & Cloud CI/CD'
      ],
      idealFor: 'Developers, students, and engineers looking to build scalable modern web apps end-to-end.'
    },
    {
      id: 'Data Engineer',
      title: 'Data Engineering',
      badge: 'Enterprise Focus',
      icon: Database,
      color: 'from-indigo-600 to-cyan-600',
      description: 'Design and build enterprise-grade data pipelines, real-time analytics streaming, and scalable data warehouses.',
      curriculum: [
        'Advanced SQL & Python for Data Engineering',
        'ETL/ELT Pipelines with Apache Airflow & dbt',
        'Data Warehousing with Snowflake / BigQuery',
        'Distributed Data Processing & Kafka Streaming'
      ],
      idealFor: 'Software developers, analysts, and math/CS graduates aiming for lucrative data engineering roles.'
    },
    {
      id: 'Solutions Architect',
      title: 'Solutions Architecture',
      badge: 'Advanced Track',
      icon: Layers,
      color: 'from-cyan-600 to-blue-600',
      description: 'Architect resilient, cost-effective, and highly scalable cloud systems following industry-proven architectural frameworks.',
      curriculum: [
        'Cloud System Design (AWS / Azure / GCP)',
        'Microservices, Event-Driven & Serverless Patterns',
        'High Availability, Disaster Recovery & Multi-Region',
        'Enterprise Security, Compliance & FinOps Cost Mastery'
      ],
      idealFor: 'Experienced developers, DevOps engineers, and tech leads ready to step into architectural leadership.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pb-28 border-b border-border/40">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] rounded-full bg-cyan-600/10 dark:bg-cyan-600/20 blur-[130px]" />
          <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center text-xs md:text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-3.5 w-3.5 mx-2 opacity-50" />
            <span className="text-foreground font-medium">Bootcamp & Learning Programs</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left Photo - Balanced with subtle depth */}
            <div className="hidden lg:block lg:col-span-3">
              <div 
                onClick={() => scrollToTrack('Full Stack')}
                className="group relative cursor-pointer transform -rotate-1 hover:rotate-0 translate-y-3 hover:translate-y-1 transition-all duration-500 ease-out"
                title="Click to view Full Stack Track"
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-card shadow-xl">
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-developer.jpg`} 
                    alt="Hands-on Developer Coding"
                    className="w-full h-80 xl:h-[350px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 left-3 bg-background/90 dark:bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-border/60 shadow flex items-center gap-1.5 z-10">
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-foreground">Hands-on Coding</span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pt-10 pointer-events-none">
                    <p className="text-sm font-bold leading-tight">Live Real-World Capstones</p>
                    <p className="text-[11px] text-zinc-300 mt-0.5">Zero dummy apps, real-world projects</p>
                    <div className="mt-2.5 flex items-center text-xs text-cyan-300 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore Full Stack <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Accelerate Your Career with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Startworks Bootcamps.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Intensive, project-driven bootcamps designed to bridge the gap between academic theory and real enterprise tech stacks. Master Full Stack, Data Engineering, or Solutions Architecture through live code reviews and comprehensive capstones.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button 
                  onClick={() => scrollToTrack('Full Stack')} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 h-12 px-6 font-semibold"
                >
                  Enroll in Upcoming Batch
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => {
                    const elem = document.getElementById('curriculum-tracks');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-6 font-semibold border-border hover:bg-accent"
                >
                  Explore Syllabus
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Mobile / Tablet Staggered Unaligned Preview */}
              <div className="lg:hidden grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto text-left">
                <div 
                  onClick={() => scrollToTrack('Full Stack')}
                  className="group relative cursor-pointer -rotate-2 hover:rotate-0 translate-y-3 transition-all duration-300 rounded-2xl overflow-hidden border border-border/70 shadow-lg"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-developer.jpg`} 
                    alt="Developer Coding"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] font-bold">Full Stack & Data</p>
                    <p className="text-[9px] text-zinc-300">12-Week Intensive</p>
                  </div>
                </div>

                <div 
                  onClick={() => scrollToTrack('Solutions Architect')}
                  className="group relative cursor-pointer rotate-1 hover:rotate-0 transition-all duration-300 rounded-2xl overflow-hidden border border-border/70 shadow-lg"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}career-acceleration.jpg`} 
                    alt="Career Acceleration and Mentorship"
                    className="w-full h-40 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] font-bold">Career Acceleration</p>
                    <p className="text-[9px] text-zinc-300">Mentorship & Interviews</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border/50 text-left">
                <div className="p-2.5 rounded-xl bg-card/60 border border-border/40">
                  <p className="text-xl md:text-2xl font-bold text-foreground">12 Weeks</p>
                  <p className="text-xs text-muted-foreground">Practical Intensive</p>
                </div>
                <div className="p-2.5 rounded-xl bg-card/60 border border-border/40">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">3 Tracks</p>
                  <p className="text-xs text-muted-foreground">Full Stack, Data Engineering, Solutions Architect</p>
                </div>
                <div className="p-2.5 rounded-xl bg-card/60 border border-border/40">
                  <p className="text-xl md:text-2xl font-bold text-foreground">Interactive</p>
                  <p className="text-xs text-muted-foreground">College & Online Sessions</p>
                </div>
                <div className="p-2.5 rounded-xl bg-card/60 border border-border/40">
                  <p className="text-xl md:text-2xl font-bold text-indigo-600">Capstone</p>
                  <p className="text-xs text-muted-foreground">End-to-End Project</p>
                </div>
              </div>
            </div>

            {/* Right Photo - Balanced with subtle depth */}
            <div className="hidden lg:block lg:col-span-3">
              <div 
                onClick={() => scrollToTrack('Solutions Architect')}
                className="group relative cursor-pointer transform rotate-1 hover:rotate-0 translate-y-3 hover:translate-y-1 transition-all duration-500 ease-out"
                title="Click to view Solutions Architect Track"
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-card shadow-xl">
                  <img 
                    src={`${import.meta.env.BASE_URL}career-acceleration.jpg`} 
                    alt="Career Acceleration and Architecture Mentorship"
                    className="w-full h-80 xl:h-[350px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/40 shadow flex items-center gap-1.5 text-white z-10">
                    <Sparkles className="h-3 w-3 text-cyan-300" />
                    <span className="text-[10px] font-bold tracking-wider">Top Mentors</span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pt-10 pointer-events-none">
                    <p className="text-sm font-bold leading-tight">Career Acceleration</p>
                    <p className="text-[11px] text-zinc-300 mt-0.5">Resume review & mock interviews</p>
                    <div className="mt-2.5 flex items-center text-xs text-blue-300 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore Architecture <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 DETAILED TRACKS */}
      <section id="curriculum-tracks" className="py-20 lg:py-24 bg-muted/10 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Three Specialized Career Tracks
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Each track is carefully engineered by senior developers and architects to focus on what enterprise teams actually hire for.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <Card key={track.id} className="flex flex-col justify-between border-border/60 hover:border-blue-600/60 transition-all duration-300 hover:shadow-xl group bg-card">
                  <CardHeader className="space-y-3 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold">{track.badge}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold">{track.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {track.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 text-sm">
                    <div className="space-y-2.5 pt-2 border-t border-border/40">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Core Curriculum</p>
                      {track.curriculum.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                          <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-accent/30 border border-border/40 text-xs">
                      <span className="font-semibold text-foreground">Who this is for: </span>
                      <span className="text-muted-foreground">{track.idealFor}</span>
                    </div>

                    <Button 
                      onClick={() => scrollToTrack(track.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-11"
                    >
                      Register for {track.title}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. REGISTRATION FORM (ANCHOR) */}
      <section ref={formSectionRef} id="register-form" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-2xl">
          
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Register for the Upcoming Batch
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Fill in your details to secure your slot. Our admissions team will share the batch schedule, syllabus, and enrollment steps.
            </p>
          </div>

          {isSuccess ? (
            <Card className="border-border/60 shadow-xl text-center py-16 px-6">
              <CardContent className="space-y-6 flex flex-col items-center max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Registration Received!</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Thank you for registering for the <strong>Startworks {formData.bootcampTrack || 'Bootcamp'}</strong>. Check your inbox for the confirmation email and curriculum details. Our admissions team will connect with you shortly.
                  </p>
                </div>
                <div className="flex gap-3 pt-4 w-full">
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="flex-1">
                    Register Another Person
                  </Button>
                  <Button onClick={() => navigate('/')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/70 shadow-2xl bg-card">
              <CardHeader className="border-b border-border/40 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-bold">
                      Bootcamp Enrollment Form
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm mt-1">
                      Choose your track and share your learning goals.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs px-3 py-1 font-medium border-cyan-500 text-cyan-600">
                    Admissions Open
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Track Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Select Program Track *
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {tracks.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bootcampTrack: t.id }))}
                          className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.bootcampTrack === t.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                              : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                          }`}
                        >
                          {t.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Full Name *</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your legal name"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Phone / WhatsApp Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Current City / Location *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Visakhapatnam"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Background & LinkedIn */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Current Background / Skill Level *</label>
                      <select
                        name="skillLevel"
                        value={formData.skillLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Beginner (Basic programming knowledge)">Beginner (Basic programming knowledge)</option>
                        <option value="Intermediate (Built some personal projects)">Intermediate (Built some personal projects)</option>
                        <option value="College Student (CS / IT / Engineering)">College Student (CS / IT / Engineering)</option>
                        <option value="Working Professional (Career switch)">Working Professional (Career switch)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">LinkedIn Profile URL (Optional)</label>
                      <Input
                        type="url"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/90">What are your learning goals?</label>
                    <Textarea
                      name="learningGoal"
                      value={formData.learningGoal}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us what you hope to achieve, your career aspirations, or any specific questions..."
                      className="resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-sm md:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Registering Your Slot...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Register for Bootcamp
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground mt-3">
                      By registering, your details are registered in our Zoho CRM and you will receive instant confirmation via email.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

        </div>
      </section>

      {/* 4. PERKS & PEDAGOGY HIGHLIGHTS */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mb-4">
                <Laptop className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Live Interactive Coding</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No pre-recorded static lectures. Learn through interactive live sessions with real-time screen sharing, debugging, and live architectural problem solving.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Comprehensive Capstone</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Build an enterprise-grade project from scratch. Showcase verified live demo links and clean GitHub repositories to hiring managers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Placement & Referrals</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive personalized resume reviews, system design mock interviews, and direct referral opportunities across Startworks and partner startups.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default ProgramsPage;
