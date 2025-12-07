import "./logoPage.css";
import Header from "../../../components/ui/Header";
import UploadBox from "../../../components/uploadBox/UploadBox";
import configuratorStore from "../../../store/configuratorStore";
import { ButtonForLogo } from "../../../components/buttons/Buttons";

function LogoPage() {
  console.log("LogoPage");

  const logoItems = configuratorStore.getState().getItemsByType("logo");
  console.log("Text items on model:", logoItems);

  return (
    <div className="logoPageContainer">
      <Header title="Logo" subtitle="Logo" />

      <UploadBox maxSizeMB={5} />

      <hr className="logoHr" />
      <div className="logoScrollArea">
        {logoItems.length > 0 &&
          logoItems.map((item, i) => (
            <ButtonForLogo
              key={i}
              title={`Logo ${i + 1}`}
              logoUri={item.textureUri}
            />
          ))}
      </div>
    </div>
  );
}

export default LogoPage;
