import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Squiggle } from "@/components/Doodles";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      data-testid="splash-screen"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
      onClick={() => navigate("/home")}
    >
      <img
        src="/lostly-logo.jpg"
        alt="Lostly logo"
        className="animate-splash-in h-28 w-28 rounded-[26px_30px_24px_32px/30px_24px_32px_26px] border-2 border-stone-900 object-cover shadow-[4px_4px_0px_rgba(30,30,30,0.9)]"
      />
      <div className="animate-fade-up text-center" style={{ animationDelay: "0.25s" }}>
        <h1 className="font-display text-6xl font-bold text-stone-900">Lostly</h1>
        <Squiggle className="mx-auto mt-1 h-3 w-28 opacity-70" />
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
          campus lost &amp; found
        </p>
      </div>
    </div>
  );
}
