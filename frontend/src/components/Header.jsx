import { Search, PlusCircle, MapPinned } from "lucide-react";

export const Header = ({ view, onView, missingCount }) => {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-stone-900 bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          data-testid="brand-logo"
          onClick={() => onView("board")}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-stone-900 bg-primary text-white shadow-[2px_2px_0px_#1E1E1E]">
            <MapPinned className="h-5 w-5" />
          </span>
          <span className="font-display text-3xl font-bold leading-none text-stone-900">
            Lostly
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-stone-400 sm:inline">
            campus lost &amp; found
          </span>
        </button>

        <nav className="flex items-center gap-2">
          <button
            data-testid="nav-report-tab"
            onClick={() => onView("report")}
            className={
              "inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-all sm:px-4 " +
              (view === "report"
                ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_#1E1E1E]"
                : "border-stone-800 bg-white text-stone-800 hover:bg-stone-100")
            }
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Report</span>
          </button>
          <button
            data-testid="nav-board-tab"
            onClick={() => onView("board")}
            className={
              "inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-all sm:px-4 " +
              (view === "board"
                ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_#1E1E1E]"
                : "border-stone-800 bg-white text-stone-800 hover:bg-stone-100")
            }
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Board</span>
            {missingCount > 0 && (
              <span className="ml-0.5 rounded-full bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] text-white">
                {missingCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
