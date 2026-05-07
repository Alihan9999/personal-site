import { contactLinks, posts, projects, skills } from '../data';

const padRight = (str, n) => {
  const s = String(str ?? '');
  return s.length >= n ? `${s.slice(0, n - 1)} ` : s + ' '.repeat(n - s.length);
};

const ageFrom = (iso) => {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  if (days === 0) return 'today';
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  return `${Math.floor(days / 365)}y`;
};

const lookupResource = {
  projects: () => projects.map((p) => p.slug),
  posts: () => posts.map((p) => p.slug),
  stack: () => skills.flatMap((g) => g.items),
  endpoints: () => contactLinks.map((c) => c.label.toLowerCase()),
};

function kubectlGet(resource) {
  switch (resource) {
    case 'projects': {
      const header = `${padRight('NAME', 32)}${padRight('TAGS', 28)}${padRight('STATUS', 10)}AGE`;
      const rows = projects.map((p) => {
        const lastDeploy = p.meta?.lastDeploy;
        const age = lastDeploy ? ageFrom(lastDeploy) : '—';
        return `${padRight(p.slug, 32)}${padRight(p.tags.join(','), 28)}${padRight('Ready', 10)}${age}`;
      });
      return [header, ...rows];
    }
    case 'posts': {
      const header = `${padRight('NAME', 50)}${padRight('TAGS', 22)}DATE`;
      const rows = posts.map((p) => `${padRight(p.slug, 50)}${padRight(p.tags.join(','), 22)}${p.date}`);
      return [header, ...rows];
    }
    case 'stack': {
      const header = `${padRight('CATEGORY', 18)}ITEMS`;
      const rows = skills.map((g) => `${padRight(g.category, 18)}${g.items.join(', ')}`);
      return [header, ...rows];
    }
    case 'endpoints': {
      const header = `${padRight('NAME', 12)}${padRight('PROTOCOL', 10)}${padRight('PORT', 8)}ENDPOINT`;
      const rows = contactLinks.map(
        (c) =>
          `${padRight(c.label.toLowerCase(), 12)}${padRight(c.protocol, 10)}${padRight(c.port, 8)}${c.href}`,
      );
      return [header, ...rows];
    }
    default:
      return [`error: unknown resource "${resource}"`, 'usage: kubectl get <projects|posts|stack|endpoints>'];
  }
}

export const commands = [
  {
    name: 'help',
    description: 'list available commands',
    run: () => [
      'available commands:',
      '  help                              this',
      '  whoami                            persona row',
      '  ls                                list site resources',
      '  cat <post-slug>                   print post preview',
      '  kubectl get <resource>            projects|posts|stack|endpoints',
      '  open <slug>                       navigate to a project or post',
      '  theme <dark|light>                set theme',
      '  goto <section>                    now|projects|stack|writing|about|contact',
      '  motion <on|off>                   manual reduced-motion override',
      '  history                           show recent commands',
      '  clear                             clear scrollback',
      '',
      'tip: Tab to autocomplete · Up/Down to recall history · Esc to close',
    ],
  },
  {
    name: 'whoami',
    description: 'print persona row',
    run: () => ['alihan', '  role:   devops/platform-engineer', '  status: Ready', '  focus:  platforms'],
  },
  {
    name: 'ls',
    description: 'list site resources',
    run: () => [
      `projects/    ${projects.length} entries`,
      `posts/       ${posts.length} entries`,
      `stack/       ${skills.length} categories`,
      `endpoints/   ${contactLinks.length} exposed`,
    ],
  },
  {
    name: 'cat',
    description: 'print post preview',
    autocomplete: (arg) =>
      posts
        .map((p) => p.slug)
        .filter((slug) => slug.startsWith(arg))
        .map((slug) => `cat ${slug}`),
    run: ({ args }) => {
      if (!args[0]) return ['usage: cat <post-slug>'];
      const post = posts.find((p) => p.slug === args[0] || p.slug === args[0].replace(/\.md$/, ''));
      if (!post) return [`cat: ${args[0]}: no such post`];
      return [`# ${post.title}`, `# ${post.date}`, '', post.preview];
    },
  },
  {
    name: 'kubectl',
    description: 'kubectl get <projects|posts|stack|endpoints>',
    autocomplete: (arg) => {
      const verbs = ['get'];
      const parts = arg.split(' ');
      if (parts.length === 1) return verbs.filter((v) => v.startsWith(parts[0])).map((v) => `kubectl ${v}`);
      if (parts.length === 2 && parts[0] === 'get') {
        return Object.keys(lookupResource)
          .filter((r) => r.startsWith(parts[1]))
          .map((r) => `kubectl get ${r}`);
      }
      return [];
    },
    run: ({ args }) => {
      if (args[0] !== 'get' || !args[1]) return ['usage: kubectl get <projects|posts|stack|endpoints>'];
      return kubectlGet(args[1]);
    },
  },
  {
    name: 'open',
    description: 'navigate to a project or post',
    autocomplete: (arg) => {
      const all = [...projects.map((p) => p.slug), ...posts.map((p) => p.slug)];
      return all.filter((slug) => slug.startsWith(arg)).map((slug) => `open ${slug}`);
    },
    run: ({ args, navigate, close }) => {
      if (!args[0]) return ['usage: open <slug>'];
      const project = projects.find((p) => p.slug === args[0]);
      if (project) {
        navigate(`/projects/${project.slug}`);
        close();
        return null;
      }
      const post = posts.find((p) => p.slug === args[0]);
      if (post) {
        navigate(`/posts/${post.slug}`);
        close();
        return null;
      }
      return [`open: no project or post matches "${args[0]}"`];
    },
  },
  {
    name: 'theme',
    description: 'set theme dark|light',
    autocomplete: (arg) => ['dark', 'light'].filter((t) => t.startsWith(arg)).map((t) => `theme ${t}`),
    run: ({ args, theme, setTheme }) => {
      const target = args[0];
      if (!target) return [`current theme: ${theme}`];
      if (target !== 'dark' && target !== 'light') return ['usage: theme <dark|light>'];
      setTheme(target);
      return [`theme set to ${target}`];
    },
  },
  {
    name: 'goto',
    description: 'scroll to section',
    autocomplete: (arg) => {
      const sections = ['now', 'projects', 'stack', 'writing', 'about', 'contact'];
      return sections.filter((s) => s.startsWith(arg)).map((s) => `goto ${s}`);
    },
    run: ({ args, navigate, close }) => {
      if (!args[0]) return ['usage: goto <section>'];
      navigate(`/#${args[0]}`);
      close();
      return null;
    },
  },
  {
    name: 'motion',
    description: 'manual reduced-motion override',
    autocomplete: (arg) => ['on', 'off'].filter((t) => t.startsWith(arg)).map((t) => `motion ${t}`),
    run: ({ args }) => {
      if (!args[0]) return ['usage: motion <on|off>'];
      try {
        if (args[0] === 'off') {
          window.localStorage.setItem('motion:reduce', '1');
        } else {
          window.localStorage.removeItem('motion:reduce');
        }
      } catch {
        /* ignore */
      }
      return [`motion ${args[0] === 'off' ? 'reduced (preference saved)' : 'restored to system default'}`, 'reload to apply'];
    },
  },
  {
    name: 'history',
    description: 'show recent commands',
    run: ({ history }) => {
      if (!history.length) return ['(no history)'];
      return history.map((entry, index) => `${String(index + 1).padStart(3, ' ')}  ${entry}`);
    },
  },
  {
    name: 'clear',
    description: 'clear scrollback',
    run: ({ clear }) => {
      clear();
      return null;
    },
  },
];

const commandMap = new Map(commands.map((c) => [c.name, c]));

export function parseInput(input) {
  const tokens = input.trim().split(/\s+/);
  const name = tokens[0]?.toLowerCase();
  const args = tokens.slice(1);
  return { name, args };
}

export function getCommand(name) {
  return commandMap.get(name);
}

export function autocomplete(input) {
  const trimmed = input.trim();
  if (!trimmed) return [];
  const tokens = trimmed.split(/\s+/);
  if (tokens.length === 1) {
    return commands.map((c) => c.name).filter((n) => n.startsWith(tokens[0]));
  }
  const cmd = commandMap.get(tokens[0].toLowerCase());
  if (!cmd?.autocomplete) return [];
  const argText = tokens.slice(1).join(' ');
  return cmd.autocomplete(argText);
}
