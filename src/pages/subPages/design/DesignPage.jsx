import { startTransition, useState } from "react";
import Header from "../../../components/ui/Header";
import "./designPage.css";
import configStore from "../../../store/configStore";
import uiStore from "../../../store/uiStore";
import configuratorStore from "../../../store/configuratorStore";
import { toast } from "react-toastify";
import LeftBarPopup from "../../../components/leftBarPopUp/LeftBarPopUp";
import { add } from "three/tsl";

function DesignPage() {
  const { designConfig, bestDesignConfig, desingLocationsUrls } = configStore();
  const { setIsLoading } = uiStore();
  const getMaxId = configuratorStore((state) => state.getMaxId);
  const addItem = configuratorStore((state) => state.addItem);
  const updateItem = configuratorStore((state) => state.updateItem);
  const removeItem = configuratorStore((state) => state.removeItem);
  const designItems = configuratorStore.getState().getItemsByType("design");

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

  const handleApplyDesign = (selectedLocation) => {
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
          });
        } else {
          //update existing design items
          updateItem(designItems[0].id, {
            textureUri: selectedDesign.svgUri,
            texturePngUri: selectedDesign.pngUri,
            isActive: true,
            appliedPart: selectedLocation,
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
      <div className="designContent">
        {isDesignPopup && (
          <LeftBarPopup
            designLocations={desingLocationsUrls}
            onApply={handleApplyDesign}
          />
        )}

        {!isDesignPopup &&
          (selectedButton === "first" ? designConfig : bestDesignConfig).map(
            (design, index) => {
              const isSelected = selectedDesign?.svgUri === design.svgUri;

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

                  {isSelected && (
                    <button
                      className="deleteButton"
                      onClick={(e) => {
                        e.stopPropagation(); // tıklamanın div onClick’ine gitmesini engelle
                        handleDeleteDesign(design);
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default DesignPage;
