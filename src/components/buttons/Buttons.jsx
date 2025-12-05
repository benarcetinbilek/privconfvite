import { BaselineKeyboardArrowRight } from "../../assets/svgs";
import "./buttons.css";

// Buttons for UI
// Pagination button
const ReusableButtonPagination = ({ onClick, label, logo, isActive }) => {
  return (
    <div
      className={`reusableButtonPagination ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {/* logo artık <svg> olarak geliyor */}
      {logo && <div className="buttonLogo">{logo}</div>}
      {label && <span className="buttonLabel">{label}</span>}
    </div>
  );
};

// Reverse / Forward button
const ReusableButtonReverseForward = ({ onClick, logo }) => {
  return (
    <div className="reusableButtonReverseForward" onClick={onClick}>
      {logo && <div className="buttonLogo">{logo}</div>}
    </div>
  );
};

// Footer button (Infos, Share, Duplicate, Save, Tutorial)
const ReusableButtonFooter = ({ onClick, label, logo }) => {
  return (
    <div className="reusableButtonFooter" onClick={onClick}>
      {logo && <div className="buttonLogoFooter">{logo}</div>}
      {label && <span className="buttonLabel">{label}</span>}
    </div>
  );
};

// Checkout button (right side)
const ButtonFooterCheckout = ({ onClick, label }) => {
  return (
    <div className="buttonFooterCheckout" onClick={onClick}>
      <span className="buttonLabel">{label}</span>
    </div>
  );
};

const ButtonForColors = ({
  onClick,
  color,
  secondColor,
  isGradient = false,
  title,
}) => {
  console.log("ButtonForColors:", { color, secondColor, isGradient, title });
  return (
    <div className="colorButton" onClick={onClick}>
      <div
        className="colorCircle"
        style={{
          background: isGradient
            ? `linear-gradient(90deg, ${color}, ${secondColor})`
            : color,
        }}
      />

      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* Ok */}
      <BaselineKeyboardArrowRight className="arrowIcon" />
    </div>
  );
};
//TODO -- isGradient is false by default check if it works fine or there will be glitch
const ButtonForPatterns = ({
  onClick,
  color,
  secondColor,
  isGradient = false,
  title,
  isActive = true,
  onToggle,
}) => {
  return (
    <div className="colorButton" onClick={onClick}>
      {/* Pattern circle */}
      <div className="colorCirclePattern"></div>

      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <div className={`toggleSwitch ${isActive ? "on" : ""}`}>
        <div className="toggleThumb" />
      </div>

      {/* Arrow */}
      <BaselineKeyboardArrowRight className="arrowIcon" />
    </div>
  );
};

const ButtonForText = ({
  onClick,
  color,
  secondColor,
  isGradient = false,
  title,
  isActive = true,
  onToggle,
}) => {
  return (
    <div className="colorButton" onClick={onClick}>
      {/* TODO -- change the title font as it is on model and color as well */}

      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <div className={`toggleSwitch ${isActive ? "on" : ""}`}>
        <div className="toggleThumb" />
      </div>

      {/* Arrow */}
      <BaselineKeyboardArrowRight className="arrowIcon" />
    </div>
  );
};

export {
  ReusableButtonPagination,
  ReusableButtonReverseForward,
  ReusableButtonFooter,
  ButtonFooterCheckout,
  ButtonForColors,
  ButtonForPatterns,
  ButtonForText,
};
