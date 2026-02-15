import * as THREE from "three";

const uvBoxToPixels = (uvMin, uvMax, size) => {
  const xMin = Math.floor(Math.min(uvMin.u, uvMax.u) * size);
  const xMax = Math.ceil(Math.max(uvMin.u, uvMax.u) * size);
  const yMin = Math.floor(Math.min(uvMin.v, uvMax.v) * size);
  const yMax = Math.ceil(Math.max(uvMin.v, uvMax.v) * size);
  return { xMin, yMin, w: xMax - xMin, h: yMax - yMin };
};

export const createColorCanvasTexture = (size = 512) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;

  return { canvas, ctx, texture, size };
};

let drawCount = 0;

export const drawColorsToCanvas = ({ ctx, size }, uvConfig, colorsForParts) => {
  ctx.clearRect(0, 0, size, size);

  drawCount++;
  console.log("draw Colors To Canvas count:", drawCount);

  Object.entries(uvConfig).forEach(([part, [uvMin, uvMax]]) => {
    const state = colorsForParts?.[part];
    if (!state) return;

    const { xMin, yMin, w, h } = uvBoxToPixels(uvMin, uvMax, size);
    // console.log("xmin", xMin, "ymin", yMin, "w", w);
    const {
      firstColor,
      secondColor,
      isGradient,
      gradientRotation = 0,
      gradientOffset = 0,
      gradientTransition = 1,
    } = state;

    if (isGradient && secondColor) {
      const rad = gradientRotation;

      const cx = xMin + w / 2 + Math.cos(rad) * w * 0.5 * gradientOffset;
      const cy = yMin + h / 2 + Math.sin(rad) * h * 0.5 * gradientOffset;

      const ex = cx + Math.cos(rad) * w * gradientTransition;
      const ey = cy + Math.sin(rad) * h * gradientTransition;

      const grad = ctx.createLinearGradient(cx, cy, ex, ey);
      grad.addColorStop(0, firstColor);
      grad.addColorStop(1, secondColor);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = firstColor;
    }

    ctx.fillRect(xMin, yMin, w, h);
  });
};
