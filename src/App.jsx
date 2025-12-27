import { useEffect } from "react";
import "./App.css";
import Home from "./pages/home/Home";
function App() {
  console.log("app");

  useEffect(() => {
    console.log("first initialize");

    //TODO -- get params
    //TODO -- get data for if its for printers or only sharing product or whatever it is
    //TODO -- get config and set configStore
    //TODO -- get data for configurator
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
