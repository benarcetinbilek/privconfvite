import "./infoPopup.css";
import uiStore from "../../../store/uiStore";

function InfoPopup() {
  console.log("InfoPopup");
  const { setFooterButtonsActive } = uiStore();

  const handleChange = () => {
    setFooterButtonsActive("none");
  };

  return (
    <div className="infoPopup" onClick={handleChange}>
      infoPopup
    </div>
  );
}

export default InfoPopup;
