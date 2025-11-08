import { useState } from "react";
import Header from "../../../components/ui/Header";
import "./designPage.css";

function DesignPage() {
  const [selectedButton, setSelectedButton] = useState("first");
  const handleButtonClick = (key) => {
    setSelectedButton(key);
    console.log(key);
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
    </div>
  );
}

export default DesignPage;
