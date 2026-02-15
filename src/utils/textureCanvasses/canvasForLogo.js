/**
 * Draws logo onto the texture canvas with full support for logo item state.
 * Matches the signature of drawDesign/drawPattern for integration with canvasForTextures.
 *
 * Logo item state (from LogoPage):
 * - textureUri (uploaded image: blob URL, data URL, or path - PNG/JPG/SVG)
 * - scale, rotation
 * - x, y (UV coordinates 0-1 for placement center)
 * - opacity
 * - firstColor, secondColor, isGradient (optional - from ItemSettings color picker)
 */

const LOGO_RASTER_SIZE = 256;
const logoImageCache = new Map();

/**
 * Load image from URI (blob, data, or http) and draw to canvas at given size
 */
async function loadImageToCanvas(uri, size) {
  const key = `${uri}::${size}`;
  if (logoImageCache.has(key)) return logoImageCache.get(key);

  const p = (async () => {
    const img = await new Promise((resolve, reject) => {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = uri;
    });

    const c =
      typeof OffscreenCanvas !== "undefined"
        ? new OffscreenCanvas(size, size)
        : (() => {
            const el = document.createElement("canvas");
            el.width = size;
            el.height = size;
            return el;
          })();
    const ctx = c.getContext("2d", { alpha: true });
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    return c;
  })();

  logoImageCache.set(key, p);
  return p;
}

/**
 * Create fill style (solid or gradient) for logo tinting
 */
function createLogoFillStyle(ctx, item, bounds) {
  const {
    firstColor,
    secondColor,
    isGradient = false,
    gradientRotation = 0,
    gradientOffset = 0,
    gradientTransition = 1,
  } = item;

  if (!firstColor) return null;
  if (!isGradient || !secondColor) return firstColor;

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
 * Main draw function - draws a logo item onto the texture canvas
 * @param {CanvasRenderingContext2D} targetCtx - Target canvas context
 * @param {number} size - Texture size (e.g. 1024)
 * @param {Object} uvConfig - UV configuration (unused for logo; logo uses x,y)
 * @param {Object} item - Logo item with full state from LogoPage
 */
export async function drawLogo(targetCtx, size, uvConfig, item) {
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

  const rasterSize = LOGO_RASTER_SIZE;
  let logoCanvas;
  try {
    logoCanvas = await loadImageToCanvas(uri, rasterSize);
  } catch (err) {
    console.warn("[canvasForLogo] Failed to load logo:", uri, err);
    return;
  }

  let drawSource = logoCanvas;

  if (item.firstColor) {
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
    const fillStyle = createLogoFillStyle(octx, item, {
      x: 0,
      y: 0,
      w: rasterSize,
      h: rasterSize,
    });
    if (fillStyle) {
      octx.fillStyle = fillStyle;
      octx.fillRect(0, 0, rasterSize, rasterSize);
      octx.globalCompositeOperation = "destination-in";
      octx.drawImage(logoCanvas, 0, 0, rasterSize, rasterSize);
      drawSource = off;
    }
  }

  const drawW = Math.round(rasterSize * scale);
  const drawH = Math.round(rasterSize * scale);

  targetCtx.save();
  targetCtx.globalAlpha = opacity;
  targetCtx.globalCompositeOperation = "source-over";
  targetCtx.translate(centerX, centerY);
  targetCtx.rotate(rotationRad);
  targetCtx.translate(-centerX, -centerY);
  targetCtx.drawImage(
    drawSource,
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
