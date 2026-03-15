import * as THREE from "three";
import { drawDesign } from "../textureCanvasses/canvasForDesign";
import { drawPattern } from "../textureCanvasses/canvasForPattern";
import { drawText } from "../textureCanvasses/canvasForText";
import { drawSticker } from "../textureCanvasses/canvasForSticker";
import { drawLogo } from "../textureCanvasses/canvasForLogo";
import { drawSelectionOverlay } from "../textureCanvasses/canvasForSelectionOverlay";

export const createCanvasForTextures = (size = 1024) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d", { alpha: true });

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;

  // stabil ayarlar
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return { canvas, ctx, texture, size };
};

let drawCount = 0;

export const drawTexturesToCanvas = async (
  { ctx, size },
  uvConfig,
  itemsOnModel,
  selectedTextureId = null,
) => {
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  drawCount++;
  ctx.globalAlpha = 0.5;

  const items = (itemsOnModel || [])
    .filter((i) => i?.isActive !== false)
    .sort((a, b) => Number(a.layerIndex ?? 0) - Number(b.layerIndex ?? 0));

  for (const item of items) {
    switch (item.type) {
      case "pattern":
        await drawPattern(ctx, size, uvConfig, item);
        break;
      case "logo":
        await drawLogo(ctx, size, uvConfig, item);
        break;
      case "sticker":
        await drawSticker(ctx, size, uvConfig, item);
        break;
      case "design":
        await drawDesign(ctx, size, uvConfig, item);
        break;
      case "text":
        await drawText(ctx, size, uvConfig, item);
        break;
      default:
        break;
    }
  }

  if (selectedTextureId) {
    const selectedItem = items.find((i) => i.id === selectedTextureId);
    if (selectedItem && ["text", "sticker", "logo"].includes(selectedItem.type)) {
      ctx.globalAlpha = 1;
      await drawSelectionOverlay(ctx, size, selectedItem);
    }
  }
};

// export const drawTexturesToCanvas = ({ ctx, size }, uvConfig, itemsOnModel) => {
//   // FULL RED TEST
//   ctx.clearRect(0, 0, size, size);
//   ctx.save();
//   ctx.globalCompositeOperation = "source-over";
//   ctx.globalAlpha = 0.5;
//   ctx.fillStyle = "rgba(155, 15, 15, 1)";
//   ctx.fillRect(0, 0, size, size);
//   ctx.restore();

//   console.log("RED TEST DRAW");
// };
