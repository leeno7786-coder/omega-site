/**
 * The Projects page. Omega Browser Agent's claims come from its Microsoft Edge Add-ons listing and
 * omegabrowseragent.app; its video and screenshots are the ones submitted to the store.
 */
export const OMEGA_BROWSER_AGENT = {
  storeHref: 'https://microsoftedge.microsoft.com/addons/detail/omega-browser-agent/djcijkfloeepplakbehdnplfahfhpleo',
  siteHref: 'https://omegabrowseragent.app/upgrade',
  eyebrow: 'New · Microsoft Edge Add-ons',
  title: 'Omega Browser Agent',
  tagline: 'Give your browser a task. It handles the clicks.',
  description:
    'A side-panel AI agent for Microsoft Edge. Describe a task in plain language and it navigates, clicks, types, scrolls and extracts information in its own workspace tab, so your everyday browsing stays out of the way.',
  steps: [
    { title: 'Install it', detail: 'Add it to Microsoft Edge from Edge Add-ons, then open the side panel.' },
    { title: 'Choose your AI', detail: 'Auto finds a model on your PC (Ollama or LM Studio). Cloud uses your own OpenRouter key.' },
    { title: 'Send a task', detail: 'Watch each step, confirm actions before they happen, and stop a run at any time.' },
    { title: 'Run it again', detail: 'History keeps recent tasks; paid plans save a run as a named workflow.' },
  ],
  facts: ['Signed and published through Microsoft Edge Add-ons', 'No telemetry from Omega', 'Your API key stays in your browser'],
  price: 'Free to start',
  priceNote: 'Unlimited local automation · Pro $29/mo · Business $59/user/mo',
  signUpNote: 'Create your free account in the extension’s Settings, then sign in and upgrade at omegabrowseragent.app.',
  video: {
    src: '/projects/omega-browser-agent/demo.mp4',
    poster: '/projects/omega-browser-agent/demo-poster.webp',
    width: 1280,
    height: 762,
    label: 'Omega Browser Agent demo: one prompt to browse omega2ai.com and summarize it, run in a workspace tab beside the side panel',
  },
  caption: 'Unedited 53-second run with a cloud model through OpenRouter: one prompt to browse omega2ai.com and summarize it, including a step it retried by itself.',
  screenshots: [
    { slug: 'confirm-action', alt: 'The side panel asking to confirm a navigation step before the agent runs it, with the step log above.', caption: 'Confirm actions before they run' },
    { slug: 'welcome', alt: 'The welcome screen offering Auto, Local and Cloud ways for the agent to think.', caption: 'Auto, Local or your own Cloud key' },
    { slug: 'workflows', alt: 'A finished run on the Microsoft Partner site with History and saved Workflows in the side panel.', caption: 'History and saved workflows' },
    { slug: 'settings', alt: 'Settings with the automation target, action confirmation, logging and account controls.', caption: 'Settings and your account' },
  ],
} as const;

export function browserAgentImage(slug: string) {
  return `/projects/omega-browser-agent/${slug}.webp`;
}

export function browserAgentImageSrcSet(slug: string) {
  return `/projects/omega-browser-agent/responsive/${slug}.webp 640w, ${browserAgentImage(slug)} 1280w`;
}

export const PROJECTS_PAGE = {
  title: 'Built, shipped and running.',
  lede: 'Products you can use today and the systems behind them, all engineered by Omega AI. Try the live ones, join a beta, or ask about the rest.',
} as const;
