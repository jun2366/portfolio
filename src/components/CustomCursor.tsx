import { useEffect, useRef, useState } from "react";

/** Only real mice on hover-capable screens, and never with reduced motion. */
const ENABLE_QUERY = "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

/** Elements that make the ring grow and fill. Project cards are covered by their stretched <button>. */
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for], [data-cursor="hover"]';

/** Text entry fields: the ring and dot hide here so typing is not distracting. */
const TEXT_FIELD =
  'textarea, select, [contenteditable=""], [contenteditable="true"], ' +
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"])' +
  ':not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"])';

const RING_EASE = 0.18; // share of the remaining distance covered per 60fps frame
const SCALE_EASE = 0.2;
const HOVER_SCALE = 1.5;
const PRESS_FACTOR = 0.85;

function useCursorEnabled() {
  const [enabled, setEnabled] = useState(() => window.matchMedia(ENABLE_QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(ENABLE_QUERY);
    const onChange = () => setEnabled(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return enabled;
}

/**
 * Decorative cursor follower: a teal dot that tracks the pointer exactly and a thin ring that eases
 * after it. The system cursor stays visible; this never receives pointer events or focus.
 * Moves with transform only, and runs requestAnimationFrame only until the ring settles.
 */
const CustomCursor = () => {
  const enabled = useCursorEnabled();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const fill = fillRef.current;
    if (!enabled || !dot || !ring || !fill) return;

    let frame = 0;
    let last = 0;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let scale = 1;
    let hovering = false;
    let pressed = false;
    let hasPosition = false;

    const setVisible = (visible: boolean) => {
      const value = visible ? "1" : "0";
      dot.style.opacity = value;
      ring.style.opacity = value;
    };

    const write = () => {
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const tick = (now: number) => {
      // Frame-rate independent easing, so 120Hz screens do not make the ring snappier.
      const dt = last ? Math.min(now - last, 64) : 16.67;
      last = now;
      const k = 1 - Math.pow(1 - RING_EASE, dt / 16.67);
      const ks = 1 - Math.pow(1 - SCALE_EASE, dt / 16.67);
      const targetScale = (hovering ? HOVER_SCALE : 1) * (pressed ? PRESS_FACTOR : 1);

      ringX += (targetX - ringX) * k;
      ringY += (targetY - ringY) * k;
      scale += (targetScale - scale) * ks;

      const settled =
        Math.abs(targetX - ringX) < 0.1 && Math.abs(targetY - ringY) < 0.1 && Math.abs(targetScale - scale) < 0.002;

      if (settled) {
        ringX = targetX;
        ringY = targetY;
        scale = targetScale;
        write();
        frame = 0;
        last = 0;
        return;
      }

      write();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const updateTarget = (el: Element | null) => {
      if (el?.closest(TEXT_FIELD)) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const nextHover = Boolean(el?.closest(INTERACTIVE));
      if (nextHover !== hovering) {
        hovering = nextHover;
        fill.style.opacity = hovering ? "1" : "0";
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasPosition) {
        // First move: start the ring on the pointer instead of flying in from the corner.
        ringX = targetX;
        ringY = targetY;
        hasPosition = true;
      }
      updateTarget(e.target instanceof Element ? e.target : null);
      start();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pressed = true;
      start();
    };

    const onPointerUp = () => {
      pressed = false;
      start();
    };

    // Leaving the window (or entering an iframe such as the Calendly popup) gives a null relatedTarget.
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        setVisible(false);
        pressed = false;
      }
    };

    const onBlur = () => setVisible(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", onBlur);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled]);

  if (!enabled) return null;

  // z-[55]: above the navbar (z-50) so the ring stays visible over nav links,
  // below the case-study dialog and its overlay (z-[60]) and toasts (z-[100]).
  // A thin background-colored halo keeps the teal visible on teal buttons too.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border-[1.5px] border-primary opacity-0 shadow-[0_0_0_1px_hsl(var(--background)/0.55)] transition-opacity duration-200 will-change-transform"
      >
        <div ref={fillRef} className="absolute inset-0 rounded-full bg-primary/15 opacity-0 transition-opacity duration-200" />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary opacity-0 shadow-[0_0_0_1px_hsl(var(--background)/0.55)] transition-opacity duration-200 will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
