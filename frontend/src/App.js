import { useEffect, useMemo, useState } from "react";
import "@/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import ReportForm from "@/pages/ReportForm";
import { ItemsBoard } from "@/components/ItemsBoard";
import { loadItems, saveItems } from "@/lib/lostly";

function Shell() {
  const location = useLocation();
  const [items, setItems] = useState([]);

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
      ownReport: true,
      createdAt: Date.now(),
      clues: [],
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const handleAddClue = (itemId, text) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              clues: [...it.clues, { id: `c-${Date.now()}`, text, createdAt: Date.now() }],
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

  const showHeader = location.pathname !== "/";

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<ReportForm onSubmit={handleReportSubmit} />} />
        <Route
          path="/board"
          element={
            <ItemsBoard
              items={items}
              onAddClue={handleAddClue}
              onToggleStatus={handleToggleStatus}
            />
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
