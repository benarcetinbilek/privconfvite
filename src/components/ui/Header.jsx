import "./header.css";

const Header = ({
  title,
  subtitle,
  isButtons = false,
  buttons,
  selectedButton,
  onButtonClick,
}) => {
  return (
    <div className="headerContainer">
      <div className="headerTitles">
        <h1 className="headerTitle">{title}</h1>
        <h2 className="headerSubTitle">{subtitle}</h2>
      </div>
      {isButtons && (
        <div className="headerButtons">
          <div
            className={`headerButton ${
              selectedButton === "first" && "selected"
            }`}
            onClick={() => onButtonClick("first")}
          >
            {buttons.first}
          </div>
          <div
            className={`headerButton ${
              selectedButton === "second" && "selected"
            }`}
            onClick={() => onButtonClick("second")}
          >
            {buttons.second}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
