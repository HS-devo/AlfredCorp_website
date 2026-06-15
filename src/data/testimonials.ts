export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number; // 1-5
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Navigating public procurement used to feel like a multi-year bureaucratic maze. Alfred Corp's framework automated the discovery and assembly pipelines, allowing our engineering team to stay focused on product development. We won our first municipal contract within 120 days.",
    author: "Anonymous",
    role: "Co-Founder & CTO",
    company: "North American Software Startup",
    rating: 5,
  },
  {
    id: "t2",
    quote: "I no longer manage software subscriptions or source short-term labor. I drop my clients' raw safety logs into my workspace, run my audit engines, and receive verified, audit-ready reports. Alfred Corp has converted my core delivery model from a labor-capped bottleneck into a pure variable utility.",
    author: "Anonymous",
    role: "Principal OHS Consultant",
    company: "Industrial & Construction Safety Practice",
    rating: 5,
  },
  {
    id: "t3",
    quote: "We discovered that the AI and automation capabilities we already owned could completely transform our workflows. Within 90 days, we improved internal efficiency by 35%, eliminated redundant software overhead, and tripled our organic web traffic.",
    author: "Anonymous",
    role: "Managing Partner",
    company: "Canadian Accounting Firm (Toronto & Vancouver)",
    rating: 5,
  },
];
