/**
 * Draws text onto the texture canvas with full support for all text item state.
 * Matches the signature of drawDesign/drawPattern for integration with canvasForTextures.
 *
 * Text item state (from TextPage):
 * - textContent, font, scale, rotation
 * - x, y (UV coordinates 0-1 for placement center)
 * - opacity, firstColor, secondColor
 * - outlineColor, backgroundColor
 * - isGradient, gradientRotation, gradientOffset, gradientTransition
 * - isCurved, curvedAngle
 */

const DEFAULT_FONT = "arial";
const BASE_FONT_SIZE = 48; // Base size before scale, in texture pixels
const TEXT_PADDING = 4;

/**
 * Measure text dimensions for a given font and scale
 */
function measureText(ctx, text, font, scale) {
  const fontSize = Math.max(8, Math.round(BASE_FONT_SIZE * (scale ?? 1)));
  ctx.font = `bold ${fontSize}px ${font || DEFAULT_FONT}`;
  const metrics = ctx.measureText(text);
  const w = metrics.width;
  const h = fontSize * 1.2; // Approximate height
  return { w, h, fontSize };
}

/**
 * Create fill style (solid or gradient) for text
 */
function createTextFillStyle(ctx, item, bounds) {
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
  const ex =
    cx + Math.cos(gradientRotation) * w * (gradientTransition || 1);
  const ey =
    cy + Math.sin(gradientRotation) * h * (gradientTransition || 1);

  const grad = ctx.createLinearGradient(cx, cy, ex, ey);
  grad.addColorStop(0, firstColor);
  grad.addColorStop(1, secondColor);
  return grad;
}

/**
 * Draw straight text at position (no rotation - applied at composite time)
 */
function drawStraightText(ctx, text, x, y, item) {
  const font = item.font || DEFAULT_FONT;
  const scale = Math.max(0.2, item.scale ?? 1);
  const { fontSize } = measureText(ctx, text, font, scale);

  ctx.font = `bold ${fontSize}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fillStyle = createTextFillStyle(ctx, item, {
    x: x - 100,
    y: y - fontSize / 2,
    w: 200,
    h: fontSize,
  });
  ctx.fillStyle = fillStyle;

  if (item.outlineColor) {
    ctx.strokeStyle = item.outlineColor;
    ctx.lineWidth = Math.max(1, fontSize * 0.08);
    ctx.strokeText(text, x, y);
  }
  ctx.fillText(text, x, y);
}

/**
 * Draw curved text along an arc
 */
function drawCurvedText(ctx, text, centerX, centerY, item) {
  const font = item.font || DEFAULT_FONT;
  const scale = Math.max(0.2, item.scale ?? 1);
  const curvedAngle = item.curvedAngle ?? 0;
  const { fontSize } = measureText(ctx, text, font, scale);

  const radius = Math.max(fontSize * 1.5, 50);
  const angle = (curvedAngle || 0.5) * Math.PI;

  ctx.save();
  ctx.font = `bold ${fontSize}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const len = text.length;
  if (len === 0) {
    ctx.restore();
    return;
  }

  ctx.translate(centerX, centerY);
  ctx.rotate(-angle / 2);
  ctx.rotate(-(angle / len) / 2);

  const fillStyle = createTextFillStyle(ctx, item, {
    x: -radius,
    y: -fontSize / 2,
    w: radius * 2,
    h: fontSize,
  });
  ctx.fillStyle = fillStyle;

  if (item.outlineColor) {
    ctx.strokeStyle = item.outlineColor;
    ctx.lineWidth = Math.max(1, fontSize * 0.08);
  }

  for (let n = 0; n < len; n++) {
    ctx.rotate(angle / len);
    ctx.save();
    ctx.translate(0, -radius);
    if (item.outlineColor) ctx.strokeText(text[n], 0, 0);
    ctx.fillText(text[n], 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

/**
 * Main draw function - draws a text item onto the texture canvas
 * @param {CanvasRenderingContext2D} targetCtx - Target canvas context
 * @param {number} size - Texture size (e.g. 1024)
 * @param {Object} uvConfig - UV configuration (unused for text placement; text uses x,y)
 * @param {Object} item - Text item with full state from TextPage
 */
export async function drawText(targetCtx, size, uvConfig, item) {
  const text = (item.textContent || "").trim();
  if (!text) return;

  const opacity = Math.max(0, Math.min(1, item.opacity ?? 1));
  if (opacity <= 0) return;

  const u = Math.max(0, Math.min(1, item.x ?? 0.5));
  const v = Math.max(0, Math.min(1, item.y ?? 0.5));
  const centerX = u * size;
  const centerY = (1 - v) * size;

  const font = item.font || DEFAULT_FONT;
  const scale = Math.max(0.2, item.scale ?? 1);
  const { w, h, fontSize } = measureText(targetCtx, text, font, scale);

  const pad = TEXT_PADDING;
  let boxW = w + pad * 2;
  let boxH = h + pad * 2;
  if (item.isCurved) {
    const radius = Math.max(fontSize * 1.5, 50);
    boxW = Math.max(boxW, radius * 2 + pad * 4);
    boxH = Math.max(boxH, radius * 2 + pad * 4);
  }

  const offW = Math.ceil(boxW * 2);
  const offH = Math.ceil(boxH * 2);
  const off =
    typeof OffscreenCanvas !== "undefined"
      ? new OffscreenCanvas(offW, offH)
      : (() => {
          const c = document.createElement("canvas");
          c.width = offW;
          c.height = offH;
          return c;
        })();
  const octx = off.getContext("2d", { alpha: true });
  octx.clearRect(0, 0, off.width, off.height);

  const localCenterX = off.width / 2;
  const localCenterY = off.height / 2;

  octx.save();

  if (item.backgroundColor) {
    octx.fillStyle = item.backgroundColor;
    octx.fillRect(
      localCenterX - boxW / 2,
      localCenterY - boxH / 2,
      boxW,
      boxH
    );
  }

  if (item.isCurved) {
    drawCurvedText(octx, text, localCenterX, localCenterY, item);
  } else {
    drawStraightText(octx, text, localCenterX, localCenterY, item);
  }

  octx.restore();

  targetCtx.save();
  targetCtx.globalAlpha = opacity;
  targetCtx.globalCompositeOperation = "source-over";
  targetCtx.translate(centerX, centerY);
  targetCtx.rotate(((item.rotation ?? 0) * Math.PI) / 180);
  targetCtx.translate(-centerX, -centerY);
  targetCtx.drawImage(
    off,
    0,
    0,
    off.width,
    off.height,
    centerX - off.width / 2,
    centerY - off.height / 2,
    off.width,
    off.height
  );
  targetCtx.restore();
}
