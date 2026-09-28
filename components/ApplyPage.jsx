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
  Loader2
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

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get('tab');
  const queryType = searchParams.get('type');
  
  const resolveTab = () => {
    if (queryTab === 'bootcamp' || defaultTab === 'bootcamp') return 'bootcamp';
    return 'careers';
  };

  const [activeTab, setActiveTab] = useState(resolveTab());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(''); // 'uploading_drive' | 'saving_zoho' | ''
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    // Contact
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolioUrl: '',
    additionalNotes: '',

    // Careers / Internship Type
    opportunityType: queryType === 'job' ? 'Full-Time Job' : (defaultTab === 'hiring' ? 'Full-Time Job' : 'Internship'),
    roleOrDomain: 'Full-Stack Development',
    
    // Internship Details
    collegeName: '',
    degreeBranch: '',
    graduationYear: '2026',
    internshipDuration: '3 Months',

    // Full-Time Details
    yearsOfExperience: '1-3 Years',
    currentCompany: '',
    expectedCtc: '',
    noticePeriod: 'Immediate',

    // Bootcamp Details
    bootcampTrack: 'Full Stack',
    skillLevel: 'Beginner (Basic programming knowledge)',
    preferredMode: 'Weekend Live Sessions',
    learningGoal: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSuccess(false);
  };

  // File Upload Handlers
  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size too large', {
        description: 'Please upload a PDF under 10MB.'
      });
      return;
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf')) {
      toast.error('Invalid file type', {
        description: 'Please upload a PDF or Word document.'
      });
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

  // Convert File to Base64
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

  // Upload to Google Drive via Apps Script
  const uploadResumeToDrive = async (file) => {
    const base64 = await fileToBase64(file);
    const payload = {
      fileName: `${formData.fullName.replace(/\s+/g, '_')}_Resume_${file.name}`,
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
      // 1. Upload Resume PDF to Google Drive
      if (selectedFile) {
        setSubmitStep('Saving resume to Google Drive...');
        driveResumeUrl = await uploadResumeToDrive(selectedFile);
      }

      // 2. Prepare Zoho CRM Lead Form Data
      setSubmitStep('Registering profile in Zoho CRM...');
      const zohoFormData = new FormData();
      
      zohoFormData.append('xnQsjsdp', 'd6fb06afd10582600b0bb527466265ecb37accf548464e6d9da204e81479449b');
      zohoFormData.append('zc_gad', '');
      zohoFormData.append('xmIwtLD', '119e04573effde9ace59fac71b98e1b9d10ac17e0eef1e38a2d3b621e1f27f59789ceab68380aa2cc4ada2a6e91024bb');
      zohoFormData.append('actionType', 'TGVhZHM=');
      zohoFormData.append('returnURL', 'null');
      zohoFormData.append('aG9uZXlwb3Q', '');

      // Name Splitting
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '.';

      zohoFormData.append('First Name', firstName);
      zohoFormData.append('Last Name', lastName);
      zohoFormData.append('Email', formData.email);
      zohoFormData.append('Phone', formData.phone);
      zohoFormData.append('City', formData.city);
      zohoFormData.append('State', formData.city);

      // Map Company and Title
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

      // Structured Description with Google Drive Resume link
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
Preferred Mode: ${formData.preferredMode}
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

      // 3. Submit directly to Zoho CRM
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
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-border/40">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[130px]" />
          <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-10" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center text-xs md:text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronRight className="h-3.5 w-3.5 mx-2 opacity-50" />
            <span className="text-foreground font-medium">Careers & Programs</span>
          </nav>

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Join Startworks or Learn With Us</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Apply to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Startworks
              </span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground">
              Select your path below to apply for full-time engineering roles, hands-on internships, or our practical tech bootcamps.
            </p>
          </div>

          {/* Primary Path Switcher */}
          <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-10 p-1.5 rounded-2xl bg-muted/50 border border-border/50">
            <button
              type="button"
              onClick={() => handleTabChange('careers')}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
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
              onClick={() => handleTabChange('bootcamp')}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'bootcamp'
                  ? 'bg-background text-foreground shadow-md border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Rocket className="h-4 w-4 text-indigo-600" />
              <span>Bootcamp Learning</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Form Container */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
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
                          placeholder="e.g. Visakhapatnam / Hyderabad"
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

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground/90">Preferred Learning Mode *</label>
                          <select
                            name="preferredMode"
                            value={formData.preferredMode}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Weekend Live Sessions">Weekend Live Sessions (Interactive & Project-based)</option>
                            <option value="Weekday Evenings">Weekday Evenings</option>
                            <option value="Fast-Track Full-Time">Fast-Track Full-Time</option>
                          </select>
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
                          <span className="text-[11px] text-muted-foreground">Saved to Google Drive</span>
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

          {/* Program Highlights */}
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm mb-1.5">Senior Mentorship</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Work directly with experienced engineers on live AI, cloud, and modern web architectures.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm mb-1.5">PPO & Career Pathway</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                High-performing interns and bootcamp graduates are prioritized for ongoing engineering roles.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/50 bg-card/60 backdrop-blur">
              <div className="h-9 w-9 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center mb-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm mb-1.5">Enterprise Tech Stack</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Build real features using React, Next.js, Python, AI Agents, and scalable cloud data pipelines.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default ApplyPage;
