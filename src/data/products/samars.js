import { Smartphone } from 'lucide-react';

export const samars = {
  id: 'samars',
  title: 'Samars',
  tagline: 'AI-powered citizen municipal issue reporting and Lok Sabha constituency mapping platform.',
  description: 'A Flutter mobile application designed for citizen governance and local accountability. It allows citizens to report municipal grievances, resolve their geo-location or pincode to their specific Parliamentary Constituency (PC/AC maps), resolve their Lok Sabha Member of Parliament (MP), and score issue urgency/severity using Gemini 1.5 Flash and Vertex AI AutoML.',
  icon: Smartphone,
  logo: 'samars.jpeg',
  techStack: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Gemini 1.5 Flash', 'Vertex AI AutoML', 'GeoJSON Maps', 'Firebase'],
  metrics: [
    { label: 'Constituency Resolution', value: '0.4', unit: 'sec' },
    { label: 'Gemini Analysis Time', value: '1.8', unit: 'sec' },
    { label: 'Active Constituencies', value: '543', unit: 'MPs' },
    { label: 'Sync Accuracy', value: '100', unit: '%' }
  ],
  idea: 'Samars (MP App) was built to establish direct accountability channels between citizens and their Lok Sabha representatives. By resolving a user\'s physical location coordinates to India\'s parliamentary boundary polygons and clustering reports, it provides MPs with prioritized, AI-summarized local issue dashboards.',
  about: 'The platform combines a cross-platform Flutter client with a FastAPI python server, utilizing GeoJSON geographic spatial mapping, Vertex AI predictive priority classifiers, and Gemini LLM text summarization.',
  pillars: [
    {
      title: 'Constituency & MP Resolution',
      desc: 'Uses spatial lookup on simplified GeoJSON boundaries and postal index lookup algorithms to map coordinate logs to their exact Lok Sabha MP profiles.'
    },
    {
      title: 'AI Priority & Severity Scoring',
      desc: 'Integrates Gemini 1.5 Flash and Vertex AI AutoML classification pipelines to calculate issue urgency levels and affected populations directly from unstructured citizen descriptions.'
    },
    {
      title: 'Geospatial Issue Clustering',
      desc: 'Groups municipal complaints using Jaccard text similarity index bounds and geographic distance limits to consolidate duplicate reports.'
    },
    {
      title: 'MP Governance Dashboard',
      desc: 'Aggregates upvotes, centroid coordinates, and localized summaries for Lok Sabha representatives to view the highest-priority issues in their regions.'
    }
  ],
  whyUs: [
    'Accurate GPS-to-Constituency boundary coordinates mapping for all 543 Lok Sabha seats.',
    'Automated priority classification powered by Google Cloud Vertex AI.',
    'Geospatial semantic clustering that aggregates related municipal grievances.',
    'Cross-platform Flutter application deployment for seamless citizen usage.'
  ],
  stats: {
    syncSpeed: 'Sub-second resolve',
    platforms: 'iOS & Android',
    type: 'Public Server Governance'
  }
};
