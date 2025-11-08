import "./buttons.css";

// Buttons for UI
// Pagination button
const ReusableButtonPagination = ({ onClick, label, logo }) => {
  return (
    <div className="reusableButtonPagination" onClick={onClick}>
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
      {logo && <div className="buttonLogo">{logo}</div>}
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

export {
  ReusableButtonPagination,
  ReusableButtonReverseForward,
  ReusableButtonFooter,
  ButtonFooterCheckout,
};
