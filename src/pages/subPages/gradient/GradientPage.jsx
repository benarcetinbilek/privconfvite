import "./gradientPage.css";
import Header from "../../../components/ui/Header";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForColors } from "../../../components/buttons/Buttons";

function GradientPage() {
  console.log("GradientPage");
  const { colorsForParts } = configuratorStore();

  return (
    <div className="gradientPageContainer">
      <Header title={"Gradient"} subtitle={"Gradient"} />
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

export default GradientPage;
