import { useReducedMotion } from '../hooks/useReducedMotion';

const nodes = [
  { id: 'user', x: 60, label: 'user', sub: 'GET /' },
  { id: 'cf', x: 230, label: 'cloudflare', sub: 'dns · tls' },
  { id: 'vercel', x: 410, label: 'vercel', sub: 'edge · static' },
  { id: 'react', x: 600, label: 'react-router', sub: 'spa · loaders' },
  { id: 'bento', x: 800, label: 'bento', sub: 'rendered ui' },
];

const NODE_W = 130;
const NODE_H = 60;
const Y = 70;

export function InfraDiagram() {
  const reduced = useReducedMotion();

  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 960 200"
        className="block h-auto w-full"
        role="img"
        aria-label="Request path: user → Cloudflare → Vercel → React Router → bento"
      >
        <defs>
          <linearGradient id="nodeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(245,158,11,0.16)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.04)" />
          </linearGradient>
        </defs>

        {nodes.slice(0, -1).map((node, idx) => {
          const next = nodes[idx + 1];
          const x1 = node.x + NODE_W;
          const x2 = next.x;
          const y = Y + NODE_H / 2;
          const lineId = `line-${node.id}-${next.id}`;
          return (
            <g key={lineId}>
              <line
                x1={x1}
                x2={x2}
                y1={y}
                y2={y}
                stroke="rgba(52,211,154,0.55)"
                strokeWidth="1.4"
                strokeDasharray="6 4"
              >
                {!reduced ? (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-40"
                    dur={`${1.6 + idx * 0.2}s`}
                    repeatCount="indefinite"
                  />
                ) : null}
              </line>
              <polygon
                points={`${x2 - 6},${y - 4} ${x2},${y} ${x2 - 6},${y + 4}`}
                fill="rgba(52,211,154,0.85)"
              />
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x},${Y})`}>
            <rect
              width={NODE_W}
              height={NODE_H}
              rx="10"
              fill="url(#nodeGrad)"
              stroke="rgba(245,158,11,0.6)"
              strokeWidth="1"
            />
            <text
              x={NODE_W / 2}
              y={NODE_H / 2 - 4}
              textAnchor="middle"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="14"
              fill="#fcd34d"
            >
              {node.label}
            </text>
            <text
              x={NODE_W / 2}
              y={NODE_H / 2 + 14}
              textAnchor="middle"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="10"
              fill="rgba(148,163,184,0.85)"
            >
              {node.sub}
            </text>
          </g>
        ))}

        <text
          x="60"
          y="170"
          fontFamily="JetBrains Mono, ui-monospace, monospace"
          fontSize="11"
          fill="rgba(148,163,184,0.7)"
        >
          # ~50ms cold-start · &lt;5ms warm · static-first, hydrated client-side
        </text>
      </svg>
      <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
        # this site's request path
      </figcaption>
    </figure>
  );
}
