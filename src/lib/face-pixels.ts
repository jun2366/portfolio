/** Crop rectangle as fractions of the source image. Values outside 0..1 add transparent padding. */
export interface FaceCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Full-resolution foreground mask of the cropped photo (1 = keep, 0 = background). */
export interface FaceMask {
  width: number;
  height: number;
  rgba: Uint8ClampedArray;
  keep: Uint8Array;
}

export interface FaceCells {
  cols: number;
  rows: number;
  /** Grid position of each kept cell. */
  col: Uint16Array;
  row: Uint16Array;
  fill: string[];
}

/** A pixel counts as background white only if every channel is at least this bright. */
export const WHITE_MIN = 235;
/** A cell is drawn when at least this share of its pixels belongs to the person. */
export const COVERAGE_MIN = 0.5;
/** The mask is computed at no more than this many pixels wide. */
const MASK_MAX_WIDTH = 720;

/**
 * Draws the cropped photo to an offscreen canvas and flood-fills near-white pixels
 * starting from the top, left and right edges. White enclosed by the person
 * (collar, skin highlights) is never reached, so it stays.
 * The bottom edge is not used as a seed because the shirt runs off it.
 */
export function buildFaceMask(img: HTMLImageElement, crop: FaceCrop): FaceMask | null {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cropW = crop.w * iw;
  const cropH = crop.h * ih;
  const scale = Math.min(1, MASK_MAX_WIDTH / cropW);
  const width = Math.round(cropW * scale);
  const height = Math.round(cropH * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  // Clip the source rect to the image ourselves; out-of-bounds source rects behave differently across browsers.
  const sx0 = Math.max(0, crop.x * iw);
  const sy0 = Math.max(0, crop.y * ih);
  const sx1 = Math.min(iw, (crop.x + crop.w) * iw);
  const sy1 = Math.min(ih, (crop.y + crop.h) * ih);
  if (sx1 <= sx0 || sy1 <= sy0) return null;
  ctx.drawImage(
    img,
    sx0, sy0, sx1 - sx0, sy1 - sy0,
    (sx0 - crop.x * iw) * scale, (sy0 - crop.y * ih) * scale, (sx1 - sx0) * scale, (sy1 - sy0) * scale,
  );

  const rgba = ctx.getImageData(0, 0, width, height).data;
  const total = width * height;
  const keep = new Uint8Array(total).fill(1);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const isBackground = (i: number) => {
    const o = i * 4;
    if (rgba[o + 3] < 16) return true;
    return rgba[o] >= WHITE_MIN && rgba[o + 1] >= WHITE_MIN && rgba[o + 2] >= WHITE_MIN;
  };
  const visit = (i: number) => {
    if (keep[i] && isBackground(i)) {
      keep[i] = 0;
      queue[tail++] = i;
    }
  };

  for (let x = 0; x < width; x++) visit(x);
  for (let y = 0; y < height; y++) {
    visit(y * width);
    visit(y * width + width - 1);
  }

  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    if (x > 0) visit(i - 1);
    if (x < width - 1) visit(i + 1);
    if (i >= width) visit(i - width);
    if (i < total - width) visit(i + width);
  }

  return { width, height, rgba, keep };
}

/** Pixels shaved off the cutout edge, removing the light fringe where hair blends into the white backdrop. */
export const CUTOUT_ERODE = 1;
/** Box-blur passes (radius 1 each) applied to the cutout alpha to soften the stair-stepped edge. */
export const CUTOUT_FEATHER_PASSES = 2;

/**
 * The cropped photo at mask resolution with the background made transparent.
 * The edge is eroded slightly and then feathered; the image edges count as foreground
 * so the shoulders cut off by the crop stay solid.
 */
export function buildCutout(mask: FaceMask): HTMLCanvasElement | null {
  const { width, height, rgba, keep } = mask;
  const total = width * height;
  let alpha = new Float32Array(total);
  for (let i = 0; i < total; i++) alpha[i] = keep[i];

  for (let pass = 0; pass < CUTOUT_ERODE; pass++) {
    const eroded = alpha.slice();
    for (let i = 0; i < total; i++) {
      if (!alpha[i]) continue;
      const x = i % width;
      if ((x > 0 && !alpha[i - 1]) || (x < width - 1 && !alpha[i + 1]) || (i >= width && !alpha[i - width]) || (i < total - width && !alpha[i + width])) {
        eroded[i] = 0;
      }
    }
    alpha = eroded;
  }

  const tmp = new Float32Array(total);
  for (let pass = 0; pass < CUTOUT_FEATHER_PASSES; pass++) {
    // Separable 3-tap box blur, clamping at the image edges.
    for (let y = 0; y < height; y++) {
      const row = y * width;
      for (let x = 0; x < width; x++) {
        tmp[row + x] = (alpha[row + Math.max(0, x - 1)] + alpha[row + x] + alpha[row + Math.min(width - 1, x + 1)]) / 3;
      }
    }
    for (let y = 0; y < height; y++) {
      const up = Math.max(0, y - 1) * width;
      const down = Math.min(height - 1, y + 1) * width;
      const row = y * width;
      for (let x = 0; x < width; x++) alpha[row + x] = (tmp[up + x] + tmp[row + x] + tmp[down + x]) / 3;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const out = ctx.createImageData(width, height);
  for (let i = 0; i < total; i++) {
    const o = i * 4;
    out.data[o] = rgba[o];
    out.data[o + 1] = rgba[o + 1];
    out.data[o + 2] = rgba[o + 2];
    out.data[o + 3] = Math.round(alpha[i] * 255);
  }
  ctx.putImageData(out, 0, 0);
  return canvas;
}

/** Averages the mask into a cols × rows grid, keeping cells that are mostly person. */
export function sampleCells(mask: FaceMask, cols: number): FaceCells {
  const { width, height, rgba, keep } = mask;
  const rows = Math.max(1, Math.round((cols * height) / width));
  const col: number[] = [];
  const row: number[] = [];
  const fill: string[] = [];

  for (let r = 0; r < rows; r++) {
    const y0 = Math.floor((r * height) / rows);
    const y1 = Math.floor(((r + 1) * height) / rows);
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor((c * width) / cols);
      const x1 = Math.floor(((c + 1) * width) / cols);
      let red = 0;
      let green = 0;
      let blue = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = y * width + x;
          if (!keep[i]) continue;
          const o = i * 4;
          red += rgba[o];
          green += rgba[o + 1];
          blue += rgba[o + 2];
          count++;
        }
      }
      const area = (x1 - x0) * (y1 - y0);
      if (area === 0 || count / area < COVERAGE_MIN) continue;
      col.push(c);
      row.push(r);
      fill.push(`rgb(${Math.round(red / count)},${Math.round(green / count)},${Math.round(blue / count)})`);
    }
  }

  return { cols, rows, col: Uint16Array.from(col), row: Uint16Array.from(row), fill };
}
