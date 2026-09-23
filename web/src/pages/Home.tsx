import { Link } from "react-router-dom";
import { homeChanges, homeSummary } from "../data/mockData";
import FreshnessBadge from "../components/FreshnessBadge";
import { SparklesIcon, TrendingUpIcon, ArrowRightIcon } from "../components/Icons";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <div className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
        <SparklesIcon className="w-4 h-4" />
        GOOD MORNING
      </div>
      <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Here's what changed</h1>
      <div className="mt-2.5 mb-7">
        <FreshnessBadge />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-9">
        <SummaryTile label="Spend (this month)" value={homeSummary.spend} />
        <SummaryTile
          label={homeSummary.keyMetric.label}
          value={homeSummary.keyMetric.value}
          trend="up"
        />
        <SummaryTile
          label="Creatives awaiting approval"
          value={String(homeSummary.pendingApprovals)}
          highlight
        />
        <SummaryTile label="New competitor signals" value={String(homeSummary.newSignals)} highlight />
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3.5">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
          {homeChanges.length}
        </span>
        Important Market Changes
      </div>

      <div className="space-y-4">
        {homeChanges.map((change, i) => (
          <div
            key={change.id}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-red-500 tracking-wide mb-1">
                  CHANGE {i + 1}
                </div>
                <div className="text-[17px] font-semibold text-slate-900 leading-snug">
                  {change.title}
                </div>
                <div className="text-sm text-slate-500 mt-0.5">{change.detail}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                  {change.delta}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">AI Recommendation: </span>
                {change.recommendation}
              </div>
              {change.action === "creatives" && (
                <Link
                  to="/creative-studio"
                  className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                  {change.actionLabel}
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
  trend,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  trend?: "up";
}) {
  return (
    <div
      className={`relative rounded-xl border p-4 transition-shadow hover:shadow-sm ${
        highlight
          ? "border-red-200 bg-gradient-to-br from-red-50 to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-[12px] text-slate-500 font-medium">{label}</div>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className={`text-2xl font-bold ${highlight ? "text-red-700" : "text-slate-900"}`}>
          {value}
        </span>
        {trend === "up" && <TrendingUpIcon className="w-4 h-4 text-emerald-600 shrink-0" />}
      </div>
    </div>
  );
}
