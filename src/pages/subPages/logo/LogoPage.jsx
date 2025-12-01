import "./logoPage.css";
import Header from "../../../components/ui/Header";

function LogoPage() {
  console.log("LogoPage");
  return (
    <div className="logoPageContainer">
      {" "}
      <Header title={"Logo"} subtitle={"Logo"} />
    </div>
  );
}

export default LogoPage;
