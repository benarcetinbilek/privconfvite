import "./logoPage.css";
import Header from "../../../components/header/Header";
import UploadBox from "../../../components/uploadBox/UploadBox";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForLogo } from "../../../components/buttons/Buttons";
import { startTransition, useState } from "react";
import { ItemSettings } from "../../../components/itemSettings/ItemSettings";
import { ColorPicker } from "../../../components/colorPicker/ColorPicker";
import configStore from "../../../store/configStore";
import LeftBarPopup from "../../../components/leftBarPopUp/LeftBarPopUp";

function LogoPage() {
  console.log("LogoPage");
  const { commonLocationsUrls } = configStore();

  const getMaxId = configuratorStore((state) => state.getMaxId);
  const updateItem = configuratorStore((state) => state.updateItem);
  const itemsOnModel = configuratorStore((state) => state.itemsOnModel);
  const logoItems = itemsOnModel.filter((item) => item.type === "logo");
  const addItem = configuratorStore((state) => state.addItem);
  const removeItem = configuratorStore((state) => state.removeItem);

  console.log("logo items on model:", logoItems);

  const [selectedLogoId, setSelectedLogoId] = useState(null);
  const [selectedPage, setSelectedPage] = useState("logo");
  const [selectedTextureUri, setSelectedTextureUri] = useState(null);

  const selectedItem = logoItems.find((item) => item.id === selectedLogoId);
  console.log("selected item", selectedItem);
  const handleClickBack = (page) => {
    setSelectedPage(page);
  };

  const handleOntoggleLogo = (id) => {
    console.log("ontogglesticker", id);

    const item = logoItems.find((i) => i.id === id);
    if (!item) return;
    console.log("stickeritem", item);
    startTransition(() => {
      updateItem(id, { isActive: !item.isActive });
    });
  };

  const handleApplyorUpdateLogo = (key, firstValue, secondValue) => {
    console.log("asdfasdf", key, firstValue, secondValue);
    startTransition(() => {
      if (!selectedLogoId) {
        const newId = (getMaxId() + 1).toString();
        console.log("logologo", key, firstValue, secondValue);
        addItem({
          id: newId,
          type: "logo",
          textureUri: selectedTextureUri,
          scale: 1,
          rotation: 0,
          // x: firstValue,
          // y: secondValue,
          x: 0.43,
          y: 0.15,
          opacity: 1,
          layerIndex: newId,
          isActive: true,
        });
        setSelectedTextureUri(null);
        setSelectedPage("logo");
        //TODO -- here must be model turner function model needs to turn to correct location
        return;
      }

      if (key === "delete") {
        removeItem(selectedLogoId);
        setSelectedLogoId(null);
        setSelectedPage("logo");
        return;
      }

      if (key === "gradient") {
        updateItem(selectedLogoId, {
          firstColor: firstValue,
          secondColor: secondValue,
          isGradient: true,
          isActive: true,
        });
        return;
      }

      if (key === "color") {
        updateItem(selectedLogoId, {
          firstColor: firstValue,
          isGradient: false,
          isActive: true,
        });
        return;
      }

      updateItem(selectedLogoId, { [key]: firstValue, isActive: true });
    });
  };

  return (
    <div className="logoPageContainer">
      <Header title="Logo" subtitle="Logo" />

      {selectedPage === "logo" && (
        <UploadBox
          maxSizeMB={5}
          onHandleAdd={(key, texture) => {
            setSelectedTextureUri(texture);
            setSelectedPage("logo location");
            console.log("qweqweqwe");
          }}
        />
      )}

      {selectedPage === "logo" && logoItems.length > 0 && (
        <div className="logoScrollArea">
          <hr className="logoHr" />
          {logoItems.map((item, i) => (
            <ButtonForLogo
              key={i}
              title={`Logo ${i + 1}`}
              logoUri={item.textureUri}
              onToggle={() => handleOntoggleLogo(item.id)}
              isActive={item.isActive}
              onClick={() => {
                setSelectedLogoId(item.id);
                setSelectedPage("logo settings");
              }}
            />
          ))}
        </div>
      )}

      {selectedPage === "logo location" && (
        <LeftBarPopup
          assets={commonLocationsUrls}
          onApply={handleApplyorUpdateLogo}
          handleClickBack={() => {
            setSelectedPage("logo");
            setSelectedTextureUri(null);
          }}
          type={"logo"}
        />
      )}

      {selectedPage === "logo settings" && (
        <ItemSettings
          type={"logo"}
          handleClickBack={() => {
            handleClickBack("logo");
            setSelectedLogoId(null);
          }}
          handleSettingsApply={handleApplyorUpdateLogo}
          title={"logo"}
          item={selectedItem}
          handleSelectedPage={setSelectedPage}
        />
      )}

      {(selectedPage === "logo color" || selectedPage === "logo gradient") && (
        <ColorPicker
          handleColorApply={handleApplyorUpdateLogo}
          handleClickBack={() => handleClickBack("logo settings")}
          firstColor={selectedItem?.firstColor}
          secondColor={selectedItem?.secondColor}
          type={selectedPage === "logo gradient" ? "gradient" : "color"}
        />
      )}
    </div>
  );
}

export default LogoPage;
