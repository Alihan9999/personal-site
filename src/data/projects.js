export const projectFilters = ['All', 'AI', 'CI/CD', 'Cloud', 'Automation', 'Observability'];

export const projects = [
  {
    slug: '0rca',
    title: '0rca',
    description:
      'Built an AI company operating system that lets a solo founder dispatch directives across a multi-agent org, with DAG-based task orchestration and department-level execution.',
    details:
      'Designed 0rca as a multi-tenant AI operating system for startups, where a founder can create a company, activate departments, hire AI agents, and route directives through executive and specialist workflows. Under the hood, the orchestration layer uses a DAG model to validate dependencies, schedule ready tasks, manage handoffs between departments, and trigger refinement loops when upstream artifacts change. The platform also includes onboarding, authentication, team management, a command center dashboard, and marketing workflow support.',
    tech: ['Node.js', 'Express', 'DAG Orchestration', 'JWT'],
    tags: ['AI', 'Automation'],
    github: '',
    demo: '',
    metrics: [
      '7 AI departments with executive routing',
      'DAG-based dependency scheduling and handoffs',
      'Multi-tenant onboarding, auth, and task command center',
    ],
    meta: { uptime: 'building', replicas: '7/7', lastDeploy: '2026-05-01' },
    problem:
      'AI tooling treats agents as isolated chatbots, but real execution requires coordination — sequencing, dependencies, refinement loops, and handoffs across roles. A founder issuing a single directive should not have to babysit five tools.',
    architecture: [
      'DAG-based task model: validates dependencies, detects cycles, schedules ready work, supports refinement loops when upstream artifacts change.',
      'Multi-tenant org structure — companies own departments; departments own agents; agents own tasks and artifacts.',
      'Express + JWT for auth and tenant isolation; founder-facing command center renders the live execution graph.',
      'Executive agents route intent into department specialists; orchestrator decides what is eligible to run next.',
    ],
    outcome: [
      'Founders operate via directives, not prompts — the platform owns sequencing and escalation.',
      'Refinement loops let downstream agents flag insufficient inputs and trigger upstream rework safely.',
    ],
    tradeoffs: [
      'DAG validation cost grows with org complexity — mitigated by per-tenant graph caching.',
      'Confidence thresholds are hand-tuned; replacing with learned policies is a v2 bet.',
    ],
  },
  {
    slug: 'personal-website-platform',
    title: 'Personal Website Platform',
    description:
      'Designed and deployed this portfolio as a lightweight edge-hosted web platform using Vercel for delivery and Cloudflare for DNS, networking, and HTTPS routing.',
    details:
      'Built and deployed the personal site on Vercel to take advantage of fast static hosting, streamlined deployments, and production-friendly preview workflows. Used Cloudflare at the DNS and networking layer to manage domain routing, edge resolution, and HTTPS-related traffic handling. The setup provides a clean separation of responsibilities: Vercel handles application hosting and deployment, while Cloudflare provides domain management, DNS control, and edge-level request delivery. This created a practical production-style setup with secure HTTPS access, reliable routing, and a deployment workflow that is simple to maintain.',
    tech: ['React', 'Vite', 'Vercel', 'Cloudflare'],
    tags: ['Cloud', 'Automation'],
    github: 'https://github.com/Alihan9999/personal-site',
    demo: 'https://personal-site-delta-peach.vercel.app',
    metrics: [
      'Vercel-hosted deployment pipeline',
      'Cloudflare-managed DNS and edge routing',
      'Responsive portfolio with branded share previews',
    ],
    meta: { uptime: '212d', replicas: '1/1', lastDeploy: '2026-05-04' },
  },
  {
    slug: 'career-agent',
    title: 'Career Agent',
    description:
      'Built an AI-powered application pipeline that customizes resumes, writes cover letters, scores ATS keyword coverage, and logs job applications automatically.',
    details:
      'Designed and built a career-focused multi-agent workflow on Claude Code that takes a job URL and runs a structured pipeline end to end. Specialized agents handle job analysis, company research, resume customization, cover-letter writing, ATS scoring, PDF generation, and Google Form tracking. The project also includes gap-analysis and project-mentor commands that surface recurring skill gaps and turn them into portfolio project plans.',
    tech: ['Python', 'JavaScript', 'Claude Code', 'REST APIs'],
    tags: ['AI', 'Automation'],
    github: 'https://github.com/Alihan9999/career-agent',
    demo: '',
    metrics: [
      'Tailored resume and cover-letter PDFs',
      'ATS keyword coverage reporting',
      'Application tracking via Google Forms',
    ],
    meta: { uptime: '94d', replicas: '1/1', lastDeploy: '2026-04-22' },
  },
  {
    slug: 'homelab-platform',
    title: 'Homelab Platform',
    description:
      'Built a production-style self-hosted Kubernetes homelab on bare metal to practice senior SRE and platform engineering workflows.',
    details:
      'Designed a single-node k3s platform managed through ArgoCD GitOps with Traefik, cert-manager, Longhorn, CloudNativePG, Dragonfly, Istio, OpenTelemetry, and kube-prometheus-stack. The repo documents bootstrap automation, infrastructure runbooks, architecture decisions, GitHub Actions CI, and a custom Go operator for workload monitoring and recovery.',
    tech: ['Go', 'k3s', 'ArgoCD', 'Traefik'],
    tags: ['Cloud', 'Automation', 'Observability'],
    github: 'https://github.com/Alihan9999/homelab',
    demo: '',
    metrics: [
      'Bare-metal Kubernetes with GitOps',
      'Custom Go operator for service recovery',
      'Integrated storage, TLS, VPN, monitoring, and Postgres',
    ],
    meta: { uptime: '412d', replicas: '12/12', lastDeploy: '2026-04-29' },
    problem:
      'Most homelabs become a pile of disconnected services with no operating model. I wanted a constrained environment that exercises the same decisions production platforms force — paved roads, GitOps, observability, recovery — but on a single bare-metal node.',
    architecture: [
      'k3s on a single bare-metal node, ArgoCD sync from GitHub, Traefik for ingress, cert-manager for TLS automation.',
      'Longhorn for block storage, CloudNativePG for managed Postgres, Dragonfly for in-memory cache, Istio for service mesh.',
      'OpenTelemetry collector feeding kube-prometheus-stack; Grafana dashboards baked into the GitOps repo.',
      'Custom Go operator monitors workload health and triggers controlled recovery on drift.',
    ],
    outcome: [
      'Single source of truth — every cluster change goes through a PR.',
      'Drop-in disaster recovery: blow away the node, re-bootstrap, ArgoCD reconverges in under 20 minutes.',
      'Repository doubles as a runbook — bootstrap scripts, ADRs, CI workflows live alongside manifests.',
    ],
    tradeoffs: [
      'Single node means no real HA — explicit choice, scoped to a learning environment.',
      'Operator pattern is overkill for a homelab — included to exercise the design, not because the workload demands it.',
    ],
  },
  {
    slug: 'cicd-onboarding-platform',
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
    meta: { uptime: '3y', replicas: '200+', lastDeploy: '2026-02-12' },
  },
  {
    slug: 'aws-cost-optimization-engine',
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
    meta: { uptime: '2y', replicas: '6/6', lastDeploy: '2026-01-09' },
  },
  {
    slug: 'splunk-deployment-automation',
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
    meta: { uptime: '4y', replicas: '500+', lastDeploy: '2025-11-18' },
  },
];

export const FEATURED_SLUGS = ['homelab-platform', '0rca', 'career-agent'];

export const featuredProjects = FEATURED_SLUGS.map((slug) =>
  projects.find((project) => project.slug === slug),
).filter(Boolean);

export const findProjectBySlug = (slug) => projects.find((project) => project.slug === slug);
