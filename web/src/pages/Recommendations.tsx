import { recommendations, type Recommendation } from "../data/mockData";
import FreshnessBadge from "../components/FreshnessBadge";

const statusStyle: Record<Recommendation["status"], string> = {
  KEEP: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MODIFY: "bg-amber-50 text-amber-700 border-amber-200",
  REPLACE: "bg-rose-50 text-rose-700 border-rose-200",
};

const confidenceStyle: Record<Recommendation["confidence"], string> = {
  High: "text-emerald-700",
  Medium: "text-amber-700",
  Low: "text-rose-700",
};

export default function Recommendations() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Recommendations</h1>
      <p className="text-sm text-slate-500 mt-1">What should I do?</p>
      <div className="mt-3 mb-6">
        <FreshnessBadge />
      </div>

      <div className="space-y-5">
        {recommendations.map((rec) => (
          <div key={rec.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyle[rec.status]}`}
              >
                {rec.status}
              </span>
              <span className={`text-xs font-semibold ${confidenceStyle[rec.confidence]}`}>
                {rec.confidence} Confidence
              </span>
            </div>

            <div className="text-lg font-semibold text-slate-900 mb-4">{rec.what}</div>

            <Section label="WHY">
              <ul className="space-y-1">
                {rec.why.map((w, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-violet-400">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="HOW">
              <div className="grid grid-cols-4 gap-3 text-sm">
                <Field label="Format" value={rec.how.format} />
                <Field label="CTA" value={rec.how.cta} />
                <Field label="Audience" value={rec.how.audience} />
                <Field label="Channel" value={rec.how.channel} />
              </div>
            </Section>

            <Section label="TARGET">
              <div className="flex flex-wrap gap-2">
                <Chip label="CTR" value={rec.target.ctr} />
                <Chip label="CPC" value={rec.target.cpc} />
                <Chip label="CVR" value={rec.target.cvr} />
                <Chip label="Frequency Warning" value={rec.target.frequencyWarning} />
              </div>
            </Section>

            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">
              <button className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700">
                Generate Creatives
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
                View Evidence
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-slate-400 mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="font-medium text-slate-800">{value}</div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
      <span className="text-slate-400">{label}: </span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}
