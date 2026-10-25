/** Nano, Omega AI's Android app builder, live at omega-dev.uk. Every claim here is shown in the product itself. */
export const NANO_APPS = {
  href: 'https://omega-dev.uk/',
  eyebrow: 'New · Live now',
  title: 'Nano builds real Android apps from a sentence.',
  description:
    'Describe the app you want in plain words. Nano asks a few quick questions when it is a game or something bigger, shows a fixed price before anything is built, then writes, compiles and signs a native Kotlin app in minutes.',
  steps: [
    { title: 'Describe it', detail: 'Plain words, no code: “a game where a cat collects fish.”' },
    { title: 'Nano asks what matters', detail: 'Games and bigger apps get a few multiple-choice questions, and you describe the icon.' },
    { title: 'See the price first', detail: 'Every plan comes with a fixed price, quoted before the build starts.' },
    { title: 'Try it free', detail: 'Use the finished app on a real Android phone, streamed into your browser.' },
    { title: 'Keep it', detail: 'Pay once for the version you keep: signed APK, Google Play bundle, store listing kit and full source.' },
  ],
  price: 'From $4.99 per app',
  priceNote: 'Building and trying are free',
  action: 'Build an app with Nano',
  video: {
    src: '/nano/nano-demo.mp4',
    poster: '/nano/nano-demo-poster.webp',
    width: 1920,
    height: 1080,
    label: 'Nano demo: a one-sentence request, the questions Nano asks, the plan and price, and the finished game played on a trial phone',
  },
  caption: 'Real build: “A game where a cat collects fish.” became Fish Dash in about 3 minutes, played here on the trial phone.',
} as const;
