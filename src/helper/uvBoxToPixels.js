export const uvBoxToPixels = (uvMin, uvMax, size) => {
  const xMin = Math.floor(Math.min(uvMin.u, uvMax.u) * size);
  const xMax = Math.ceil(Math.max(uvMin.u, uvMax.u) * size);
  const yMin = Math.floor(Math.min(uvMin.v, uvMax.v) * size);
  const yMax = Math.ceil(Math.max(uvMin.v, uvMax.v) * size);
  return { xMin, yMin, w: xMax - xMin, h: yMax - yMin };
};
