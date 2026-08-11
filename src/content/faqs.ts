export type Faq = {
  question: string;
  answer: string;
};

/**
 * These answer the objections this audience actually has, in the order they
 * occur. "I'm not technical" and "what does it cost" come first because they
 * are what's genuinely stopping the enquiry.
 */
export const faqs: readonly Faq[] = [
  {
    question: "I'm not technical at all. Is that a problem?",
    answer:
      "Not remotely — it's who we're built for. You're the expert on your business and we're the experts on the technology. We'll never make you feel stupid for asking a question, we don't use jargon unless we explain it, and we handle every technical step ourselves. Training is included in everything we do, so by the end you'll be genuinely comfortable running it.",
  },
  {
    question: "What does it actually cost?",
    answer:
      "It depends on scope, and anyone who quotes you before understanding your business is guessing. What we can promise is a fixed, itemised price before any work starts, with no line item you can't understand and no surprise invoices. Small business sites typically land in the low five figures; custom systems and ecommerce platforms vary far more widely. The first conversation is free and you'll leave it with a real number.",
  },
  {
    question: "How long does it take?",
    answer:
      "A straightforward website is usually live within six to nine weeks of signing off the proposal. Ecommerce builds run eight to sixteen weeks. Bespoke systems depend entirely on complexity, and we'd rather ship something small that works in six weeks than something enormous in a year. You'll have a firm timeline in your proposal before you commit.",
  },
  {
    question: "Do I own everything at the end?",
    answer:
      "Yes — completely and without qualification. Your domain is registered in your name. Your Google, hosting and email accounts are yours, in your control, with you as the owner. Your code and your data belong to you. If you ever decide to work with someone else, we'll hand everything over cleanly and help the next team get up to speed. We've picked up too many clients who were held hostage by a previous agency to ever do that ourselves.",
  },
  {
    question: "What if I want to leave?",
    answer:
      "You can, at any time, and we'll help you go. There are no lock-in contracts on our support plans and no exit fees. We'll transfer every account, export your data in a usable format, and brief whoever takes over. We'd rather you stayed because the work is good than because leaving is painful.",
  },
  {
    question: "We already have a website. Can you work with it?",
    answer:
      "Often, yes. Sometimes an existing site just needs speed, SEO and conversion work rather than a rebuild, and we'll tell you honestly which situation you're in — including when the answer is that your current site is fine and you should spend the money elsewhere. We'll audit what you have for free before recommending anything.",
  },
  {
    question: "Do you only work with businesses in your city?",
    answer:
      "No. We work with businesses right across Australia and New Zealand, and most of our engagements run remotely without issue. For larger projects we'll happily come to you — for some builds there's no substitute for standing in the warehouse and watching how things actually work.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay. Every engagement includes training and documentation, and our care plans cover updates, backups, monitoring, security patches and content changes. You get support direct from the people who built your system — not a ticket queue, not an offshore call centre, and not a different account manager every quarter.",
  },
] as const;
