import "./gradientPage.css";
import Header from "../../../components/header/Header";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForColors } from "../../../components/buttons/Buttons";
import { useState } from "react";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";

function GradientPage() {
  console.log("GradientPage");
  const { colorsForParts } = configuratorStore();
  // const colorsForParts = configuratorStore((state) => state.colorsForParts);
  const updateColor = configuratorStore((state) => state.updateColor);

  const [selectedPart, setSelectedPart] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(null);

  const selectedItem = colorsForParts[selectedPart];
  console.log("selecteditem", selectedItem);

  const handleOnClickPart = (part) => {
    setSelectedPart(part);
    setIsColorPickerOpen(true);
    console.log("Clicked part:", part);
  };

  const handleClickBack = () => {
    setIsColorPickerOpen(false);
    setSelectedPart(null);
  };

  const handleColorApply = (key, firsValue, secondValue) => {
    console.log("firsValue", firsValue);
    console.log("secondValue", secondValue);
    console.log("key", key);
    if (
      key === "gradientRotation" ||
      key === "gradientOffset" ||
      key === "gradientTransition"
    ) {
      console.log("GRADIENT features works");
      updateColor(selectedPart, { [key]: firsValue });
    } else {
      updateColor(selectedPart, {
        firstColor: firsValue,
        secondColor: secondValue,
        isGradient: true,
      });
    }
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
          firstColor={selectedItem.firstColor}
          secondColor={selectedItem.secondColor}
          gradientRotation={selectedItem.gradientRotation}
          gradientOffset={selectedItem.gradientOffset}
          gradientTransition={selectedItem.gradientTransition}
          type={"gradient"}
        />
      )}
    </div>
  );
}

export default GradientPage;
