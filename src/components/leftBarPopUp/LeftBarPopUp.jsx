import React, { useState } from "react";
import "./leftBarPopup.css";

export default function LeftBarPopup({ designLocations, onApply }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleApplyClick = () => {
    const selectedLocations = selected.map((i) => designLocations[i].name);
    onApply(selectedLocations);
  };

  return (
    <div className="leftbarPopup">
      <h3 className="popupTitle">Choose Locations</h3>

      <div className="popupGrid">
        {designLocations.map((item, i) => (
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
