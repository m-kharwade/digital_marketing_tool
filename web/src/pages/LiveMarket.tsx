import { useState } from "react";
import { ads, competitors, topicMatrix } from "../data/mockData";
import FreshnessBadge from "../components/FreshnessBadge";
import { ChevronDownIcon } from "../components/Icons";

export default function LiveMarket() {
  const [selectedCell, setSelectedCell] = useState<{ topic: string; competitor: string } | null>(
    null
  );

  const filteredAds = selectedCell
    ? ads.filter((a) => a.topic === selectedCell.topic && a.competitor === selectedCell.competitor)
    : [];

  const totals = topicMatrix.map((row) => row.counts.reduce((a, b) => a + b, 0));
  const maxCount = Math.max(...topicMatrix.flatMap((row) => row.counts));

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Live Market</h1>
      <p className="text-sm text-slate-500 mt-1">What is happening in my category?</p>
      <div className="mt-3 mb-6">
        <FreshnessBadge />
      </div>

      <FilterBar />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="text-left font-semibold text-slate-500 px-4 py-3">Topic</th>
              {competitors.map((c) => (
                <th key={c} className="text-center font-semibold text-slate-500 px-4 py-3">
                  {c}
                </th>
              ))}
              <th className="text-center font-semibold text-slate-500 px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {topicMatrix.map((row, i) => (
              <tr key={row.topic} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{row.topic}</td>
                {row.counts.map((count, j) => {
                  const isSelected =
                    selectedCell?.topic === row.topic && selectedCell?.competitor === competitors[j];
                  const intensity = maxCount > 0 ? count / maxCount : 0;
                  return (
                    <td key={j} className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedCell({ topic: row.topic, competitor: competitors[j] })}
                        style={
                          !isSelected && count > 0
                            ? { backgroundColor: `rgba(124, 58, 237, ${0.08 + intensity * 0.34})` }
                            : undefined
                        }
                        className={`w-11 h-8 rounded-md font-semibold text-sm transition-all ${
                          isSelected
                            ? "bg-violet-600 text-white shadow-md shadow-violet-200 scale-105"
                            : count > 0
                            ? "text-violet-800 hover:brightness-95"
                            : "text-slate-300"
                        }`}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center font-bold text-slate-900">{totals[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCell && (
        <div className="mt-6">
          <div className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <span className="text-slate-900">{selectedCell.competitor}</span>
            <span className="text-slate-400">→</span>
            <span className="text-slate-900">{selectedCell.topic}</span>
            <span className="text-slate-400">→</span>
            <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
              {filteredAds.length} Ads
            </span>
          </div>
          {filteredAds.length === 0 ? (
            <div className="text-sm text-slate-400 italic rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center">
              No sample ads in this mock dataset for this cell — try Brand B → IVF Awareness.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  className="group rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="h-24 relative overflow-hidden"
                    style={{ background: ad.thumbnailColor }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-slate-900/70 bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {ad.format}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-slate-500">
                      CTA: <span className="font-semibold text-slate-800">{ad.cta}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      {ad.firstSeen} – {ad.lastSeen}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FilterBar() {
  const filters = ["Industry", "Category", "Subcategory", "Geography", "Competitor", "Channel", "Period"];
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {filters.map((f) => (
        <button
          key={f}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/50 transition-colors"
        >
          {f} <ChevronDownIcon className="w-3 h-3 text-slate-400" />
        </button>
      ))}
    </div>
  );
}
