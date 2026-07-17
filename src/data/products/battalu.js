import { ShoppingBag, Star, Share2, Heart } from 'lucide-react';

export const battalu = {
  id: 'battalu',
  title: 'Battalu',
  tagline: 'On-demand laundry logistics and garment care mobile ecosystem.',
  description: 'A high-performance Flutter mobile application for dry cleaning and laundry pickup services. Operating with a serverless Firebase backend, it coordinates real-time order status tracking, digital catalogs, and structured delivery courier dispatches.',
  icon: ShoppingBag,
  logo: 'battalu_without_bg.png',
  techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Cloud Messaging (FCM)', 'Firebase Hosting'],
  metrics: [
    { label: 'Order Ingestion Speed', value: '0.8', unit: 'sec' },
    { label: 'Push Notification Latency', value: '1.2', unit: 'sec' },
    { label: 'Active Users', value: '1.5', unit: 'k+' },
    { label: 'Sync Accuracy', value: '100', unit: '%' }
  ],
  idea: 'Battalu was designed to bridge local laundry and dry-cleaning providers with on-demand digital pickup logistics. Users select specific services (wash, fold, dry-clean, press), track order status (pickup scheduled, washing in progress, ready for delivery), and manage structured addresses.',
  about: 'The application uses client-side provider architectures to coordinate user authentication and Firestore streams, maintaining a responsive experience for both regular customers and pickup couriers.',
  pillars: [
    {
      title: 'Flutter Cross-Platform Client',
      desc: 'Built using a single Dart codebase running smoothly across both iOS and Android mobile platforms.'
    },
    {
      title: 'Firestore Real-Time Streams',
      desc: 'Utilizes serverless Firestore database streams to synchronize active order statuses and courier allocations instantly on the client UI.'
    },
    {
      title: 'AuthGate Role Management',
      desc: 'Separates authorization flows using an interactive AuthGate, loading distinct dashboard consoles for general clients and laundry staff.'
    },
    {
      title: 'Service-Based Provider Architecture',
      desc: 'Decouples service handlers into dedicated managers (AuthService, DBService) for clean code maintenance, testing, and error catching.'
    }
  ],
  whyUs: [
    'Frictionless dry-cleaning and laundry pickup scheduling from any device.',
    'Real-time order tracking updates via Firestore database streams.',
    'Lightweight serverless backend footprint leveraging Google Firebase services.',
    'Robust security validations and authentication checks via custom AuthGates.'
  ],
  stats: {
    marginIncrease: 'Avg 40% gain',
    artisans: 'Verified Partners',
    type: 'Hyper-Local Services'
  }
};
