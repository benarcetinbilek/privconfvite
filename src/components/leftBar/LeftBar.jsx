import { useState } from "react";
import {
  AddTextTwo,
  ColorCard,
  DesignIdeas16Regular,
  LatticePattern,
  Logout2Broken,
  LongArrowUpLeft,
  LongArrowUpRight,
  OutlineColorLens,
} from "../../assets/svgs";
import "./leftBar.css";
import { ReusableButtonPagination } from "../buttons/Buttons";
import DesignPage from "../../pages/subPages/design/DesignPage";
import ColorPage from "../../pages/subPages/color/ColorPage";
import PatternPage from "../../pages/subPages/pattern/PatternPage";
import GradientPage from "../../pages/subPages/gradient/GradientPage";
import TextPage from "../../pages/subPages/text/TextPage";
import LogoPage from "../../pages/subPages/logo/LogoPage";

function LeftBar() {
  const [page, setPage] = useState("design");
  let content;

  const leftBarButtons = [
    {
      onClick: () => setPage("design"),
      label: "Design",
      logo: <DesignIdeas16Regular />,
    },
    {
      onClick: () => setPage("color"),
      label: "Color",
      logo: <OutlineColorLens />,
    },
    {
      onClick: () => setPage("pattern"),
      label: "Pattern",
      logo: <LatticePattern />,
    },
    {
      onClick: () => setPage("gradient"),
      label: "Gradient",
      logo: <ColorCard />,
    },
    {
      onClick: () => setPage("text"),
      label: "Text",
      logo: <AddTextTwo />,
    },
    {
      onClick: () => setPage("logo"),
      label: "Logo",
      logo: <Logout2Broken />,
    },
  ];

  switch (page) {
    case "design":
      content = <DesignPage />;
      break;
    case "color":
      content = <ColorPage />;
      break;
    case "pattern":
      content = <PatternPage />;
      break;
    case "gradient":
      content = <GradientPage />;
      break;
    case "text":
      content = <TextPage />;
      break;
    case "logo":
      content = <LogoPage />;
      break;
    default:
      content = <DesignPage />;
      break;
  }

  return (
    <div className="leftBarContainer">
      <div className="leftBarButtonsContainer">
        {leftBarButtons.map((button) => (
          <ReusableButtonPagination
            key={button.label}
            onClick={button.onClick}
            label={button.label}
            logo={button.logo}
          />
        ))}{" "}
        <div className="leftBarArrows">
          <div className="leftBarArrow">
            <LongArrowUpLeft />
          </div>
          <div className="leftBarArrow">
            <LongArrowUpRight />
          </div>
        </div>
      </div>

      <div className="leftBarContentContainer">{content}</div>
    </div>
  );
}

export default LeftBar;
