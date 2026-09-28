import { MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { iconForType, timeAgo } from "@/lib/lostly";

export const ItemCard = ({ item, onClue, onToggleStatus }) => {
  const Icon = iconForType(item.itemType);
  const found = item.status === "found";

  return (
    <div
      data-testid={`lost-item-card-${item.id}`}
      className={
        "sketch-card sketch-card-hover animate-pop-in flex flex-col overflow-hidden p-0 " +
        (found ? "!border-emerald-700/70" : "")
      }
      style={{ boxShadow: found ? "3px 3px 0px rgba(22,101,52,0.55)" : undefined }}
    >
      {/* Media / icon strip */}
      <div
        className={
          "relative flex h-28 items-center justify-center border-b-2 " +
          (found ? "border-emerald-700/40 bg-emerald-50" : "border-stone-900 bg-amber-50")
        }
      >
        {item.photo ? (
          <img src={item.photo} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <Icon className={"h-12 w-12 " + (found ? "text-emerald-700" : "text-stone-700")} />
        )}
        <span className="absolute left-3 top-3 rounded-full border-2 border-stone-900 bg-white/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone-700 backdrop-blur">
          {item.itemType}
        </span>
        <StatusBadge status={item.status} className="absolute right-3 top-3 bg-white/90 backdrop-blur" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3
          className={
            "text-base font-bold leading-snug text-stone-900 " +
            (found ? "line-through decoration-emerald-600/60 decoration-2" : "")
          }
        >
          {item.title}
        </h3>
        {item.description ? (
          <p className="mt-1 line-clamp-1 text-sm text-stone-500">{item.description}</p>
        ) : null}

        <div className="mt-3 space-y-1.5 text-sm text-stone-700">
          <div className="flex items-start gap-1.5">
            {item.locationKnown && item.location ? (
              <>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="line-clamp-1">{item.location}</span>
              </>
            ) : (
              <>
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                <span className="italic text-stone-500">Last location unknown</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">
              {item.timeframe}
              {item.approxTime ? ` · ${item.approxTime}` : ""}
            </span>
          </div>
        </div>

        {item.clues.length > 0 && (
          <div className="mt-3 space-y-1.5 rounded-[10px_13px_9px_12px/12px_9px_13px_10px] border-2 border-dashed border-stone-300 bg-stone-50 p-2.5">
            {item.clues.slice(-2).map((c) => (
              <p key={c.id} className="text-xs text-stone-600">
                💬 {c.text}
              </p>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500">
            <MessageCircle className="h-4 w-4" />
            {item.clues.length} {item.clues.length === 1 ? "clue" : "clues"}
          </span>
          <span className="font-mono text-[10px] text-stone-400">{timeAgo(item.createdAt)}</span>
        </div>

        <div className="mt-3 flex gap-2">
          {!found && (
            <button
              data-testid={`item-clue-button-${item.id}`}
              onClick={() => onClue(item)}
              className="flex-1 rounded-[10px_13px_9px_12px/12px_9px_13px_10px] border-2 border-stone-900 bg-white px-3 py-2 text-xs font-bold text-stone-900 shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 hover:bg-amber-50"
            >
              I might know something
            </button>
          )}
          <button
            data-testid={`item-status-toggle-${item.id}`}
            onClick={() => onToggleStatus(item.id)}
            className={
              "rounded-[10px_13px_9px_12px/12px_9px_13px_10px] border-2 border-stone-900 px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 " +
              (found
                ? "flex-1 bg-white text-stone-800 hover:bg-stone-100"
                : "bg-emerald-500 text-white hover:bg-emerald-600")
            }
          >
            {found ? "Mark missing" : "Mark Found ✓"}
          </button>
        </div>
      </div>
    </div>
  );
};
