import { BaselineKeyboardArrowLeft } from "../../assets/svgs";
import "./subHeader.css";

export const SubHeader = ({ handleClickBack, title }) => {
  return (
    <div className="subHeaderContainer">
      <button className="subHeadercloseBtn" onClick={handleClickBack}>
        <BaselineKeyboardArrowLeft /> back
      </button>
      <h3 className="subHeaderTitle">{title}</h3>
    </div>
  );
};
