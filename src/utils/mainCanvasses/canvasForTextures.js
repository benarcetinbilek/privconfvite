import * as THREE from "three";
import { drawDesign } from "../textureCanvasses/canvasForDesign";
import { drawPattern } from "../textureCanvasses/canvasForPattern";

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
) => {
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  drawCount++;
  ctx.globalAlpha = 0.5;

  // ctx.fillStyle = "rgba(155, 15, 15, 1)";
  // ctx.fillRect(0, 0, size, size);

  console.log("draw Textures To Canvas count:", drawCount);

  const items = (itemsOnModel || [])
    .filter((i) => i?.isActive !== false)
    .sort((a, b) => Number(a.layerIndex ?? 0) - Number(b.layerIndex ?? 0));

  for (const item of items) {
    switch (item.type) {
      case "pattern":
        // Handle pattern drawing
        await drawPattern(ctx, size, uvConfig, item);
        break;

      case "logo":
        // Handle logo drawing
        // drawLogo(ctx, item, uvConfig);
        break;

      case "sticker":
        // Handle sticker drawing
        // drawSticker(ctx, item, uvConfig);
        break;

      case "design":
        // Handle design drawing
        await drawDesign(ctx, size, uvConfig, item);
        break;

      case "text":
        // Handle text drawing
        // drawText(ctx, item, uvConfig);
        break;

      default:
        break;
    }

    // logo/sticker/text/pattern sonra
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
