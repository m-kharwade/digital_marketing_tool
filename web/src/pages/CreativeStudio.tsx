import { useState } from "react";
import { creatives as initialCreatives, ideas, type Creative } from "../data/mockData";
import { CheckIcon, PencilIcon, RefreshIcon, XIcon, CheckCircleIcon } from "../components/Icons";

const statusStyle: Record<Creative["status"], string> = {
  pending: "bg-slate-100 text-slate-500",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
};

export default function CreativeStudio() {
  const [creatives, setCreatives] = useState(initialCreatives);

  const setStatus = (id: string, status: Creative["status"]) => {
    setCreatives((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const approvedCount = creatives.filter((c) => c.status === "approved").length;
  const progressPct = Math.round((approvedCount / creatives.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Creative Studio</h1>
          <p className="text-sm text-slate-500 mt-1">What exactly should I publish?</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">
            <span className="font-bold text-slate-900">{approvedCount}</span> of {creatives.length} approved
          </div>
          <div className="w-36 h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-9">
        {ideas.map((idea) => {
          const ideaCreatives = creatives.filter((c) => c.ideaId === idea.id);
          const ideaApproved = ideaCreatives.filter((c) => c.status === "approved").length;
          return (
            <div key={idea.id}>
              <div className="flex items-center gap-2 mb-3.5">
                <div className="text-sm font-semibold text-slate-800">{idea.title}</div>
                {ideaApproved > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <CheckIcon className="w-3 h-3" />
                    {ideaApproved} approved
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {ideaCreatives.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-xl border bg-white overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md ${
                      c.status === "approved"
                        ? "border-emerald-300 ring-1 ring-emerald-100"
                        : "border-slate-200"
                    }`}
                  >
                    <div
                      className="h-32 relative flex items-end p-3 text-white overflow-hidden"
                      style={{ background: `linear-gradient(140deg, ${c.color}, ${c.color}cc)` }}
                    >
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
                      <span className="relative text-xs font-semibold bg-black/25 backdrop-blur-sm px-1.5 py-0.5 rounded">
                        Variant {c.variant}
                      </span>
                      {c.status === "approved" && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="text-sm font-medium text-slate-900 leading-snug">
                        {c.headline}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">CTA: {c.cta}</div>
                      <div className="mt-2">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-auto pt-3 flex gap-1.5">
                        <button
                          onClick={() => setStatus(c.id, "approved")}
                          className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                        >
                          <CheckIcon className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors" title="Edit">
                          <PencilIcon className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors" title="Regenerate">
                          <RefreshIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStatus(c.id, "rejected")}
                          className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                          title="Reject"
                        >
                          <XIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
