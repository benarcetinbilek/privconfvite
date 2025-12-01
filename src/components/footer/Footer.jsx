import "./footer.css";
import { ReusableButtonFooter, ButtonFooterCheckout } from "../buttons/Buttons";
import {
  DocumentDuplicate,
  InfoCircleOutline,
  OutlineSaveAll,
  OutlineShare,
  PlayCircleOutline,
} from "../../assets/svgs";
import uiStore from "../../store/uiStore";

function Footer() {
  const { setFooterButtonsActive } = uiStore();
  const handleClick = (button) => {
    // Handle button click based on button label or other properties
    console.log(`${button.label} button clicked`);
  };
  const footerButtons = [
    {
      onClick: () => setFooterButtonsActive("Infos"),
      label: "Infos",
      logo: <InfoCircleOutline />,
    },
    {
      onClick: () => setFooterButtonsActive("Share Design"),
      label: "Share Design",
      logo: <OutlineShare />,
    },
    { onClick: handleClick, label: "Duplicate", logo: <DocumentDuplicate /> },
    { onClick: handleClick, label: "Save", logo: <OutlineSaveAll /> },
    {
      onClick: () => setFooterButtonsActive("Tutorial"),
      label: "Tutorial",
      logo: <PlayCircleOutline />,
    },
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
