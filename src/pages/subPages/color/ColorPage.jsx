import { color } from "three/tsl";
import Header from "../../../components/ui/Header";
import configuratorStore from "../../../store/configuratorStore";
import "./colorPage.css";
import { ButtonForColors } from "../../../components/buttons/Buttons";

function ColorPage() {
  console.log("ColorPage");
  const { colorsForParts } = configuratorStore();

  console.log("colorsConfig:", colorsForParts);

  return (
    <div className="colorPageContainer">
      <Header title={"Color"} subtitle={"Color"} />
      {Object.entries(colorsForParts).map(([part, config]) => (
        <ButtonForColors
          key={part}
          color={config.firstColor}
          secondColor={config.secondColor}
          isGradient={config.isGradient}
          title={part}
          onClick={() => console.log("Clicked:", part)}
        />
      ))}
    </div>
  );
}

export default ColorPage;
