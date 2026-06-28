export type AlertSeverity = "high" | "medium" | "info";

export interface TrendAlert {
  id: string;
  severity: AlertSeverity;
  timeAgo: string;
  source: string;
  headline: string;
  description: string;
  tags: string[];
}

export const mockTrendAlerts: TrendAlert[] = [
  {
    id: "alert-1",
    severity: "info",
    timeAgo: "2 hours ago",
    source: "Meta",
    headline: "Google increased focus on System Design rounds",
    description: "Analysis of 500+ recent interviews shows a 40% increase in distributed systems questions for new grads.",
    tags: ["System Design", "Google"]
  },
  {
    id: "alert-2",
    severity: "high",
    timeAgo: "Yesterday",
    source: "Industry Wide",
    headline: "Drop in algorithmic complexity emphasis",
    description: "Tier 1 companies are shifting weight from pure algorithms to practical API design and refactoring.",
    tags: ["Algorithms", "API Design"]
  },
  {
    id: "alert-3",
    severity: "medium",
    timeAgo: "3 days ago",
    source: "FinTech",
    headline: "Surge in concurrency questions",
    description: "Stripe and Plaid interviewees report higher frequency of multi-threading and race condition scenarios.",
    tags: []
  }
];
