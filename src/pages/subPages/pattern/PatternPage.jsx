import "./patternPage.css";
import Header from "../../../components/ui/Header";
import configStore from "../../../store/configStore";
import { ButtonForPatterns } from "../../../components/buttons/Buttons";
import configuratorStore from "../../../store/configuratorStore";

function PatternPage() {
  console.log("PatternPage");

  const patternPartConfig = configStore((s) => s.patternPartConfig);

  // React'e bağlı bir şekilde pattern items çek
  const patternItems = configuratorStore.getState().getItemsByType("pattern");

  console.log("Pattern items on model:", patternItems);

  return (
    <div className="patternPageContainer">
      <Header title={"Pattern"} subtitle={"Pattern"} />

      {patternPartConfig.map((part) => {
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
            onClick={() => console.log("Clicked:", foundPattern)}
            patternUri={foundPattern?.textureUri}
            isActive={foundPattern?.isActive}
          />
        );
      })}
    </div>
  );
}

export default PatternPage;
