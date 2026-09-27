import { Check, CircleDashed } from "lucide-react";

export const StatusBadge = ({ status, className = "" }) => {
  const found = status === "found";
  return (
    <span
      data-testid="status-badge"
      className={
        "inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-0.5 text-xs font-bold font-mono uppercase tracking-wide " +
        (found
          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
          : "border-red-400 bg-red-50 text-red-700") +
        " " +
        className
      }
    >
      {found ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Found
        </>
      ) : (
        <>
          <CircleDashed className="h-3.5 w-3.5" strokeWidth={3} /> Still Missing
        </>
      )}
    </span>
  );
};
