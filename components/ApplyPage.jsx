import React, { useState, useEffect, useRef } from 'react';
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
  GraduationCap, 
  UploadCloud, 
  FileText, 
  X, 
  Loader2,
  Code2,
  Database,
  Layers,
  Clock,
  Compass,
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

export const ApplyPage = ({ defaultTab = 'careers' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get('tab');
  const queryType = searchParams.get('type');
  
  const resolveTab = () => {
    if (queryTab === 'bootcamp' || defaultTab === 'bootcamp') return 'bootcamp';
    return 'careers';
  };

  const [activeTab, setActiveTab] = useState(resolveTab());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolioUrl: '',
    additionalNotes: '',

    opportunityType: queryType === 'job' ? 'Full-Time Job' : (defaultTab === 'hiring' ? 'Full-Time Job' : 'Internship'),
    roleOrDomain: 'Full-Stack Development',
    
    collegeName: '',
    degreeBranch: '',
    graduationYear: '2026',
    internshipDuration: '3 Months',

    yearsOfExperience: '1-3 Years',
    currentCompany: '',
    expectedCtc: '',
    noticePeriod: 'Immediate',

    bootcampTrack: 'Full Stack',
    skillLevel: 'Beginner (Basic programming knowledge)',
    learningGoal: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToForm = (tab, type = null, track = null) => {
    setActiveTab(tab);
    if (type) {
      setFormData(prev => ({ ...prev, opportunityType: type }));
    }
    if (track) {
      setFormData(prev => ({ ...prev, bootcampTrack: track }));
    }
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

    if (activeTab === 'careers' && !selectedFile) {
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

      let description = `=== APPLICATION DETAILS ===
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
          description += `Total Experience: ${formData.yearsOfExperience || 'N/A'}
Current Employer: ${formData.currentCompany || 'N/A'}
Expected CTC: ${formData.expectedCtc || 'N/A'}
Notice Period: ${formData.noticePeriod || 'N/A'}
`;
        }
      } else {
        description += `Bootcamp Track: ${formData.bootcampTrack}
Skill Level: ${formData.skillLevel}
Goals: ${formData.learningGoal || 'N/A'}
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
      
      {/* ========================================================
          1. HERO SECTION: BRANDING & STORYTELLING
          ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pb-28 border-b border-border/40">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[130px]" />
          <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs md:text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-3.5 w-3.5 mx-2 opacity-50" />
            <span className="text-foreground font-medium">Careers, Internships & Bootcamps</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                <span>Shape the Next Era of AI & Cloud</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Where Ambition Meets{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Real Engineering.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                At Startworks, we build transformative AI platforms, cloud data pipelines, and mission-critical enterprise systems. Whether you are stepping in as an intern, joining our core engineering team, or advancing your career through our intensive bootcamps — you will work on real architectures from Day 1.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  onClick={() => scrollToForm('careers')} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 h-12 px-6 font-semibold"
                >
                  Explore Opportunities
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => scrollToForm('bootcamp')} 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-6 font-semibold border-border hover:bg-accent"
                >
                  Bootcamp Programs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Value Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span>Real Enterprise Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                  <span>1-on-1 Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                  <span>Fast-Track PPO Hiring</span>
                </div>
              </div>
            </div>

            {/* Right Media Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border/60 bg-muted/30 group">
                <img 
                  src={`${import.meta.env.BASE_URL}careers-team.jpg`} 
                  alt="Startworks Engineering & Learning Community"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to elegant gradient if image not found
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Highlights Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-background/80 backdrop-blur-md border border-border/60 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-foreground">Innovate with Startworks</p>
                      <p className="text-[11px] text-muted-foreground">Visakhapatnam</p>
                    </div>
                    <Badge variant="default" className="bg-blue-600 text-[10px] uppercase font-bold">
                      Open Positions
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. DETAILED PROGRAM EXPLANATION ("WHAT WILL BE THERE")
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-muted/10 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/60 dark:bg-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Compass className="h-3.5 w-3.5" />
              <span>Three Pathways to Accelerate Your Career</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Choose the Journey That Fits Your Goals
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              We provide structured environments where you tackle real challenges, build scalable enterprise architectures, and work alongside seasoned industry practitioners.
            </p>
          </div>

          {/* 3 Detailed Program Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* PATHWAY 1: INTERNSHIP PROGRAM */}
            <Card className="flex flex-col justify-between border-border/60 hover:border-blue-600/60 transition-all duration-300 hover:shadow-xl group bg-card">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">Students & Fresh Grads</Badge>
                </div>
                <CardTitle className="text-xl font-bold">Internship Program</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Gain industry-grade experience by working on real client deployments and core products instead of simulated dummy tasks.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2.5 pt-2 border-t border-border/40">
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> 2 to 6 Months (Flexible with college schedules)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mentorship:</strong> 1-on-1 pairing with a senior software architect</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Tech Stack:</strong> React, Next.js, Python, LangChain, Cloud</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Outcome:</strong> Experience letter, stipend, and fast-track PPO offer</span>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToForm('careers', 'Internship')}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-10"
                >
                  Apply for Internship
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>

            {/* PATHWAY 2: FULL-TIME CAREERS */}
            <Card className="flex flex-col justify-between border-blue-500/40 hover:border-blue-600 transition-all duration-300 shadow-lg ring-1 ring-blue-500/20 group bg-card">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <Badge className="bg-indigo-600 text-white text-xs font-medium">Core Engineering</Badge>
                </div>
                <CardTitle className="text-xl font-bold">Full-Time Careers</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Join our fast-paced product engineering and AI consulting teams to own critical modules and solve tough enterprise problems.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2.5 pt-2 border-t border-border/40">
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Active Roles:</strong> Full-Stack, AI/ML, Cloud Data & DevOps</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Culture:</strong> High autonomy, zero bureaucracy, rapid growth</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Compensation:</strong> Competitive salary, performance bonus, and perks</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Hiring Flow:</strong> Profile Review $\rightarrow$ Tech Round $\rightarrow$ Offer in 5 days</span>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToForm('careers', 'Full-Time Job')}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs h-10 shadow-md"
                >
                  Apply for Full-Time Roles
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>

            {/* PATHWAY 3: BOOTCAMP LEARNING */}
            <Card className="flex flex-col justify-between border-border/60 hover:border-cyan-600/60 transition-all duration-300 hover:shadow-xl group bg-card">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs font-medium border-cyan-500 text-cyan-600">Upskilling & Jobs</Badge>
                </div>
                <CardTitle className="text-xl font-bold">Bootcamp Learning</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Rigorous, industry-mapped bootcamps with 3 specialized tracks taught by working practitioners with placement support.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2.5 pt-2 border-t border-border/40">
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span><strong>1. Full Stack Track:</strong> MERN, Next.js, Microservices, APIs</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span><strong>2. Data Engineer Track:</strong> ETL/ELT, PostgreSQL, Cloud Warehousing</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span><strong>3. Solutions Architect Track:</strong> System Design & Scalability</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Format:</strong> Weekend live interactive sessions + real Capstones</span>
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToForm('bootcamp', null, 'Full Stack')}
                  className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs h-10"
                >
                  Enroll in Bootcamp
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. APPLICATION & REGISTRATION FORM (ANCHOR)
          ======================================================== */}
      <section ref={formSectionRef} id="apply-form" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Complete your application below. All resumes are stored securely and reviewed by our talent leads.
            </p>
          </div>

          {/* Form Path Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-8 p-1.5 rounded-2xl bg-muted/50 border border-border/50">
            <button
              type="button"
              onClick={() => { setActiveTab('careers'); setIsSuccess(false); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'careers'
                  ? 'bg-background text-foreground shadow-md border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span>Careers & Internships</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('bootcamp'); setIsSuccess(false); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'bootcamp'
                  ? 'bg-background text-foreground shadow-md border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Rocket className="h-4 w-4 text-cyan-600" />
              <span>Bootcamp Learning</span>
            </button>
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
                      {activeTab === 'careers' ? 'Careers & Internship Application' : 'Bootcamp Registration Form'}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm mt-1">
                      {activeTab === 'careers' 
                        ? 'Join our engineering and product teams as an intern or full-time engineer.'
                        : 'Enroll in our industry-ready engineering bootcamp with live capstones.'}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="hidden sm:inline-flex text-xs px-3 py-1 font-medium">
                    {activeTab === 'careers' ? 'Hiring Active' : 'Admissions Open'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* --- SUB-SWITCHER FOR CAREERS --- */}
                  {activeTab === 'careers' && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Select Application Type *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, opportunityType: 'Internship' }))}
                          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                            formData.opportunityType === 'Internship'
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                              : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                          }`}
                        >
                          <GraduationCap className="h-4 w-4" />
                          <span>Internship</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, opportunityType: 'Full-Time Job' }))}
                          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                            formData.opportunityType === 'Full-Time Job'
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                              : 'border-border/60 hover:bg-accent/40 text-muted-foreground'
                          }`}
                        >
                          <Briefcase className="h-4 w-4" />
                          <span>Full-Time Role</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 1: PERSONAL INFORMATION --- */}
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

                  {/* --- SECTION 2: PROGRAM SPECIFIC DETAILS --- */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {activeTab === 'careers' ? '2. Role & Academic / Experience Details' : '2. Bootcamp Track & Preferences'}
                    </h3>

                    {/* CAREERS: Common Role dropdown */}
                    {activeTab === 'careers' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground/90">Target Role / Domain *</label>
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

                          {formData.opportunityType === 'Internship' ? (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-foreground/90">Internship Duration *</label>
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

                        {/* INTERNSHIP SPECIFIC */}
                        {formData.opportunityType === 'Internship' && (
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
                                <option value="2027">2027</option>
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="Earlier">Earlier</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* FULL-TIME SPECIFIC */}
                        {formData.opportunityType === 'Full-Time Job' && (
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
                    )}

                    {/* BOOTCAMP FORM */}
                    {activeTab === 'bootcamp' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground/90">Bootcamp Track Interested In *</label>
                            <select
                              name="bootcampTrack"
                              value={formData.bootcampTrack}
                              onChange={handleInputChange}
                              required
                              className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            >
                              <option value="Full Stack">Full Stack</option>
                              <option value="Data Engineer">Data Engineer</option>
                              <option value="Solutions Architect">Solutions Architect</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground/90">Current Skill Level *</label>
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
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- SECTION 3: RESUME PDF DROPZONE & PROFILES --- */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      3. {activeTab === 'careers' ? 'Resume Upload (PDF) & Profiles' : 'Profiles & Learning Goals'}
                    </h3>

                    {/* DRAG AND DROP RESUME UPLOADER */}
                    {activeTab === 'careers' && (
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
                    )}

                    {/* LINKS GRID */}
                    <div className="grid md:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/90">
                          LinkedIn Profile URL {activeTab === 'careers' && '*'}
                        </label>
                        <Input
                          type="url"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/username"
                          required={activeTab === 'careers'}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/90">
                          GitHub / Portfolio URL
                        </label>
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
                      <label className="text-xs font-medium text-foreground/90">
                        {activeTab === 'bootcamp' ? 'Learning Goals / Background' : 'Cover Note / Brief Pitch'}
                      </label>
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
                          <span>{submitStep || 'Submitting...'}</span>
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

      {/* ========================================================
          4. CULTURE & PERKS HIGHLIGHTS
          ======================================================== */}
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
                We believe in promoting from within. High-performing interns and bootcamp graduates are prioritized for ongoing engineering and consulting roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base mb-2">Modern Enterprise Stack</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gain hands-on proficiency with React, Next.js, Python, Specialized AI Agents, and robust Cloud Data pipelines deployed on modern cloud platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default ApplyPage;
