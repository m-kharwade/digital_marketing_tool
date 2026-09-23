import { campaigns, type MetricKey } from "../data/mockData";
import MetricInfoPopover from "../components/MetricInfoPopover";
import { CheckCircleIcon, PencilIcon, AlertTriangleIcon } from "../components/Icons";

const decisionStyle: Record<string, string> = {
  CONTINUE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ADJUST: "bg-amber-50 text-amber-700 border-amber-200",
  PAUSE: "bg-rose-50 text-rose-700 border-rose-200",
};

const decisionIcon: Record<string, typeof CheckCircleIcon> = {
  CONTINUE: CheckCircleIcon,
  ADJUST: PencilIcon,
  PAUSE: AlertTriangleIcon,
};

const metricOrder: MetricKey[] = ["ctr", "cpc", "cpm", "cpa", "cvr", "roas", "frequency"];

export default function Campaigns() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Campaigns</h1>
      <p className="text-sm text-slate-500 mt-1">What happened after publishing?</p>

      <div className="mt-8 space-y-5">
        {campaigns.map((camp) => {
          const DecisionIcon = decisionIcon[camp.aiDecision];
          return (
            <div
              key={camp.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold text-slate-900">{camp.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {camp.channel} · Spend {camp.spend}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${decisionStyle[camp.aiDecision]}`}
                >
                  <DecisionIcon className="w-3.5 h-3.5" />
                  AI Decision: {camp.aiDecision}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-slate-100">
                {metricOrder.map((key) => {
                  const m = camp.metrics[key];
                  return (
                    <MetricInfoPopover
                      key={key}
                      metricKey={key}
                      value={m.value}
                      benchmark={m.benchmark}
                      target={m.target}
                      onTarget={m.onTarget}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
