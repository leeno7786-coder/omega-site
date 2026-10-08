// Draft copy and public media metadata from the supplied NanoAI website kit.
export const NANOAI_FEATURES = [
  { title: 'Bring your own local model', description: "Switch among compatible chat models exposed through LM Studio. NanoAI’s tools, memories, interface, and task system remain independent of any one chat-model family. Effective tool use and multimodal support depend on the selected model." },
  { title: 'Memory that stays inspectable', description: 'Structured, temporal memory tracks facts, project context, instructions and preferences with provenance, status labels, editing and selective forgetting. Context can persist across chats and restarts.' },
  { title: 'Work that produces artifacts', description: 'Run persistent research, code, data and document tasks with tool receipts, task status and saved results. Create checked downloadable documents, workbooks and charts from supported workflows.' },
  { title: 'Tools with human oversight', description: 'Context-aware plugin routing lets NanoAI choose relevant connected services without requiring the user to memorize tool names. Read operations may proceed under configured permissions; consequential writes or changes require approval.' },
  { title: 'Multimodal on local hardware', description: 'Combine local speech recognition, speech synthesis, voice interaction, image editing/generation and vision-capable model inputs. The current image workflow uses Qwen Image Q8, with prompt preparation by the selected capable chat model.' },
  { title: 'Workstation power, mobile reach', description: 'Run the platform on Windows or Linux, and access its shared web interface from Android via Tailscale. Models execute on the host machine; remote access requires an online host and internet connectivity.' },
] as const;

export const NANOAI_METRICS = [
  { value: 'Windows + Linux', label: 'Host deployments demonstrated' },
  { value: 'Android', label: 'One host-powered remote interface' },
  { value: '24 tool steps', label: 'One documented research-and-report run' },
  { value: 'Your model', label: 'Compatible chat models through LM Studio' },
] as const;

export const NANOAI_ARCHITECTURE = [
  { title: 'Request', subtitle: 'Browser / Android', description: 'Natural-language requests from a browser or the Android remote interface.' },
  { title: 'Orchestrate', subtitle: 'NanoAI application', description: 'Routes chat, Work, memory, tools and background jobs based on the request and permissions.' },
  { title: 'Infer', subtitle: 'LM Studio + runtimes', description: 'A compatible chat model handles conversation. Distinct voice, image and research services support specialized workflows.' },
  { title: 'Act', subtitle: 'Tools + permissions', description: 'Browser, files and optional external plugins operate under a permission policy with write-action approval.' },
  { title: 'Deliver', subtitle: 'Workspace / Library', description: 'An answer, source-backed report, generated image or saved file returns to the same interface.' },
] as const;

export const NANOAI_FAQ = [
  { question: 'Does NanoAI require a cloud AI API?', answer: 'No cloud language model is required for the local chat experience: NanoAI connects to compatible locally available LM Studio models. Web research, connected online services and remote Tailscale access do use network connectivity.' },
  { question: 'Does the 35B model run on the Android phone?', answer: 'No. The Android APK presents NanoAI’s shared web interface and reaches the host system through Tailscale. Inference and saved Work files remain on the host. Remote access requires the PC and inference services to be running, plus Tailscale and internet connectivity.' },
  { question: 'Can NanoAI work with models besides Qwen?', answer: 'Yes. The primary chat-model layer discovers and selects compatible models through LM Studio. Memory, browsing and tools are application-level services; model-specific capabilities and reliability vary.' },
  { question: 'Can the AI act without approval?', answer: 'Within enabled permissions, NanoAI can use relevant read-only tools automatically. Actions that change external state use a human approval gate, and additional tool access controls are configurable.' },
  { question: 'Is NanoAI a hosted service I can sign up for?', answer: 'NanoAI is presented here as a working self-hosted engineering project. Contact Omega AI to discuss a custom system and its deployment requirements.' },
] as const;

export interface NanoAiMedia {
  slug: string;
  title: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  previewWidth: number;
}

export const NANOAI_ART: NanoAiMedia = {
  slug: 'nanoai-hero-human-ai', title: 'Human and AI collaboration',
  alt: 'AI-generated workshop scene showing human engineers and an artificial robot collaborating on machinery.',
  caption: 'Illustrative AI-generated artwork. A Qwen Image Q8 example, not a photograph of Omega AI staff or a facility.',
  width: 1024, height: 1024, previewWidth: 480,
};

export const NANOAI_WORK_DETAIL: NanoAiMedia = {
  slug: 'nanoai-work-research-detail', title: 'Research completion detail',
  alt: 'Close-up of NanoAI reporting a completed research workflow and Word document output after 24 tool steps.',
  caption: 'A closer look at the same completed task. Generated report text is demonstration output; its benchmark claims have not been independently verified.',
  width: 950, height: 789, previewWidth: 480,
};

export const NANOAI_SCREENSHOTS: readonly NanoAiMedia[] = [
  { slug: 'nanoai-work-autonomous-report', title: 'Autonomous Work', alt: 'NanoAI Work interface showing a completed 24-tool-step research task and a saved Word report in Workspace.', caption: 'A 24-step research-and-report workflow delivers a saved Word file. This is one documented demonstration, not a general performance benchmark. Generated report claims are not independently verified.', width: 1700, height: 807, previewWidth: 480 },
  { slug: 'nanoai-specialist-agent-builder', title: 'Specialist agents', alt: 'NanoAI specialist-agent builder with Describe, Configure and Try it stages and role/knowledge/tool fields.', caption: 'Build reusable specialist profiles with roles, knowledge and selected tools.', width: 1679, height: 902, previewWidth: 480 },
  { slug: 'nanoai-plugins-catalog', title: 'Plugin orchestration', alt: 'NanoAI plugin manager showing installed tools, connected services, and available integrations.', caption: 'A catalog of connected tools complements natural-language tool selection.', width: 829, height: 902, previewWidth: 480 },
  { slug: 'nanoai-human-approval-controls', title: 'Human approvals', alt: 'NanoAI settings panel showing web access and tool permission choices including Ask per message.', caption: 'Tool-permission settings separate broad access from approval for state-changing operations.', width: 624, height: 871, previewWidth: 480 },
  { slug: 'nanoai-memory-settings', title: 'Temporal memory', alt: 'NanoAI mobile Memory settings showing structured saved facts, technical preferences, provenance and edit controls.', caption: 'The actual Memory settings interface. Saved content is obscured for privacy in this supplied excerpt.', width: 1080, height: 1742, previewWidth: 480 },
  { slug: 'nanoai-android-remote', title: 'Android remote UI', alt: 'NanoAI mobile chat interface on Android, with model selection, connectivity indicator, and voice controls.', caption: 'The phone connects to the host-powered application through Tailscale. Inference runs on the host, not the phone.', width: 1080, height: 2229, previewWidth: 480 },
  { slug: 'nanoai-browser-automation', title: 'Browser Work', alt: 'NanoAI Work task showing successful navigation to Hugging Face in its embedded private browser.', caption: 'Navigate public web pages in NanoAI’s integrated workspace browser. Third-party services shown are tool-use examples, not endorsements.', width: 1700, height: 808, previewWidth: 480 },
];

export function nanoAiImageSource(media: NanoAiMedia) {
  return `/nanoai/images/${media.slug}.webp`;
}

export function nanoAiImageSrcSet(media: NanoAiMedia) {
  return `/nanoai/responsive/${media.slug}.webp ${media.previewWidth}w, ${nanoAiImageSource(media)} ${media.width}w`;
}
