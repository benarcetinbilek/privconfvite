import * as THREE from "three";

const DEFAULT_NORMAL_MAP_URI = "/normalMap.png";

const uvBoxToPixels = (uvMin, uvMax, size) => {
  const xMin = Math.floor(Math.min(uvMin.u, uvMax.u) * size);
  const xMax = Math.ceil(Math.max(uvMin.u, uvMax.u) * size);
  const yMin = Math.floor(Math.min(uvMin.v, uvMax.v) * size);
  const yMax = Math.ceil(Math.max(uvMin.v, uvMax.v) * size);
  return { xMin, yMin, w: xMax - xMin, h: yMax - yMin };
};

function buildPartMask(uvConfig, partName, size) {
  const uv = uvConfig?.[partName];
  if (!uv) return null;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.fillStyle = "#fff";
  ctx.imageSmoothingEnabled = false;
  const [min, max] = uv;
  const x = Math.max(0, Math.floor(Math.min(min.u, max.u) * size));
  const y = Math.max(0, Math.floor(Math.min(min.v, max.v) * size));
  const w = Math.max(1, Math.ceil(Math.abs(max.u - min.u) * size));
  const h = Math.max(1, Math.ceil(Math.abs(max.v - min.v) * size));
  ctx.fillRect(x, y, Math.min(w, size - x), Math.min(h, size - y));
  return canvas;
}

const imageCache = new Map();

function loadNormalMapImage(uri) {
  const key = uri ?? DEFAULT_NORMAL_MAP_URI;
  const cached = imageCache.get(key);
  if (cached !== undefined) return Promise.resolve(cached);
  const normalizedUri =
    uri && String(uri).startsWith("/https") ? String(uri).slice(1) : uri || DEFAULT_NORMAL_MAP_URI;
  const promise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(key, img);
      resolve(img);
    };
    img.onerror = () => {
      const fallback = new Image();
      fallback.crossOrigin = "anonymous";
      fallback.onload = () => {
        imageCache.set(key, fallback);
        resolve(fallback);
      };
      fallback.onerror = () => {
        imageCache.set(key, null);
        resolve(null);
      };
      fallback.src = DEFAULT_NORMAL_MAP_URI;
    };
    img.src = normalizedUri;
  });
  return promise;
}

export const createNormalMapCanvasTexture = (size = 1024) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: false });
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return { canvas, ctx, texture, size };
};

export const createNonConfigurableColorCanvasTexture = (size = 1024) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: true });
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return { canvas, ctx, texture, size };
};

/**
 * Draw per-part normal map and non-configurable color.
 * - Configurable parts: only tiled normal map in part's UV region.
 * - Non-configurable parts: tiled normal map + solid color in part's UV region.
 * @param {{ normalPack: { ctx, size }, colorPack: { ctx, size } }} packs
 * @param {Record<string, [{u,v},{u,v}]>} uvConfig
 * @param {Record<string, { configurable: boolean, normalMapUri?: string, scale?: number, rotation?: number, color?: string }>} partsConfig
 * @param {HTMLImageElement} defaultNormalImage - preloaded fallback normal map
 */
export async function drawNormalMapAndNonConfigurableColor(
  { normalPack, colorPack },
  uvConfig,
  partsConfig,
  defaultNormalImage = null,
) {
  const { ctx: normalCtx, size } = normalPack;
  const { ctx: colorCtx } = colorPack;
  normalCtx.clearRect(0, 0, size, size);
  colorCtx.clearRect(0, 0, size, size);

  if (!uvConfig || !partsConfig || typeof partsConfig !== "object") return;

  const partNames = Object.keys(partsConfig).filter((p) => uvConfig[p]);
  for (const partName of partNames) {
    const part = partsConfig[partName];
    const uv = uvConfig[partName];
    if (!uv || !part) continue;

    const [uvMin, uvMax] = uv;
    const scale = Math.max(0.01, part.scale ?? 1);
    const rotationRad = ((part.rotation ?? 0) * Math.PI) / 180;

    const regionMask = buildPartMask(uvConfig, partName, size);
    if (!regionMask) continue;

    let img = await loadNormalMapImage(part.normalMapUri);
    if (!img) img = defaultNormalImage;

    if (img) {
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d", { alpha: true });
      octx.clearRect(0, 0, size, size);

      const pattern = octx.createPattern(img, "repeat");
      if (pattern) {
        octx.save();
        octx.translate(size / 2, size / 2);
        octx.rotate(rotationRad);
        octx.scale(scale, scale);
        octx.translate(-size / 2, -size / 2);
        octx.fillStyle = pattern;
        octx.fillRect(-size, -size, size * 3, size * 3);
        octx.restore();
      }

      octx.globalCompositeOperation = "destination-in";
      octx.drawImage(regionMask, 0, 0, size, size);

      normalCtx.drawImage(off, 0, 0);
    }

    if (part.configurable === false && part.color) {
      const mask = buildPartMask(uvConfig, partName, size);
      if (mask) {
        colorCtx.save();
        colorCtx.fillStyle = part.color;
        colorCtx.fillRect(0, 0, size, size);
        colorCtx.globalCompositeOperation = "destination-in";
        colorCtx.drawImage(mask, 0, 0, size, size);
        colorCtx.restore();
      }
    }
  }
}
