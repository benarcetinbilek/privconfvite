/**
 * Draws sticker onto the texture canvas with full support for sticker item state.
 * Matches the signature of drawDesign/drawPattern for integration with canvasForTextures.
 *
 * Sticker item state (from StickerPage):
 * - textureUri (SVG path)
 * - scale, rotation
 * - x, y (UV coordinates 0-1 for placement center)
 * - opacity
 * - firstColor, secondColor
 * - isGradient, gradientRotation, gradientOffset, gradientTransition
 */

import { getRasterizedSvgCanvas } from "../../helper/assetSvgCache";

const STICKER_RASTER_SIZE = 256;

/**
 * Create fill style (solid or gradient) for sticker tinting
 */
function createStickerFillStyle(ctx, item, bounds) {
  const {
    firstColor = "#000000",
    secondColor = "#000000",
    isGradient = false,
    gradientRotation = 0,
    gradientOffset = 0,
    gradientTransition = 1,
  } = item;

  if (!isGradient || !secondColor) {
    return firstColor;
  }

  const { x, y, w, h } = bounds;
  const cx = x + w / 2 + Math.cos(gradientRotation) * w * 0.5 * gradientOffset;
  const cy = y + h / 2 + Math.sin(gradientRotation) * h * 0.5 * gradientOffset;
  const ex = cx + Math.cos(gradientRotation) * w * (gradientTransition || 1);
  const ey = cy + Math.sin(gradientRotation) * h * (gradientTransition || 1);

  const grad = ctx.createLinearGradient(cx, cy, ex, ey);
  grad.addColorStop(0, firstColor);
  grad.addColorStop(1, secondColor);
  return grad;
}

/**
 * Main draw function - draws a sticker item onto the texture canvas
 * @param {CanvasRenderingContext2D} targetCtx - Target canvas context
 * @param {number} size - Texture size (e.g. 1024)
 * @param {Object} uvConfig - UV configuration (unused for sticker; sticker uses x,y)
 * @param {Object} item - Sticker item with full state from StickerPage
 */
export async function drawSticker(targetCtx, size, uvConfig, item) {
  const uri = item.textureUri;
  if (!uri) return;

  const opacity = Math.max(0, Math.min(1, item.opacity ?? 1));
  if (opacity <= 0) return;

  const u = Math.max(0, Math.min(1, item.x ?? 0.5));
  const v = Math.max(0, Math.min(1, item.y ?? 0.5));
  const centerX = u * size;
  const centerY = (1 - v) * size;

  const scale = Math.max(0.2, item.scale ?? 1);
  const rotationRad = ((item.rotation ?? 0) * Math.PI) / 180;

  const rasterSize = STICKER_RASTER_SIZE;
  const svgCanvas = await getRasterizedSvgCanvas(uri, rasterSize);

  const off =
    typeof OffscreenCanvas !== "undefined"
      ? new OffscreenCanvas(rasterSize, rasterSize)
      : (() => {
          const c = document.createElement("canvas");
          c.width = rasterSize;
          c.height = rasterSize;
          return c;
        })();
  const octx = off.getContext("2d", { alpha: true });
  octx.clearRect(0, 0, rasterSize, rasterSize);

  const fillStyle = createStickerFillStyle(octx, item, {
    x: 0,
    y: 0,
    w: rasterSize,
    h: rasterSize,
  });
  octx.fillStyle = fillStyle;
  octx.fillRect(0, 0, rasterSize, rasterSize);

  octx.globalCompositeOperation = "destination-in";
  octx.drawImage(svgCanvas, 0, 0, rasterSize, rasterSize);

  const drawW = Math.round(rasterSize * scale);
  const drawH = Math.round(rasterSize * scale);

  targetCtx.save();
  targetCtx.globalAlpha = opacity;
  targetCtx.globalCompositeOperation = "source-over";
  targetCtx.translate(centerX, centerY);
  targetCtx.rotate(rotationRad);
  targetCtx.translate(-centerX, -centerY);
  targetCtx.drawImage(
    off,
    0,
    0,
    rasterSize,
    rasterSize,
    centerX - drawW / 2,
    centerY - drawH / 2,
    drawW,
    drawH
  );
  targetCtx.restore();
}
