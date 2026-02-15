// import { getRasterizedSvgCanvas } from "../../helper/assetSvgCache";

// const patternTextureCache = new Map();

// const getPatternBaseTexture = async ({ uri, tileSize, outputSize }) => {
//   const key = `${uri}_${tileSize}_${outputSize}`;
//   if (patternTextureCache.has(key)) {
//     return patternTextureCache.get(key);
//   }

//   const tex = await buildStableTiledTexture({ uri, tileSize, outputSize });
//   patternTextureCache.set(key, tex);
//   return tex;
// };

// const getPatternTileCanvas = async (uri, tileSize = 128) => {
//   const svgText = await fetch(uri).then((r) => r.text());

//   const blob = new Blob([svgText], { type: "image/svg+xml" });
//   const url = URL.createObjectURL(blob);

//   const img = await new Promise((res, rej) => {
//     const im = new Image();
//     im.onload = () => res(im);
//     im.onerror = rej;
//     im.src = url;
//   });

//   const c = document.createElement("canvas");
//   c.width = tileSize;
//   c.height = tileSize;

//   const ctx = c.getContext("2d");
//   ctx.clearRect(0, 0, tileSize, tileSize);

//   // ⚠️ SVG'yi TAM doldurma
//   ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, tileSize, tileSize);

//   URL.revokeObjectURL(url);
//   return c;
// };

// const buildRegionMaskFromUvConfig = (uvConfig, parts, size) => {
//   const region = document.createElement("canvas");
//   region.width = size;
//   region.height = size;
//   const rctx = region.getContext("2d", { alpha: true });

//   rctx.clearRect(0, 0, size, size);
//   rctx.fillStyle = "#000";
//   rctx.imageSmoothingEnabled = false;

//   for (const key of parts) {
//     const uv = uvConfig?.[key];
//     if (!uv) continue;

//     const [uvMin, uvMax] = uv;

//     const u0 = Math.min(uvMin.u, uvMax.u);
//     const u1 = Math.max(uvMin.u, uvMax.u);
//     const v0 = Math.min(uvMin.v, uvMax.v);
//     const v1 = Math.max(uvMin.v, uvMax.v);

//     // ✅ flip gerekmiyorsa bunu eski hal yaparız
//     // Şimdilik SENİN ESKİ SİSTEME BENZETMEK İÇİN flip'siz bırakalım:
//     let x = Math.floor(u0 * size);
//     let y = Math.floor(v0 * size);
//     let w = Math.ceil((u1 - u0) * size);
//     let h = Math.ceil((v1 - v0) * size);

//     // clamp
//     x = Math.max(0, Math.min(x, size));
//     y = Math.max(0, Math.min(y, size));
//     w = Math.max(0, Math.min(w, size - x));
//     h = Math.max(0, Math.min(h, size - y));

//     if (w > 0 && h > 0) rctx.fillRect(x, y, w, h);
//   }

//   return region;
// };

// export const buildTiledPatternTexture = async ({
//   uri,
//   tileSize = 128,
//   outputSize = 2048,
//   scale = 1,
//   rotation = 0,
// }) => {
//   // motif
//   const tile = await getPatternTileCanvas(uri, tileSize);

//   const canvas = document.createElement("canvas");
//   canvas.width = outputSize;
//   canvas.height = outputSize;
//   const ctx = canvas.getContext("2d", { alpha: true });

//   ctx.clearRect(0, 0, outputSize, outputSize);

//   ctx.save();
//   ctx.translate(outputSize / 2, outputSize / 2);
//   ctx.rotate(rotation);
//   ctx.scale(1 / scale, 1 / scale);
//   ctx.translate(-outputSize / 2, -outputSize / 2);

//   for (let y = 0; y < outputSize; y += tileSize) {
//     for (let x = 0; x < outputSize; x += tileSize) {
//       ctx.drawImage(tile, x, y, tileSize, tileSize);
//     }
//   }

//   ctx.restore();
//   return canvas;
// };

// export const loadSvgAsImage = async (uri) => {
//   const res = await fetch(uri);
//   if (!res.ok) throw new Error(`SVG fetch failed: ${uri}`);
//   const svgText = await res.text();

//   const blob = new Blob([svgText], { type: "image/svg+xml" });
//   const url = URL.createObjectURL(blob);

//   try {
//     const img = await new Promise((resolve, reject) => {
//       const image = new Image();
//       image.crossOrigin = "anonymous";
//       image.onload = () => resolve(image);
//       image.onerror = reject;
//       image.src = url;
//     });

//     return img;
//   } finally {
//     URL.revokeObjectURL(url);
//   }
// };

// const getPatternMotifCanvas = async (uri, tileSize = 128) => {
//   const img = await loadSvgAsImage(uri);

//   const c = document.createElement("canvas");
//   c.width = tileSize;
//   c.height = tileSize;

//   const ctx = c.getContext("2d", { alpha: true });
//   ctx.clearRect(0, 0, tileSize, tileSize);

//   // 🔥 TAM DOLDUR (boşluk yok)
//   ctx.drawImage(img, 0, 0, tileSize, tileSize);

//   return c;
// };

// const buildStableTiledTexture = async ({
//   uri,
//   tileSize = 128,
//   outputSize = 2048,
// }) => {
//   const motif = await getPatternMotifCanvas(uri, tileSize);

//   const canvas = document.createElement("canvas");
//   canvas.width = outputSize;
//   canvas.height = outputSize;
//   const ctx = canvas.getContext("2d", { alpha: true });

//   const pattern = ctx.createPattern(motif, "repeat");
//   ctx.fillStyle = pattern;
//   ctx.fillRect(0, 0, outputSize, outputSize);

//   return canvas;
// };
// const regionMaskCache = new Map();

// const getRegionMaskCached = (uvConfig, parts, size) => {
//   const key = parts.join("|") + "_" + size;
//   if (regionMaskCache.has(key)) {
//     return regionMaskCache.get(key);
//   }
//   const mask = buildRegionMaskFromUvConfig(uvConfig, parts, size);
//   regionMaskCache.set(key, mask);
//   return mask;
// };

// export const drawPattern = async (ctx, size, uvConfig, item) => {
//   const parts = Array.isArray(item.appliedPart)
//     ? item.appliedPart
//     : [item.appliedPart];

//   if (!parts.length) return;

//   const baseTexture = await getPatternBaseTexture({
//     uri: item.textureUri,
//     tileSize: 128,
//     outputSize: size * 2,
//   });

//   const mask = buildRegionMaskFromUvConfig(uvConfig, parts, size);

//   const off = document.createElement("canvas");
//   off.width = size;
//   off.height = size;
//   const octx = off.getContext("2d", { alpha: true });

//   octx.clearRect(0, 0, size, size);

//   octx.save();
//   octx.translate(size / 2, size / 2);
//   octx.rotate(item.rotation ?? 0);
//   octx.scale(item.scale ?? 1, item.scale ?? 1);
//   octx.translate(-size / 2, -size / 2);
//   octx.drawImage(baseTexture, -size / 2, -size / 2);
//   octx.restore();

//   octx.globalCompositeOperation = "destination-in";
//   octx.drawImage(mask, 0, 0);

//   ctx.save();
//   ctx.globalAlpha = item.opacity ?? 1;
//   ctx.drawImage(off, 0, 0);
//   ctx.restore();
// };

// patternRenderer.js
import * as THREE from "three";

// Cache'ler
const motifCache = new Map();
const regionMaskCache = new Map();

const uvBoxToPixels = (uvMin, uvMax, size) => {
  const xMin = Math.floor(Math.min(uvMin.u, uvMax.u) * size);
  const xMax = Math.ceil(Math.max(uvMin.u, uvMax.u) * size);
  const yMin = Math.floor(Math.min(uvMin.v, uvMax.v) * size);
  const yMax = Math.ceil(Math.max(uvMin.v, uvMax.v) * size);
  return { xMin, yMin, w: xMax - xMin, h: yMax - yMin };
};

// ======================
// 1. Küçük motif (128x128) → tekrarlanacak temel birim
// ======================
async function getMotifCanvas(uri, tileSize = 128) {
  const key = `${uri}_${tileSize}`;
  if (motifCache.has(key)) return motifCache.get(key);

  const svgText = await fetch(uri).then((r) =>
    r.ok ? r.text() : Promise.reject(r.status),
  );

  let fixedSvg = svgText;
  if (!fixedSvg.match(/width\s*=/i) || !fixedSvg.match(/height\s*=/i)) {
    fixedSvg = fixedSvg.replace(
      /<svg([^>]*)>/i,
      `<svg$1 width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid slice">`,
    );
  }

  const blob = new Blob([fixedSvg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  URL.revokeObjectURL(url);

  const canvas = new OffscreenCanvas(tileSize, tileSize);
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, tileSize, tileSize);

  motifCache.set(key, canvas);
  return canvas;
}

// ======================
// 2. Region mask (UV bölgeleri)
// ======================
function buildRegionMaskFromUvConfig(uvConfig, parts, size) {
  const key = `${parts.join("|")}_${size}`;
  if (regionMaskCache.has(key)) return regionMaskCache.get(key);

  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.fillStyle = "#000";
  ctx.imageSmoothingEnabled = false;

  for (const key of parts) {
    const uv = uvConfig?.[key];
    if (!uv) continue;
    const [min, max] = uv;
    const x = Math.floor(Math.min(min.u, max.u) * size);
    const y = Math.floor(Math.min(min.v, max.v) * size);
    const w = Math.ceil(Math.abs(max.u - min.u) * size);
    const h = Math.ceil(Math.abs(max.v - min.v) * size);
    ctx.fillRect(
      Math.max(0, x),
      Math.max(0, y),
      Math.max(1, w),
      Math.max(1, h),
    );
  }

  regionMaskCache.set(key, canvas);
  return canvas;
}

// ======================
// 3. ANA FONKSİYON – drawDesign mantığına %100 benzetildi
// ======================
export async function drawPattern(targetCtx, size, uvConfig, item) {
  const parts = Array.isArray(item.appliedPart)
    ? item.appliedPart
    : [item.appliedPart];
  if (!parts.length) return;

  const scale = Math.max(0.01, item.scale ?? 1);
  const rotationRad = ((item.rotation ?? 0) * Math.PI) / 180;

  const motif = await getMotifCanvas(item.textureUri, 128);
  const regionMask = buildRegionMaskFromUvConfig(uvConfig, parts, size);

  // Offscreen buffer (drawDesign’deki “off” canvas)
  const off = new OffscreenCanvas(size, size);
  const octx = off.getContext("2d", { alpha: true });
  octx.clearRect(0, 0, size, size);

  // ────────────────────────────────────────────────
  // 1) RENKİ BOYA (solid veya gradient)
  // ────────────────────────────────────────────────
  if (item.isGradient && item.secondColor) {
    const { xMin, yMin, w, h } = uvBoxToPixels(
      uvConfig[parts[0]][0],
      uvConfig[parts[0]][1],
      size,
    );
    const rad = item.gradientRotation;
    const cx = xMin + w / 2 + Math.cos(rad) * w * 0.5 * item.gradientOffset;
    const cy = yMin + h / 2 + Math.sin(rad) * h * 0.5 * item.gradientOffset;

    const ex = cx + Math.cos(rad) * w * item.gradientTransition;
    const ey = cy + Math.sin(rad) * h * item.gradientTransition;

    const grad = octx.createLinearGradient(cx, cy, ex, ey);
    grad.addColorStop(0, item.firstColor);
    grad.addColorStop(1, item.secondColor);

    octx.fillStyle = grad;
  } else {
    octx.fillStyle = item.firstColor || "#ffffff";
  }
  octx.fillRect(0, 0, size, size);

  // ────────────────────────────────────────────────
  // 2) TILED PATTERN’I MASK OLARAK UYGULA (merkezli + scale + rotation)
  // ────────────────────────────────────────────────
  octx.globalCompositeOperation = "destination-in";

  const patternOff = new OffscreenCanvas(size, size);
  const pctx = patternOff.getContext("2d", { alpha: true });

  pctx.save();
  pctx.translate(size / 2, size / 2);
  pctx.rotate(rotationRad);
  pctx.scale(scale, scale);

  const tile = 128;
  const pattern = pctx.createPattern(motif, "repeat");
  pctx.fillStyle = pattern;
  pctx.fillRect(-size, -size, size * 3, size * 3); // bol taşma
  pctx.restore();

  octx.drawImage(patternOff, 0, 0, size, size);

  // ────────────────────────────────────────────────
  // 3) REGION MASK (sadece seçili parçaya sınırla)
  // ────────────────────────────────────────────────
  octx.globalCompositeOperation = "destination-in";
  octx.drawImage(regionMask, 0, 0, size, size);

  // ────────────────────────────────────────────────
  // 4) Ana ctx’e bas
  // ────────────────────────────────────────────────
  targetCtx.save();
  targetCtx.globalAlpha = item.opacity ?? 1;
  targetCtx.drawImage(off, 0, 0);
  targetCtx.restore();
}

// ======================
// Final texture
// ======================
export async function createFinalPatternTexture(
  size = 1024,
  patterns = [],
  uvConfig,
) {
  const finalCanvas = new OffscreenCanvas(size, size);
  const ctx = finalCanvas.getContext("2d", { alpha: true });
  ctx.clearRect(0, 0, size, size);

  for (const item of patterns) {
    await drawPattern(ctx, size, uvConfig, item);
  }

  const texture = new THREE.CanvasTexture(finalCanvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return texture;
}

export function clearPatternCaches() {
  motifCache.clear();
  regionMaskCache.clear();
}
