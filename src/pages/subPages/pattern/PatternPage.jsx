import "./patternPage.css";
import Header from "../../../components/ui/Header";
import configStore from "../../../store/configStore";
import { ButtonForPatterns } from "../../../components/buttons/Buttons";

function PatternPage() {
  console.log("PatternPage");
  const { patternPartConfig } = configStore();

  return (
    <div className="patternPageContainer">
      {" "}
      <Header title={"Pattern"} subtitle={"Pattern"} />
      {patternPartConfig.map((part, config) => (
        <ButtonForPatterns
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

export default PatternPage;
