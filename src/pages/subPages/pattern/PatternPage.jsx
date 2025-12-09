import "./patternPage.css";
import Header from "../../../components/ui/Header";
import configStore from "../../../store/configStore";
import { ButtonForPatterns } from "../../../components/buttons/Buttons";
import configuratorStore from "../../../store/configuratorStore";
import { startTransition } from "react";
import { getItems } from "../../../helper/getItems";

function PatternPage() {
  console.log("PatternPage");

  const patternPartConfig = configStore((s) => s.patternPartConfig);

  const updateItem = configuratorStore((state) => state.updateItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const patternItems = itemsOnModel.filter((item) => item.type === "pattern");

  console.log("Pattern items on model:", patternItems);

  const handleOntogglePattern = (id) => {
    startTransition(() => {
      updateItem(id, {
        isActive: !patternItems.find((item) => item.id === id).isActive,
      });
    });
  };

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
            onToggle={() => handleOntogglePattern(foundPattern.id)}
          />
        );
      })}
    </div>
  );
}

export default PatternPage;
