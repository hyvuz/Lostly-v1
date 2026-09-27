import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ITEM_TYPES,
  TIMEFRAMES,
  categoryForType,
  iconForType,
} from "@/lib/lostly";
import { WavyUnderline, DrawnArrow } from "@/components/Doodles";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Check,
  HelpCircle,
  PartyPopper,
} from "lucide-react";

const TOTAL = 4;

export const ReportFlow = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [itemType, setItemType] = useState("");
  const [otherText, setOtherText] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [locationKnown, setLocationKnown] = useState(null);
  const [location, setLocation] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [approxTime, setApproxTime] = useState("");

  const displayName = itemType === "Other" ? otherText.trim() || "Other item" : itemType;

  const canNext =
    (step === 1 && itemType && (itemType !== "Other" || otherText.trim())) ||
    (step === 2 && locationKnown !== null && (!locationKnown || true)) ||
    (step === 3 && timeframe) ||
    step === 4;

  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handlePost = () => {
    const title = [color.trim(), displayName].filter(Boolean).join(" ");
    onSubmit({
      title: title || displayName,
      itemType,
      category: categoryForType(itemType),
      color: color.trim(),
      description: description.trim(),
      locationKnown: !!locationKnown,
      location: locationKnown ? location.trim() : "",
      timeframe,
      approxTime: approxTime.trim(),
    });
  };

  const Icon = itemType ? iconForType(itemType) : null;

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-8 sm:pt-12">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div
              key={n}
              data-testid="flow-progress-step"
              className={
                "h-2.5 rounded-full transition-all duration-300 " +
                (active
                  ? "w-8 bg-primary"
                  : done
                  ? "w-2.5 bg-primary/60"
                  : "w-2.5 bg-stone-300")
              }
            />
          );
        })}
        <span className="ml-3 font-mono text-xs text-stone-500">
          {step} / {TOTAL}
        </span>
      </div>

      <div key={step} className="sketch-card animate-pop-in p-6 sm:p-8">
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div className="relative inline-block">
              <h2 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
                What did you lose?
              </h2>
              <WavyUnderline className="mt-1 h-3 w-40" />
            </div>
            <p className="mt-2 text-sm text-stone-500">Pick the closest match.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ITEM_TYPES.map((t) => {
                const TIcon = t.icon;
                const selected = itemType === t.id;
                return (
                  <button
                    key={t.id}
                    data-testid={`category-btn-${t.id}`}
                    onClick={() => setItemType(t.id)}
                    className={
                      "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition-all " +
                      (selected
                        ? "border-stone-900 bg-primary text-white shadow-[3px_3px_0px_#1E1E1E]"
                        : "border-stone-800 bg-white text-stone-800 hover:-translate-y-0.5 hover:bg-amber-50 shadow-[2px_2px_0px_#1E1E1E]")
                    }
                  >
                    <TIcon className="h-6 w-6" />
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

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-stone-700">
                  Color <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <Input
                  data-testid="item-color-input"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Black, Silver"
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
                  placeholder="Any stickers, marks, contents…"
                  className="rounded-xl border-2 border-stone-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
              Do you remember where you last had it?
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                data-testid="location-yes-btn"
                onClick={() => setLocationKnown(true)}
                className={
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-6 font-bold transition-all " +
                  (locationKnown === true
                    ? "border-stone-900 bg-primary text-white shadow-[3px_3px_0px_#1E1E1E]"
                    : "border-stone-800 bg-white text-stone-800 hover:-translate-y-0.5 shadow-[2px_2px_0px_#1E1E1E]")
                }
              >
                <MapPin className="h-7 w-7" />
                Yes
              </button>
              <button
                data-testid="location-notsure-btn"
                onClick={() => {
                  setLocationKnown(false);
                  setLocation("");
                }}
                className={
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-6 font-bold transition-all " +
                  (locationKnown === false
                    ? "border-stone-900 bg-primary text-white shadow-[3px_3px_0px_#1E1E1E]"
                    : "border-stone-800 bg-white text-stone-800 hover:-translate-y-0.5 shadow-[2px_2px_0px_#1E1E1E]")
                }
              >
                <HelpCircle className="h-7 w-7" />
                Not sure
              </button>
            </div>

            {locationKnown === true && (
              <div className="mt-5 animate-pop-in">
                <label className="mb-1 block text-sm font-semibold text-stone-700">
                  Where did you last see it?
                </label>
                <Input
                  data-testid="location-input"
                  autoFocus
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Library, second floor near the study rooms"
                  className="rounded-xl border-2 border-stone-800"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
              When do you remember having it last?
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t}
                  data-testid={`timeframe-btn-${t}`}
                  onClick={() => setTimeframe(t)}
                  className={
                    "rounded-2xl border-2 p-4 font-semibold transition-all " +
                    (timeframe === t
                      ? "border-stone-900 bg-primary text-white shadow-[3px_3px_0px_#1E1E1E]"
                      : "border-stone-800 bg-white text-stone-800 hover:-translate-y-0.5 shadow-[2px_2px_0px_#1E1E1E]")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-semibold text-stone-700">
                Approximate time <span className="font-normal text-stone-400">(optional)</span>
              </label>
              <Input
                data-testid="approx-time-input"
                value={approxTime}
                onChange={(e) => setApproxTime(e.target.value)}
                placeholder="e.g. around 3 PM after class"
                className="rounded-xl border-2 border-stone-800"
              />
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <div className="mb-4 flex items-center gap-2 text-primary">
              <PartyPopper className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
                Almost done — review
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
              Confirm your report
            </h2>

            <div className="mt-6 rounded-2xl border-2 border-dashed border-stone-400 bg-amber-50/50 p-5">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-stone-900 bg-amber-100">
                    <Icon className="h-6 w-6 text-stone-800" />
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold text-stone-900" data-testid="summary-title">
                    {[color, displayName].filter(Boolean).join(" ")}
                  </p>
                  <span className="font-mono text-xs text-stone-500">{itemType}</span>
                </div>
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                {description && (
                  <Row label="Description" value={description} />
                )}
                <Row
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                  label="Last known location"
                  value={locationKnown ? location || "—" : "Not sure"}
                />
                <Row
                  icon={<Clock className="h-4 w-4 text-primary" />}
                  label="Approximate time"
                  value={[timeframe, approxTime].filter(Boolean).join(" · ") || "—"}
                />
              </dl>
            </div>

            <button
              data-testid="flow-submit-button"
              onClick={handlePost}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-stone-900 bg-primary px-6 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_#1E1E1E] transition-all hover:-translate-y-0.5"
            >
              <Check className="h-5 w-5" strokeWidth={3} /> Post Lost Item
            </button>
          </div>
        )}

        {/* Nav */}
        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                data-testid="flow-back-button"
                onClick={back}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-stone-300 px-4 py-2.5 text-sm font-bold text-stone-600 transition-colors hover:bg-stone-100"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span />
            )}
            <div className="relative">
              {canNext && step === 1 && (
                <DrawnArrow className="absolute -right-2 -top-7 h-6 w-12 opacity-50" />
              )}
              <button
                data-testid="flow-next-button"
                onClick={next}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-stone-900 bg-stone-900 px-6 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#E05A36] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Row = ({ icon, label, value }) => (
  <div className="flex gap-2">
    <dt className="flex min-w-36 items-center gap-1.5 font-semibold text-stone-500">
      {icon}
      {label}
    </dt>
    <dd className="text-stone-800">{value}</dd>
  </div>
);
