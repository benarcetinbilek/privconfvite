/**
 * Computes UV-space bounds for texture items (text, sticker, logo).
 * Used for hit detection and selection overlay.
 * Bounds are in UV coordinates 0-1, with v flipped to match texture canvas (v=0 bottom, v=1 top).
 */

const TEXT_BASE_FONT_SIZE = 48;
// border should tightly follow the text box (no extra padding)
const TEXT_PADDING = 0;
const STICKER_RASTER_SIZE = 256;
const LOGO_RASTER_SIZE = 256;

function measureTextSize(text, font, scale) {
  const fontSize = Math.max(8, Math.round(TEXT_BASE_FONT_SIZE * (scale ?? 1)));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `bold ${fontSize}px ${font || "arial"}`;
  const metrics = ctx.measureText(text);
  const w = metrics.width;
  const h = fontSize * 1.2;
  return { w, h, fontSize };
}

/**
 * Get UV bounds for an item in texture space.
 * Returns { uMin, uMax, vMin, vMax, centerU, centerV, width, height } in 0-1 UV.
 * Note: In our system, centerY = (1-v)*size, so v increases downward in UV.
 */
export function getTextureItemBounds(item, size = 1024) {
  const u = Math.max(0, Math.min(1, item.x ?? 0.5));
  const v = Math.max(0, Math.min(1, item.y ?? 0.5));
  const scale = Math.max(0.2, item.scale ?? 1);

  let halfW, halfH;

  switch (item.type) {
    case "text": {
      const text = (item.textContent || "").trim();
      if (!text) return null;
      const font = item.font || "arial";
      const { w, h, fontSize } = measureTextSize(text, font, scale);
      // match the box used in canvasForText exactly (no rotation margin)
      let boxW = w + TEXT_PADDING * 2;
      let boxH = h + TEXT_PADDING * 2;
      if (item.isCurved) {
        const radius = Math.max(fontSize * 1.5, 50);
        boxW = Math.max(boxW, radius * 2 + TEXT_PADDING * 2);
        boxH = Math.max(boxH, radius * 2 + TEXT_PADDING * 2);
      }
      const offW = Math.ceil(boxW);
      const offH = Math.ceil(boxH);
      halfW = offW / 2 / size;
      halfH = offH / 2 / size;
      break;
    }
    case "sticker": {
      const drawW = STICKER_RASTER_SIZE * scale;
      const drawH = STICKER_RASTER_SIZE * scale;
      // slightly shrink bounds so border hugs visible sticker more tightly
      const shrink = 0.85;
      halfW = (drawW * shrink) / 2 / size;
      halfH = (drawH * shrink) / 2 / size;
      break;
    }
    case "logo": {
      const drawW = LOGO_RASTER_SIZE * scale;
      const drawH = LOGO_RASTER_SIZE * scale;
      halfW = drawW / 2 / size;
      halfH = drawH / 2 / size;
      break;
    }
    default:
      return null;
  }

  return {
    centerU: u,
    centerV: v,
    halfW,
    halfH,
    uMin: u - halfW,
    uMax: u + halfW,
    vMin: v - halfH,
    vMax: v + halfH,
    width: halfW * 2,
    height: halfH * 2,
    rotation: (item.rotation ?? 0) * (Math.PI / 180),
  };
}

/**
 * Test if a point (u, v) in UV space is inside the item's bounds.
 * Handles rotation by checking in local rotated space.
 */
export function isPointInTextureBounds(u, v, bounds) {
  if (!bounds) return false;
  const { centerU, centerV, halfW, halfH, rotation } = bounds;

  const dx = u - centerU;
  const dy = v - centerV;

  if (Math.abs(rotation) < 0.001) {
    return Math.abs(dx) <= halfW && Math.abs(dy) <= halfH;
  }

  const cos = Math.cos(-rotation);
  const sin = Math.sin(-rotation);
  const localX = dx * cos - dy * sin;
  const localY = dx * sin + dy * cos;
  return Math.abs(localX) <= halfW && Math.abs(localY) <= halfH;
}

/**
 * Get which corner button (if any) was clicked.
 * Buttons are centered outside each corner - precise hit test on circular button area.
 */
export function getButtonAtPoint(
  u,
  v,
  bounds,
  buttonSizePx = 32,
  textureSize = 1024,
) {
  if (!bounds) return null;
  const { centerU, centerV, halfW, halfH, rotation } = bounds;

  const dx = u - centerU;
  const dy = v - centerV;

  let localX = dx;
  let localY = dy;
  if (Math.abs(rotation) >= 0.001) {
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    localX = dx * cos - dy * sin;
    localY = dx * sin + dy * cos;
  }

  const btnOffsetUv = buttonSizePx / textureSize;
  const btnCenterOffset = buttonSizePx / 2 / textureSize;
  const btnRadius = (buttonSizePx / 2 + 8) / textureSize;

  const distTo = (cx, cy) => Math.sqrt((localX - cx) ** 2 + (localY - cy) ** 2);

  const topLeftCenterX = -halfW - btnCenterOffset;
  const topLeftCenterY = -halfH - btnCenterOffset;
  if (distTo(topLeftCenterX, topLeftCenterY) <= btnRadius) return "rotate";

  const topRightCenterX = halfW + btnCenterOffset;
  const topRightCenterY = -halfH - btnCenterOffset;
  if (distTo(topRightCenterX, topRightCenterY) <= btnRadius) return "delete";

  const bottomLeftCenterX = -halfW - btnCenterOffset;
  const bottomLeftCenterY = halfH + btnCenterOffset;
  if (distTo(bottomLeftCenterX, bottomLeftCenterY) <= btnRadius)
    return "duplicate";

  const bottomRightCenterX = halfW + btnCenterOffset;
  const bottomRightCenterY = halfH + btnCenterOffset;
  if (distTo(bottomRightCenterX, bottomRightCenterY) <= btnRadius)
    return "resize";

  return null;
}
