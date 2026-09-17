// Mock data for first-draft UI. Shapes mirror the entities in TECHNICAL_PLAN.md
// so swapping in real API calls later is a drop-in replacement, not a rewrite.

export type Confidence = "High" | "Medium" | "Low";

export const brand = {
  name: "Aurelia Bath Co.",
  industry: "Bath Products",
  category: "Showers",
  subcategory: "Luxury Showers",
  geography: "India",
};

export const freshness = {
  updatedAt: "08:42 AM",
  confidence: "High" as Confidence,
  adsAnalyzed: 63,
  brandsAnalyzed: 7,
  historyWindow: "Last 90 days of campaign data",
};

// ---------- HOME ----------

export const homeChanges = [
  {
    id: "chg-1",
    title: "Luxury Showers ↑",
    delta: "+31%",
    detail: "Competitor Activity",
    recommendation: "Maintain current campaign. No creative change required.",
    action: "none" as const,
  },
  {
    id: "chg-2",
    title: "Festival Advertising ↑↑",
    delta: "17 new creatives / 3 hrs",
    detail: "Sharp spike across category",
    recommendation: "Add one festival-led shower creative.",
    action: "creatives" as const,
    actionLabel: "4 creatives ready",
  },
  {
    id: "chg-3",
    title: "Your Live Campaign — Luxury Shower Reel",
    delta: "CTR 2.1% vs 1.8% target ✓ · CPC ₹16 vs ≤₹18 ✓ · Freq 2.7 vs 3.5 warning",
    detail: "Performing within target",
    recommendation: "CONTINUE. No action required.",
    action: "none" as const,
  },
];

export const homeSummary = {
  spend: "₹4.2L this month",
  keyMetric: { label: "Blended ROAS", value: "3.4x" },
  pendingApprovals: 6,
  newSignals: 3,
};

// ---------- LIVE MARKET ----------

export const competitors = ["Brand A", "Brand B", "Brand C", "Brand D"];

export const topicMatrix = [
  { topic: "IVF Awareness", counts: [8, 12, 6, 10] },
  { topic: "Egg Freezing", counts: [7, 2, 4, 1] },
  { topic: "IVF Cost", counts: [2, 8, 5, 6] },
  { topic: "Male Infertility", counts: [1, 3, 0, 2] },
  { topic: "Patient Stories", counts: [6, 7, 4, 8] },
];

export type MockAd = {
  id: string;
  competitor: string;
  topic: string;
  format: string;
  cta: string;
  firstSeen: string;
  lastSeen: string;
  thumbnailColor: string;
};

export const ads: MockAd[] = [
  { id: "ad-1", competitor: "Brand B", topic: "IVF Awareness", format: "Doctor Video", cta: "Book Consultation", firstSeen: "2 Sep", lastSeen: "16 Sep", thumbnailColor: "#c7d2fe" },
  { id: "ad-2", competitor: "Brand B", topic: "IVF Awareness", format: "Static Carousel", cta: "Learn More", firstSeen: "5 Sep", lastSeen: "15 Sep", thumbnailColor: "#fbcfe8" },
  { id: "ad-3", competitor: "Brand B", topic: "IVF Awareness", format: "Patient Story Reel", cta: "Book Consultation", firstSeen: "1 Sep", lastSeen: "16 Sep", thumbnailColor: "#bbf7d0" },
  { id: "ad-4", competitor: "Brand B", topic: "IVF Awareness", format: "Doctor Video", cta: "Get Quote", firstSeen: "8 Sep", lastSeen: "14 Sep", thumbnailColor: "#fde68a" },
];

// ---------- RECOMMENDATIONS ----------

export type Recommendation = {
  id: string;
  status: "KEEP" | "MODIFY" | "REPLACE";
  what: string;
  why: string[];
  how: { format: string; cta: string; audience: string; channel: string };
  target: { ctr: string; cpc: string; cvr: string; frequencyWarning: string };
  confidence: Confidence;
};

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    status: "KEEP",
    what: "Run 4 creatives around Spa-Like Shower Experience",
    why: [
      "5 relevant competitors are actively communicating this theme",
      "26 competitor creatives detected",
      "Activity increased 31% this week",
      "Your brand has only 1 current creative",
      "Video content is outperforming static content in this topic",
    ],
    how: { format: "15-sec Reel", cta: "Explore Collection", audience: "Homeowners 28-45, renovation intent", channel: "Instagram / Facebook" },
    target: { ctr: "≥1.8%", cpc: "≤₹18", cvr: "≥3.5%", frequencyWarning: ">3.5" },
    confidence: "High",
  },
  {
    id: "rec-2",
    status: "REPLACE",
    what: "Shift budget to Festival-Led Shower Creative",
    why: [
      "17 new competitor creatives detected in the last 3 hours",
      "8 of 12 tracked competitors are participating",
      "Festival-tagged ads outperforming category baseline by 2.1x on engagement",
    ],
    how: { format: "Static + Story", cta: "View Designs", audience: "Existing + lookalike", channel: "Instagram / Google Display" },
    target: { ctr: "≥2.0%", cpc: "≤₹15", cvr: "≥4%", frequencyWarning: ">3" },
    confidence: "Medium",
  },
  {
    id: "rec-3",
    status: "MODIFY",
    what: "Multiple Spray Modes — swap CTA to Book Consultation",
    why: [
      "Conversion-intent CTAs are outperforming discovery CTAs this week",
      "Category CPC has dropped 12% for high-intent campaigns",
    ],
    how: { format: "Product Demo Video", cta: "Book Consultation", audience: "Retargeting — site visitors 30d", channel: "Google Ads" },
    target: { ctr: "≥1.6%", cpc: "≤₹20", cvr: "≥3%", frequencyWarning: ">3.5" },
    confidence: "Medium",
  },
];

// ---------- CREATIVE STUDIO ----------

export type Creative = {
  id: string;
  ideaId: string;
  variant: "A" | "B" | "C" | "D";
  headline: string;
  cta: string;
  color: string;
  status: "pending" | "approved" | "rejected";
};

export const ideas = [
  { id: "idea-1", title: "Spa Experience", recommendationId: "rec-1" },
  { id: "idea-2", title: "Multiple Spray Modes", recommendationId: "rec-3" },
  { id: "idea-3", title: "Festival Shower Launch", recommendationId: "rec-2" },
];

export const creatives: Creative[] = [
  { id: "cr-1a", ideaId: "idea-1", variant: "A", headline: "Turn every morning into a spa ritual", cta: "Explore Collection", color: "#7c3aed", status: "pending" },
  { id: "cr-1b", ideaId: "idea-1", variant: "B", headline: "Spa-grade luxury, every single day", cta: "Explore Collection", color: "#0ea5e9", status: "pending" },
  { id: "cr-1c", ideaId: "idea-1", variant: "C", headline: "Rain shower. Real relaxation.", cta: "View Designs", color: "#059669", status: "approved" },
  { id: "cr-1d", ideaId: "idea-1", variant: "D", headline: "Your bathroom, reimagined", cta: "Learn More", color: "#f59e0b", status: "pending" },

  { id: "cr-2a", ideaId: "idea-2", variant: "A", headline: "5 spray modes. One shower.", cta: "Book Consultation", color: "#7c3aed", status: "pending" },
  { id: "cr-2b", ideaId: "idea-2", variant: "B", headline: "Massage. Mist. Rain. Your call.", cta: "Book Consultation", color: "#0ea5e9", status: "rejected" },
  { id: "cr-2c", ideaId: "idea-2", variant: "C", headline: "Built for every mood", cta: "Get Quote", color: "#059669", status: "pending" },
  { id: "cr-2d", ideaId: "idea-2", variant: "D", headline: "One shower head, five experiences", cta: "Book Consultation", color: "#f59e0b", status: "pending" },

  { id: "cr-3a", ideaId: "idea-3", variant: "A", headline: "Celebrate in style this season", cta: "View Designs", color: "#7c3aed", status: "pending" },
  { id: "cr-3b", ideaId: "idea-3", variant: "B", headline: "Festival offer: Free installation", cta: "Get Quote", color: "#0ea5e9", status: "pending" },
  { id: "cr-3c", ideaId: "idea-3", variant: "C", headline: "Upgrade your bathroom this festive season", cta: "Explore Collection", color: "#059669", status: "pending" },
  { id: "cr-3d", ideaId: "idea-3", variant: "D", headline: "Limited festive edition finishes", cta: "View Designs", color: "#f59e0b", status: "pending" },
];

// ---------- CAMPAIGNS ----------

export type MetricKey = "ctr" | "cpc" | "cpm" | "cpa" | "cvr" | "roas" | "frequency";

export const metricDefinitions: Record<MetricKey, { label: string; full: string; description: string }> = {
  ctr: { label: "CTR", full: "Click Through Rate", description: "Percentage of people who clicked the advertisement after seeing it." },
  cpc: { label: "CPC", full: "Cost Per Click", description: "Average amount spent for each click on the advertisement." },
  cpm: { label: "CPM", full: "Cost Per Mille", description: "Cost per 1,000 impressions of the advertisement." },
  cpa: { label: "CPA", full: "Cost Per Acquisition", description: "Average cost to acquire one conversion/customer." },
  cvr: { label: "CVR", full: "Conversion Rate", description: "Percentage of clicks that resulted in a conversion." },
  roas: { label: "ROAS", full: "Return On Ad Spend", description: "Revenue generated for every unit of currency spent on ads." },
  frequency: { label: "Frequency", full: "Average Frequency", description: "Average number of times a unique user saw the ad." },
};

export type CampaignRow = {
  id: string;
  name: string;
  channel: string;
  spend: string;
  metrics: Record<MetricKey, { value: string; benchmark: string; target: string; onTarget: boolean }>;
  aiDecision: "CONTINUE" | "ADJUST" | "PAUSE";
};

export const campaigns: CampaignRow[] = [
  {
    id: "camp-1",
    name: "Luxury Shower Reel",
    channel: "Instagram",
    spend: "₹1.1L",
    metrics: {
      ctr: { value: "2.1%", benchmark: "1.4–1.7%", target: "≥1.8%", onTarget: true },
      cpc: { value: "₹16", benchmark: "₹17–20", target: "≤₹18", onTarget: true },
      cpm: { value: "₹210", benchmark: "₹190–240", target: "≤₹230", onTarget: true },
      cpa: { value: "₹640", benchmark: "₹600–800", target: "≤₹750", onTarget: true },
      cvr: { value: "3.8%", benchmark: "2.8–3.4%", target: "≥3.5%", onTarget: true },
      roas: { value: "3.4x", benchmark: "2.5–3.0x", target: "≥3.0x", onTarget: true },
      frequency: { value: "2.7", benchmark: "—", target: "<3.5 warning", onTarget: true },
    },
    aiDecision: "CONTINUE",
  },
  {
    id: "camp-2",
    name: "Multiple Spray Modes — Search",
    channel: "Google Ads",
    spend: "₹0.6L",
    metrics: {
      ctr: { value: "1.2%", benchmark: "1.4–1.7%", target: "≥1.6%", onTarget: false },
      cpc: { value: "₹22", benchmark: "₹17–20", target: "≤₹20", onTarget: false },
      cpm: { value: "₹260", benchmark: "₹190–240", target: "≤₹230", onTarget: false },
      cpa: { value: "₹910", benchmark: "₹600–800", target: "≤₹800", onTarget: false },
      cvr: { value: "2.1%", benchmark: "2.8–3.4%", target: "≥3%", onTarget: false },
      roas: { value: "1.8x", benchmark: "2.5–3.0x", target: "≥2.5x", onTarget: false },
      frequency: { value: "4.1", benchmark: "—", target: "<3.5 warning", onTarget: false },
    },
    aiDecision: "ADJUST",
  },
  {
    id: "camp-3",
    name: "Festival Launch — Awareness",
    channel: "Facebook",
    spend: "₹0.4L",
    metrics: {
      ctr: { value: "1.9%", benchmark: "1.4–1.7%", target: "≥1.8%", onTarget: true },
      cpc: { value: "₹14", benchmark: "₹17–20", target: "≤₹18", onTarget: true },
      cpm: { value: "₹180", benchmark: "₹190–240", target: "≤₹230", onTarget: true },
      cpa: { value: "₹580", benchmark: "₹600–800", target: "≤₹750", onTarget: true },
      cvr: { value: "3.1%", benchmark: "2.8–3.4%", target: "≥3%", onTarget: true },
      roas: { value: "2.9x", benchmark: "2.5–3.0x", target: "≥2.5x", onTarget: true },
      frequency: { value: "1.9", benchmark: "—", target: "<3.5 warning", onTarget: true },
    },
    aiDecision: "CONTINUE",
  },
];
