// src/utils/canvas/assetCache.js
const svgRasterCache = new Map();
// key: `${uri}::${size}` -> Promise<HTMLCanvasElement>

const loadSvgText = async (uri) => {
  const res = await fetch(uri);
  if (!res.ok) throw new Error(`SVG fetch failed: ${uri}`);
  return await res.text();
};

export const getRasterizedSvgCanvas = async (uri, size) => {
  const key = `${uri}::${size}`;
  if (svgRasterCache.has(key)) return svgRasterCache.get(key);

  const p = (async () => {
    const svgText = await loadSvgText(uri);

    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    try {
      const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = url;
      });

      // raster output
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;

      const cctx = c.getContext("2d", { alpha: true });
      cctx.clearRect(0, 0, size, size);

      // "tam otursun" dedin -> stretch
      cctx.drawImage(img, 0, 0, size, size);

      return c;
    } finally {
      URL.revokeObjectURL(url);
    }
  })();

  svgRasterCache.set(key, p);
  return p;
};

// opsiyonel: model değişince cache temizlemek istersen
export const clearSvgRasterCache = () => {
  svgRasterCache.clear();
};
