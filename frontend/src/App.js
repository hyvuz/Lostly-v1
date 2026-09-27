import { useEffect, useMemo, useState } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { ReportFlow } from "@/components/ReportFlow";
import { ItemsBoard } from "@/components/ItemsBoard";
import { loadItems, saveItems } from "@/lib/lostly";

function App() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("report");

  useEffect(() => {
    setItems(loadItems());
  }, []);

  useEffect(() => {
    if (items.length) saveItems(items);
  }, [items]);

  const missingCount = useMemo(
    () => items.filter((i) => i.status === "missing").length,
    [items]
  );

  const handleReportSubmit = (data) => {
    const newItem = {
      id: `item-${Date.now()}`,
      ...data,
      status: "missing",
      createdAt: Date.now(),
      clues: [],
    };
    setItems((prev) => [newItem, ...prev]);
    setView("board");
    toast.success("Lost item posted!", {
      description: "Other students can now help you find it.",
    });
  };

  const handleAddClue = (itemId, text) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              clues: [
                ...it.clues,
                { id: `c-${Date.now()}`, text, createdAt: Date.now() },
              ],
            }
          : it
      )
    );
    toast.success("Clue submitted", { description: "Thanks for helping out!" });
  };

  const handleToggleStatus = (itemId) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, status: it.status === "found" ? "missing" : "found" }
          : it
      )
    );
  };

  return (
    <div className="min-h-screen">
      <Header view={view} onView={setView} missingCount={missingCount} />
      {view === "report" ? (
        <ReportFlow onSubmit={handleReportSubmit} />
      ) : (
        <ItemsBoard
          items={items}
          onAddClue={handleAddClue}
          onToggleStatus={handleToggleStatus}
          onReport={() => setView("report")}
        />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
