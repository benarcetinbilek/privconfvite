import "./stickerPage.css";
import Header from "../../../components/ui/Header";
import AssetDrawer from "../../../components/assetDrawer/AssetDrawer";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForSticker } from "../../../components/buttons/Buttons";
import configStore from "../../../store/configStore";

function StickerPage() {
  console.log("StickerPage");
  const stickerItems = configuratorStore.getState().getItemsByType("sticker");
  console.log("Sticker items on model:", stickerItems);

  const stickerAssets = configStore.getState().getAllStickers();
  console.log("Sticker assets from configStore:", stickerAssets);

  const handleOnClick = (itemId) => {
    console.log("Clicked sticker item with id:", itemId);
  };

  return (
    <div className="stickerPageContainer">
      {" "}
      <Header title={"Sticker"} subtitle={"Sticker"} />
      <AssetDrawer assets={stickerAssets} />
      <hr className="stickerHr" />
      <div className="stickerScrollArea">
        {stickerItems.length > 0 &&
          stickerItems.map((item, i) => (
            <ButtonForSticker
              key={item.id}
              title={`Sticker ${i + 1}`}
              onClick={handleOnClick}
              stickerUri={item.textureUri}
            />
          ))}
      </div>
    </div>
  );
}

export default StickerPage;
