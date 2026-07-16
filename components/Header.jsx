import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    services: false,
    industries: false,
    resources: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    navigate(`/${id}`);
  };

  const selectServiceTab = (tabId) => {
    setMobileMenuOpen(false);
    navigate('/services');
    setTimeout(() => {
      const event = new CustomEvent('select-service-tab', { detail: { tabId } });
      window.dispatchEvent(event);
    }, 200);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navigateToCaseStudy = (id) => {
    setMobileMenuOpen(false);
    navigate(`/case-study/${id}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button onClick={() => { navigate('/'); setTimeout(() => { const hero = document.getElementById('hero'); if (hero) hero.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100); }} className="flex items-center cursor-pointer">
            <img src={`${import.meta.env.BASE_URL}${theme === 'dark' ? 'dark-cropeed.png' : 'light-logo-cropped.png'}`} alt="STARTWORKS" className={`object-contain transition-all duration-300 ${theme === 'dark' ? 'h-12 md:h-14' : 'h-8 md:h-10'}`} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              About Us
            </button>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                Services <ChevronDown className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-[36rem] bg-background border border-border shadow-lg rounded-lg opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                <div className="flex flex-row p-2">
                  <div className="w-1/2 flex flex-col">
                    <div className="w-full text-left px-4 py-2 text-sm text-foreground/80 font-semibold cursor-default">AI Transformation</div>
                    <button onClick={() => selectServiceTab('strategy')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">AI Strategy & Assessment</button>
                    <button onClick={() => selectServiceTab('agents')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Specialized AI Agents</button>
                    <button onClick={() => selectServiceTab('knowledge')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Internal Knowledge AI</button>
                    <button onClick={() => selectServiceTab('automation')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">AI Automation & Analytics</button>
                    <button onClick={() => selectServiceTab('governance')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">AI Governance & Training</button>
                  </div>
                  
                  <div className="w-1/2 flex flex-col border-l border-border/40 pl-2">
                    <div className="w-full text-left px-4 py-2 text-sm text-foreground/80 font-semibold cursor-default">Core Services</div>
                    <button onClick={() => selectServiceTab('analytics')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">AI-Powered Data Analytics</button>
                    <button onClick={() => selectServiceTab('consulting')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">AI-Consulting</button>
                    <button onClick={() => selectServiceTab('product')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Product building</button>
                    <button onClick={() => selectServiceTab('cloud')} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Cloud Data Engineering</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div className="relative group py-2">
              <button onClick={() => scrollToSection('industries')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                Industries <ChevronDown className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-background border border-border shadow-lg rounded-lg opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button onClick={() => scrollToSection('industries')} className="w-full text-left px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors">Healthcare</button>
                  <button onClick={() => scrollToSection('industries')} className="w-full text-left px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors">Manufacturing</button>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group py-2">
              <button onClick={() => scrollToSection('resources')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                Resources <ChevronDown className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-background border border-border shadow-lg rounded-lg opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button onClick={() => scrollToSection('resources')} className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors font-semibold">Case Studies</button>
                  <button onClick={() => navigateToCaseStudy(1)} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Case Study-1</button>
                  <button onClick={() => navigateToCaseStudy(2)} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Case Study-2</button>
                  <button onClick={() => navigateToCaseStudy(3)} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Case Study-3</button>
                  <button onClick={() => navigateToCaseStudy(4)} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Case Study-4</button>
                  <button onClick={() => navigateToCaseStudy(5)} className="w-full text-left px-4 py-1.5 text-sm text-foreground/85 hover:text-foreground hover:bg-accent transition-colors pl-6 text-xs">Case Study-5</button>
                  <button onClick={() => scrollToSection('resources')} className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors border-t border-border/50 mt-1 font-semibold">Blogs</button>
                </div>
              </div>
            </div>

            <button onClick={() => scrollToSection('events')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Events
            </button>
            <button onClick={() => scrollToSection('equibudx')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Equibudx
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/40 max-h-[80vh] overflow-y-auto">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              About Us
            </button>

            {/* Services Mobile */}
            <div>
              <button onClick={() => toggleMobileDropdown('services')} className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Services <ChevronDown className={`h-4 w-4 transform transition-transform ${mobileDropdowns.services ? 'rotate-180' : ''}`} />
              </button>
              {mobileDropdowns.services && (
                <div className="pl-4 space-y-1 bg-muted/30 py-1 rounded">
                  <div className="block w-full text-left px-2 py-1.5 text-xs text-foreground/80 font-semibold cursor-default">AI Transformation</div>
                  <button onClick={() => selectServiceTab('strategy')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">AI Strategy & Assessment</button>
                  <button onClick={() => selectServiceTab('agents')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">Specialized AI Agents</button>
                  <button onClick={() => selectServiceTab('knowledge')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">Internal Knowledge AI</button>
                  <button onClick={() => selectServiceTab('automation')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">AI Automation & Analytics</button>
                  <button onClick={() => selectServiceTab('governance')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">AI Governance & Training</button>

                  <div className="block w-full text-left px-2 py-1.5 text-xs text-foreground/80 border-t border-border/40 mt-1 font-semibold cursor-default">Core Services</div>
                  <button onClick={() => selectServiceTab('analytics')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">AI-Powered Data Analytics</button>
                  <button onClick={() => selectServiceTab('consulting')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">AI-Consulting</button>
                  <button onClick={() => selectServiceTab('product')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">Product building</button>
                  <button onClick={() => selectServiceTab('cloud')} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/70 hover:text-foreground">Cloud Data Engineering</button>
                </div>
              )}
            </div>

            {/* Industries Mobile */}
            <div>
              <button onClick={() => toggleMobileDropdown('industries')} className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Industries <ChevronDown className={`h-4 w-4 transform transition-transform ${mobileDropdowns.industries ? 'rotate-180' : ''}`} />
              </button>
              {mobileDropdowns.industries && (
                <div className="pl-4 space-y-1 bg-muted/30 py-1 rounded">
                  <button onClick={() => scrollToSection('industries')} className="block w-full text-left px-2 py-1.5 text-xs text-foreground/70 hover:text-foreground">Healthcare</button>
                  <button onClick={() => scrollToSection('industries')} className="block w-full text-left px-2 py-1.5 text-xs text-foreground/70 hover:text-foreground">Manufacturing</button>
                </div>
              )}
            </div>

            {/* Resources Mobile */}
            <div>
              <button onClick={() => toggleMobileDropdown('resources')} className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Resources <ChevronDown className={`h-4 w-4 transform transition-transform ${mobileDropdowns.resources ? 'rotate-180' : ''}`} />
              </button>
              {mobileDropdowns.resources && (
                <div className="pl-4 space-y-1 bg-muted/30 py-1 rounded">
                  <button onClick={() => scrollToSection('resources')} className="block w-full text-left px-2 py-1.5 text-xs text-foreground/70 hover:text-foreground font-semibold">Case Studies</button>
                  <button onClick={() => navigateToCaseStudy(1)} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/60 hover:text-foreground">Case Study-1</button>
                  <button onClick={() => navigateToCaseStudy(2)} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/60 hover:text-foreground">Case Study-2</button>
                  <button onClick={() => navigateToCaseStudy(3)} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/60 hover:text-foreground">Case Study-3</button>
                  <button onClick={() => navigateToCaseStudy(4)} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/60 hover:text-foreground">Case Study-4</button>
                  <button onClick={() => navigateToCaseStudy(5)} className="block w-full text-left px-4 py-1 text-[11px] text-foreground/60 hover:text-foreground">Case Study-5</button>
                  <button onClick={() => scrollToSection('resources')} className="block w-full text-left px-2 py-1.5 text-xs text-foreground/70 hover:text-foreground border-t border-border/40 mt-1 font-semibold">Blogs</button>
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('events')} className="block w-full text-left px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Events
            </button>
            <button onClick={() => scrollToSection('equibudx')} className="block w-full text-left px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Equibudx
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
