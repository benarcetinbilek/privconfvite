import { BaselineKeyboardArrowLeft } from "../../assets/svgs";
import "./subHeader.css";

export const SubHeader = ({ handleClickBack, title }) => {
  return (
    <div className="popupTopContainer">
      <button className="closeBtn" onClick={handleClickBack}>
        <BaselineKeyboardArrowLeft /> back
      </button>
      <h3 className="popupTitle">{title}</h3>
    </div>
  );
};
