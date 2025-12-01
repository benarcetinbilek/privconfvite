import "./textPage.css";
import Header from "../../../components/ui/Header";

function TextPage() {
  console.log("TextPage");
  return (
    <div className="textPageContainer">
      {" "}
      <Header title={"Text"} subtitle={"Text"} />
    </div>
  );
}

export default TextPage;
