import { color } from "three/tsl";
import Header from "../../../components/ui/Header";
import configuratorStore from "../../../store/configuratorStore";
import "./colorPage.css";
import { ButtonForColors } from "../../../components/buttons/Buttons";
import { useState } from "react";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";

function ColorPage() {
  console.log("ColorPage");
  const { colorsForParts } = configuratorStore();
  const updateColor = configuratorStore((state) => state.updateColor);

  const [selectedPart, setSelectedPart] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(null);

  console.log("colorsConfig:", colorsForParts);

  const handleOnClickPart = (part) => {
    setSelectedPart(part);
    setIsColorPickerOpen(true);
    console.log("Clicked part:", part);
  };

  const handleClickBack = () => {
    setIsColorPickerOpen(false);
    setSelectedPart(null);
  };

  const handleColorApply = (colorConfig, firstColor) => {
    updateColor(selectedPart, { firstColor, isGradient: false });
  };

  return (
    <div className="colorPageContainer">
      <Header title={"Color"} subtitle={"Please Select a Part"} />
      {!isColorPickerOpen &&
        Object.entries(colorsForParts).map(([part, config]) => (
          <ButtonForColors
            key={part}
            color={config.firstColor}
            secondColor={config.secondColor}
            isGradient={config.isGradient}
            title={part}
            onClick={() => handleOnClickPart(part)}
          />
        ))}

      {isColorPickerOpen && (
        <ColorPicker
          handleColorApply={handleColorApply}
          handleClickBack={handleClickBack}
        />
      )}
    </div>
  );
}

export default ColorPage;
