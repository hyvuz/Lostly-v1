import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <header className="sticky top-0 z-40 border-b-2 border-stone-900 bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6">
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
      </div>
    </header>
  );
};
