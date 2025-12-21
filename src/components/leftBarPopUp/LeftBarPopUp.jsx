import React, { useState } from "react";
import "./leftBarPopup.css";
import { SubHeader } from "../subHeader/SubHeader";

export default function LeftBarPopup({
  assets,
  onApply,
  handleClickBack,
  type,
}) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) => {
    if (type !== "design") {
      // ❗ sadece tek seçim
      setSelected([index]);
      return;
    }

    // design ise multi-select
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleApplyClick = () => {
    if (type === "design") {
      const selectedLocations = selected.map((i) => assets[i].name);
      onApply(selectedLocations);
      return;
    }
    const selectedLocation = assets[selected];
    onApply("add", selectedLocation.x, selectedLocation.y);
  };

  return (
    <div className="leftbarPopup">
      <SubHeader
        handleClickBack={handleClickBack}
        title={`Please Choose ${type === "design" ? "Parts" : "Location"}`}
      />

      <div className="popupGrid">
        {assets.map((item, i) => (
          <div
            key={i}
            className={`popupItem ${selected.includes(i) ? "active" : ""}`}
            onClick={() => handleSelect(i)}
          >
            <img src={item.pngUri} alt="location" className="popupImage" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <button
        className={`applyBtn ${selected.length === 0 ? "disabled" : ""}`}
        disabled={selected.length === 0}
        onClick={handleApplyClick}
      >
        Apply ({selected.length})
      </button>
    </div>
  );
}
