import { useState } from 'react'
import './InfraStack.css'

type LayerId =
  | 'hardware'
  | 'networking'
  | 'cluster'
  | 'training'
  | 'model'
  | 'serving'
  | 'api'
  | 'orchestration'
  | 'application'

interface Responsibility {
  label: string
  detail: string
}

interface Layer {
  id: LayerId
  level: number          // 1 = bottom, 9 = top
  label: string
  sublabel: string
  who: string            // who typically operates this
  color: string
  icon: string
  description: string
  responsibilities: Responsibility[]
  examples: string[]
  keyMetrics: { label: string; value: string }[]
}

const LAYERS: Layer[] = [
  {
    id: 'hardware',
    level: 1,
    label: 'Hardware',
    sublabel: 'GPUs, TPUs, accelerators, power & cooling',
    who: 'Cloud providers / hyperscalers',
    color: '#6366f1',
    icon: '⬛',
    description:
      'The physical foundation. Modern LLMs are trained and served on purpose-built accelerators — most commonly NVIDIA H100/A100 GPUs or Google TPUs. These chips are optimised for the matrix multiplications that dominate neural network compute. A single H100 delivers 1 PFLOP of BF16 throughput. Training a frontier model may require tens of thousands of them running in parallel for months. Power, cooling, and physical rack density are first-class engineering constraints at this layer.',
    responsibilities: [
      { label: 'Matrix multiply throughput', detail: 'Tensor cores execute the fused multiply-add (FMA) operations that make up attention and feed-forward layers.' },
      { label: 'High-bandwidth memory (HBM)', detail: 'GPU HBM (e.g. 80 GB on H100) holds model weights and KV-cache. Memory bandwidth, not FLOP count, is usually the bottleneck at inference.' },
      { label: 'Power & thermal management', detail: 'An H100 SXM draws up to 700 W. A rack of 8 is ~6 kW; a 10 000-GPU cluster is ~60 MW — comparable to a small city.' },
      { label: 'NVLink / NVSwitch interconnect', detail: 'Within a single node, GPUs communicate at 900 GB/s via NVLink, orders of magnitude faster than PCIe, critical for tensor parallelism.' },
    ],
    examples: ['NVIDIA H100 SXM5', 'NVIDIA A100', 'Google TPU v4/v5', 'AMD MI300X', 'AWS Trainium / Inferentia'],
    keyMetrics: [
      { label: 'H100 BF16 TFLOPS', value: '1,979' },
      { label: 'H100 HBM3 bandwidth', value: '3.35 TB/s' },
      { label: 'H100 TDP', value: '700 W' },
      { label: 'NVLink bandwidth', value: '900 GB/s' },
    ],
  },
  {
    id: 'networking',
    level: 2,
    label: 'High-Speed Networking',
    sublabel: 'InfiniBand, RoCE, inter-node fabric',
    who: 'Cloud providers / HPC teams',
    color: '#8b5cf6',
    icon: '🔗',
    description:
      'Individual accelerator nodes are connected into clusters via ultra-low-latency, high-bandwidth fabrics. NVIDIA InfiniBand HDR/NDR (200–400 Gb/s per port) or RoCE (RDMA over Converged Ethernet) are the dominant technologies. This layer enables the All-Reduce communication patterns that gradient synchronisation requires across thousands of GPUs. Network topology — fat-tree, dragonfly, rail-optimised — directly affects training throughput and cost efficiency.',
    responsibilities: [
      { label: 'All-Reduce collective ops', detail: 'After each backward pass, every GPU must synchronise gradients. All-Reduce latency is often the critical path; NCCL and Gloo implement these collectives.' },
      { label: 'RDMA (Remote DMA)', detail: 'Allows GPUs to read/write each other\'s memory without CPU involvement, reducing latency to sub-microsecond levels.' },
      { label: 'Topology-aware routing', detail: 'Switches must route traffic to minimize contention. Fat-tree topologies provide full bisection bandwidth; rail-optimised topologies prioritise all-reduce patterns.' },
      { label: 'Fault-tolerant rerouting', detail: 'At scale, link failures are inevitable. The fabric must reroute without dropping a training run or an inference request.' },
    ],
    examples: ['NVIDIA InfiniBand NDR 400G', 'RoCEv2', 'AWS EFA (Elastic Fabric Adapter)', 'Google Jupiter network', 'Arista 7800 spine switches'],
    keyMetrics: [
      { label: 'InfiniBand NDR bandwidth', value: '400 Gb/s' },
      { label: 'All-Reduce latency (1k nodes)', value: '~10 ms' },
      { label: 'GPU cluster bisect BW', value: 'full (fat-tree)' },
      { label: 'RDMA latency', value: '<1 µs' },
    ],
  },
  {
    id: 'cluster',
    level: 3,
    label: 'Cluster Orchestration',
    sublabel: 'Kubernetes, Slurm, job scheduling',
    who: 'ML platform / infrastructure teams',
    color: '#a855f7',
    icon: '🗂',
    description:
      'Raw hardware must be carved up into schedulable units and presented to jobs. HPC clusters traditionally use Slurm; cloud-native shops use Kubernetes with GPU device plugins. This layer handles multi-tenancy (sharing hardware across teams), preemption policies, quota management, and affinity scheduling (ensuring a job\'s ranks land on the same InfiniBand rail). Job queuing, retries on node failure, and checkpointing coordination also live here.',
    responsibilities: [
      { label: 'GPU scheduling & binpacking', detail: 'Decide which physical nodes satisfy a job\'s resource request (e.g. 512 H100s), respecting affinity rules and rack topology.' },
      { label: 'Multi-tenancy & quotas', detail: 'Enforce team-level GPU quotas, priority classes, and fair-share scheduling to prevent monopolisation of the cluster.' },
      { label: 'Checkpoint coordination', detail: 'Trigger periodic model saves to distributed storage. On failure, reschedule the job and resume from the latest checkpoint.' },
      { label: 'Elastic training', detail: 'Dynamically add or remove workers (e.g. Elastic Horovod, PyTorch Elastic) without restarting a run when nodes fail or become available.' },
    ],
    examples: ['Slurm', 'Kubernetes + NVIDIA GPU Operator', 'Ray Cluster', 'AWS EKS', 'Google GKE', 'Azure AKS', 'Volcano (batch scheduler)'],
    keyMetrics: [
      { label: 'Scheduling granularity', value: '1 GPU' },
      { label: 'Typical checkpoint interval', value: '10–30 min' },
      { label: 'Job queue depth', value: 'thousands' },
      { label: 'Preemption latency', value: 'seconds' },
    ],
  },
  {
    id: 'training',
    level: 4,
    label: 'Training Infrastructure',
    sublabel: 'Distributed training, optimisers, data pipelines',
    who: 'AI research / ML engineering teams',
    color: '#ec4899',
    icon: '🧠',
    description:
      'Training a frontier model is a months-long distributed systems problem as much as a machine learning one. This layer implements the parallelism strategies that allow a model with hundreds of billions of parameters to be split across thousands of GPUs: tensor parallelism (split a single layer\'s weight matrix), pipeline parallelism (split layers into stages), and data parallelism (run independent micro-batches). Mixed-precision training (BF16 weights, FP8 gradients), gradient checkpointing to trade compute for memory, and massive-scale data pipelines all live here.',
    responsibilities: [
      { label: 'Tensor parallelism', detail: 'Split individual weight matrices (e.g. the QKV projection) across GPUs. Each GPU holds a shard; an All-Reduce synchronises partial results. Requires the ultra-low latency NVLink provides within a node.' },
      { label: 'Pipeline parallelism', detail: 'Assign consecutive transformer layers to different GPU stages (like a factory pipeline). GPPUs pass activations forward and gradients backward between stages; micro-batches keep all stages busy.' },
      { label: 'Data parallelism + ZeRO', detail: 'Each GPU sees different data shards. Gradients are averaged via All-Reduce. ZeRO (Zero Redundancy Optimizer) shards optimizer state, gradients, and parameters across ranks to reduce per-GPU memory.' },
      { label: 'Data pipelines', detail: 'Feeding trillions of tokens without GPU starvation requires careful pre-tokenisation, shuffling, packing into fixed-length sequences, and streaming from distributed object stores (S3, GCS).' },
    ],
    examples: ['PyTorch FSDP / DDP', 'Megatron-LM', 'DeepSpeed ZeRO', 'JAX + XLA', 'Hugging Face Accelerate', 'NVIDIA NeMo'],
    keyMetrics: [
      { label: 'GPT-4 estimated training compute', value: '~2×10²⁵ FLOPs' },
      { label: 'Llama 3 405B training tokens', value: '15 T' },
      { label: 'Typical MFU (model flop util.)', value: '35–55%' },
      { label: 'ZeRO-3 memory savings', value: 'up to 64×' },
    ],
  },
  {
    id: 'model',
    level: 5,
    label: 'Model & Weights',
    sublabel: 'Architecture, pre-training, RLHF, quantisation',
    who: 'AI researchers / model providers',
    color: '#f43f5e',
    icon: '⚗️',
    description:
      'The model itself: a large transformer with a learned vocabulary, billions of parameters, and emergent reasoning capabilities. This layer covers architecture decisions (number of layers, attention heads, context length, MoE vs dense), the pre-training run on trillions of tokens, and post-training alignment techniques — SFT (supervised fine-tuning), RLHF (reinforcement learning from human feedback), and DPO (direct preference optimisation). Quantisation (INT8, INT4, FP8) compresses weights after training to reduce memory and increase inference throughput.',
    responsibilities: [
      { label: 'Architecture design', detail: 'Transformer variant choices: grouped-query attention (GQA), sliding-window attention, RoPE positional encoding, SwiGLU activation, MoE gating — each affecting capability, speed, and memory.' },
      { label: 'Pre-training', detail: 'Self-supervised next-token prediction on web-scale corpora (Common Crawl, books, code, scientific papers). This is where the model learns language, facts, and reasoning.' },
      { label: 'Alignment & fine-tuning', detail: 'SFT on curated demonstrations, then RLHF/DPO to align the model to human preferences: be helpful, harmless, and honest. PEFT techniques (LoRA, QLoRA) make this affordable at smaller scale.' },
      { label: 'Quantisation & compression', detail: 'Post-training quantisation (PTQ) maps FP16 weights to INT8/INT4, cutting memory 2–4× with minimal quality loss. GPTQ, AWQ, and bitsandbytes are common libraries.' },
    ],
    examples: ['GPT-4 / o-series', 'Claude 3/4', 'Gemini 2.x', 'Llama 3', 'Mistral / Mixtral', 'DeepSeek V3/R1', 'Falcon', 'Phi-3'],
    keyMetrics: [
      { label: 'Llama 3.1 405B params', value: '405 B' },
      { label: 'GPT-4 estimated params', value: '~1.8 T (MoE)' },
      { label: 'INT4 quantisation speedup', value: '~2–4×' },
      { label: 'LoRA trainable params', value: '<1% of total' },
    ],
  },
  {
    id: 'serving',
    level: 6,
    label: 'Inference & Serving Engine',
    sublabel: 'vLLM, TensorRT-LLM, continuous batching, KV-cache',
    who: 'ML platform / inference teams',
    color: '#f97316',
    icon: '⚡',
    description:
      'Taking a trained model and making it serve thousands of concurrent requests efficiently is a specialised engineering problem. Inference engines implement continuous batching (dynamically group requests to keep GPUs saturated), PagedAttention (manage KV-cache memory the way an OS manages RAM pages to eliminate fragmentation), speculative decoding (draft tokens fast with a small model, verify with the large one), and quantised kernels. This layer is where most latency and cost optimisation happens in production.',
    responsibilities: [
      { label: 'Continuous batching', detail: 'Unlike static batching, continuous batching inserts new requests into the batch as slots free up, keeping GPU utilisation near 100% even with variable-length requests.' },
      { label: 'KV-cache management (PagedAttention)', detail: 'The key-value cache for each sequence can be GBs. PagedAttention allocates KV-cache in fixed-size "pages" (like virtual memory) to eliminate fragmentation and allow sharing common prefixes across requests (prompt caching).' },
      { label: 'Tensor parallelism at inference', detail: 'Large models are split across multiple GPUs at serving time too, using the same TP strategies as training, but optimised for low latency rather than throughput.' },
      { label: 'Speculative decoding', detail: 'A cheap draft model generates k candidate tokens; the target model verifies all k in a single forward pass. On high-acceptance inputs this gives 2–3× speedup with identical output distribution.' },
    ],
    examples: ['vLLM', 'TensorRT-LLM', 'llama.cpp', 'Ollama', 'SGLang', 'Hugging Face TGI', 'NVIDIA Triton Inference Server'],
    keyMetrics: [
      { label: 'vLLM throughput gain vs naive', value: '~24×' },
      { label: 'Speculative decoding speedup', value: '2–3×' },
      { label: 'GPU memory util. (PagedAttention)', value: '>90%' },
      { label: 'Target TTFT (time-to-first-token)', value: '<200 ms' },
    ],
  },
  {
    id: 'api',
    level: 7,
    label: 'Model API',
    sublabel: 'REST/streaming endpoints, auth, rate limiting, billing',
    who: 'Model providers (OpenAI, Anthropic, Google…)',
    color: '#eab308',
    icon: '🔌',
    description:
      'The API layer exposes model capabilities to the outside world via a standardised HTTP interface. The de-facto standard is OpenAI\'s Chat Completions API schema, which most providers now implement for compatibility. This layer handles authentication (API keys, OAuth), per-key rate limiting (requests/min, tokens/min), usage metering (counting input and output tokens), streaming responses via Server-Sent Events, and multi-modal routing (directing image or audio inputs to the correct serving backend).',
    responsibilities: [
      { label: 'Request routing & load balancing', detail: 'Route each request to an available inference replica. Sticky routing (for prompt-cache hits) vs. round-robin creates a cost/latency trade-off.' },
      { label: 'Streaming (SSE / chunked transfer)', detail: 'Stream tokens back to the client as they are generated using Server-Sent Events, reducing perceived latency from the full generation time to the time-to-first-token.' },
      { label: 'Token counting & billing', detail: 'Accurately count input and output tokens for each request, aggregate per API key, and feed into the billing system. Input token counting happens before the call; output is counted during generation.' },
      { label: 'Content moderation & safety', detail: 'Run classifiers on inputs and outputs to detect and reject violating content. At the API layer this is the last defence before bytes leave the data centre.' },
    ],
    examples: ['OpenAI API', 'Anthropic API', 'Google Gemini API', 'AWS Bedrock', 'Azure OpenAI Service', 'Groq API', 'Together AI'],
    keyMetrics: [
      { label: 'OpenAI uptime SLA', value: '99.9%' },
      { label: 'Typical rate limit (tier 1)', value: '500 RPM' },
      { label: 'SSE first-chunk latency', value: '<500 ms' },
      { label: 'Billing granularity', value: '1 token' },
    ],
  },
  {
    id: 'orchestration',
    level: 8,
    label: 'Orchestration & Middleware',
    sublabel: 'Agents, tool use, RAG pipelines, memory, guardrails',
    who: 'Application developers / AI engineers',
    color: '#10b981',
    icon: '🔀',
    description:
      'Raw API calls rarely satisfy production requirements. The orchestration layer composes multiple LLM calls, tool invocations, memory reads/writes, and retrieval steps into complex workflows. Frameworks like LangChain, LlamaIndex, and Semantic Kernel provide abstractions for chains, agents, and RAG pipelines. This is where prompt management, output parsing, retry logic, context window management (the compaction strategies described above), observability, and cost guardrails are implemented.',
    responsibilities: [
      { label: 'Agentic loops', detail: 'ReAct and function-calling loops let the model decide which tools to call (web search, code execution, database queries), observe results, and iterate until a task is complete.' },
      { label: 'RAG pipelines', detail: 'Embed user queries, retrieve chunks from a vector store, inject into the prompt, and post-process citations. Chunking strategy, embedding model choice, and reranking all live here.' },
      { label: 'Prompt management', detail: 'Version-control prompt templates, manage few-shot examples, A/B test prompts, and compile structured outputs (JSON schema) that downstream code can consume reliably.' },
      { label: 'Observability & tracing', detail: 'Trace every LLM call, tool invocation, and token count. Feed latency, cost, and quality metrics to dashboards. Essential for debugging multi-step agent failures.' },
    ],
    examples: ['LangChain', 'LlamaIndex', 'Semantic Kernel', 'AutoGen', 'CrewAI', 'Haystack', 'Vercel AI SDK', 'Anthropic Claude Tools'],
    keyMetrics: [
      { label: 'Agent tool-call round-trips', value: '1–20+' },
      { label: 'RAG retrieval latency', value: '10–100 ms' },
      { label: 'Overhead vs raw API call', value: '+5–50 ms' },
      { label: 'Context budget at this layer', value: 'all of it' },
    ],
  },
  {
    id: 'application',
    level: 9,
    label: 'Application & UX',
    sublabel: 'Chat UI, copilots, voice, embedded AI features',
    who: 'Product teams / end-user developers',
    color: '#06b6d4',
    icon: '💬',
    description:
      'The top of the stack: what users actually see and touch. This includes chat interfaces (ChatGPT, Claude.ai), IDE copilots (GitHub Copilot, Cursor), voice assistants, document editors with AI features, and thousands of vertical SaaS products that embed LLMs into their workflows. The application layer owns the user experience, session management, authentication, and the product-level decisions about which capabilities to expose — and which to hide behind safe defaults.',
    responsibilities: [
      { label: 'Conversation & session management', detail: 'Persist chat history, manage user accounts, enforce per-user rate limits, and handle multi-device session sync.' },
      { label: 'UI streaming & rendering', detail: 'Progressively render streamed markdown, code blocks, LaTeX, and images as tokens arrive, giving users instant feedback rather than a long blank wait.' },
      { label: 'Feature gating & model selection', detail: 'Route simple queries to cheaper/faster models (e.g. Haiku, GPT-4o mini) and complex ones to frontier models. Present capability tiers (free vs. pro) to users.' },
      { label: 'Feedback & RLHF data collection', detail: 'Thumbs up/down ratings, edited responses, and regeneration events feed back into the model provider\'s alignment pipeline to improve future versions.' },
    ],
    examples: ['ChatGPT', 'Claude.ai', 'GitHub Copilot', 'Cursor', 'Notion AI', 'Perplexity', 'Microsoft Copilot', 'Custom chat UIs'],
    keyMetrics: [
      { label: 'ChatGPT weekly active users', value: '~400 M' },
      { label: 'Typical streaming render rate', value: '30–80 tok/s' },
      { label: 'Cold start latency (web)', value: '<3 s' },
      { label: 'Feedback loop to training', value: 'days–weeks' },
    ],
  },
]

// Reversed for display (top = application, bottom = hardware)
const DISPLAY_LAYERS = [...LAYERS].reverse()

export default function InfraStack() {
  const [activeId, setActiveId] = useState<LayerId>('serving')
  const active = LAYERS.find((l) => l.id === activeId)!

  return (
    <div className="infra-wrap">

      {/* Stack diagram */}
      <div className="stack-diagram">
        <div className="stack-axis-label stack-axis-top">Users / Applications</div>
        <div className="stack-layers">
          {DISPLAY_LAYERS.map((layer) => (
            <button
              key={layer.id}
              className={`stack-layer ${activeId === layer.id ? 'active' : ''}`}
              style={{ '--layer-color': layer.color } as React.CSSProperties}
              onClick={() => setActiveId(layer.id)}
              aria-pressed={activeId === layer.id}
            >
              <span className="stack-layer-icon">{layer.icon}</span>
              <span className="stack-layer-info">
                <span className="stack-layer-label">{layer.label}</span>
                <span className="stack-layer-sub">{layer.sublabel}</span>
              </span>
              <span className="stack-layer-who">{layer.who}</span>
              <span className="stack-layer-chevron">›</span>
            </button>
          ))}
        </div>
        <div className="stack-axis-label stack-axis-bottom">Physical hardware / Data centre</div>
      </div>

      {/* Detail panel */}
      <div className="infra-detail" key={activeId}>
        <div className="infra-detail-header" style={{ '--layer-color': active.color } as React.CSSProperties}>
          <span className="infra-detail-icon">{active.icon}</span>
          <div className="infra-detail-titles">
            <h3>{active.label}</h3>
            <p className="infra-detail-sub">{active.sublabel}</p>
          </div>
          <div className="infra-detail-who">
            <span className="who-label">Operated by</span>
            <span className="who-value">{active.who}</span>
          </div>
        </div>

        <p className="infra-detail-desc">{active.description}</p>

        <div className="infra-responsibilities">
          <div className="infra-sub-heading">Key responsibilities</div>
          <div className="responsibilities-grid">
            {active.responsibilities.map((r, i) => (
              <div key={i} className="responsibility-card">
                <div className="resp-label">{r.label}</div>
                <div className="resp-detail">{r.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="infra-bottom-grid">
          <div className="infra-examples">
            <div className="infra-sub-heading">Examples & technologies</div>
            <div className="examples-chips">
              {active.examples.map((ex, i) => (
                <span key={i} className="example-chip" style={{ '--layer-color': active.color } as React.CSSProperties}>
                  {ex}
                </span>
              ))}
            </div>
          </div>

          <div className="infra-metrics">
            <div className="infra-sub-heading">Key numbers</div>
            <div className="metrics-grid">
              {active.keyMetrics.map((m, i) => (
                <div key={i} className="metric-item">
                  <span className="metric-value" style={{ color: active.color }}>{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
