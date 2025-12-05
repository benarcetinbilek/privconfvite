import { useEffect, useMemo, useState } from "react";
import { fragmentShader } from "../../shaders/fragmentShader";
import { vertexShader } from "../../shaders/VertexShader";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Vector3, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import configuratorStore from "../../store/configuratorStore";

export function ModelViewer() {
  const { setGeometry } = configuratorStore();
  const [startTime] = useState(() => performance.now()); // başlama zamanı

  const { nodes } = useGLTF("/model.glb");
  console.log("nodes", nodes);
  const normalMapTexture = useLoader(TextureLoader, "/normalMap.png");
  normalMapTexture.flipY = false;

  useEffect(() => {
    const endTime = performance.now(); // yükleme tamamlandığı an
    const duration = ((endTime - startTime) / 1000).toFixed(2); // saniye cinsinden
    console.log("ModelViewer loaded in", duration, "seconds", nodes);
    setGeometry(nodes.Scene.children[0].geometry);
  }, [nodes]);

  return (
    <Suspense fallback={<p>wait please</p>}>
      <mesh geometry={nodes.Scene.children[0].geometry} position={[0, -1.3, 0]}>
        <shaderMaterial
          uniforms={{
            blendFactor: { value: 1.0 },
            lightPosition: { value: new Vector3(2.0, 2.0, 2.0) },
            normalMap: { value: normalMapTexture },
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
//   const { nodes } = useGLTF("/spized.glb");
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
//   const { nodes } = useGLTF("/spized.glb");

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
