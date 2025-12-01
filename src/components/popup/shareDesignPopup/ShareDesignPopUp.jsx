import configuratorStore from "../../../store/configuratorStore";
import exportUvMap from "../../../utils/exportUvMap/ExportUvMap";
import "./shareDesignPopup.css";

function ShareDesignPopup() {
  console.log("ShareDesignPopup");
  const { geometry } = configuratorStore();
  return (
    <div className="shareDesignPopup" onClick={() => exportUvMap(geometry)}>
      ShareDesignPopup
    </div>
  );
}

export default ShareDesignPopup;
