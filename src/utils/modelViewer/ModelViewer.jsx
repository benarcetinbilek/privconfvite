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
} from "../canvasses/canvasForColor";
import { useFrame } from "@react-three/fiber";

export function ModelViewer() {
  const { setGeometry, uvConfig } = configStore();
  const { colorsForParts } = configuratorStore();

  const [startTime] = useState(() => performance.now());

  const { nodes } = useGLTF("/model.glb");
  const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
  normalMapTexture.flipY = false;

  const materialRef = useRef();

  // texture'ı BİR KERE yarat
  //TODO -- you may change canvas size for smaller one for better performance
  //TODO -- changing color via sketchpicker rerenders model twice

  const colorPack = useMemo(() => createColorCanvasTexture(), []);

  // uvConfig veya colorsForParts değişince canvas'ı redraw et
  useEffect(() => {
    if (!uvConfig || !colorsForParts) return;
    console.log("useefect modelviewer colorpack");
    const t0 = performance.now();
    drawColorsToCanvas(colorPack, uvConfig, colorsForParts);
    const t1 = performance.now();

    console.log(`[COLOR] draw took ${(t1 - t0).toFixed(2)} ms`);
    colorPack.texture.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.canvasToColor.value = colorPack.texture;
    }
  }, [uvConfig, colorsForParts, colorPack]);

  useEffect(() => {
    const endTime = performance.now();
    console.log(
      "ModelViewer loaded in",
      ((endTime - startTime) / 1000).toFixed(2),
      "seconds"
    );
    setGeometry(nodes.Scene.children[0].geometry);
  }, [nodes, setGeometry, startTime]);

  const acc = { sum: 0, n: 0, last: performance.now() };

  useFrame(() => {
    const now = performance.now();
    const dt = now - acc.last;
    acc.last = now;

    acc.sum += dt;
    acc.n++;
    if (acc.n % 60 === 0) {
      const avgMs = acc.sum / acc.n;
      const fps = 1000 / avgMs;
      console.log(`avg frame ${avgMs.toFixed(2)} ms | ~${fps.toFixed(1)} fps`);
    }
  });
  const { gl } = useThree();
  useEffect(() => {
    const id = setInterval(() => {
      const info = gl.info;
      console.log(
        "calls",
        info.render.calls,
        "tris",
        info.render.triangles,
        "textures",
        info.memory.textures,
        "geometries",
        info.memory.geometries
      );
    }, 2000);

    return () => clearInterval(id);
  }, [gl]);

  return (
    <Suspense fallback={<p>wait please</p>}>
      <mesh geometry={nodes.Scene.children[0].geometry} position={[0, -1.3, 0]}>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            blendFactor: { value: 1.0 },
            lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
            normalMap: { value: normalMapTexture },
            canvasToColor: { value: colorPack.texture },
          }}
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
