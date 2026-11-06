import { useEffect, useRef, useState, type RefObject } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const TOUCH_ONLY = "(hover: none) and (pointer: coarse)";

/** Transition used while following the pointer: short, so per-frame writes feel smooth. */
const FOLLOW = "transform 160ms ease-out, opacity 300ms ease-out";
/** Transition used when easing back to center. */
const RETURN = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out";
/** Degrees of phone rotation that map to a full tilt. */
const ORIENTATION_RANGE = 25;
/** Ignore orientation changes smaller than this (normalized), so a resting phone stops scheduling frames. */
const ORIENTATION_EPSILON = 0.02;

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION).matches);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

interface TiltOptions {
  /** Maximum rotation in degrees. */
  maxTilt?: number;
  /** How far (px) the card itself shifts toward the pointer. Layers set their own via data-tilt-depth. */
  cardShift?: number;
}

/**
 * Pointer-driven 3D tilt that only writes `transform` and `opacity`.
 *
 * - `areaRef` is the element that listens for the pointer (can be larger than the card).
 * - `stageRef` is the untransformed box the tilt is measured from; its descendants with
 *   `data-tilt-depth="<px>"` get a parallax shift of up to that many pixels.
 * - `cardRef` is rotated; `glareRef` (optional) is a reflection layer translated with the pointer.
 *
 * A frame is requested only when an input event arrives, so nothing runs while the pointer is still.
 * Disabled entirely when the user prefers reduced motion.
 */
export function useTilt(areaRef: RefObject<HTMLElement>, { maxTilt = 8, cardShift = 6 }: TiltOptions = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const area = areaRef.current;
    const stage = stageRef.current;
    const card = cardRef.current;
    if (reduced || !area || !stage || !card) return;

    const glare = glareRef.current;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-tilt-depth]"));
    const targets: HTMLElement[] = [card, ...layers, ...(glare ? [glare] : [])];

    let frame = 0;
    let x = 0;
    let y = 0;
    let showGlare = false;
    let pointerX = 0;
    let pointerY = 0;
    let fromPointer = false;

    const setTransition = (value: string) => {
      for (const el of targets) el.style.transition = value;
    };

    const write = () => {
      card.style.transform =
        `perspective(900px) translate3d(${x * cardShift}px, ${y * cardShift}px, 0) ` +
        `rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;
      for (const el of layers) {
        const depth = Number(el.dataset.tiltDepth) || 0;
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      }
      if (glare) {
        glare.style.transform = `translate3d(${x * 30}%, ${y * 30}%, 0)`;
        glare.style.opacity = showGlare ? "1" : "0";
      }
    };

    const flush = () => {
      frame = 0;
      if (fromPointer) {
        const rect = stage.getBoundingClientRect();
        const areaRect = area.getBoundingClientRect();
        x = clamp((pointerX - (rect.left + rect.width / 2)) / (areaRect.width / 2));
        y = clamp((pointerY - (rect.top + rect.height / 2)) / (areaRect.height / 2));
      }
      write();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setTransition(FOLLOW);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      fromPointer = true;
      showGlare = true;
      schedule();
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      fromPointer = false;
      x = 0;
      y = 0;
      showGlare = false;
      setTransition(RETURN);
      write();
    };

    area.addEventListener("pointerenter", onPointerEnter);
    area.addEventListener("pointermove", onPointerMove, { passive: true });
    area.addEventListener("pointerleave", onPointerLeave);

    // Phones: follow device orientation only where it needs no permission prompt.
    // iOS exposes DeviceOrientationEvent.requestPermission and would prompt, so it is skipped there.
    let onOrientation: ((e: DeviceOrientationEvent) => void) | null = null;
    const needsPermission =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";

    if (window.matchMedia(TOUCH_ONLY).matches && typeof DeviceOrientationEvent !== "undefined" && !needsPermission) {
      let baseBeta: number | null = null;
      let baseGamma: number | null = null;
      onOrientation = (e) => {
        if (e.beta == null || e.gamma == null) return;
        if (baseBeta == null || baseGamma == null) {
          baseBeta = e.beta;
          baseGamma = e.gamma;
          setTransition(RETURN);
          return;
        }
        const nx = clamp((e.gamma - baseGamma) / ORIENTATION_RANGE);
        const ny = clamp((e.beta - baseBeta) / ORIENTATION_RANGE);
        if (Math.abs(nx - x) < ORIENTATION_EPSILON && Math.abs(ny - y) < ORIENTATION_EPSILON) return;
        x = nx;
        y = ny;
        fromPointer = false;
        showGlare = false;
        schedule();
      };
      window.addEventListener("deviceorientation", onOrientation);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      area.removeEventListener("pointerenter", onPointerEnter);
      area.removeEventListener("pointermove", onPointerMove);
      area.removeEventListener("pointerleave", onPointerLeave);
      if (onOrientation) window.removeEventListener("deviceorientation", onOrientation);
      for (const el of targets) {
        el.style.transition = "";
        el.style.transform = "";
        el.style.opacity = "";
      }
    };
  }, [areaRef, reduced, maxTilt, cardShift]);

  return { stageRef, cardRef, glareRef };
}
