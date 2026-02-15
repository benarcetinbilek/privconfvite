import "./patternPage.css";
import Header from "../../../components/header/Header";
import configStore from "../../../store/configStore";
import { ButtonForPatterns } from "../../../components/buttons/Buttons";
import configuratorStore from "../../../store/configuratorStore";
import { startTransition, useState } from "react";
import { ItemSettings } from "../../../components/itemSettings/ItemSettings";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";

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

  const selectedItem = patternItems.find(
    (item) => item.id === selectedPatternId
  );

  console.log("Pattern items on model:", patternItems);

  const handleOntogglePattern = (id) => {
    const item = patternItems.find((i) => i.id === id);
    if (!item) return;

    startTransition(() => {
      updateItem(id, { isActive: !item.isActive });
    });
  };

  const handleClickBack = (page) => {
    setSelectedPage(page);
    if (page === "pattern") setSelectedPatternId(null);
  };

  const handleApplyorUpdatePattern = (key, firstValue, secondValue) => {
    startTransition(() => {
      if (!selectedPatternId) {
        const newId = (getMaxId() + 1).toString();
        addItem({
          id: newId,
          type: "pattern",
          textureUri: firstValue,
          scale: 1,
          rotation: 0,
          opacity: 1,
          appliedPart: selectedPart,
          firstColor: "#000000",
          secondColor: "#000000",
          isGradient: false,
          layerIndex: newId,
          isActive: true,
          gradientRotation: 0,
          gradientOffset: 0,
          gradientTransition: 0,
        });
        setSelectedPatternId(newId);
        return;
      }

      if (key === "delete") {
        removeItem(selectedPatternId);
        setSelectedPatternId(null);
        return;
      }

      if (key === "gradient") {
        updateItem(selectedPatternId, {
          firstColor: firstValue,
          secondColor: secondValue,
          isGradient: true,
          isActive: true,
        });
        return;
      }

      if (key === "color") {
        updateItem(selectedPatternId, {
          firstColor: firstValue,
          isGradient: false,
          isActive: true,
        });
        return;
      }

      updateItem(selectedPatternId, { [key]: firstValue, isActive: true });
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
              onToggle={() =>
                foundPattern?.id && handleOntogglePattern(foundPattern.id)
              }
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
          item={selectedItem}
          handleSelectedPage={setSelectedPage}
        />
      )}

      {(selectedPage === "pattern color" ||
        selectedPage === "pattern gradient") && (
        <ColorPicker
          handleColorApply={handleApplyorUpdatePattern}
          handleClickBack={() => handleClickBack("pattern settings")}
          firstColor={selectedItem?.firstColor}
          secondColor={selectedItem?.secondColor}
          type={selectedPage === "pattern gradient" ? "gradient" : "color"}
        />
      )}
    </div>
  );
}

export default PatternPage;
