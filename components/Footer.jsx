import React from 'react';
import { Linkedin, Mail, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Advisors', href: '#advisors' },
      { name: 'Careers', href: '#contact' }
    ],
    products: [
      { name: 'Equibudx', href: '#equibudx' },
      { name: 'Solutions', href: '#about' },
      { name: 'Case Studies', href: '#contact' },
      { name: 'Documentation', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/equibudx/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/equibudx/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@Equibudx', label: 'YouTube' },
    { icon: Mail, href: '#contact', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-border/40">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/Startworks Logo.avif" alt="STARTWORKS Logo" className="h-8 w-8 object-contain rounded" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                STARTWORKS
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Building transformative technology solutions with expertise and vision.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-blue-600" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} STARTWORKS TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Proudly building <span className="text-blue-600 font-medium">Equibudx</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
