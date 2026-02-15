import { useState } from "react";
import { SketchPicker } from "react-color";
import { colors, lastUsedColors } from "../../utils/presetColors/presetColors";
import "./colorPicker.css";
import { SubHeader } from "../subHeader/SubHeader";

export const ColorPicker = ({
  isGradient = false,
  handleColorApply,
  handleClickBack,
  firstColor,
  secondColor,
  type,
  gradientRotation,
  gradientOffset,
  gradientTransition,
}) => {
  const [openSection, setOpenSection] = useState(null);
  const [picker, setPicker] = useState("first");

  const toggleSection = (sectionName) => {
    if (openSection === sectionName) setOpenSection(null);
    else {
      setOpenSection(null);
      setTimeout(() => {
        setOpenSection(sectionName);
      }, 350);
    }
  };

  return (
    <div className="colorPage">
      <div className="colorPickerTop">
        <SubHeader
          handleClickBack={handleClickBack}
          title={"Please Choose Color"}
        />
        {type === "gradient" && (
          <div className="gradientSelectorContainer">
            <button
              className={`gradientSelectorButton ${
                picker === "first" && "active"
              }`}
              onClick={() => setPicker("first")}
            >
              First Color
            </button>
            <button
              className={`gradientSelectorButton ${
                picker === "second" && "active"
              }`}
              onClick={() => setPicker("second")}
            >
              Second Color
            </button>
          </div>
        )}
        {/* Color Picker */}
        <div className="sectionBox">
          <div
            className="sectionHeader"
            onClick={() => toggleSection("picker")}
          >
            <span>ColorPicker</span>
            <span>{openSection === "picker" ? "▲" : "▼"}</span>
          </div>

          <div
            className={`dropdownContent colorPicker ${
              openSection === "picker" ? "open" : ""
            }`}
          >
            {
              <SketchPicker
                color={picker === "first" ? firstColor : secondColor}
                className="sketchPicker"
                presetColors={[]}
                disableAlpha={true}
                onChange={(color) => {
                  picker === "first"
                    ? handleColorApply(type, color.hex, secondColor)
                    : handleColorApply("gradient", firstColor, color.hex);
                }}
              />
            }
          </div>
        </div>

        {/* Preset Colors */}
        <div className="sectionBox" style={{ marginTop: "10px" }}>
          <div
            className="sectionHeader"
            onClick={() => toggleSection("colors")}
          >
            <span>Preset Colors</span>
            <span>{openSection === "colors" ? "▲" : "▼"}</span>
          </div>

          <div
            className={`dropdownContent presetColors ${
              openSection === "colors" ? "open" : "close"
            }`}
          >
            <div className="presetColorsScroll">
              {colors.map((c, i) => {
                const isSelectedColor =
                  picker === "first"
                    ? c.hex === firstColor
                    : c.hex === secondColor;

                return (
                  <div
                    key={i}
                    className={`presetColorBox ${
                      isSelectedColor && "selected"
                    }`}
                    onClick={() => {
                      picker === "first"
                        ? handleColorApply(type, c.hex, secondColor)
                        : handleColorApply("gradient", firstColor, c.hex);
                    }}
                  >
                    <div
                      className="presetColor"
                      style={{ backgroundColor: c.hex }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* GRADIENT FEATURES */}

        {type !== "color" && (
          <div className="sectionBox" style={{ marginTop: "10px" }}>
            <div
              className="sectionHeader"
              onClick={() => toggleSection("features")}
            >
              <span>Gradient Features</span>
              <span>{openSection === "features" ? "▲" : "▼"}</span>
            </div>

            <div
              className={`dropdownContent gradientFeatures ${
                openSection === "features" ? "open" : "close"
              }`}
            >
              {/* GRADIENT ROTATION */}

              <div className="colorPickerSettings">
                <div className="colorPickerSettingstitle">
                  Gradient Rotation:
                </div>
                <div className="colorPickerSettingsValue">
                  {gradientRotation || 0}%
                </div>

                <input
                  className="colorPickerSettingsInput"
                  type="range"
                  min="-3.1415"
                  max="3.1415"
                  step="0.01"
                  value={gradientRotation}
                  onChange={(e) =>
                    handleColorApply("gradientRotation", Number(e.target.value))
                  }
                />
              </div>

              {/* GRADIENT OFFSET */}
              <div className="colorPickerSettings">
                <div className="colorPickerSettingstitle">Gradient Offset:</div>
                <div className="colorPickerSettingsValue">
                  {gradientOffset || 0}%
                </div>

                <input
                  className="colorPickerSettingsInput"
                  type="range"
                  min="-2"
                  max="2"
                  step="0.01"
                  value={gradientOffset}
                  onChange={(e) =>
                    handleColorApply("gradientOffset", Number(e.target.value))
                  }
                />
              </div>

              {/* GRADIENT TRANSITION */}
              <div className="colorPickerSettings">
                <div className="colorPickerSettingstitle">
                  Gradient Transition:
                </div>
                <div className="colorPickerSettingsValue">
                  {gradientTransition || 0}%
                </div>

                <input
                  className="colorPickerSettingsInput"
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.01"
                  value={gradientTransition}
                  onChange={(e) =>
                    handleColorApply(
                      "gradientTransition",
                      Number(e.target.value),
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Last Used Colors */}
      <div className="colorPickerLastUsedColors">
        <h3 className="lastUsedTitle">Last used colors</h3>
        <hr className="lastUsedColorHr" />
        <div className="lastUsedColorsGrid">
          {lastUsedColors.map((c, i) => (
            <div
              key={i}
              className="lastUsedColorBox"
              style={{ backgroundColor: c.hex }}
              onClick={() => {
                picker === "first"
                  ? handleColorApply(type, c.hex, secondColor)
                  : handleColorApply("gradient", firstColor, c.hex);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

//TPDP -- maybe you can use this check performance after completing app
// const throttledUpdate = useCallback(
//   throttle((hex) => handleColorApply(hex), 50),
//   []
// );
