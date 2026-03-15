/**
 * Draws selection overlay (dashed border + action buttons) on the texture canvas.
 * Drawn in UV space so it follows the model's curves like fabric.
 */

import { getRasterizedSvgCanvas } from "../../helper/assetSvgCache";
import { getTextureItemBounds } from "../textureInteraction/textureBounds";

const BUTTON_SVG = {
  rotate: "/actionButtons/ActionButtonRotate.svg",
  delete: "/actionButtons/ActionButtonDelete.svg",
  duplicate: "/actionButtons/ActionButtonDuplicate.svg",
  resize: "/actionButtons/ActionButtonScale.svg",
};

const BUTTON_SIZE = 32;
const BORDER_WIDTH = 3;
const DASH_PATTERN = [8, 6];
const BUTTON_RADIUS = BUTTON_SIZE / 2 + 2;

const buttonCache = new Map();

async function getButtonCanvas(action) {
  const uri = BUTTON_SVG[action];
  if (!uri) return null;
  const key = uri;
  if (buttonCache.has(key)) return buttonCache.get(key);
  try {
    const canvas = await getRasterizedSvgCanvas(uri, BUTTON_SIZE);
    buttonCache.set(key, canvas);
    return canvas;
  } catch {
    return null;
  }
}

/**
 * Draw dashed border and 4 action buttons for the selected item
 */
export async function drawSelectionOverlay(ctx, size, item) {
  if (!item || !["text", "sticker", "logo"].includes(item.type)) return;

  const bounds = getTextureItemBounds(item, size);
  if (!bounds) return;

  const u = bounds.centerU;
  const v = bounds.centerV;
  const centerX = u * size;
  const centerY = (1 - v) * size;
  const rotationRad = bounds.rotation;

  const halfW = bounds.halfW * size;
  const halfH = bounds.halfH * size;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotationRad);
  ctx.translate(-centerX, -centerY);

  ctx.strokeStyle = "#0066ff";
  ctx.lineWidth = BORDER_WIDTH;
  ctx.setLineDash(DASH_PATTERN);
  ctx.strokeRect(
    centerX - halfW,
    centerY - halfH,
    halfW * 2,
    halfH * 2
  );
  ctx.setLineDash([]);

  const buttonPositions = [
    { action: "rotate", x: centerX - halfW - BUTTON_SIZE / 2, y: centerY - halfH - BUTTON_SIZE / 2 },
    { action: "delete", x: centerX + halfW + BUTTON_SIZE / 2, y: centerY - halfH - BUTTON_SIZE / 2 },
    { action: "duplicate", x: centerX - halfW - BUTTON_SIZE / 2, y: centerY + halfH + BUTTON_SIZE / 2 },
    { action: "resize", x: centerX + halfW + BUTTON_SIZE / 2, y: centerY + halfH + BUTTON_SIZE / 2 },
  ];

  const offset = BUTTON_SIZE / 2;
  for (const { action, x, y } of buttonPositions) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, BUTTON_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    const btnCanvas = await getButtonCanvas(action);
    if (btnCanvas) {
      ctx.drawImage(
        btnCanvas,
        x - offset,
        y - offset,
        BUTTON_SIZE,
        BUTTON_SIZE
      );
    }
  }

  ctx.restore();
}
