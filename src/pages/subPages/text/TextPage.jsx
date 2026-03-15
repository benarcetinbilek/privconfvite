import "./textPage.css";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForText } from "../../../components/buttons/Buttons";
import Header from "../../../components/header/Header";
import { startTransition, useState } from "react";
import LeftBarPopup from "../../../components/leftBarPopUp/LeftBarPopUp";
import configStore from "../../../store/configStore";
import { ItemSettings } from "../../../components/itemSettings/ItemSettings";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";
import { FontChange } from "../../../components/fontChange/FontChange";

function TextPage() {
  console.log("TextPage");
  const { commonLocationsUrls } = configStore();

  const getMaxId = configuratorStore((state) => state.getMaxId);
  const updateItem = configuratorStore((state) => state.updateItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const textItems = itemsOnModel.filter((item) => item.type === "text");
  const addItem = configuratorStore((state) => state.addItem);
  const removeItem = configuratorStore((state) => state.removeItem);

  console.log("Text items on model:", textItems);

  const [selectedTextId, setSelectedTextId] = useState(null);
  const [selectedPage, setSelectedPage] = useState("text");
  const [text, setText] = useState("");
  const isTextValid = text.trim().length > 0;

  const selectedItem = textItems.find((item) => item.id === selectedTextId);

  const colorType =
    selectedPage === "text color"
      ? "color"
      : selectedPage === "text gradient"
        ? "gradient"
        : selectedPage === "text color background"
          ? "backgroundColor"
          : selectedPage === "text color outline"
            ? "outlineColor"
            : null;

  console.log("selecctedpage", selectedPage);
  console.log("colortype", colorType);
  const handleClickBack = (page) => {
    setSelectedPage(page);
  };

  const handleOntoggleText = (id) => {
    console.log("ontoggletext", id);

    const item = textItems.find((i) => i.id === id);
    if (!item) return;

    startTransition(() => {
      updateItem(id, { isActive: !item.isActive });
    });
  };

  const handleApplyorUpdateText = (key, firstValue, secondValue) => {
    console.log("asdfasdf", key, firstValue, secondValue);
    startTransition(() => {
      if (key === "add") {
        const newId = (getMaxId() + 1).toString();
        addItem({
          id: newId,
          type: "text",
          textContent: text.trim(),
          font: "arial",
          scale: 1,
          rotation: 0,
          // x: firstValue,
          x: 0.43,
          // y: secondValue,
          y: 0.15,
          opacity: 1,
          firstColor: "#000000",
          secondColor: "#000000",
          outlineColor: null,
          backgroundColor: null,
          isGradient: false,
          gradientRotation: 0,
          gradientOffset: 0,
          gradientTransition: 0,
          isCurved: false,
          curvedAngle: 0,
          layerIndex: newId,
          isActive: true,
          isLocked: false,
        });
        //TODO -- here must be model turner function model needs to turn to correct location
        setSelectedPage("text");
        return;
      }

      if (key === "delete") {
        removeItem(selectedTextId);
        setSelectedTextId(null);
        setSelectedPage("text");
        return;
      }

      if (key === "gradient") {
        updateItem(selectedTextId, {
          firstColor: firstValue,
          secondColor: secondValue,
          isGradient: true,
          isActive: true,
        });
        return;
      }

      if (key === "color") {
        updateItem(selectedTextId, {
          firstColor: firstValue,
          isGradient: false,
          isActive: true,
        });
        return;
      }
      console;
      updateItem(selectedTextId, { [key]: firstValue, isActive: true });
    });
  };
  console.log("selectedpage", selectedPage);
  return (
    <div className="textPageContainer">
      <Header title="Text" subtitle="Text" />

      {selectedPage === "text" && (
        <div>
          <input
            className="textPageInput"
            type="text"
            placeholder="Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => isTextValid && setSelectedPage("text locations")}
            className={`textPageAddButton ${isTextValid ? "active" : ""}`}
            disabled={!isTextValid}
          >
            Add Text
          </button>

          <hr className="textHr" />

          {/* Scrollable section */}

          {textItems.length > 0 &&
            textItems.map((item) => (
              <div className="textScrollArea">
                <ButtonForText
                  key={item.id}
                  title={item.textContent}
                  isActive={item.isActive}
                  onToggle={() => handleOntoggleText(item.id, item.isActive)}
                  onClick={() => {
                    setSelectedPage("text settings");
                    setSelectedTextId(item?.id || null);
                  }}
                />
              </div>
            ))}
        </div>
      )}

      {selectedPage === "text locations" && (
        <LeftBarPopup
          assets={commonLocationsUrls}
          onApply={handleApplyorUpdateText}
          handleClickBack={() => setSelectedPage("text")}
          type={"text"}
        />
      )}

      {selectedPage === "text settings" && (
        <ItemSettings
          type={"text"}
          handleClickBack={() => handleClickBack("text")}
          handleSettingsApply={handleApplyorUpdateText}
          title={"Text"}
          item={selectedItem}
          handleSelectedPage={setSelectedPage}
        />
      )}

      {colorType && (
        <ColorPicker
          handleColorApply={handleApplyorUpdateText}
          handleClickBack={() => handleClickBack("text settings")}
          firstColor={selectedItem?.firstColor}
          secondColor={selectedItem?.secondColor}
          type={colorType}
        />
      )}

      {selectedPage === "text font" && (
        <FontChange
          assets={"TODO -- get fonts"}
          currentFont={selectedItem.font}
        />
      )}
    </div>
  );
}

export default TextPage;
