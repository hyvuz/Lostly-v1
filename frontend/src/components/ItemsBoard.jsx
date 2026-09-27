import { useMemo, useState } from "react";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { ItemCard } from "@/components/ItemCard";
import { ClueModal } from "@/components/ClueModal";
import { ScribbleCircle } from "@/components/Doodles";
import { PackageOpen, Plus } from "lucide-react";

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "missing", label: "Still Missing" },
  { id: "found", label: "Found" },
];

export const ItemsBoard = ({ items, onAddClue, onToggleStatus, onReport }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [statusTab, setStatusTab] = useState("all");
  const [clueItem, setClueItem] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((it) => (category === "all" ? true : it.category === category))
      .filter((it) => (statusTab === "all" ? true : it.status === statusTab))
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
  }, [items, query, category, statusTab]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative">
          <ScribbleCircle className="absolute -left-4 -top-3 h-14 w-20 opacity-40" />
          <h2 className="relative font-display text-4xl font-bold text-stone-900 sm:text-5xl">
            Lost Items Board
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Spot something? Drop a clue and help a fellow student out.
          </p>
        </div>
        <button
          data-testid="board-report-cta"
          onClick={onReport}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-stone-900 bg-primary px-5 py-3 text-base font-bold text-white shadow-[3px_3px_0px_#1E1E1E] transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" /> Report a lost item
        </button>
      </div>

      <SearchFilterBar
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
      />

      <div className="mt-4 flex gap-2">
        {STATUS_TABS.map((t) => (
          <button
            key={t.id}
            data-testid={`status-tab-${t.id}`}
            onClick={() => setStatusTab(t.id)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors " +
              (statusTab === t.id
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200")
            }
          >
            {t.label}
          </button>
        ))}
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
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
