import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap, 
  UploadCloud, 
  FileText, 
  X, 
  Loader2,
  Check,
  ShieldCheck,
  Zap,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const GOOGLE_DRIVE_UPLOAD_URL = "https://script.google.com/macros/s/AKfycbwBb1TQjngROVAq2RxIpXzaVrNrgyhe4pBzuLi64kOPUbjGiaBC8ylxi7y5onl_j3iNhw/exec";

export const CareersPage = ({ defaultType = 'Internship' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const queryType = searchParams.get('type');
  
  const initialOpportunityType = queryType === 'job' 
    ? 'Full-Time Job' 
    : (defaultType === 'job' || defaultType === 'Full-Time Job' ? 'Full-Time Job' : 'Internship');

  const [opportunityType, setOpportunityType] = useState(initialOpportunityType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (queryType === 'job') setOpportunityType('Full-Time Job');
    if (queryType === 'internship') setOpportunityType('Internship');
  }, [queryType]);

  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolioUrl: '',
    additionalNotes: '',
    roleOrDomain: 'Full-Stack Development',
    
    // Internship specific
    collegeName: '',
    degreeBranch: '',
    graduationYear: '2026',
    internshipDuration: '3 Months',

    // Full-Time specific
    yearsOfExperience: '1-3 Years',
    currentCompany: '',
    expectedCtc: '',
    noticePeriod: 'Immediate'
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToForm = (type) => {
    setOpportunityType(type);
    setIsSuccess(false);
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size too large', { description: 'Please upload a PDF under 10MB.' });
      return;
    }
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf')) {
      toast.error('Invalid file type', { description: 'Please upload a PDF document.' });
      return;
    }
    setSelectedFile(file);
    toast.success('Resume selected', { description: `${file.name} ready for upload.` });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadResumeToDrive = async (file) => {
    const base64 = await fileToBase64(file);
    const fileExt = file.name.substring(file.name.lastIndexOf('.')) || '.pdf';
    const cleanName = formData.fullName?.trim() ? formData.fullName.trim().replace(/\s+/g, '_') : 'Candidate';
    const cleanFileName = `${cleanName}_Resume${fileExt}`;

    const payload = {
      fileName: cleanFileName,
      mimeType: file.type || 'application/pdf',
      base64: base64
    };

    const res = await fetch(GOOGLE_DRIVE_UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.status === 'success' && data.fileUrl) {
      return data.fileUrl;
    }
    throw new Error(data.message || 'Failed to save to Google Drive');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Resume is required', {
        description: 'Please upload your resume PDF to complete your application.'
      });
      return;
    }

    setIsSubmitting(true);
    let driveResumeUrl = 'Not Provided';

    try {
      if (selectedFile) {
        setSubmitStep('Saving resume to Google Drive...');
        driveResumeUrl = await uploadResumeToDrive(selectedFile);
      }

      setSubmitStep('Registering profile in Zoho CRM...');
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

      let company = 'Startworks Candidate';
      let designation = formData.roleOrDomain || 'Applicant';

      if (opportunityType === 'Internship') {
        company = formData.collegeName || 'Student';
        designation = `Intern - ${formData.roleOrDomain}`;
      } else {
        company = formData.currentCompany || 'Full-Time Candidate';
        designation = formData.roleOrDomain;
      }

      zohoFormData.append('Company', company);
      zohoFormData.append('Designation', designation);

      let description = `=== CAREERS APPLICATION DETAILS ===
Type: ${opportunityType}
Role / Domain: ${formData.roleOrDomain}
`;

      if (opportunityType === 'Internship') {
        description += `College: ${formData.collegeName || 'N/A'}
Branch: ${formData.degreeBranch || 'N/A'}
Graduation Year: ${formData.graduationYear || 'N/A'}
Available Duration: ${formData.internshipDuration || 'N/A'}
`;
      } else {
        description += `Total Experience: ${formData.yearsOfExperience || 'N/A'}
Current Employer: ${formData.currentCompany || 'N/A'}
Expected CTC: ${formData.expectedCtc || 'N/A'}
Notice Period: ${formData.noticePeriod || 'N/A'}
`;
      }

      description += `
=== RESUME & PROFILES ===
Google Drive Resume: ${driveResumeUrl}
LinkedIn: ${formData.linkedIn || 'N/A'}
Portfolio / GitHub: ${formData.portfolioUrl || 'N/A'}
Candidate Note: ${formData.additionalNotes || 'N/A'}
`;

      zohoFormData.append('Description', description);

      await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
        method: 'POST',
        body: zohoFormData,
        mode: 'no-cors',
        cache: 'no-cache'
      });

      setIsSuccess(true);
      toast.success('Application submitted successfully!', {
        description: 'Your resume has been saved and your application is registered in Zoho CRM.'
      });
      setFormData(initialFormData);
      setSelectedFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong during submission.', {
        description: 'Please try again or email us directly at ramesh@startworks.in'
      });
    } finally {
      setIsSubmitting(false);
      setSubmitStep('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pb-28 border-b border-border/40">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[130px]" />
          <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center text-xs md:text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-3.5 w-3.5 mx-2 opacity-50" />
            <span className="text-foreground font-medium">Careers & Internships</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left Photo - Live Code Reviews Workstation */}
            <div className="hidden lg:block lg:col-span-3">
              <div 
                onClick={() => scrollToForm('Internship')}
                className="group relative cursor-pointer transform -rotate-1 hover:rotate-0 translate-y-3 hover:translate-y-1 transition-all duration-500 ease-out"
                title="Click to apply for Internship"
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-card shadow-xl">
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-developer.jpg`} 
                    alt="Live Code Reviews and Engineering Workstation"
                    className="w-full h-80 xl:h-[350px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 left-3 bg-background/90 dark:bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-border/60 shadow flex items-center gap-1.5 z-10">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-foreground">1-on-1 Mentorship</span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pt-10 pointer-events-none">
                    <p className="text-sm font-bold leading-tight">Live Code Reviews</p>
                    <p className="text-[11px] text-zinc-300 mt-0.5">Real-time PR reviews & active mentorship</p>
                    <div className="mt-2.5 flex items-center text-xs text-blue-300 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore Internships <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Where Ambition Meets{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Real Engineering.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Join our core product and AI engineering teams. From undergraduate interns building live product features to senior consultants shaping enterprise systems, we cultivate talent with deep ownership, continuous mentorship, and fast growth.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button 
                  onClick={() => scrollToForm('Internship')} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 h-12 px-6 font-semibold"
                >
                  Apply for Internship
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => scrollToForm('Full-Time Job')} 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-6 font-semibold border-border hover:bg-accent"
                >
                  View Full-Time Roles
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Mobile / Tablet Staggered Unaligned Preview */}
              <div className="lg:hidden grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto text-left">
                <div 
                  onClick={() => scrollToForm('Internship')}
                  className="group relative cursor-pointer -rotate-1 hover:rotate-0 transition-all duration-300 rounded-2xl overflow-hidden border border-border/70 shadow-lg"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-developer.jpg`} 
                    alt="Live Code Reviews"
                    className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] font-bold">Live Code Reviews</p>
                    <p className="text-[9px] text-zinc-300">1-on-1 PR Reviews</p>
                  </div>
                </div>

                <div 
                  onClick={() => scrollToForm('Full-Time Job')}
                  className="group relative cursor-pointer rotate-1 hover:rotate-0 transition-all duration-300 rounded-2xl overflow-hidden border border-border/70 shadow-lg"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-team.jpg`} 
                    alt="Full-Time Engineering"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] font-bold">Full-Time Roles</p>
                    <p className="text-[9px] text-zinc-300">Core Engineering</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photo - Balanced with subtle depth */}
            <div className="hidden lg:block lg:col-span-3">
              <div 
                onClick={() => scrollToForm('Full-Time Job')}
                className="group relative cursor-pointer transform rotate-1 hover:rotate-0 translate-y-3 hover:translate-y-1 transition-all duration-500 ease-out"
                title="Click to explore Full-Time roles"
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-card shadow-xl">
                  <img 
                    src={`${import.meta.env.BASE_URL}careers-team.jpg`} 
                    alt="Startworks Tech Team"
                    className="w-full h-80 xl:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/40 shadow flex items-center gap-1.5 text-white z-10">
                    <Sparkles className="h-3 w-3 text-cyan-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Hiring Active</span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pt-10 pointer-events-none">
                    <p className="text-sm font-bold leading-tight">Startworks Tech Hub</p>
                    <p className="text-[11px] text-zinc-300 mt-0.5">Visakhapatnam • Core Team</p>
                    <div className="mt-2.5 flex items-center text-xs text-cyan-300 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore Full-Time Roles <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW (INTERNSHIPS & FULL-TIME) */}
      <section className="py-20 lg:py-24 bg-muted/10 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Two Paths to Join Our Team
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Whether you are currently pursuing your degree or bringing industry experience, here is what you can expect when you join Startworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* CARD 1: INTERNSHIP PROGRAM */}
            <Card className="flex flex-col justify-between border-border/60 hover:border-blue-600/60 transition-all duration-300 hover:shadow-xl group bg-card">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">Students & Freshers</Badge>
                </div>
                <CardTitle className="text-2xl font-bold">Internship Program</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Gain enterprise experience by working on real client deployments and core products instead of simulated dummy tasks.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2.5 pt-2 border-t border-border/40">
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> 2 to 6 Months (Tailored to college semesters)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mentorship:</strong> 1-on-1 code reviews with senior engineering leads</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Tech Stack:</strong> React, Next.js, Python, AI Agents, Cloud pipelines</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Perks:</strong> Monthly stipend, certificate, and fast-track PPO full-time offer</span>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToForm('Internship')}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-11"
                >
                  Apply for Internship
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>

            {/* CARD 2: FULL-TIME ROLES */}
            <Card className="flex flex-col justify-between border-blue-500/40 hover:border-blue-600 transition-all duration-300 shadow-lg ring-1 ring-blue-500/20 group bg-card">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <Badge className="bg-indigo-600 text-white text-xs font-medium">Core Engineering</Badge>
                </div>
                <CardTitle className="text-2xl font-bold">Full-Time Careers</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Join our fast-paced product engineering and AI consulting teams to own critical modules and solve tough enterprise problems.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2.5 pt-2 border-t border-border/40">
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Active Roles:</strong> Full-Stack Engineer, AI/ML Specialist, Cloud Architect</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Culture:</strong> High autonomy, zero corporate bureaucracy, rapid ownership</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Perks:</strong> Competitive compensation, project bonuses, and health support</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Hiring Timeline:</strong> Profile Review $\rightarrow$ Tech Round $\rightarrow$ Offer in 3–5 days</span>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToForm('Full-Time Job')}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs h-11 shadow-md"
                >
                  Apply for Full-Time Roles
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM ANCHOR */}
      <section ref={formSectionRef} id="apply-form" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Submit Your Job Application
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Attach your resume PDF below. Our recruitment leads review applications within 2 business days.
            </p>
          </div>

          {isSuccess ? (
            <Card className="border-border/60 shadow-xl text-center py-16 px-6">
              <CardContent className="space-y-6 flex flex-col items-center max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Application Submitted!</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Thank you for applying. Your resume has been safely stored, and your profile is registered in our Zoho CRM. Our recruitment team will review your application and contact you soon.
                  </p>
                </div>
                <div className="flex gap-3 pt-4 w-full">
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="flex-1">
                    Submit Another
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
                      {opportunityType === 'Internship' ? 'Internship Application' : 'Full-Time Job Application'}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm mt-1">
                      Fill out your contact details and upload your latest resume.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="hidden sm:inline-flex text-xs px-3 py-1 font-medium">
                    {opportunityType === 'Internship' ? 'Student / Fresher' : 'Experienced'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Selector for Internship vs Full-Time */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Select Path *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOpportunityType('Internship')}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                          opportunityType === 'Internship'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                            : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                        }`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span>Internship</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpportunityType('Full-Time Job')}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                          opportunityType === 'Full-Time Job'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                            : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                        }`}
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Full-Time Role</span>
                      </button>
                    </div>
                  </div>

                  {/* SECTION 1: PERSONAL INFORMATION */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      1. Contact Information
                    </h3>

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
                  </div>

                  {/* SECTION 2: PROFESSIONAL OR ACADEMIC DETAILS */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      2. Role & {opportunityType === 'Internship' ? 'Academic Details' : 'Experience Details'}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/90">Role / Domain *</label>
                        <select
                          name="roleOrDomain"
                          value={formData.roleOrDomain}
                          onChange={handleInputChange}
                          required
                          className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                      {opportunityType === 'Internship' ? (
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Available Duration *</label>
                          <select
                            name="internshipDuration"
                            value={formData.internshipDuration}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="2-3 Months">2 - 3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="Immediate / Long Term">Immediate / Long Term</option>
                          </select>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Total Years of Experience *</label>
                          <select
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="0-1 Years">0 - 1 Years (Entry Level)</option>
                            <option value="1-3 Years">1 - 3 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5+ Years">5+ Years (Senior)</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* INTERNSHIP FIELDS */}
                    {opportunityType === 'Internship' && (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">College / University *</label>
                          <Input
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleInputChange}
                            placeholder="e.g. Andhra University"
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Degree & Branch *</label>
                          <Input
                            name="degreeBranch"
                            value={formData.degreeBranch}
                            onChange={handleInputChange}
                            placeholder="e.g. B.Tech CSE"
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Graduation Year *</label>
                          <select
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="2028">2028</option>
                            <option value="2027">2027</option>
                            <option value="2026">2026</option>
                            <option value="Earlier">Earlier</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* FULL-TIME FIELDS */}
                    {opportunityType === 'Full-Time Job' && (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Current Employer</label>
                          <Input
                            name="currentCompany"
                            value={formData.currentCompany}
                            onChange={handleInputChange}
                            placeholder="e.g. TCS / Freelancer"
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Expected CTC</label>
                          <Input
                            name="expectedCtc"
                            value={formData.expectedCtc}
                            onChange={handleInputChange}
                            placeholder="e.g. 6 LPA / 10 LPA"
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Notice Period *</label>
                          <select
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                  {/* SECTION 3: RESUME UPLOAD & PROFILES */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      3. Resume (PDF) & Profiles
                    </h3>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground/90 flex items-center justify-between">
                        <span>Upload Resume (PDF) *</span>
                        <span className="text-[11px] text-muted-foreground">Stored securely in Google Drive</span>
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                        className="hidden"
                        id="resume-file-upload"
                      />

                      {!selectedFile ? (
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                            isDragging 
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30' 
                              : 'border-border/70 hover:border-blue-500/60 bg-muted/20 hover:bg-accent/20'
                          }`}
                        >
                          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Click to upload or drag & drop your resume
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Supported format: PDF, DOC, DOCX (Max: 10MB)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-blue-500/40 bg-blue-50/40 dark:bg-blue-950/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-blue-600 text-white">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground truncate max-w-[260px] md:max-w-md">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Google Drive upload
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/90">LinkedIn Profile URL *</label>
                        <Input
                          type="url"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/username"
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/90">GitHub / Portfolio URL</label>
                        <Input
                          type="url"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleInputChange}
                          placeholder="https://github.com/username"
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/90">Cover Note / Brief Pitch</label>
                      <Textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Briefly tell us about your key skills, projects, or why you want to join Startworks..."
                        className="resize-none"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-sm md:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>{submitStep || 'Submitting Application...'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Application
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground mt-3">
                      By submitting, your resume is saved to Google Drive and your application is sent to Startworks Zoho CRM.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

        </div>
      </section>

      {/* 4. CULTURE HIGHLIGHTS */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Senior Mentorship</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Work directly alongside seasoned tech leads and domain architects who review your code and guide your technical architecture decisions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">PPO & Fast Career Track</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We believe in promoting from within. High-performing interns are prioritized for ongoing engineering and consulting roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Modern Enterprise Stack</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gain hands-on proficiency with React, Next.js, Python, Specialized AI Agents, and robust Cloud Data pipelines deployed in production.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default CareersPage;
