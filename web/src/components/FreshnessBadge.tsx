import { freshness } from "../data/mockData";
import { ClockIcon } from "./Icons";

const confidenceColor: Record<string, string> = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-rose-50 text-rose-700 border-rose-200",
};

const confidenceDot: Record<string, string> = {
  High: "bg-emerald-500",
  Medium: "bg-amber-500",
  Low: "bg-rose-500",
};

export default function FreshnessBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
        Updated {freshness.updatedAt}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-medium ${confidenceColor[freshness.confidence]}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${confidenceDot[freshness.confidence]}`} />
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
