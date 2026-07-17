import { ShieldCheck, Network, Brain, FileText, BellRing } from 'lucide-react';

export const gxp = {
  id: 'gxp-regulatory',
  title: 'GXP Regulatory Intelligence',
  tagline: 'AI-powered global compliance tracking, safety alert ingestion, and audit auditing.',
  description: 'An advanced global regulatory monitoring and compliance system. GXP Regulatory Intelligence automates ingestion from FDA, Swissmedic, Health Canada, and FAMHP, converting unstructured medical safety reports and filings into structured, actionable insights.',
  icon: ShieldCheck,
  logo: 'gxp_group.png',
  techStack: ['Java 21', 'Spring Boot', 'Elasticsearch', 'Next.js 14', 'MySQL', 'Prisma ORM', 'AWS Bedrock & Textract'],
  metrics: [
    { label: 'Audit trail logging', value: '100', unit: '%' },
    { label: 'AI Ingestion & Analysis', value: '3.5', unit: 'sec' },
    { label: 'Monitored Agencies', value: '6', unit: '+' },
    { label: 'E2E Testing Pass Rate', value: '100', unit: '%' }
  ],
  idea: 'GXP Regulatory Intelligence was designed to eliminate the manual overhead of auditing global healthcare agencies. It automates compliance trails by scraping and processing multi-agency safety notices, device clearances, and clinical trials into a single source of truth.',
  about: 'GXP Regulatory Intelligence provides automated tools to monitor global regulatory feeds, translate international notices, and trigger real-time watchlist notifications. It enables life science and healthcare organizations to enforce compliance across their entire supply chain without manual tracking overhead.',
  pillars: [
    {
      title: 'AI-Driven Document Ingestion',
      desc: 'Leverages AWS Textract OCR and AWS Bedrock (Claude 3 Haiku) to parse, translate, and extract structured JSON summaries from scanned international safety corrective actions.'
    },
    {
      title: 'Global Compliance Sync',
      desc: 'Orchestrates background ETL pipelines synchronizing recalls, warnings, inspections, premarket approvals, and trials from FDA, Swissmedic, Health Canada, and ClinicalTrials.gov.'
    },
    {
      title: 'Proactive Watchlist Alerts',
      desc: 'Matches incoming alerts to user preferences, generating consolidated daily or weekly compliance alerts for monitored products and supply chain companies.'
    },
    {
      title: 'GxP Auditing & Security',
      desc: 'Enforces session limits, device tracking, and user login logs to produce comprehensive, compliant audit trails matching healthcare quality control frameworks.'
    }
  ],
  whyUs: [
    'Centralized visibility across FDA, Health Canada, Swissmedic, FAMHP, and USPTO.',
    'Automated AI-driven extraction and translation of foreign language field safety corrective actions.',
    'Proactive supply chain risk tracking with multi-site corporate watchlist preferences.',
    'Rigorous platform assurance backed by Cypress E2E automation and integrated ticketing pipelines.'
  ],
  stats: {
    audits: '100% Traceable',
    compliance: 'GxP & ISO Ready',
    type: 'Global Compliance Approach'
  }
};
