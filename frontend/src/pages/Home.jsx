import { useNavigate } from "react-router-dom";
import { PlusCircle, Search, ArrowRight } from "lucide-react";
import { WavyUnderline, ScribbleCircle, DrawnArrow, Squiggle } from "@/components/Doodles";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center">
      {/* Doodle accents */}
      <ScribbleCircle className="pointer-events-none absolute left-2 top-10 hidden h-24 w-32 opacity-30 sm:block" />
      <Squiggle className="pointer-events-none absolute right-4 top-24 hidden h-5 w-24 opacity-40 sm:block" />

      <h1 className="animate-fade-up font-display text-5xl font-bold leading-[1.05] text-stone-900 sm:text-6xl lg:text-7xl" style={{ animationDelay: "0.05s" }}>
        Lost something?
        <br />
        <span className="relative inline-block text-primary">
          Let&apos;s help you find it.
          <WavyUnderline className="absolute -bottom-2 left-0 h-3 w-full" />
        </span>
      </h1>

      <p className="animate-fade-up mt-7 max-w-md text-base text-stone-600 sm:text-lg" style={{ animationDelay: "0.12s" }}>
        Report a lost item in seconds and let other students point you toward
        where they last saw it.
      </p>

      <div className="animate-fade-up mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "0.2s" }}>
        <div className="relative">
          <DrawnArrow className="pointer-events-none absolute -left-10 -top-6 hidden h-6 w-12 opacity-50 sm:block" />
          <button
            data-testid="home-report-btn"
            onClick={() => navigate("/report")}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-[14px_16px_13px_17px/16px_13px_17px_14px] border-2 border-stone-900 bg-primary px-7 py-4 text-lg font-bold text-white shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(30,30,30,0.9)] sm:w-auto"
          >
            <PlusCircle className="h-5 w-5" /> Report a Lost Item
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <button
          data-testid="home-browse-btn"
          onClick={() => navigate("/board")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[14px_16px_13px_17px/16px_13px_17px_14px] border-2 border-stone-900 bg-white px-7 py-4 text-lg font-bold text-stone-900 shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-[5px_5px_0px_rgba(30,30,30,0.9)] sm:w-auto"
        >
          <Search className="h-5 w-5" /> Browse Missing Items
        </button>
      </div>
    </div>
  );
}
