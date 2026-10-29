// Public copy checked against the current NanoAI workspace and voice companion.
export const NANOAI_FEATURES = [
  { title: 'A voice for your PC', description: 'A compact Windows companion connects spoken requests, replies and follow-up to the same conversation. Say “Nano” to start a request or redirect active work. Microphone and Stop controls stay within reach, and typing is available when you need it.' },
  { title: 'Computer use across real apps', description: 'Nano can inspect windows and controls, read screenshots, click, drag, scroll, type, use keyboard shortcuts and run terminal work. It works in the selected computer’s installed browser, editor and other applications, then checks what actually happened.' },
  { title: 'Memory you can inspect', description: 'Keep useful preferences, project facts, past decisions and task context across conversations and restarts. Review, correct or forget saved knowledge, and import reviewed context from an AI you already use.' },
  { title: 'Work, outputs and specialist roles', description: 'The full workspace supports durable research, code and document tasks, saved outputs, scheduled execution and application-focused specialist profiles. Inspect progress and recorded results, then continue from the same task context.' },
  { title: 'Choose your reasoning backend', description: 'Use compatible local models through LM Studio, or a configured Azure Foundry deployment. Speech and memory embeddings have separate local runtimes. Computer use depends on the selected model’s tool and vision capabilities.' },
  { title: 'Connected tools and local creation', description: 'Bring prepared account connections into the workflow through the plugin catalog. The full workspace also supports local voice and image workflows, files and document creation. Individual integrations depend on their setup, account access and service requirements.' },
] as const;

export const NANOAI_METRICS = [
  { value: 'Speak + type', label: 'One continuing conversation' },
  { value: 'Windows PC', label: 'Voice companion and actual desktop control' },
  { value: 'Ubuntu', label: 'Separate computer in the full workspace' },
  { value: 'Local or Azure', label: 'Configurable reasoning backend' },
] as const;

export const NANOAI_ARCHITECTURE = [
  { title: 'Request', subtitle: 'Speech or typing', description: 'Give Nano an objective in ordinary language, then continue the conversation as the work develops.' },
  { title: 'Remember', subtitle: 'Context + memory', description: 'Relevant saved knowledge, project context and task receipts inform the next step.' },
  { title: 'Reason', subtitle: 'Local or configured cloud', description: 'A compatible model chooses actions. Separate local services handle speech and memory embeddings.' },
  { title: 'Act', subtitle: 'Computer + connected tools', description: 'Operate the selected desktop’s applications and prepared plugins within the configured access.' },
  { title: 'Verify', subtitle: 'Results + continuity', description: 'Inspect the resulting state and saved outputs. Keep progress and uncertain steps available for review or continuation.' },
] as const;

export const NANOAI_FAQ = [
  { question: 'What can Nano do on my computer?', answer: 'With computer access enabled, Nano can use installed applications through windows, controls, screenshots, mouse and keyboard input, and terminal commands. It can work on browser tasks, documents, files and code. Compatibility and reliability depend on the application, model and current screen state.' },
  { question: 'How do the companion and full workspace fit together?', answer: 'The new Windows companion puts conversation, memory, plugins and actual-PC control behind a small voice interface. The broader workspace also offers a separate persistent Ubuntu computer, saved autonomous tasks and host-powered Android access. These are distinct development builds with different setup and deployment requirements.' },
  { question: 'Does NanoAI require a cloud AI API?', answer: 'Local inference through LM Studio is the default path. A configured Azure Foundry backend is also supported. When a cloud model is selected, the task context and screenshots needed for its requests go to that provider. Connected online services and public web research also use the network.' },
  { question: 'How does Android access work?', answer: 'The full workspace’s Android interface reaches the host through Tailscale. Inference and saved Work files remain on the host. The PC and required services must be running, with network connectivity. Android access is separate from the new Windows voice companion.' },
  { question: 'How do I stay in control?', answer: 'You set the task and the available access. In the voice companion, the request authorizes necessary steps without a prompt for every click. You can inspect activity, give new direction, or use Stop; Windows desktop control also supports physical Escape. The full workspace retains its configured tool policies. Actual-PC control shares your desktop, pointer and keyboard.' },
  { question: 'Can I download a finished consumer release?', answer: 'Not yet. A Windows beta is being prepared as one download that runs NanoAI, its memory and its voice on your PC, with the model provided through Nano Cloud. Request a beta place below and tell us about your PC. Contact Omega AI to discuss a demonstration or a custom deployment.' },
] as const;

// Choices on the beta request form. The PC details decide which setup a tester is sent.
export const NANOAI_BETA_WINDOWS = ['Windows 11', 'Windows 10', 'Other or not sure'] as const;
export const NANOAI_BETA_MEMORY = ['8 GB or less', '16 GB', '32 GB', '64 GB or more', 'Not sure'] as const;
export const NANOAI_BETA_DISK = ['Under 20 GB', '20–50 GB', '50–100 GB', 'Over 100 GB', 'Not sure'] as const;

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

export const NANOAI_COMPANION: NanoAiMedia = {
  slug: 'nanoai-voice-companion', title: 'Windows voice companion',
  alt: 'NanoAI voice companion showing wake-word guidance, microphone and Stop controls, and a saved conversation.',
  caption: 'Actual Windows companion interface from a controlled UI test. Speak or type, keep the conversation, and reach Stop at any time.',
  width: 380, height: 520, previewWidth: 190,
};

export const NANOAI_DESKTOP: NanoAiMedia = {
  slug: 'nanoai-windows-workspace', title: 'Windows computer workspace',
  alt: 'NanoAI full workspace with a conversation, recorded Windows application actions, and a paused step awaiting review.',
  caption: 'Actual full-workspace interface from a controlled test. Activity records app switches and keeps an uncertain step visible for review before continuation.',
  width: 1440, height: 960, previewWidth: 480,
};

export const NANOAI_SCREENSHOTS: readonly NanoAiMedia[] = [
  NANOAI_DESKTOP,
  NANOAI_COMPANION,
  { slug: 'nanoai-work-autonomous-report', title: 'Autonomous Work', alt: 'NanoAI Work interface showing a completed 24-tool-step research task and a saved Word report in Workspace.', caption: 'A 24-step research-and-report workflow delivers a saved Word file. This is one documented demonstration, not a general performance benchmark. Generated report claims are not independently verified.', width: 1700, height: 807, previewWidth: 480 },
  { slug: 'nanoai-specialist-agent-builder', title: 'Specialist agents', alt: 'NanoAI specialist-agent builder with Describe, Configure and Try it stages and role/knowledge/tool fields.', caption: 'Build reusable specialist profiles with roles, knowledge and selected tools.', width: 1679, height: 902, previewWidth: 480 },
  { slug: 'nanoai-plugins-catalog', title: 'Plugin orchestration', alt: 'NanoAI plugin manager showing installed tools, connected services, and available integrations.', caption: 'A catalog of connected tools complements natural-language tool selection.', width: 829, height: 902, previewWidth: 480 },
  { slug: 'nanoai-human-approval-controls', title: 'Human approvals', alt: 'NanoAI settings panel showing web access and tool permission choices including Ask per message.', caption: 'Tool-permission settings separate broad access from approval for state-changing operations.', width: 624, height: 871, previewWidth: 480 },
  { slug: 'nanoai-memory-settings', title: 'Temporal memory', alt: 'NanoAI mobile Memory settings showing structured saved facts, technical preferences, provenance and edit controls.', caption: 'The actual Memory settings interface. Saved content is obscured for privacy in this supplied excerpt.', width: 1080, height: 1742, previewWidth: 480 },
  { slug: 'nanoai-android-remote', title: 'Android remote UI', alt: 'NanoAI mobile chat interface on Android, with model selection, connectivity indicator, and voice controls.', caption: 'The phone connects to the host-powered application through Tailscale. Inference runs on the host, not the phone.', width: 1080, height: 2229, previewWidth: 480 },
  { slug: 'nanoai-browser-automation', title: 'Earlier browser Work', alt: 'Earlier NanoAI Work task showing successful navigation to Hugging Face in the former embedded browser.', caption: 'Earlier full-workspace demonstration. Current computer use operates the browser installed on the selected computer. Third-party services shown are examples, not endorsements.', width: 1700, height: 808, previewWidth: 480 },
];

export function nanoAiImageSource(media: NanoAiMedia) {
  return `/nanoai/images/${media.slug}.webp`;
}

export function nanoAiImageSrcSet(media: NanoAiMedia) {
  return `/nanoai/responsive/${media.slug}.webp ${media.previewWidth}w, ${nanoAiImageSource(media)} ${media.width}w`;
}
