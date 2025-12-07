import "./layerOrder.css";
import Header from "../../../components/ui/Header";
import configuratorStore from "../../../store/configuratorStore";
import {
  ButtonForLogo,
  ButtonForPatterns,
  ButtonForSticker,
  ButtonForText,
} from "../../../components/buttons/Buttons";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "../../../components/sortableItem/SortableItem";

function LayerOrder() {
  const allItems = configuratorStore.getState().getAllItems();
  const [items, setItems] = useState([...allItems]);
  console.log("Updated layer order in store:", allItems);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const updateOrderInStore = (newOrder) => {
    configuratorStore.getState().setLayerOrder(newOrder);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);

    // local state güncelle
    setItems(reordered);

    // sadece ID listesi lazım
    const orderedIds = reordered.map((i) => i.id);

    // store’a sırayı gönder
    configuratorStore.getState().reorderLayers(orderedIds);
    console.log("Updated layer order in store:", allItems);
  };

  const renderItem = (item) => {
    switch (item.type) {
      case "pattern":
        return (
          <ButtonForPatterns
            title={item.appliedPart}
            patternUri={item.textureUri}
            isLayerOrder={true}
          />
        );

      case "text":
        return <ButtonForText title={item.textContent} isLayerOrder={true} />;

      case "sticker":
        return (
          <ButtonForSticker
            title={item.stickerName}
            stickerUri={item.textureUri}
            isLayerOrder={true}
          />
        );

      case "logo":
        return (
          <ButtonForLogo
            title={item.logoName}
            logoUri={item.textureUri}
            isLayerOrder={true}
          />
        );

      case "design":
        return (
          <ButtonForLogo
            title="Design"
            logoUri={item.texturePngUri}
            isLayerOrder={true}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="layerOrderContainer">
      <Header title="Layer Order" subtitle="Layer Order" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="layerScrollArea">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {renderItem(item)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default LayerOrder;
