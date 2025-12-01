import * as THREE from "three";

const exportUvMap = (geometry) => {
  console.log("exportUvMap geometry", geometry);
  //   if (!geometry?.attributes?.uv || !geometry?.index) {
  //     console.error("UV veya index verisi yok.");
  //     return;
  //   }

  const uvAttribute = geometry.attributes.uv;
  const indexAttribute = geometry.index;
  const canvasSize = 4096; // 10k çok büyük, 4096 ideal

  // Canvas
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");

  // UV map’ler ters döndüğü için
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);

  // Arka plan beyaz
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const uvArray = uvAttribute.array;
  const indexArray = indexAttribute.array;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red"; // üçgen çizgileri
  ctx.fillStyle = "rgba(255, 0, 0, 0.4)"; // kırmızı yarı saydam dolgu

  for (let i = 0; i < indexArray.length; i += 3) {
    const i1 = indexArray[i] * 2;
    const i2 = indexArray[i + 1] * 2;
    const i3 = indexArray[i + 2] * 2;

    const uv1 = { x: uvArray[i1], y: uvArray[i1 + 1] };
    const uv2 = { x: uvArray[i2], y: uvArray[i2 + 1] };
    const uv3 = { x: uvArray[i3], y: uvArray[i3 + 1] };

    ctx.beginPath();
    ctx.moveTo(uv1.x * canvasSize, uv1.y * canvasSize);
    ctx.lineTo(uv2.x * canvasSize, uv2.y * canvasSize);
    ctx.lineTo(uv3.x * canvasSize, uv3.y * canvasSize);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }

  // Export
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "uv-map-red.png";
    link.click();
  });
};

export default exportUvMap;
