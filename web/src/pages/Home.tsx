import { Link } from "react-router-dom";
import { homeChanges, homeSummary } from "../data/mockData";
import FreshnessBadge from "../components/FreshnessBadge";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <div className="mb-1 text-sm font-medium text-violet-600">GOOD MORNING</div>
      <h1 className="text-2xl font-bold text-slate-900">Here's what changed</h1>
      <div className="mt-2 mb-6">
        <FreshnessBadge />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <SummaryTile label="Spend (this month)" value={homeSummary.spend} />
        <SummaryTile label={homeSummary.keyMetric.label} value={homeSummary.keyMetric.value} />
        <SummaryTile label="Creatives awaiting approval" value={String(homeSummary.pendingApprovals)} highlight />
        <SummaryTile label="New competitor signals" value={String(homeSummary.newSignals)} highlight />
      </div>

      <div className="text-sm font-semibold text-slate-500 mb-3">
        {homeChanges.length} Important Market Changes
      </div>

      <div className="space-y-4">
        {homeChanges.map((change, i) => (
          <div key={change.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1">CHANGE {i + 1}</div>
                <div className="text-lg font-semibold text-slate-900">{change.title}</div>
                <div className="text-sm text-slate-500 mt-0.5">{change.detail}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-violet-700">{change.delta}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-sm text-slate-700">
                <span className="font-medium text-slate-900">AI Recommendation: </span>
                {change.recommendation}
              </div>
              {change.action === "creatives" && (
                <Link
                  to="/creative-studio"
                  className="shrink-0 ml-4 text-sm font-medium text-violet-600 hover:text-violet-800"
                >
                  {change.actionLabel} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-violet-200 bg-violet-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`text-xl font-bold mt-1 ${highlight ? "text-violet-700" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}
