import "./stickerPage.css";
import Header from "../../../components/ui/Header";
import AssetDrawer from "../../../components/assetDrawer/AssetDrawer";

function StickerPage() {
  console.log("StickerPage");
  return (
    <div className="stickerPageContainer">
      {" "}
      <Header title={"Sticker"} subtitle={"Sticker"} />
      <AssetDrawer />
    </div>
  );
}

export default StickerPage;
