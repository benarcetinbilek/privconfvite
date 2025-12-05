import configStore from "../../store/configStore";
import "./assetDrawer.css";

function AssetDrawer() {
  const { patternUrls } = configStore();

  return (
    <div className="assetDrawerContainer">
      <div className="patternsGrid">
        {patternUrls.map((pattern, index) => (
          <div className="patternItem" key={`${pattern.id}-${index}`}>
            <img src={pattern.texture} alt={pattern.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetDrawer;
