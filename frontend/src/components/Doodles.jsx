// Reusable hand-drawn SVG doodle accents for the sketchy notebook vibe.

export const WavyUnderline = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 120 12"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M1 8 Q 15 1, 30 7 T 60 7 T 90 7 T 119 6"
      stroke="#E05A36"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const ScribbleCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 90" fill="none" aria-hidden="true">
    <path
      d="M60 8 C 20 6, 8 30, 12 48 C 16 74, 60 84, 88 78 C 112 72, 118 40, 104 24 C 92 10, 70 8, 40 14"
      stroke="#E05A36"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const DrawnArrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 34" fill="none" aria-hidden="true">
    <path
      d="M4 26 Q 30 4, 54 20"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M54 20 L 45 13 M 54 20 L 44 25" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Paperclip = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#E05A36"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 4v9a5 5 0 0 0 10 0V5a3 3 0 0 0-6 0v8a1 1 0 0 0 2 0V6" />
  </svg>
);

export const Squiggle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 20" fill="none" aria-hidden="true">
    <path
      d="M2 10 Q 10 2, 18 10 T 34 10 T 50 10 T 66 10 T 78 10"
      stroke="#524F4A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
