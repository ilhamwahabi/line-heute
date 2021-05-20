import React from "react";
import ReactDOM from "react-dom";
import "virtual:windi.css";
import splitbee from "@splitbee/web";
import "typeface-roboto";

import App from "./App";

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
