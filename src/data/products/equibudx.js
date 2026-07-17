import { Activity, ShieldCheck, Zap, Layers } from 'lucide-react';

export const equibudx = {
  id: 'equibudx',
  title: 'Equibudx',
  tagline: 'Enterprise-grade coach bookings, payments, and settlements ecosystem.',
  description: 'An enterprise platform designed to manage coach registration, structured profiles, availability coordinates, and booking transactions. Seamlessly integrated with Cashfree gateway checkouts, it automates bank credentials verification, webhooks, and payout ledger settlements.',
  icon: Activity,
  logo: 'EquiBudX_icon.png',
  techStack: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'AWS Secrets Manager', 'AWS S3', 'Cashfree Gateway'],
  metrics: [
    { label: 'Secrets Fetching', value: '0.6', unit: 'sec' },
    { label: 'Uptime Reliability', value: '99.95', unit: '%' },
    { label: 'API Response Time', value: '30', unit: 'ms' },
    { label: 'Webhook Processing', value: '100', unit: '%' }
  ],
  idea: 'Equibudx (Katha) was conceptualized to solve the complex onboarding, booking coordination, and tax compliance overhead for large coaching portals. It implements automated PAN and Bank Info verification checks alongside direct ledger settlements and TDS withholding logs.',
  about: 'The system coordinates multi-tier subscriptions, dynamic session slots, and payout balances using MySQL databases, keeping access credentials secure via AWS cloud configuration managers.',
  pillars: [
    {
      title: 'AWS Secrets Manager',
      desc: 'Fetches database access configurations dynamically from the cloud ap-south-1 region at runtime, preventing hardcoded local credentials.'
    },
    {
      title: 'Cashfree Gateway Settlements',
      desc: 'Orchestrates checkout payments, dynamic subscription transactions, webhook listeners, and direct coach bank settlements.'
    },
    {
      title: 'Relational MySQL Schemas',
      desc: 'Designs highly indexed relational database structures mapping user follows, coach profile approvals, bookings, and financial ledgers.'
    },
    {
      title: 'TDS & Tax Compliance',
      desc: 'Calculates transaction deductions automatically, recording all withheld TDS amounts inside centralized audit logs for finance teams.'
    }
  ],
  whyUs: [
    'Cloud-secured configurations using AWS Secrets Manager credentials.',
    'End-to-end coach bookings, slot schedules, and checkouts.',
    'Built-in automated identity, PAN, and bank info verification checks.',
    'Complete financial settlement logs with automated TDS compliance audits.'
  ],
  stats: {
    perf: 'Sub-second Latency',
    security: 'AWS Secured',
    tier: 'Enterprise Solution',
    type: 'Marketplace'
  }
};
