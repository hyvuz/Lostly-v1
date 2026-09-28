import {
  Laptop,
  Headphones,
  Smartphone,
  Key,
  Wallet,
  Gem,
  Backpack,
  Sparkles,
  Layers,
} from "lucide-react";

export const STORAGE_KEY = "lostly_items_v1";

// Item types shown in step 1 -> mapped to a board filter category + icon
export const ITEM_TYPES = [
  { id: "Laptop", label: "Laptop", icon: Laptop, category: "electronics" },
  { id: "Headphones", label: "Headphones", icon: Headphones, category: "electronics" },
  { id: "Phone", label: "Phone", icon: Smartphone, category: "electronics" },
  { id: "Keys", label: "Keys", icon: Key, category: "personal" },
  { id: "Wallet/ID", label: "Wallet / ID", icon: Wallet, category: "personal" },
  { id: "Jewelry", label: "Jewelry", icon: Gem, category: "personal" },
  { id: "Bag", label: "Bag", icon: Backpack, category: "bags" },
  { id: "Other", label: "Other", icon: Sparkles, category: "other" },
];

export const CATEGORY_FILTERS = [
  { id: "all", label: "All", icon: Layers },
  { id: "electronics", label: "Electronics", icon: Laptop },
  { id: "personal", label: "Personal Items", icon: Key },
  { id: "bags", label: "Bags", icon: Backpack },
  { id: "other", label: "Other", icon: Sparkles },
];

export const TIMEFRAMES = ["Today", "Yesterday", "This week", "I'm not sure"];

export function iconForType(itemType) {
  const found = ITEM_TYPES.find((t) => t.id === itemType);
  return found ? found.icon : Sparkles;
}

export function categoryForType(itemType) {
  const found = ITEM_TYPES.find((t) => t.id === itemType);
  return found ? found.category : "other";
}

const SEED_ITEMS = [
  {
    id: "item-1",
    title: "MacBook Air M2 (Midnight Blue)",
    category: "electronics",
    itemType: "Laptop",
    color: "Midnight Dark Blue",
    description: "Has a yellow cat sticker on the front lid and a scratch near the USB-C port.",
    locationKnown: true,
    location: "Main Campus Library — 2nd Floor Silent Study",
    timeframe: "Today",
    approxTime: "Around 2:15 PM after CHEM 101",
    status: "missing",
    createdAt: Date.now() - 10 * 60 * 1000,
    clues: [
      {
        id: "c-1",
        text: "Saw a midnight laptop turned into the library front help desk around 3pm! Ask Sarah at desk 2.",
        createdAt: Date.now() - 5 * 60 * 1000,
      },
    ],
  },
  {
    id: "item-2",
    title: "Sony WH-1000XM4 Silver Headphones",
    category: "electronics",
    itemType: "Headphones",
    color: "Silver / Off-white",
    description: "Left inside a black zip carrying case. Has a small carabiner attached to the handle.",
    locationKnown: true,
    location: "Student Union Cafe, booth near the window",
    timeframe: "Yesterday",
    approxTime: "Around 5:30 PM dinner rush",
    status: "missing",
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    clues: [],
  },
  {
    id: "item-3",
    title: "Dorm Keys with Green Frog Lanyard",
    category: "personal",
    itemType: "Keys",
    color: "Green lanyard / Brass keys",
    description: "3 keys total (dorm room, mailbox, bike U-lock) plus a mini rubber frog keychain.",
    locationKnown: false,
    location: "",
    timeframe: "Today",
    approxTime: "Morning around 10:00 AM",
    status: "missing",
    createdAt: Date.now() - 60 * 60 * 1000,
    clues: [
      {
        id: "c-2",
        text: "Someone posted on the campus discord that keys with a frog were found on the benches outside Science Hall!",
        createdAt: Date.now() - 42 * 60 * 1000,
      },
    ],
  },
  {
    id: "item-4",
    title: "Brown Leather Cardholder with Student ID",
    category: "personal",
    itemType: "Wallet/ID",
    color: "Worn tan/brown leather",
    description: "Contains student ID card ending in #4092, metro pass, and driver's license.",
    locationKnown: true,
    location: "Gym / Recreation Center Locker Room bench",
    timeframe: "Yesterday",
    approxTime: "Evening 7:00 PM workout",
    status: "found",
    createdAt: Date.now() - 26 * 60 * 60 * 1000,
    clues: [
      {
        id: "c-3",
        text: "Turned into the gym equipment rental counter!",
        createdAt: Date.now() - 24 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: "item-5",
    title: "Hydro Flask 32oz Mustard Yellow Bottle",
    category: "other",
    itemType: "Other",
    color: "Mustard Yellow",
    description: "Dented bottom corner, covered in National Park stickers.",
    locationKnown: true,
    location: "Lecture Hall B, 3rd row desk",
    timeframe: "This week",
    approxTime: "Tuesday afternoon",
    status: "missing",
    createdAt: Date.now() - 26 * 60 * 60 * 1000,
    clues: [],
  },
];

export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS));
      return SEED_ITEMS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ITEMS;
  }
}

export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
}

export function timeAgo(ts) {
  if (typeof ts !== "number") return ts || "";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

export const TIME_FILTERS = [
  { id: "all", label: "All time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
];

export function withinTimeFilter(ts, filter) {
  if (filter === "all" || typeof ts !== "number") return true;
  const now = new Date();
  const d = new Date(ts);
  if (filter === "today") return d.toDateString() === now.toDateString();
  const diffDays = (now - d) / 86400000;
  if (filter === "week") return diffDays <= 7;
  if (filter === "month") return diffDays <= 31;
  if (filter === "year") return diffDays <= 366;
  return true;
}

// Downscale an uploaded image to a small JPEG data URL so it fits in localStorage.
export function fileToResizedDataUrl(file, maxSize = 640) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
