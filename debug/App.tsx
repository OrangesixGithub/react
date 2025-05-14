import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./src";

//Libs
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@webdatarocks/webdatarocks/webdatarocks.css";
import "./assets/css/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Root/>,
);
