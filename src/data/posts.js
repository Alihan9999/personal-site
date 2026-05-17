export const blogFilters = ['All', 'AI', 'DevOps', 'AWS', 'CI/CD', 'Thoughts'];

export const posts = [
  {
    slug: 'from-0rca-to-lvlupeng',
    title: 'From 0rca to LVLUpEng: What I Am Building Next',
    preview:
      '0rca is no longer my currently shipping product. It became the systems-design learning ground that shaped my next product: LVLUpEng.',
    date: 'May 17, 2026',
    tags: ['DevOps', 'Thoughts'],
    body: [
      '0rca is no longer the product I am actively shipping. I still think it was one of the most useful builds I have taken on, but I see it differently now: less as the final company I wanted to push into market, and more as a serious learning experience in orchestration, agent workflows, product scope, and how complex software starts to behave when every feature depends on the next system around it.',
      'The useful part of 0rca was not just the AI wrapper. It forced me to think through company objects, departments, agents, directives, DAG-based execution, dependency management, handoffs, and refinement loops. Those are real platform problems. Building it gave me a much better feel for where agentic software becomes powerful, where it becomes hard to explain, and where a product can get too abstract before the user has a concrete win.',
      'That lesson is what led me toward LVLUpEng. Instead of building an AI company operating system around a broad founder workflow, I am now focused on a narrower and more personal problem: helping engineers understand what to learn next, prove what they already know, and turn career growth into visible technical evidence.',
      'LVLUpEng turns engineering development into a skill tree. The product starts with an assessment, maps users into engineer archetypes, and gives them a roadmap across domains like Git, Linux, cloud, CI/CD, DevOps, backend, frontend, security, systems, QA, mobile, data engineering, and AI engineering. The goal is not to make learning feel like school. The goal is to make growth feel like engineering: concrete tasks, real artifacts, and visible progression.',
      'The part I care about most is verification. LVLUpEng is being designed around GitHub-backed proof instead of self-reported confidence. A skill should not become verified because someone clicked a checkbox or because an AI model liked the answer. It should become verified because deterministic signals found real evidence in a repository: workflows, tests, Dockerfiles, Terraform modules, conventional commits, project structure, documentation, and other artifacts that hiring managers and senior engineers can actually inspect.',
      'That architecture is why the product has a real data foundation behind it. The current build uses Next.js, React, Auth.js, Drizzle, Postgres, Tailwind, and a detector pipeline that can grow over time. The product surface may look like a career app, but the engineering problem underneath is platform-oriented: modeling skills, mapping evidence, protecting privacy, keeping verification auditable, and making the next step obvious without turning the experience into another generic course catalog.',
      'So 0rca was not a failure; it was the project that clarified the direction. It taught me that orchestration is only valuable when it points at a sharp user problem. LVLUpEng is the sharper version of that lesson. It is the product I am focused on now: a practical, evidence-driven way for engineers to level up through real work.',
    ],
  },
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

export const findPostBySlug = (slug) => posts.find((post) => post.slug === slug);
