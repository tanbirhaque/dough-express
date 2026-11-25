const ITEMS = [
  "FRESHLY GLAZED DAILY",
  "60-MIN EXPRESS DELIVERY",
  "REAL BELGIAN CHOCOLATE",
  "SMALL-BATCH CRAFT",
  "DHAKA EXPRESS ZONES",
  "BUTTER · SUGAR · FLOUR · LOVE",
];

function DonutGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-coral shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Marquee() {
  return (
    <div
      className="bg-vanilla border-b border-cocoa/10 py-6 overflow-hidden"
      data-testid="marquee"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((track) => (
          <div
            key={track}
            aria-hidden={track === 1}
            className="flex items-center shrink-0"
          >
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-8 font-display font-semibold text-2xl md:text-[2rem] tracking-[0.08em] text-cocoa whitespace-nowrap">
                  {item}
                </span>
                <DonutGlyph />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
