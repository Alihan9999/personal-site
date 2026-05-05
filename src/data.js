export const projectFilters = ['All', 'AI', 'CI/CD', 'Cloud', 'Automation', 'Observability'];

export const projects = [
  {
    title: '0rca',
    description:
      'Built an AI company operating system that lets a solo founder dispatch directives across a multi-agent org, with DAG-based task orchestration and department-level execution.',
    details:
      'Designed 0rca as a multi-tenant AI operating system for startups, where a founder can create a company, activate departments, hire AI agents, and route directives through executive and specialist workflows. Under the hood, the orchestration layer uses a DAG model to validate dependencies, schedule ready tasks, manage handoffs between departments, and trigger refinement loops when upstream artifacts change. The platform also includes onboarding, authentication, team management, a command center dashboard, and marketing workflow support.',
    tech: ['Node.js', 'Express', 'DAG Orchestration', 'JWT'],
    tags: ['AI', 'Automation'],
    github: '',
    demo: '',
    metrics: ['7 AI departments with executive routing', 'DAG-based dependency scheduling and handoffs', 'Multi-tenant onboarding, auth, and task command center'],
  },
  {
    title: 'Personal Website Platform',
    description:
      'Designed and deployed this portfolio as a lightweight edge-hosted web platform using Vercel for delivery and Cloudflare for DNS, networking, and HTTPS routing.',
    details:
      'Built and deployed the personal site on Vercel to take advantage of fast static hosting, streamlined deployments, and production-friendly preview workflows. Used Cloudflare at the DNS and networking layer to manage domain routing, edge resolution, and HTTPS-related traffic handling. The setup provides a clean separation of responsibilities: Vercel handles application hosting and deployment, while Cloudflare provides domain management, DNS control, and edge-level request delivery. This created a practical production-style setup with secure HTTPS access, reliable routing, and a deployment workflow that is simple to maintain.',
    tech: ['React', 'Vite', 'Vercel', 'Cloudflare'],
    tags: ['Cloud', 'Automation'],
    github: 'https://github.com/Alihan9999/personal-site',
    demo: 'https://personal-site-delta-peach.vercel.app',
    metrics: ['Vercel-hosted deployment pipeline', 'Cloudflare-managed DNS and edge routing', 'Responsive portfolio with branded share previews'],
  },
  {
    title: 'Career Agent',
    description:
      'Built an AI-powered application pipeline that customizes resumes, writes cover letters, scores ATS keyword coverage, and logs job applications automatically.',
    details:
      'Designed and built a career-focused multi-agent workflow on Claude Code that takes a job URL and runs a structured pipeline end to end. Specialized agents handle job analysis, company research, resume customization, cover-letter writing, ATS scoring, PDF generation, and Google Form tracking. The project also includes gap-analysis and project-mentor commands that surface recurring skill gaps and turn them into portfolio project plans.',
    tech: ['Python', 'JavaScript', 'Claude Code', 'REST APIs'],
    tags: ['AI', 'Automation'],
    github: 'https://github.com/Alihan9999/career-agent',
    demo: '',
    metrics: ['Tailored resume and cover-letter PDFs', 'ATS keyword coverage reporting', 'Application tracking via Google Forms'],
  },
  {
    title: 'Homelab Platform',
    description:
      'Built a production-style self-hosted Kubernetes homelab on bare metal to practice senior SRE and platform engineering workflows.',
    details:
      'Designed a single-node k3s platform managed through ArgoCD GitOps with Traefik, cert-manager, Longhorn, CloudNativePG, Dragonfly, Istio, OpenTelemetry, and kube-prometheus-stack. The repo documents bootstrap automation, infrastructure runbooks, architecture decisions, GitHub Actions CI, and a custom Go operator for workload monitoring and recovery.',
    tech: ['Go', 'k3s', 'ArgoCD', 'Traefik'],
    tags: ['Cloud', 'Automation', 'Observability'],
    github: 'https://github.com/Alihan9999/homelab',
    demo: '',
    metrics: ['Bare-metal Kubernetes with GitOps', 'Custom Go operator for service recovery', 'Integrated storage, TLS, VPN, monitoring, and Postgres'],
  },
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

export const blogFilters = ['All', 'AI', 'DevOps', 'AWS', 'CI/CD', 'Thoughts'];

export const posts = [
  {
    slug: 'building-0rca-ai-company-operating-system',
    title: 'Building 0rca: An AI Company Operating System',
    preview:
      'Why I built 0rca, how the DAG orchestration model works, and what it means to treat AI agents like an operating structure instead of a chat interface.',
    date: 'May 4, 2026',
    tags: ['AI', 'Thoughts'],
    body: [
      '0rca started from a simple idea: most AI tools still behave like isolated assistants, but the real challenge in execution is coordination. I wanted to build something closer to a company operating system, where a founder can issue one directive and have multiple departments interpret, sequence, and act on it through a structured workflow.',
      'The core architectural decision was to model execution as a DAG instead of a linear pipeline. That matters because startup work is rarely a single chain of tasks. Some tasks have hard dependencies, some can begin once a partial input exists, and some create downstream handoffs that should only trigger when the upstream output is credible enough to use. A DAG gave me a way to validate task relationships, detect cycles, schedule ready work, and create refinement loops when earlier artifacts change.',
      'Inside 0rca, the founder interacts with the system through directives, but the platform thinks in terms of organizations, departments, agents, tasks, artifacts, and handoffs. Executive agents route intent, department specialists execute scoped work, and the orchestrator decides what is eligible to run next. That makes the system feel less like prompting a single chatbot and more like managing a coordinated digital team.',
      'I also wanted the product surface to support that mental model. New users create a company, enable departments, hire agents, and then operate through a command center instead of a blank prompt box. Team management, marketing workflows, onboarding, and auth all reinforce the idea that the product is not just an AI demo. It is trying to behave like a real operating environment for founder-led execution.',
      'What makes the project interesting to me is not just the AI angle. It is the systems angle. 0rca forces questions about orchestration, dependency management, escalation, confidence thresholds, and refinement depth. Those are the same kinds of problems that show up in platform engineering, workflow automation, and distributed operations. The interface looks product-oriented, but the underlying challenge is really systems design.',
    ],
  },
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
    slug: 'building-a-kubernetes-homelab-platform',
    title: 'Building a Kubernetes Homelab Platform',
    preview:
      'A look at why I built a bare-metal k3s homelab, what I chose to run on it, and how it became a serious platform engineering project instead of just a home server.',
    date: 'April 29, 2026',
    tags: ['DevOps', 'Thoughts'],
    body: [
      'I did not want my homelab to become a pile of disconnected services and one-off fixes. The goal was to use it as a real platform engineering environment: something opinionated enough to run useful workloads, but structured enough to exercise the same operational decisions that show up in production systems.',
      'That is why I built it around k3s, ArgoCD, Traefik, cert-manager, Longhorn, CloudNativePG, Dragonfly, and a full observability stack. The interesting part was not just installing those tools. It was deciding how they should fit together as a coherent operating model. GitOps, TLS automation, ingress, storage, databases, service mesh, VPN access, and monitoring all needed to reinforce each other rather than behave like isolated components.',
      'I also wanted the repo itself to communicate engineering maturity. The project includes bootstrap scripts, overlays, architecture decisions, CI workflows, and runbooks because a platform is not just the cluster state. It is the repeatability, diagnostics, and recovery model around it. A homelab only becomes valuable as a portfolio project when it demonstrates judgment, not just tool familiarity.',
      'One of the most useful parts of the project was forcing tradeoff decisions in a constrained environment. Running on a single bare-metal node means every choice has real cost: memory usage, storage behavior, service sprawl, and operational complexity all matter more. That pressure made the architecture better, because it forced me to think about what actually deserves to be part of the platform.',
      'The result is something I treat less like a hobby server and more like a practice ground for platform operations. It gives me a place to work through GitOps patterns, network design, Kubernetes workload management, observability, and reliability controls in a system I fully own end to end.',
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
