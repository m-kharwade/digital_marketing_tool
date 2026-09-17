import { freshness } from "../data/mockData";

const confidenceColor: Record<string, string> = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function FreshnessBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      <span>Updated {freshness.updatedAt}</span>
      <span
        className={`px-2 py-0.5 rounded-full border font-medium ${confidenceColor[freshness.confidence]}`}
      >
        {freshness.confidence} Confidence
      </span>
      {!compact && (
        <span className="text-slate-400">
          Based on {freshness.adsAnalyzed} competitor creatives · {freshness.brandsAnalyzed} brands ·{" "}
          {freshness.historyWindow}
        </span>
      )}
    </div>
  );
}
