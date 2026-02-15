import * as THREE from "three";
import { getRasterizedSvgCanvas } from "../../helper/assetSvgCache";

export const uvBoxToPixels = (uvMin, uvMax, size) => {
  const u0 = Math.min(uvMin.u, uvMax.u);
  const u1 = Math.max(uvMin.u, uvMax.u);

  const v0 = Math.min(uvMin.v, uvMax.v);
  const v1 = Math.max(uvMin.v, uvMax.v);

  const xMin = Math.floor(u0 * size);
  const xMax = Math.ceil(u1 * size);

  // ✅ V FLIP
  const yMin = Math.floor((1 - v1) * size);
  const yMax = Math.ceil((1 - v0) * size);

  return { x: xMin, y: yMin, w: xMax - xMin, h: yMax - yMin };
};

const buildRegionMaskFromUvConfig = (uvConfig, parts, size) => {
  const region = document.createElement("canvas");
  region.width = size;
  region.height = size;
  const rctx = region.getContext("2d", { alpha: true });

  rctx.clearRect(0, 0, size, size);
  rctx.fillStyle = "#000";
  rctx.imageSmoothingEnabled = false;

  for (const key of parts) {
    const uv = uvConfig?.[key];
    if (!uv) continue;

    const [uvMin, uvMax] = uv;

    const u0 = Math.min(uvMin.u, uvMax.u);
    const u1 = Math.max(uvMin.u, uvMax.u);
    const v0 = Math.min(uvMin.v, uvMax.v);
    const v1 = Math.max(uvMin.v, uvMax.v);

    // ✅ flip gerekmiyorsa bunu eski hal yaparız
    // Şimdilik SENİN ESKİ SİSTEME BENZETMEK İÇİN flip'siz bırakalım:
    let x = Math.floor(u0 * size);
    let y = Math.floor(v0 * size);
    let w = Math.ceil((u1 - u0) * size);
    let h = Math.ceil((v1 - v0) * size);

    // clamp
    x = Math.max(0, Math.min(x, size));
    y = Math.max(0, Math.min(y, size));
    w = Math.max(0, Math.min(w, size - x));
    h = Math.max(0, Math.min(h, size - y));

    if (w > 0 && h > 0) rctx.fillRect(x, y, w, h);
  }

  return region;
};

const normalizeParts = (appliedPart) => {
  if (!appliedPart) return [];
  return Array.isArray(appliedPart) ? appliedPart : [appliedPart];
};

export const drawDesign = async (ctx, size, uvConfig, item) => {
  const uri = item.textureUri; // SVG
  if (!uri) return;

  const parts = normalizeParts(item.appliedPart);
  if (parts.length === 0) return;

  const color = item.firstColor || "#ffffff";
  const opacity = item.opacity ?? 1.0;

  // SVG raster (mask canvas)
  const svgMaskCanvas = await getRasterizedSvgCanvas(uri, size);

  // region mask (selected parts)
  const regionMask = buildRegionMaskFromUvConfig(uvConfig, parts, size);

  // offscreen buffer
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const offCtx = off.getContext("2d", { alpha: true });

  // 1) rengi boya
  offCtx.clearRect(0, 0, size, size);
  offCtx.globalCompositeOperation = "source-over";
  offCtx.fillStyle = color;
  offCtx.fillRect(0, 0, size, size);

  // 2) SVG mask (kesişim)
  offCtx.globalCompositeOperation = "destination-in";
  offCtx.drawImage(svgMaskCanvas, 0, 0, size, size);

  // 3) region mask (kesişim)
  offCtx.drawImage(regionMask, 0, 0, size, size);

  // 4) ana canvasa bas
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = opacity;
  ctx.drawImage(off, 0, 0);
  ctx.restore();
};
