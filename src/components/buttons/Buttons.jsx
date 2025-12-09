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

const ButtonToggle = ({ isActive, onToggle }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // 🔥 parent click event'ine gitmeyi durdurur
    onToggle();
  };

  return (
    <div
      className={`toggleSwitch ${isActive ? "on" : ""}`}
      onClick={handleClick}
    >
      <div className="toggleThumb" />
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
  isActive = false,
  onToggle,
  patternUri,
  isLayerOrder = false,
}) => {
  console.log("ButtonForPatterns:", isActive);
  return (
    <div className="colorButton" onClick={onClick}>
      {/* Pattern circle */}
      <img className="stickerPreviewButton" src={patternUri} />
      {/* Title */}
      <span className="colorTitle">{title}</span>
      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <ButtonToggle isActive={isActive} onToggle={onToggle} />
      {/* Arrow */}

      {!isLayerOrder && <BaselineKeyboardArrowRight className="arrowIcon" />}
    </div>
  );
};

const ButtonForText = ({
  onClick,
  color,
  secondColor,
  isGradient = false,
  title,
  isActive = false,
  onToggle,
  isLayerOrder = false,
}) => {
  return (
    <div className="colorButton" onClick={onClick}>
      {/* TODO -- change the title font as it is on model and color as well */}

      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <ButtonToggle isActive={isActive} onToggle={ontoggle} />

      {/* Arrow */}
      {!isLayerOrder && <BaselineKeyboardArrowRight className="arrowIcon" />}
    </div>
  );
};

const ButtonForSticker = ({
  onClick,
  title,
  isActive = true,
  onToggle,
  stickerUri,
  isLayerOrder = false,
}) => {
  return (
    <div className="colorButton" onClick={onClick}>
      {/* TODO -- change the title font as it is on model and color as well */}

      <img className="stickerPreviewButton" src={stickerUri} />

      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <ButtonToggle isActive={isActive} onToggle={ontoggle} />

      {/* Arrow */}
      {!isLayerOrder && <BaselineKeyboardArrowRight className="arrowIcon" />}
    </div>
  );
};

const ButtonForLogo = ({
  onClick,
  title,
  isActive = false,
  onToggle,
  logoUri,
  isLayerOrder = false,
}) => {
  console.log("ButtonForLogo:", { title, logoUri });
  return (
    <div className="colorButton" onClick={onClick}>
      {/* TODO -- change the title font as it is on model and color as well */}
      <img className="stickerPreviewButton" src={logoUri} />
      {/* Title */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE SWITCH – direkt component içine gömülü */}
      <ButtonToggle isActive={isActive} onToggle={ontoggle} />

      {/* Arrow */}
      {!isLayerOrder && <BaselineKeyboardArrowRight className="arrowIcon" />}
    </div>
  );
};

const UniversalButton = ({
  title,
  onClick,
  isActive = true,
  onToggle,
  type = "default", // "color" | "pattern" | "text" | "logo" | "sticker"
  color,
  secondColor,
  isGradient = false,
}) => {
  return (
    <div className="colorButton" onClick={onClick}>
      {/* LEFT SIDE CONTENT (circle or pattern) */}
      {type === "color" && (
        <div
          className="colorCircle"
          style={{
            background: isGradient
              ? `linear-gradient(90deg, ${color}, ${secondColor})`
              : color,
          }}
        />
      )}

      {type === "pattern" && <div className="colorCirclePattern"></div>}

      {/* TITLE */}
      <span className="colorTitle">{title}</span>

      {/* INLINE TOGGLE (all types except color use this) */}
      {type !== "color" && (
        <div
          className={`toggleSwitch ${isActive ? "on" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(isActive);
          }}
        >
          <div className="toggleThumb" />
        </div>
      )}

      {/* Arrow icon */}
      {!isLayerOrder && <BaselineKeyboardArrowRight className="arrowIcon" />}
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
  ButtonForSticker,
  ButtonForLogo,
  UniversalButton,
  ButtonToggle,
};
