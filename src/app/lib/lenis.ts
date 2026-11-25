import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId: number | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(id: string, offset = -76): void {
  if (lenis) {
    lenis.scrollTo(id, { offset, duration: 1.4 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function stopLenis(): void {
  lenis?.stop();
}

export function startLenis(): void {
  lenis?.start();
}

export function destroyLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenis?.destroy();
  lenis = null;
}
