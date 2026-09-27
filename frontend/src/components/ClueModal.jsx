import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin } from "lucide-react";
import { Squiggle } from "@/components/Doodles";

export const ClueModal = ({ open, onClose, item, onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-2 border-stone-900 rounded-2xl shadow-[6px_6px_0px_#1E1E1E] sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Drop a clue
            </span>
          </div>
          <DialogTitle className="font-display text-3xl leading-tight text-stone-900">
            Where do you think they should look?
          </DialogTitle>
          <DialogDescription className="text-stone-600">
            Helping find:{" "}
            <span className="font-semibold text-stone-800">{item.title}</span>
          </DialogDescription>
          <Squiggle className="h-3 w-24 opacity-60" />
        </DialogHeader>

        <Textarea
          data-testid="clue-modal-textarea"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I saw similar headphones near the computers in Lab 204…"
          className="min-h-28 resize-none rounded-xl border-2 border-stone-800 text-base focus-visible:ring-primary"
        />

        <button
          data-testid="clue-modal-submit-btn"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-stone-900 bg-primary px-5 py-3 text-base font-bold text-white shadow-[3px_3px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <Send className="h-4 w-4" /> Submit clue
        </button>
      </DialogContent>
    </Dialog>
  );
};
