import { useState } from "react";
import { creatives as initialCreatives, ideas, type Creative } from "../data/mockData";

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

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Creative Studio</h1>
          <p className="text-sm text-slate-500 mt-1">What exactly should I publish?</p>
        </div>
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{approvedCount}</span> of {creatives.length} approved
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {ideas.map((idea) => (
          <div key={idea.id}>
            <div className="text-sm font-semibold text-slate-700 mb-3">{idea.title}</div>
            <div className="grid grid-cols-4 gap-4">
              {creatives
                .filter((c) => c.ideaId === idea.id)
                .map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col"
                  >
                    <div
                      className="h-32 flex items-end p-3 text-white"
                      style={{ background: c.color }}
                    >
                      <span className="text-xs font-semibold bg-black/20 px-1.5 py-0.5 rounded">
                        Variant {c.variant}
                      </span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="text-sm font-medium text-slate-900 leading-snug">
                        {c.headline}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">CTA: {c.cta}</div>
                      <div className="mt-2">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-auto pt-3 flex gap-1.5">
                        <button
                          onClick={() => setStatus(c.id, "approved")}
                          className="flex-1 text-xs font-medium py-1.5 rounded-md bg-violet-600 text-white hover:bg-violet-700"
                        >
                          Approve
                        </button>
                        <button className="text-xs font-medium py-1.5 px-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
                          Edit
                        </button>
                        <button className="text-xs font-medium py-1.5 px-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
                          ↻
                        </button>
                        <button
                          onClick={() => setStatus(c.id, "rejected")}
                          className="text-xs font-medium py-1.5 px-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
