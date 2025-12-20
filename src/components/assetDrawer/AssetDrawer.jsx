import configStore from "../../store/configStore";
import "./assetDrawer.css";

function AssetDrawer({
  assets,
  selectedItems,
  selectedTextureUri,
  onTextureApply,
}) {
  //TODO -- lazyloading nedir bak react-window bak cdn cache bak
  return (
    <div className="assetDrawerContainer">
      <div className="assetsGrid">
        {assets?.map((pattern, index) => {
          const isSelected = selectedItems
            ? selectedItems.some(
                (i) => i.selectedTextureUri === pattern.texture
              )
            : selectedTextureUri === pattern.texture;

          // console.log(isSelected);
          // console.log(selectedItems);

          return (
            <div
              className={`assetItem ${isSelected ? "active" : ""}`}
              key={`${pattern.id}-${index}`}
              onClick={() => onTextureApply("textureUri", pattern.texture)}
            >
              <img src={pattern.texture} alt={pattern.id} loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssetDrawer;
