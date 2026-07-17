import { Receipt, ShieldCheck, Zap, Database } from 'lucide-react';

export const qreceipts = {
  id: 'qreceipts',
  title: 'Qreceipts',
  tagline: 'Digital receipts solution for tomorrow.',
  description: 'A revolutionary digital receipt and billing solution that automates document capture, expense tracking, and invoicing. Fully integrated with ComplyIQ’s compliance framework, Qreceipts transforms business transaction management across India, the UAE, and the GCC.',
  icon: Receipt,
  logo: 'qreceipts_logo.jpg',
  techStack: ['Node.js', 'React', 'PostgreSQL', 'AWS Lambda', 'OCR Automation', 'ERP Integration'],
  metrics: [
    { label: 'OCR Speed', value: '1.2', unit: 'sec' },
    { label: 'Data Accuracy', value: '99.8', unit: '%' },
    { label: 'Active ERP Connections', value: '150', unit: '+' },
    { label: 'GCC Compliance', value: '100', unit: '%' }
  ],
  idea: 'Qreceipts was born from a desire to eliminate paper waste and manual processing friction for corporate travel and retail purchases. By parsing dynamic transactional receipts into structured database models, businesses can claim tax offsets and automate expense audits seamlessly.',
  about: 'At ComplyIQ, we believe compliance is more than a statutory requirement—it’s the foundation of trust, efficiency, and growth. We simplify complexity by combining people, process, technology, and data to deliver smarter compliance solutions.',
  pillars: [
    {
      title: 'People – Advisory & Outsourcing',
      desc: 'Our specialists manage VAT, GST, e-invoicing, and corporate tax compliance with precision, freeing finance leaders to focus on core business strategies.'
    },
    {
      title: 'Process – Design & Reengineer',
      desc: 'We build audit-ready, scalable, and future-proof compliance workflows that integrate seamlessly with your existing ERP and reporting systems.'
    },
    {
      title: 'Technology – Automate & Manage',
      desc: 'We implement and manage tax technology, ERP tax design, and automation tools, including e-invoicing platforms and robotic process automation (RPA).'
    },
    {
      title: 'Data – Governance & Management',
      desc: 'We design governance frameworks for master data covering HS codes, tax codes, and entity data to ensure error-free, audit-ready filings.'
    }
  ],
  whyUs: [
    'Regional expertise in India, UAE, and GCC tax regulations.',
    'Integrated approach combining expert advisory, process engineering, and modern technology.',
    'Future-ready solutions leveraging automation, ERP integrations, and strict data governance.',
    'Trusted partner delivering error-free, audit-ready compliance reporting.'
  ],
  stats: {
    followers: '656+',
    employees: '2-10',
    location: 'Guwahati, India',
    type: 'Low-Touch Digital Receipts'
  }
};
