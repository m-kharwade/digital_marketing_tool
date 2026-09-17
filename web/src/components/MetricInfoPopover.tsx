import { useState } from "react";
import { metricDefinitions, type MetricKey } from "../data/mockData";

export default function MetricInfoPopover({
  metricKey,
  value,
  benchmark,
  target,
  onTarget,
}: {
  metricKey: MetricKey;
  value: string;
  benchmark: string;
  target: string;
  onTarget: boolean;
}) {
  const [open, setOpen] = useState(false);
  const def = metricDefinitions[metricKey];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1 text-sm font-medium"
      >
        <span className={onTarget ? "text-emerald-700" : "text-rose-700"}>
          {def.label} {value}
        </span>
        <span className="text-slate-400 text-xs w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center leading-none">
          i
        </span>
      </button>
      {open && (
        <div className="absolute z-20 top-full left-0 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-left">
          <div className="text-xs font-semibold text-slate-900">
            {def.label} = {def.full}
          </div>
          <div className="text-xs text-slate-500 mt-1">{def.description}</div>
          <div className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Your Brand</span>
              <span className="font-medium text-slate-800">{value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Relevant Benchmark</span>
              <span className="font-medium text-slate-800">{benchmark}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target</span>
              <span className="font-medium text-slate-800">{target}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
