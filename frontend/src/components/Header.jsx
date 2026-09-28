import { useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const onMyItems = location.pathname === "/my-items";

  return (
    <header className="sticky top-0 z-40 border-b-2 border-stone-900 bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          data-testid="brand-logo"
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >
          <img
            src="/lostly-logo.jpg"
            alt="Lostly logo"
            className="h-10 w-10 rounded-[11px_13px_10px_14px/13px_10px_14px_11px] border-2 border-stone-900 object-cover shadow-[2px_2px_0px_rgba(30,30,30,0.85)]"
          />
          {isHome && (
            <span className="font-display text-3xl font-bold leading-none text-stone-900">
              Lostly
            </span>
          )}
        </button>

        <button
          data-testid="nav-my-items"
          onClick={() => navigate("/my-items")}
          className={
            "inline-flex items-center gap-2 rounded-full border-2 border-stone-900 px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 " +
            (onMyItems ? "bg-primary text-white" : "bg-white text-stone-800 hover:bg-stone-100")
          }
        >
          <User className="h-4 w-4" />
          My Items
        </button>
      </div>
    </header>
  );
};
