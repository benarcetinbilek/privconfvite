import "./stickerPage.css";
import AssetDrawer from "../../../components/assetDrawer/AssetDrawer";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForSticker } from "../../../components/buttons/Buttons";
import configStore from "../../../store/configStore";
import Header from "../../../components/header/Header";
import { startTransition, useState } from "react";
import { ItemSettings } from "../../../components/itemSettings/ItemSettings";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";
import LeftBarPopup from "../../../components/leftBarPopUp/LeftBarPopUp";

function StickerPage() {
  //TODO -- sticker name could be a must in state otherwise layer order might not gonna work
  const { commonLocationsUrls } = configStore();
  console.log("StickerPage");
  const stickerAssets = configStore.getState().getAllStickers();

  const getMaxId = configuratorStore((state) => state.getMaxId);
  const updateItem = configuratorStore((state) => state.updateItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const stickerItems = itemsOnModel.filter((item) => item.type === "sticker");
  const addItem = configuratorStore((state) => state.addItem);
  const removeItem = configuratorStore((state) => state.removeItem);

  console.log("sticker items on model:", stickerItems);

  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [selectedPage, setSelectedPage] = useState("sticker");
  const [selectedTextureUri, setSelectedTextureUri] = useState(null);
  console.log("selectedtexture", selectedTextureUri);

  const selectedItem = stickerItems.find(
    (item) => item.id === selectedStickerId,
  );

  const handleClickBack = (page) => {
    setSelectedPage(page);
  };

  const handleOntoggleSticker = (id) => {
    console.log("ontogglesticker", id);

    const item = stickerItems.find((i) => i.id === id);
    if (!item) return;
    console.log("stickeritem", item);
    startTransition(() => {
      updateItem(id, { isActive: !item.isActive });
    });
  };

  const handleApplyorUpdateSticker = (key, firstValue, secondValue) => {
    console.log("asdfasdf", key, firstValue, secondValue);
    startTransition(() => {
      if (!selectedStickerId) {
        const newId = (getMaxId() + 1).toString();
        addItem({
          id: newId,
          type: "sticker",
          textureUri: selectedTextureUri,
          scale: 1,
          rotation: 0,
          // x: firstValue,
          x: 0.43,
          // y: secondValue,
          y: 0.15,
          opacity: 1,
          firstColor: "#000000",
          secondColor: "#000000",
          isGradient: false,
          gradientRotation: 0,
          gradientOffset: 0,
          gradientTransition: 0,
          layerIndex: newId,
          isActive: true,
          isLocked: false,
        });
        setSelectedTextureUri(null);
        setSelectedPage("sticker");
        //TODO -- here must be model turner function model needs to turn to correct location
        return;
      }

      if (key === "delete") {
        removeItem(selectedStickerId);
        setSelectedStickerId(null);
        setSelectedPage("sticker");
        return;
      }

      if (key === "gradient") {
        updateItem(selectedStickerId, {
          firstColor: firstValue,
          secondColor: secondValue,
          isGradient: true,
          isActive: true,
        });
        return;
      }

      if (key === "color") {
        updateItem(selectedStickerId, {
          firstColor: firstValue,
          isGradient: false,
          isActive: true,
        });
        return;
      }
      updateItem(selectedStickerId, { [key]: firstValue, isActive: true });
    });
  };

  return (
    <div className="stickerPageContainer">
      <Header title={"Sticker"} subtitle={"Sticker"} />
      {selectedPage === "sticker" && (
        <AssetDrawer
          assets={stickerAssets}
          selectedItems={stickerItems}
          onTextureApply={(key, texture) => {
            setSelectedTextureUri(texture);
            setSelectedPage("sticker location");
            console.log("qweqweqwe");
          }}
        />
      )}
      {selectedPage === "sticker" && (
        <div className="stickerScrollArea">
          <hr className="stickerHr" />
          {stickerItems.map((item, i) => (
            <ButtonForSticker
              key={item.id}
              title={`Sticker ${i + 1}`}
              stickerUri={item.textureUri}
              onClick={() => {
                setSelectedStickerId(item.id);
                setSelectedPage("sticker settings");
              }}
              isActive={item.isActive}
              onToggle={() => handleOntoggleSticker(item.id)}
            />
          ))}
        </div>
      )}
      {selectedPage === "sticker location" && (
        <LeftBarPopup
          assets={commonLocationsUrls}
          onApply={handleApplyorUpdateSticker}
          handleClickBack={() => {
            setSelectedPage("sticker");
            setSelectedTextureUri(null);
          }}
          type={"text"}
        />
      )}

      {selectedPage === "sticker settings" && (
        <ItemSettings
          type={"sticker"}
          handleClickBack={() => {
            handleClickBack("sticker");
            setSelectedStickerId(null);
          }}
          handleSettingsApply={handleApplyorUpdateSticker}
          title={"sticker"}
          item={selectedItem}
          handleSelectedPage={setSelectedPage}
        />
      )}

      {(selectedPage === "sticker color" ||
        selectedPage === "sticker gradient") && (
        <ColorPicker
          handleColorApply={handleApplyorUpdateSticker}
          handleClickBack={() => handleClickBack("sticker settings")}
          firstColor={selectedItem?.firstColor}
          secondColor={selectedItem?.secondColor}
          type={selectedPage === "sticker gradient" ? "gradient" : "color"}
        />
      )}
    </div>
  );
}

export default StickerPage;
