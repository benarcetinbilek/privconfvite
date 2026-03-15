/**
 * Hook for texture selection, drag, and button actions on the 3D model.
 * Uses raycast UV for hit detection.
 */

import { useCallback, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import configuratorStore from "../../store/configuratorStore";
import {
  getTextureItemBounds,
  isPointInTextureBounds,
  getButtonAtPoint,
} from "./textureBounds";

const DRAGGABLE_TYPES = ["text", "sticker", "logo"];

function getDraggableItems(itemsOnModel) {
  return itemsOnModel
    .filter(
      (i) =>
        DRAGGABLE_TYPES.includes(i.type) &&
        i?.isActive !== false &&
        i?.isLocked !== true
    )
    .sort((a, b) => Number(b.layerIndex ?? 0) - Number(a.layerIndex ?? 0));
}

function hitTestItems(uv, itemsOnModel, size = 1024) {
  const items = getDraggableItems(itemsOnModel);
  const u = uv.x;
  const v = uv.y;
  for (const item of items) {
    const bounds = getTextureItemBounds(item, size);
    if (bounds && isPointInTextureBounds(u, v, bounds)) {
      return item;
    }
  }
  return null;
}

function hitTestButton(uv, item, size = 1024) {
  const bounds = getTextureItemBounds(item, size);
  return getButtonAtPoint(uv.x, uv.y, bounds, 32, size);
}

export function useTextureInteraction(meshRef, textureSize = 1024) {
  const { camera, size, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const isDragging = useRef(false);
  const dragTargetId = useRef(null);
  const activeButtonRef = useRef(null);
  const buttonDragStartRef = useRef({ rotation: 0, scale: 1, u: 0, v: 0 });

  const getPointerUVFromEvent = useCallback((event) => {
    if (event?.intersections?.length > 0) {
      const hit = event.intersections[0];
      if (hit.uv) {
        return new THREE.Vector2(hit.uv.x, 1 - hit.uv.y);
      }
    }
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointer.current.set(x, y);
    raycaster.current.setFromCamera(pointer.current, camera);
    const mesh = meshRef?.current;
    if (!mesh) return null;
    const intersects = raycaster.current.intersectObject(mesh);
    if (intersects.length === 0) return null;
    const hit = intersects[0];
    if (!hit.uv) return null;
    return new THREE.Vector2(hit.uv.x, 1 - hit.uv.y);
  }, [camera, gl, meshRef]);

  const getPointerUV = useCallback(
    (event) => {
      const uv = getPointerUVFromEvent(event);
      if (uv) return uv;
      const nativeEvent = event?.nativeEvent || event;
      if (nativeEvent !== event) return getPointerUVFromEvent(nativeEvent);
      return null;
    },
    [getPointerUVFromEvent]
  );

  const handlePointerDown = useCallback(
    (event) => {
      event.stopPropagation();
      event.target.setPointerCapture?.(event.pointerId);
      const uv = getPointerUV(event);
      if (!uv) return;

      const { itemsOnModel, selectedTextureId, setSelectedTextureId, updateItem, removeItem, addItem, getMaxId } =
        configuratorStore.getState();

      if (selectedTextureId) {
        const selectedItem = itemsOnModel.find((i) => i.id === selectedTextureId);
        if (selectedItem) {
          const button = hitTestButton(uv, selectedItem, textureSize);
          if (button) {
            if (button === "delete") {
              removeItem(selectedTextureId);
              setSelectedTextureId(null);
              return;
            }
            if (button === "duplicate") {
              const copy = { ...selectedItem };
              const newId = (getMaxId() + 1).toString();
              copy.id = newId;
              copy.layerIndex =
                Math.max(...itemsOnModel.map((i) => Number(i.layerIndex ?? 0)), 0) + 1;
              copy.x = Number(copy.x ?? 0.5) + 0.02;
              copy.y = Number(copy.y ?? 0.5) + 0.02;
              addItem(copy);
              setSelectedTextureId(newId);
              return;
            }
            if (button === "rotate" || button === "resize") {
              activeButtonRef.current = button;
              buttonDragStartRef.current = {
                rotation: Number(selectedItem.rotation ?? 0),
                scale: Number(selectedItem.scale ?? 1),
                u: uv.x,
                v: uv.y,
                centerU: selectedItem.x ?? 0.5,
                centerV: selectedItem.y ?? 0.5,
              };
              dragTargetId.current = selectedTextureId;
              configuratorStore.getState().setDraggingTexture(true);
              return;
            }
          }
        }
      }

      const hitItem = hitTestItems(uv, itemsOnModel, textureSize);
      if (hitItem) {
        setSelectedTextureId(hitItem.id);
        isDragging.current = true;
        dragTargetId.current = hitItem.id;
        configuratorStore.getState().setDraggingTexture(true);
      } else {
        setSelectedTextureId(null);
      }
    },
    [getPointerUV, textureSize]
  );

  const handlePointerMove = useCallback(
    (event) => {
      const uv = getPointerUV(event);
      if (!uv) return;

      const activeButton = activeButtonRef.current;
      if (activeButton && dragTargetId.current) {
        const start = buttonDragStartRef.current;
        const { updateItem } = configuratorStore.getState();

        if (activeButton === "rotate") {
          const dx = uv.x - start.centerU;
          const dy = uv.y - start.centerV;
          const du = start.u - start.centerU;
          const dv = start.v - start.centerV;
          const angleStart = Math.atan2(dv, du);
          const angleNow = Math.atan2(uv.y - start.centerV, uv.x - start.centerU);
          let deltaDeg = ((angleNow - angleStart) * 180) / Math.PI;
          const newRotation = start.rotation + deltaDeg;
          updateItem(dragTargetId.current, { rotation: newRotation });
          buttonDragStartRef.current = {
            ...start,
            rotation: newRotation,
            u: uv.x,
            v: uv.y,
          };
          return;
        }

        if (activeButton === "resize") {
          const dx = uv.x - start.centerU;
          const dy = uv.y - start.centerV;
          const du = start.u - start.centerU;
          const dv = start.v - start.centerV;
          const distStart = Math.sqrt(du * du + dv * dv) || 0.001;
          const distNow = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const ratio = distNow / distStart;
          const newScale = Math.min(
            2,
            Math.max(0.2, start.scale * ratio)
          );
          updateItem(dragTargetId.current, { scale: newScale });
          buttonDragStartRef.current = {
            ...start,
            scale: newScale,
            u: uv.x,
            v: uv.y,
          };
          return;
        }
      }

      if (!isDragging.current || !dragTargetId.current) return;

      configuratorStore.getState().updateItem(dragTargetId.current, {
        x: Math.max(0.01, Math.min(0.99, uv.x)),
        y: Math.max(0.01, Math.min(0.99, uv.y)),
      });
    },
    [getPointerUV]
  );

  const handlePointerUp = useCallback(() => {
    if (activeButtonRef.current) {
      activeButtonRef.current = null;
    }
    isDragging.current = false;
    dragTargetId.current = null;
    configuratorStore.getState().setDraggingTexture(false);
  }, []);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
