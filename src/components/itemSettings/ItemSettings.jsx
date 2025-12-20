import AssetDrawer from "../assetDrawer/AssetDrawer";
import { SubHeader } from "../subHeader/SubHeader";
import "./itemSettings.css";

export const ItemSettings = ({
  type,
  handleClickBack,
  handleSettingsApply, // (key, value) bekliyoruz
  title,
  assets,
  item,
}) => {
  console.log("itemsettings", item);

  return (
    //TODO -- check values and change them later on and check which values used on trikot

    <div className="itemSettingsContainer">
      <SubHeader handleClickBack={handleClickBack} title={title} />

      <AssetDrawer
        assets={assets}
        selectedTextureUri={item?.textureUri}
        onTextureApply={handleSettingsApply}
      />

      {item && (
        <div className="settingsArea">
          {/* SCALE */}
          <div className="setting">
            <div className="settingtitle">Scale:</div>
            <div className="settingValue">{item?.scale || 0}%</div>

            <input
              className="settingInput"
              type="range"
              min="0.2"
              max="2"
              step="0.01"
              value={item?.scale}
              onChange={(e) =>
                handleSettingsApply("scale", Number(e.target.value))
              }
            />
          </div>

          {/* ANGLE */}
          <div className="setting">
            <div className="settingtitle">Rotation:</div>
            <div className="settingValue">{item?.rotation}°</div>

            <input
              className="settingInput"
              type="range"
              min="-180"
              max="180"
              step="1"
              value={item?.rotation}
              onChange={(e) =>
                handleSettingsApply("rotation", Number(e.target.value))
              }
            />
          </div>

          {/* COLOR PALETTE */}
          <div className="setting">
            <div className="settingtitle">Color:</div>
            <div
              className="settingValueColor"
              style={{
                background: item?.isGradient
                  ? `linear-gradient(90deg, ${item?.firstColor}, ${item?.secondColor})`
                  : item?.firstColor,
              }}
            />

            <button className="settingColorButton">Color Palette</button>
          </div>
          {/* DELETE BUTTON */}
          <div className="setting">
            <div className="settingtitle">Delete:</div>
            <div></div>
            <button
              className="settingButtonDelete"
              onClick={() => handleSettingsApply("delete", null)}
            >
              Delete
            </button>
          </div>

          {type !== "pattern" && <div></div>}
        </div>
      )}
    </div>
  );
};
