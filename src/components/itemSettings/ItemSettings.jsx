import { HorizontalCenter, OutlineLock } from "../../assets/svgs";
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

          {/* ROTATION */}
          <div className="setting">
            <div className="settingtitle">Opacity:</div>
            <div className="settingValue">{item?.opacity || 100}%</div>

            <input
              className="settingInput"
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={item?.opacity || 1}
              onChange={(e) =>
                handleSettingsApply("opacity", Number(e.target.value))
              }
            />
          </div>

          {/* STICKER POSITION (X) */}
          {(type === "sticker" || type === "logo") && (
            <div className="setting">
              <div className="settingtitle">X Coordinates: </div>

              <div className="settingValue"></div>

              <div className="positionControls">
                {/* X ROW */}
                <div className="positionRow">
                  <button
                    type="button"
                    className="positionBtn"
                    onClick={() =>
                      handleSettingsApply("x", Number(item?.x ?? 0) - 0.1)
                    }
                  >
                    ←
                  </button>

                  <div className="positionControlValue">
                    {Number(item?.x ?? 0).toFixed(1)}
                  </div>

                  <button
                    type="button"
                    className="positionBtn"
                    onClick={() =>
                      handleSettingsApply("x", Number(item?.x ?? 0) + 0.1)
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STICKER POSITION (Y) */}
          {(type === "sticker" || type === "logo") && (
            <div className="setting">
              <div className="settingtitle">Y Coordinates:</div>

              <div className="settingValue"></div>

              <div className="positionControls">
                {/* Y ROW */}
                <div className="positionRow">
                  <button
                    type="button"
                    className="positionBtn"
                    onClick={() =>
                      handleSettingsApply("y", Number(item?.y ?? 0) + 0.1)
                    }
                  >
                    ↑
                  </button>

                  <div className="positionControlValue">
                    {Number(item?.y ?? 0).toFixed(1)}
                  </div>

                  <button
                    type="button"
                    className="positionBtn"
                    onClick={() =>
                      handleSettingsApply("y", Number(item?.y ?? 0) - 0.1)
                    }
                  >
                    ↓
                  </button>
                </div>
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
                min="-3.1415"
                max="3.1415"
                step="0.01"
                value={item?.gradientRotation}
                onChange={(e) =>
                  handleSettingsApply(
                    "gradientRotation",
                    Number(e.target.value),
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
                min="-2"
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
                    Number(e.target.value),
                  )
                }
              />
            </div>
          )}

          {/* CENTER ITEM */}
          {type !== "pattern" && (
            <div className="setting">
              <div className="settingtitle">Center Item:</div>
              <div></div>
              <button
                className="settingButtonCommon"
                onClick={() => handleSettingsApply("centerize", null)}
              >
                <HorizontalCenter />
              </button>
            </div>
          )}

          {/* LOCK ITEM */}
          {type !== "pattern" && (
            <div className="setting">
              <div className="settingtitle">Lock item:</div>
              <div></div>
              <div className="settingCommonButtonsWrapper">
                <div>{`${item.isLocked ? "locked" : "not locked"}`}</div>

                <button
                  className="settingButtonCommon"
                  onClick={() =>
                    handleSettingsApply(
                      "isLocked",
                      item.isLocked ? false : true,
                    )
                  }
                >
                  <OutlineLock />
                </button>
              </div>
            </div>
          )}

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
        </div>
      )}
    </div>
  );
};
