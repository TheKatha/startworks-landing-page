import { Trophy, Code2, Database, Shield } from 'lucide-react';

export const sportista = {
  id: 'sportista',
  title: 'Sportista',
  tagline: 'The Future of Fantasy Sports Gaming.',
  description: 'An ecosystem of high-performance microservices and cross-platform mobile apps built to power the next generation of fantasy sports. Developed with a hybrid architecture of Go, Dart, and Flutter, it handles high-concurrency real-time drafts and live stats syncing.',
  icon: Trophy,
  logo: 'sportista.png',
  techStack: ['Go', 'Dart', 'Flutter', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker'],
  metrics: [
    { label: 'Socket Latency', value: '45', unit: 'ms' },
    { label: 'Matches Tracked', value: '5', unit: 'k+' },
    { label: 'Concurrent Capacity', value: '50', unit: 'k+' },
    { label: 'Feed Refresh Rate', value: '500', unit: 'ms' }
  ],
  idea: 'The idea behind Sportista was to build a low-latency fantasy drafting platform that remains fast during high-traffic match day feeds. We designed a dual-stack configuration of Go Websockets and Flutter client caches to ensure real-time statistical updates for draft participants.',
  about: 'Sportista represents a scalable paradigm in real-time sports gaming, designed to handle massive volumes of concurrent users. It comprises real-time WebSocket communication, optimized data extraction pipelines, and high-performance databases.',
  pillars: [
    {
      title: 'sportista (Mobile Client)',
      desc: 'The Flutter-based cross-platform application providing an immersive, high-fidelity UI and smooth user experience for draft selections and live match tracking.'
    },
    {
      title: 'sportista-websocket (Real-Time)',
      desc: 'Written in Go, this server manages persistent connections to push instant match updates, draft picks, and leaderboard calculations to thousands of users simultaneously.'
    },
    {
      title: 'extracsta (Data Pipeline)',
      desc: 'A dedicated Go-based ETL data extraction framework that ingests and parses complex sports datasets and telemetry feeds from external providers in real-time.'
    },
    {
      title: 'sportista_api & sportista-db',
      desc: 'A Dart-based backend API handling authentication, player statistics, and match rosters, backed by an optimized database structure designed for sub-millisecond lookups.'
    }
  ],
  whyUs: [
    'Highly scalable Go & Flutter architecture designed for peak concurrency during live matches.',
    'Real-time bi-directional messaging with sub-100ms latency updates.',
    'Resilient data pipeline with automated failure recovery for live telemetry feeds.',
    'Clean, modular repository isolation allowing multi-team parallel development.'
  ],
  stats: {
    repositories: '7 Active Repositories',
    languages: 'Go, Dart, Flutter',
    status: 'Private Deployment',
    type: 'Analytical-Based Fantasy'
  }
};
