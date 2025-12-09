import { startTransition, useState } from "react";
import Header from "../../../components/ui/Header";
import "./designPage.css";
import configStore from "../../../store/configStore";
import uiStore from "../../../store/uiStore";
import configuratorStore from "../../../store/configuratorStore";
import { toast } from "react-toastify";
import LeftBarPopup from "../../../components/leftBarPopUp/LeftBarPopUp";
import { add } from "three/tsl";
import { ButtonToggle } from "../../../components/buttons/Buttons";

function DesignPage() {
  const { designConfig, bestDesignConfig, desingLocationsUrls } = configStore();
  const { setIsLoading } = uiStore();
  const getMaxId = configuratorStore((state) => state.getMaxId);
  const addItem = configuratorStore((state) => state.addItem);
  const updateItem = configuratorStore((state) => state.updateItem);
  const removeItem = configuratorStore((state) => state.removeItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const designItems = itemsOnModel.filter((item) => item.type === "design");

  console.log("designItems:", designItems);
  const [selectedButton, setSelectedButton] = useState("first");
  const [isDesignPopup, setIsDesignPopup] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  console.log("DesignPage");

  const handleHeaderButtonClick = (key) => {
    setSelectedButton(key);
    console.log(key);
  };

  const handleClickDesign = (design) => {
    console.log("Clicked design with textureUri:", design);
    setSelectedDesign(design);
    setIsDesignPopup(true);
    // setIsLoading(true, "Applying design...");
  };

  const handleApplyOrUpdateDesign = (selectedLocation) => {
    //logic to apply design

    console.log("Gelen seçili location:", selectedLocation);

    if (selectedLocation.length > 0) {
      startTransition(() => {
        if (designItems.length === 0) {
          //add new design items
          addItem({
            id: (getMaxId() + 1).toString(),
            type: "design",
            textureUri: selectedDesign.svgUri,
            texturePngUri: selectedDesign.pngUri,
            layerIndex: 0,
            isActive: true,
            appliedPart: selectedLocation,
            opacity: 1,
          });
        } else {
          //update existing design items
          updateItem(designItems[0].id, {
            textureUri: selectedDesign.svgUri,
            texturePngUri: selectedDesign.pngUri,
            isActive: true,
            appliedPart: selectedLocation,
            opacity: 1,
          });
        }
      });
    }
    setIsDesignPopup(false);
  };

  const handleClickBestDesign = () => {};

  const handleDeleteDesign = (id) => {
    if (designItems.length > 0) {
      startTransition(() => {
        removeItem(id);
      });
    }
  };

  const handleOntoggleDesign = () => {
    console.log("Toggling design active state");
    startTransition(() => {
      updateItem(designItems[0].id, {
        isActive: !designItems[0].isActive,
      });
    });
  };

  const handleTransparencyChange = (e) => {
    const newOpacity = parseFloat(e.target.value);
    startTransition(() => {
      updateItem(designItems[0].id, { opacity: newOpacity });
    });
  };
  //TODO -- check if there are best designs if not remove buttons
  return (
    <div className="designPageContainer">
      <Header
        title={"Design"}
        subtitle={"Choose a design"}
        isButtons={bestDesignConfig.length > 0 && true}
        buttons={{ first: "Designs", second: "Best Designs" }}
        selectedButton={selectedButton}
        onButtonClick={isDesignPopup ? undefined : handleHeaderButtonClick}
      />
      {designItems.length > 0 && !isDesignPopup && (
        <div className="designSettings">
          <div className="designControlsContainer">
            {/* Sol kolon: Toggle */}
            <div className="toggleContainer">
              <span>ON/OFF</span>
              <ButtonToggle
                isActive={designItems[0]?.isActive}
                onToggle={handleOntoggleDesign}
              />
            </div>

            {/* Sağ kolon: Opacity */}
            <div className="opacityContainer">
              <label htmlFor="opacityRange">
                Opacity: {designItems[0].opacity}
              </label>
              <input
                id="opacityRange"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={designItems[0].opacity}
                onChange={(e) => handleTransparencyChange(e)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="designContent">
        {isDesignPopup && (
          <LeftBarPopup
            designLocations={desingLocationsUrls}
            onApply={handleApplyOrUpdateDesign}
            onClickClose={() => setIsDesignPopup(false)}
          />
        )}

        {!isDesignPopup &&
          (selectedButton === "first" ? designConfig : bestDesignConfig).map(
            (design, index) => {
              return (
                <div
                  key={index}
                  className="designItem"
                  onClick={() =>
                    selectedButton === "first"
                      ? handleClickDesign(design)
                      : handleClickBestDesign()
                  }
                >
                  <img
                    src={design.pngUri}
                    alt="design"
                    className="designImage"
                  />
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default DesignPage;
