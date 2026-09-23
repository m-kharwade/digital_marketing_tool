// Mock data for first-draft UI. Shapes mirror the entities in TECHNICAL_PLAN.md
// so swapping in real API calls later is a drop-in replacement, not a rewrite.

export type Confidence = "High" | "Medium" | "Low";

export const brand = {
  name: "Rangoli Paints",
  industry: "Paints & Coatings",
  category: "Decorative Paints",
  subcategory: "Interior Emulsions",
  geography: "India",
};

export const freshness = {
  updatedAt: "09:15 AM",
  confidence: "High" as Confidence,
  adsAnalyzed: 84,
  brandsAnalyzed: 5,
  historyWindow: "Last 90 days of campaign data",
};

// ---------- HOME ----------

export const homeChanges = [
  {
    id: "chg-1",
    title: "Waterproofing Demand ↑",
    delta: "+38%",
    detail: "Competitor Activity",
    recommendation: "Maintain current campaign. Monsoon-season interest remains strong.",
    action: "none" as const,
  },
  {
    id: "chg-2",
    title: "Festive Home Makeover ↑↑",
    delta: "21 new creatives / 6 hrs",
    detail: "Sharp spike across category",
    recommendation: "Add one festive-led interior emulsion creative.",
    action: "creatives" as const,
    actionLabel: "5 creatives ready",
  },
  {
    id: "chg-3",
    title: "Your Live Campaign — Interior Emulsion Range",
    delta: "CTR 1.9% vs 1.6% target ✓ · CPC ₹14 vs ≤₹16 ✓ · Freq 2.4 vs 3.5 warning",
    detail: "Performing within target",
    recommendation: "CONTINUE. No action required.",
    action: "none" as const,
  },
];

export const homeSummary = {
  spend: "₹18.6L this month",
  keyMetric: { label: "Blended ROAS", value: "4.1x" },
  pendingApprovals: 5,
  newSignals: 4,
};

// ---------- LIVE MARKET ----------

export const competitors = ["ColorNova", "Duralux", "ShadeCraft", "ChromaCoat"];

export const topicMatrix = [
  { topic: "Waterproofing Solutions", counts: [9, 14, 7, 11] },
  { topic: "Wood Finishes & Varnishes", counts: [6, 3, 5, 2] },
  { topic: "Weather-Proof Exteriors", counts: [3, 9, 6, 7] },
  { topic: "Texture & Metallic Finishes", counts: [8, 5, 4, 9] },
  { topic: "Festive Home Makeover", counts: [7, 8, 5, 10] },
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
  { id: "ad-1", competitor: "Duralux", topic: "Waterproofing Solutions", format: "Before/After Reel", cta: "Book Free Consultation", firstSeen: "3 Aug", lastSeen: "20 Aug", thumbnailColor: "#4E7A8C" },
  { id: "ad-2", competitor: "Duralux", topic: "Waterproofing Solutions", format: "Dealer Locator Carousel", cta: "Find a Dealer", firstSeen: "5 Aug", lastSeen: "19 Aug", thumbnailColor: "#7A8C4E" },
  { id: "ad-3", competitor: "Duralux", topic: "Waterproofing Solutions", format: "Influencer Testimonial", cta: "Explore Shades", firstSeen: "1 Aug", lastSeen: "20 Aug", thumbnailColor: "#B5474D" },
  { id: "ad-4", competitor: "Duralux", topic: "Waterproofing Solutions", format: "Shade Card Static", cta: "Get a Quote", firstSeen: "8 Aug", lastSeen: "18 Aug", thumbnailColor: "#D4A017" },
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
    what: "Run 4 creatives around Monsoon Waterproofing Range",
    why: [
      "4 relevant competitors are actively communicating this theme",
      "32 competitor creatives detected in the last 14 days",
      "Category activity increased 38% this week",
      "Your brand has only 1 current creative live",
      "Reel-based demos are outperforming static posts 2.3x on this topic",
    ],
    how: { format: "15-sec Reel", cta: "Book Free Consultation", audience: "Homeowners 25-45, renovation intent", channel: "Instagram / Facebook" },
    target: { ctr: "≥1.6%", cpc: "≤₹16", cvr: "≥3%", frequencyWarning: ">3.5" },
    confidence: "High",
  },
  {
    id: "rec-2",
    status: "REPLACE",
    what: "Shift budget to Festive Home Makeover Creative",
    why: [
      "21 new competitor creatives detected in the last 6 hours",
      "4 of 5 tracked competitors are running festive campaigns",
      "Festive-tagged ads outperforming category baseline by 1.9x on engagement",
    ],
    how: { format: "Static + Story", cta: "Explore Shades", audience: "Existing + lookalike", channel: "Instagram / Google Display" },
    target: { ctr: "≥1.8%", cpc: "≤₹13", cvr: "≥3.5%", frequencyWarning: ">3" },
    confidence: "Medium",
  },
  {
    id: "rec-3",
    status: "MODIFY",
    what: "Weather Shield Exterior Paint — swap CTA to Find a Dealer",
    why: [
      "Dealer-locator CTAs are outperforming awareness CTAs this week",
      "Category CPC has dropped 9% for high-intent exterior campaigns",
    ],
    how: { format: "Product Demo Video", cta: "Find a Dealer", audience: "Retargeting — site visitors 30d", channel: "Google Ads" },
    target: { ctr: "≥1.4%", cpc: "≤₹18", cvr: "≥2.8%", frequencyWarning: ">3.5" },
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
  { id: "idea-1", title: "Monsoon Waterproofing", recommendationId: "rec-1" },
  { id: "idea-2", title: "Weather Shield Exteriors", recommendationId: "rec-3" },
  { id: "idea-3", title: "Festive Home Makeover", recommendationId: "rec-2" },
];

export const creatives: Creative[] = [
  { id: "cr-1a", ideaId: "idea-1", variant: "A", headline: "Waterproof walls, zero worry every monsoon", cta: "Book Free Consultation", color: "#B5474D", status: "pending" },
  { id: "cr-1b", ideaId: "idea-1", variant: "B", headline: "Rain-ready walls start with one coat", cta: "Book Free Consultation", color: "#4E7A8C", status: "pending" },
  { id: "cr-1c", ideaId: "idea-1", variant: "C", headline: "Built to outlast every monsoon", cta: "Explore Shades", color: "#7A8C4E", status: "approved" },
  { id: "cr-1d", ideaId: "idea-1", variant: "D", headline: "Your walls, weatherproofed", cta: "Get a Quote", color: "#D4A017", status: "pending" },

  { id: "cr-2a", ideaId: "idea-2", variant: "A", headline: "Exteriors that shrug off the sun", cta: "Find a Dealer", color: "#B5474D", status: "pending" },
  { id: "cr-2b", ideaId: "idea-2", variant: "B", headline: "Fade-proof color, 12-year warranty", cta: "Find a Dealer", color: "#4E7A8C", status: "rejected" },
  { id: "cr-2c", ideaId: "idea-2", variant: "C", headline: "Built for every season", cta: "Get a Quote", color: "#7A8C4E", status: "pending" },
  { id: "cr-2d", ideaId: "idea-2", variant: "D", headline: "One coat. Twelve years of color.", cta: "Find a Dealer", color: "#D4A017", status: "pending" },

  { id: "cr-3a", ideaId: "idea-3", variant: "A", headline: "Celebrate in color this festive season", cta: "Explore Shades", color: "#B5474D", status: "pending" },
  { id: "cr-3b", ideaId: "idea-3", variant: "B", headline: "Festive offer: Free color consultation", cta: "Get a Quote", color: "#4E7A8C", status: "pending" },
  { id: "cr-3c", ideaId: "idea-3", variant: "C", headline: "Upgrade your home this festive season", cta: "Explore Shades", color: "#7A8C4E", status: "pending" },
  { id: "cr-3d", ideaId: "idea-3", variant: "D", headline: "Limited-edition festive shades", cta: "Explore Shades", color: "#D4A017", status: "pending" },
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
    name: "Monsoon Waterproofing Reel",
    channel: "Instagram",
    spend: "₹4.8L",
    metrics: {
      ctr: { value: "2.0%", benchmark: "1.3–1.6%", target: "≥1.6%", onTarget: true },
      cpc: { value: "₹13", benchmark: "₹15–19", target: "≤₹16", onTarget: true },
      cpm: { value: "₹190", benchmark: "₹180–230", target: "≤₹220", onTarget: true },
      cpa: { value: "₹520", benchmark: "₹550–750", target: "≤₹700", onTarget: true },
      cvr: { value: "3.6%", benchmark: "2.6–3.2%", target: "≥3%", onTarget: true },
      roas: { value: "4.1x", benchmark: "2.4–2.9x", target: "≥2.8x", onTarget: true },
      frequency: { value: "2.4", benchmark: "—", target: "<3.5 warning", onTarget: true },
    },
    aiDecision: "CONTINUE",
  },
  {
    id: "camp-2",
    name: "Weather Shield Exteriors — Search",
    channel: "Google Ads",
    spend: "₹2.6L",
    metrics: {
      ctr: { value: "1.1%", benchmark: "1.3–1.6%", target: "≥1.5%", onTarget: false },
      cpc: { value: "₹24", benchmark: "₹15–19", target: "≤₹19", onTarget: false },
      cpm: { value: "₹255", benchmark: "₹180–230", target: "≤₹225", onTarget: false },
      cpa: { value: "₹890", benchmark: "₹550–750", target: "≤₹780", onTarget: false },
      cvr: { value: "2.0%", benchmark: "2.6–3.2%", target: "≥2.8%", onTarget: false },
      roas: { value: "1.9x", benchmark: "2.4–2.9x", target: "≥2.4x", onTarget: false },
      frequency: { value: "4.2", benchmark: "—", target: "<3.5 warning", onTarget: false },
    },
    aiDecision: "ADJUST",
  },
  {
    id: "camp-3",
    name: "Festive Makeover — Awareness",
    channel: "Facebook",
    spend: "₹1.9L",
    metrics: {
      ctr: { value: "1.8%", benchmark: "1.3–1.6%", target: "≥1.6%", onTarget: true },
      cpc: { value: "₹12", benchmark: "₹15–19", target: "≤₹17", onTarget: true },
      cpm: { value: "₹170", benchmark: "₹180–230", target: "≤₹220", onTarget: true },
      cpa: { value: "₹480", benchmark: "₹550–750", target: "≤₹700", onTarget: true },
      cvr: { value: "3.0%", benchmark: "2.6–3.2%", target: "≥2.8%", onTarget: true },
      roas: { value: "3.3x", benchmark: "2.4–2.9x", target: "≥2.6x", onTarget: true },
      frequency: { value: "1.8", benchmark: "—", target: "<3.5 warning", onTarget: true },
    },
    aiDecision: "CONTINUE",
  },
];
