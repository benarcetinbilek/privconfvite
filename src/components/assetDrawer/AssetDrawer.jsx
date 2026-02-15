import configStore from "../../store/configStore";
import "./assetDrawer.css";

function AssetDrawer({
  assets,
  selectedItems,
  selectedTextureUri,
  onTextureApply,
}) {
  //TODO -- lazyloading nedir bak react-window bak cdn cache bak
  // console.log("selecteditems", selectedItems);
  // console.log("ASSETS", assets);
  return (
    <div className="assetDrawerContainer">
      <div className="assetsGrid">
        {assets?.map((asset, index) => {
          const isSelected = selectedItems
            ? selectedItems.some((i) => i.textureUri === asset.texture)
            : selectedTextureUri === asset.texture;

          // console.log(isSelected);

          return (
            <div
              className={`assetItem ${isSelected ? "active" : ""}`}
              key={`${asset.id}-${index}`}
              onClick={() => onTextureApply("textureUri", asset.texture)}
            >
              <img src={asset.texture} alt={asset.id} loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssetDrawer;
