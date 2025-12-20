import "./gradientPage.css";
import Header from "../../../components/header/Header";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForColors } from "../../../components/buttons/Buttons";
import { useState } from "react";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";

function GradientPage() {
  console.log("GradientPage");
  const { colorsForParts } = configuratorStore();
  const updateColor = configuratorStore((state) => state.updateColor);

  const [selectedPart, setSelectedPart] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(null);

  const handleOnClickPart = (part) => {
    setSelectedPart(part);
    setIsColorPickerOpen(true);
    console.log("Clicked part:", part);
  };

  const handleClickBack = () => {
    setIsColorPickerOpen(false);
    setSelectedPart(null);
  };

  const handleColorApply = (firstColor, secondColor) => {
    console.log("firstcolor", firstColor);
    console.log("secondcolor", secondColor);
    updateColor(selectedPart, { firstColor, secondColor, isGradient: true });
  };

  return (
    <div className="gradientPageContainer">
      <Header
        title={"Gradient"}
        subtitle={
          isColorPickerOpen ? "Gradient Color Picker" : "Please Select a part"
        }
      />
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
          firstColor={colorsForParts[selectedPart].firstColor}
          secondColor={colorsForParts[selectedPart].secondColor}
          isGradient={true}
        />
      )}
    </div>
  );
}

export default GradientPage;
