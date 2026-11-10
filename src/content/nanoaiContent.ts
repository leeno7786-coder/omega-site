// Public copy for NanoAI as released (0.3.1, November 2026), kept in step with the app and its own page at omega-dev.uk.
export const NANOAI_LINKS = {
  download: 'https://omega-dev.uk/download',
  plans: 'https://omega-dev.uk/#plans',
  account: 'https://cloud.omega-dev.uk/account',
} as const;

// The home page's launch spotlight (NanoAiSpotlight).
export const NANOAI_LAUNCH = {
  eyebrow: 'New · Out now for Windows',
  title: 'NanoAI runs your PC for you, hands-free.',
  description:
    'Talk to Nano and it gets the work done: in your Windows apps in Live mode, or on a computer of its own while you keep using yours. It remembers what matters, uses your connected accounts and runs tasks on a schedule.',
  steps: [
    { title: 'Install it', detail: 'One signed installer for Windows 10 and 11, from Omega AI.' },
    { title: 'Choose where Nano thinks', detail: 'A free model on your PC, or a Nano Cloud plan with nothing to set up. The setup guide checks what your PC can run.' },
    { title: 'Meet Nano', detail: 'Pick a role, answer a few questions, and see how Nano would set itself up before anything is saved.' },
    { title: 'Talk, type or go Live', detail: 'Hand off research, documents, code and errands, or switch on Live mode and let Nano drive your desktop.' },
  ],
  price: 'Free',
  priceNote: 'With a model on your own PC. Nano Cloud plans from $20 a month.',
  action: 'Download for Windows',
} as const;

export const NANOAI_FEATURES = [
  { title: 'Live mode, hands-free', description: 'Switch on Live mode and just talk. Nano becomes a voice assistant with full control of your Windows desktop: it reads the screen, opens apps, clicks and types while you speak. Say “Nano” to change course, and Stop or Escape takes over again.' },
  { title: 'A computer of its own', description: 'In the app, Nano works on a persistent Ubuntu computer with its own browser, editor and terminal. Hand it research, documents or code, keep using Windows while it works, and watch its desktop inside NanoAI.' },
  { title: 'Plugins for your accounts', description: 'Connect Gmail, Calendar, Drive, Docs and more from the plugin catalog. Nano uses them in every mode, and asks before it sends, changes or deletes anything.' },
  { title: 'Automations', description: 'Put work on a schedule, like a morning summary or a weekly report, and come back to saved results you can pick up from.' },
  { title: 'Memory that learns', description: 'Preferences, project facts and decisions carry over between conversations, and Nano learns from how its tasks turn out. Review what it saved, correct it or have it forgotten.' },
  { title: 'Your choice of model', description: 'Run Nano free on a model on your own PC through LM Studio, Ollama, llama.cpp or Lemonade, or let Nano Cloud run it for you. NanoAI checks your PC and says what size of model runs well on it.' },
] as const;

export const NANOAI_METRICS = [
  { value: 'Free', label: 'With a model on your own PC' },
  { value: 'Live mode', label: 'Hands-free control of your Windows PC' },
  { value: 'Ubuntu', label: 'Nano’s own computer, beside yours' },
  { value: 'Nano Cloud', label: 'Hosted model plans from $20 a month' },
] as const;

export const NANOAI_ARCHITECTURE = [
  { title: 'Request', subtitle: 'Voice or typing', description: 'Give Nano an objective in ordinary language, then keep talking as the work develops.' },
  { title: 'Remember', subtitle: 'Memory + context', description: 'What Nano has learned, your project’s context and earlier results shape the next step.' },
  { title: 'Reason', subtitle: 'Your model or Nano Cloud', description: 'The model you chose plans the actions. Speech and memory run on your PC.' },
  { title: 'Act', subtitle: 'Your PC, its PC, plugins', description: 'Nano works in your Windows apps in Live mode, on its own Ubuntu computer, and through the plugins you connected.' },
  { title: 'Verify', subtitle: 'Results + record', description: 'Nano checks the result before it says it is done, and keeps a record of every step to come back to.' },
] as const;

export const NANOAI_FAQ = [
  { question: 'Is NanoAI free?', answer: 'Yes. NanoAI and everything it does are free with a model you run on your own PC. You pay only if you want Nano Cloud to run the model for you.' },
  { question: 'How do I get it?', answer: 'Download the installer from omega-dev.uk. It is one signed installer for Windows 10 or 11 (64-bit) that asks you to accept the license agreement, then where to install. A short setup guide then helps you choose where Nano thinks. NanoAI keeps itself up to date: it downloads only what changed and asks you to restart.' },
  { question: 'Which models can I use?', answer: 'Any capable chat model with tool calling, served on your PC by LM Studio, Ollama, llama.cpp or Lemonade. NanoAI finds a running server by itself and says what size of model your PC runs well. Or choose Nano Cloud and there is nothing to set up.' },
  { question: 'How do Nano Cloud plans work?', answer: 'Every plan does everything; Plus, Pro and Max differ only in how much Nano Cloud use they include each week. The allowance starts again every 7 days, one plan covers every PC you sign in on, and you can cancel any time from your account. Nano Cloud is sold in the United States.' },
  { question: 'What does Live mode do on my PC?', answer: 'Nano controls your Windows desktop while you talk: it reads the screen and uses the mouse and keyboard you share with it. Only a small Live overlay shows while it works, and the session is saved as a new chat in NanoAI with a live transcript. Say “Nano” to redirect it, and press Stop or Escape to take over at any time.' },
  { question: 'What does Nano’s own computer need?', answer: 'A one-time setup in NanoAI. It uses Canonical Multipass to download Ubuntu and its desktop tools, so you need room for them on your disk. After that, Nano’s computer keeps its apps and files between sessions, and shared folders hold the files you want it to use.' },
  { question: 'Can Nano make mistakes on my PC?', answer: 'It can. Nano asks before it sends, changes or deletes anything, and Stop interrupts it at any time. What NanoAI does on your PC is your call; see the NanoAI terms.' },
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

// Screens from NanoAI 0.3.1, captured from a demonstration copy of the released app.
export const NANOAI_MEET: NanoAiMedia = {
  slug: 'nanoai-meet-nano', title: 'Meet Nano',
  alt: 'NanoAI’s first chat, Meet Nano, offering six roles to set Nano up for: business back office, personal assistant, software developer, researcher and analyst, content and marketing, and customer support.',
  caption: 'Pick a role, or describe it in your own words. Nano asks a few questions, then shows how it would set itself up before anything is saved.',
  width: 1800, height: 1200, previewWidth: 480,
};

export const NANOAI_SETUP: NanoAiMedia = {
  slug: 'nanoai-where-nano-thinks', title: 'Where Nano thinks',
  alt: 'NanoAI’s setup guide asking where Nano should think: Nano Cloud, or a model on this PC through LM Studio, Ollama, llama.cpp or Lemonade, with a note on what size of model the PC runs well.',
  caption: 'The first-run setup guide: choose Nano Cloud, or a free model on your PC. NanoAI checks your PC’s memory and graphics, and sees a model server as soon as it starts.',
  width: 1800, height: 1200, previewWidth: 480,
};

export const NANOAI_SCREENSHOTS: readonly NanoAiMedia[] = [
  NANOAI_MEET,
  NANOAI_SETUP,
  { slug: 'nanoai-plugins', title: 'Plugins', alt: 'NanoAI’s Plugins panel beside a chat, listing plugins by category, such as developer tools and web design, each with an Install button.', caption: 'Browse plugins by category, install the ones you use and sign in where one needs it. Nano uses them in every mode.', width: 1800, height: 1200, previewWidth: 480 },
  { slug: 'nanoai-settings', title: 'Settings', alt: 'NanoAI’s Settings panel open on General settings, with tabs for models, memory, Nano’s PC, Live desktop, voice, vault, archive and bug reports.', caption: 'Choose how Nano answers and how the app looks, and manage models, memory, Nano’s own PC, Live desktop control and voice in one place.', width: 1800, height: 1200, previewWidth: 480 },
];

export function nanoAiImageSource(media: NanoAiMedia) {
  return `/nanoai/images/${media.slug}.webp`;
}

export function nanoAiImageSrcSet(media: NanoAiMedia) {
  return `/nanoai/responsive/${media.slug}.webp ${media.previewWidth}w, ${nanoAiImageSource(media)} ${media.width}w`;
}
