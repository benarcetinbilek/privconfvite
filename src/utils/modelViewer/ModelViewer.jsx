import { useEffect, useMemo, useRef, useState } from "react";
import { fragmentShader } from "../../shaders/fragmentShader";
import { vertexShader } from "../../shaders/VertexShader";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Vector3, TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import configStore from "../../store/configStore";
import configuratorStore from "../../store/configuratorStore";
import {
  createColorCanvasTexture,
  drawColorsToCanvas,
} from "../mainCanvasses/canvasForColor";
import {
  createNormalMapCanvasTexture,
  createNonConfigurableColorCanvasTexture,
  drawNormalMapAndNonConfigurableColor,
} from "../mainCanvasses/canvasForNormalMap";
import { useFrame } from "@react-three/fiber";
import {
  createCanvasForTextures,
  drawTexturesToCanvas,
} from "../mainCanvasses/canvasForTextures";
import { useTextureInteraction } from "../textureInteraction/useTextureInteraction";

const TEXTURE_SIZE = 1024;

export function ModelViewer() {
  const { setGeometry, uvConfig } = configStore();
  const {
    colorsForParts,
    itemsOnModel,
    selectedTextureId,
    partsConfig,
    exampleState,
  } = configuratorStore();
  const meshRef = useRef();

  const colorPack = useMemo(() => createColorCanvasTexture(TEXTURE_SIZE), []);
  const texturePack = useMemo(() => createCanvasForTextures(), []);
  const normalPack = useMemo(
    () => createNormalMapCanvasTexture(TEXTURE_SIZE),
    [],
  );
  const nonConfigurableColorPack = useMemo(
    () => createNonConfigurableColorCanvasTexture(TEXTURE_SIZE),
    [],
  );
  const combinedColorPack = useMemo(
    () => createColorCanvasTexture(TEXTURE_SIZE),
    [],
  );
  const textureSize = texturePack.size ?? TEXTURE_SIZE;

  const { handlePointerDown, handlePointerMove, handlePointerUp } =
    useTextureInteraction(meshRef, textureSize);

  const [startTime] = useState(() => performance.now());

  const { nodes } = useGLTF("/model.glb");
  console.log("nodes", nodes);

  const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
  normalMapTexture.flipY = false;

  const materialRef = useRef();

  // Merge non-configurable color (from new canvas) + configurable color (colorPack) → combined, then set uniform
  const mergeColorCanvases = () => {
    const { ctx, size, texture } = combinedColorPack;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(nonConfigurableColorPack.canvas, 0, 0);
    ctx.drawImage(colorPack.canvas, 0, 0, size, size);
    texture.needsUpdate = true;
    if (materialRef.current) {
      materialRef.current.uniforms.canvasToColor.value = texture;
      materialRef.current.uniformsNeedUpdate = true;
    }
  };

  // uvConfig / colorsForParts → draw configurable parts only to colorPack, then merge and set canvasToColor
  useEffect(() => {
    if (!uvConfig || !colorsForParts) return;
    const partsConfigForDraw = partsConfig ?? exampleState;
    const t0 = performance.now();
    drawColorsToCanvas(colorPack, uvConfig, colorsForParts, partsConfigForDraw);
    const t1 = performance.now();
    console.log(`[COLOR] draw took ${(t1 - t0).toFixed(2)} ms`);
    colorPack.texture.needsUpdate = true;
    mergeColorCanvases();
  }, [uvConfig, colorsForParts, partsConfig, exampleState, colorPack]);

  // uvConfig / partsConfig (or exampleState) → draw normal map + non-configurable color, then merge and set uniforms
  useEffect(() => {
    let cancelled = false;
    const partsConfigForDraw = partsConfig ?? exampleState;
    if (!uvConfig || !partsConfigForDraw) return;

    (async () => {
      const t0 = performance.now();
      await drawNormalMapAndNonConfigurableColor(
        { normalPack, colorPack: nonConfigurableColorPack },
        uvConfig,
        partsConfigForDraw,
        normalMapTexture?.image ?? null,
      );
      if (cancelled) return;
      const t1 = performance.now();
      console.log(`[NORMAL+NC] draw took ${(t1 - t0).toFixed(2)} ms`);
      normalPack.texture.needsUpdate = true;
      nonConfigurableColorPack.texture.needsUpdate = true;
      mergeColorCanvases();
      if (materialRef.current) {
        materialRef.current.uniforms.normalMap.value = normalPack.texture;
        materialRef.current.uniformsNeedUpdate = true;
      }
    })();
    return () => { cancelled = true; };
  }, [uvConfig, partsConfig, exampleState, normalPack, nonConfigurableColorPack, combinedColorPack, colorPack]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uvConfig) return;
      const t0 = performance.now();
      await drawTexturesToCanvas(
        texturePack,
        uvConfig,
        itemsOnModel,
        selectedTextureId,
      );
      const t1 = performance.now();
      console.log(`[TEXTURE] draw took ${(t1 - t0).toFixed(2)} ms`);
      if (cancelled) return;

      texturePack.texture.needsUpdate = true;

      if (materialRef.current) {
        materialRef.current.uniforms.canvasToTexture.value =
          texturePack.texture;
        materialRef.current.uniformsNeedUpdate = true;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uvConfig, itemsOnModel, texturePack, selectedTextureId]);

  //LOGS
  // useEffect(() => {
  //   const endTime = performance.now();
  //   console.log(
  //     "ModelViewer loaded in",
  //     ((endTime - startTime) / 1000).toFixed(2),
  //     "seconds",
  //   );
  //   setGeometry(nodes.Scene.children[0].geometry);
  // }, [nodes, setGeometry, startTime]);

  // const acc = { sum: 0, n: 0, last: performance.now() };

  // useFrame(() => {
  //   const now = performance.now();
  //   const dt = now - acc.last;
  //   acc.last = now;

  //   acc.sum += dt;
  //   acc.n++;
  //   if (acc.n % 60 === 0) {
  //     const avgMs = acc.sum / acc.n;
  //     const fps = 1000 / avgMs;
  //     console.log(`avg frame ${avgMs.toFixed(2)} ms | ~${fps.toFixed(1)} fps`);
  //   }
  // });

  // const { gl } = useThree();

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     const info = gl.info;
  //     console.log(
  //       "calls",
  //       info.render.calls,
  //       "tris",
  //       info.render.triangles,
  //       "textures",
  //       info.memory.textures,
  //       "geometries",
  //       info.memory.geometries,
  //     );
  //   }, 2000);

  //   return () => clearInterval(id);
  // }, [gl]);

  const uniforms = useMemo(
    () => ({
      blendFactor: { value: 1.0 },
      lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
      normalMap: { value: normalMapTexture },
      canvasToColor: { value: combinedColorPack.texture },
      canvasToTexture: { value: texturePack.texture },
    }),
    [normalMapTexture, combinedColorPack.texture, texturePack.texture],
  );

  return (
    <Suspense fallback={<p>wait please</p>}>
      <mesh
        ref={meshRef}
        geometry={nodes.Scene.children[0].geometry}
        position={[0, -1.3, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </Suspense>
  );
}

// export function ModelViewer() {
//   const [startTime] = useState(() => performance.now());
//   const { nodes } = useGLTF("/SmallHouse.glb");
//   console.log("nodes", nodes);

//   const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
//   normalMapTexture.flipY = false;

//   useEffect(() => {
//     const endTime = performance.now();
//     const duration = ((endTime - startTime) / 1000).toFixed(2);
//     console.log("ModelViewer loaded in", duration, "seconds");
//   }, [nodes]);

//   return (
//     <Suspense fallback={<p>wait please</p>}>
//       <group position={[0, -1.3, 0]}>
//         {Object.values(nodes)
//           .filter((n) => n.isMesh)
//           .map((mesh) => (
//             <mesh key={mesh.uuid} geometry={mesh.geometry}>
//               <shaderMaterial
//                 uniforms={{
//                   blendFactor: { value: 1.0 },
//                   lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
//                   normalMap: { value: normalMapTexture },
//                 }}
//                 vertexShader={vertexShader}
//                 fragmentShader={fragmentShader}
//               />
//             </mesh>
//           ))}
//       </group>
//     </Suspense>
//   );
// }

//
// export function ModelViewer() {
//   const { setGeometry } = configuratorStore();
//   const [startTime] = useState(() => performance.now());
//   const { nodes } = useGLTF("/Full Drum Kit.glb");

//   const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
//   normalMapTexture.flipY = false;

//   // Mesh birleştirme işlemi
//   const mergedGeometry = useMemo(() => {
//     const geometries = Object.values(nodes)
//       .filter((n) => n.isMesh)
//       .map((m) => m.geometry);

//     if (geometries.length === 0) return null;
//     setGeometry(BufferGeometryUtils.mergeGeometries(geometries, true));
//     return BufferGeometryUtils.mergeGeometries(geometries, true);
//   }, [nodes]);

//   useEffect(() => {
//     const endTime = performance.now();
//     const duration = ((endTime - startTime) / 1000).toFixed(2);
//     console.log("ModelViewer loaded in", duration, "seconds");
//   }, [nodes]);

//   return (
//     <Suspense fallback={<p>wait please</p>}>
//       <group position={[0, -1.3, 0]}>
//         {mergedGeometry && (
//           <mesh geometry={mergedGeometry}>
//             <shaderMaterial
//               uniforms={{
//                 blendFactor: { value: 1.0 },
//                 lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
//                 normalMap: { value: normalMapTexture },
//               }}
//               vertexShader={vertexShader}
//               fragmentShader={fragmentShader}
//             />
//           </mesh>
//         )}
//       </group>
//     </Suspense>
//   );
// }

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useGLTF } from "@react-three/drei";
// import { Suspense } from "react";
// import * as THREE from "three";
// import { useLoader, useThree } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import configStore from "../../store/configStore";
// import configuratorStore from "../../store/configuratorStore";
// import {
//   createColorCanvasTexture,
//   drawColorsToCanvas,
// } from "../mainCanvasses/canvasForColor";
// import {
//   createCanvasForTextures,
//   drawTexturesToCanvas,
// } from "../mainCanvasses/canvasForTextures";
// import { useTextureInteraction } from "../textureInteraction/useTextureInteraction";

// const TEXTURE_SIZE = 1024;

// export function ModelViewer() {
//   const { setGeometry, uvConfig } = configStore();
//   const { colorsForParts, itemsOnModel, selectedTextureId } =
//     configuratorStore();

//   const meshRef = useRef();
//   const { handlePointerDown, handlePointerMove, handlePointerUp } =
//     useTextureInteraction(meshRef, TEXTURE_SIZE);

//   const { nodes } = useGLTF("/model.glb");

//   const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
//   normalMapTexture.flipY = false;
//   normalMapTexture.wrapS = normalMapTexture.wrapT = THREE.RepeatWrapping;

//   const colorPack = useMemo(() => createColorCanvasTexture(), []);
//   const texturePack = useMemo(() => createCanvasForTextures(), []);

//   // ====================== PBR MATERIAL ======================
//   const material = useMemo(() => {
//     const hasValidMap = colorPack?.texture?.isTexture;

//     const mat = new THREE.MeshPhysicalMaterial({
//       map: hasValidMap ? colorPack.texture : undefined,
//       color: hasValidMap ? undefined : new THREE.Color(0xeeeeee), // fallback
//       roughness: 0.88,
//       metalness: 0.0,
//       normalMap: normalMapTexture,
//       normalScale: new THREE.Vector2(0.7, 0.7),
//       envMapIntensity: 0.6,
//       clearcoat: 0.0,
//       sheen: 0.45,
//       sheenRoughness: 0.92,
//       sheenColor: new THREE.Color(0xffe0d6),
//     });

//     mat.onBeforeCompile = (shader) => {
//       // 1. Uniform declaration'ı SHADER'IN EN BAŞINA ekle (en güvenli)
//       // Birçok örnekte bu şekilde yapılıyor
//       shader.fragmentShader = `
//     uniform sampler2D canvasToTexture;

//     ${shader.fragmentShader}
//   `;

//       // Alternatif: Eğer yukarıdaki çalışmazsa bu versiyonu dene (chunk öncesi)
//       // shader.fragmentShader = shader.fragmentShader.replace(
//       //   /^(.*)/m,  // ilk satırdan önce
//       //   `uniform sampler2D canvasToTexture;\n$1`
//       // );

//       // 2. Uniform değerini ata (null guard ile)
//       shader.uniforms.canvasToTexture = {
//         value: texturePack?.texture?.isTexture ? texturePack.texture : null,
//       };

//       console.log(
//         "🔍 Shader'a uniform eklendi. Fragment shader başı:\n",
//         shader.fragmentShader,
//       );

//       // 3. Katman kodunu enjekte et — bu sefer en erken chunk'ı hedefle
//       const possibleInjectionPoints = [
//         "#include <map_fragment>",
//         "#include <color_fragment>",
//         "#include <alphamap_fragment>", // alpha varsa erken
//         "#include <diffuse_fragment>", // nadir ama bazen var
//       ];

//       let injected = false;

//       for (const point of possibleInjectionPoints) {
//         if (shader.fragmentShader.includes(point)) {
//           console.log(`✅ ${point} bulundu → katman eklendi`);
//           shader.fragmentShader = shader.fragmentShader.replace(
//             point,
//             /* glsl */ `
//         ${point}

//         // Overlay texture (desen/logo vs.)
//         vec4 texOverlay = texture(canvasToTexture, vUv);  // texture2D yerine texture dene (yeni GLSL)
//         diffuseColor.rgb = mix(diffuseColor.rgb, texOverlay.rgb, texOverlay.a * 0.85);
//         `,
//           );
//           injected = true;
//           break;
//         }
//       }

//       if (!injected) {
//         console.warn(
//           "⚠️ Hiçbir injection point bulunamadı → diffuse hesap sonrası enjekte ediyorum",
//         );
//         // En güvenli fallback: diffuse hesaplandıktan hemen sonra (genelde map_fragment sonrası)
//         shader.fragmentShader = shader.fragmentShader.replace(
//           /diffuseColor\s*\*=\s*sampledDiffuseColor;/, // senin log'daki satır
//           /* glsl */ `
//       diffuseColor *= sampledDiffuseColor;

//       vec4 texOverlay = texture(canvasToTexture, vUv);
//       diffuseColor.rgb = mix(diffuseColor.rgb, texOverlay.rgb, texOverlay.a * 0.85);
//       `,
//         );
//       }

//       shader.uniformsNeedUpdate = true;
//     };
//     return mat;
//   }, [colorPack.texture, texturePack.texture, normalMapTexture]);

//   // ====================== CANVAS REDRAW ======================
//   useEffect(() => {
//     if (!uvConfig || !colorsForParts) return;
//     const t0 = performance.now();
//     drawColorsToCanvas(colorPack, uvConfig, colorsForParts);
//     console.log(`[COLOR] draw took ${(performance.now() - t0).toFixed(2)} ms`);
//     colorPack.texture.needsUpdate = true;
//   }, [uvConfig, colorsForParts, colorPack]);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       if (!uvConfig) return;
//       const t0 = performance.now();
//       await drawTexturesToCanvas(
//         texturePack,
//         uvConfig,
//         itemsOnModel,
//         selectedTextureId,
//       );
//       console.log(
//         `[TEXTURE] draw took ${(performance.now() - t0).toFixed(2)} ms`,
//       );
//       if (cancelled) return;
//       texturePack.texture.needsUpdate = true;
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [uvConfig, itemsOnModel, selectedTextureId, texturePack]);

//   // ====================== MATERIAL ATA ======================
//   useEffect(() => {
//     if (meshRef.current && material) {
//       meshRef.current.material = material;
//       material.needsUpdate = true;
//     }
//   }, [material]);

//   return (
//     <Suspense fallback={<p>wait please</p>}>
//       <mesh
//         ref={meshRef}
//         geometry={nodes.Scene.children[0].geometry}
//         position={[0, -1.3, 0]}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerLeave={handlePointerUp}
//         onLostPointerCapture={handlePointerUp}
//       />
//     </Suspense>
//   );
// }

// import { useEffect, useMemo, useRef, useState } from "react";
// import { fragmentShader } from "../../shaders/fragmentShader";
// import { vertexShader } from "../../shaders/VertexShader";
// import { useGLTF } from "@react-three/drei";
// import { Suspense } from "react";
// import { Vector3, TextureLoader } from "three";
// import { useLoader, useThree } from "@react-three/fiber";
// import configStore from "../../store/configStore";
// import configuratorStore from "../../store/configuratorStore";
// import {
//   createColorCanvasTexture,
//   drawColorsToCanvas,
// } from "../mainCanvasses/canvasForColor";
// import {
//   createCanvasForTextures,
//   drawTexturesToCanvas,
// } from "../mainCanvasses/canvasForTextures";
// import { useTextureInteraction } from "../textureInteraction/useTextureInteraction";

// const TEXTURE_SIZE = 1024;

// export function ModelViewer() {
//   const { setGeometry, uvConfig } = configStore();
//   const { colorsForParts, itemsOnModel, selectedTextureId } =
//     configuratorStore();

//   const colorPack = useMemo(() => createColorCanvasTexture(), []);
//   const texturePack = useMemo(() => createCanvasForTextures(), []);
//   const textureSize = texturePack.size ?? TEXTURE_SIZE;

//   const meshRefs = useRef(new Map()); // Her mesh için ref tutuyoruz (drag-drop için)
//   const materialRefs = useRef(new Map()); // Her mesh için material ref

//   const { handlePointerDown, handlePointerMove, handlePointerUp } =
//     useTextureInteraction(
//       null, // artık tek meshRef yok, aşağıda her mesh'e ayrı event bağlayacağız
//       textureSize,
//     );

//   const [startTime] = useState(() => performance.now());

//   // UV bounding box hesaplayan yardımcı fonksiyon
//   const calculateUVBounds = (geometry) => {
//     const uvAttr = geometry.attributes.uv;
//     if (!uvAttr || uvAttr.count === 0) {
//       return { minU: 0, maxU: 1, minV: 0, maxV: 1 }; // fallback
//     }

//     const uvArray = uvAttr.array;
//     let minU = Infinity,
//       maxU = -Infinity;
//     let minV = Infinity,
//       maxV = -Infinity;

//     for (let i = 0; i < uvArray.length; i += 2) {
//       const u = uvArray[i];
//       const v = uvArray[i + 1];
//       minU = Math.min(minU, u);
//       maxU = Math.max(maxU, u);
//       minV = Math.min(minV, v);
//       maxV = Math.max(maxV, v);
//     }

//     return {
//       minU: minU === Infinity ? 0 : minU,
//       maxU: maxU === -Infinity ? 1 : maxU,
//       minV: minV === Infinity ? 0 : minV,
//       maxV: maxV === -Infinity ? 1 : maxV,
//     };
//   };

//   const { nodes } = useGLTF("/spized.glb"); // model yolu senin olsun
//   console.log("nodes", nodes);
//   const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
//   normalMapTexture.flipY = false;

//   const uniforms = useMemo(
//     () => ({
//       blendFactor: { value: 1.0 },
//       lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
//       normalMap: { value: normalMapTexture },
//       canvasToColor: { value: colorPack.texture },
//       canvasToTexture: { value: texturePack.texture },
//     }),
//     [normalMapTexture, colorPack.texture, texturePack.texture],
//   );

//   // Canvas redraw - uvConfig veya colors değişince tüm canvas'ı güncelle
//   useEffect(() => {
//     if (!uvConfig || !colorsForParts) return;

//     const t0 = performance.now();
//     drawColorsToCanvas(colorPack, uvConfig, colorsForParts);
//     colorPack.texture.needsUpdate = true;
//     const t1 = performance.now();
//     console.log(`[COLOR] draw took ${(t1 - t0).toFixed(2)} ms`);

//     // Tüm material'lere bildir
//     materialRefs.current.forEach((mat) => {
//       if (mat?.uniforms) {
//         mat.uniforms.canvasToColor.value = colorPack.texture;
//         mat.uniformsNeedUpdate = true;
//       }
//     });
//   }, [uvConfig, colorsForParts, colorPack]);

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       if (!uvConfig) return;
//       const t0 = performance.now();
//       await drawTexturesToCanvas(
//         texturePack,
//         uvConfig,
//         itemsOnModel,
//         selectedTextureId,
//       );
//       const t1 = performance.now();
//       console.log(`[TEXTURE] draw took ${(t1 - t0).toFixed(2)} ms`);
//       if (cancelled) return;

//       texturePack.texture.needsUpdate = true;

//       // Tüm material'lere bildir
//       materialRefs.current.forEach((mat) => {
//         if (mat?.uniforms) {
//           mat.uniforms.canvasToTexture.value = texturePack.texture;
//           mat.uniformsNeedUpdate = true;
//         }
//       });
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [uvConfig, itemsOnModel, selectedTextureId, texturePack]);

//   // Model yüklendikten sonra geometry'leri store'a koy (multi için ilkini veya merged'i)
//   useEffect(() => {
//     const meshes = Object.values(nodes).filter((n) => n.isMesh);
//     if (meshes.length > 0) {
//       // Multi-mesh destek için store'a tüm geometrileri veya ilkini koyabilirsin
//       setGeometry(meshes[0].geometry); // eski davranışını koru, istersen değiştir
//     }
//   }, [nodes, setGeometry]);

//   const meshes = useMemo(() => {
//     return Object.values(nodes).filter((n) => n.isMesh);
//   }, [nodes]);

//   useEffect(() => {
//     if (meshes.length === 0) return;

//     meshes.forEach((mesh, index) => {
//       const partName =
//         mesh.name && mesh.name.trim() !== "" ? mesh.name : `part${index + 1}`; // part1, part2, part3...

//       // Mesh'e isim ata (ileride kullanmak için)
//       mesh.userData.partName = partName;

//       const uvBounds = calculateUVBounds(mesh.geometry);

//       console.log(`Parça: ${partName}`);

//       console.log(`  UV Bounds:`, uvBounds);
//     });

//     console.groupEnd();

//     // İstersen uvConfig store'una otomatik doldur (default full UV)
//     const autoUvConfig = {};
//     meshes.forEach((mesh) => {
//       const key = mesh.userData.partName;
//       autoUvConfig[key] = calculateUVBounds(mesh.geometry);
//     });
//     // configStore'a yaz: setUvConfig(autoUvConfig);  // eğer istersen
//   }, [meshes]);

//   return (
//     <Suspense fallback={<p>wait please</p>}>
//       <group position={[0, -1.3, 0]}>
//         {meshes.map((mesh) => {
//           const meshKey = mesh.uuid; // veya mesh.name kullanabilirsin

//           return (
//             <mesh
//               key={meshKey}
//               geometry={mesh.geometry}
//               ref={(el) => {
//                 if (el) {
//                   meshRefs.current.set(meshKey, el);
//                 } else {
//                   meshRefs.current.delete(meshKey);
//                 }
//               }}
//               // Drag-drop event'lerini her mesh'e bağla
//               onPointerDown={(e) => {
//                 e.stopPropagation();
//                 // useTextureInteraction'ı uyarla: hangi mesh olduğunu geçir
//                 handlePointerDown(e, meshKey); // interaction fonksiyonunu buna göre güncelle
//               }}
//               onPointerMove={(e) => {
//                 e.stopPropagation();
//                 handlePointerMove(e, meshKey);
//               }}
//               onPointerUp={(e) => {
//                 e.stopPropagation();
//                 handlePointerUp(e, meshKey);
//               }}
//               onPointerLeave={(e) => {
//                 handlePointerUp(e, meshKey);
//               }}
//               onLostPointerCapture={(e) => {
//                 handlePointerUp(e, meshKey);
//               }}
//             >
//               <shaderMaterial
//                 ref={(mat) => {
//                   if (mat) {
//                     materialRefs.current.set(meshKey, mat);
//                   } else {
//                     materialRefs.current.delete(meshKey);
//                   }
//                 }}
//                 uniforms={uniforms}
//                 vertexShader={vertexShader}
//                 fragmentShader={fragmentShader}
//               />
//             </mesh>
//           );
//         })}
//       </group>
//     </Suspense>
//   );
// }
