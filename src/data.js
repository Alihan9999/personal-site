export const projectFilters = ['All', 'CI/CD', 'Cloud', 'Automation', 'Observability'];

export const projects = [
  {
    title: 'CI/CD Onboarding Platform',
    description:
      'Reduced onboarding friction for internal engineering teams with a unified request-to-pipeline workflow.',
    details:
      'Built a platform that connected ServiceNow approvals to Jenkins job templates, standardized repo bootstrap flows, and automated guardrails for credentials, notifications, and environment provisioning.',
    tech: ['ServiceNow', 'Jenkins', 'Groovy', 'REST APIs'],
    tags: ['CI/CD', 'Automation'],
    github: '',
    demo: '',
    metrics: ['200+ apps supported', 'Cut manual setup by 70%', 'Standardized release controls'],
  },
  {
    title: 'AWS Cost Optimization Engine',
    description:
      'Automated cloud cost governance with event-driven recommendations and scheduled remediation.',
    details:
      'Designed Lambda workflows triggered by EventBridge to analyze spend anomalies, detect underutilized resources, and post actionable reports to stakeholders. Included approval-aware remediation for non-prod resources.',
    tech: ['AWS Lambda', 'EventBridge', 'CloudWatch', 'Python'],
    tags: ['Cloud', 'Automation'],
    github: '',
    demo: '',
    metrics: ['Daily savings checks', 'Budget drift alerts', 'Rightsizing insights'],
  },
  {
    title: 'Splunk Deployment Automation',
    description:
      'Created repeatable infrastructure automation for Splunk forwarder rollout across large server fleets.',
    details:
      'Implemented Ansible-based deployment and configuration management for Splunk forwarders, including environment-specific inventories, validation tasks, restart orchestration, and audit-ready change reporting.',
    tech: ['Ansible', 'Splunk', 'Linux', 'YAML'],
    tags: ['Observability', 'Automation'],
    github: '',
    demo: '',
    metrics: ['Repeatable rollout playbooks', 'Safer config drift control', 'Faster environment onboarding'],
  },
];

export const blogFilters = ['All', 'DevOps', 'AWS', 'CI/CD', 'Thoughts'];

export const posts = [
  {
    slug: 'automated-aws-cost-optimization',
    title: 'How I Automated AWS Cost Optimization',
    preview:
      'A practical look at building event-driven cost controls with Lambda, EventBridge, and lightweight governance.',
    date: 'March 12, 2026',
    tags: ['AWS', 'DevOps'],
    body: [
      'Cost optimization works best when it behaves like a platform capability instead of a quarterly cleanup effort. I prefer lightweight automation that surfaces issues continuously and only escalates to humans when context is needed.',
      'For this workflow, Lambda handled the evaluation logic, EventBridge provided predictable scheduling, and CloudWatch metrics supplied the baseline signals. The output was routed into a concise daily report with enough metadata for teams to act quickly.',
      'The most important design choice was separating recommendation generation from remediation. That keeps the system safe, auditable, and much easier to extend.',
    ],
  },
  {
    slug: 'designing-scalable-cicd-pipelines',
    title: 'Designing Scalable CI/CD Pipelines',
    preview:
      'Patterns for keeping delivery pipelines consistent across dozens or hundreds of applications without slowing teams down.',
    date: 'February 4, 2026',
    tags: ['CI/CD', 'DevOps'],
    body: [
      'The failure mode I see most often is over-customized pipelines. Every exception seems reasonable locally, but the fleet becomes expensive to maintain and difficult to secure.',
      'A better model is a paved-road approach: shared templates, clear extension points, and enforced quality gates. Teams still move quickly, but they do it from a stable foundation.',
      'The real leverage is operational consistency. Once your pipeline model is standardized, onboarding, auditing, and incident response all become easier.',
    ],
  },
  {
    slug: 'lessons-from-managing-200-plus-applications',
    title: 'Lessons from Managing 200+ Applications',
    preview:
      'Operating a large application portfolio changes how you think about self-service, ownership boundaries, and platform ergonomics.',
    date: 'January 18, 2026',
    tags: ['Thoughts', 'DevOps'],
    body: [
      'At portfolio scale, platform engineering is mostly about reducing cognitive load. Documentation, defaults, and interfaces matter as much as the automation itself.',
      'I focus on workflows that make the right path obvious. If a team needs a handbook and tribal knowledge to use the platform safely, the platform is still too complicated.',
      'The teams that perform best usually have the fewest ambiguous decisions to make during delivery.',
    ],
  },
];

export const skills = [
  {
    category: 'Cloud',
    items: ['AWS', 'Azure', 'EventBridge', 'CloudWatch'],
  },
  {
    category: 'CI/CD',
    items: ['Jenkins', 'Azure DevOps', 'GitHub Actions', 'GitLab', 'Octopus Deploy', 'Nexus'],
  },
  {
    category: 'IaC',
    items: ['Terraform', 'Ansible'],
  },
  {
    category: 'Observability',
    items: ['Splunk', 'Grafana', 'Prometheus'],
  },
];

export const capabilities = [
  {
    category: 'AI Tooling',
    description: 'Developer acceleration workflows, agent-driven iteration, and modern AI-assisted engineering tooling.',
    items: ['MCP', 'OpenAI Codex', 'Claude Code'],
  },
  {
    category: 'Languages',
    description: 'Programming and automation languages used across platform engineering, tooling, and delivery workflows.',
    items: ['Python', 'Java', 'TypeScript', 'Groovy'],
  },
  {
    category: 'Frameworks / Platforms',
    description: 'Application and platform layers used for internal tooling, UI surfaces, and service development.',
    items: ['.NET', 'React'],
  },
  {
    category: 'Runtime / Backend',
    description: 'Runtime environments and backend foundations used for automation services and application delivery.',
    items: ['Node.js'],
  },
  {
    category: 'IaC',
    description: 'Declarative configuration and infrastructure-oriented authoring used in delivery and platform workflows.',
    items: ['YAML'],
  },
  {
    category: 'Databases',
    description: 'Operational and application data stores across relational, cache, and document workloads.',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
  },
];

export const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:acakiralioglu1@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Alihan9999',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alihan-cakiralioglu-320845179/',
  },
];
