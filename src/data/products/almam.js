import { Users, Sparkles, Database, Search } from 'lucide-react';

export const almam = {
  id: 'almam',
  title: 'AlmaM',
  tagline: 'AI-powered matchmaking ecosystem for startups and investors.',
  description: 'A custom, fully decoupled high-performance networking platform connecting founders, investors, advisors, and experts across 30+ countries. Built to eliminate the friction of cold-outreach, it enables warm context-aware introductions.',
  icon: Users,
  logo: 'logo-almam-DZoxfMad.png',
  techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'LinkedIn OAuth', 'Resend API'],
  metrics: [
    { label: 'Match Accuracy', value: '85', unit: '%' },
    { label: 'Warm Intros', value: '1.2', unit: 'k+' },
    { label: 'Active Founders', value: '800', unit: '+' },
    { label: 'Investor Pools', value: '120', unit: 'Funds' }
  ],
  idea: 'AlmaM was created to solve startup networking friction. Instead of browsing hundreds of inactive profiles, founders, investors, and experts log in securely with LinkedIn to build profiles in 3 minutes. AlmaM analyzes their current goals to recommend match connections, explaining exactly why they should meet.',
  about: 'AlmaM facilitates strategic connections inside the tech ecosystem. By indexing startups, funding criteria, and expertise sectors, it enables targeted discovery and automates warm introduction requests.',
  pillars: [
    {
      title: 'Decoupled SPA Architecture',
      desc: 'Powered by a custom React client (via Vite) and Express/TypeScript backend server, ensuring sub-second response times and high scalability.'
    },
    {
      title: 'Frictionless LinkedIn Login',
      desc: 'Integrates secure LinkedIn OAuth API, allowing users to verify their professional credentials and import data instantly without storing passwords.'
    },
    {
      title: 'Prisma & Postgres Engine',
      desc: 'Utilizes PostgreSQL and Prisma ORM for schema safety, fast relational queries, and local developer environment Docker orchestration.'
    },
    {
      title: 'Transactional Mail via Resend',
      desc: 'Implements Resend API to deliver secure passwordless Magic Links, new member invitations, and automated community match alerts.'
    }
  ],
  whyUs: [
    'AI-powered context discovery replacing weeks of manual profile scouting.',
    '100% Free Forever model for ambitious startup founders and mentors.',
    'Highly secured system leveraging magic links and passwordless OAuth authentication.',
    'Curated network covering founders, VCs, and operators across 30+ countries.'
  ],
  stats: {
    matchingRate: '85% accuracy',
    users: 'Active Community',
    type: 'Networking'
  }
};
