/*
 * Delicate 1.5px line-art SVG illustrations that frame the page margins.
 * stroke = #5C2E14, opacity 0.12 — purely decorative, never overlapping content.
 */

const artProps = {
  fill: "none",
  stroke: "#5C2E14",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function DonutArt({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      opacity="0.12"
    >
      <g {...artProps}>
        <circle cx="60" cy="62" r="34" />
        <circle cx="60" cy="62" r="10" />
        <path d="M30 52c5-6 11 4 17-2s12 3 18-1 10 4 15 1" />
        <path d="M44 84c4-5 9 2 14-2" />
        <path d="M36 30l3-5M60 22v-6M84 30l-3-5" />
      </g>
    </svg>
  );
}

export function WhiskArt({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden="true"
      opacity="0.12"
    >
      <g {...artProps}>
        <path d="M60 12v30" />
        <path d="M60 42c-18 16-24 44-8 62 4 5 12 5 16 0 16-18 10-46-8-62Z" />
        <path d="M60 42c-10 18-12 44 0 62M60 42c10 18 12 44 0 62" />
        <circle cx="60" cy="112" r="2.5" />
      </g>
    </svg>
  );
}

export function WheatArt({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden="true"
      opacity="0.12"
    >
      <g {...artProps}>
        <path d="M60 150V40" />
        <path d="M60 40C60 24 48 16 40 14c-2 12 6 22 20 26ZM60 40c0-16 12-24 20-26 2 12-6 22-20 26Z" />
        <path d="M60 66C60 52 50 44 42 42c-2 12 6 20 18 24ZM60 66c0-14 10-22 18-24 2 12-6 20-18 24Z" />
        <path d="M60 92c0-12-8-20-16-22-2 10 6 18 16 22ZM60 92c0-12 8-20 16-22 2 10-6 18-16 22Z" />
        <path d="M60 118c0-10-6-16-12-18-2 8 4 15 12 18ZM60 118c0-10 6-16 12-18 2 8-4 15-12 18Z" />
      </g>
    </svg>
  );
}

export function CupArt({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      aria-hidden="true"
      opacity="0.12"
    >
      <g {...artProps}>
        <path d="M30 56h48v34c0 14-10 24-24 24s-24-10-24-24V56Z" />
        <path d="M78 62h8c8 0 12 6 12 12s-4 12-12 12h-8" />
        <path d="M26 52h56" />
        <path d="M48 40c-4-6 4-10 0-16M60 40c-4-6 4-10 0-16M72 40c-4-6 4-10 0-16" />
      </g>
    </svg>
  );
}

/* Absolute-positioned margin placements (xl and up only) */
export function MarginArtLeft() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 hidden xl:block w-40">
      <DonutArt className="absolute left-6 top-24 w-24 h-24" />
      <WheatArt className="absolute left-10 bottom-24 w-20 h-28" />
    </div>
  );
}

export function MarginArtRight() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden xl:block w-40">
      <WhiskArt className="absolute right-8 top-24 w-20 h-28" />
      <CupArt className="absolute right-8 bottom-24 w-24 h-24" />
    </div>
  );
}
