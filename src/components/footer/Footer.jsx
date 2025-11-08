import "./footer.css";
import { ReusableButtonFooter, ButtonFooterCheckout } from "../buttons/Buttons";
import {
  DocumentDuplicate,
  InfoCircleOutline,
  OutlineSaveAll,
  OutlineShare,
  PlayCircleOutline,
} from "../../assets/svgs";

function Footer() {
  const handleClick = (button) => {
    // Handle button click based on button label or other properties
    console.log(`${button.label} button clicked`);
  };
  const footerButtons = [
    { onClick: handleClick, label: "Infos", logo: <InfoCircleOutline /> },
    { onClick: handleClick, label: "Share Design", logo: <OutlineShare /> },
    { onClick: handleClick, label: "Duplicate", logo: <DocumentDuplicate /> },
    { onClick: handleClick, label: "Save", logo: <OutlineSaveAll /> },
    { onClick: handleClick, label: "Tutorial", logo: <PlayCircleOutline /> },
  ];
  return (
    <div className="footerContainer">
      <div className="footerLeft">
        {footerButtons.map((button, index) => (
          <ReusableButtonFooter
            key={index}
            onClick={button.onClick}
            label={button.label}
            logo={button.logo}
          />
        ))}
      </div>

      <div className="footerRight">
        <div className="footerRightText">PrivConf © 2024</div>

        <ButtonFooterCheckout onClick={null} label="Checkout" />
      </div>
    </div>
  );
}

export default Footer;
