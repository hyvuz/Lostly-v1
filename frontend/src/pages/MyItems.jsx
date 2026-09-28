import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PackageOpen, Check, CircleDashed, MapPin, Clock, Phone, MessageCircle, PlusCircle } from "lucide-react";
import { iconForType, timeAgo } from "@/lib/lostly";
import { ScribbleCircle } from "@/components/Doodles";

const MyItemCard = ({ item, onSetStatus }) => {
  const Icon = iconForType(item.itemType);
  const found = item.status === "found";
  return (
    <div
      data-testid={`my-item-card-${item.id}`}
      className={
        "sketch-card sketch-card-hover animate-pop-in flex flex-col overflow-hidden p-0 " +
        (found ? "!border-emerald-700/70" : "")
      }
      style={{ boxShadow: found ? "3px 3px 0px rgba(22,101,52,0.55)" : undefined }}
    >
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
        <span
          className={
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-0.5 text-xs font-bold font-mono uppercase tracking-wide backdrop-blur " +
            (found
              ? "border-emerald-600 bg-emerald-50/90 text-emerald-700"
              : "border-red-400 bg-red-50/90 text-red-700")
          }
        >
          {found ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <CircleDashed className="h-3.5 w-3.5" strokeWidth={3} />}
          {found ? "Found" : "Missing"}
        </span>
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
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">
              {item.locationKnown && item.location ? item.location : "Last location unknown"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">
              {item.timeframe}
              {item.approxTime ? ` · ${item.approxTime}` : ""}
            </span>
          </div>
          {item.phone ? (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-1">{item.phone}</span>
            </div>
          ) : null}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-3 font-mono text-xs text-stone-500">
          <MessageCircle className="h-4 w-4" />
          {item.clues.length} {item.clues.length === 1 ? "clue" : "clues"}
          <span className="ml-auto text-[10px] text-stone-400">{timeAgo(item.createdAt)}</span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            data-testid={`my-item-notfound-${item.id}`}
            onClick={() => onSetStatus(item.id, "missing")}
            className={
              "flex-1 rounded-[10px_13px_9px_12px/12px_9px_13px_10px] border-2 border-stone-900 px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 " +
              (!found ? "bg-primary text-white" : "bg-white text-stone-800 hover:bg-stone-100")
            }
          >
            Not found yet
          </button>
          <button
            data-testid={`my-item-found-${item.id}`}
            onClick={() => onSetStatus(item.id, "found")}
            className={
              "flex-1 rounded-[10px_13px_9px_12px/12px_9px_13px_10px] border-2 border-stone-900 px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_rgba(30,30,30,0.85)] transition-all hover:-translate-y-0.5 " +
              (found ? "bg-emerald-500 text-white" : "bg-white text-stone-800 hover:bg-emerald-50")
            }
          >
            Found ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyItems({ items, onSetStatus }) {
  const navigate = useNavigate();
  const myItems = useMemo(
    () => items.filter((it) => it.ownReport).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [items]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative">
          <ScribbleCircle className="pointer-events-none absolute -left-3 -top-3 h-12 w-20 opacity-30" />
          <h1 className="relative font-display text-5xl font-bold text-stone-900 sm:text-6xl">
            My Items
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            The items you reported. Mark them found when they turn up.
          </p>
        </div>
        <button
          data-testid="myitems-report-cta"
          onClick={() => navigate("/report")}
          className="inline-flex items-center justify-center gap-2 rounded-[13px_15px_12px_16px/15px_12px_16px_13px] border-2 border-stone-900 bg-primary px-5 py-3 text-base font-bold text-white shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5"
        >
          <PlusCircle className="h-5 w-5" /> Report a lost item
        </button>
      </div>

      {myItems.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <PackageOpen className="h-16 w-16 text-stone-300" />
          <p className="mt-4 font-display text-3xl text-stone-700">No reports yet</p>
          <p className="mt-1 text-sm text-stone-500">
            Items you report will show up here so you can track them.
          </p>
          <button
            data-testid="myitems-empty-report-btn"
            onClick={() => navigate("/report")}
            className="mt-5 inline-flex items-center gap-2 rounded-[13px_15px_12px_16px/15px_12px_16px_13px] border-2 border-stone-900 bg-primary px-5 py-3 text-base font-bold text-white shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="h-5 w-5" /> Report a lost item
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myItems.map((item) => (
            <MyItemCard key={item.id} item={item} onSetStatus={onSetStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
