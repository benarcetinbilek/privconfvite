import "./patternPage.css";
import Header from "../../../components/header/Header";
import configStore from "../../../store/configStore";
import { ButtonForPatterns } from "../../../components/buttons/Buttons";
import configuratorStore from "../../../store/configuratorStore";
import { startTransition, useState } from "react";
import { getItems } from "../../../helper/getItems";
import { ItemSettings } from "../../../components/itemSettings/ItemSettings";

function PatternPage() {
  console.log("PatternPage");

  const patternPartConfig = configStore((s) => s.patternPartConfig);
  const patternUrls = configStore((s) => s.patternUrls);

  const getMaxId = configuratorStore((state) => state.getMaxId);
  const updateItem = configuratorStore((state) => state.updateItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const patternItems = itemsOnModel.filter((item) => item.type === "pattern");
  const addItem = configuratorStore((state) => state.addItem);
  const removeItem = configuratorStore((state) => state.removeItem);

  const [selectedPage, setSelectedPage] = useState("pattern");
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  console.log("Pattern items on model:", patternItems);

  const handleOntogglePattern = (id) => {
    startTransition(() => {
      updateItem(id, {
        isActive: !patternItems.find((item) => item.id === id).isActive,
      });
    });
  };

  const handleClickBack = (page) => {
    setSelectedPage(page);
    if (page === "pattern") setSelectedPatternId(null);
  };
  const handleApplyorUpdatePattern = (key, value) => {
    console.log("handleApplyorUpdatePattern", key, value);
    console.log("selectedPatternId", selectedPatternId);

    startTransition(() => {
      if (selectedPatternId && key === "delete") {
        console.log("handleApplyorUpdatePatterndelete", key, value);
        removeItem(selectedPatternId);
        setSelectedPatternId(null);
        console.log("items", patternItems);
      } else if (selectedPatternId) {
        updateItem(selectedPatternId, { [key]: value, isActive: true });
      } else {
        const newId = (getMaxId() + 1).toString();
        addItem({
          id: newId,
          type: "pattern",
          textureUri: value,
          scale: 1,
          rotation: 0,
          appliedPart: selectedPart,
          firstColor: "#000000ff",
          secondColor: "#000000ff",
          isGradient: false,
          layerIndex: (getMaxId() + 1).toString(),
          isActive: true,
        });
        setSelectedPatternId(newId);
      }
    });
  };

  return (
    <div className="patternPageContainer">
      <Header title={"Pattern"} subtitle={"Pattern"} />

      {selectedPage === "pattern" &&
        patternPartConfig.map((part) => {
          const foundPattern = patternItems.find(
            (item) => item.appliedPart === part
          );
          console.log("Found pattern for part", part, ":", foundPattern);
          return (
            <ButtonForPatterns
              key={part}
              color={foundPattern?.firstColor}
              secondColor={foundPattern?.secondColor}
              isGradient={foundPattern?.isGradient}
              title={part}
              onClick={() => {
                setSelectedPage("pattern settings");
                setSelectedPatternId(foundPattern?.id || null);
                setSelectedPart(part);
                console.log("asdasd");
              }}
              patternUri={foundPattern?.textureUri}
              isActive={foundPattern?.isActive}
              onToggle={() => handleOntogglePattern(foundPattern.id)}
            />
          );
        })}

      {selectedPage === "pattern settings" && (
        <ItemSettings
          type={"pattern"}
          handleClickBack={() => handleClickBack("pattern")}
          handleSettingsApply={handleApplyorUpdatePattern}
          title={"Pattern"}
          assets={patternUrls}
          item={patternItems.find((item) => item.id === selectedPatternId)}
        />
      )}

      {selectedPage === "pattern color" && (
        <ColorPicker
          handleColorApply={handleColorApply}
          handleClickBack={() => handleClickBack("pattern settings")}
          firstColor={colorsForParts[selectedPart].firstColor}
        />
      )}
    </div>
  );
}

export default PatternPage;
