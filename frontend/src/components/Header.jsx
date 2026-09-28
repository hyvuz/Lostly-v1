import { NavLink, useNavigate } from "react-router-dom";
import { MapPinned } from "lucide-react";

const linkClass = ({ isActive }) =>
  "rounded-full px-3 py-1.5 text-sm font-bold transition-colors sm:px-4 " +
  (isActive
    ? "bg-primary text-white"
    : "text-stone-700 hover:bg-stone-200/70");

export const Header = ({ missingCount }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b-2 border-stone-900 bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          data-testid="brand-logo"
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px_13px_10px_14px/13px_10px_14px_11px] border-2 border-stone-900 bg-primary text-white shadow-[2px_2px_0px_rgba(30,30,30,0.85)]">
            <MapPinned className="h-5 w-5" />
          </span>
          <span className="font-display text-3xl font-bold leading-none text-stone-900">
            Lostly
          </span>
        </button>

        <nav className="flex items-center gap-1 rounded-full border-2 border-stone-800 bg-white p-1 shadow-[2px_2px_0px_rgba(30,30,30,0.85)]">
          <NavLink data-testid="nav-home" to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink data-testid="nav-report" to="/report" className={linkClass}>
            Report
          </NavLink>
          <NavLink data-testid="nav-board" to="/board" className={linkClass}>
            <span className="inline-flex items-center gap-1.5">
              Missing Items
              {missingCount > 0 && (
                <span className="rounded-full bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] text-white">
                  {missingCount}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
