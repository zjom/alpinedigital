export type ProcessStep = {
  number: string;
  title: string;
  /** Short version for the home page timeline. */
  summary: string;
  /** Expanded version for /process. */
  detail: string;
  /** What the client physically receives at the end of this step. */
  deliverable: string;
  duration: string;
};

/**
 * The engagement, in plain English. For a non-technical buyer, knowing exactly
 * what happens and when is a primary trust asset — this content does more
 * conversion work than any amount of adjectives about our approach.
 */
export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "We listen",
    summary:
      "A free, genuinely no-pressure call about your business — not a sales pitch.",
    detail:
      "We start with a conversation about how your business actually works: who buys from you, what takes up your week, what's already working offline that we shouldn't break. No jargon, no slide deck, and no obligation. If we don't think we're the right people for what you need, we'll say so and point you somewhere better.",
    deliverable: "A clear written summary of what you told us",
    duration: "45 minutes, free",
  },
  {
    number: "02",
    title: "We scope it properly",
    summary:
      "A fixed, itemised proposal. You know the cost and timeline before anything starts.",
    detail:
      "We write up exactly what we'd build, what it costs, and how long it takes — itemised, in plain English, with no line item you can't understand. If there's something we're genuinely unsure about, we say so and price it separately rather than padding the whole quote. You'll never get a surprise invoice from us.",
    deliverable: "A fixed-price proposal with a firm timeline",
    duration: "3–5 days",
  },
  {
    number: "03",
    title: "We design it with you",
    summary:
      "Real designs of your actual site, with your words and products — not a template preview.",
    detail:
      "You see real designs using your own content, your products, your photos. We'll go through two rounds of changes together as standard, and we'd much rather you tell us something feels wrong at this stage than after it's built. Nothing gets engineered until you're genuinely happy with how it looks.",
    deliverable: "Designs signed off by you, on every key screen",
    duration: "1–3 weeks",
  },
  {
    number: "04",
    title: "We build and test it",
    summary:
      "Engineered properly, tested on real devices, and shown to you as it progresses.",
    detail:
      "We build on a private staging link you can check any time — no waiting until the end to see progress. Everything is tested on real phones, real tablets and real browsers, checked for speed and accessibility, and reviewed against the scope we agreed. You'll never be surprised by what launches.",
    deliverable: "A tested, staged build you've reviewed",
    duration: "2–8 weeks, depending on scope",
  },
  {
    number: "05",
    title: "We launch, train and stay",
    summary:
      "Hands-on training for your team, then ongoing support from the people who built it.",
    detail:
      "We handle the launch, including domains, email and anything that needs migrating — carefully, and usually outside business hours so nothing disrupts your trading. Then we sit down with you and your staff and train you on running it yourselves. After that we're still here: monitoring, updating, and answering the phone when you call.",
    deliverable: "A live site, trained staff, and written documentation",
    duration: "Ongoing",
  },
] as const;
