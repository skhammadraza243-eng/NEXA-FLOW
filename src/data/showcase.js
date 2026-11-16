export const showcaseCategories = [
  'All',
  'Edge Compute',
  'AI & Vectors',
  'DevOps & Cloud',
  'Observability',
];

export const showcaseItems = [
  {
    id: 'edge-gateway-v2',
    category: 'Edge Compute',
    badge: 'Trending',
    title: 'OmniEdge Dynamic Gateway',
    subtitle: 'Anycast DNS with instant failover routing',
    description:
      'Distributes incoming web requests across global edge pops using real-time packet latency feedback algorithms.',
    longDescription:
      'OmniEdge Dynamic Gateway combines software-defined Anycast BGP routing with instant health probes to guarantee sub-millisecond edge resolution. Supports custom Rust/WASM interceptors for JWT validation and request shaping.',
    icon: 'Globe',
    accent: 'indigo',
    tags: ['Rust WASM', 'Anycast', 'BGP Tier-1'],
    metrics: { primary: '0.3ms', label: 'Edge Resolution' },
    codeSnippet: `// Edge Interceptor Runtime
import { Router } from '@apex/edge';

const edge = new Router();
edge.get('/api/*', async (req, ctx) => {
  const geo = ctx.geo.nearestNode();
  return ctx.cache.fetch(req, { ttl: 3600, origin: geo });
});`,
    features: [
      'Multi-region DNS failover under 500ms',
      'Programmable WASM filters for request modification',
      'Automatic TLS 1.3 cert issuance via ACME v2',
      'Native support for HTTP/3 and QUIC protocol',
    ],
  },
  {
    id: 'vector-synth',
    category: 'AI & Vectors',
    badge: 'Popular',
    title: 'VectorSynth RAG Accelerators',
    subtitle: 'Ultra-low latency embeddings cache',
    description:
      'High-speed embedding cache and vector similarity engine delivering semantic search queries in under 8 milliseconds.',
    longDescription:
      'VectorSynth optimizes high-concurrency LLM inference by intercepting repetitive semantic prompts at the edge. Utilizing quantised FP8 cosine indexing, it reduces token generation cost by up to 74%.',
    icon: 'Sparkles',
    accent: 'emerald',
    tags: ['HNSW Index', 'FP8 Quantized', 'Cosine Cache'],
    metrics: { primary: '7.8ms', label: 'Cosine Query' },
    codeSnippet: `import { VectorFabric } from '@apex/ai';

const fabric = new VectorFabric({ index: 'hnsw-fp8' });
const matches = await fabric.query({
  vector: promptEmbedding,
  k: 5,
  minSimilarity: 0.92
});`,
    features: [
      'Zero-latency semantic deduplication filter',
      'Billion-scale disk-backed index with memory caching',
      'Automatic embedding pipeline for pgvector and pinecone',
      'Real-time streaming similarity metrics',
    ],
  },
  {
    id: 'ephemeral-mesh',
    category: 'DevOps & Cloud',
    badge: 'Enterprise',
    title: 'Ephemeral Sandbox Clones',
    subtitle: 'Isolated staging branches per git PR',
    description:
      'Spin up exact replicas of your staging databases and backend clusters with automated data anonymization on every pull request.',
    longDescription:
      'Eliminate staging environment contention forever. Ephemeral Sandbox uses copy-on-write storage volume virtualization to clone 500GB production schemas into isolated developer containers in 1.2 seconds.',
    icon: 'Terminal',
    accent: 'indigo',
    tags: ['CoW Storage', 'Docker Isolates', 'CI/CD Hooks'],
    metrics: { primary: '1.2s', label: 'Clone Spin-Up' },
    codeSnippet: `# .apex/preview.yml
pipelines:
  pr_staging:
    trigger: pull_request.opened
    provision:
      db_clone: postgres-prod:cow
      ttl: 48h
      mock_stripe: true`,
    features: [
      'Copy-on-write storage virtualization',
      'Automated PII data masking engine',
      'Integrated PR comments with live preview URLs',
      'Automatic decommissioning on pull request merge',
    ],
  },
  {
    id: 'telemetry-matrix',
    category: 'Observability',
    badge: 'New',
    title: 'Kernel Pulse eBPF Tracing',
    subtitle: 'Microsecond packet tracing with zero code changes',
    description:
      'Continuous distributed profiling and flamegraphs captured at the Linux kernel layer without overhead.',
    longDescription:
      'Kernel Pulse monitors socket activity, TCP drops, memory pressure, and callstacks straight from Linux eBPF hooks without needing manual SDK instrumentation or APM agents.',
    icon: 'Cpu',
    accent: 'emerald',
    tags: ['eBPF Kernel', 'Zero Overhead', 'OpenTelemetry'],
    metrics: { primary: '0.0%', label: 'CPU Overhead' },
    codeSnippet: `// apex-pulse agent config
probe "kernel_socket_latency" {
  filter: "proto == 'tcp' && port == 443"
  action: emit_histogram("edge_egress_ms")
  overhead: "strictly_zero"
}`,
    features: [
      'Kernel-level socket & TCP bottleneck detection',
      'Automatic OpenTelemetry format export',
      'Continuous live flamegraphs for CPU & allocations',
      'Sub-millisecond anomaly detection alerts',
    ],
  },
  {
    id: 'ai-prompt-firewall',
    category: 'AI & Vectors',
    badge: 'Security',
    title: 'Sentinel AI Prompt Shield',
    subtitle: 'Real-time prompt injection & jailbreak firewall',
    description:
      'Inspects in-flight LLM inputs and outputs against 50+ adversarial jailbreak vectors with microsecond evaluation.',
    longDescription:
      'Safeguard enterprise generative AI applications. Sentinel intercepts prompt inputs, evaluates intent against active adversarial patterns, and redacts PII before queries ever touch upstream model providers.',
    icon: 'Lock',
    accent: 'indigo',
    tags: ['Prompt Guard', 'PII Redact', 'Model Firewall'],
    metrics: { primary: '< 2ms', label: 'Inspection Latency' },
    codeSnippet: `import { Sentinel } from '@apex/security';

const firewall = new Sentinel({ strictness: 'enterprise' });
const cleanPrompt = await firewall.sanitize(req.body.prompt, {
  blockJailbreak: true,
  maskCreditCards: true
});`,
    features: [
      'Real-time defense against 50+ jailbreak categories',
      'Dynamic PII redaction and synthetic replacement',
      'SOC2 Type II and HIPAA compliance logs',
      'Custom regex and semantic moderation policies',
    ],
  },
  {
    id: 'serverless-redis',
    category: 'Edge Compute',
    badge: 'Popular',
    title: 'HyperKv Global Distributed State',
    subtitle: 'Sub-millisecond ACID Key-Value store',
    description:
      'Global CRDT-replicated key-value engine with automatic conflict resolution and edge replication across 5 continents.',
    longDescription:
      'HyperKv provides Redis-compatible APIs with active-active global replication. Writes made in Tokyo are cryptographically reconciled with Frankfurt in under 45ms using state-based CRDTs.',
    icon: 'Database',
    accent: 'emerald',
    tags: ['CRDT Engine', 'Redis API', 'Active-Active'],
    metrics: { primary: '99.999%', label: 'Global Availability' },
    codeSnippet: `import { HyperKv } from '@apex/kv';

const kv = new HyperKv({ region: 'auto' });
await kv.set('session:usr_9981', { auth: true }, { ex: 3600 });
const session = await kv.get('session:usr_9981');`,
    features: [
      'Multi-master CRDT conflict-free resolution',
      'Full Redis wire-protocol compatibility',
      'Automatic tiering from NVMe to cold S3 storage',
      'Point-in-time state restores with sub-second precision',
    ],
  },
];
