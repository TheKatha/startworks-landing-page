import { Target, Bot, BookOpen, Cpu, ShieldCheck, Database, LineChart, MessageSquareCode } from 'lucide-react';

export const servicesContent = {
  'ai-strategy-assessment': {
    title: 'AI Strategy & Assessment',
    subtitle: 'Identify high-ROI use cases and build customized roadmaps for AI adoption and integration.',
    icon: Target,
    overview: 'Adopting AI without a clear strategy often leads to siloed experiments and wasted resources. Our AI Strategy & Assessment service is designed for visionary leaders who want to leverage artificial intelligence to solve real business challenges. We act as your strategic partners, cutting through the hype to identify practical, high-impact use cases tailored to your industry, data maturity, and operational bottlenecks.',
    features: [
      { title: 'AI Opportunity Assessment', desc: 'Identify high-ROI use cases for your business and evaluate readiness.' },
      { title: 'AI Strategy', desc: 'Build customized roadmaps for AI adoption and seamless integration.' },
      { title: 'Feasibility Analysis', desc: 'Evaluate data readiness, infrastructure, and potential roadblocks.' },
      { title: 'Implementation Planning', desc: 'Define timelines, resources, and success metrics for AI projects.' }
    ],
    benefits: [
      { title: 'Mitigated Risk', desc: 'Avoid costly mistakes by validating technical feasibility before writing any code.' },
      { title: 'Measurable ROI', desc: 'Focus strictly on use cases that directly impact revenue growth or operational efficiency.' },
      { title: 'Executive Alignment', desc: 'Bring all stakeholders on board with a clear, jargon-free roadmap and business case.' },
      { title: 'Future-Proofing', desc: 'Establish a scalable foundation that adapts as AI capabilities rapidly evolve.' }
    ],
    process: [
      { step: '01', title: 'Discovery Workshops', desc: 'Deep-dive sessions with domain experts to map current workflows and pain points.' },
      { step: '02', title: 'Data Audit', desc: 'Assessing your current data infrastructure, quality, and accessibility.' },
      { step: '03', title: 'Use Case Prioritization', desc: 'Scoring potential AI projects based on impact, effort, and risk.' },
      { step: '04', title: 'Roadmap Delivery', desc: 'Presenting a phased execution plan with budget estimates and resource requirements.' }
    ]
  },
  'specialized-ai-agents': {
    title: 'Specialized AI Agents',
    subtitle: 'Deploy intelligent autonomous agents to handle specific domain workflows across your organization.',
    icon: Bot,
    overview: 'The future of work involves humans collaborating seamlessly with autonomous digital workers. We design and deploy specialized AI agents configured to master specific departmental workflows. Powered by state-of-the-art Large Language Models (LLMs) and custom integrations, these agents don\'t just answer questions—they execute complex, multi-step actions across your existing enterprise software.',
    features: [
      { title: 'HR Agent', desc: 'Answers employee questions, manages leave balances, policies, and payroll inquiries.' },
      { title: 'Sales Agent', desc: 'Qualifies leads automatically, books meetings, and generates sales proposals.' },
      { title: 'Procurement Agent', desc: 'Compares quotations, negotiates pricing, and raises purchase requests.' },
      { title: 'Finance & Legal Agents', desc: 'Handles expense auditing, invoice validation, contract review, and risk detection.' }
    ],
    benefits: [
      { title: '24/7 Availability', desc: 'Agents operate around the clock, providing instant resolution to internal and external queries.' },
      { title: 'Scalable Operations', desc: 'Handle 10x the workload during peak seasons without expanding your human headcount.' },
      { title: 'Error Reduction', desc: 'Eliminate manual data entry errors and ensure strict compliance with company policies.' },
      { title: 'Employee Satisfaction', desc: 'Free your human workforce from mundane tasks so they can focus on strategic, creative work.' }
    ],
    process: [
      { step: '01', title: 'Workflow Mapping', desc: 'Documenting the exact steps, decisions, and systems involved in the target process.' },
      { step: '02', title: 'Agent Configuration', desc: 'Setting up LLM prompts, guardrails, and necessary API integrations (CRM, ERP, HRIS).' },
      { step: '03', title: 'Shadow Testing', desc: 'Running the agent in a sandbox environment alongside human operators to tune accuracy.' },
      { step: '04', title: 'Live Deployment', desc: 'Rolling out the agent with continuous monitoring and human-in-the-loop fallbacks.' }
    ]
  },
  'internal-knowledge-ai': {
    title: 'Internal Knowledge AI',
    subtitle: 'One of our highest-value offerings. Employees can instantly ask questions and get accurate answers from company documents.',
    icon: BookOpen,
    overview: 'Enterprise knowledge is often trapped in fragmented silos—spread across SharePoint, Google Drive, PDFs, and Confluence. Our Internal Knowledge AI acts as an omniscient, secure search engine for your company. Utilizing advanced Retrieval-Augmented Generation (RAG) techniques, it allows employees to ask natural language questions and receive precise, cited answers instantly, dramatically reducing time spent searching for information.',
    features: [
      { title: 'Instant Answers', desc: 'Employees get instant answers to questions like "What\'s our reimbursement policy?"' },
      { title: 'Document Integration', desc: 'Securely connects to PDFs, SOPs, Policies, SharePoint, Google Drive, and Confluence.' },
      { title: 'Enhanced Productivity', desc: 'Eliminates hours spent searching through fragmented company documents and wikis.' },
      { title: 'Secure & Private', desc: 'Ensures company data remains confidential and perfectly access-controlled.' }
    ],
    benefits: [
      { title: 'Hours Saved Daily', desc: 'Recover an average of 1.5 hours per employee per day previously lost to information gathering.' },
      { title: 'Faster Onboarding', desc: 'New hires get up to speed in record time by instantly querying the company\'s collective knowledge.' },
      { title: 'Strict Access Control', desc: 'The AI respects your existing permissions—users only get answers from documents they are authorized to see.' },
      { title: 'Accurate Citations', desc: 'Every answer includes a direct link to the source document, eliminating AI hallucinations.' }
    ],
    process: [
      { step: '01', title: 'Source Integration', desc: 'Connecting securely to your enterprise data sources via robust APIs.' },
      { step: '02', title: 'Vectorization & Indexing', desc: 'Processing and embedding millions of documents into a highly searchable vector database.' },
      { step: '03', title: 'RAG Architecture Setup', desc: 'Configuring the retrieval system to fetch the most relevant context for the LLM.' },
      { step: '04', title: 'User Interface Customization', desc: 'Deploying a sleek chat interface directly into Slack, Teams, or a custom web portal.' }
    ]
  },
  'ai-automation-analytics': {
    title: 'AI Automation & Analytics',
    subtitle: 'Streamline repetitive tasks with intelligent automation and turn raw data into reliable, real-time insights.',
    icon: Cpu,
    overview: 'Legacy RPA (Robotic Process Automation) is rigid and breaks when UI elements change. We deploy Next-Generation AI Automation that understands context, handles unstructured data (like emails and PDFs), and makes intelligent routing decisions. Combined with advanced analytics, this service not only automates your back-office but provides deep, real-time visibility into operational performance.',
    features: [
      { title: 'Workflow Automation', desc: 'Streamline repetitive tasks with intelligent automation and RPA.' },
      { title: 'Data Analytics', desc: 'Turn raw data into reliable, real-time insights with smart dashboards.' },
      { title: 'Predictive Modeling', desc: 'Forecast trends and behaviors to drive proactive business decisions.' },
      { title: 'Process Optimization', desc: 'Continuously improve operational efficiency through AI-driven insights.' }
    ],
    benefits: [
      { title: 'End-to-End Efficiency', desc: 'Connect disparate systems without expensive custom software development.' },
      { title: 'Intelligent Exception Handling', desc: 'Unlike traditional bots, AI automation can flag edge cases for human review gracefully.' },
      { title: 'Real-time Visibility', desc: 'Track automation metrics, processing times, and cost savings in custom analytics dashboards.' },
      { title: 'Rapid Implementation', desc: 'Low-code AI orchestration tools allow us to deploy complex workflows in weeks, not months.' }
    ],
    process: [
      { step: '01', title: 'Process Mining', desc: 'Analyzing system logs to identify the most time-consuming and error-prone tasks.' },
      { step: '02', title: 'AI Automation Design', desc: 'Designing resilient workflows combining OCR, NLP, and rule-based logic.' },
      { step: '03', title: 'Dashboard Engineering', desc: 'Building the analytics layer to monitor workflow health and business outcomes.' },
      { step: '04', title: 'Iterative Refinement', desc: 'Continuous tuning of the models based on human feedback loops.' }
    ]
  },
  'ai-governance-training': {
    title: 'AI Governance & Training',
    subtitle: 'Ensure your AI initiatives are safe, responsible, and compliant while equipping your workforce with necessary skills.',
    icon: ShieldCheck,
    overview: 'As AI adoption accelerates, the risks of data leakage, bias, and regulatory non-compliance grow exponentially. Our AI Governance & Training service provides the essential guardrails for enterprise AI. We help you establish robust security policies, audit models for fairness, ensure compliance with emerging regulations (like the EU AI Act), and comprehensively train your staff to use AI securely and effectively.',
    features: [
      { title: 'AI Governance Frameworks', desc: 'Ensure your AI initiatives are safe, responsible, and fully compliant.' },
      { title: 'Team Training & Upskilling', desc: 'Equip your workforce with the necessary skills to leverage AI effectively.' },
      { title: 'Security & Compliance', desc: 'Adhere to industry standards and mitigate AI-related risks.' },
      { title: 'Continuous Monitoring', desc: 'Maintain model performance, fairness, and accuracy over time.' }
    ],
    benefits: [
      { title: 'Regulatory Compliance', desc: 'Stay ahead of global AI regulations and avoid massive compliance penalties.' },
      { title: 'Brand Protection', desc: 'Prevent PR disasters caused by biased algorithms or unintended data leaks.' },
      { title: 'Confident Innovation', desc: 'A strong governance framework empowers teams to experiment safely, accelerating innovation.' },
      { title: 'Empowered Workforce', desc: 'Transform your employees from AI skeptics to power users through tailored upskilling programs.' }
    ],
    process: [
      { step: '01', title: 'Risk & Maturity Audit', desc: 'Evaluating your current AI landscape, shadow AI usage, and data privacy protocols.' },
      { step: '02', title: 'Policy Formulation', desc: 'Drafting clear, actionable AI usage policies and ethical guidelines for the enterprise.' },
      { step: '03', title: 'Technical Guardrails', desc: 'Implementing automated monitoring for model drift, bias, and PII redaction.' },
      { step: '04', title: 'Training Rollout', desc: 'Conducting role-specific workshops to elevate AI literacy across departments.' }
    ]
  },
  'ai-powered-data-analytics': {
    title: 'AI-Powered Data Analytics',
    subtitle: 'We turn raw data into reliable, real-time insight with cleaned pipelines, smart dashboards, and optimized reporting.',
    icon: LineChart,
    overview: 'Data is only valuable if it drives decision-making. Our AI-Powered Data Analytics service transforms chaotic, messy datasets into pristine, actionable intelligence. We handle the entire lifecycle—from architecting modern data warehouses and engineering ETL pipelines, to building beautiful, lightning-fast BI dashboards infused with machine learning for predictive forecasting.',
    features: [
      { title: 'Dashboard Creation', desc: 'We design intuitive BI dashboards that bring critical metrics to your fingertips, helping your team make faster, smarter decisions.' },
      { title: 'Data Preparation and Cleansing', desc: 'Our AI-powered workflows clean and prep your data, ensuring accuracy and quality before it powers any analytics.' },
      { title: 'Performance Optimization', desc: 'We fine-tune your dashboards and reports for fast refreshes—no delays—whether your data is on-premise or in the cloud.' },
      { title: 'End to End BI Analytics', desc: 'We handle the full analytics lifecycle—from data modeling and ETL to building dashboards—so you get clear, actionable insights regularly.' }
    ],
    benefits: [
      { title: 'Single Source of Truth', desc: 'Eliminate conflicting reports by centralizing logic in a governed semantic layer.' },
      { title: 'Predictive Power', desc: 'Move beyond historical reporting to forecast future trends using embedded ML models.' },
      { title: 'Democratized Data', desc: 'Intuitive self-service dashboards allow non-technical users to find their own answers.' },
      { title: 'Lightning Fast Queries', desc: 'Optimized data models ensure reports load in milliseconds, not minutes.' }
    ],
    process: [
      { step: '01', title: 'Requirements Gathering', desc: 'Identifying the Key Performance Indicators (KPIs) that actually matter to leadership.' },
      { step: '02', title: 'Data Modeling', desc: 'Designing star schemas and dimensional models optimized for analytical workloads.' },
      { step: '03', title: 'ETL Engineering', desc: 'Building reliable, automated pipelines to extract, clean, and load data from source systems.' },
      { step: '04', title: 'Visualization & Handover', desc: 'Crafting pixel-perfect dashboards in PowerBI, Tableau, or Looker, followed by user training.' }
    ]
  },
  'ai-consulting': {
    title: 'AI-Consulting',
    subtitle: 'We guide you through end-to-end AI adoption—from strategy and architecture to hands-on implementation.',
    icon: MessageSquareCode,
    overview: 'Navigating the rapidly evolving AI ecosystem requires deep technical expertise and strategic vision. Our AI Consulting service provides end-to-end guidance. We don\'t just deliver slide decks; our team of seasoned data scientists, machine learning engineers, and domain experts roll up their sleeves to architect, build, and deploy production-grade AI systems that integrate seamlessly into your enterprise architecture.',
    features: [
      { title: 'Tailored AI Roadmaps', desc: 'We develop customized AI strategies and architectures that match your organization’s current maturity and long-term goals.' },
      { title: 'Data-Centric, Platform-Agnostic Expertise', desc: 'Our team applies a data-first approach without locking you into specific tools or platforms, ensuring flexibility.' },
      { title: 'Hands-on Production Ready Implementation', desc: 'Our experts don’t just advise—they build and deploy. With over 50+ AI/ML projects in production, we bring real-world delivery.' },
      { title: 'Value-Driven & Cost-Effective Model', desc: 'Through our offshore/onshore model, we offer top-tier AI talent and results at competitive pricing—delivering high ROI.' }
    ],
    benefits: [
      { title: 'Vendor Independence', desc: 'We provide objective, platform-agnostic recommendations (AWS, Azure, GCP, Open Source).' },
      { title: 'Elite Talent Access', desc: 'Instantly augment your team with senior AI practitioners without the lengthy hiring process.' },
      { title: 'Accelerated Delivery', desc: 'Leverage our proven IP, templates, and reference architectures to cut development time in half.' },
      { title: 'Knowledge Transfer', desc: 'We work alongside your internal teams, ensuring they are fully capable of owning the solution post-launch.' }
    ],
    process: [
      { step: '01', title: 'Current State Analysis', desc: 'Reviewing your existing codebase, infrastructure, and team capabilities.' },
      { step: '02', title: 'Architecture Design', desc: 'Creating robust technical blueprints for scalable, secure AI deployment.' },
      { step: '03', title: 'Proof of Concept (PoC)', desc: 'Rapidly building a functional prototype to validate the technical approach.' },
      { step: '04', title: 'Production Scaling', desc: 'Hardening the PoC into an enterprise-grade system with full CI/CD and MLOps pipelines.' }
    ]
  },
  'product-building': {
    title: 'Product building',
    subtitle: 'We build smart, reliable data products end-to-end—with quality, usability, and fast feedback at their core.',
    icon: Cpu,
    overview: 'Transforming a conceptual AI idea into a polished, user-facing digital product requires a unique blend of data science, backend engineering, and UX design. We operate as a full-stack product studio. Whether you are building an intelligent SaaS application, a customer-facing recommendation engine, or an internal AI tool, we handle the entire product development lifecycle from zero to one, and beyond.',
    features: [
      { title: 'End-to-End Digital Product Development', desc: 'We partner from idea to launch—designing, prototyping, and engineering AI-powered products that align with your business goals.' },
      { title: 'Quality-First Engineering', desc: 'Every product is rigorously tested—ensuring clean data, accurate insights, and dependable performance in the field.' },
      { title: 'Intuitive UI/UX Design', desc: 'We build user-friendly interfaces tailored for data and AI tools, ensuring high adoption and ease of use.' },
      { title: 'Ongoing Model Maintenance', desc: 'We establish frameworks to monitor and retrain models to prevent degradation, keeping performance strong over time.' }
    ],
    benefits: [
      { title: 'Faster Time to Market', desc: 'Cross-functional agile pods (Designers, Engineers, Data Scientists) deliver MVP versions rapidly.' },
      { title: 'High User Adoption', desc: 'World-class UX design ensures complex AI outputs are presented in intuitive, easy-to-understand interfaces.' },
      { title: 'Scalable Architectures', desc: 'Products built on cloud-native, microservices architectures ready to handle millions of requests.' },
      { title: 'Continuous Iteration', desc: 'Post-launch analytics and user feedback loops drive constant product refinement and feature enhancements.' }
    ],
    process: [
      { step: '01', title: 'Product Discovery', desc: 'Defining user personas, core pain points, and the Minimum Viable Product (MVP) scope.' },
      { step: '02', title: 'UI/UX Prototyping', desc: 'Designing high-fidelity wireframes and interactive prototypes for user testing.' },
      { step: '03', title: 'Full-Stack Engineering', desc: 'Concurrent development of the frontend interface, backend APIs, and underlying AI models.' },
      { step: '04', title: 'Launch & Iterate', desc: 'Deploying to production, monitoring user behavior, and planning the next sprint cycle.' }
    ]
  },
  'cloud-data-engineering': {
    title: 'Cloud Data Engineering',
    subtitle: 'We build end-to-end cloud data platforms which are strategic, scalable, and reliable so your team gets clean, unified data.',
    icon: Database,
    overview: 'In today\'s data-driven landscape, legacy on-premise systems bottleneck innovation. Our Cloud Data Engineering service provides a comprehensive migration and modernization strategy. We architect scalable, secure, and highly available data platforms on AWS, Azure, or GCP (like Snowflake or Databricks) that empower your organization to process petabytes of data in real-time, forming the bedrock for all future AI initiatives.',
    features: [
      { title: 'Cloud Strategy & Architecture', desc: 'We design the right roadmap and infrastructure for hybrid environments, ensuring smooth migration and scalable cloud deployments.' },
      { title: 'Cloud-Native Development', desc: 'We build and deploy applications optimized for the cloud—scalable, maintainable, and flexible from day one.' },
      { title: 'Data Engineering Pipelines', desc: 'We create robust pipelines that consolidate, clean, and transform data from on-premise and cloud sources, delivering reliable data.' },
      { title: 'Master Data Management', desc: 'We establish a single source of truth by linking and governing critical data across systems for real-time, trusted insights.' }
    ],
    benefits: [
      { title: 'Cost Optimization', desc: 'Reduce infrastructure overhead with pay-as-you-go cloud models and automated resource scaling.' },
      { title: 'Real-time Processing', desc: 'Unlock streaming analytics and real-time decision making capabilities with modern data stacks.' },
      { title: 'Enterprise Security', desc: 'Implement zero-trust architectures, end-to-end encryption, and automated compliance policies.' },
      { title: 'Infinite Scalability', desc: 'Seamlessly handle massive data spikes without manual intervention or hardware provisioning.' }
    ],
    process: [
      { step: '01', title: 'Audit & Blueprinting', desc: 'Assessing your current data landscape and designing a future-state cloud architecture.' },
      { step: '02', title: 'Infrastructure as Code', desc: 'Automating the provisioning of cloud resources using Terraform or CloudFormation.' },
      { step: '03', title: 'Migration & Validation', desc: 'Securely migrating historical data with zero downtime and full integrity validation.' },
      { step: '04', title: 'Optimization & Handoff', desc: 'Tuning queries, optimizing compute costs, and comprehensively upskilling your internal team.' }
    ]
  }
};

export const servicesList = [
  { id: 'ai-strategy-assessment', label: 'AI Strategy & Assessment', icon: Target, category: 'AI Transformation' },
  { id: 'specialized-ai-agents', label: 'Specialized AI Agents', icon: Bot, category: 'AI Transformation' },
  { id: 'internal-knowledge-ai', label: 'Internal Knowledge AI', icon: BookOpen, category: 'AI Transformation' },
  { id: 'ai-automation-analytics', label: 'AI Automation & Analytics', icon: Cpu, category: 'AI Transformation' },
  { id: 'ai-governance-training', label: 'AI Governance & Training', icon: ShieldCheck, category: 'AI Transformation' },
  { id: 'ai-powered-data-analytics', label: 'AI-Powered Data Analytics', icon: LineChart, category: 'Core Services' },
  { id: 'ai-consulting', label: 'AI-Consulting', icon: MessageSquareCode, category: 'Core Services' },
  { id: 'product-building', label: 'Product building', icon: Cpu, category: 'Core Services' },
  { id: 'cloud-data-engineering', label: 'Cloud Data Engineering', icon: Database, category: 'Core Services' }
];
