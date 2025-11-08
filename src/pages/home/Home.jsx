import { useTranslation } from "react-i18next";
import "./home.css";
import Footer from "../../components/footer/Footer";
import LeftBar from "../../components/leftBar/LeftBar";
import Canvas from "../../components/canvas/Canvas";
const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="homeContainer">
      <div className="topContainer">
        <LeftBar />
        <Canvas />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
