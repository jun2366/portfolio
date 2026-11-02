import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buildCutout, buildFaceMask, sampleCells, type FaceCells, type FaceCrop, type FaceMask } from "@/lib/face-pixels";

interface FacePixelsProps {
  src: string;
  alt: string;
  /** Crop as fractions of the source image. Defaults to the whole image. Pass a stable (module-level) object. */
  crop?: FaceCrop;
  columns?: number;
  mobileColumns?: number;
  className?: string;
}

const FULL_IMAGE: FaceCrop = { x: 0, y: 0, w: 1, h: 1 };
const CELL_DURATION = 750;
const MAX_DELAY = 1650;
/** Peak height of each cell's hop, as a fraction of the canvas height. */
const HOP = 0.08;
/** Share of cells that fly in from beyond the canvas edges. */
const OUTSIDE_SHARE = 0.3;
/** Crossfade from the pixel face to the real photo once every cell has landed. */
const PHOTO_FADE_MS = 600;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeOutBack = (t: number) => {
  const c = 1.4;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};

/**
 * Per-cell motion plus playback state. Landed cells are painted once onto `layer`
 * so each frame only redraws the cells still in flight.
 */
interface Scene {
  cells: FaceCells;
  startX: Float32Array;
  startY: Float32Array;
  delay: Float32Array;
  /** Cell indices sorted by delay; `next` points at the first one not yet started. */
  order: Uint32Array;
  next: number;
  /** Started cells that have not landed yet. */
  active: number[];
  landed: Uint8Array;
  layer: HTMLCanvasElement;
  layerCtx: CanvasRenderingContext2D;
}

/** Random start points in canvas fractions (some beyond the edges), staggered from the center outward. */
function createScene(cells: FaceCells, layer: HTMLCanvasElement, layerCtx: CanvasRenderingContext2D): Scene {
  const n = cells.fill.length;
  const startX = new Float32Array(n);
  const startY = new Float32Array(n);
  const delay = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    if (Math.random() < OUTSIDE_SHARE) {
      const along = Math.random() * 1.4 - 0.2;
      const beyond = 0.05 + Math.random() * 0.2;
      const edge = Math.floor(Math.random() * 4);
      startX[i] = edge === 0 ? -beyond : edge === 1 ? 1 + beyond : along;
      startY[i] = edge === 2 ? -beyond : edge === 3 ? 1 + beyond : along;
    } else {
      startX[i] = Math.random();
      startY[i] = Math.random();
    }
    const dx = (cells.col[i] + 0.5) / cells.cols - 0.5;
    const dy = (cells.row[i] + 0.5) / cells.rows - 0.5;
    const fromCenter = Math.min(1, Math.hypot(dx, dy) / 0.7);
    delay[i] = (0.55 * Math.random() + 0.45 * fromCenter) * MAX_DELAY;
  }
  const order = Uint32Array.from({ length: n }, (_, i) => i).sort((a, b) => delay[a] - delay[b]);
  return { cells, startX, startY, delay, order, next: 0, active: [], landed: new Uint8Array(n), layer, layerCtx };
}

const cellGap = (cellW: number) => (cellW > 4 ? cellW * 0.08 : 0);

/** Paints one cell in its final slot. */
function paintLanded(ctx: CanvasRenderingContext2D, cells: FaceCells, i: number, width: number, height: number) {
  const cellW = width / cells.cols;
  const cellH = height / cells.rows;
  const gap = cellGap(cellW);
  ctx.fillStyle = cells.fill[i];
  ctx.fillRect((cells.col[i] / cells.cols) * width + gap / 2, (cells.row[i] / cells.rows) * height + gap / 2, cellW - gap, cellH - gap);
}

/** Repaints every landed cell onto the layer, e.g. after a resize. */
function repaintLayer(scene: Scene, width: number, height: number) {
  scene.layerCtx.clearRect(0, 0, width, height);
  for (let i = 0; i < scene.landed.length; i++) {
    if (scene.landed[i]) paintLanded(scene.layerCtx, scene.cells, i, width, height);
  }
}

/** Draws one frame. Returns true once every cell has landed. */
function drawFrame(ctx: CanvasRenderingContext2D, scene: Scene, elapsed: number, width: number, height: number): boolean {
  const { cells, active, delay, order } = scene;
  while (scene.next < order.length && delay[order[scene.next]] < elapsed) active.push(order[scene.next++]);

  // Move cells that have landed onto the layer; swap-remove keeps this O(active).
  for (let k = active.length - 1; k >= 0; k--) {
    const i = active[k];
    if (elapsed - delay[i] < CELL_DURATION) continue;
    scene.landed[i] = 1;
    paintLanded(scene.layerCtx, cells, i, width, height);
    active[k] = active[active.length - 1];
    active.pop();
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(scene.layer, 0, 0, width, height);

  const cellW = width / cells.cols;
  const cellH = height / cells.rows;
  const gap = cellGap(cellW);
  for (const i of active) {
    const p = (elapsed - delay[i]) / CELL_DURATION;
    const move = easeOutCubic(p);
    const scale = easeOutBack(p);
    const targetX = cells.col[i] / cells.cols;
    const targetY = cells.row[i] / cells.rows;
    const x = (scene.startX[i] + (targetX - scene.startX[i]) * move) * width;
    const y = (scene.startY[i] + (targetY - scene.startY[i]) * move - HOP * Math.sin(Math.PI * p)) * height;
    const w = (cellW - gap) * scale;
    const h = (cellH - gap) * scale;

    ctx.globalAlpha = Math.min(1, p * 4);
    ctx.fillStyle = cells.fill[i];
    ctx.fillRect(x + (cellW - w) / 2, y + (cellH - h) / 2, w, h);
  }

  ctx.globalAlpha = 1;
  return scene.next === order.length && active.length === 0;
}

const FacePixels = ({ src, alt, crop = FULL_IMAGE, columns = 60, mobileColumns = 36, className }: FacePixelsProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const photo = photoRef.current;
    const photoCtx = photo?.getContext("2d");
    const layer = document.createElement("canvas");
    const layerCtx = layer.getContext("2d");
    if (!wrap || !canvas || !ctx || !photo || !photoCtx || !layerCtx) {
      setStatus("failed");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    let cancelled = false;
    let mask: FaceMask | null = null;
    let cutout: HTMLCanvasElement | null = null;
    let scene: Scene | null = null;
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastTime = 0;
    let elapsed = 0;
    let finished = false;
    let photoShown = false;
    let inView = false;

    // Drawn at the full device pixel ratio (not the capped one used for the animation) so the photo stays sharp.
    const drawPhoto = () => {
      if (!cutout || width === 0) return;
      const dpr = window.devicePixelRatio || 1;
      photo.width = Math.round(width * dpr);
      photo.height = Math.round(height * dpr);
      photoCtx.imageSmoothingEnabled = true;
      photoCtx.imageSmoothingQuality = "high";
      photoCtx.drawImage(cutout, 0, 0, photo.width, photo.height);
    };

    /** Swaps the pixel face for the real photo; `immediate` skips the crossfade. */
    const showPhoto = (immediate: boolean) => {
      if (photoShown || !cutout) return;
      photoShown = true;
      pause();
      drawPhoto();
      const transition = immediate ? "none" : `opacity ${PHOTO_FADE_MS}ms ease`;
      canvas.style.transition = photo.style.transition = transition;
      photo.style.opacity = "1";
      canvas.style.opacity = "0";
    };

    const render = () => {
      if (!scene || width === 0 || photoShown) return;
      if (reducedMotion.matches) {
        showPhoto(true);
        if (photoShown) return;
        elapsed = Infinity;
      }
      finished = drawFrame(ctx, scene, elapsed, width, height);
    };

    const tick = (now: number) => {
      raf = 0;
      // Cap the step so a dropped or throttled frame doesn't skip the animation ahead.
      if (lastTime) elapsed += Math.min(now - lastTime, 50);
      lastTime = now;
      render();
      if (finished) showPhoto(false);
      else raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const play = () => {
      if (raf || finished || photoShown || !scene || !inView || document.hidden) return;
      if (reducedMotion.matches) {
        render();
        return;
      }
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      if (!mask) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = (width * mask.height) / mask.width;
      canvas.style.height = `${height}px`;
      canvas.width = layer.width = Math.round(width * dpr);
      canvas.height = layer.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (photoShown) {
        drawPhoto();
        return;
      }
      if (scene) repaintLayer(scene, width, height);
      render();
    };

    const rebuild = () => {
      // Once the photo is showing, a breakpoint change keeps it instead of replaying the pixels.
      if (!mask || photoShown) return;
      const wasFinished = finished;
      pause();
      scene = createScene(sampleCells(mask, small.matches ? mobileColumns : columns), layer, layerCtx);
      layerCtx.clearRect(0, 0, width, height);
      // A breakpoint change after the face has formed keeps it formed instead of replaying.
      elapsed = wasFinished ? Infinity : 0;
      finished = false;
      render();
      play();
    };

    const onVisibility = () => (document.hidden ? pause() : play());
    const onMotionPref = () => {
      render();
      play();
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else pause();
      },
      { threshold: 0.2 },
    );
    const resizeObserver = new ResizeObserver(resize);

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img
      .decode()
      .then(() => {
        if (cancelled) return;
        mask = buildFaceMask(img, crop);
        if (!mask) throw new Error("FacePixels: could not sample image");
        // Without a cutout the finished pixel face simply stays.
        cutout = buildCutout(mask);
        resize();
        rebuild();
        setStatus("ready");
        intersection.observe(wrap);
        resizeObserver.observe(wrap);
        small.addEventListener("change", rebuild);
        reducedMotion.addEventListener("change", onMotionPref);
        document.addEventListener("visibilitychange", onVisibility);
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      pause();
      layer.width = layer.height = 0;
      if (cutout) cutout.width = cutout.height = 0;
      intersection.disconnect();
      resizeObserver.disconnect();
      small.removeEventListener("change", rebuild);
      reducedMotion.removeEventListener("change", onMotionPref);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src, crop, columns, mobileColumns]);

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn("block w-full", status === "failed" && "hidden")}
      />
      <canvas
        ref={photoRef}
        aria-hidden="true"
        className={cn("absolute inset-0 w-full h-full opacity-0", status === "failed" && "hidden")}
      />
      <img
        src={src}
        alt={alt}
        className={cn(status === "failed" ? "block w-full h-auto rounded-2xl" : "sr-only")}
      />
    </div>
  );
};

export default FacePixels;
