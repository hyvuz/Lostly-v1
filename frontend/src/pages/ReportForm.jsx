import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  ITEM_TYPES,
  categoryForType,
  fileToResizedDataUrl,
} from "@/lib/lostly";
import { WavyUnderline, Squiggle } from "@/components/Doodles";
import {
  MapPin,
  HelpCircle,
  Check,
  ImagePlus,
  X,
  CalendarClock,
} from "lucide-react";

const WHEN_OPTIONS = ["Today", "Yesterday", "This Week", "Choose Date / Time", "Not Sure"];

const SectionHeading = ({ step, title }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-stone-900 bg-amber-100 font-mono text-sm font-bold text-stone-800">
      {step}
    </span>
    <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{title}</h2>
  </div>
);

const chipClass = (selected) =>
  "rounded-[11px_13px_10px_14px/13px_10px_14px_11px] border-2 p-4 text-sm font-semibold transition-all " +
  (selected
    ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_rgba(30,30,30,0.9)]"
    : "border-stone-800 bg-white text-stone-800 shadow-[2px_2px_0px_rgba(30,30,30,0.85)] hover:-translate-y-0.5 hover:bg-amber-50");

export default function ReportForm({ onSubmit }) {
  const navigate = useNavigate();
  const [itemType, setItemType] = useState("");
  const [otherText, setOtherText] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [notSureLocation, setNotSureLocation] = useState(false);
  const [whenOption, setWhenOption] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await fileToResizedDataUrl(file);
      setPhoto(url);
    } catch {
      toast.error("Couldn't load that image");
    }
  };

  const handleSubmit = () => {
    if (!itemType) {
      toast.error("Please pick what you lost");
      return;
    }
    if (itemType === "Other" && !otherText.trim()) {
      toast.error("Describe your item");
      return;
    }
    const displayName = itemType === "Other" ? otherText.trim() : itemType;
    const title = [color.trim(), displayName].filter(Boolean).join(" ");

    let timeframe = whenOption || "Not Sure";
    let approxTime = "";
    if (whenOption === "Choose Date / Time" && dateTime) {
      const d = new Date(dateTime);
      timeframe = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      approxTime = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    }

    onSubmit({
      title: title || displayName,
      itemType,
      category: categoryForType(itemType),
      color: color.trim(),
      description: description.trim(),
      photo,
      locationKnown: !notSureLocation && !!location.trim(),
      location: notSureLocation ? "" : location.trim(),
      timeframe,
      approxTime,
      phone: phone.trim(),
    });
    toast.success("Lost item posted!", {
      description: "Other students can now help you find it.",
    });
    navigate("/board");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-8">
        <div className="relative inline-block">
          <h1 className="font-display text-5xl font-bold text-stone-900 sm:text-6xl">
            Report a lost item
          </h1>
          <WavyUnderline className="mt-1 h-3 w-52" />
        </div>
        <p className="mt-3 text-stone-600">
          Fill in what you can — the more detail, the easier it is to spot.
        </p>
      </div>

      {/* SECTION 1 */}
      <section className="sketch-card mb-6 p-5 sm:p-6">
        <SectionHeading step="1" title="What did you lose?" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ITEM_TYPES.map((t) => {
            const Icon = t.icon;
            const selected = itemType === t.id;
            return (
              <button
                key={t.id}
                data-testid={`category-btn-${t.id}`}
                onClick={() => setItemType(t.id)}
                className={"flex flex-col items-center gap-2 " + chipClass(selected)}
              >
                <Icon className="h-6 w-6" />
                {t.label}
              </button>
            );
          })}
        </div>
        {itemType === "Other" && (
          <div className="mt-4 animate-pop-in">
            <label className="mb-1 block text-sm font-semibold text-stone-700">
              Describe the item
            </label>
            <Input
              data-testid="other-item-input"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="e.g. Yellow water bottle"
              className="rounded-xl border-2 border-stone-800"
            />
          </div>
        )}
      </section>

      {/* SECTION 2 */}
      <section className="sketch-card mb-6 p-5 sm:p-6">
        <SectionHeading step="2" title="Tell us a little more" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-stone-700">
              Color <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <Input
              data-testid="item-color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Black, Silver…"
              className="rounded-xl border-2 border-stone-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-stone-700">
              Short description <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <Input
              data-testid="item-desc-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Stickers, marks, model, contents…"
              className="rounded-xl border-2 border-stone-800"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-stone-700">
            Contact phone number{" "}
            <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <Input
            data-testid="item-phone-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +1 555 123 4567"
            className="rounded-xl border-2 border-stone-800"
          />
          <p className="mt-1 font-mono text-[11px] text-stone-400">
            shown on your report so finders can reach you
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-stone-700">
            Photo <span className="font-normal text-stone-400">(optional)</span>
          </label>
          {photo ? (
            <div className="relative inline-block">
              <img
                src={photo}
                alt="preview"
                className="h-40 w-full rounded-xl border-2 border-stone-800 object-cover sm:w-64"
              />
              <button
                data-testid="remove-photo-btn"
                onClick={() => setPhoto("")}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-stone-900 bg-white text-stone-800 shadow-[1px_1px_0px_rgba(30,30,30,0.85)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              data-testid="photo-upload-label"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-400 bg-stone-50 px-4 py-8 text-center text-stone-500 transition-colors hover:border-primary hover:bg-amber-50/50"
            >
              <ImagePlus className="h-7 w-7" />
              <span className="text-sm font-medium">Tap to add a photo</span>
              <span className="font-mono text-[11px] text-stone-400">
                helps others recognise it
              </span>
              <input
                data-testid="photo-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
          )}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="sketch-card mb-6 p-5 sm:p-6">
        <SectionHeading step="3" title="Where did you last see it?" />
        <Input
          data-testid="location-input"
          value={location}
          disabled={notSureLocation}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Library, Building 2, Cafeteria…"
          className={
            "rounded-xl border-2 border-stone-800 " +
            (notSureLocation ? "opacity-50" : "")
          }
        />
        <button
          data-testid="location-notsure-btn"
          onClick={() => {
            setNotSureLocation((v) => !v);
            setLocation("");
          }}
          className={
            "mt-3 inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all " +
            (notSureLocation
              ? "border-stone-900 bg-primary text-white shadow-[2px_2px_0px_rgba(30,30,30,0.9)]"
              : "border-stone-800 bg-white text-stone-800 shadow-[2px_2px_0px_rgba(30,30,30,0.85)] hover:bg-stone-100")
          }
        >
          <HelpCircle className="h-4 w-4" /> Not sure
        </button>
        {notSureLocation && (
          <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-stone-500">
            <MapPin className="h-3.5 w-3.5" /> Location will show as unknown
          </p>
        )}
      </section>

      {/* SECTION 4 */}
      <section className="sketch-card mb-8 p-5 sm:p-6">
        <SectionHeading step="4" title="When did you last have it?" />
        <div className="flex flex-wrap gap-3">
          {WHEN_OPTIONS.map((w) => (
            <button
              key={w}
              data-testid={`when-btn-${w}`}
              onClick={() => setWhenOption(w)}
              className={
                "inline-flex items-center gap-2 " + chipClass(whenOption === w)
              }
            >
              {w === "Choose Date / Time" && <CalendarClock className="h-4 w-4" />}
              {w}
            </button>
          ))}
        </div>
        {whenOption === "Choose Date / Time" && (
          <div className="mt-4 animate-pop-in">
            <label className="mb-1 block text-sm font-semibold text-stone-700">
              Pick date &amp; time
            </label>
            <Input
              data-testid="datetime-input"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="max-w-xs rounded-xl border-2 border-stone-800"
            />
          </div>
        )}
        <Squiggle className="mt-5 h-3 w-24 opacity-50" />
      </section>

      <button
        data-testid="report-submit-btn"
        onClick={handleSubmit}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[14px_16px_13px_17px/16px_13px_17px_14px] border-2 border-stone-900 bg-primary px-6 py-4 text-lg font-bold text-white shadow-[3px_3px_0px_rgba(30,30,30,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(30,30,30,0.9)]"
      >
        <Check className="h-5 w-5" strokeWidth={3} /> Report Lost Item
      </button>
    </div>
  );
}
