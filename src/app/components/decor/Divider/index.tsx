/*
 * Shaped section dividers: smooth organic waves + subtle scalloped edges.
 */

export function WaveDivider({
  fill,
  bg,
  flip = false,
  className,
}: {
  fill: string;
  bg: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full leading-[0] ${className}`}
      style={{
        backgroundColor: bg,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        className="block w-full h-[64px] md:h-[96px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,58 C240,98 480,8 720,38 C960,68 1200,18 1440,52 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

const SCALLOP_PATH = (() => {
  let d = "M0 62";
  for (let x = 0; x < 1440; x += 80) d += ` Q ${x + 40} 0 ${x + 80} 62`;
  d += " L1440 124 L0 124 Z";
  return d;
})();

export function ScallopDivider({
  fill,
  bg,
  flip = false,
  className,
}: {
  fill: string;
  bg: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full leading-[0] ${className}`}
      style={{
        backgroundColor: bg,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        className="block w-full h-[52px] md:h-[72px]"
        viewBox="0 0 1440 124"
        preserveAspectRatio="none"
      >
        <path d={SCALLOP_PATH} fill={fill} />
      </svg>
    </div>
  );
}
