import { useState } from "react";
import { SketchPicker } from "react-color";
import { colors, lastUsedColors } from "../../utils/presetColors/presetColors";
import "./colorPicker.css";

export const ColorPicker = ({
  isGradient = false,
  handleColorApply,
  handleClickBack,
}) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    if (openSection === sectionName) setOpenSection(null);
    else setOpenSection(sectionName);
  };

  return (
    <div className="colorPage">
      <div className="colorPickerTop">
        <div className="colorPageHeader">
          <button className="backBtn" onClick={handleClickBack}>
            Back
          </button>
          <h2 className="chooseColorTitle">Please choose color</h2>
        </div>

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
            className={`dropdownContent ${
              openSection === "picker" ? "open" : ""
            }`}
          >
            <SketchPicker color="#ffffff" />
          </div>
        </div>

        {/* Preset Colors */}
        <div className="sectionBox">
          <div
            className="sectionHeader"
            onClick={() => toggleSection("colors")}
          >
            <span>Preset Colors</span>
            <span>{openSection === "colors" ? "▲" : "▼"}</span>
          </div>

          <div
            className={`dropdownContent ${
              openSection === "colors" ? "open" : ""
            }`}
          >
            <div className="presetColorsScroll">
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="presetColorBox"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Last Used Colors */}
      <div className="colorPickerLastUsedColors">
        <h3 className="lastUsedTitle">Last used colors</h3>

        <div className="lastUsedColorsGrid">
          {lastUsedColors.map((c, i) => (
            <div
              key={i}
              className="lastUsedColorBox"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
