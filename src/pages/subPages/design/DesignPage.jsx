import { useState } from "react";
import Header from "../../../components/ui/Header";
import "./designPage.css";

function DesignPage() {
  const [selectedButton, setSelectedButton] = useState("first");
  console.log("DesignPage");
  const handleButtonClick = (key) => {
    setSelectedButton(key);
    console.log(key);
  };

  const designs = [
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
  ];
  const bestDesigns = [
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
  ];

  const handleApplyDesign = () => {
    //logic to apply design
    const appliedDesign = [
      {
        appliedParts: { back: true, front: false },
        colors: { primary: "#ff0000", secondary: "#00ff00" },
        isColorGradient: true,
        svgUri: "/design.svg",
        designName: "Cool Design",
        designid: "design123",
      },
    ];
  };

  return (
    <div className="designPageContainer">
      <Header
        title={"Design"}
        subtitle={"Choose a design"}
        isButtons={true}
        buttons={{ first: "Designs", second: "Best Designs" }}
        selectedButton={selectedButton}
        onButtonClick={handleButtonClick}
      />
      <div className="designContent">
        {selectedButton === "first"
          ? designs.map((design, index) => (
              <div key={index}>
                {" "}
                <div
                  key={index}
                  className="designItem"
                  onClick={() => handleApplyDesign(design)}
                >
                  <img
                    src={design.pngUri}
                    alt="design"
                    className="designImage"
                  />
                </div>
              </div>
            ))
          : bestDesigns.map((design, index) => (
              <div key={index}>
                {" "}
                <div
                  key={index}
                  className="designItem"
                  onClick={() => handleApplyDesign(design)}
                >
                  <img
                    src={design.pngUri}
                    alt="design"
                    className="designImage"
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default DesignPage;
