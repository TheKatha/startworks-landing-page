import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Rocket, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Users,
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export const ApplyPage = ({ defaultTab = 'careers' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get('tab');
  const queryType = searchParams.get('type');
  
  // Normalize tab: either 'careers' or 'bootcamp'
  const resolveTab = () => {
    if (queryTab === 'bootcamp' || defaultTab === 'bootcamp') return 'bootcamp';
    return 'careers';
  };

  const [activeTab, setActiveTab] = useState(resolveTab());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (queryTab && ['careers', 'internship', 'hiring', 'bootcamp'].includes(queryTab)) {
      if (queryTab === 'bootcamp') {
        setActiveTab('bootcamp');
      } else {
        setActiveTab('careers');
        if (queryTab === 'internship') {
          setFormData(prev => ({ ...prev, opportunityType: 'Internship' }));
        } else if (queryTab === 'hiring') {
          setFormData(prev => ({ ...prev, opportunityType: 'Full-Time Job' }));
        }
      }
    }
  }, [queryTab]);

  // Form State
  const initialFormData = {
    // Common
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolioUrl: '',
    resumeLink: '',
    additionalNotes: '',

    // Careers & Internships unified fields
    opportunityType: queryType === 'job' ? 'Full-Time Job' : (defaultTab === 'hiring' ? 'Full-Time Job' : 'Internship'),
    roleOrDomain: 'Full-Stack Development',
    
    // Specific to Internship
    collegeName: '',
    degreeBranch: '',
    graduationYear: '2026',
    internshipDuration: '3 Months',

    // Specific to Full-Time Job
    yearsOfExperience: '1-3 Years',
    currentCompany: '',
    expectedCtc: '',
    noticePeriod: 'Immediate',

    // Bootcamp specific
    bootcampTrack: 'Full Stack',
    skillLevel: 'Beginner (Basic programming knowledge)',
    preferredMode: 'Weekend Live Sessions',
    learningGoal: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const zohoFormData = new FormData();
      
      // Zoho CRM Required Hidden Keys
      zohoFormData.append('xnQsjsdp', 'd6fb06afd10582600b0bb527466265ecb37accf548464e6d9da204e81479449b');
      zohoFormData.append('zc_gad', '');
      zohoFormData.append('xmIwtLD', '119e04573effde9ace59fac71b98e1b9d10ac17e0eef1e38a2d3b621e1f27f59789ceab68380aa2cc4ada2a6e91024bb');
      zohoFormData.append('actionType', 'TGVhZHM=');
      zohoFormData.append('returnURL', 'null');
      zohoFormData.append('aG9uZXlwb3Q', '');

      // Name handling (split full name into First & Last name for Zoho)
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '.';

      zohoFormData.append('First Name', firstName);
      zohoFormData.append('Last Name', lastName);
      zohoFormData.append('Email', formData.email);
      zohoFormData.append('Phone', formData.phone);
      zohoFormData.append('City', formData.city);
      zohoFormData.append('State', formData.city);

      // Map Company and Title based on applicant path
      let company = 'Startworks Candidate';
      let designation = formData.roleOrDomain || 'Applicant';

      if (activeTab === 'careers') {
        if (formData.opportunityType === 'Internship') {
          company = formData.collegeName || 'Student';
          designation = `Intern - ${formData.roleOrDomain}`;
        } else {
          company = formData.currentCompany || 'Full-Time Candidate';
          designation = formData.roleOrDomain;
        }
      } else {
        company = formData.skillLevel || 'Bootcamp Learner';
        designation = `Bootcamp - ${formData.bootcampTrack}`;
      }

      zohoFormData.append('Company', company);
      zohoFormData.append('Designation', designation);

      // Build structured Description text with all applicant details & resume link
      let description = `--- APPLICATION DETAILS ---
Type: ${activeTab === 'careers' ? formData.opportunityType : 'Bootcamp Learning'}
Domain / Track: ${activeTab === 'careers' ? formData.roleOrDomain : formData.bootcampTrack}
`;

      if (activeTab === 'careers') {
        if (formData.opportunityType === 'Internship') {
          description += `College: ${formData.collegeName || 'N/A'}
Branch: ${formData.degreeBranch || 'N/A'}
Graduation Year: ${formData.graduationYear || 'N/A'}
Available Duration: ${formData.internshipDuration || 'N/A'}
`;
        } else {
          description += `Years of Experience: ${formData.yearsOfExperience || 'N/A'}
Current Company: ${formData.currentCompany || 'N/A'}
Expected CTC: ${formData.expectedCtc || 'N/A'}
Notice Period: ${formData.noticePeriod || 'N/A'}
`;
        }
      } else {
        description += `Bootcamp Track: ${formData.bootcampTrack}
Skill Level: ${formData.skillLevel}
Preferred Learning Mode: ${formData.preferredMode}
Learning Goals: ${formData.learningGoal || 'N/A'}
`;
      }

      description += `
--- PROFILES & RESUME ---
Resume Link: ${formData.resumeLink || 'N/A'}
LinkedIn: ${formData.linkedIn || 'N/A'}
Portfolio / GitHub: ${formData.portfolioUrl || 'N/A'}
Candidate Note: ${formData.additionalNotes || 'N/A'}
`;

      zohoFormData.append('Description', description);

      // Send to Zoho CRM Web-to-Lead endpoint
      await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
        method: 'POST',
        body: zohoFormData,
        mode: 'no-cors',
        cache: 'no-cache'
      });

      setIsSuccess(true);
      toast.success('Application submitted successfully!', {
        description: 'Your details have been registered in our Zoho CRM. Our team will contact you soon.'
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Zoho CRM submission error:', error);
      toast.error('Something went wrong submitting your application.', {
        description: 'Please try again or email us directly at ramesh@startworks.in'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabsConfig = [
    {
      id: 'careers',
      title: 'Careers & Internships',
      badge: 'Work With Us',
      icon: Briefcase,
      description: 'Explore full-time engineering and product roles or apply for our hands-on student internship programs.',
    },
    {
      id: 'bootcamp',
      title: 'Bootcamp Learning',
      badge: 'Learn & Upskill',
      icon: Rocket,
      description: 'Intensive industry-ready bootcamp in Full Stack, Data Engineering, and Solutions Architecture with capstones.',
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pb-24 border-b border-border/40">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[130px]" />
          <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <span className="text-foreground font-medium">Careers & Programs</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Join Startworks or Learn With Us</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Build Tomorrow's{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tech & AI
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Looking to build high-impact products as an intern or full-time engineer? Or want to master in-demand skills in our practical tech bootcamp? Choose your path below.
            </p>
          </div>

          {/* 2-Tab Selector Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg ring-2 ring-blue-500/20'
                      : 'border-border/60 bg-card hover:border-border hover:bg-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant={isSelected ? "default" : "secondary"} className="text-xs">
                      {tab.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-xl mb-1.5">{tab.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {isSuccess ? (
            <Card className="border-border/60 shadow-lg text-center py-12 px-6">
              <CardContent className="space-y-6 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h2 className="text-2xl font-bold">Application Received!</h2>
                  <p className="text-muted-foreground text-sm">
                    Thank you for applying. We have safely recorded your details. Our team will review your application and reach out to you within 2-3 business days.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another Application
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/60 shadow-xl bg-card">
              <CardHeader className="border-b border-border/40 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600 text-white">
                    {activeTab === 'careers' ? <Briefcase className="h-6 w-6" /> : <Rocket className="h-6 w-6" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">
                      {activeTab === 'careers' ? 'Careers & Internships Application' : 'Bootcamp Registration Form'}
                    </CardTitle>
                    <CardDescription>
                      {activeTab === 'careers' 
                        ? 'Apply for full-time positions or student internship opportunities.'
                        : 'Enroll in our practical, hands-on engineering bootcamps.'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Personal Details */}
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs font-bold">1</span>
                      Personal Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name *</label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone / WhatsApp Number *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 9876543210"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current City / Location *</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Visakhapatnam / Hyderabad"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: TAB SPECIFIC FIELDS */}
                  <div className="border-t border-border/40 pt-6">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs font-bold">2</span>
                      {activeTab === 'careers' ? 'Role & Professional Details' : 'Bootcamp Track & Preferences'}
                    </h3>

                    {/* UNIFIED CAREERS & INTERNSHIPS FORM */}
                    {activeTab === 'careers' && (
                      <div className="space-y-6">
                        
                        {/* Selector for Internship vs Full-Time */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">I am applying for *</label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, opportunityType: 'Internship' }))}
                              className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                                formData.opportunityType === 'Internship'
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500'
                                  : 'border-border/60 hover:bg-accent/40'
                              }`}
                            >
                              <GraduationCap className="h-4 w-4" />
                              <span>Internship (Student / Fresher)</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, opportunityType: 'Full-Time Job' }))}
                              className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                                formData.opportunityType === 'Full-Time Job'
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500'
                                  : 'border-border/60 hover:bg-accent/40'
                              }`}
                            >
                              <Briefcase className="h-4 w-4" />
                              <span>Full-Time Role</span>
                            </button>
                          </div>
                        </div>

                        {/* Common to both: Role / Domain */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Role / Domain *</label>
                            <select
                              name="roleOrDomain"
                              value={formData.roleOrDomain}
                              onChange={handleInputChange}
                              required
                              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Full-Stack Development">Full-Stack Development</option>
                              <option value="AI & Machine Learning">AI & Machine Learning</option>
                              <option value="Cloud & Data Engineering">Cloud & Data Engineering</option>
                              <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                              <option value="UI/UX & Frontend">UI/UX & Frontend</option>
                              <option value="Business Operations / Consulting">Business Operations / Consulting</option>
                              <option value="Other">Other Role</option>
                            </select>
                          </div>

                          {formData.opportunityType === 'Internship' ? (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Available Duration *</label>
                              <select
                                name="internshipDuration"
                                value={formData.internshipDuration}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="2-3 Months">2 - 3 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="Immediate / Long Term">Immediate / Long Term</option>
                              </select>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Total Experience *</label>
                              <select
                                name="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="0-1 Years">0 - 1 Years (Entry Level)</option>
                                <option value="1-3 Years">1 - 3 Years</option>
                                <option value="3-5 Years">3 - 5 Years</option>
                                <option value="5+ Years">5+ Years (Senior)</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Fields specific to INTERNSHIP */}
                        {formData.opportunityType === 'Internship' && (
                          <div className="grid md:grid-cols-3 gap-4 p-4 rounded-xl bg-accent/20 border border-border/40">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">College / University *</label>
                              <Input
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleInputChange}
                                placeholder="e.g. Andhra University"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Degree & Branch *</label>
                              <Input
                                name="degreeBranch"
                                value={formData.degreeBranch}
                                onChange={handleInputChange}
                                placeholder="e.g. B.Tech CSE"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Graduation Year *</label>
                              <select
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="2027">2027</option>
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="Earlier">Earlier</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Fields specific to FULL-TIME JOB */}
                        {formData.opportunityType === 'Full-Time Job' && (
                          <div className="grid md:grid-cols-3 gap-4 p-4 rounded-xl bg-accent/20 border border-border/40">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Current Employer</label>
                              <Input
                                name="currentCompany"
                                value={formData.currentCompany}
                                onChange={handleInputChange}
                                placeholder="e.g. Current Company"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Expected CTC</label>
                              <Input
                                name="expectedCtc"
                                value={formData.expectedCtc}
                                onChange={handleInputChange}
                                placeholder="e.g. 6 LPA / 10 LPA"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Notice Period *</label>
                              <select
                                name="noticePeriod"
                                value={formData.noticePeriod}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Immediate">Immediate</option>
                                <option value="15 Days">15 Days</option>
                                <option value="30 Days">30 Days</option>
                                <option value="60+ Days">60+ Days</option>
                              </select>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                    {/* BOOTCAMP FORM */}
                    {activeTab === 'bootcamp' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Bootcamp Track Interested In *</label>
                            <select
                              name="bootcampTrack"
                              value={formData.bootcampTrack}
                              onChange={handleInputChange}
                              required
                              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            >
                              <option value="Full Stack">Full Stack</option>
                              <option value="Data Engineer">Data Engineer</option>
                              <option value="Solutions Architect">Solutions Architect</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Current Skill Level *</label>
                            <select
                              name="skillLevel"
                              value={formData.skillLevel}
                              onChange={handleInputChange}
                              required
                              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Beginner (Basic programming knowledge)">Beginner (Basic programming knowledge)</option>
                              <option value="Intermediate (Built some personal projects)">Intermediate (Built some personal projects)</option>
                              <option value="College Student (CS / IT / Engineering)">College Student (CS / IT / Engineering)</option>
                              <option value="Working Professional (Career switch)">Working Professional (Career switch)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Preferred Learning Mode *</label>
                          <select
                            name="preferredMode"
                            value={formData.preferredMode}
                            onChange={handleInputChange}
                            required
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Weekend Live Sessions">Weekend Live Sessions (Interactive & Project-based)</option>
                            <option value="Weekday Evenings">Weekday Evenings</option>
                            <option value="Fast-Track Full-Time">Fast-Track Full-Time</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Profiles & Links */}
                  <div className="border-t border-border/40 pt-6">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs font-bold">3</span>
                      Profiles & Resume
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          LinkedIn Profile URL {activeTab === 'careers' && '*'}
                        </label>
                        <Input
                          type="url"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/username"
                          required={activeTab === 'careers'}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          GitHub / Portfolio URL
                        </label>
                        <Input
                          type="url"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleInputChange}
                          placeholder="https://github.com/username or website"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Resume / CV Link (Google Drive / Dropbox) {activeTab === 'careers' && '*'}
                      </label>
                      <Input
                        type="url"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/file/d/... (Set sharing to 'Anyone with link')"
                        required={activeTab === 'careers'}
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload your PDF to Google Drive or Dropbox and paste the shareable link with view access enabled.
                      </p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <label className="text-sm font-medium">
                        {activeTab === 'bootcamp' ? 'What are your learning goals?' : 'Why do you want to join Startworks? / Brief note'}
                      </label>
                      <Textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Tell us briefly about your background, achievements, or what you hope to achieve..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Submitting Application...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Application
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      By submitting, you agree to our privacy policy and consent to Startworks contacting you regarding this application.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Program Highlights & Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="font-semibold mb-2">Live Mentorship</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Work directly alongside seasoned engineers, AI architects, and domain experts on real production architectures.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-semibold mb-2">PPO & Hiring Pipeline</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                High-performing interns and bootcamp graduates are prioritized for full-time job offers and ongoing consulting roles.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-semibold mb-2">Enterprise Tech Stack</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gain hands-on experience with React, Next.js, Python, AI Agents, Cloud Data pipelines, and modern enterprise product ecosystems.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default ApplyPage;
