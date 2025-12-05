import "./textPage.css";
import Header from "../../../components/ui/Header";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForText } from "../../../components/buttons/Buttons";

function TextPage() {
  console.log("TextPage");
  const textItems = configuratorStore.getState().getItemsByType("text");
  console.log("Text items on model:", textItems);
  return (
    <div className="textPageContainer">
      {" "}
      <Header title={"Text"} subtitle={"Text"} />
      <input type="text" placeholder="Enter your text here" />
      <button>Add Text</button>
      <hr className="textHr" />
      {textItems.length > 0 &&
        textItems.map((item) => (
          <ButtonForText
            key={item.id}
            title={item.textContent}
            isActive={item.isActive}
            onToggle={() => handleToggle(item.id, item.isActive)}
            onClick={() => console.log("Clicked", item.textContent)}
          />
        ))}
    </div>
  );
}

export default TextPage;
