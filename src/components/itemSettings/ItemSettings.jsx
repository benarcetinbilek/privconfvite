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
  handleSelectedPage,
}) => {
  console.log("itemsettings", item);

  return (
    //TODO -- check values and change them later on and check which values used on trikot

    <div className="itemSettingsContainer">
      <SubHeader handleClickBack={handleClickBack} title={title} />

      {type === "pattern" && (
        <AssetDrawer
          assets={assets}
          selectedTextureUri={item?.textureUri}
          onTextureApply={handleSettingsApply}
        />
      )}
      {/* CHANGE FONT */}
      {type === "text" && (
        <div className="setting">
          <div className="settingtitle">Font:</div>
          <div className="settingFont"></div>
          <button
            className="settingColorButton"
            onClick={() => handleSelectedPage(`${type} font`)}
          >
            {item?.font}
          </button>
        </div>
      )}

      {/* ROTATION */}
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

          {/* ROTATION */}
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

          {/* STICKER POSITION (X & Y) */}
          {type === "sticker" && (
            <div className="setting">
              <div className="settingtitle">X &amp; Y:</div>

              <div className="settingValue">
                X: {Number(item?.x ?? 0).toFixed(2)} | Y:{" "}
                {Number(item?.y ?? 0).toFixed(2)}
              </div>

              <div className="positionControls">
                {/* SOL */}
                <button
                  type="button"
                  className="positionBtn"
                  onClick={() =>
                    handleSettingsApply("x", Number(item?.x ?? 0) - 0.01)
                  }
                >
                  ←
                </button>

                {/* SAĞ */}
                <button
                  type="button"
                  className="positionBtn"
                  onClick={() =>
                    handleSettingsApply("x", Number(item?.x ?? 0) + 0.01)
                  }
                >
                  →
                </button>

                {/* YUKARI */}
                <button
                  type="button"
                  className="positionBtn"
                  onClick={() =>
                    handleSettingsApply("y", Number(item?.y ?? 0) + 0.01)
                  }
                >
                  ↑
                </button>

                {/* AŞAĞI */}
                <button
                  type="button"
                  className="positionBtn"
                  onClick={() =>
                    handleSettingsApply("y", Number(item?.y ?? 0) - 0.01)
                  }
                >
                  ↓
                </button>
              </div>
            </div>
          )}

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
            <div className="settingColorButtonsWrapper">
              <button
                className="settingColorButton"
                onClick={() => handleSelectedPage(`${type} color`)}
              >
                Color
              </button>
              <button
                className="settingColorButton"
                onClick={() => handleSelectedPage(`${type} gradient`)}
              >
                gradient
              </button>
            </div>
          </div>

          {/* OUTLINE COLOR*/}
          {type === "text" && (
            <div className="setting">
              <div className="settingtitle">Outline Color:</div>
              <div
                className="settingValueColor"
                style={{
                  background: item?.isGradient
                    ? `linear-gradient(90deg, ${item?.firstColor}, ${item?.secondColor})`
                    : item?.outlineColor,
                }}
              />
              <button
                className="settingColorButton"
                onClick={() => handleSelectedPage(`${type} color outline`)}
              >
                Outline Color
              </button>
            </div>
          )}

          {/* BACKGROUND COLOR*/}
          {type === "text" && (
            <div className="setting">
              <div className="settingtitle">Background Color:</div>
              <div
                className="settingValueColor"
                style={{
                  background: item?.isGradient
                    ? `linear-gradient(90deg, ${item?.firstColor}, ${item?.secondColor})`
                    : item?.backgroundColor,
                }}
              />
              <button
                className="settingColorButton"
                onClick={() => handleSelectedPage(`${type} color background`)}
              >
                Background Color
              </button>
            </div>
          )}

          {/* GRADIENT ROTATION */}
          {item?.isGradient && (
            <div className="setting">
              <div className="settingtitle">Gradient Rotation:</div>
              <div className="settingValue">{item?.gradientRotation || 0}%</div>

              <input
                className="settingInput"
                type="range"
                min="0.2"
                max="2"
                step="0.01"
                value={item?.gradientRotation}
                onChange={(e) =>
                  handleSettingsApply(
                    "gradientRotation",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          )}

          {/* GRADIENT OFFSET */}
          {item?.isGradient && (
            <div className="setting">
              <div className="settingtitle">Gradient Offset:</div>
              <div className="settingValue">{item?.gradientOffset || 0}%</div>

              <input
                className="settingInput"
                type="range"
                min="0.2"
                max="2"
                step="0.01"
                value={item?.gradientOffset}
                onChange={(e) =>
                  handleSettingsApply("gradientOffset", Number(e.target.value))
                }
              />
            </div>
          )}

          {/* GRADIENT TRANSITION */}
          {item?.isGradient && (
            <div className="setting">
              <div className="settingtitle">Gradient Transition:</div>
              <div className="settingValue">
                {item?.gradientTransition || 0}%
              </div>

              <input
                className="settingInput"
                type="range"
                min="0.2"
                max="2"
                step="0.01"
                value={item?.gradientTransition}
                onChange={(e) =>
                  handleSettingsApply(
                    "gradientTransition",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          )}

          {/* CENTER ITEM */}
          {/* LOCK ITEM */}

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
