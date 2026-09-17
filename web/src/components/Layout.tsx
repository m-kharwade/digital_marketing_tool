import { NavLink, Outlet } from "react-router-dom";
import { brand } from "../data/mockData";

const navItems = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/live-market", label: "Live Market", icon: "📡" },
  { to: "/recommendations", label: "Recommendations", icon: "💡" },
  { to: "/creative-studio", label: "Creative Studio", icon: "🎨" },
  { to: "/campaigns", label: "Campaigns", icon: "📊" },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-slate-200">
          <div className="text-sm font-semibold text-slate-500 tracking-wide">MARKETING AI</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">{brand.name}</div>
          <div className="text-xs text-slate-400 mt-1">
            {brand.category} · {brand.subcategory} · {brand.geography}
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-slate-200 text-xs text-slate-400">
          Draft UI · mock data
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
