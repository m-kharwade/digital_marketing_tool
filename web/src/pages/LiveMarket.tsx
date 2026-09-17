import { useState } from "react";
import { ads, competitors, topicMatrix } from "../data/mockData";
import FreshnessBadge from "../components/FreshnessBadge";

export default function LiveMarket() {
  const [selectedCell, setSelectedCell] = useState<{ topic: string; competitor: string } | null>(
    null
  );

  const filteredAds = selectedCell
    ? ads.filter((a) => a.topic === selectedCell.topic && a.competitor === selectedCell.competitor)
    : [];

  const totals = topicMatrix.map((row) => row.counts.reduce((a, b) => a + b, 0));

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Live Market</h1>
      <p className="text-sm text-slate-500 mt-1">What is happening in my category?</p>
      <div className="mt-3 mb-6">
        <FreshnessBadge />
      </div>

      <FilterBar />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
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
              <tr key={row.topic} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-800">{row.topic}</td>
                {row.counts.map((count, j) => {
                  const isSelected =
                    selectedCell?.topic === row.topic && selectedCell?.competitor === competitors[j];
                  return (
                    <td key={j} className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedCell({ topic: row.topic, competitor: competitors[j] })}
                        className={`w-10 h-8 rounded-md font-medium transition-colors ${
                          isSelected
                            ? "bg-violet-600 text-white"
                            : count > 8
                            ? "bg-violet-100 text-violet-800 hover:bg-violet-200"
                            : count > 0
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "text-slate-300"
                        }`}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center font-semibold text-slate-900">{totals[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCell && (
        <div className="mt-6">
          <div className="text-sm font-semibold text-slate-700 mb-3">
            {selectedCell.competitor} → {selectedCell.topic} → {filteredAds.length} Ads
          </div>
          {filteredAds.length === 0 ? (
            <div className="text-sm text-slate-400 italic">
              No sample ads in this mock dataset for this cell — try Brand B → IVF Awareness.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredAds.map((ad) => (
                <div key={ad.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="h-24" style={{ background: ad.thumbnailColor }} />
                  <div className="p-3">
                    <div className="text-xs font-semibold text-slate-800">{ad.format}</div>
                    <div className="text-xs text-slate-500 mt-1">CTA: {ad.cta}</div>
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
          className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:border-slate-300"
        >
          {f} <span className="text-slate-400">▾</span>
        </button>
      ))}
    </div>
  );
}
