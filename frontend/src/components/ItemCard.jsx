import { MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Paperclip } from "@/components/Doodles";
import { iconForType, timeAgo } from "@/lib/lostly";

export const ItemCard = ({ item, onClue, onToggleStatus }) => {
  const Icon = iconForType(item.itemType);
  const found = item.status === "found";

  return (
    <div
      data-testid={`lost-item-card-${item.id}`}
      className={
        "relative flex flex-col rounded-2xl border-2 p-5 sketch-card-hover animate-pop-in " +
        (found
          ? "border-emerald-600 bg-emerald-50/60"
          : "border-stone-900 bg-white")
      }
      style={{ boxShadow: found ? "4px 4px 0px #166534" : "4px 4px 0px #1E1E1E" }}
    >
      <Paperclip className="absolute -top-3 left-6 h-7 w-7 rotate-12" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 " +
              (found
                ? "border-emerald-600 bg-emerald-100 text-emerald-700"
                : "border-stone-900 bg-amber-100 text-stone-800")
            }
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
            {item.itemType}
          </span>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <h3
        className={
          "text-lg font-bold leading-snug text-stone-900 " +
          (found ? "line-through decoration-emerald-600/60 decoration-2" : "")
        }
      >
        {item.title}
      </h3>

      {item.description ? (
        <p className="mt-1 line-clamp-2 text-sm text-stone-600">{item.description}</p>
      ) : null}

      <div className="mt-4 space-y-1.5 text-sm text-stone-700">
        <div className="flex items-start gap-2">
          {item.locationKnown && item.location ? (
            <>
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item.location}</span>
            </>
          ) : (
            <>
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              <span className="italic text-stone-500">Last location unknown</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-primary" />
          <span>
            {item.timeframe}
            {item.approxTime ? ` · ${item.approxTime}` : ""}
          </span>
        </div>
      </div>

      {item.clues.length > 0 && (
        <div className="mt-4 space-y-2 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-3">
          {item.clues.map((c) => (
            <div key={c.id} className="text-sm">
              <p className="text-stone-700">💬 {c.text}</p>
              <span className="font-mono text-[10px] text-stone-400">
                {timeAgo(c.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500">
          <MessageCircle className="h-4 w-4" />
          {item.clues.length} {item.clues.length === 1 ? "clue" : "clues"}
        </span>
        <span className="font-mono text-[10px] text-stone-400">
          {timeAgo(item.createdAt)}
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        {!found && (
          <button
            data-testid={`item-clue-button-${item.id}`}
            onClick={() => onClue(item)}
            className="flex-1 rounded-xl border-2 border-stone-900 bg-white px-3 py-2 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:bg-amber-50"
          >
            I might know something
          </button>
        )}
        <button
          data-testid={`item-status-toggle-${item.id}`}
          onClick={() => onToggleStatus(item.id)}
          className={
            "rounded-xl border-2 border-stone-900 px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 " +
            (found
              ? "bg-white text-stone-800 hover:bg-stone-100"
              : "bg-emerald-500 text-white hover:bg-emerald-600") +
            (found ? " flex-1" : "")
          }
        >
          {found ? "Mark as still missing" : "Mark Found ✓"}
        </button>
      </div>
    </div>
  );
};
