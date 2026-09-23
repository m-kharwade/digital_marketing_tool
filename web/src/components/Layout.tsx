import { NavLink, Outlet } from "react-router-dom";
import { brand } from "../data/mockData";
import {
  HomeIcon,
  ActivityIcon,
  LightbulbIcon,
  PaletteIcon,
  BarChartIcon,
} from "./Icons";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/live-market", label: "Live Market", icon: ActivityIcon },
  { to: "/recommendations", label: "Recommendations", icon: LightbulbIcon },
  { to: "/creative-studio", label: "Creative Studio", icon: PaletteIcon },
  { to: "/campaigns", label: "Campaigns", icon: BarChartIcon },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f4f4f8] text-slate-900">
      <aside className="w-64 shrink-0 border-r border-slate-200/80 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-md shadow-violet-200 flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-slate-400 tracking-[0.12em]">
                MARKETING AI
              </div>
              <div className="text-[15px] font-bold text-slate-900 truncate leading-tight">
                {brand.name}
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 flex flex-wrap gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {brand.category}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {brand.subcategory}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
              {brand.geography}
            </span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-violet-600 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                        isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
          Draft UI · mock data
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
