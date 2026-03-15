import "./canvasForModel.css";

//necessary modules import
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

//function import
import { ModelViewer } from "../../utils/modelViewer/ModelViewer";
import configuratorStore from "../../store/configuratorStore";

function CanvasForModel() {
  const isDraggingTexture = configuratorStore((s) => s.isDraggingTexture);

  return (
    <div className="canvasContainer">
      <Canvas
        camera={{
          position: [0.0, 0.0, 0.8],
          fov: 50,
          up: [0, 3, 0],
          near: 0.1,
          far: 10000,
        }}
        gl={{ preserveDrawingBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ModelViewer />
        <OrbitControls
          makeDefault
          enabled={!isDraggingTexture}
          enableZoom={true}
          // enablePan={false} // Disable right-click panning
          // minDistance={0.6} // Prevent zooming too close
          // maxDistance={1.1} // Prevent zooming too far
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            // RIGHT: null, // Disable right-click movement
            RIGHT: THREE.MOUSE.PAN, // Disable right-click movement
          }}
        />
      </Canvas>
    </div>
  );
}

export default CanvasForModel;
