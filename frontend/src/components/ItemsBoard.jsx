import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle, PackageOpen, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ItemCard } from "@/components/ItemCard";
import { ClueModal } from "@/components/ClueModal";
import { ScribbleCircle } from "@/components/Doodles";
import {
  CATEGORY_FILTERS,
  TIME_FILTERS,
  withinTimeFilter,
} from "@/lib/lostly";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "missing", label: "Still Missing" },
  { id: "found", label: "Found" },
];

const FilterGroup = ({ label, children }) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-stone-400">
      {label}
    </span>
    {children}
  </div>
);

const Pill = ({ active, onClick, children, testId, icon: Icon }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className={
      "inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-sm font-bold transition-all " +
      (active
        ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_rgba(30,30,30,0.9)]"
        : "border-stone-800 bg-white text-stone-800 shadow-[2px_2px_0px_rgba(30,30,30,0.85)] hover:-translate-y-0.5 hover:bg-stone-100")
    }
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </button>
);

export const ItemsBoard = ({ items, onAddClue, onToggleStatus }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [status, setStatus] = useState("all");
  const [clueItem, setClueItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (timeFilter !== "all" ? 1 : 0) +
    (status !== "all" ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((it) => (category === "all" ? true : it.category === category))
      .filter((it) => (status === "all" ? true : it.status === status))
      .filter((it) => withinTimeFilter(it.createdAt, timeFilter))
      .filter((it) => {
        if (!q) return true;
        return (
          it.title.toLowerCase().includes(q) ||
          (it.description || "").toLowerCase().includes(q) ||
          it.itemType.toLowerCase().includes(q) ||
          (it.location || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [items, query, category, timeFilter, status]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative">
          <ScribbleCircle className="pointer-events-none absolute -left-3 -top-3 h-12 w-20 opacity-30" />
          <h1 className="relative font-display text-5xl font-bold text-stone-900 sm:text-6xl">
            Missing Items
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            See something familiar? Help another student find it.
          </p>
        </div>
        <button
          data-testid="board-report-cta"
          onClick={() => navigate("/report")}
          className="inline-flex items-center justify-center gap-2 rounded-[13px_15px_12px_16px/15px_12px_16px_13px] border-2 border-stone-900 bg-primary px-5 py-3 text-base font-bold text-white shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5"
        >
          <PlusCircle className="h-5 w-5" /> Report a lost item
        </button>
      </div>

      {/* Search + collapsible filter area */}
      <div className="rounded-[16px_19px_15px_20px/19px_15px_20px_16px] border-2 border-stone-900 bg-white/70 p-4 shadow-[3px_3px_0px_rgba(30,30,30,0.85)] sm:p-5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              data-testid="board-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by item name or type…"
              className="w-full rounded-xl border-2 border-stone-800 bg-white py-3 pl-12 pr-4 text-base font-medium outline-none transition-shadow focus:shadow-[3px_3px_0px_#E05A36]"
            />
          </div>
          <button
            data-testid="board-filter-toggle"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((v) => !v)}
            className={
              "relative inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-stone-900 px-4 py-3 text-sm font-bold shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 " +
              (showFilters ? "bg-primary text-white" : "bg-white text-stone-800 hover:bg-stone-100")
            }
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 font-mono text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={"h-4 w-4 transition-transform " + (showFilters ? "rotate-180" : "")}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 animate-pop-in space-y-3 border-t-2 border-dashed border-stone-300 pt-4">
            <FilterGroup label="Category">
              {CATEGORY_FILTERS.map((f) => (
                <Pill
                  key={f.id}
                  testId={`filter-chip-${f.id}`}
                  icon={f.icon}
                  active={category === f.id}
                  onClick={() => setCategory(f.id)}
                >
                  {f.label}
                </Pill>
              ))}
            </FilterGroup>

            <FilterGroup label="Time">
              {TIME_FILTERS.map((f) => (
                <Pill
                  key={f.id}
                  testId={`time-chip-${f.id}`}
                  active={timeFilter === f.id}
                  onClick={() => setTimeFilter(f.id)}
                >
                  {f.label}
                </Pill>
              ))}
            </FilterGroup>

            <FilterGroup label="Status">
              {STATUS_FILTERS.map((f) => (
                <Pill
                  key={f.id}
                  testId={`status-chip-${f.id}`}
                  active={status === f.id}
                  onClick={() => setStatus(f.id)}
                >
                  {f.label}
                </Pill>
              ))}
            </FilterGroup>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <PackageOpen className="h-16 w-16 text-stone-300" />
          <p className="mt-4 font-display text-3xl text-stone-700">Nothing here yet</p>
          <p className="mt-1 text-sm text-stone-500">
            No items match your search. Try another keyword or filter.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClue={setClueItem}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}

      <ClueModal
        open={!!clueItem}
        item={clueItem}
        onClose={() => setClueItem(null)}
        onSubmit={(text) => onAddClue(clueItem.id, text)}
      />
    </div>
  );
};
