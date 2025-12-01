import "./home.css";
import Footer from "../../components/footer/Footer";
import LeftBar from "../../components/leftBar/LeftBar";
import CanvasForModel from "../../components/canvas/CanvasForModel";
import uiStore from "../../store/uiStore";
import InfoPopup from "../../components/popup/infoPopup/InfoPopup.jsx";
import ShareDesignPopUp from "../../components/popup/shareDesignPopup/ShareDesignPopup.jsx";
import TutorialPopUp from "../../components/popup/tutorialPopUp/TutorialPopUp.jsx";

const Home = () => {
  const { footerButtonsActive } = uiStore();

  console.log("Home");

  let content;

  switch (footerButtonsActive) {
    case "Infos":
      content = <InfoPopup />;
      break;
    case "Share Design":
      content = <ShareDesignPopUp />;
      break;
    case "Tutorial":
      content = <TutorialPopUp />;
      break;
    default:
      break;
  }

  return (
    <div className="homeContainer">
      <div className="topContainer">
        <LeftBar />
        <CanvasForModel />
      </div>
      <Footer />

      {/*footer button containers */}
      {content}
    </div>
  );
};

export default Home;
