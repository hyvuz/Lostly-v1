import { Search } from "lucide-react";
import { CATEGORY_FILTERS } from "@/lib/lostly";

export const SearchFilterBar = ({ query, onQuery, category, onCategory }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <input
          data-testid="board-search-input"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search lost items… (try 'keys', 'macbook')"
          className="w-full rounded-2xl border-2 border-stone-800 bg-white py-3 pl-12 pr-4 text-base font-medium shadow-[3px_3px_0px_#1E1E1E] outline-none transition-shadow focus:shadow-[4px_4px_0px_#E05A36]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((f) => {
          const active = category === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              data-testid={`filter-chip-${f.id}`}
              onClick={() => onCategory(f.id)}
              className={
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all " +
                (active
                  ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_#1E1E1E]"
                  : "border-stone-800 bg-white text-stone-800 hover:bg-stone-100 shadow-[2px_2px_0px_#1E1E1E] hover:-translate-y-0.5")
              }
            >
              <Icon className="h-4 w-4" />
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
