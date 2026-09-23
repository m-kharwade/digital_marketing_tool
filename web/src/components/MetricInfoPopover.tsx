import { useState } from "react";
import { metricDefinitions, type MetricKey } from "../data/mockData";
import { InfoIcon } from "./Icons";

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
        className="group flex items-center gap-1.5 rounded-lg px-2 py-1 -mx-2 -my-1 hover:bg-slate-50 transition-colors"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${onTarget ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        <span className="text-[11px] font-medium text-slate-400">{def.label}</span>
        <span className={`text-sm font-semibold ${onTarget ? "text-emerald-700" : "text-rose-700"}`}>
          {value}
        </span>
        <InfoIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
      </button>
      {open && (
        <div className="absolute z-20 top-full left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl shadow-slate-200/60 text-left">
          <div className="text-xs font-semibold text-slate-900">
            {def.label} = {def.full}
          </div>
          <div className="text-xs text-slate-500 mt-1 leading-relaxed">{def.description}</div>
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Your Brand</span>
              <span className="font-semibold text-slate-800">{value}</span>
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
